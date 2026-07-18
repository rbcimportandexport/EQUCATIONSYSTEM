import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, Search, Bookmark, User, ShieldAlert, Globe, MessageSquare, Award } from 'lucide-react';
import { translateModuleTitle } from '../utils/translator';

interface TopAppBarProps {
  onMenuClick?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onMenuClick }) => {
  const { 
    modules, 
    selectedModuleId, 
    setActiveView,
    userRole,
    language,
    setLanguage
  } = useApp();

  const activeModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  
  // Breadcrumb localization helpers
  const getModuleOrderLabel = () => {
    if (!activeModule) return '';
    if (language === 'hi') return `मॉड्यूल ${activeModule.order}`;
    if (language === 'gu') return `મોડ્યુલ ${activeModule.order}`;
    if (language === 'mr') return `मॉड्यूल ${activeModule.order}`;
    return `Module ${activeModule.order}`;
  };

  const getCourseLabelText = () => {
    if (language === 'hi') return 'आयात एवं निर्यात कोर्स';
    if (language === 'gu') return 'આયાત અને નિકાસ કોર્સ';
    if (language === 'mr') return 'आयात आणि निर्यात कोर्स';
    return 'Import & Export Course';
  };

  const moduleTitleText = activeModule ? translateModuleTitle(activeModule.title, language) : '';

  return (
    <header className="top-app-bar-redesign">
      <div className="top-bar-left">
        {/* Mobile menu trigger */}
        <button className="mobile-menu-trigger-btn" onClick={onMenuClick}>
          <Menu size={20} />
        </button>

        {/* Textbook Breadcrumb */}
        <div className="textbook-breadcrumbs">
          <span className="crumb-course-title">{getCourseLabelText()}</span>
          <span className="crumb-arrow">/</span>
          <span className="crumb-module-order">{getModuleOrderLabel()}</span>
          <span className="crumb-arrow">/</span>
          <span className="crumb-module-title">{moduleTitleText}</span>
        </div>
      </div>

      <div className="top-bar-right">
        {/* Minimal Language Dropdown Selector */}
        <div className="language-selector-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '8px' }}>
          <Globe size={16} color="var(--md-sys-color-secondary)" />
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as any)}
            className="select-dropdown language-selector-dropdown"
            style={{
              padding: '4px 8px',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--md-sys-color-outline)',
              borderRadius: '6px',
              cursor: 'pointer',
              color: 'var(--md-sys-color-on-background)'
            }}
          >
            <option value="en">English (EN)</option>
            <option value="hi">हिंदी (HI)</option>
            <option value="gu">ગુજરાતી (GU)</option>
            <option value="mr">मराठी (MR)</option>
          </select>
        </div>

        {/* Search button */}
        <button 
          className="top-bar-action-icon-btn" 
          onClick={() => setActiveView('Search')}
          title="Search knowledge base"
        >
          <Search size={18} />
        </button>

        {/* Bookmarks button */}
        <button 
          className="top-bar-action-icon-btn" 
          onClick={() => setActiveView('Bookmarks')}
          title="View bookmarks"
        >
          <Bookmark size={18} />
        </button>

        {/* Admin control panel link (if admin) */}
        {userRole === 'admin' && (
          <button 
            className="top-bar-action-icon-btn admin-badge-btn" 
            onClick={() => setActiveView('AdminPanel')}
            title="Admin Control Suite"
          >
            <ShieldAlert size={18} />
          </button>
        )}

        {/* Expert Chat & Community button */}
        <button 
          className="top-bar-action-icon-btn community-btn" 
          onClick={() => setActiveView('Community')}
          title="Expert Connect & Members"
        >
          <MessageSquare size={18} />
        </button>

        {/* Certificate Designer button */}
        <button 
          className="top-bar-action-icon-btn cert-designer-btn" 
          onClick={() => setActiveView('CertDesigner')}
          title="Certificate Designer"
        >
          <Award size={18} />
        </button>

        {/* Profile button */}
        <button 
          className="top-bar-action-icon-btn profile-avatar-btn" 
          onClick={() => setActiveView('Profile')}
          title="View Student Profile"
        >
          <User size={18} />
        </button>
      </div>
    </header>
  );
};
