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

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

const ATLAS_URI = 'mongodb+srv://inquiryrbcimport_db_user:fHtMYCe7zhYWeviv@cluster0.fz1axed.mongodb.net/education_system?retryWrites=true&w=majority';

// ─── Database Connection ─────────────────────────────────────────────────────
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || ATLAS_URI;

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    process.env.USE_JSON_DB = 'false';

    // Auto-seed default Admin and Student users if missing
    try {
      const User = require('./models/User');
      const adminExists = await User.findOne({ email: 'inquiryrbcimport@gmail.com' });
      if (!adminExists) {
        await User.create({
          name: 'RBC Admin',
          email: 'inquiryrbcimport@gmail.com',
          password: 'RBC2026',
          role: 'admin',
          phone: '+919876543210',
          country: 'India',
          progressPercentage: 100
        });
        console.log('👑 Official Admin (inquiryrbcimport@gmail.com) auto-seeded into MongoDB Atlas.');
      }
      const studentExists = await User.findOne({ email: 'student@rbcimportandexport.com' });
      if (!studentExists) {
        await User.create({
          name: 'Student Learner',
          email: 'student@rbcimportandexport.com',
          password: 'studentpassword123',
          role: 'student',
          phone: '+919876543211',
          country: 'India',
          progressPercentage: 35
        });
        console.log('🎓 Student user auto-seeded into MongoDB Atlas.');
      }
      
      const AccessCode = require('./models/AccessCode');
      const codeExists = await AccessCode.findOne();
      if (!codeExists) {
        await AccessCode.create({ code: 'RBC9988' });
        console.log('🔑 Default Access Code (RBC9988) auto-seeded into MongoDB Atlas.');
      }
    } catch (seedErr) {
      console.warn('Auto-seed check error:', seedErr);
    }

    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.env.USE_JSON_DB = 'true';
    return false;
  }
};

// Middleware to ensure DB connection on serverless requests (MUST BE BEFORE ROUTES)
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (e) {
      console.warn('DB connect error:', e);
    }
  }
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/videos', require('./routes/videos'));
app.use('/videos', require('./routes/videos'));

app.use('/api/lessons', require('./routes/lessons'));
app.use('/lessons', require('./routes/lessons'));

app.use('/api/chat', require('./routes/chat'));
app.use('/chat', require('./routes/chat'));

// TTS Audio Proxy Endpoint for high quality speech
const handleTTS = async (req, res) => {
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
};
app.get('/api/tts', handleTTS);
app.get('/tts', handleTTS);

// Health check endpoint
const handleHealth = (req, res) => {
  res.json({
    success: true,
    message: 'RBC Education System API is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
};
app.get('/api/health', handleHealth);
app.get('/health', handleHealth);

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

// Serve static React build files if present (e.g. Docker / Production)
const path = require('path');
const publicPath = path.join(__dirname, 'public');
if (require('fs').existsSync(publicPath)) {
  app.use(express.static(publicPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/auth') || req.path.startsWith('/videos') || req.path.startsWith('/lessons') || req.path.startsWith('/chat') || req.path.startsWith('/tts') || req.path.startsWith('/health')) {
      return next();
    }
    const indexPath = path.join(publicPath, 'index.html');
    if (require('fs').existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    next();
  });
}

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
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 RBC Education System Server Started on port ${PORT}!`);
    });
  });
}

module.exports = app;
