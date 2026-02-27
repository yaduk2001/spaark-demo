const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('--------------------------------------------');
        console.log('🚀 Connection to the database very successful');
        console.log(`📡 Host: ${conn.connection.host}`);
        console.log('--------------------------------------------');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
