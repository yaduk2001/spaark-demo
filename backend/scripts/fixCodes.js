const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const fixCodes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Find users with "REF-" style codes (Old Dummy Codes)
        // regex: ^REF-
        const legacyUsers = await User.find({ referralCode: /^REF-/ });

        console.log(`Found ${legacyUsers.length} users with legacy 'REF-' codes.`);

        for (const user of legacyUsers) {
            const oldCode = user.referralCode;
            let newCode = `${user.username.toLowerCase()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;

            // Uniqueness check
            let exists = await User.findOne({ referralCode: newCode });
            while (exists) {
                newCode = `${user.username.toLowerCase()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
                exists = await User.findOne({ referralCode: newCode });
            }

            user.referralCode = newCode;
            await user.save();
            console.log(`Updated ${user.username}: ${oldCode} -> ${newCode}`);
        }

        console.log('Legacy codes fixed.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixCodes();
