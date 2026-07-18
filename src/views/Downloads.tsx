import React from 'react';
import { useApp } from '../context/AppContext';
import { Download, Trash2, WifiOff, PlayCircle, FileText, Database } from 'lucide-react';

export const Downloads: React.FC = () => {
  const { 
    downloads, 
    removeDownload, 
    offlineMode, 
    setOfflineMode,
    setSelectedCourseId,
    setSelectedModuleId,
    setSelectedLessonId,
    setActiveView,
    lessons
  } = useApp();

  // Sum disk space occupied
  const calculateTotalSize = () => {
    let mb = 0;
    downloads.forEach(d => {
      const match = d.size.match(/([\d.]+)\s*MB/i);
      if (match) {
        mb += parseFloat(match[1]);
      }
    });
    return `${mb.toFixed(1)} MB`;
  };

  const handleStudyOffline = (d: typeof downloads[0]) => {
    const lesson = lessons.find(l => l.id === d.lessonId);
    if (!lesson) return;

    setSelectedCourseId('import-export-master'); // Default
    setSelectedModuleId(lesson.moduleId);
    setSelectedLessonId(d.lessonId);
    setActiveView('Chapters');
  };

  const getIcon = (type: string) => {
    return type === 'video' 
      ? <PlayCircle className="dl-icon video" /> 
      : <FileText className="dl-icon pdf" />;
  };

  return (
    <div className="downloads-view" style={{ height: '100%', overflowY: 'auto', padding: '32px' }}>
      {/* Caching storage widget */}
      <div className="card downloads-storage-widget">
        <div className="storage-left">
          <Database size={32} className="storage-icon" />
          <div className="storage-info">
            <span className="storage-label">Offline Cache Occupied</span>
            <span className="storage-value">{calculateTotalSize()}</span>
          </div>
        </div>

        <button 
          className={`btn ${offlineMode ? 'btn-primary offline-active' : 'btn-outlined'}`}
          onClick={() => setOfflineMode(!offlineMode)}
        >
          <WifiOff size={16} />
          <span>{offlineMode ? 'Simulating Offline Mode' : 'Go Offline'}</span>
        </button>
      </div>

      {offlineMode && (
        <div className="callout warning offline-warning-banner">
          <div className="callout-title">
            <WifiOff size={18} />
            <span>Simulated Offline Mode Active</span>
          </div>
          <p>
            The system is simulating a loss of internet connection. Online video playback and external APIs will be restricted. 
            Only downloaded items list below are accessible in the lesson viewer.
          </p>
        </div>
      )}

      {/* Downloads list */}
      {downloads.length === 0 ? (
        <div className="card empty-downloads-card">
          <Download size={48} className="empty-icon" />
          <h3>Offline Library Empty</h3>
          <p>You haven't downloaded any lectures or PDF textbooks yet. Open a lesson to download contents for offline studies!</p>
        </div>
      ) : (
        <div className="downloads-list card">
          <h3 className="card-title">Cached Offline Contents</h3>
          <div className="downloads-stack">
            {downloads.map(d => (
              <div key={d.id} className="download-item-row">
                <div className="dl-item-left">
                  {getIcon(d.type)}
                  <div className="dl-item-info">
                    <span className="dl-type-badge">{d.type.toUpperCase()} File</span>
                    <h4 className="dl-item-title">{d.title}</h4>
                    <span className="dl-item-size">Disk size: {d.size}</span>
                  </div>
                </div>

                <div className="dl-item-actions">
                  <button 
                    className="btn btn-outlined btn-mini study-offline-btn"
                    onClick={() => handleStudyOffline(d)}
                  >
                    Study Offline
                  </button>

                  <button 
                    className="btn btn-text delete-dl-btn"
                    onClick={() => removeDownload(d.id)}
                    title="Delete local copy"
                  >
                    <Trash2 size={16} color="var(--md-sys-color-error)" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
