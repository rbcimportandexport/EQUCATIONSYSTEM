import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, SlidersHorizontal, BookOpen, ArrowRight } from 'lucide-react';

export const Courses: React.FC = () => {
  const { 
    courses, 
    modules, 
    setSelectedCourseId, 
    setSelectedModuleId, 
    setSelectedLessonId,
    setActiveView,
    getCourseCompletionPercentage 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories for filters
  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter logic
  const filteredCourses = courses.filter(course => {
    const matchesCategory = categoryFilter === 'All' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'All' || course.level === levelFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    
    // Select first chapter of this course by default
    const courseModules = modules.filter(ch => ch.courseId === courseId);
    if (courseModules.length > 0) {
      setSelectedModuleId(courseModules[0].id);
      setSelectedLessonId(null);
      setActiveView('Chapters');
    } else {
      setSelectedModuleId(null);
      setSelectedLessonId(null);
      setActiveView('Chapters');
    }
  };

  return (
    <div className="courses-view" style={{ height: '100%', overflowY: 'auto', padding: '32px' }}>
      {/* Search & Filters bar */}
      <div className="catalog-filters-bar card">
        <div className="search-box-wrapper">
          <Search size={18} className="search-box-icon" />
          <input
            type="text"
            placeholder="Search catalog courses..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field query-catalog-input"
          />
        </div>

        <div className="filters-group">
          <div className="filter-select-wrapper">
            <SlidersHorizontal size={14} className="select-icon" />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="select-dropdown"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-select-wrapper">
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="select-dropdown"
            >
              {levels.map(lvl => (
                <option key={lvl} value={lvl}>{lvl === 'All' ? 'All Levels' : lvl}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Catalog Grid */}
      {filteredCourses.length === 0 ? (
        <div className="card empty-catalog-card">
          <BookOpen size={48} className="empty-catalog-icon" />
          <h3>No Courses Found</h3>
          <p>We couldn't find any courses matching your filters. Try widening your search queries.</p>
        </div>
      ) : (
        <div className="grid-3 courses-catalog-grid">
          {filteredCourses.map(course => {
            const progressPct = getCourseCompletionPercentage(course.id);
            const courseModules = modules.filter(ch => ch.courseId === course.id);
            
            return (
              <div key={course.id} className="card course-catalog-card" onClick={() => handleSelectCourse(course.id)}>
                <div className="catalog-thumb-container">
                  <img src={course.thumbnail} alt={course.title} className="catalog-thumbnail" />
                  <span className="badge-category">{course.category}</span>
                </div>

                <div className="catalog-body">
                  <div className="level-language-row">
                    <span className="meta-tag-span">{course.level}</span>
                    <span className="meta-separator">•</span>
                    <span className="meta-tag-span">{course.language}</span>
                  </div>

                  <h3 className="course-catalog-title">{course.title}</h3>
                  <p className="course-catalog-desc">{course.description}</p>
                  
                  <div className="chapters-count-badge">
                    {courseModules.length} {courseModules.length === 1 ? 'Module' : 'Modules'}
                  </div>
                </div>

                <div className="catalog-progress-footer">
                  <div className="catalog-progress-labels">
                    <span className="progress-status-label">{progressPct > 0 ? 'In Progress' : 'Not Started'}</span>
                    <span className="progress-percentage-bold">{progressPct}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
                  </div>
                  
                  <button className="btn btn-primary btn-full select-course-btn">
                    <span>View Curriculum</span>
                    <ArrowRight size={16} />
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
