require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Database Connection ─────────────────────────────────────────────────────
const connectDB = async () => {
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('YOUR_CLUSTER') || process.env.MONGODB_URI.includes('YOUR_USERNAME')) {
    console.warn('⚠️  MONGODB_URI contains placeholder template values. Switching to local JSON fallback database (server/db.json).');
    process.env.USE_JSON_DB = 'true';
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    process.env.USE_JSON_DB = 'false';
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.warn('⚠️  Switching to local JSON fallback database (server/db.json) for testing.');
    process.env.USE_JSON_DB = 'true';
    return false;
  }
};

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// TTS Audio Proxy Endpoint for high quality Gujarati, Hindi, Marathi speech
app.get('/api/tts', async (req, res) => {
  const { text, lang = 'gu' } = req.query;
  if (!text) return res.status(400).send('Text parameter required');
  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${encodeURIComponent(lang)}&client=tw-ob`;
    const googleRes = await fetch(ttsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!googleRes.ok) return res.status(500).send('TTS upstream error');
    res.setHeader('Content-Type', 'audio/mpeg');
    const buffer = await googleRes.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'RBC Education System API is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'RBC Import & Export Academy — Backend API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      me: 'GET /api/auth/me',
      logout: 'POST /api/auth/logout',
      updateProfile: 'PUT /api/auth/update-profile',
      changePassword: 'PUT /api/auth/change-password'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// ─── Start Server ────────────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 RBC Education System Server Started!');
    console.log(`📡 Server: http://localhost:${PORT}`);
    console.log(`🔗 API: http://localhost:${PORT}/api`);
    console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
    console.log(`📦 Database Mode: ${process.env.USE_JSON_DB === 'true' ? 'Local JSON (server/db.json)' : 'MongoDB Atlas'}`);
    console.log('');
    console.log('📋 Available Auth Endpoints:');
    console.log('   POST   /api/auth/register       — Register new user');
    console.log('   POST   /api/auth/login           — Login');
    console.log('   GET    /api/auth/me              — Get current user');
    console.log('   PUT    /api/auth/update-profile  — Update profile');
    console.log('   PUT    /api/auth/change-password — Change password');
    console.log('   POST   /api/auth/logout          — Logout');
    console.log('');
  });
});
