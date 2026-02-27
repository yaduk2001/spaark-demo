const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail, sendPasswordChangedEmail } = require('../config/email');

// @route   POST /api/password/forgot
// @desc    Send password reset email
router.post('/forgot', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            // Don't reveal if email exists or not for security
            return res.json({ 
                success: true, 
                message: 'If an account exists with this email, you will receive a password reset link.' 
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Hash token before saving to database
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Save hashed token and expiry to user
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email with unhashed token
        await sendPasswordResetEmail(user.email, resetToken, user.fullName);

        res.json({ 
            success: true, 
            message: 'If an account exists with this email, you will receive a password reset link.' 
        });

    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ error: 'Error sending password reset email. Please try again later.' });
    }
});

// @route   POST /api/password/verify-token
// @desc    Verify if reset token is valid
router.post('/verify-token', async (req, res) => {
    const { token } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ valid: false, error: 'Token is required' });
        }

        // Hash the token to compare with stored hash
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({ valid: false, error: 'Invalid or expired reset token' });
        }

        res.json({ valid: true, email: user.email });

    } catch (err) {
        console.error('Verify token error:', err);
        res.status(500).json({ valid: false, error: 'Error verifying token' });
    }
});

// @route   POST /api/password/reset
// @desc    Reset password with token
router.post('/reset', async (req, res) => {
    const { token, password } = req.body;

    try {
        if (!token || !password) {
            return res.status(400).json({ error: 'Token and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Hash the token to compare with stored hash
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // Update password (will be hashed by pre-save middleware)
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Send confirmation email
        try {
            await sendPasswordChangedEmail(user.email, user.fullName);
        } catch (emailErr) {
            console.error('Failed to send password changed email:', emailErr);
            // Don't fail the request if email fails
        }

        res.json({ 
            success: true, 
            message: 'Password has been reset successfully. You can now log in with your new password.' 
        });

    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ error: 'Error resetting password. Please try again.' });
    }
});

module.exports = router;
