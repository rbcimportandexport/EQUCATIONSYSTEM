import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bookmark, User, ShieldAlert, Globe, Radio, LogOut } from 'lucide-react';
import logoEmblem from '../assets/logo_emblem.png';

interface TopAppBarProps {
  onMenuClick?: () => void;
  onLogout?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onLogout }) => {
  const { 
    activeView,
    setActiveView,
    userRole,
    language,
    setLanguage
  } = useApp();

  return (
    <header className="top-app-bar-varsity" style={{ height: '88px' }}>
      {/* Brand Logo & Title */}
      <div 
        className="top-bar-brand-box"
        onClick={() => setActiveView('Dashboard')}
      >
        <img src={logoEmblem} alt="RBC Logo" className="top-bar-logo-img" style={{ height: '76px', width: 'auto', objectFit: 'contain' }} />
      </div>

      {/* Nav Links & Tools */}
      <div className="top-bar-right-group">
        <nav className="top-bar-nav-links">
          <button 
            type="button"
            className={`top-nav-btn ${activeView === 'Courses' ? 'active' : ''}`}
            onClick={() => setActiveView('Courses')}
          >
            Modules
          </button>
          
          <button 
            type="button"
            className={`top-nav-btn ${activeView === 'Chapters' ? 'active' : ''}`}
            onClick={() => setActiveView('Chapters')}
          >
            Videos
          </button>

          <button 
            type="button"
            className={`top-nav-btn ${activeView === 'Community' ? 'active' : ''}`}
            onClick={() => setActiveView('Community')}
          >
            Community
          </button>

          <button 
            type="button"
            className="top-nav-btn"
            onClick={() => setActiveView('Courses')}
          >
            Junior
          </button>

          <button 
            type="button"
            className="top-nav-btn live-btn"
            onClick={() => setActiveView('Community')}
          >
            <Radio size={14} color="#db2777" />
            <span>Live</span>
          </button>
        </nav>

        {/* Language Selector */}
        <div className="top-bar-lang-box">
          <Globe size={16} color="#64748b" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="top-bar-lang-select"
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिंदी (HI)</option>
            <option value="gu">ગુજરાતી (GU)</option>
            <option value="mr">मराठी (MR)</option>
          </select>
        </div>

        {/* Search */}
        <button 
          type="button"
          className="top-bar-icon-btn"
          onClick={() => setActiveView('Search')}
          title="Search"
        >
          <Search size={18} />
        </button>

        {/* Bookmarks */}
        <button 
          type="button"
          className="top-bar-icon-btn"
          onClick={() => setActiveView('Bookmarks')}
          title="Bookmarks"
        >
          <Bookmark size={18} />
        </button>

        {/* Admin Link */}
        {userRole === 'admin' && (
          <button 
            type="button"
            className="top-bar-icon-btn admin-link-btn"
            onClick={() => setActiveView('AdminPanel')}
            title="Admin Suite"
          >
            <ShieldAlert size={18} />
          </button>
        )}

        {/* Open Account / Profile */}
        <button 
          type="button"
          className="top-bar-open-account-btn"
          onClick={() => setActiveView('Profile')}
        >
          <User size={16} />
          <span>Open Account</span>
        </button>

        {/* Logout */}
        {onLogout && (
          <button
            type="button"
            className="top-bar-icon-btn logout-btn"
            onClick={onLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
};
