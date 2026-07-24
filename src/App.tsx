import React, { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';
import { LoginPage } from './views/LoginPage';
import { authApi } from './utils/api';
import type { AuthUser } from './utils/api';

// Import Views
import { Dashboard } from './views/Dashboard';
import { Courses } from './views/Courses';
import { ModuleScreen } from './views/ModuleScreen';
import { Bookmarks } from './views/Bookmarks';
import { Downloads } from './views/Downloads';
import { Search } from './views/Search';
import { Profile } from './views/Profile';
import { Settings } from './views/Settings';
import { AdminPanel } from './views/AdminPanel';
import { QuizScreen } from './views/QuizScreen';
import { CommunityScreen } from './views/CommunityScreen';
import { VideosScreen } from './views/VideosScreen';

const AppShell: React.FC = () => {
  const { activeView, setActiveView, setUserRole, loginUser, setCurrentUser } = useApp();
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLoading] = useState(false);
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

    // 5. Continuous debugger trap — freezes DevTools when open
    const debuggerTrap = setInterval(() => {
      // eslint-disable-next-line no-debugger
      (function() { /* */ })['constructor']('debugger')();
    }, 3000);

    // ── Mobile Phone Protection ─────────────────────────────────────────────

    // 6. Block long-press on touch (prevents "Save video / Copy image" popup on phones)
    const blockTouchHold = (e: TouchEvent) => {
      if (e.touches.length >= 1) {
        e.preventDefault();
      }
    };

    // 7. Block touch-based drag / swipe to save on video elements
    const blockTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'VIDEO' || target.closest('.custom-video-player')) {
        e.preventDefault();
      }
    };

    // 8. Page Visibility — pause & blur video when tab/app goes to background
    //    Many Android screen recorders open via notification shade or swipe,
    //    which briefly hides the page → we can detect and pause.
    const handleVisibilityChange = () => {
      const videos = document.querySelectorAll('video');
      if (document.hidden) {
        videos.forEach(v => { v.pause(); });
        // Overlay a black screen so recorder only gets black
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
        // Remove overlay when user comes back
        document.getElementById('rbc-vis-shield')?.remove();
      }
    };

    // 9. Disable pinch-to-zoom (used on some phones to crop-screenshot)
    const blockPinch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };

    document.addEventListener('keydown', blockKeys, true);
    document.addEventListener('contextmenu', blockContextMenu, true);
    document.addEventListener('selectstart', blockSelectStart, true);
    document.addEventListener('touchstart', blockTouchHold, { passive: false, capture: true });
    document.addEventListener('touchmove', blockTouchMove, { passive: false });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('touchstart', blockPinch, { passive: false });

    return () => {
      document.removeEventListener('keydown', blockKeys, true);
      document.removeEventListener('contextmenu', blockContextMenu, true);
      document.removeEventListener('selectstart', blockSelectStart, true);
      document.removeEventListener('touchstart', blockTouchHold, true);
      document.removeEventListener('touchmove', blockTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', blockPinch);
      clearInterval(devToolsCheck);
      clearInterval(debuggerTrap);
    };
  }, []);


  // Default bypass setup for direct access to Dashboard
  useEffect(() => {
    loginUser('RBC User', 'user@rbcimport.com', 'admin');
    setUserRole('admin');
    setActiveView('Dashboard');
    setIsAuthenticated(true);
  }, []);

  const handleAuthSuccess = (user: AuthUser) => {
    loginUser(user.name, user.email, user.role);

    setUserRole(user.role);
    setIsAuthenticated(true);
    if (user.role === 'admin') {
      setActiveView('AdminPanel');
    } else {
      setActiveView('Dashboard');
    }
  };

  const handleLogout = async () => {
    await authApi.logout();
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
      // Fallback: Force hide splash screen after 15 seconds if video loading hangs
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 15000);
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
        gap: '16px',
      }}>
        <div style={{ width: '48px', height: '48px', border: '3px solid rgba(212,175,55,0.3)', borderTop: '3px solid #D4AF37', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <div style={{ color: '#D4AF37', fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>Loading RBC Academy...</div>
        <style>{`@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }`}</style>
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
          overflow: 'hidden' 
        }}
      >
        <video
          ref={videoRef}
          className="splash-video"
          src="/splash.mp4"
          muted
          playsInline
          onEnded={() => setShowSplash(false)}
          onError={() => setShowSplash(false)}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: isMobile ? 'contain' : 'cover', 
            backgroundColor: '#000000' 
          }}
        />
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
        <TopAppBar onMenuClick={() => setIsLeftDrawerOpen(true)} onLogout={handleLogout} />
        <main className="main-viewport-container" style={{ flex: 1, width: '100%', background: '#ffffff' }}>
          {renderActiveView()}
        </main>
      </div>
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
