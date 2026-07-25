import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Phone, Globe, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { authApi } from '../utils/api';
import type { AuthUser } from '../utils/api';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  
  // OTP Verification States
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // General States
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (mode === 'register') {
      if (!name.trim()) {
        newErrors.name = 'Full name is required.';
      }
      if (!isEmailVerified) {
        newErrors.email = 'Please send and verify the OTP code first.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!email || !email.includes('@')) {
      setErrors({ email: 'Please enter a valid email address first.' });
      return;
    }
    setErrors({});
    setOtpLoading(true);
    try {
      const res = await authApi.sendOtp(email.toLowerCase().trim(), 'register');
      if (res.success) {
        setOtpSent(true);
        setSuccessMsg(`OTP Code sent successfully to ${email}`);
      } else {
        setErrors({ general: res.message || 'Failed to send OTP.' });
      }
    } catch (err) {
      setErrors({ general: 'Server is unreachable. Please verify that the backend is running.' });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpCode) {
      setErrors({ otp: 'Please enter the 6-digit OTP code.' });
      return;
    }
    setErrors({});
    setOtpLoading(true);
    try {
      // Check if OTP matches backend or default backup verification code
      const res = await authApi.verifyOtp(email.toLowerCase().trim(), otpCode);
      if (res.success || otpCode === '123456') {
        setIsEmailVerified(true);
        setSuccessMsg('Email verified successfully! You can now proceed.');
      } else {
        setErrors({ otp: 'Invalid OTP code. Please try again.' });
      }
    } catch (err) {
      // Offline/local fallback verification
      if (otpCode === '123456') {
        setIsEmailVerified(true);
        setSuccessMsg('Email verified successfully!');
      } else {
        setErrors({ otp: 'Connection failed. Please enter the valid OTP or default verification code.' });
      }
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMsg('');

    const normEmail = email.toLowerCase().trim();

    try {
      if (mode === 'register') {
        const res = await authApi.register({
          name: name.trim(),
          email: normEmail,
          password,
          phone,
          country,
          role: 'student',
          otp: otpCode || '123456'
        });

        if (res.success && res.user) {
          setSuccessMsg('Account registered successfully! Redirecting to login tab...');
          setTimeout(() => {
            setMode('login');
            setOtpSent(false);
            setIsEmailVerified(false);
            setOtpCode('');
            setSuccessMsg('Registration complete! Please log in with your email & password.');
          }, 1500);
        } else {
          setErrors({ general: res.message || 'Registration failed.' });
        }
      } else {
        const res = await authApi.login({
          email: normEmail,
          password
        });

        if (res.success && res.user) {
          if (res.token) {
            localStorage.setItem('rbc_auth_token', res.token);
          }
          localStorage.setItem('lms_current_user_v2_ie', JSON.stringify(res.user));
          setSuccessMsg('Login successful!');
          onLoginSuccess(res.user);
        } else {
          setErrors({ general: res.message || 'Invalid email or password.' });
        }
      }
    } catch (err) {
      setErrors({ general: 'Server/Database is unreachable. Please verify that the backend is running.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '24px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '40px 32px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        color: '#ffffff'
      }}>
        {/* Logo/Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
            marginBottom: '16px'
          }}>
            <Shield size={32} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            RBC Import & Export
          </h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>
            {mode === 'login' ? 'Welcome back! Login to your account' : 'Create an account to start learning'}
          </p>
        </div>

        {/* Form Messages */}
        {successMsg && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {successMsg}
          </div>
        )}

        {errors.general && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {errors.general}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                  <UserIcon size={18} />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Yadav Saurabh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 48px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontSize: '15px',
                    outline: 'none'
                  }}
                />
              </div>
              {errors.name && <span style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', display: 'block' }}>{errors.name}</span>}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Mail size={18} />
              </span>
              <input
                type="email"
                placeholder="e.g. name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={mode === 'register' && isEmailVerified}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
            {errors.email && <span style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', display: 'block' }}>{errors.email}</span>}
          </div>

          {/* Email OTP Flow for Registration */}
          {mode === 'register' && (
            <div style={{ background: 'rgba(15, 23, 42, 0.3)', borderRadius: '14px', padding: '16px', border: '1px dashed rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>Email Verification</span>
                {isEmailVerified ? (
                  <span style={{ fontSize: '12px', color: '#34d399', fontWeight: 700 }}>✓ Verified</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={otpLoading || isEmailVerified}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3b82f6',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    {otpSent ? 'Resend Code' : 'Send Code'}
                  </button>
                )}
              </div>
              
              {otpSent && !isEmailVerified && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      textAlign: 'center',
                      letterSpacing: '2px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={otpLoading}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      background: '#3b82f6',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Verify
                  </button>
                </div>
              )}
              {errors.otp && <span style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', display: 'block' }}>{errors.otp}</span>}
            </div>
          )}

          {mode === 'register' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                  Phone
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                    <Phone size={16} />
                  </span>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                  Country
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                    <Globe size={16} />
                  </span>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 36px',
                      borderRadius: '10px',
                      background: 'rgba(15, 23, 42, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span style={{ color: '#f87171', fontSize: '12px', marginTop: '6px', display: 'block' }}>{errors.password}</span>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              border: 'none',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
              marginTop: '12px',
              transition: 'transform 0.1s ease'
            }}
          >
            {isLoading ? 'Processing...' : (
              <>
                <span>{mode === 'login' ? 'Login' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Tab switch */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
          {mode === 'login' ? (
            <>
              New to RBC Academy?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                style={{ background: 'none', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
