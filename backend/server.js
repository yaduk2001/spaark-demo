const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', require('./routes/admin'));
app.use('/api/password', require('./routes/password'));

app.get('/', (req, res) => {
  res.json({ message: 'NFT Backend API with Secure Auth...' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    database: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED'
  });
});

app.get('/api/user/dashboard/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      referralCode: user.referralCode,
      lastActive: user.lastActive,
      memberSince: user.createdAt,
      referrals: user.levelCounts?.['1'] || 0, // Directs (Level 1)
      totalTeam: user.totalTeamSize || 0,      // Total Downline
      levelCounts: user.levelCounts || { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/nfts', (req, res) => {
  res.json([
    { id: 1, name: 'Genesis Founder #1', description: 'Elite membership card', tier: 'Gold' },
    { id: 2, name: 'Genesis Founder #2', description: 'Elite membership card', tier: 'Silver' }
  ]);
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log('--------------------------------------------');
      console.log(`📡 Server heartbeat: ACTIVE`);
      console.log(`🚀 Portal: http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log('--------------------------------------------');
    });
  } catch (error) {
    console.error('CRITICAL: Failed to start the ecosystem backend:');
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
