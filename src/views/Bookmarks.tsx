import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bookmark, PlayCircle, FileText, FileImage,
  Trash2, ExternalLink, Search
} from 'lucide-react';

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  lesson: { label: 'Lesson', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', icon: <FileText size={18} color="#60a5fa" /> },
  video:  { label: 'Video',  color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', icon: <PlayCircle size={18} color="#a78bfa" /> },
  pdf:    { label: 'PDF',    color: '#f97316', bg: 'rgba(249,115,22,0.12)',  icon: <FileText size={18} color="#f97316" /> },
  image:  { label: 'Image',  color: '#34d399', bg: 'rgba(52,211,153,0.12)', icon: <FileImage size={18} color="#34d399" /> },
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
      minHeight: '100%',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
      padding: '32px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #fbbf24, #f97316)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Bookmark size={22} color="#fff" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#f1f5f9' }}>
            My Bookmarks
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
            {bookmarks.length} saved item{bookmarks.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '200px' }}>
          <Search size={16} color="rgba(255,255,255,0.4)" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f1f5f9',
              fontSize: '14px',
              width: '100%',
            }}
          />
        </div>

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
                  border: isActive ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  background: isActive
                    ? 'linear-gradient(135deg, #fbbf24, #f97316)'
                    : 'transparent',
                  color: isActive ? '#1e293b' : 'rgba(255,255,255,0.6)',
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
          border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'rgba(251,191,36,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Bookmark size={32} color="rgba(251,191,36,0.5)" />
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#f1f5f9' }}>
            No Bookmarks Yet
          </h3>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.4)', fontSize: '14px', maxWidth: '360px', lineHeight: 1.6 }}>
            While studying a lesson, click the bookmark icon to save any resource here for quick access.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {filteredBookmarks.map(b => {
            const cfg = TYPE_CONFIG[b.type] || TYPE_CONFIG['lesson'];
            const lesson = lessons.find(l => l.id === b.lessonId);
            const moduleObj = lesson ? modules.find(m => m.id === lesson.moduleId) : null;

            return (
              <div key={b.id} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}>
                {/* Top row: icon + title */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: cfg.bg, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
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
                      color: '#f1f5f9', lineHeight: 1.3,
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
                    fontSize: '11px', color: 'rgba(255,255,255,0.45)',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '8px', padding: '8px 10px',
                    lineHeight: 1.4
                  }}>
                    📂 {moduleObj?.title} → {lesson.title}
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleNavigateToBookmark(b)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '9px', borderRadius: '10px', border: 'none',
                      background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                      color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer'
                    }}
                  >
                    <ExternalLink size={13} /> Go to Lesson
                  </button>
                  <button
                    onClick={() => removeBookmark(b.id)}
                    style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      border: '1px solid rgba(239,68,68,0.3)',
                      background: 'rgba(239,68,68,0.08)',
                      color: '#f87171', cursor: 'pointer',
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
