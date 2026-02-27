const jwt = require('jsonwebtoken');
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            // Check if user is admin
            if (user.role !== 'admin') {
                return res.status(403).json({ error: 'Access denied: Admins only' });
            }

            req.user = user;
            next();

        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Not authorized' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = adminAuth;
