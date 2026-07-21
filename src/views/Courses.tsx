import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { moduleLessonsMap } from '../utils/data';
import { Search, ArrowRight } from 'lucide-react';

interface ModuleImageData {
  image: string;
  accentColor: string;
}

const MODULE_IMAGES_AND_COLORS: { [key: number]: ModuleImageData } = {
  1: { image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80', accentColor: '#10b981' },
  2: { image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', accentColor: '#3b82f6' },
  3: { image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80', accentColor: '#eab308' },
  4: { image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80', accentColor: '#f43f5e' },
  5: { image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80', accentColor: '#8b5cf6' },
  6: { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80', accentColor: '#a855f7' },
  7: { image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=600&q=80', accentColor: '#14b8a6' },
  8: { image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80', accentColor: '#f97316' },
  9: { image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80', accentColor: '#06b6d4' },
  10: { image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80', accentColor: '#ef4444' },
  11: { image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80', accentColor: '#3b82f6' },
  12: { image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80', accentColor: '#d97706' },
  13: { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', accentColor: '#6366f1' },
  14: { image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80', accentColor: '#84cc16' },
  15: { image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80', accentColor: '#f43f5e' }
};

export const Courses: React.FC = () => {
  const { 
    modules, 
    setSelectedCourseId, 
    setSelectedModuleId, 
    setSelectedLessonId,
    setSelectedModuleTab,
    setActiveView
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter modules based on search
  const filteredModules = modules.filter(mod => 
    mod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mod.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModule = (moduleId: string, courseId: string) => {
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
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
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
          margin: 0 auto 60px auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .varsity-module-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .varsity-module-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .module-accent-bar {
          height: 5px;
          width: 100%;
        }

        .module-image-container {
          position: relative;
          height: 160px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .module-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .varsity-module-card:hover .module-card-img {
          transform: scale(1.05);
        }

        .module-number-badge {
          position: absolute;
          top: 12px;
          left: 14px;
          background: rgba(15, 23, 42, 0.88);
          color: #ffffff;
          font-size: 16px;
          font-weight: 800;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .module-card-content {
          padding: 20px 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .module-card-header {
          margin-bottom: 12px;
        }

        .module-title-text {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 6px 0;
          line-height: 1.35;
        }

        .module-chapter-count {
          font-size: 13px;
          color: #64748b;
          font-weight: 600;
          margin: 0;
        }

        .module-description-text {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.55;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .module-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #f1f5f9;
        }

        .view-module-link {
          font-size: 13.5px;
          font-weight: 600;
          color: #0284c7;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s ease;
        }

        .view-module-link:hover {
          color: #0369a1;
          text-decoration: underline;
        }

        .module-lang-tag {
          font-size: 12px;
          color: #64748b;
          background: #f1f5f9;
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
          <h1 className="modules-page-title">Modules</h1>
          <p className="modules-page-subtitle">Master global trade, container logistics, documentation, and customs step-by-step.</p>
        </div>

        <div className="modules-search-wrapper">
          <Search size={16} className="modules-search-icon" />
          <input 
            type="text" 
            placeholder="Search 15 trade modules..." 
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

          return (
            <div 
              key={mod.id} 
              className="varsity-module-card"
              onClick={() => handleOpenModule(mod.id, mod.courseId)}
            >
              {/* Top Accent Color Line */}
              <div 
                className="module-accent-bar" 
                style={{ background: imgData.accentColor }} 
              />

              {/* Module Image Banner */}
              <div className="module-image-container">
                <img 
                  src={imgData.image} 
                  alt={mod.title} 
                  className="module-card-img" 
                />
                <div className="module-number-badge">{mod.order}</div>
              </div>

              {/* Module Content */}
              <div className="module-card-content">
                <div>
                  <div className="module-card-header">
                    <h3 className="module-title-text">{mod.order}. {mod.title}</h3>
                    <div className="module-chapter-count">{chapterCount} chapters</div>
                  </div>

                  <p className="module-description-text">
                    {mod.description}
                  </p>
                </div>

                <div className="module-card-actions">
                  <button className="view-module-link">
                    <span>View module</span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="module-lang-tag">Hindi / English</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
