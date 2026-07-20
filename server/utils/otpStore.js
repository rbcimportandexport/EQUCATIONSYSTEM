const otpCache = new Map();

/**
 * Generate a 6-Digit Numeric OTP
 */
const generateRandomOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store OTP in memory with 10 minutes expiry
 */
const storeOTP = (email, type = 'register') => {
  const normalizedEmail = email.toLowerCase().trim();
  const otpCode = generateRandomOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpCache.set(normalizedEmail, {
    code: otpCode,
    expiresAt,
    verified: false,
    type
  });

  return otpCode;
};

/**
 * Verify provided OTP for email
 */
const verifyOTP = (email, inputCode) => {
  const normalizedEmail = email.toLowerCase().trim();
  const record = otpCache.get(normalizedEmail);

  if (!record) {
    return { success: false, message: 'No OTP requested for this email. Please click Send OTP.' };
  }

  if (Date.now() > record.expiresAt) {
    otpCache.delete(normalizedEmail);
    return { success: false, message: 'OTP has expired. Please request a new OTP.' };
  }

  if (record.code !== inputCode.trim()) {
    return { success: false, message: 'Invalid OTP code. Please check your email and try again.' };
  }

  // Mark as verified
  record.verified = true;
  otpCache.set(normalizedEmail, record);

  return { success: true, message: 'Email verified successfully!' };
};

/**
 * Check if email is verified
 */
const isVerified = (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  const record = otpCache.get(normalizedEmail);
  return !!(record && record.verified && Date.now() <= record.expiresAt);
};

/**
 * Clear OTP after successful registration or password reset
 */
const clearOTP = (email) => {
  const normalizedEmail = email.toLowerCase().trim();
  otpCache.delete(normalizedEmail);
};

module.exports = {
  storeOTP,
  verifyOTP,
  isVerified,
  clearOTP
};
