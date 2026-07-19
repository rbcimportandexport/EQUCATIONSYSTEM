import React, { useState, useEffect } from 'react';
import logoEmblem from '../assets/logo_emblem.png';
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
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [rememberMe, setRememberMe] = useState(false);

  // Load fonts
  useEffect(() => {
    const id = 'rbc-login-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cinzel:wght@700&family=Poppins:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }

    // Check backend health
    authApi.checkHealth().then(online => setBackendOnline(online));

    // Check for saved email
    const savedEmail = localStorage.getItem('rbc_saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === 'register') {
      if (!name.trim() || name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters';
      }
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');

    if (!validate()) return;

    setLoading(true);

    try {
      let result;

      if (mode === 'login') {
        result = await authApi.login({ email: email.toLowerCase().trim(), password });
      } else {
        result = await authApi.register({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          phone: phone.trim(),
          country: country.trim(),
          role
        });
      }

      if (result.success && result.user) {
        if (rememberMe) {
          localStorage.setItem('rbc_saved_email', email);
        } else {
          localStorage.removeItem('rbc_saved_email');
        }
        setSuccessMsg(result.message || 'Success!');
        setTimeout(() => {
          onLoginSuccess(result.user!);
        }, 800);
      } else {
        setErrors({ general: result.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ general: 'Could not connect to server. Please make sure the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setErrors({});
    setSuccessMsg('');
    setPassword('');
    setConfirmPassword('');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    color: '#0f172a',
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontFamily: "'Poppins', sans-serif",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #0a1628 0%, #102A56 40%, #1a3d70 70%, #0f2547 100%)',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background geometric decorations */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Top left circle */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.15)', }} />
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.1)', }} />
        {/* Bottom right circle */}
        <div style={{ position: 'absolute', bottom: '-150px', right: '-150px', width: '500px', height: '500px', borderRadius: '50%', border: '1px solid rgba(245,124,0,0.1)', }} />
        {/* Gold accent line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #D4AF37, #F57C00, #D4AF37, transparent)' }} />
        {/* Subtle grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.03 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Left Panel — Branding */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
          <div style={{ width: '90px', height: '90px', marginBottom: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212,175,55,0.3)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <img src={logoEmblem} alt="RBC" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
          </div>
          <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff', letterSpacing: '-0.5px', lineHeight: '1' }}>
            <span style={{ color: '#F57C00' }}>r</span>bc
          </div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.9)', letterSpacing: '1px', marginTop: '4px' }}>
            <span style={{ color: '#F57C00' }}>I</span>mport &amp; <span style={{ color: '#F57C00' }}>E</span>xport
          </div>
        </div>

        {/* Academy name */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'Cinzel', serif", marginBottom: '8px' }}>
            RBC Import &amp; Export Academy
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', fontStyle: 'italic' }}>
            Learn • Trade • Grow Globally
          </div>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '340px', width: '100%' }}>
          {[
            { icon: '📚', title: 'Comprehensive Curriculum', desc: 'Industry-aligned Import & Export courses' },
            { icon: '🌐', title: 'Global Trade Expertise', desc: 'Learn from real-world trade experts' },
            { icon: '🏆', title: 'Certified Learning', desc: 'Get internationally recognized certificates' },
            { icon: '📊', title: 'Track Your Progress', desc: 'Monitor your learning journey in real-time' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '2px' }}>{item.title}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.4' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Backend status indicator */}
        {backendOnline !== null && (
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: backendOnline ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${backendOnline ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: backendOnline ? '#22c55e' : '#ef4444' }} />
            <span style={{ fontSize: '11px', color: backendOnline ? '#86efac' : '#fca5a5', fontWeight: '600' }}>
              {backendOnline ? 'Server Online' : 'Server Offline — Check backend'}
            </span>
          </div>
        )}
      </div>

      {/* Right Panel — Auth Form */}
      <div style={{
        width: '480px',
        minWidth: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 48px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '24px',
          padding: '40px 36px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2)',
          backdropFilter: 'blur(20px)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}>
          {/* Form header */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px', fontFamily: "'Inter', sans-serif" }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              {mode === 'login'
                ? 'Sign in to continue your learning journey'
                : 'Join RBC Academy and start learning today'}
            </p>
          </div>

          {/* Mode Toggle */}
          <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
            {(['login', 'register'] as AuthMode[]).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setErrors({}); }}
                style={{
                  flex: 1,
                  padding: '9px',
                  border: 'none',
                  borderRadius: '9px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.2s',
                  background: mode === m ? '#fff' : 'transparent',
                  color: mode === m ? '#102A56' : '#94a3b8',
                  boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                {m === 'login' ? '🔑 Login' : '✨ Register'}
              </button>
            ))}
          </div>

          {/* Success Message */}
          {successMsg && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#f0fdf4', border: '1px solid #86efac', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: '#166534', fontWeight: '600' }}>✅ {successMsg}</div>
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fca5a5', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '600' }}>❌ {errors.general}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Register fields */}
            {mode === 'register' && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your full name"
                    style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : '#e2e8f0' }}
                    onFocus={e => { e.target.style.borderColor = '#102A56'; e.target.style.boxShadow = '0 0 0 3px rgba(16,42,86,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.name ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                  {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#102A56'; e.target.style.boxShadow = '0 0 0 3px rgba(16,42,86,0.08)'; }}
                      onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Country</label>
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      {['India', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Account Type</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                      { value: 'student', label: '🎓 Student', desc: 'Access courses & track progress' },
                      { value: 'admin', label: '⚙️ Admin', desc: 'Manage content & users' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRole(opt.value as 'student' | 'admin')}
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          border: `2px solid ${role === opt.value ? '#102A56' : '#e2e8f0'}`,
                          borderRadius: '10px',
                          background: role === opt.value ? '#EFF6FF' : '#fff',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: '700', color: role === opt.value ? '#102A56' : '#475569' }}>{opt.label}</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : '#e2e8f0' }}
                onFocus={e => { e.target.style.borderColor = '#102A56'; e.target.style.boxShadow = '0 0 0 3px rgba(16,42,86,0.08)'; }}
                onBlur={e => { e.target.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
              />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={mode === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                  style={{ ...inputStyle, paddingRight: '48px', borderColor: errors.password ? '#ef4444' : '#e2e8f0' }}
                  onFocus={e => { e.target.style.borderColor = '#102A56'; e.target.style.boxShadow = '0 0 0 3px rgba(16,42,86,0.08)'; }}
                  onBlur={e => { e.target.style.borderColor = errors.password ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '16px', padding: '0' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <div style={errorStyle}>{errors.password}</div>}
            </div>

            {/* Confirm Password (Register only) */}
            {mode === 'register' && (
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    style={{ ...inputStyle, paddingRight: '48px', borderColor: errors.confirmPassword ? '#ef4444' : '#e2e8f0' }}
                    onFocus={e => { e.target.style.borderColor = '#102A56'; e.target.style.boxShadow = '0 0 0 3px rgba(16,42,86,0.08)'; }}
                    onBlur={e => { e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(s => !s)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '16px', padding: '0' }}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
              </div>
            )}

            {/* Remember me / Forgot password row */}
            {mode === 'login' && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    style={{ width: '16px', height: '16px', accentColor: '#102A56' }}
                  />
                  <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Please contact support: admin@rbcimportandexport.com')}
                  style={{ fontSize: '13px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                border: 'none',
                borderRadius: '12px',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #102A56 0%, #1a3d70 100%)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.3px',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(16,42,86,0.35)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'login' ? '🔑 Sign In to Academy' : '✨ Create My Account'
              )}
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            {/* Toggle Mode */}
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                style={{ fontSize: '14px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700' }}
              >
                {mode === 'login' ? 'Register here' : 'Login here'}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
              By continuing, you agree to our{' '}
              <span style={{ color: '#102A56', cursor: 'pointer', fontWeight: '600' }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: '#102A56', cursor: 'pointer', fontWeight: '600' }}>Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
