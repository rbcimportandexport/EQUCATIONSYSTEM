import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Bookmark, User, ShieldAlert, Globe, Radio, LogOut } from 'lucide-react';

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
    <header className="top-app-bar-varsity" style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 48px',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justify-content: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }}>
      {/* Brand Logo & Title */}
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} 
        onClick={() => setActiveView('Dashboard')}
      >
        <img src="/logo_emblem.png" alt="RBC Logo" style={{ height: '38px', width: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', lineHeight: 1 }}>RBC VARSITY</span>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#0284c7', letterSpacing: '1px', marginTop: '2px' }}>TRADE ACADEMY</span>
        </div>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            type="button"
            onClick={() => setActiveView('Courses')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeView === 'Courses' ? 700 : 600,
              color: activeView === 'Courses' ? '#0284c7' : '#334155'
            }}
          >
            Modules
          </button>
          
          <button 
            type="button"
            onClick={() => setActiveView('Chapters')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeView === 'Chapters' ? 700 : 600,
              color: activeView === 'Chapters' ? '#0284c7' : '#334155'
            }}
          >
            Videos
          </button>

          <button 
            type="button"
            onClick={() => setActiveView('Community')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeView === 'Community' ? 700 : 600,
              color: activeView === 'Community' ? '#0284c7' : '#334155'
            }}
          >
            Community
          </button>

          <button 
            type="button"
            onClick={() => setActiveView('Courses')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            Junior
          </button>

          <button 
            type="button"
            onClick={() => setActiveView('Community')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600,
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Radio size={14} color="#db2777" />
            <span>Live</span>
          </button>
        </nav>

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Globe size={16} color="#64748b" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            style={{
              padding: '4px 8px',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: '#FFFFFF',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#1e293b'
            }}
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
          onClick={() => setActiveView('Search')}
          title="Search"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
        >
          <Search size={18} />
        </button>

        {/* Bookmarks */}
        <button 
          type="button"
          onClick={() => setActiveView('Bookmarks')}
          title="Bookmarks"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center' }}
        >
          <Bookmark size={18} />
        </button>

        {/* Admin Link */}
        {userRole === 'admin' && (
          <button 
            type="button"
            onClick={() => setActiveView('AdminPanel')}
            title="Admin Suite"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', display: 'flex', alignItems: 'center' }}
          >
            <ShieldAlert size={18} />
          </button>
        )}

        {/* Profile */}
        <button 
          type="button"
          onClick={() => setActiveView('Profile')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13.5px',
            fontWeight: 700,
            color: '#0284c7',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <User size={16} />
          <span>Open Account</span>
        </button>

        {/* Logout */}
        {onLogout && (
          <button
            type="button"
            onClick={onLogout}
            title="Logout"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center' }}
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
};
