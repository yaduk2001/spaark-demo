const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to database');

        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));

        // Find admin user
        const admin = await User.findOne({ $or: [{ email: 'admin@spark.com' }, { username: 'admin' }] });

        if (!admin) {
            console.log('❌ Admin user NOT found in database!');
            console.log('\nRun this command to create admin:');
            console.log('  node seedAdmin.js');
        } else {
            console.log('\n✅ Admin user FOUND!');
            console.log('📧 Email:', admin.email);
            console.log('👤 Username:', admin.username);
            console.log('🛡️  Role:', admin.role);
            console.log('🔓 Login Enabled:', admin.isLoginEnabled);
            console.log('🔑 Password Hash:', admin.password ? 'EXISTS' : 'MISSING');

            if (admin.role !== 'admin') {
                console.log('\n⚠️  WARNING: User role is not "admin"!');
            }
            if (!admin.isLoginEnabled) {
                console.log('\n⚠️  WARNING: Login is disabled!');
            }
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

checkAdmin();
