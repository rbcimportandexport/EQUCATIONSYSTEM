import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { moduleLessonsMap } from '../utils/data';
import { translateModuleTitle, translateModuleDescription } from '../utils/translator';
import { Search, ArrowRight, Lock } from 'lucide-react';

interface ModuleImageData {
  image: string;
  accentColor: string;
}

const MODULE_IMAGES_AND_COLORS: { [key: number]: ModuleImageData } = {
  1: { image: '/assets/Basic Import Export Terms   image.png', accentColor: '#10b981' },
  2: { image: '/assets/Product Terms image.png', accentColor: '#3b82f6' },
  3: { image: '/assets/Weight & Measurement.png', accentColor: '#eab308' },
  4: { image: '/assets/Container Terms image.png', accentColor: '#f43f5e' },
  5: { image: '/assets/Shipping Terms image.png', accentColor: '#8b5cf6' },
  6: { image: '/assets/Incoterms image.png', accentColor: '#a855f7' },
  7: { image: '/assets/Port & Logistics image.png', accentColor: '#14b8a6' },
  8: { image: '/assets/Documentation image.png', accentColor: '#f97316' },
  9: { image: '/assets/Customs image.png', accentColor: '#06b6d4' },
  10: { image: '/assets/Payment Terms image.png', accentColor: '#ef4444' },
  11: { image: '/assets/Freight Charges image.png', accentColor: '#3b82f6' },
  12: { image: '/assets/Quality & Inspection image.png', accentColor: '#d97706' },
  13: { image: '/assets/Business Operations image.png', accentColor: '#6366f1' },
  14: { image: '/assets/Risk Management image.png', accentColor: '#84cc16' },
  15: { image: '/assets/RBC Import & Export Internal Process  image.png', accentColor: '#f43f5e' }
};

export const Courses: React.FC = () => {
  const { 
    modules, 
    lessons,
    progress,
    userRole,
    language,
    setSelectedCourseId, 
    setSelectedModuleId, 
    setSelectedLessonId,
    setSelectedModuleTab,
    setActiveView,
    showAlert
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter modules based on search (checking both original and translated text)
  const filteredModules = modules.filter(mod => {
    const q = searchQuery.toLowerCase();
    const tTitle = translateModuleTitle(mod.title, language).toLowerCase();
    const tDesc = translateModuleDescription(mod.description, language).toLowerCase();
    return (
      mod.title.toLowerCase().includes(q) ||
      mod.description.toLowerCase().includes(q) ||
      tTitle.includes(q) ||
      tDesc.includes(q)
    );
  });

  const getModuleQuizScore = (modId: string) => {
    const modLessons = lessons.filter(l => l.moduleId === modId);
    const questions = modLessons.flatMap(l => l.content.quiz || []);
    if (questions.length === 0) return 100;

    const quizProgress = progress[`mod-quiz-${modId}`];
    if (!quizProgress || !quizProgress.quizScores) return 0;

    let correctCount = 0;
    questions.forEach(q => {
      if (quizProgress.quizScores[q.id] === 1) {
        correctCount++;
      }
    });

    return Math.round((correctCount / questions.length) * 100);
  };

  const isModuleLocked = (modId: string) => {
    if (userRole === 'admin') return false; // Admin bypass
    const currentMod = modules.find(m => m.id === modId);
    if (!currentMod) return false;

    const sortedMods = [...modules].sort((a, b) => a.order - b.order);
    const idx = sortedMods.findIndex(m => m.id === modId);
    if (idx <= 0) return false; // Module 1 is never locked

    const prevMod = sortedMods[idx - 1];
    const prevScore = getModuleQuizScore(prevMod.id);
    return prevScore < 70;
  };

  const handleOpenModule = (moduleId: string, courseId: string) => {
    if (isModuleLocked(moduleId)) {
      const sortedMods = [...modules].sort((a, b) => a.order - b.order);
      const idx = sortedMods.findIndex(m => m.id === moduleId);
      const prevMod = sortedMods[idx - 1];
      const prevTitle = translateModuleTitle(prevMod.title, language);
      showAlert(
        language === 'hi' ? "मॉड्यूल लॉक है" : language === 'gu' ? "મોડ્યુલ લૉક છે" : language === 'mr' ? "मॉड्यूल लॉक आहे" : "Module Locked",
        language === 'hi'
          ? `यह मॉड्यूल लॉक है! इसे अनलॉक करने के लिए आपको मॉड्यूल ${prevMod.order} (${prevTitle}) की अंतिम परीक्षा/क्विज़ को 100% स्कोर से पूरा करना होगा।`
          : language === 'gu'
            ? `આ મોડ્યુલ લૉક છે! તેને અનલૉક કરવા માટે તમારે મોડ્યુલ ${prevMod.order} (${prevTitle}) ની અંતિમ પરીક્ષા/ક્વિઝ 100% સ્કોર સાથે પૂર્ણ કરવી આવશ્યક છે.`
            : language === 'mr'
              ? `हे मॉड्यूल लॉक आहे! ते अनलॉक करण्यासाठी तुम्हाला मॉड्यूल ${prevMod.order} (${prevTitle}) ची अंतिम परीक्षा/क्विझ 100% गुणांसह पूर्ण करणे आवश्यक आहे.`
              : `This module is locked! You must complete the final exam/quiz of Module ${prevMod.order} (${prevMod.title}) with a 100% score to unlock it.`,
        "warning"
      );
      return;
    }
    setSelectedCourseId(courseId);
    setSelectedModuleId(moduleId);
    setSelectedLessonId(null);
    setSelectedModuleTab('read');
    setActiveView('Chapters');
  };

  return (
    <div className="varsity-modules-page" style={{ 
      height: '100%', 
      overflowY: 'auto', 
      background: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#1e293b'
    }}>
      <style>{`
        .modules-header-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 36px 48px 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .modules-page-title {
          font-size: 44px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
          letter-spacing: -1px;
        }

        .modules-page-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0;
        }

        .modules-search-wrapper {
          position: relative;
          width: 320px;
        }

        .modules-search-input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: 1px solid #cbd5e1;
          border-radius: 20px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .modules-search-input:focus {
          border-color: #3b82f6;
        }

        .modules-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .modules-grid-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 48px 48px 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .varsity-module-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .varsity-module-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.12);
          border-color: #cbd5e1;
        }

        .module-accent-bar {
          height: 4px;
          width: 100%;
        }

        .module-image-container {
          position: relative;
          width: 100%;
          height: 160px;
          overflow: hidden;
          background: #f8fafc;
        }

        .module-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .varsity-module-card:hover .module-card-img {
          transform: scale(1.03);
        }

        .module-number-badge {
          position: absolute;
          top: 12px;
          left: 14px;
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          font-weight: 800;
          font-size: 13px;
          padding: 4px 10px;
          border-radius: 8px;
          backdrop-filter: blur(4px);
        }

        .module-card-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }

        .module-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 8px;
        }

        .module-title-text {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }

        .module-chapter-count {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          white-space: nowrap;
          background: #f1f5f9;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .module-description-text {
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
          margin: 0 0 16px 0;
        }

        .module-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
          margin-top: auto;
        }

        .view-module-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #2563eb;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: gap 0.2s ease;
        }

        .varsity-module-card:hover .view-module-link {
          gap: 9px;
          color: #1d4ed8;
        }

        .module-lang-tag {
          font-size: 11px;
          color: #94a3b8;
          background: #f8fafc;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .modules-grid-container {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 24px;
          }
          .modules-header-container {
            padding: 24px;
          }
        }

        @media (max-width: 640px) {
          .modules-grid-container {
            grid-template-columns: 1fr;
          }
          .modules-header-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .modules-search-wrapper {
            width: 100%;
          }
        }
      `}</style>

      {/* Header Bar */}
      <div className="modules-header-container">
        <div>
          <h1 className="modules-page-title">
            {language === 'hi' ? 'मॉड्यूल्स' : language === 'gu' ? 'મોડ્યુલ્સ' : language === 'mr' ? 'मॉड्यूल्स' : 'Modules'}
          </h1>
          <p className="modules-page-subtitle">
            {language === 'hi'
              ? 'अंतर्राष्ट्रीय व्यापार, कंटेनर लॉजिस्टिक्स, दस्तावेज़ और कस्टम्स को चरण-दर-चरण सीखें।'
              : language === 'gu'
                ? 'આંતરરાષ્ટ્રીય વેપાર, કન્ટેનર લોજિસ્ટિક્સ, દસ્તાવેજીકરણ અને કસ્ટમ્સ શીખો.'
                : language === 'mr'
                  ? 'आंतरराष्ट्रीय व्यापार, कंटेनर लॉजिस्टिक्स, दस्तऐवज आणि कस्टम्स स्टेप-बाय-स्टेप शिका.'
                  : 'Master global trade, container logistics, documentation, and customs step-by-step.'}
          </p>
        </div>

        <div className="modules-search-wrapper">
          <Search size={16} className="modules-search-icon" />
          <input 
            type="text" 
            placeholder={
              language === 'hi' ? '15 ट्रेड मॉड्यूल खोजें...' : language === 'gu' ? '15 ટ્રેડ મોડ્યુલ શોધો...' : language === 'mr' ? '15 ट्रेड मॉड्यूल्स शोधा...' : 'Search 15 trade modules...'
            } 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="modules-search-input"
          />
        </div>
      </div>

      {/* 15 Modules Grid */}
      <div className="modules-grid-container">
        {filteredModules.map(mod => {
          const imgData = MODULE_IMAGES_AND_COLORS[mod.order] || {
            image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
            accentColor: '#0284c7'
          };
          const chapterCount = moduleLessonsMap[mod.id]?.length || 10;
          const isLocked = isModuleLocked(mod.id);

          const translatedTitle = translateModuleTitle(mod.title, language);
          const translatedDesc = translateModuleDescription(mod.description, language);

          return (
            <div 
              key={mod.id} 
              className="varsity-module-card"
              onClick={() => handleOpenModule(mod.id, mod.courseId)}
              style={{
                opacity: isLocked ? 0.75 : 1,
                cursor: isLocked ? 'not-allowed' : 'pointer'
              }}
            >
              {/* Top Accent Color Line */}
              <div 
                className="module-accent-bar" 
                style={{ background: isLocked ? '#94a3b8' : imgData.accentColor }} 
              />

              {/* Module Image Banner */}
              <div className="module-image-container">
                <img 
                  src={imgData.image} 
                  alt={translatedTitle} 
                  className="module-card-img" 
                  style={{
                    filter: isLocked ? 'grayscale(1) opacity(0.6)' : 'none'
                  }}
                />
                <div className="module-number-badge">{mod.order}</div>
                {isLocked && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '14px',
                    background: 'rgba(239, 68, 68, 0.95)',
                    color: '#ffffff',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <Lock size={18} />
                  </div>
                )}
              </div>

              {/* Module Content */}
              <div className="module-card-content">
                <div>
                  <div className="module-card-header">
                    <h3 className="module-title-text">{mod.order}. {translatedTitle}</h3>
                    <div className="module-chapter-count">
                      {chapterCount} {language === 'hi' ? 'अध्याय' : language === 'gu' ? 'પ્રકરણો' : language === 'mr' ? 'धडे' : 'chapters'}
                    </div>
                  </div>

                  <p className="module-description-text">
                    {translatedDesc}
                  </p>
                </div>

                <div className="module-card-actions">
                  <button className="view-module-link">
                    <span>
                      {language === 'hi' ? 'मॉड्यूल देखें' : language === 'gu' ? 'મોડ્યુલ જુઓ' : language === 'mr' ? 'मॉड्यूल पहा' : 'View module'}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="module-lang-tag">
                    {language === 'hi' ? 'हिंदी / अंग्रेज़ी' : language === 'gu' ? 'હિન્દી / અંગ્રેજી' : language === 'mr' ? 'हिंदी / इंग्रजी' : 'Hindi / English'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
