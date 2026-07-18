import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bookmark, PlayCircle, FileText, FileImage,
  Trash2, ExternalLink, Search
} from 'lucide-react';

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  lesson: { label: 'Lesson', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', icon: <FileText size={18} color="#2563eb" /> },
  video:  { label: 'Video',  color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', icon: <PlayCircle size={18} color="#7c3aed" /> },
  pdf:    { label: 'PDF',    color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', icon: <FileText size={18} color="#ea580c" /> },
  image:  { label: 'Image',  color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', icon: <FileImage size={18} color="#059669" /> },
};

const FILTER_TABS = ['all', 'lesson', 'video', 'pdf'] as const;

export const Bookmarks: React.FC = () => {
  const {
    bookmarks, removeBookmark,
    setSelectedCourseId, setSelectedModuleId, setSelectedLessonId,
    setActiveView, modules, lessons
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'lesson' | 'video' | 'pdf' | 'note' | 'image'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookmarks = bookmarks.filter(b => {
    const matchesFilter = activeFilter === 'all' || b.type === activeFilter;
    const lesson = lessons.find(l => l.id === b.lessonId);
    const lessonTitle = lesson ? lesson.title : '';
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lessonTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleNavigateToBookmark = (b: typeof bookmarks[0]) => {
    const lesson = lessons.find(l => l.id === b.lessonId);
    if (!lesson) return;
    setSelectedCourseId(b.courseId);
    setSelectedModuleId(lesson.moduleId);
    setSelectedLessonId(b.lessonId);
    setActiveView('Chapters');
  };

  return (
    <div style={{
      height: '100%',
      background: '#f8fafc',
      padding: '32px',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #f59e0b, #f97316)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(245,158,11,0.3)'
        }}>
          <Bookmark size={22} color="#fff" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>
            My Bookmarks
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
            {bookmarks.length} saved item{bookmarks.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '14px 20px',
        marginBottom: '24px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
      }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '180px' }}>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#1e293b',
              fontSize: '14px',
              width: '100%',
            }}
          />
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }} />

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {FILTER_TABS.map(type => {
            const isActive = activeFilter === type;
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: isActive ? 'none' : '1px solid #e2e8f0',
                  background: isActive
                    ? 'linear-gradient(135deg, #f59e0b, #f97316)'
                    : '#f8fafc',
                  color: isActive ? '#fff' : '#64748b',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s'
                }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredBookmarks.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '80px 20px', gap: '16px',
          border: '2px dashed #e2e8f0', borderRadius: '20px',
          background: '#ffffff', textAlign: 'center'
        }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: '#fff7ed',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bookmark size={32} color="#f59e0b" />
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
            No Bookmarks Yet
          </h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', maxWidth: '360px', lineHeight: 1.6 }}>
            While studying a lesson, click the bookmark icon to save any resource here for quick access.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {filteredBookmarks.map(b => {
            const cfg = TYPE_CONFIG[b.type] || TYPE_CONFIG['lesson'];
            const lesson = lessons.find(l => l.id === b.lessonId);
            const moduleObj = lesson ? modules.find(m => m.id === lesson.moduleId) : null;

            return (
              <div key={b.id} style={{
                background: '#ffffff',
                border: `1px solid ${cfg.border}`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.2s',
              }}>
                {/* Top row: icon + title */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: cfg.bg, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${cfg.border}`
                  }}>
                    {cfg.icon}
                  </div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize: '10px', fontWeight: '700',
                      color: cfg.color, textTransform: 'uppercase', letterSpacing: '1px'
                    }}>
                      {cfg.label}
                    </span>
                    <h4 style={{
                      margin: '4px 0 0', fontSize: '14px', fontWeight: '700',
                      color: '#0f172a', lineHeight: 1.3,
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                    }}>
                      {b.title}
                    </h4>
                  </div>
                </div>

                {/* Module reference */}
                {lesson && (
                  <div style={{
                    fontSize: '11px', color: '#64748b',
                    background: '#f8fafc',
                    borderRadius: '8px', padding: '8px 10px',
                    lineHeight: 1.4, border: '1px solid #f1f5f9'
                  }}>
                    📂 {moduleObj?.title} → {lesson.title}
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleNavigateToBookmark(b)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '6px',
                      padding: '9px', borderRadius: '10px', border: 'none',
                      background: 'linear-gradient(135deg, #1d4ed8, #4f46e5)',
                      color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(29,78,216,0.25)'
                    }}
                  >
                    <ExternalLink size={13} /> Go to Lesson
                  </button>
                  <button
                    onClick={() => removeBookmark(b.id)}
                    style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      border: '1px solid #fecaca',
                      background: '#fff5f5',
                      color: '#ef4444', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}
                    title="Remove bookmark"
                  >
                    <Trash2 size={15} />
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
