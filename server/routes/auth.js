const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { protect, generateToken } = require('../middleware/auth');
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
    const { name, email, password, phone, country, role, otp } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
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

    // Verify OTP if provided or required
    if (otp) {
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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
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

module.exports = router;
