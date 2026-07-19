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

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const id = 'rbc-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    const saved = localStorage.getItem('rbc_saved_email');
    if (saved) { setEmail(saved); setRememberMe(true); }

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (mode === 'register' && (!name.trim() || name.trim().length < 2)) e.name = 'Full name required (min 2 chars)';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Valid email required';
    if (!password || password.length < 6) e.password = 'Minimum 6 characters';
    if (mode === 'register' && password !== confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');
    if (!validate()) return;
    setLoading(true);
    try {
      const result = mode === 'login'
        ? await authApi.login({ email: email.toLowerCase().trim(), password })
        : await authApi.register({ name: name.trim(), email: email.toLowerCase().trim(), password, phone, country, role });

      if (result.success && result.user) {
        if (rememberMe) localStorage.setItem('rbc_saved_email', email);
        else localStorage.removeItem('rbc_saved_email');
        setSuccessMsg(result.message || 'Success!');
        setTimeout(() => onLoginSuccess(result.user!), 600);
      } else {
        setErrors({ general: result.message || 'Something went wrong.' });
      }
    } catch {
      setErrors({ general: 'Cannot connect to server. Make sure backend is running on port 5000.' });
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = ({ open }: { open: boolean }) => (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open
        ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      }
    </svg>
  );

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    color: '#111827',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    WebkitAppearance: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '6px',
  };

  const errStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px',
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#102A56';
    e.target.style.boxShadow = '0 0 0 3px rgba(16,42,86,0.1)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>, err?: boolean) => {
    e.target.style.borderColor = err ? '#f87171' : '#d1d5db';
    e.target.style.boxShadow = 'none';
  };

  const Field = ({
    label, type, value, onChange, placeholder, error, toggle, show, onToggle
  }: {
    label: string; type: string; value: string; onChange: (v: string) => void;
    placeholder: string; error?: string; toggle?: boolean; show?: boolean; onToggle?: () => void;
  }) => (
    <div style={{ marginBottom: '14px' }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, paddingRight: toggle ? '44px' : '14px', borderColor: error ? '#f87171' : '#d1d5db' }}
          onFocus={onFocus} onBlur={e => onBlur(e, !!error)}
        />
        {toggle && (
          <button type="button" onClick={onToggle}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
            <EyeIcon open={show!} />
          </button>
        )}
      </div>
      {error && <div style={errStyle}>{error}</div>}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      background: '#f5f6fa',
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* ─── Left Panel (Desktop only) ─── */}
      {!isMobile && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 48px',
          background: '#f5f6fa',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img src={logoEmblem} alt="RBC" style={{ width: '160px', height: 'auto', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          <div style={{ width: '100%', maxWidth: '380px', marginBottom: '36px' }}>
            <img src="/login-illustration.png" alt="RBC Academy" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>
          <div style={{ textAlign: 'center', maxWidth: '320px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 10px', lineHeight: '1.35' }}>
              Trade knowledge made<br />simple for everyone
            </h2>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
              Learn Import &amp; Export from certified industry experts at your own pace.
            </p>
          </div>
        </div>
      )}

      {/* ─── Right Panel / Full Screen on Mobile ─── */}
      <div style={{
        width: isMobile ? '100%' : '460px',
        minWidth: isMobile ? 'unset' : '420px',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '0' : '60px 48px',
        borderLeft: isMobile ? 'none' : '1px solid #e5e7eb',
        minHeight: isMobile ? '100dvh' : 'auto',
      }}>

        {/* Mobile Top Header */}
        {isMobile && (
          <div style={{
            background: 'linear-gradient(160deg, #0a1628 0%, #102A56 100%)',
            padding: '40px 24px 32px',
            textAlign: 'center',
            borderRadius: '0 0 28px 28px',
            marginBottom: '8px',
          }}>
            <img src={logoEmblem} alt="RBC" style={{ width: '110px', height: 'auto', objectFit: 'contain', mixBlendMode: 'lighten', marginBottom: '12px' }} />
            <div style={{ fontSize: '17px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
              RBC Import &amp; Export Academy
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
              Learn • Trade • Grow Globally
            </div>
          </div>
        )}

        {/* Form Container */}
        <div style={{
          padding: isMobile ? '24px 20px 40px' : '0',
          flex: 1,
          overflowY: isMobile ? 'auto' : 'visible',
        }}>
          {/* Heading */}
          <h1 style={{ margin: '0 0 4px', fontSize: isMobile ? '24px' : '26px', fontWeight: '700', color: '#111827', letterSpacing: '-0.4px' }}>
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </h1>
          <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#9ca3af' }}>
            {mode === 'login' ? 'Welcome back to RBC Academy' : 'Join thousands of trade learners'}
          </p>

          {/* Tab Switch */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '20px' }}>
            {(['login', 'register'] as AuthMode[]).map(m => (
              <button key={m} type="button"
                onClick={() => { setMode(m); setErrors({}); setSuccessMsg(''); }}
                style={{
                  border: 'none', background: 'none',
                  padding: '0 0 11px', marginRight: '24px',
                  fontSize: '14px', fontWeight: '600',
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  color: mode === m ? '#102A56' : '#9ca3af',
                  borderBottom: mode === m ? '2px solid #102A56' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'all 0.15s',
                }}>
                {m === 'login' ? 'Login' : 'Register'}
              </button>
            ))}
          </div>

          {/* Alerts */}
          {successMsg && (
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', marginBottom: '16px', fontSize: '13px', color: '#15803d' }}>
              {successMsg}
            </div>
          )}
          {errors.general && (
            <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', marginBottom: '16px', fontSize: '13px', color: '#dc2626' }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Register: Name */}
            {mode === 'register' && (
              <Field label="Full Name" type="text" value={name} onChange={setName}
                placeholder="Your full name" error={errors.name} />
            )}

            {/* Register: Phone + Country */}
            {mode === 'register' && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                    style={inputStyle} onFocus={onFocus} onBlur={e => onBlur(e)} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Country</label>
                  <select value={country} onChange={e => setCountry(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={onFocus} onBlur={e => onBlur(e)}>
                    {['India', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Other'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            {/* Register: Role */}
            {mode === 'register' && (
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Account Type</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['student', 'admin'].map(r => (
                    <button key={r} type="button" onClick={() => setRole(r as 'student' | 'admin')}
                      style={{ flex: 1, padding: '10px 12px', border: `1.5px solid ${role === r ? '#102A56' : '#d1d5db'}`, borderRadius: '8px', background: role === r ? '#EFF6FF' : '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '500', color: role === r ? '#102A56' : '#6b7280', fontFamily: "'Inter', sans-serif", transition: 'all 0.15s', textTransform: 'capitalize' }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Field
              label="Username / Email" type="email" value={email} onChange={setEmail}
              placeholder="email@example.com" error={errors.email}
            />

            <Field
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password} onChange={setPassword}
              placeholder={mode === 'login' ? 'Enter your password' : 'Min. 6 characters'}
              error={errors.password} toggle show={showPassword}
              onToggle={() => setShowPassword(s => !s)}
            />

            {mode === 'register' && (
              <Field
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword} onChange={setConfirmPassword}
                placeholder="Re-enter your password"
                error={errors.confirmPassword} toggle show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(s => !s)}
              />
            )}

            {/* Remember + Forgot */}
            {mode === 'login' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', marginTop: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#102A56', cursor: 'pointer' }} />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Keep me signed in</span>
                </label>
                <button type="button" onClick={() => alert('Contact: admin@rbcimportandexport.com')}
                  style={{ fontSize: '14px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width: '100%',
                padding: isMobile ? '14px' : '13px',
                border: 'none',
                borderRadius: '8px',
                background: loading ? '#9ca3af' : '#0f2547',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Inter', sans-serif",
                marginBottom: '16px',
                marginTop: mode === 'register' ? '6px' : '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 0.15s',
                WebkitTapHighlightColor: 'transparent',
              }}>
              {loading
                ? <><svg style={{ animation: 'lspin 0.8s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>{mode === 'login' ? 'Signing in...' : 'Creating...'}</>
                : (mode === 'login' ? 'Log In' : 'Create Account')}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
              <span style={{ fontSize: '12px', color: '#d1d5db' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            </div>

            {/* Toggle */}
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button type="button"
                onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setErrors({}); setSuccessMsg(''); }}
                style={{ fontSize: '14px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700', padding: 0 }}>
                {mode === 'login' ? 'Register here' : 'Login here'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f3f4f6', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#d1d5db' }}>
              By continuing you agree to our{' '}
              <span style={{ color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lspin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        * { -webkit-tap-highlight-color: transparent; }
        input, select, button { -webkit-appearance: none; -moz-appearance: none; }
        @media (max-width: 767px) {
          html, body { overflow-x: hidden; }
        }
      `}</style>
    </div>
  );
};
