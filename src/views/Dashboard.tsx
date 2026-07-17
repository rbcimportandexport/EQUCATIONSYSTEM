import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, BookOpen, Clock, Award, CheckCircle, 
  ArrowRight, BookMarked 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    courses, 
    modules, 
    lessons, 
    progress, 
    setSelectedCourseId, 
    setSelectedModuleId, 
    setSelectedLessonId, 
    setActiveView,
    getCourseCompletionPercentage
  } = useApp();

  // Aggregate statistics
  const totalCoursesCount = courses.length;
  const completedLessonsCount = Object.values(progress).filter(p => p.completed).length;
  
  // Calculate mock hours studied based on completed lessons (average 15 mins per lesson)
  const studyHours = Math.round(((completedLessonsCount * 15) / 60) * 10) / 10 + 2.4; 

  // Calculate average quiz score
  let totalCorrectAnswers = 0;
  let totalQuestionsCount = 0;
  Object.values(progress).forEach(p => {
    Object.values(p.quizScores).forEach(score => {
      totalCorrectAnswers += score;
      totalQuestionsCount += 1;
    });
  });
  const avgQuizScore = totalQuestionsCount > 0 
    ? Math.round((totalCorrectAnswers / totalQuestionsCount) * 100) 
    : 85; // default fallback

  // "Continue Learning" Logic: find first incomplete lesson, or default to first lesson
  const getContinueLesson = () => {
    // Look at active course
    const firstCourse = courses[0];
    if (!firstCourse) return null;

    const courseModules = modules.filter(c => c.courseId === firstCourse.id);
    const courseModuleIds = courseModules.map(c => c.id);
    const courseLessons = lessons.filter(l => courseModuleIds.includes(l.moduleId));

    // Find first incomplete lesson
    const nextIncomplete = courseLessons.find(l => !progress[l.id]?.completed);
    return nextIncomplete || courseLessons[0] || null;
  };

  const continueLesson = getContinueLesson();

  const handleContinueLearning = () => {
    if (!continueLesson) return;

    const lessonModule = modules.find(m => m.id === continueLesson.moduleId);
    if (!lessonModule) return;

    setSelectedCourseId(lessonModule.courseId);
    setSelectedModuleId(lessonModule.id);
    setSelectedLessonId(continueLesson.id);
    setActiveView('Lessons');
  };

  const handleStartCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    // Find first chapter of this course
    const courseModules = modules.filter(m => m.courseId === courseId);
    if (courseModules.length > 0) {
      setSelectedModuleId(courseModules[0].id);
      setActiveView('Chapters');
    } else {
      setActiveView('Courses');
    }
  };

  return (
    <div className="dashboard-view">
      <div className="welcome-banner card">
        <div className="welcome-left">
          <h1>Welcome back, Jane!</h1>
          <p>Ready to continue your education? Expand your engineering and architecture credentials today.</p>
          
          {continueLesson && (
            <button className="btn btn-primary continue-btn" onClick={handleContinueLearning}>
              <Play size={16} fill="currentColor" />
              <span>Resume: {continueLesson.title}</span>
            </button>
          )}
        </div>
        <div className="welcome-graphic">
          <BookMarked size={72} color="var(--md-sys-color-primary)" style={{ opacity: 0.15 }} />
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid-4 stats-grid">
        <div className="card stat-card">
          <div className="stat-icon-wrapper blue">
            <BookOpen size={24} />
          </div>
          <div className="stat-data">
            <span className="stat-val">{totalCoursesCount}</span>
            <span className="stat-label">Enrolled Courses</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper orange">
            <Clock size={24} />
          </div>
          <div className="stat-data">
            <span className="stat-val">{studyHours} hrs</span>
            <span className="stat-label">Time Studied</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-data">
            <span className="stat-val">{completedLessonsCount}</span>
            <span className="stat-label">Lessons Completed</span>
          </div>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper purple">
            <Award size={24} />
          </div>
          <div className="stat-data">
            <span className="stat-val">{avgQuizScore}%</span>
            <span className="stat-label">Avg Quiz Score</span>
          </div>
        </div>
      </div>

      {/* Course List & Recommendations */}
      <div className="dashboard-content-main">
        <div className="section-header">
          <h2>My Active Enrolled Courses</h2>
          <button className="btn btn-text" onClick={() => setActiveView('Courses')}>
            <span>View Catalog</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid-2 enrolled-courses-grid">
          {courses.map(course => {
            const pct = getCourseCompletionPercentage(course.id);
            return (
              <div key={course.id} className="card course-summary-card">
                <div className="course-card-top">
                  <img src={course.thumbnail} alt={course.title} className="course-card-thumb" />
                  <div className="course-card-details">
                    <span className="badge badge-primary">{course.category}</span>
                    <h3 className="course-card-title">{course.title}</h3>
                    <div className="course-meta-tags">
                      <span className="tag-span">{course.level}</span>
                      <span className="tag-dot">•</span>
                      <span className="tag-span">{course.language}</span>
                    </div>
                  </div>
                </div>

                <div className="course-card-progress-section">
                  <div className="progress-label-row">
                    <span>Course Completion</span>
                    <span className="progress-pct-bold">{pct}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>

                <div className="course-card-footer">
                  <button className="btn btn-outlined btn-full" onClick={() => handleStartCourse(course.id)}>
                    <span>{pct > 0 ? 'Resume Course' : 'Start Course'}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
