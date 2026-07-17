import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';

// Import Views
import { Dashboard } from './views/Dashboard';
import { Courses } from './views/Courses';
import { ModuleScreen } from './views/ModuleScreen';
import { LessonScreen } from './views/LessonScreen';
import { Bookmarks } from './views/Bookmarks';
import { Downloads } from './views/Downloads';
import { Search } from './views/Search';
import { Profile } from './views/Profile';
import { Settings } from './views/Settings';
import { AdminPanel } from './views/AdminPanel';
import { QuizScreen } from './views/QuizScreen';

const AppShell: React.FC = () => {
  const { activeView } = useApp();
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <div className="splash-screen-container">
        <video 
          className="splash-video"
          src="/splash.mp4"
          autoPlay
          muted
          playsInline
          onEnded={() => setShowSplash(false)}
          onError={() => setShowSplash(false)}
        />
        <button className="skip-splash-btn" onClick={() => setShowSplash(false)}>
          Skip Intro
        </button>
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
        return <LessonScreen />;
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
