import React, { useState, useEffect } from 'react';
import { authApi } from '../utils/api';
import type { AuthUser } from '../utils/api';

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
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (mode === 'register' && (!name.trim() || name.trim().length < 2)) e.name = 'Full name required';
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
      setErrors({ general: 'Cannot connect to server. Make sure backend is running.' });
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

  const field = (
    label: string,
    type: string,
    value: string,
    onChange: (v: string) => void,
    placeholder: string,
    error?: string,
    showToggle?: boolean,
    show?: boolean,
    onToggle?: () => void
  ) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: showToggle ? '10px 42px 10px 12px' : '10px 12px',
            border: `1px solid ${error ? '#f87171' : '#d1d5db'}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: "'Inter', sans-serif",
            color: '#111827',
            background: '#fff',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => { e.target.style.borderColor = '#102A56'; e.target.style.boxShadow = '0 0 0 2px rgba(16,42,86,0.1)'; }}
          onBlur={e => { e.target.style.borderColor = error ? '#f87171' : '#d1d5db'; e.target.style.boxShadow = 'none'; }}
        />
        {showToggle && (
          <button type="button" onClick={onToggle}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <EyeIcon open={show!} />
          </button>
        )}
      </div>
      {error && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{error}</div>}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f5f6fa', fontFamily: "'Inter', sans-serif" }}>

      {/* Left Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
        background: '#f5f6fa',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#102A56', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#F57C00', fontWeight: '800', fontSize: '18px' }}>r</span>
            </div>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#102A56', letterSpacing: '-0.5px' }}>
              RBC Academy
            </span>
          </div>
        </div>

        {/* Illustration */}
        <div style={{ width: '100%', maxWidth: '400px', marginBottom: '40px' }}>
          <img
            src="/login-illustration.png"
            alt="RBC Academy"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center', maxWidth: '340px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: '0 0 10px', lineHeight: '1.3' }}>
            Trade knowledge made<br />simple for everyone
          </h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
            Learn Import &amp; Export from certified industry experts at your own pace.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '460px',
        minWidth: '420px',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 48px',
        borderLeft: '1px solid #e5e7eb',
      }}>
        {/* Heading */}
        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '700', color: '#111827', letterSpacing: '-0.4px' }}>
          {mode === 'login' ? 'Log In' : 'Create Account'}
        </h1>
        <p style={{ margin: '0 0 28px', fontSize: '14px', color: '#9ca3af' }}>
          {mode === 'login' ? 'Welcome back to RBC Academy' : 'Join thousands of trade learners'}
        </p>

        {/* Tab Switch */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
          {(['login', 'register'] as AuthMode[]).map(m => (
            <button key={m} type="button"
              onClick={() => { setMode(m); setErrors({}); setSuccessMsg(''); }}
              style={{
                border: 'none', background: 'none',
                padding: '0 0 12px', marginRight: '24px',
                fontSize: '14px', fontWeight: '600', fontFamily: "'Inter', sans-serif",
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
          <div style={{ padding: '10px 14px', borderRadius: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', marginBottom: '16px', fontSize: '13px', color: '#15803d' }}>
            {successMsg}
          </div>
        )}
        {errors.general && (
          <div style={{ padding: '10px 14px', borderRadius: '6px', background: '#fef2f2', border: '1px solid #fecaca', marginBottom: '16px', fontSize: '13px', color: '#dc2626' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && field('Full Name', 'text', name, setName, 'Your full name', errors.name)}

          {mode === 'register' && (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: "'Inter', sans-serif", color: '#111827', background: '#fff', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => { e.target.style.borderColor = '#102A56'; e.target.style.boxShadow = '0 0 0 2px rgba(16,42,86,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#d1d5db'; e.target.style.boxShadow = 'none'; }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Country</label>
                <select value={country} onChange={e => setCountry(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontFamily: "'Inter', sans-serif", color: '#111827', background: '#fff', outline: 'none', boxSizing: 'border-box', cursor: 'pointer' }}>
                  {['India', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Account Type</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['student', 'admin'].map(r => (
                  <button key={r} type="button" onClick={() => setRole(r as 'student' | 'admin')}
                    style={{ flex: 1, padding: '9px 12px', border: `1px solid ${role === r ? '#102A56' : '#d1d5db'}`, borderRadius: '6px', background: role === r ? '#EFF6FF' : '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: role === r ? '#102A56' : '#6b7280', fontFamily: "'Inter', sans-serif", transition: 'all 0.15s', textTransform: 'capitalize' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {field('Username / Email', 'email', email, setEmail, 'email@example.com', errors.email)}

          {field('Password', showPassword ? 'text' : 'password', password, setPassword,
            mode === 'login' ? 'Enter your password' : 'Min. 6 characters',
            errors.password, true, showPassword, () => setShowPassword(s => !s))}

          {mode === 'register' && field('Confirm Password', showConfirmPassword ? 'text' : 'password',
            confirmPassword, setConfirmPassword, 'Re-enter your password',
            errors.confirmPassword, true, showConfirmPassword, () => setShowConfirmPassword(s => !s))}

          {mode === 'login' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                  style={{ width: '15px', height: '15px', accentColor: '#102A56', cursor: 'pointer' }} />
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Keep me signed in</span>
              </label>
              <button type="button" onClick={() => alert('Contact: admin@rbcimportandexport.com')}
                style={{ fontSize: '13px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '12px',
              border: 'none', borderRadius: '6px',
              background: loading ? '#9ca3af' : '#0f2547',
              color: '#fff', fontSize: '14px', fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Inter', sans-serif",
              marginBottom: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'background 0.15s',
            }}>
            {loading
              ? <><svg style={{ animation: 'lspin 0.8s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg> {mode === 'login' ? 'Signing in...' : 'Creating...'}</>
              : (mode === 'login' ? 'Log In' : 'Create Account')}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            <span style={{ fontSize: '12px', color: '#d1d5db' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button type="button"
              onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setErrors({}); setSuccessMsg(''); }}
              style={{ fontSize: '13px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700' }}>
              {mode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#d1d5db' }}>
            By continuing you agree to our{' '}
            <span style={{ color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#9ca3af', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
          </span>
        </div>
      </div>

      <style>{`@keyframes lspin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  );
};
