import React, { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';

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
import { CertificateDesigner } from './views/CertificateDesigner';

const AppShell: React.FC = () => {
  const { activeView } = useApp();
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (showSplash && videoRef.current) {
      // Muted autoplay — browser always allows this, no overlay needed
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // If even muted play fails, just skip splash
        setShowSplash(false);
      });
    }
  }, [showSplash]);

  if (showSplash) {
    return (
      <div className="splash-screen-container">
        <video
          ref={videoRef}
          className="splash-video"
          src="/splash.mp4"
          muted
          playsInline
          onEnded={() => setShowSplash(false)}
          onError={() => setShowSplash(false)}
        />
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Courses':
        return <Courses />;
      case 'Chapters':
        return <ModuleScreen />;
      case 'Lessons':
        return <ModuleScreen />;
      case 'Bookmarks':
        return <Bookmarks />;
      case 'Downloads':
        return <Downloads />;
      case 'Search':
        return <Search />;
      case 'Profile':
        return <Profile />;
      case 'Settings':
        return <Settings />;
      case 'AdminPanel':
        return <AdminPanel />;
      case 'Quiz':
        return <QuizScreen />;
      case 'Community':
        return <CommunityScreen />;
      case 'CertDesigner':
        return <CertificateDesigner />;
      default:
        return <ModuleScreen />;
    }
  };

  return (
    <div className="app-layout">
      {/* Left Sidebar navigation */}
      <Sidebar isOpen={isLeftDrawerOpen} onClose={() => setIsLeftDrawerOpen(false)} />

      {/* Mobile drawer backdrop */}
      {isLeftDrawerOpen && (
        <div 
          className="sidebar-backdrop-active" 
          onClick={() => setIsLeftDrawerOpen(false)}
        ></div>
      )}

      {/* Main panel */}
      <div className="main-content-panel">
        <TopAppBar onMenuClick={() => setIsLeftDrawerOpen(true)} />
        
        <main className="main-viewport-container">
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
