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
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const id = 'rbc-login-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    authApi.checkHealth().then(online => setBackendOnline(online));
    const savedEmail = localStorage.getItem('rbc_saved_email');
    if (savedEmail) { setEmail(savedEmail); setRememberMe(true); }
  }, []);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (mode === 'register' && (!name.trim() || name.trim().length < 2)) e.name = 'Full name is required (min 2 characters)';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email address';
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters';
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
      let result;
      if (mode === 'login') {
        result = await authApi.login({ email: email.toLowerCase().trim(), password });
      } else {
        result = await authApi.register({ name: name.trim(), email: email.toLowerCase().trim(), password, phone: phone.trim(), country, role });
      }
      if (result.success && result.user) {
        if (rememberMe) localStorage.setItem('rbc_saved_email', email);
        else localStorage.removeItem('rbc_saved_email');
        setSuccessMsg(result.message || 'Success!');
        setTimeout(() => { onLoginSuccess(result.user!); }, 700);
      } else {
        setErrors({ general: result.message || 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ general: 'Cannot connect to server. Make sure backend is running on port 5000.' });
    } finally {
      setLoading(false);
    }
  };

  // SVG Illustration
  const Illustration = () => (
    <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '380px' }}>
      {/* Desk */}
      <rect x="60" y="270" width="300" height="14" rx="7" fill="#D4AF37" opacity="0.5"/>
      {/* Monitor stand */}
      <rect x="190" y="210" width="14" height="60" rx="4" fill="#1a3d70" opacity="0.7"/>
      <rect x="165" y="266" width="64" height="8" rx="4" fill="#1a3d70" opacity="0.5"/>
      {/* Monitor */}
      <rect x="110" y="140" width="174" height="118" rx="12" fill="#0f2547"/>
      <rect x="118" y="148" width="158" height="100" rx="8" fill="#102A56"/>
      {/* Screen content lines */}
      <rect x="130" y="162" width="80" height="6" rx="3" fill="#D4AF37" opacity="0.8"/>
      <rect x="130" y="176" width="120" height="4" rx="2" fill="white" opacity="0.2"/>
      <rect x="130" y="187" width="100" height="4" rx="2" fill="white" opacity="0.15"/>
      <rect x="130" y="198" width="110" height="4" rx="2" fill="white" opacity="0.1"/>
      <rect x="130" y="214" width="60" height="18" rx="4" fill="#F57C00" opacity="0.8"/>
      {/* Keyboard */}
      <rect x="135" y="278" width="114" height="18" rx="6" fill="#1a3d70" opacity="0.5"/>
      <rect x="141" y="283" width="8" height="6" rx="2" fill="white" opacity="0.2"/>
      <rect x="153" y="283" width="8" height="6" rx="2" fill="white" opacity="0.2"/>
      <rect x="165" y="283" width="8" height="6" rx="2" fill="white" opacity="0.2"/>
      <rect x="177" y="283" width="8" height="6" rx="2" fill="white" opacity="0.2"/>
      <rect x="189" y="283" width="8" height="6" rx="2" fill="white" opacity="0.2"/>
      <rect x="201" y="283" width="8" height="6" rx="2" fill="white" opacity="0.2"/>
      <rect x="213" y="283" width="8" height="6" rx="2" fill="white" opacity="0.2"/>
      <rect x="225" y="283" width="16" height="6" rx="2" fill="white" opacity="0.2"/>
      {/* Mouse */}
      <rect x="265" y="278" width="22" height="28" rx="11" fill="#1a3d70" opacity="0.5"/>
      <rect x="275" y="278" width="1" height="14" fill="white" opacity="0.2"/>
      {/* Chair */}
      <rect x="168" y="310" width="38" height="6" rx="3" fill="#0f2547" opacity="0.6"/>
      <rect x="182" y="316" width="10" height="30" rx="3" fill="#0f2547" opacity="0.5"/>
      <rect x="162" y="342" width="50" height="6" rx="3" fill="#0f2547" opacity="0.4"/>
      {/* Person head */}
      <circle cx="212" cy="106" r="24" fill="#F57C00" opacity="0.15"/>
      <circle cx="212" cy="106" r="18" fill="#F4A261"/>
      {/* Hair */}
      <ellipse cx="212" cy="92" rx="18" ry="8" fill="#1a1a2e"/>
      {/* Eyes */}
      <circle cx="207" cy="107" r="2.5" fill="#1a1a2e"/>
      <circle cx="217" cy="107" r="2.5" fill="#1a1a2e"/>
      {/* Smile */}
      <path d="M207 113 Q212 117 217 113" stroke="#1a1a2e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Body / shirt */}
      <path d="M185 160 Q185 138 212 135 Q239 138 239 160 L245 200 L179 200 Z" fill="#102A56"/>
      {/* Tie */}
      <path d="M210 140 L214 140 L216 175 L212 180 L208 175 Z" fill="#D4AF37"/>
      {/* Arms */}
      <path d="M185 155 Q165 170 162 195" stroke="#F4A261" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <path d="M239 155 Q255 170 255 195" stroke="#F4A261" strokeWidth="10" strokeLinecap="round" fill="none"/>
      {/* Hands on keyboard area */}
      <circle cx="162" cy="200" r="8" fill="#F4A261"/>
      <circle cx="255" cy="200" r="8" fill="#F4A261"/>
      {/* Document floating */}
      <rect x="48" y="150" width="52" height="64" rx="6" fill="white" opacity="0.9" transform="rotate(-8 48 150)"/>
      <rect x="56" y="162" width="32" height="4" rx="2" fill="#102A56" opacity="0.3" transform="rotate(-8 56 162)"/>
      <rect x="54" y="172" width="36" height="3" rx="1.5" fill="#102A56" opacity="0.2" transform="rotate(-8 54 172)"/>
      <rect x="55" y="180" width="28" height="3" rx="1.5" fill="#102A56" opacity="0.2" transform="rotate(-8 55 180)"/>
      <rect x="53" y="188" width="34" height="3" rx="1.5" fill="#102A56" opacity="0.15" transform="rotate(-8 53 188)"/>
      {/* Chart floating right */}
      <rect x="318" y="155" width="52" height="52" rx="6" fill="white" opacity="0.9" transform="rotate(6 318 155)"/>
      <rect x="326" y="187" width="8" height="12" rx="2" fill="#F57C00" opacity="0.7" transform="rotate(6 326 187)"/>
      <rect x="338" y="177" width="8" height="22" rx="2" fill="#102A56" opacity="0.6" transform="rotate(6 338 177)"/>
      <rect x="350" y="170" width="8" height="29" rx="2" fill="#D4AF37" opacity="0.7" transform="rotate(6 350 170)"/>
      {/* Dots decoration */}
      <circle cx="90" cy="110" r="5" fill="#D4AF37" opacity="0.3"/>
      <circle cx="106" cy="98" r="3" fill="#D4AF37" opacity="0.2"/>
      <circle cx="78" cy="96" r="4" fill="#F57C00" opacity="0.2"/>
      <circle cx="320" cy="118" r="5" fill="#D4AF37" opacity="0.3"/>
      <circle cx="335" cy="106" r="3" fill="#F57C00" opacity="0.2"/>
      <circle cx="340" cy="130" r="6" fill="#D4AF37" opacity="0.15"/>
    </svg>
  );

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    color: '#0f172a',
    background: '#f8fafc',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, background 0.2s',
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#102A56';
    e.target.style.background = '#fff';
    e.target.style.boxShadow = '0 0 0 3px rgba(16,42,86,0.07)';
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>, hasError?: boolean) => {
    e.target.style.borderColor = hasError ? '#ef4444' : '#e2e8f0';
    e.target.style.background = '#f8fafc';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#EEF2F7',
      fontFamily: "'Inter', sans-serif",
      alignItems: 'stretch',
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(160deg, #0a1628 0%, #102A56 55%, #1a3d70 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Gold accent top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #D4AF37, #F57C00, #D4AF37)' }} />

        {/* Subtle circle decorations */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.12)' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(245,124,0,0.1)' }} />

        {/* Logo mark */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ fontSize: '42px', fontWeight: '800', color: '#fff', letterSpacing: '-1px', lineHeight: 1 }}>
            <span style={{ color: '#F57C00' }}>r</span>bc
          </div>
          <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', marginTop: '4px', textTransform: 'uppercase' }}>
            Import &amp; Export Academy
          </div>
        </div>

        {/* Illustration */}
        <div style={{ width: '100%', maxWidth: '380px', marginBottom: '36px' }}>
          <Illustration />
        </div>

        {/* Tagline */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px', fontFamily: "'Poppins', sans-serif" }}>
            Trade knowledge made simple
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
            Learn import &amp; export trade from industry<br/>experts, at your own pace.
          </div>
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Certified Courses', 'Global Trade', 'Expert Mentors'].map(f => (
            <div key={f} style={{ padding: '5px 14px', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.3)', fontSize: '11px', fontWeight: '600', color: '#D4AF37', letterSpacing: '0.3px' }}>
              {f}
            </div>
          ))}
        </div>

        {/* Server status */}
        {backendOnline !== null && (
          <div style={{ position: 'absolute', bottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '20px', background: backendOnline ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${backendOnline ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}` }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: backendOnline ? '#22c55e' : '#ef4444' }} />
            <span style={{ fontSize: '11px', color: backendOnline ? '#86efac' : '#fca5a5', fontWeight: '500' }}>
              {backendOnline ? 'Server Online' : 'Server Offline — Check backend'}
            </span>
          </div>
        )}
      </div>

      {/* Right Panel — Form */}
      <div style={{
        width: '480px',
        minWidth: '440px',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 52px',
        boxShadow: '-4px 0 32px rgba(0,0,0,0.06)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: '700', color: '#0f172a', fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.5px' }}>
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
            {mode === 'login' ? 'Welcome back to RBC Academy' : 'Join thousands of trade learners'}
          </p>
        </div>

        {/* Tab Switch */}
        <div style={{ display: 'flex', borderBottom: '2px solid #f1f5f9', marginBottom: '28px', gap: '28px' }}>
          {(['login', 'register'] as AuthMode[]).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => { setMode(m); setErrors({}); setSuccessMsg(''); }}
              style={{
                border: 'none',
                background: 'none',
                padding: '0 0 12px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                color: mode === m ? '#102A56' : '#94a3b8',
                borderBottom: mode === m ? '2px solid #102A56' : '2px solid transparent',
                marginBottom: '-2px',
                transition: 'all 0.2s',
                letterSpacing: '0.2px',
              }}
            >
              {m === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {/* Alerts */}
        {successMsg && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #bbf7d0', marginBottom: '20px', fontSize: '13px', color: '#166534', fontWeight: '500' }}>
            {successMsg}
          </div>
        )}
        {errors.general && (
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', marginBottom: '20px', fontSize: '13px', color: '#dc2626', fontWeight: '500' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Register: Name */}
          {mode === 'register' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
                style={{ ...inputBase, borderColor: errors.name ? '#ef4444' : '#e2e8f0' }}
                onFocus={focus} onBlur={e => blur(e, !!errors.name)} />
              {errors.name && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.name}</div>}
            </div>
          )}

          {/* Register: Phone + Country */}
          {mode === 'register' && (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                  style={inputBase} onFocus={focus} onBlur={e => blur(e)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Country</label>
                <select value={country} onChange={e => setCountry(e.target.value)}
                  style={{ ...inputBase, cursor: 'pointer' }}
                  onFocus={focus} onBlur={e => blur(e)}>
                  {['India', 'UAE', 'USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Register: Role */}
          {mode === 'register' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Account Type</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { value: 'student', label: 'Student' },
                  { value: 'admin', label: 'Admin' },
                ].map(opt => (
                  <button key={opt.value} type="button" onClick={() => setRole(opt.value as 'student' | 'admin')}
                    style={{ flex: 1, padding: '10px', border: `1.5px solid ${role === opt.value ? '#102A56' : '#e2e8f0'}`, borderRadius: '8px', background: role === opt.value ? '#EFF6FF' : '#f8fafc', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: role === opt.value ? '#102A56' : '#94a3b8', transition: 'all 0.2s', fontFamily: "'Inter', sans-serif" }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              {mode === 'login' ? 'Username / Email' : 'Email Address'}
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
              style={{ ...inputBase, borderColor: errors.email ? '#ef4444' : '#e2e8f0' }}
              onFocus={focus} onBlur={e => blur(e, !!errors.email)} />
            {errors.email && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</div>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                style={{ ...inputBase, paddingRight: '44px', borderColor: errors.password ? '#ef4444' : '#e2e8f0' }}
                onFocus={focus} onBlur={e => blur(e, !!errors.password)} />
              <button type="button" onClick={() => setShowPassword(s => !s)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex', alignItems: 'center' }}>
                {/* Eye icon SVG */}
                {showPassword ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                ) : (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                )}
              </button>
            </div>
            {errors.password && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.password}</div>}
          </div>

          {/* Confirm Password (Register) */}
          {mode === 'register' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  style={{ ...inputBase, paddingRight: '44px', borderColor: errors.confirmPassword ? '#ef4444' : '#e2e8f0' }}
                  onFocus={focus} onBlur={e => blur(e, !!errors.confirmPassword)} />
                <button type="button" onClick={() => setShowConfirmPassword(s => !s)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex', alignItems: 'center' }}>
                  {showConfirmPassword ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && <div style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.confirmPassword}</div>}
            </div>
          )}

          {/* Remember me + Forgot password */}
          {mode === 'login' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                  style={{ width: '15px', height: '15px', accentColor: '#102A56', cursor: 'pointer' }} />
                <span style={{ fontSize: '13px', color: '#64748b' }}>Keep me signed in</span>
              </label>
              <button type="button" onClick={() => alert('Contact support: admin@rbcimportandexport.com')}
                style={{ fontSize: '13px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', textDecoration: 'none' }}>
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              border: 'none',
              borderRadius: '8px',
              background: loading ? '#cbd5e1' : '#0f2547',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.2px',
              marginBottom: '20px',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
            {loading ? (
              <>
                <svg style={{ animation: 'spin 0.8s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'login' ? 'Log In' : 'Create Account'
            )}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
            <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '500' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
          </div>

          {/* Toggle mode link */}
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button type="button" onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setErrors({}); setSuccessMsg(''); }}
              style={{ fontSize: '13px', color: '#102A56', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '700' }}>
              {mode === 'login' ? 'Register here' : 'Login here'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid #f8fafc', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
            By continuing you agree to our{' '}
            <span style={{ color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#64748b', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
    </div>
  );
};
