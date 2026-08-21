import React, { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';
import { LoginPage } from './views/LoginPage';
import { authApi } from './utils/api';
import type { AuthUser } from './utils/api';

// Dynamic Lazy Import Views for Code-Splitting & Instant Load Performance
const Dashboard = React.lazy(() => import('./views/Dashboard').then(m => ({ default: m.Dashboard })));
const Courses = React.lazy(() => import('./views/Courses').then(m => ({ default: m.Courses })));
const ModuleScreen = React.lazy(() => import('./views/ModuleScreen').then(m => ({ default: m.ModuleScreen })));
const Bookmarks = React.lazy(() => import('./views/Bookmarks').then(m => ({ default: m.Bookmarks })));
const Downloads = React.lazy(() => import('./views/Downloads').then(m => ({ default: m.Downloads })));
const Search = React.lazy(() => import('./views/Search').then(m => ({ default: m.Search })));
const Profile = React.lazy(() => import('./views/Profile').then(m => ({ default: m.Profile })));
const Settings = React.lazy(() => import('./views/Settings').then(m => ({ default: m.Settings })));
const AdminPanel = React.lazy(() => import('./views/AdminPanel').then(m => ({ default: m.AdminPanel })));
const QuizScreen = React.lazy(() => import('./views/QuizScreen').then(m => ({ default: m.QuizScreen })));
const CommunityScreen = React.lazy(() => import('./views/CommunityScreen').then(m => ({ default: m.CommunityScreen })));
const VideosScreen = React.lazy(() => import('./views/VideosScreen').then(m => ({ default: m.VideosScreen })));
import { PencilLoader } from './components/PencilLoader';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppShell: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    setUserRole, 
    loginUser, 
    setCurrentUser,
    toasts,
    removeToast,
    alertModal,
    closeAlert,
    confirmModal,
    closeConfirm
  } = useApp();
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Anti-DevTools & Content Protection ───────────────────────────────────
  useEffect(() => {
    // ── Helper: Show/Hide the full-screen black shield ──────────────────────
    const showShield = () => {
      if (document.getElementById('rbc-key-shield')) return;
      // Pause ALL videos immediately
      document.querySelectorAll('video').forEach(v => v.pause());
      const shield = document.createElement('div');
      shield.id = 'rbc-key-shield';
      shield.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:2147483647',
        'background:#000', 'display:flex', 'align-items:center',
        'justify-content:center', 'flex-direction:column', 'gap:14px'
      ].join(';');
      shield.innerHTML = `
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
             stroke="#ef4444" stroke-width="2" stroke-linecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <p style="color:#fff;font-family:system-ui,sans-serif;font-size:17px;
                  font-weight:700;margin:0;text-align:center;padding:0 20px">
          © RBC Import &amp; Export<br/>
          <span style="font-size:13px;font-weight:400;color:#64748b">
            Content is protected
          </span>
        </p>`;
      document.body.appendChild(shield);
    };

    const hideShield = () => {
      document.getElementById('rbc-key-shield')?.remove();
    };

    // 1. Detect dangerous keys → show black shield + try to preventDefault
    const blockKeys = (e: KeyboardEvent) => {
      const k = e.key?.toLowerCase() ?? '';
      const ctrl  = e.ctrlKey;
      const shift = e.shiftKey;
      const alt   = e.altKey;
      const meta  = e.metaKey;

      const dangerous =
        // DevTools
        k === 'f12' ||
        (ctrl && shift && ['i','j','c','k'].includes(k)) ||
        (meta && alt  && ['i','j','c'].includes(k)) ||
        (ctrl && ['u','p'].includes(k)) ||
        (meta && ['u','p'].includes(k)) ||
        // Save / Print
        (ctrl && ['s','p'].includes(k)) ||
        (meta && ['s','p'].includes(k)) ||
        // Screenshot — Windows
        k === 'printscreen' ||
        (meta && shift && k === 's') ||
        // Screenshot — Mac
        (meta && shift && ['3','4','5','6'].includes(k)) ||
        (meta && ctrl && shift && ['3','4'].includes(k)) ||
        // Xbox Game Bar
        (meta && alt && ['r','g','b','m','t'].includes(k)) ||
        (meta && k === 'g') ||
        // Recorder apps (F6–F11, ShareX, Loom)
        ['f6','f7','f8','f9','f10','f11'].includes(k) ||
        (ctrl && shift && k === 'printscreen') ||
        (alt && k === 'f9') ||
        (alt && shift && ['l','r'].includes(k));

      if (dangerous) {
        // Attempt browser-level block (works for some)
        e.preventDefault();
        e.stopImmediatePropagation();
        // Immediately blackout screen (works even when OS takes screenshot)
        showShield();
        // Auto-remove shield after 2s so user isn't stuck
        setTimeout(hideShield, 2000);
      }
    };


    // 2. Disable right-click context menu globally
    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 3. Disable text selection globally
    const blockSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // 4. DevTools detection via window size difference (docked DevTools shrinks window)
    const devToolsCheck = setInterval(() => {
      const widthDiff = window.outerWidth - window.innerWidth > 200;
      const heightDiff = window.outerHeight - window.innerHeight > 200;
      if (widthDiff || heightDiff) {
        // DevTools likely open — redirect to blank
        document.body.innerHTML = `
          <div style="
            display:flex;flex-direction:column;align-items:center;justify-content:center;
            height:100vh;background:#0f172a;color:#fff;font-family:system-ui,sans-serif;
            gap:16px;text-align:center;padding:24px;
          ">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            <h1 style="font-size:24px;font-weight:800;color:#ef4444;margin:0">Access Denied</h1>
            <p style="color:#94a3b8;margin:0;max-width:360px">
              Developer tools are disabled for this application.<br/>
              Please close DevTools and refresh the page.
            </p>
            <button onclick="window.location.reload()" style="
              margin-top:8px;padding:12px 28px;background:#2563eb;color:#fff;border:none;
              border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;
            ">Refresh Page</button>
          </div>`;
        clearInterval(devToolsCheck);
      }
    }, 1000);

    // ── Mobile Phone Protection ─────────────────────────────────────────────
    // Page Visibility — pause video when tab/app goes to background
    const handleVisibilityChange = () => {
      const videos = document.querySelectorAll('video');
      if (document.hidden) {
        videos.forEach(v => { v.pause(); });
        const overlay = document.createElement('div');
        overlay.id = 'rbc-vis-shield';
        overlay.style.cssText = `
          position:fixed;inset:0;z-index:999999;background:#000;
          display:flex;align-items:center;justify-content:center;
          flex-direction:column;gap:16px;
        `;
        overlay.innerHTML = `
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <p style="color:#fff;font-family:system-ui;font-size:18px;font-weight:700;margin:0;text-align:center;padding:0 24px">
            © RBC Import &amp; Export<br/>
            <span style="font-size:14px;font-weight:400;color:#94a3b8">Content is protected</span>
          </p>`;
        document.body.appendChild(overlay);
      } else {
        document.getElementById('rbc-vis-shield')?.remove();
        videos.forEach(v => {
          v.play().catch(() => {});
        });
      }
    };

    document.addEventListener('keydown', blockKeys, true);
    document.addEventListener('contextmenu', blockContextMenu, true);
    document.addEventListener('selectstart', blockSelectStart, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('keydown', blockKeys, true);
      document.removeEventListener('contextmenu', blockContextMenu, true);
      document.removeEventListener('selectstart', blockSelectStart, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(devToolsCheck);
    };
  }, []);

  // Restore saved user session on app launch (remains logged in on F5 / refresh)
  useEffect(() => {
    const savedUser = localStorage.getItem('lms_current_user_v2_ie');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        if (user && user.email) {
          loginUser(user.name || 'User', user.email, user.role || 'student', user.id || user._id);
          setUserRole(user.role || 'student');
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.warn('Session parse error:', e);
      }

      // Asynchronously fetch fresh user profile from backend to sync updated roles/permissions
      authApi.getMe().then(res => {
        if (res.success && res.user) {
          const freshUser = res.user;
          localStorage.setItem('lms_current_user_v2_ie', JSON.stringify({
            id: freshUser.id,
            name: freshUser.name,
            email: freshUser.email,
            role: freshUser.role,
            progressPercentage: freshUser.progressPercentage || 0
          }));
          loginUser(freshUser.name, freshUser.email, freshUser.role, freshUser.id);
          setUserRole(freshUser.role);
        }
      }).catch(err => {
        console.warn('Failed to sync fresh user profile:', err);
      });
    }
    setAuthLoading(false);
  }, []);

  const handleAuthSuccess = (user: AuthUser) => {
    loginUser(user.name, user.email, user.role, user.id);
    setUserRole(user.role);
    setIsAuthenticated(true);
    if (user.role === 'admin') {
      setActiveView('AdminPanel');
    } else {
      setActiveView('Dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (e) {}
    setCurrentUser(null);
    localStorage.removeItem('lms_current_user_v2_ie');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (showSplash && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        setShowSplash(false);
      });
    }

    if (showSplash) {
      // Safety fallback: Hide splash screen after 12 seconds if video hangs/stalls
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Global hide-header-on-scroll-down listener (Capture-phase to match any container scroll)
  useEffect(() => {
    let lastScrollTop = 0;
    let transitionBlocked = false;
    let blockTimeout: any = null;

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.scrollTop === 'undefined') return;

      const scrollTop = target.scrollTop;

      // If transition is currently blocked, ignore the event to prevent jitter loops
      if (transitionBlocked) {
        lastScrollTop = scrollTop;
        return;
      }

      const diff = Math.abs(scrollTop - lastScrollTop);
      if (diff < 15) return;

      const hasHiddenClass = document.body.classList.contains('header-hidden');

      if (scrollTop > lastScrollTop && scrollTop > 80) {
        if (!hasHiddenClass) {
          document.body.classList.add('header-hidden');
          transitionBlocked = true;
          if (blockTimeout) clearTimeout(blockTimeout);
          blockTimeout = setTimeout(() => {
            transitionBlocked = false;
          }, 350);
        }
      } else if (scrollTop < lastScrollTop) {
        if (hasHiddenClass) {
          document.body.classList.remove('header-hidden');
          transitionBlocked = true;
          if (blockTimeout) clearTimeout(blockTimeout);
          blockTimeout = setTimeout(() => {
            transitionBlocked = false;
          }, 350);
        }
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      if (blockTimeout) clearTimeout(blockTimeout);
    };
  }, []);

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a1628 0%, #102A56 100%)',
        flexDirection: 'column',
      }}>
        <PencilLoader text="Loading RBC Academy..." textColor="#D4AF37" color="#D4AF37" />
      </div>
    );
  }



  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleAuthSuccess} />;
  }

  if (showSplash) {
    return (
      <div 
        className="splash-screen-container" 
        onClick={() => setShowSplash(false)}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          backgroundColor: '#000000', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 99999, 
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <video
          ref={videoRef}
          className="splash-video"
          src="/splash.mp4"
          muted
          playsInline
          autoPlay
          onEnded={() => setShowSplash(false)}
          onError={() => setShowSplash(false)}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: isMobile ? 'contain' : 'cover', 
            backgroundColor: '#000000' 
          }}
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowSplash(false);
          }}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            padding: '8px 18px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            zIndex: 100000,
            letterSpacing: '0.5px'
          }}
        >
          Skip Intro →
        </button>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'Dashboard': return <Dashboard />;
      case 'Courses': return <Courses />;
      case 'Chapters': return <ModuleScreen />;
      case 'Lessons': return <ModuleScreen />;
      case 'Bookmarks': return <Bookmarks />;
      case 'Downloads': return <Downloads />;
      case 'Search': return <Search />;
      case 'Profile': return <Profile />;
      case 'Settings': return <Settings />;
      case 'AdminPanel': return <AdminPanel />;
      case 'Quiz': return <QuizScreen />;
      case 'Community': return <CommunityScreen />;
      case 'Videos': return <VideosScreen />;
      default: return <ModuleScreen />;
    }
  };

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '100vw', overflowX: 'hidden', background: '#ffffff' }}>
      {isLeftDrawerOpen && (
        <Sidebar isOpen={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)} onLogout={handleLogout} />
      )}

      {isLeftDrawerOpen && (
        <div
          className="sidebar-backdrop-active"
          onClick={() => setIsLeftDrawerOpen(false)}
        ></div>
      )}

      <div className="main-content-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {activeView !== 'Quiz' && (
          <TopAppBar onMenuClick={() => setIsLeftDrawerOpen(true)} onLogout={handleLogout} />
        )}
        <main className="main-viewport-container" style={{ flex: 1, width: '100%', background: '#ffffff' }}>
          <ErrorBoundary>
            <React.Suspense fallback={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column' }}>
                <PencilLoader text="Loading view..." color="#1E3A8A" textColor="#1E3A8A" />
              </div>
            }>
              {renderActiveView()}
            </React.Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Toast Notifications */}
      <div 
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '350px',
          pointerEvents: 'none'
        }}
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 20px',
              borderRadius: '12px',
              background: toast.type === 'success' 
                ? 'rgba(16, 185, 129, 0.95)' 
                : toast.type === 'error'
                ? 'rgba(239, 68, 68, 0.95)'
                : toast.type === 'warning'
                ? 'rgba(245, 158, 11, 0.95)'
                : 'rgba(59, 130, 246, 0.95)',
              color: '#ffffff',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              animation: 'slideIn 0.3s ease forwards',
              transition: 'all 0.2s ease'
            }}
          >
            {toast.type === 'success' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            )}
            {toast.type === 'error' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            )}
            {toast.type === 'warning' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            )}
            {toast.type === 'info' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Custom Alert Modal */}
      {alertModal.isOpen && (
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
              maxWidth: '440px',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              fontFamily: "'Inter', system-ui, sans-serif"
            }}
          >
            {/* Header Icon & Background Accent */}
            <div 
              style={{
                height: '8px',
                background: alertModal.type === 'success' 
                  ? 'linear-gradient(90deg, #10b981, #059669)' 
                  : alertModal.type === 'error'
                  ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                  : alertModal.type === 'warning'
                  ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                  : 'linear-gradient(90deg, #3b82f6, #2563eb)'
              }}
            />
            
            <div style={{ padding: '30px 24px 24px 24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {/* Icon Wrapper */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    flexShrink: 0,
                    background: alertModal.type === 'success' 
                      ? '#ecfdf5' 
                      : alertModal.type === 'error'
                      ? '#fef2f2'
                      : alertModal.type === 'warning'
                      ? '#fffbeb'
                      : '#eff6ff',
                    color: alertModal.type === 'success' 
                      ? '#10b981' 
                      : alertModal.type === 'error'
                      ? '#ef4444'
                      : alertModal.type === 'warning'
                      ? '#f59e0b'
                      : '#3b82f6'
                  }}
                >
                  {alertModal.type === 'success' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  )}
                  {alertModal.type === 'error' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                  )}
                  {alertModal.type === 'warning' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  )}
                  {alertModal.type === 'info' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <h3 
                    style={{ 
                      fontSize: '18px', 
                      fontWeight: 800, 
                      color: '#0f172a', 
                      margin: '0 0 8px 0',
                      lineHeight: '1.4'
                    }}
                  >
                    {alertModal.title}
                  </h3>
                  <p 
                    style={{ 
                      fontSize: '14.5px', 
                      color: '#475569', 
                      margin: 0, 
                      lineHeight: '1.6',
                      fontWeight: 500,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {alertModal.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                <button
                  onClick={closeAlert}
                  style={{
                    padding: '11px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    background: alertModal.type === 'success' 
                      ? '#10b981' 
                      : alertModal.type === 'error'
                      ? '#ef4444'
                      : alertModal.type === 'warning'
                      ? '#f59e0b'
                      : '#2563eb',
                    color: '#ffffff',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.9)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)';
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirm Modal */}
      {confirmModal.isOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000001,
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
              maxWidth: '440px',
              background: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              fontFamily: "'Inter', system-ui, sans-serif"
            }}
          >
            {/* Header Accent */}
            <div style={{ height: '8px', background: 'linear-gradient(90deg, #ea580c, #c2410c)' }} />
            
            <div style={{ padding: '30px 24px 24px 24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    flexShrink: 0,
                    background: '#fffbeb',
                    color: '#ea580c'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    {confirmModal.title}
                  </h3>
                  <p style={{ fontSize: '14.5px', color: '#475569', margin: 0, lineHeight: '1.6', fontWeight: 500 }}>
                    {confirmModal.message}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                <button
                  onClick={confirmModal.onCancel || closeConfirm}
                  style={{
                    padding: '11px 20px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#475569',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f8fafc'; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#ffffff'; }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.onConfirm}
                  style={{
                    padding: '11px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(0.9)'; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)'; }}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
