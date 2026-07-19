import React from 'react';
import { useApp } from '../context/AppContext';
import { translateModuleTitle, uiTranslations } from '../utils/translator';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose, onLogout }) => {
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
      <div className="sidebar-academy-header">
        <h2 className="academy-title">{uiTranslations[language].academyTitle}</h2>
        <h3 className="course-subtitle">{uiTranslations[language].courseSubtitle}</h3>
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
