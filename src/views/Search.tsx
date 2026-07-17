import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Search as SearchIcon, FileText, BookOpen, Layers } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'course' | 'module' | 'lesson' | 'pdf' | 'note';
  title: string;
  excerpt: string;
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  refData?: string; // pdf page number
}

export const Search: React.FC = () => {
  const { 
    courses, 
    modules, 
    lessons, 
    setSelectedCourseId, 
    setSelectedModuleId, 
    setSelectedLessonId, 
    setActiveView,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useApp();

  const [scope, setScope] = useState<'all' | 'lessons' | 'pdf' | 'notes'>('all');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!globalSearchQuery.trim() || globalSearchQuery.length < 2) {
      setResults([]);
      return;
    }

    const query = globalSearchQuery.toLowerCase();
    const tempResults: SearchResult[] = [];

    // 1. Search Courses
    if (scope === 'all') {
      courses.forEach(c => {
        if (c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)) {
          tempResults.push({
            id: `s-course-${c.id}`,
            type: 'course',
            title: `Course: ${c.title}`,
            excerpt: c.description.substring(0, 100) + '...',
            courseId: c.id
          });
        }
      });

      // 2. Search Modules
      modules.forEach(mod => {
        if (mod.title.toLowerCase().includes(query) || mod.description.toLowerCase().includes(query)) {
          tempResults.push({
            id: `s-mod-${mod.id}`,
            type: 'module',
            title: `Module: ${mod.title}`,
            excerpt: mod.description.substring(0, 100) + '...',
            courseId: mod.courseId,
            moduleId: mod.id
          });
        }
      });
    }

    // 3. Search Lessons (Text notes, Code, Objectives)
    lessons.forEach(l => {
      const matchInTitle = l.title.toLowerCase().includes(query);
      const matchInDesc = l.description.toLowerCase().includes(query);
      const matchInWritten = l.content.writtenExplanation.toLowerCase().includes(query);
      
      const mod = modules.find(m => m.id === l.moduleId);
      const courseId = mod ? mod.courseId : 'import-export-master';

      if (scope === 'all' || scope === 'lessons') {
        if (matchInTitle || matchInDesc || matchInWritten) {
          let excerpt = l.description;
          if (matchInWritten) {
            const idx = l.content.writtenExplanation.toLowerCase().indexOf(query);
            const start = Math.max(0, idx - 40);
            excerpt = '...' + l.content.writtenExplanation.substring(start, start + 100) + '...';
          }

          tempResults.push({
            id: `s-lesson-${l.id}`,
            type: 'lesson',
            title: `Lesson: ${l.title}`,
            excerpt,
            courseId,
            moduleId: l.moduleId,
            lessonId: l.id
          });
        }
      }

      // 4. Search PDF text
      if ((scope === 'all' || scope === 'pdf') && l.content.pdf) {
        l.content.pdf.mockPagesText.forEach((pText, pIdx) => {
          if (pText.toLowerCase().includes(query)) {
            const idx = pText.toLowerCase().indexOf(query);
            const start = Math.max(0, idx - 40);
            const excerpt = '...' + pText.substring(start, start + 100) + '...';

            tempResults.push({
              id: `s-pdf-${l.id}-${pIdx}`,
              type: 'pdf',
              title: `PDF Page ${pIdx + 1}: ${l.content.pdf!.title}`,
              excerpt,
              courseId,
              moduleId: l.moduleId,
              lessonId: l.id,
              refData: (pIdx + 1).toString()
            });
          }
        });
      }

      // 5. Search Important Notes
      if (scope === 'all' || scope === 'notes') {
        l.content.importantNotes.forEach((note, noteIdx) => {
          if (note.toLowerCase().includes(query)) {
            tempResults.push({
              id: `s-note-${l.id}-${noteIdx}`,
              type: 'note',
              title: `Important Note in Lesson: ${l.title}`,
              excerpt: note,
              courseId,
              moduleId: l.moduleId,
              lessonId: l.id
            });
          }
        });
      }
    });

    setResults(tempResults);
  }, [globalSearchQuery, scope, courses, modules, lessons]);

  const handleNavigateToResult = (res: SearchResult) => {
    setSelectedCourseId(res.courseId);
    
    if (res.type === 'course') {
      setActiveView('Chapters');
    } else if (res.type === 'module') {
      setSelectedModuleId(res.moduleId || null);
      setActiveView('Chapters');
    } else {
      setSelectedModuleId(res.moduleId || null);
      setSelectedLessonId(res.lessonId || null);
      setActiveView('Lessons');
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen size={18} className="res-icon course" />;
      case 'module': return <Layers size={18} className="res-icon chap" />;
      case 'pdf': return <FileText size={18} className="res-icon pdf" />;
      case 'note': return <FileText size={18} className="res-icon note" />;
      default: return <FileText size={18} className="res-icon generic" />;
    }
  };

  return (
    <div className="search-view">
      {/* Search inputs bar */}
      <div className="card search-control-card">
        <div className="search-box-wrapper">
          <SearchIcon size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Type search queries (e.g. FOB, MOQ, custom, packing list)..."
            value={globalSearchQuery}
            onChange={e => setGlobalSearchQuery(e.target.value)}
            className="input-field query-full-text-input"
            autoFocus
          />
        </div>

        {/* Filter scopes row */}
        <div className="search-scope-tabs">
          <button 
            className={`scope-tab ${scope === 'all' ? 'active' : ''}`}
            onClick={() => setScope('all')}
          >
            All Scope
          </button>
          <button 
            className={`scope-tab ${scope === 'lessons' ? 'active' : ''}`}
            onClick={() => setScope('lessons')}
          >
            Lessons
          </button>
          <button 
            className={`scope-tab ${scope === 'pdf' ? 'active' : ''}`}
            onClick={() => setScope('pdf')}
          >
            PDF Text
          </button>
          <button 
            className={`scope-tab ${scope === 'notes' ? 'active' : ''}`}
            onClick={() => setScope('notes')}
          >
            Notes
          </button>
        </div>
      </div>

      {/* Results details */}
      {globalSearchQuery.trim().length >= 2 && (
        <div className="search-meta-row">
          <span>Found {results.length} results matching &ldquo;{globalSearchQuery}&rdquo;</span>
        </div>
      )}

      {results.length === 0 ? (
        <div className="card empty-search-card">
          <SearchIcon size={48} className="empty-icon" />
          <h3>Start Searching</h3>
          <p>Type keywords to search across textbooks, PDF transcripts, slides, notes, modules, and course guides.</p>
        </div>
      ) : (
        <div className="search-results-stack">
          {results.map(res => (
            <div 
              key={res.id} 
              className="card search-result-card-item"
              onClick={() => handleNavigateToResult(res)}
            >
              <div className="res-header">
                {getResultIcon(res.type)}
                <span className="res-title-text">{res.title}</span>
                <span className="res-type-tag">{res.type.toUpperCase()}</span>
              </div>
              <p className="res-excerpt">{res.excerpt}</p>
              <div className="res-footer-nav">
                <span>Click to view in syllabus workspace</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
