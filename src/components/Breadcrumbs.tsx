import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    selectedCourseId, 
    selectedModuleId, 
    selectedLessonId,
    courses,
    modules,
    lessons
  } = useApp();

  const course = courses.find(c => c.id === selectedCourseId);
  const moduleObj = modules.find(m => m.id === selectedModuleId);
  const lesson = lessons.find(l => l.id === selectedLessonId);

  const navigateTo = (view: typeof activeView) => {
    setActiveView(view);
  };

  const getBreadcrumbs = () => {
    const crumbs = [];

    // Home or dashboard base
    crumbs.push(
      <span 
        key="home" 
        className="crumb-link" 
        onClick={() => navigateTo('Dashboard')}
      >
        <Home size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
        Portal
      </span>
    );

    if (activeView === 'Courses') {
      crumbs.push(<ChevronRight key="s1" size={14} className="crumb-separator" />);
      crumbs.push(<span key="courses" className="crumb-current">Catalog</span>);
    } else if (activeView === 'Chapters') {
      crumbs.push(<ChevronRight key="s1" size={14} className="crumb-separator" />);
      crumbs.push(
        <span key="catalog" className="crumb-link" onClick={() => navigateTo('Courses')}>
          Catalog
        </span>
      );
      if (course) {
        crumbs.push(<ChevronRight key="s2" size={14} className="crumb-separator" />);
        crumbs.push(<span key="course" className="crumb-current">{course.title}</span>);
      }
    } else if (activeView === 'Lessons') {
      crumbs.push(<ChevronRight key="s1" size={14} className="crumb-separator" />);
      crumbs.push(
        <span key="catalog" className="crumb-link" onClick={() => navigateTo('Courses')}>
          Catalog
        </span>
      );
      if (course) {
        crumbs.push(<ChevronRight key="s2" size={14} className="crumb-separator" />);
        crumbs.push(
          <span key="course" className="crumb-link" onClick={() => navigateTo('Chapters')}>
            {course.title}
          </span>
        );
      }
      if (moduleObj) {
        crumbs.push(<ChevronRight key="s3" size={14} className="crumb-separator" />);
        crumbs.push(
          <span key="module" className="crumb-link" onClick={() => navigateTo('Chapters')}>
            {moduleObj.title}
          </span>
        );
      }
      if (lesson) {
        crumbs.push(<ChevronRight key="s4" size={14} className="crumb-separator" />);
        crumbs.push(<span key="lesson" className="crumb-current">{lesson.title}</span>);
      }
    } else if (activeView !== 'Dashboard') {
      crumbs.push(<ChevronRight key="s1" size={14} className="crumb-separator" />);
      crumbs.push(<span key="current" className="crumb-current">{activeView}</span>);
    }

    return crumbs;
  };

  return <div className="breadcrumbs-container">{getBreadcrumbs()}</div>;
};
