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
