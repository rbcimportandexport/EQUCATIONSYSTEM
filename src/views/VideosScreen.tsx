import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { moduleLessonsMap } from '../utils/data';
import { Search, Play, Clock, Video } from 'lucide-react';

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

export const VideosScreen: React.FC = () => {
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

  const handleWatchVideo = (moduleId: string, courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedModuleId(moduleId);
    setSelectedLessonId(null);
    setSelectedModuleTab('video');
    setActiveView('Chapters');
  };

  return (
    <div className="varsity-videos-page" style={{ 
      height: '100%', 
      overflowY: 'auto', 
      background: '#ffffff',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#1e293b'
    }}>
      <style>{`
        .videos-header-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 36px 48px 24px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .videos-title-box h1 {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
        }

        .videos-title-box p {
          font-size: 15px;
          color: #64748b;
          margin: 0;
        }

        .videos-search-box {
          position: relative;
          width: 320px;
        }

        .videos-search-box input {
          width: 100%;
          padding: 10px 16px 10px 42px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .videos-search-box input:focus {
          border-color: #0284c7;
        }

        .videos-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .videos-grid-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 48px 64px 48px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        @media (max-width: 1024px) {
          .videos-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .videos-grid-container {
            grid-template-columns: 1fr;
            padding: 0 20px 40px 20px;
          }
          .videos-header-container {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 20px 16px 20px;
          }
          .videos-search-box {
            width: 100%;
          }
        }

        .video-card-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .video-card-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -6px rgba(15, 23, 42, 0.08);
          border-color: #cbd5e1;
        }

        .video-thumb-area {
          height: 180px;
          position: relative;
          background: #0f172a;
          overflow: hidden;
        }

        .video-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: transform 0.3s ease;
        }

        .video-card-item:hover .video-thumb-img {
          transform: scale(1.04);
        }

        .video-thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.1) 60%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-btn-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(2, 132, 199, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .video-card-item:hover .play-btn-circle {
          transform: scale(1.1);
          background: #0284c7;
        }

        .video-duration-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .video-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .video-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .module-badge-tag {
          font-size: 11px;
          font-weight: 800;
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .video-card-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
          line-height: 1.35;
        }

        .video-card-desc {
          font-size: 13.5px;
          color: #64748b;
          margin: 0 0 16px 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .video-card-action {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #0284c7;
          margin-top: auto;
        }
      `}</style>

      {/* Header Banner */}
      <div className="videos-header-container">
        <div className="videos-title-box">
          <h1>RBC Video Masterclasses</h1>
          <p>Watch step-by-step video guides for all 15 import & export modules</p>
        </div>

        <div className="videos-search-box">
          <Search size={18} className="videos-search-icon" />
          <input 
            type="text" 
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 3-Column Video Cards Grid */}
      <div className="videos-grid-container">
        {filteredModules.map((mod) => {
          const modMeta = MODULE_IMAGES_AND_COLORS[mod.order] || {
            image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
            accentColor: '#0284c7'
          };
          const lessonsList = moduleLessonsMap[mod.order] || [];
          const videoDurationMin = 12 + (mod.order * 2);

          return (
            <div 
              key={mod.id} 
              className="video-card-item"
              onClick={() => handleWatchVideo(mod.id, mod.courseId)}
            >
              {/* Thumbnail with Overlay Play Icon */}
              <div className="video-thumb-area">
                <img src={modMeta.image} alt={mod.title} className="video-thumb-img" />
                <div className="video-thumb-overlay">
                  <div className="play-btn-circle">
                    <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />
                  </div>
                </div>
                <div className="video-duration-badge">
                  <Clock size={12} />
                  <span>{videoDurationMin}:00 Mins</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="video-card-body">
                <div className="video-card-top-row">
                  <span className="module-badge-tag" style={{ background: modMeta.accentColor }}>
                    Module {mod.order}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                    {lessonsList.length} Lessons
                  </span>
                </div>

                <h3 className="video-card-title">{mod.title} Video Masterclass</h3>
                <p className="video-card-desc">{mod.description}</p>

                <div className="video-card-action">
                  <Video size={16} />
                  <span>Watch Video Guide</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
