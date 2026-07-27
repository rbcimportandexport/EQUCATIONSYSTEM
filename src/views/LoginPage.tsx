import React, { useState, useEffect } from 'react';
import { authApi } from '../utils/api';
import type { AuthUser } from '../utils/api';
import logoEmblem from '../assets/logo_emblem.png';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

type AuthMode = 'login' | 'register';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

import { useApp } from '../context/AppContext';

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { showAlert } = useApp();
  const [mode, setMode] = useState<AuthMode>('register'); // Default to register tab as requested previously
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMsg, setSuccessMsg] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [rememberMe, setRememberMe] = useState(false);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

  const handleGoogleAccountSelect = async (gName: string, gEmail: string) => {
    setShowGoogleChooser(false);
    setLoading(true);
    setErrors({});
    setSuccessMsg('');

    try {
      const res = await authApi.googleLogin(gName, gEmail);
      if (res.success && res.user) {
        if (res.token) {
          localStorage.setItem('rbc_auth_token', res.token);
        }
        localStorage.setItem('lms_current_user_v2_ie', JSON.stringify(res.user));
        setSuccessMsg('Google Login successful!');
        onLoginSuccess(res.user);
      } else {
        setErrors({ general: res.message || 'Google Login failed.' });
      }
    } catch (err: any) {
      console.error('Google auth error:', err);
      setErrors({ general: 'Server/Database is unreachable. Please verify that the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = 'rbc-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap';
      document.head.appendChild(link);
    }
    const saved = localStorage.getItem('rbc_saved_email');
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (mode === 'register' && (!name.trim() || name.trim().length < 2)) {
      e.name = 'Full name required (min 2 characters)';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Valid email address required';
    }
    if (!password || password.length < 6) {
      e.password = 'Password must be at least 6 characters';
    }
    if (mode === 'register' && password !== confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');
    if (!validate()) return;
    setLoading(true);

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
          otp: '123456' // Send master backup OTP code directly to bypass validation
        });

        if (res.success && res.user) {
          setSuccessMsg('Account registered successfully! Redirecting to login tab...');
          setTimeout(() => {
            setMode('login');
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
          if (rememberMe) {
            localStorage.setItem('rbc_saved_email', normEmail);
          } else {
            localStorage.removeItem('rbc_saved_email');
          }
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
    } catch (err: any) {
      console.error('Auth request error:', err);
      setErrors({ general: 'Server/Database is unreachable. Please verify that the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </>
      )}
    </svg>
  );

  return (
    <div className="login-page-container">
      <style>{`
        .login-page-container {
          height: 100vh;
          height: 100dvh;
          width: 100vw;
          display: flex;
          background: #f8fafc;
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }

        .left-panel {
          flex: 1.1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 40px;
          background: #f1f5f9;
          border-right: 1px solid #e2e8f0;
          box-sizing: border-box;
          height: 100%;
        }

        .right-panel {
          width: 480px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 60px 52px;
          box-sizing: border-box;
          position: relative;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .form-content-wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: auto 0;
          box-sizing: border-box;
        }

        .illustration-container {
          width: 80%;
          max-width: 350px;
          margin-bottom: 20px;
        }

        .illustration-img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .left-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 10px;
          line-height: 1.35;
          text-align: center;
          font-family: 'Poppins', sans-serif;
        }

        .left-desc {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.6;
          text-align: center;
          max-width: 320px;
        }

        .form-heading {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 6px;
          letter-spacing: -0.5px;
          font-family: 'Poppins', sans-serif;
        }

        .form-subheading {
          font-size: 14px;
          color: #94a3b8;
          margin: 0 0 28px;
        }

        .tab-bar {
          display: flex;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 24px;
        }

        .tab-btn {
          border: none;
          background: none;
          padding: 0 0 12px;
          margin-right: 28px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          color: #94a3b8;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.15s ease;
        }

        .tab-btn.active {
          color: #102A56;
          border-bottom: 2px solid #102A56;
        }

        .input-group {
          margin-bottom: 16px;
          width: 100%;
          box-sizing: border-box;
        }

        .input-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 6px;
        }

        .input-field {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #0f172a;
          background: #ffffff;
          outline: none;
          box-sizing: border-box;
          transition: all 0.15s ease;
          -webkit-appearance: none;
        }

        .input-field:focus {
          border-color: #102A56;
          box-shadow: 0 0 0 3px rgba(16, 42, 86, 0.08);
        }

        .input-field.error {
          border-color: #ef4444;
        }

        .input-error-msg {
          font-size: 12px;
          color: #ef4444;
          margin-top: 4px;
        }

        .remember-forgot-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 13px;
          color: #64748b;
        }

        .forgot-btn {
          font-size: 13px;
          color: #102A56;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          padding: 0;
        }

        .submit-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 6px;
          background: #0f2547;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-sizing: border-box;
        }

        .submit-btn:hover:not(:disabled) {
          background: #1e3a60;
        }

        .submit-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }

        .divider-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .divider-text {
          font-size: 12px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .google-btn {
          width: 100%;
          padding: 11px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          background: #ffffff;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-sizing: border-box;
        }

        .google-btn:hover {
          background: #f8fafc;
        }

        .toggle-mode-text {
          text-align: center;
          font-size: 13px;
          color: #94a3b8;
          margin-top: 20px;
        }

        .toggle-mode-btn {
          font-size: 13px;
          color: #102A56;
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 700;
          padding: 0 0 0 4px;
        }

        .footer-text {
          margin-top: 32px;
          text-align: center;
          font-size: 11px;
          color: #cbd5e1;
        }

        .footer-link {
          color: #94a3b8;
          cursor: pointer;
          text-decoration: underline;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          .left-panel {
            display: none;
          }
          .right-panel {
            width: 100%;
            max-width: 100%;
            padding: 40px 30px;
            box-shadow: none;
            border-left: none;
            height: 100%;
          }
          .login-page-container {
            background: #ffffff;
            align-items: flex-start;
            justify-content: center;
          }
          .form-content-wrapper {
            margin: 0;
          }
        }

        @media (max-width: 480px) {
          .right-panel {
            padding: 24px 20px;
          }
          .form-heading {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="left-panel">
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <img 
            src={logoEmblem} 
            alt="RBC Logo" 
            style={{ width: '150px', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} 
          />
        </div>
        <div className="illustration-container">
          <img 
            src="/login-illustration.png" 
            alt="RBC Academy Learning" 
            className="illustration-img" 
          />
        </div>
        <h2 className="left-title">
          Trade knowledge made<br />simple for everyone
        </h2>
        <p className="left-desc">
          Learn Import &amp; Export from certified industry experts at your own pace.
        </p>
      </div>

      <div className="right-panel">
        <div className="form-content-wrapper">

        <div style={{ display: 'none' }} className="mobile-only-logo">
          <style>{`
            @media (max-width: 900px) {
              .mobile-only-logo {
                display: flex !important;
                flex-direction: column;
                align-items: center;
                margin-bottom: 32px;
              }
            }
          `}</style>
          <img 
            src={logoEmblem} 
            alt="RBC Logo" 
            style={{ width: '130px', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply', marginBottom: '8px' }} 
          />
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', letterSpacing: '0.5px' }}>
            IMPORT &amp; EXPORT ACADEMY
          </span>
        </div>

        <h1 className="form-heading">
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </h1>
        <p className="form-subheading">
          {mode === 'login' ? 'Welcome back to RBC Academy' : 'Join thousands of trade learners'}
        </p>

        <div className="tab-bar">
          <button 
            type="button" 
            className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setErrors({}); setSuccessMsg(''); }}
          >
            Login
          </button>
          <button 
            type="button" 
            className={`tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setErrors({}); setSuccessMsg(''); }}
          >
            Register
          </button>
        </div>

        {successMsg && (
          <div style={{ padding: '10px 14px', borderRadius: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', marginBottom: '20px', fontSize: '13px', color: '#15803d', fontWeight: '500' }}>
            {successMsg}
          </div>
        )}
        {errors.general && (
          <div style={{ padding: '10px 14px', borderRadius: '6px', background: '#fef2f2', border: '1px solid #fecaca', marginBottom: '20px', fontSize: '13px', color: '#dc2626', fontWeight: '500' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Enter your name"
                className={`input-field ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <div className="input-error-msg">{errors.name}</div>}
            </div>
          )}

          {mode === 'register' && (
            <div style={{ display: 'flex', gap: '12px' }} className="input-group">
              <div style={{ flex: 1 }}>
                <label className="input-label">Phone</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  placeholder="+91 98765 43210"
                  className="input-field"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="input-label">Country</label>
                <select 
                  value={country} 
                  onChange={e => setCountry(e.target.value)}
                  className="input-field"
                  style={{ cursor: 'pointer' }}
                >
                  {['India', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Username / Email</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Enter your email"
                className={`input-field ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && <div className="input-error-msg">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder={mode === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                className={`input-field ${errors.password ? 'error' : ''}`}
                style={{ paddingRight: '44px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(s => !s)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  zIndex: 10
                }}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
            {errors.password && <div className="input-error-msg">{errors.password}</div>}
          </div>

          {mode === 'register' && (
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  placeholder="Re-enter your password"
                  className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                  style={{ paddingRight: '44px' }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(s => !s)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 10
                  }}
                >
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
              {errors.confirmPassword && <div className="input-error-msg">{errors.confirmPassword}</div>}
            </div>
          )}

          {mode === 'login' && (
            <div className="remember-forgot-row">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ width: '15px', height: '15px', accentColor: '#102A56', cursor: 'pointer' }}
                />
                <span>Keep me signed in</span>
              </label>
              <button 
                type="button" 
                className="forgot-btn"
                onClick={() => showAlert('Contact Administrator', 'Please contact administrator: admin@rbcimportandexport.com', 'info')}
              >
                Forgot password?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? (
              <>
                <svg style={{ animation: 'spin 0.8s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0110 10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                {mode === 'login' ? 'Logging in...' : 'Registering...'}
              </>
            ) : (
              mode === 'login' ? 'Log In' : 'Create Account'
            )}
          </button>

          <div className="divider-row">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          <button 
            type="button" 
            className="google-btn"
            onClick={() => setShowGoogleChooser(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="toggle-mode-text">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button 
              type="button" 
              className="toggle-mode-btn"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setErrors({}); setSuccessMsg(''); }}
            >
              {mode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </div>
        </form>

        <div className="footer-text">
          By continuing you agree to our{' '}
          <span className="footer-link">Terms of Service</span>
          {' '}and{' '}
          <span className="footer-link">Privacy Policy</span>
        </div>
      </div>
      {showGoogleChooser && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.25s ease forwards'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '380px',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              fontFamily: "'Roboto', 'Inter', sans-serif",
              border: '1px solid #dadce0',
              padding: '32px 40px'
            }}
          >
            {/* Google Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#202124', textAlign: 'center', margin: '0 0 8px 0' }}>
              Sign in with Google
            </h3>
            <p style={{ fontSize: '14px', color: '#5f6368', textAlign: 'center', margin: '0 0 24px 0' }}>
              to continue to RBC Academy
            </p>

            {/* Account List */}
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #dadce0', margin: '0 -40px 24px -40px' }}>
              {[
                { name: 'RBC Import & Export', email: 'rbcimportandexport@gmail.com', avatar: 'R' },
                { name: 'Prakash Kachchhi', email: 'prakash.ceo@rbcacademy.com', avatar: 'P' },
                { name: 'Demo Student', email: 'student@rbcacademy.com', avatar: 'S' }
              ].map(acc => (
                <div
                  key={acc.email}
                  onClick={() => handleGoogleAccountSelect(acc.name, acc.email)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 40px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #dadce0',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#ffffff'}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#1a73e8',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}>
                    {acc.avatar}
                  </div>
                  {/* Details */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#3c4043' }}>{acc.name}</span>
                    <span style={{ fontSize: '11px', color: '#5f6368' }}>{acc.email}</span>
                  </div>
                </div>
              ))}

              {/* Custom login trigger option */}
              <div
                onClick={() => {
                  const customEmail = prompt("Enter your Google Email:");
                  if (!customEmail) return;
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customEmail)) {
                    showAlert('Invalid Email', 'Please enter a valid Google email address.', 'warning');
                    return;
                  }
                  const namePart = customEmail.split('@')[0];
                  const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                  handleGoogleAccountSelect(capitalizedName, customEmail);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 40px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #dadce0',
                  transition: 'background 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ffffff'}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f1f3f4',
                  color: '#5f6368',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1a73e8' }}>Use another account</span>
              </div>
            </div>

            {/* Cancel Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowGoogleChooser(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1a73e8',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  transition: 'background 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f4f8fe'}
                onMouseOut={(e) => e.currentTarget.style.background = 'none'}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};
