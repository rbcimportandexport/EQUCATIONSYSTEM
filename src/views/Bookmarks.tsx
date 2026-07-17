import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bookmark, PlayCircle, FileText, FileImage, 
  Trash2, ExternalLink 
} from 'lucide-react';

export const Bookmarks: React.FC = () => {
  const { 
    bookmarks, 
    removeBookmark, 
    setSelectedCourseId, 
    setSelectedModuleId, 
    setSelectedLessonId, 
    setActiveView,
    modules,
    lessons
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'lesson' | 'video' | 'pdf' | 'note' | 'image'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredBookmarks = bookmarks.filter(b => {
    const matchesFilter = activeFilter === 'all' || b.type === activeFilter;
    
    // Find lesson title
    const lesson = lessons.find(l => l.id === b.lessonId);
    const lessonTitle = lesson ? lesson.title : '';
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lessonTitle.toLowerCase().includes(searchQuery.toLowerCase());
                          
    return matchesFilter && matchesSearch;
  });

  const handleNavigateToBookmark = (b: typeof bookmarks[0]) => {
    // Find chapter
    const lesson = lessons.find(l => l.id === b.lessonId);
    if (!lesson) return;

    setSelectedCourseId(b.courseId);
    setSelectedModuleId(lesson.moduleId);
    setSelectedLessonId(b.lessonId);
    
    // Switch view
    setActiveView('Lessons');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <FileText className="bmark-icon text" />;
      case 'video': return <PlayCircle className="bmark-icon video" />;
      case 'pdf': return <FileText className="bmark-icon pdf" />;
      case 'image': return <FileImage className="bmark-icon img" />;
      default: return <Bookmark className="bmark-icon generic" />;
    }
  };

  const getReadableType = (type: string) => {
    switch (type) {
      case 'lesson': return 'Lesson Page';
      case 'video': return 'Video Timestamp';
      case 'pdf': return 'PDF Page Reference';
      case 'image': return 'Gallery Figure';
      default: return 'Bookmark';
    }
  };

  return (
    <div className="bookmarks-view">
      {/* Filters & search header */}
      <div className="card bookmarks-header-bar">
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="Search bookmarked titles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="bookmarks-filter-tabs">
          {(['all', 'lesson', 'video', 'pdf'] as const).map(type => (
            <button
              key={type}
              className={`filter-tab ${activeFilter === type ? 'active' : ''}`}
              onClick={() => setActiveFilter(type)}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks Listing Grid */}
      {filteredBookmarks.length === 0 ? (
        <div className="card empty-bookmarks-card">
          <Bookmark size={48} className="empty-icon" />
          <h3>No Bookmarks Saved</h3>
          <p>You haven't bookmarked any items matching the active filters. Go to a lesson workspace to bookmark resources!</p>
        </div>
      ) : (
        <div className="grid-2 bookmarks-grid">
          {filteredBookmarks.map(b => {
            const lesson = lessons.find(l => l.id === b.lessonId);
            const moduleObj = lesson ? modules.find(m => m.id === lesson.moduleId) : null;
            
            return (
              <div key={b.id} className="card bookmark-item-card">
                <div className="bookmark-card-left">
                  {getIcon(b.type)}
                  <div className="bookmark-card-info">
                    <span className="bookmark-type-badge">{getReadableType(b.type)}</span>
                    <h4 className="bookmark-item-title">{b.title}</h4>
                    {lesson && (
                      <span className="bookmark-lesson-ref">
                        Reference: {moduleObj?.title} &gt; {lesson.title}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bookmark-card-actions">
                  <button 
                    className="btn btn-outlined btn-mini navigate-bmark-btn"
                    onClick={() => handleNavigateToBookmark(b)}
                    title="Jump to location in course workspace"
                  >
                    <ExternalLink size={14} />
                    <span>Go to Class</span>
                  </button>

                  <button 
                    className="btn btn-text delete-bmark-btn"
                    onClick={() => removeBookmark(b.id)}
                    title="Delete bookmark"
                  >
                    <Trash2 size={14} color="var(--md-sys-color-error)" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
