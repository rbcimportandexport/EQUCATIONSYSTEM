import React from 'react';
import { useApp } from '../context/AppContext';
import { translateModuleTitle } from '../utils/translator';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { 
    modules, 
    selectedModuleId, 
    setSelectedModuleId, 
    setActiveView,
    language
  } = useApp();

  const handleSelectModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setActiveView('Chapters');
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar-redesign ${isOpen ? 'mobile-open' : ''}`}>
      {/* Top Section */}
      <div className="sidebar-academy-header" style={{ display: 'flex', justifyContent: 'center', padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
        <img 
          src="/logo_full.png" 
          alt="RBC Academy" 
          style={{ 
            maxWidth: '100%', 
            height: 'auto', 
            maxHeight: '60px', 
            objectFit: 'contain' 
          }} 
        />
      </div>

      {/* Modules List Navigation */}
      <nav className="sidebar-modules-list">
        {modules.map((mod, index) => {
          const isActive = selectedModuleId === mod.id;
          const translatedTitle = translateModuleTitle(mod.title, language);
          
          return (
            <button
              key={mod.id}
              className={`sidebar-module-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleSelectModule(mod.id)}
            >
              <div className="module-item-order">
                {language === 'hi' ? 'मॉड्यूल' : language === 'gu' ? 'મોડ્યુલ' : language === 'mr' ? 'मॉड्यूल' : 'Module'} {mod.order || index + 1}
              </div>
              <div className="module-item-title">{translatedTitle}</div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
