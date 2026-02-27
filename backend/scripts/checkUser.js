const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const checkUserCode = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const user = await User.findOne({ username: 'yaduk' });
        if (user) {
            console.log(`User found: ${user.username}`);
            console.log(`Referral Code: ${user.referralCode}`);
        } else {
            console.log('User yaduk not found');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUserCode();
