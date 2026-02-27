const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');

// @route   GET /api/admin/users
// @desc    Get all users
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find({ username: { $ne: 'admin' } })
            .select('-password')
            .sort({ createdAt: -1 }); // Newest first
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   PUT /api/admin/users/:id/status
// @desc    Toggle user login status (Ban/Unban)
router.put('/users/:id/status', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.isLoginEnabled = !user.isLoginEnabled;
        await user.save();

        res.json({
            success: true,
            message: `User ${user.isLoginEnabled ? 'unbanned' : 'banned'}`,
            user
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user permanently
router.delete('/users/:id', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.deleteOne(); // or user.remove() depending on mongoose version
        res.json({ success: true, message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
