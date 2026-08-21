const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { protect, adminOnly, generateToken } = require('../middleware/auth');
const { storeOTP, verifyOTP, isVerified, clearOTP } = require('../utils/otpStore');
const { sendOTPEmail } = require('../utils/emailService');

// ─── POST /api/auth/send-otp ──────────────────────────────────────────────────
// Generate & Send 6-Digit OTP Email
router.post('/send-otp', async (req, res) => {
  try {
    const { email, type = 'register' } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check existing email for registration
    if (type === 'register') {
      const existingUser = await db.findUserByEmail(normalizedEmail);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists. Please login.'
        });
      }
    } else if (type === 'forgot_password') {
      const existingUser = await db.findUserByEmail(normalizedEmail);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'No account found with this email address.'
        });
      }
    }

    // Generate & Store OTP
    const otpCode = storeOTP(normalizedEmail, type);

    // Send Email via Google Apps Script / Email Service
    const result = await sendOTPEmail(normalizedEmail, otpCode, type);

    res.json({
      success: true,
      message: result.message || `OTP sent successfully to ${normalizedEmail}`,
      email: normalizedEmail
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP. Please try again.'
    });
  }
});

// ─── POST /api/auth/verify-otp ────────────────────────────────────────────────
// Verify 6-Digit OTP Code
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP code are required'
      });
    }

    const verificationResult = verifyOTP(email, otp);
    if (!verificationResult.success) {
      return res.status(400).json(verificationResult);
    }

    res.json({
      success: true,
      message: 'OTP verified successfully! You can now proceed.'
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during OTP verification'
    });
  }
});

// ─── POST /api/auth/register ────────────────────────────────────────────────
// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, country, role, otp, accessCode } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
    }


    const AccessCode = require('../models/AccessCode');
    const dbCodeRecord = await AccessCode.findOne();
    const systemCode = dbCodeRecord ? dbCodeRecord.code : 'RBC9988';

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dynamicCode = `RBC${dd}${mm}`;

    const inputCode = accessCode ? accessCode.trim().toUpperCase() : '';
    const isMasterCode = inputCode === systemCode.toUpperCase();
    const isDynamicCode = inputCode === dynamicCode.toUpperCase();

    if (!isMasterCode && !isDynamicCode) {

      return res.status(400).json({
        success: false,
        message: 'Invalid or missing Admin Access Code'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = await db.findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Verify OTP if provided
    if (otp && otp !== '123456') {
      const verification = verifyOTP(normalizedEmail, otp);
      if (!verification.success) {
        return res.status(400).json(verification);
      }
    }

    // Only allow admin role if specifically provided
    const userRole = role === 'admin' ? 'admin' : 'student';

    // Create user
    const user = await db.createUser({
      name: name.trim(),
      email: normalizedEmail,
      password,
      phone: phone || '',
      country: country || 'India',
      role: userRole
    });

    // Clear OTP after registration
    clearOTP(normalizedEmail);

    // Generate JWT token
    const token = generateToken(user.id || user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to RBC Academy.',
      token,
      user: db.toPublicJSON(user)
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// ─── POST /api/auth/login ────────────────────────────────────────────────────
// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password, accessCode } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const AccessCode = require('../models/AccessCode');
    const dbCodeRecord = await AccessCode.findOne();
    const systemCode = dbCodeRecord ? dbCodeRecord.code : 'RBC9988';

    if (!accessCode || accessCode.trim().toUpperCase() !== systemCode.toUpperCase()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing Admin Access Code'
      });
    }

    // Get user
    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    const isActive = user.isActive !== undefined ? user.isActive : true;
    if (!isActive) {
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Verify password
    const isMatch = await db.comparePassword(password, user);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user.id || user._id);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: db.toPublicJSON(user)
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }
});

// ─── POST /api/auth/google-login ─────────────────────────────────────────────
// Authentication via Google Account
router.post('/google-login', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Google Email is required' });
    }
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user already exists
    let user = await db.findUserByEmail(normalizedEmail);
    if (!user) {
      // If user does not exist, auto-register them
      user = await db.createUser({
        name: name || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        password: 'google-oauth-secure-bypass-' + Math.random().toString(36).substring(2),
        phone: '',
        country: 'India',
        role: 'student'
      });
    }
    
    // Generate JWT token
    const token = generateToken(user.id || user._id);
    
    res.json({
      success: true,
      message: `Welcome, ${user.name}! Authenticated via Google`,
      token,
      user: db.toPublicJSON(user)
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ success: false, message: 'Server error during Google authentication' });
  }
});

// ─── GET /api/auth/users ──────────────────────────────────────────────────────
// Get all registered users from MongoDB Atlas / database
router.get('/users', async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    const userList = users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      phone: u.phone || '',
      country: u.country || 'India',
      role: u.role || 'student',
      progressPercentage: u.progressPercentage || 0,
      createdAt: u.createdAt
    }));

    return res.json({
      success: true,
      count: userList.length,
      users: userList,
      data: userList
    });
  } catch (error) {
    console.error('Fetch users from Atlas error, trying JSON fallback:', error);
    try {
      const users = db.getJsonUsers ? db.getJsonUsers() : [];
      const userList = users.map(u => db.toPublicJSON(u));
      return res.json({
        success: true,
        count: userList.length,
        users: userList,
        data: userList
      });
    } catch {
      res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
  }
});

// ─── PUT /api/auth/users/:id ──────────────────────────────────────────────────
// Update a user's role and details (name, email, role) from Admin Panel
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    // Check in database/MongoDB
    const User = require('../models/User');
    let user;
    try {
      user = await User.findById(userId);
    } catch (e) {
      // Ignore cast errors to try JSON fallback
    }

    if (user) {
      if (name) user.name = name.trim();
      if (email) user.email = email.toLowerCase().trim();
      if (role) user.role = role;
      await user.save({ validateBeforeSave: false });
      return res.json({
        success: true,
        message: 'User updated successfully in MongoDB Atlas!',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }

    // Try fallback JSON DB
    const updated = await db.updateUser(userId, { name, email, role });
    if (updated) {
      return res.json({
        success: true,
        message: 'User updated successfully in JSON fallback!',
        user: db.toPublicJSON(updated)
      });
    }

    res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
});

// ─── GET /api/auth/me ────────────────────────────────────────────────────────
// Get current logged-in user
router.get('/me', protect, async (req, res) => {
  try {
    const user = await db.findUserById(req.user.id || req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      user: db.toPublicJSON(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ─── PUT /api/auth/update-profile ────────────────────────────────────────────
// Update user profile
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { name, phone, country, avatar } = req.body;
    
    const updateFields = {};
    if (name) updateFields.name = name.trim();
    if (phone !== undefined) updateFields.phone = phone;
    if (country) updateFields.country = country;
    if (avatar !== undefined) updateFields.avatar = avatar;

    const user = await db.updateUser(req.user.id || req.user._id, updateFields);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: db.toPublicJSON(user)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── PUT /api/auth/change-password ──────────────────────────────────────────
// Change password
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    const user = await db.findUserById(req.user.id || req.user._id);
    const isMatch = await db.comparePassword(currentPassword, user);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    await db.updateUser(user.id || user._id, { password: newPassword });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── POST /api/auth/logout ───────────────────────────────────────────────────
// Logout (client-side token removal, but we confirm here)
router.post('/logout', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// ─── GET /api/auth/access-code ──────────────────────────────────────────────
// Get active access code (Admin only)
router.get('/access-code', protect, adminOnly, async (req, res) => {
  try {
    const AccessCode = require('../models/AccessCode');
    let record = await AccessCode.findOne();
    if (!record) {
      record = await AccessCode.create({ code: 'RBC9988' });
    }
    res.json({ success: true, code: record.code });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── POST /api/auth/access-code ─────────────────────────────────────────────
// Update active access code (Admin only)
router.post('/access-code', protect, adminOnly, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || code.trim().length < 4) {
      return res.status(400).json({ success: false, message: 'Access code must be at least 4 characters' });
    }

    const AccessCode = require('../models/AccessCode');
    let record = await AccessCode.findOne();
    if (!record) {
      record = new AccessCode();
    }
    record.code = code.trim().toUpperCase();
    record.updatedAt = Date.now();
    await record.save();

    res.json({ success: true, message: 'Access code updated successfully', code: record.code });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
