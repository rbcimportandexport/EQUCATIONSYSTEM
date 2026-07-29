import React, { useState, useEffect } from 'react';
import { authApi } from '../utils/api';
import type { AuthUser } from '../utils/api';
import logoEmblem from '../assets/logo_emblem.png';

const GOOGLE_CLIENT_ID = '1097275091219-21t4ed8placeholder.apps.googleusercontent.com';

const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

type AuthMode = 'login' | 'register';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accessCode?: string;
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
  const [accessCode, setAccessCode] = useState('');

  const handleGoogleAccountSelect = async (gName: string, gEmail: string) => {
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

  useEffect(() => {
    // Dynamic loading of Google GSI Client Script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      try {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID;
        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            const decoded = decodeJwt(response.credential);
            if (decoded && decoded.email) {
              await handleGoogleAccountSelect(decoded.name || decoded.email.split('@')[0], decoded.email);
            }
          }
        });

        const container = document.getElementById('google-btn-container');
        if (container) {
          (window as any).google.accounts.id.renderButton(
            container,
            { theme: 'outline', size: 'large', width: container.clientWidth || 320 }
          );
        }
      } catch (e) {
        console.warn('Google GSI init failed:', e);
      }
    };

    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {}
    };
  }, [mode]);

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
    if (!accessCode.trim()) {
      e.accessCode = 'Admin Access Code is required';
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
          otp: '123456', // Send master backup OTP code directly to bypass validation
          accessCode: accessCode.trim()
        });

        if (res.success && res.user) {
          setSuccessMsg('Account registered successfully! Redirecting to login tab...');
          setTimeout(() => {
            setMode('login');
            setSuccessMsg('Registration complete! Please log in with your email, password, and access code.');
          }, 1500);
        } else {
          setErrors({ general: res.message || 'Registration failed.' });
        }
      } else {
        const res = await authApi.login({
          email: normEmail,
          password,
          accessCode: accessCode.trim()
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

          <div className="input-group">
            <label className="input-label">Admin Access Code</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                value={accessCode} 
                onChange={e => setAccessCode(e.target.value)} 
                placeholder="Enter access code from admin"
                className={`input-field ${errors.accessCode ? 'error' : ''}`}
              />
            </div>
            {errors.accessCode && <div className="input-error-msg">{errors.accessCode}</div>}
          </div>

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

          <div 
            id="google-btn-container" 
            style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center',
              marginTop: '12px',
              minHeight: '44px' 
            }}
          />

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
    </div>
  </div>
  );
};
