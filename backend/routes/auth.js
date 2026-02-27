const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bs58 = require('bs58');
const User = require('../models/User');

// --- HELPER: Generate Short Code from Wallet ---
const generateShortCode = (walletAddress) => {
    const cleanHex = walletAddress.toLowerCase().replace('0x', '');
    const last10Hex = cleanHex.slice(-10);
    const buffer = Buffer.from(last10Hex, 'hex');
    return bs58.encode(buffer);
};

// @route   POST /api/auth/resolve-referral
// @desc    Lookup wallet address by Short Code
router.post('/resolve-referral', async (req, res) => {
    const { code } = req.body;

    try {
        if (!code) return res.status(400).json({ error: 'Code required' });

        const referrer = await User.findOne({ referralCode: code })
            .select('walletAddress fullName username');

        if (!referrer) {
            return res.status(404).json({ error: 'Referrer not found' });
        }

        res.json({
            found: true,
            walletAddress: referrer.walletAddress,
            username: referrer.username
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /api/auth/check
// @desc    Check if username or email is available
router.post('/check', async (req, res) => {
    const { field, value } = req.body;

    try {
        if (!value || value.length < 3) {
            return res.json({ available: false, message: 'Too short' });
        }

        let query = {};
        if (field === 'email') query.email = value.toLowerCase();
        else if (field === 'username') query.username = value.toLowerCase();
        else if (field === 'phoneNumber') query.phoneNumber = value;
        else if (field === 'walletAddress') query.walletAddress = value.toLowerCase();
        else return res.status(400).json({ error: 'Invalid field' });

        const exists = await User.findOne(query);
        if (exists) {
            return res.json({ available: false, message: `${field === 'email' ? 'Email' : 'Username'} already taken` });
        }

        res.json({ available: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /api/auth/register
// @desc    Register a new user & update MLM Tree
router.post('/register', async (req, res) => {
    const { fullName, email, phoneNumber, username, walletAddress, password, referralCode: inputCode } = req.body;

    try {
        const emailExists = await User.findOne({ email: email.toLowerCase() });
        if (emailExists) return res.status(400).json({ error: 'Email already registered' });

        const phoneExists = await User.findOne({ phoneNumber });
        if (phoneExists) return res.status(400).json({ error: 'Phone number already registered' });

        const userExists = await User.findOne({ username: username.toLowerCase() });
        if (userExists) return res.status(400).json({ error: 'Username already taken' });

        const walletExists = await User.findOne({ walletAddress: walletAddress.toLowerCase() });
        if (walletExists) return res.status(400).json({ error: 'Wallet address already registered' });

        let referrerId = null;
        if (inputCode) {
            let referrer = await User.findOne({ referralCode: inputCode });
            if (!referrer) {
                referrer = await User.findOne({ walletAddress: inputCode.toLowerCase() });
            }
            if (referrer) {
                referrerId = referrer._id;
            }
        }

        const shortCode = generateShortCode(walletAddress);

        const ownerAddress = process.env.CONTRACT_OWNER_ADDRESS?.toLowerCase();
        const registerAddress = walletAddress.toLowerCase();

        const role = (ownerAddress && registerAddress === ownerAddress) 
            ? 'admin' 
            : 'user';

        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            phoneNumber,
            username: username.toLowerCase(),
            password,
            walletAddress: walletAddress.toLowerCase(),
            referralCode: shortCode,
            referredBy: referrerId,
            role: role
        });

        if (referrerId) {
            let currentUplineId = referrerId;
            
            for (let level = 1; level <= 6; level++) {
                if (!currentUplineId) break;

                const updateKey = `levelCounts.${level}`;

                const uplineUser = await User.findByIdAndUpdate(
                    currentUplineId,
                    { 
                        $inc: { 
                            [updateKey]: 1,
                            totalTeamSize: 1 
                        } 
                    },
                    { new: true }
                ).select('referredBy');
                currentUplineId = uplineUser ? uplineUser.referredBy : null;
            }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                walletAddress: user.walletAddress,
                referralCode: user.referralCode
            }
        });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /api/auth/login
// @desc    Login user (Email, Phone, or Username)
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { phoneNumber: identifier },
                { username: identifier.toLowerCase() }
            ]
        });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        if (user.isLoginEnabled === false) {
            return res.status(403).json({ error: 'Account has been disabled. Contact support.' });
        }

        user.lastActive = new Date();
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   GET /api/auth/profile
// @desc    Get current user profile & recalculate VIP status
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(401).json({ error: 'Token invalid' });
    }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
router.put('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ error: 'User not found' });

        const { fullName, phoneNumber } = req.body;

        if (fullName) user.fullName = fullName;

        if (phoneNumber && phoneNumber !== user.phoneNumber) {
            const phoneExists = await User.findOne({ phoneNumber });
            if (phoneExists) return res.status(400).json({ error: 'Phone number already registered' });
            user.phoneNumber = phoneNumber;
        }

        await user.save();

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
