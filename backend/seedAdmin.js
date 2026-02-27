const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const createAdminUser = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@spark.com' });
        if (existingAdmin) {
            console.log('❌ Admin user already exists!');
            process.exit(0);
        }

        // Create admin user
        const adminUser = await User.create({
            fullName: 'System Administrator',
            email: 'admin@spark.com',
            phoneNumber: '+1000000000',
            username: 'admin',
            password: 'admin@spark', // Will be hashed by pre-save hook
            role: 'admin',
            referralCode: 'ADMIN-SPARK',
            walletAddress: '0xADMIN000000000000000000000000000000'
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@spark.com');
        console.log('🔑 Password: admin@spark');
        console.log('');
        console.log('You can now login at /login');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin user:', error.message);
        process.exit(1);
    }
};

createAdminUser();
