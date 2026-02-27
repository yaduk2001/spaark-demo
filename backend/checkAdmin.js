const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const checkAndFixAdmin = async () => {
    try {
        await connectDB();

        // Find admin user
        const admin = await User.findOne({ email: 'admin@spark.com' });

        if (!admin) {
            console.log('❌ Admin user does not exist. Creating...');

            const newAdmin = await User.create({
                fullName: 'System Administrator',
                email: 'admin@spark.com',
                phoneNumber: '+1000000000',
                username: 'admin',
                password: 'admin@spark',
                role: 'admin',
                referralCode: 'ADMIN-SPARK',
                isLoginEnabled: true
            });

            console.log('✅ Admin user created successfully!');
            console.log('📧 Email: admin@spark.com');
            console.log('🔑 Password: admin@spark');
        } else {
            console.log('✅ Admin user exists!');
            console.log('📧 Email:', admin.email);
            console.log('👤 Username:', admin.username);
            console.log('🛡️  Role:', admin.role);
            console.log('🔓 Login Enabled:', admin.isLoginEnabled);

            // Test password
            const testPassword = 'admin@spark';
            const isMatch = await admin.matchPassword(testPassword);
            console.log(`🔑 Password "${testPassword}" matches:`, isMatch);

            if (!isMatch) {
                console.log('⚠️  Password does not match! Resetting password...');
                admin.password = testPassword;
                await admin.save();
                console.log('✅ Password reset successfully!');
            }

            // Ensure role is admin
            if (admin.role !== 'admin') {
                console.log('⚠️  User is not admin! Fixing...');
                admin.role = 'admin';
                await admin.save();
                console.log('✅ Role updated to admin!');
            }

            // Ensure login is enabled
            if (!admin.isLoginEnabled) {
                console.log('⚠️  Login is disabled! Enabling...');
                admin.isLoginEnabled = true;
                await admin.save();
                console.log('✅ Login enabled!');
            }
        }

        console.log('\n🎉 Admin check complete!');
        console.log('You can now login with:');
        console.log('  Email: admin@spark.com');
        console.log('  Password: admin@spark');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

checkAndFixAdmin();
