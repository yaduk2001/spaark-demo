const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');

const generateReferralCodes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const usersWithoutCode = await User.find({
            $or: [
                { referralCode: { $exists: false } },
                { referralCode: null },
                { referralCode: "" }
            ]
        });

        console.log(`Found ${usersWithoutCode.length} users needing referral codes.`);

        for (const user of usersWithoutCode) {
            if (!user.username) {
                console.log(`Skipping user ${user._id} due to missing username`);
                continue;
            }

            // Generate Code: Username + 3 Random Chars (Logic from auth.js)
            let newCode = `${user.username.toLowerCase()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;

            // Ensure Uniqueness (Simple check, though conflict is rare with random suffix)
            let exists = await User.findOne({ referralCode: newCode });
            while (exists) {
                newCode = `${user.username.toLowerCase()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
                exists = await User.findOne({ referralCode: newCode });
            }

            user.referralCode = newCode;
            await user.save();
            console.log(`Generated code for ${user.username}: ${newCode}`);
        }

        console.log('All users updated successfully.');
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

generateReferralCodes();
