import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, BookOpen, Video, Users, Bookmark, 
  Download, Shield
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { 
    activeView,
    setActiveView,
    userRole
  } = useApp();

  const handleNav = (view: any) => {
    setActiveView(view);
    if (onClose) onClose();
  };

  const navItems = [
    { id: 'Dashboard', label: 'Home Dashboard', icon: Home },
    { id: 'Courses', label: 'All Modules (15)', icon: BookOpen },
    { id: 'Chapters', label: 'Video Lessons', icon: Video },
    { id: 'Community', label: 'Community', icon: Users },
    { id: 'Bookmarks', label: 'My Bookmarks', icon: Bookmark },
    { id: 'Downloads', label: 'Saved Offline', icon: Download },
  ];

  if (userRole === 'admin') {
    navItems.push({ id: 'AdminPanel', label: 'Admin Management', icon: Shield });
  }

  return (
    <aside className={`sidebar-redesign ${isOpen ? 'mobile-open' : ''}`}>
      {/* Top Section */}
      <div className="sidebar-academy-header" style={{ padding: '24px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <h2 className="academy-title" style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>RBC ACADEMY</h2>
        <h3 className="course-subtitle" style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0', fontWeight: '500' }}>Import & Export Master</h3>
      </div>

      {/* Navigation Items */}
      <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? '#0284c7' : 'transparent',
                color: isActive ? '#ffffff' : '#334155',
                fontSize: '13.5px',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={18} color={isActive ? '#ffffff' : '#64748b'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
