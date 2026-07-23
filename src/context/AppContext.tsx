import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Course, Module, Lesson, UserProgress, Bookmark, Download, User, Certificate
} from '../utils/data';
import { 
  initialCourses, initialModules, initialLessons, initialUsers 
} from '../utils/data';

export type ViewType = 
  | 'Dashboard' 
  | 'Courses' 
  | 'Chapters' // Maps internally to Modules
  | 'Videos' // Dedicated Video Gallery
  | 'Lessons' 
  | 'Bookmarks' 
  | 'Downloads' 
  | 'Search' 
  | 'Profile' 
  | 'Settings' 
  | 'AdminPanel'
  | 'Quiz'
  | 'Community';

export type RoleType = 'student' | 'admin';

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  userRole: RoleType;
  setUserRole: (role: RoleType) => void;
  language: 'en' | 'hi' | 'gu' | 'mr';
  setLanguage: (lang: 'en' | 'hi' | 'gu' | 'mr') => void;
  
  // Active state selections
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedModuleId: string | null;
  setSelectedModuleId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedModuleTab: 'read' | 'images' | 'video' | 'pdf';
  setSelectedModuleTab: (tab: 'read' | 'images' | 'video' | 'pdf') => void;
  
  // Database States
  courses: Course[];
  modules: Module[];
  lessons: Lesson[];
  users: User[];
  certificates: Certificate[];
  
  // Admin & User Operations
  saveCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  saveModule: (module: Module) => void;
  deleteModule: (id: string) => void;
  saveLesson: (lesson: Lesson) => void;
  deleteLesson: (id: string) => void;
  reorderLessons: (moduleId: string, orderedIds: string[]) => void;
  
  // User Management
  saveUser: (user: User) => void;
  issueCertificate: (userId: string, courseId: string) => void;
  
  // Student Stats & Progress Tracker
  progress: { [lessonId: string]: UserProgress };
  markLessonComplete: (lessonId: string, completed: boolean) => void;
  updateReadingProgress: (lessonId: string, progressPercentage: number) => void;
  updateWatchTime: (lessonId: string, seconds: number) => void;
  saveQuizScore: (lessonId: string, questionId: string, isCorrect: boolean) => void;
  getCourseCompletionPercentage: (courseId: string) => number;
  getModuleCompletionPercentage: (moduleId: string) => number;
  
  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
  removeBookmark: (id: string) => void;
  toggleBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
  
  // Downloads (Offline simulator)
  downloads: Download[];
  addDownload: (download: Omit<Download, 'id'>) => void;
  removeDownload: (id: string) => void;
  offlineMode: boolean;
  setOfflineMode: (offline: boolean) => void;

  // Search Engine Shorthand
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  
  // Utilities
  resetDatabase: () => void;

  // Login & Session profiles
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginUser: (name: string, email: string, role: RoleType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation states
  const [activeView, setActiveView] = useState<ViewType>('Chapters');
  const [userRole, setUserRole] = useState<RoleType>('student');
  const [language, setLanguageState] = useState<'en' | 'hi' | 'gu' | 'mr'>('en');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedModuleTab, setSelectedModuleTab] = useState<'read' | 'images' | 'video' | 'pdf'>('read');

  // Db states
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [currentUser, setCurrentUserState] = useState<User | null>(null);

  // User features states
  const [progress, setProgress] = useState<{ [lessonId: string]: UserProgress }>({});
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [offlineMode, setOfflineMode] = useState<boolean>(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');

  // 1. Initial Data Loading
  useEffect(() => {
    const savedCourses = localStorage.getItem('lms_courses_ie');
    const savedModules = localStorage.getItem('lms_modules_v3_ie');
    const savedLessons = localStorage.getItem('lms_lessons_v4_ie');
    const savedUsers = localStorage.getItem('lms_users_v2_ie');
    const savedCerts = localStorage.getItem('lms_certs_ie');
    const savedProgress = localStorage.getItem('lms_progress_ie');
    const savedBookmarks = localStorage.getItem('lms_bookmarks_ie');
    const savedDownloads = localStorage.getItem('lms_downloads_ie');
    const savedOffline = localStorage.getItem('lms_offline_mode_ie');
    const savedRole = localStorage.getItem('lms_user_role_ie');
    const savedLang = localStorage.getItem('lms_language_ie');

    if (savedCourses) setCourses(JSON.parse(savedCourses));
    else {
      setCourses(initialCourses);
      localStorage.setItem('lms_courses_ie', JSON.stringify(initialCourses));
    }

    if (savedModules) setModules(JSON.parse(savedModules));
    else {
      setModules(initialModules);
      localStorage.setItem('lms_modules_v3_ie', JSON.stringify(initialModules));
    }

    setLessons(initialLessons);
    localStorage.setItem('lms_lessons_v11_ie', JSON.stringify(initialLessons));

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else {
      setUsers(initialUsers);
      localStorage.setItem('lms_users_v2_ie', JSON.stringify(initialUsers));
    }

    if (savedCerts) setCertificates(JSON.parse(savedCerts));
    else {
      setCertificates([]);
      localStorage.setItem('lms_certs_ie', JSON.stringify([]));
    }

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedDownloads) setDownloads(JSON.parse(savedDownloads));
    if (savedOffline) setOfflineMode(JSON.parse(savedOffline));
    if (savedRole) setUserRole(savedRole as RoleType);
    if (savedLang) setLanguageState(savedLang as 'en' | 'hi' | 'gu' | 'mr');

    const savedCurrentUser = localStorage.getItem('lms_current_user_v2_ie');
    if (savedCurrentUser) {
      setCurrentUserState(JSON.parse(savedCurrentUser));
    }
    // No default user — stays null until real user sets their profile

    // Default select first course
    const firstCourse = savedCourses ? JSON.parse(savedCourses)[0] : initialCourses[0];
    if (firstCourse) {
      setSelectedCourseId(firstCourse.id);
    }
  }, []);

  // Keep currentUser progress percentage in sync with completed lessons
  useEffect(() => {
    if (!currentUser || lessons.length === 0) return;
    
    const courseLessons = lessons.filter(l => l.moduleId);
    if (courseLessons.length === 0) return;

    const completedCount = courseLessons.filter(l => progress[l.id]?.completed).length;
    const pct = Math.round((completedCount / courseLessons.length) * 100);

    if (currentUser.progressPercentage !== pct) {
      // Update currentUser state
      setCurrentUserState(prev => {
        if (!prev) return null;
        const updated = { ...prev, progressPercentage: pct };
        localStorage.setItem('lms_current_user_v2_ie', JSON.stringify(updated));
        return updated;
      });

      // Update in users list
      setUsers(prev => {
        const updated = prev.map(u => {
          if (u.id === currentUser.id || u.email === currentUser.email) {
            return { ...u, progressPercentage: pct };
          }
          return u;
        });
        saveToLocal('lms_users_v2_ie', updated);
        return updated;
      });
    }
  }, [progress, currentUser?.id, lessons.length]);

  // Sync state helpers
  const saveToLocal = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Database Reset
  const resetDatabase = () => {
    localStorage.removeItem('lms_courses_ie');
    localStorage.removeItem('lms_modules_v3_ie');
    localStorage.removeItem('lms_lessons_v3_ie');
    localStorage.removeItem('lms_users_v2_ie');
    localStorage.removeItem('lms_certs_ie');
    localStorage.removeItem('lms_progress_ie');
    localStorage.removeItem('lms_bookmarks_ie');
    localStorage.removeItem('lms_downloads_ie');
    localStorage.removeItem('lms_offline_mode_ie');
    localStorage.removeItem('lms_user_role_ie');

    setCourses(initialCourses);
    setModules(initialModules);
    setLessons(initialLessons);
    setUsers(initialUsers);
    setCertificates([]);
    setProgress({});
    setBookmarks([]);
    setDownloads([]);
    setOfflineMode(false);
    setUserRole('student');
    
    if (initialCourses[0]) {
      setSelectedCourseId(initialCourses[0].id);
      setSelectedModuleId(null);
      setSelectedLessonId(null);
    }
    setActiveView('Dashboard');
  };

  // ADMIN OPERATIONS
  const saveCourse = (course: Course) => {
    setCourses(prev => {
      const idx = prev.findIndex(c => c.id === course.id);
      let updated;
      if (idx > -1) {
        updated = [...prev];
        updated[idx] = course;
      } else {
        updated = [...prev, course];
      }
      saveToLocal('lms_courses_ie', updated);
      return updated;
    });
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => {
      const updated = prev.filter(c => c.id !== id);
      saveToLocal('lms_courses_ie', updated);
      return updated;
    });
    const modulesToDelete = modules.filter(ch => ch.courseId === id);
    modulesToDelete.forEach(ch => deleteModule(ch.id));
  };

  const saveModule = (module: Module) => {
    setModules(prev => {
      const idx = prev.findIndex(c => c.id === module.id);
      let updated;
      if (idx > -1) {
        updated = [...prev];
        updated[idx] = module;
      } else {
        updated = [...prev, module];
      }
      updated.sort((a, b) => a.order - b.order);
      saveToLocal('lms_modules_v3_ie', updated);
      return updated;
    });
  };

  const deleteModule = (id: string) => {
    setModules(prev => {
      const updated = prev.filter(c => c.id !== id);
      saveToLocal('lms_modules_v3_ie', updated);
      return updated;
    });
    const lessonsToDelete = lessons.filter(l => l.moduleId === id);
    lessonsToDelete.forEach(l => deleteLesson(l.id));
  };

  const saveLesson = (lesson: Lesson) => {
    setLessons(prev => {
      const idx = prev.findIndex(l => l.id === lesson.id);
      let updated;
      if (idx > -1) {
        updated = [...prev];
        updated[idx] = lesson;
      } else {
        updated = [...prev, lesson];
      }
      updated.sort((a, b) => a.order - b.order);
      saveToLocal('lms_lessons_v3_ie', updated);
      return updated;
    });
  };

  const deleteLesson = (id: string) => {
    setLessons(prev => {
      const updated = prev.filter(l => l.id !== id);
      saveToLocal('lms_lessons_v3_ie', updated);
      return updated;
    });
    setBookmarks(prev => {
      const updated = prev.filter(b => b.lessonId !== id);
      saveToLocal('lms_bookmarks_ie', updated);
      return updated;
    });
    setDownloads(prev => {
      const updated = prev.filter(d => d.lessonId !== id);
      saveToLocal('lms_downloads_ie', updated);
      return updated;
    });
  };

  const reorderLessons = (moduleId: string, orderedIds: string[]) => {
    setLessons(prev => {
      const updated = prev.map(l => {
        if (l.moduleId === moduleId) {
          const newOrder = orderedIds.indexOf(l.id) + 1;
          return { ...l, order: newOrder > 0 ? newOrder : l.order };
        }
        return l;
      });
      updated.sort((a, b) => a.order - b.order);
      saveToLocal('lms_lessons_v3_ie', updated);
      return updated;
    });
  };

  // USER MANAGEMENT
  const saveUser = (user: User) => {
    setUsers(prev => {
      const idx = prev.findIndex(u => u.id === user.id);
      let updated;
      if (idx > -1) {
        updated = [...prev];
        updated[idx] = user;
      } else {
        updated = [...prev, user];
      }
      saveToLocal('lms_users_v2_ie', updated);
      return updated;
    });
  };

  const issueCertificate = (userId: string, courseId: string) => {
    const userObj = users.find(u => u.id === userId);
    const courseObj = courses.find(c => c.id === courseId);
    if (!userObj || !courseObj) return;

    // Check if certificate already exists
    if (certificates.some(c => c.userId === userId && c.courseId === courseId)) {
      return;
    }

    const cert: Certificate = {
      id: `cert-${Date.now()}`,
      userId,
      userName: userObj.name,
      courseId,
      courseTitle: courseObj.title,
      issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setCertificates(prev => {
      const updated = [...prev, cert];
      saveToLocal('lms_certs_ie', updated);
      return updated;
    });

    // Update user progress to 100% since they got the certificate
    saveUser({
      ...userObj,
      progressPercentage: 100
    });
  };

  // STUDENT PROGRESS ACTIONS
  const getInitProgress = (lessonId: string): UserProgress => {
    return progress[lessonId] || {
      lessonId,
      completed: false,
      watchTime: 0,
      readingProgress: 0,
      quizScores: {}
    };
  };

  // Triggers user progress percentage updates
  const syncStudentProgressPercentage = (updatedProgress: { [lessonId: string]: UserProgress }) => {
    if (!currentUser) return;
    const activeUser = users.find(u => u.id === currentUser.id || u.email === currentUser.email);
    if (!activeUser) return;

    const courseLessons = lessons.filter(l => l.moduleId);
    if (courseLessons.length === 0) return;

    const completedCount = courseLessons.filter(l => updatedProgress[l.id]?.completed).length;
    const pct = Math.round((completedCount / courseLessons.length) * 100);

    saveUser({
      ...activeUser,
      progressPercentage: pct
    });

    setCurrentUserState(prev => {
      if (!prev) return null;
      const updated = { ...prev, progressPercentage: pct };
      localStorage.setItem('lms_current_user_v2_ie', JSON.stringify(updated));
      return updated;
    });
  };

  const markLessonComplete = (lessonId: string, completed: boolean) => {
    setProgress(prev => {
      const current = prev[lessonId] || getInitProgress(lessonId);
      const updated = {
        ...prev,
        [lessonId]: {
          ...current,
          completed,
          readingProgress: completed ? 100 : current.readingProgress
        }
      };
      saveToLocal('lms_progress_ie', updated);
      syncStudentProgressPercentage(updated);
      return updated;
    });
  };

  const updateReadingProgress = (lessonId: string, progressPercentage: number) => {
    setProgress(prev => {
      const current = prev[lessonId] || getInitProgress(lessonId);
      const newProgress = Math.max(current.readingProgress, progressPercentage);
      const isCompleted = newProgress >= 95 ? true : current.completed;
      
      const updated = {
        ...prev,
        [lessonId]: {
          ...current,
          readingProgress: newProgress,
          completed: isCompleted
        }
      };
      saveToLocal('lms_progress_ie', updated);
      syncStudentProgressPercentage(updated);
      return updated;
    });
  };

  const updateWatchTime = (lessonId: string, seconds: number) => {
    setProgress(prev => {
      const current = prev[lessonId] || getInitProgress(lessonId);
      const lessonObj = lessons.find(l => l.id === lessonId);
      const videoDuration = lessonObj?.content.video?.duration || 0;
      
      let isCompleted = current.completed;
      if (videoDuration > 0 && seconds >= videoDuration * 0.9) {
        isCompleted = true;
      }

      const updated = {
        ...prev,
        [lessonId]: {
          ...current,
          watchTime: seconds,
          completed: isCompleted
        }
      };
      saveToLocal('lms_progress_ie', updated);
      syncStudentProgressPercentage(updated);
      return updated;
    });
  };

  const saveQuizScore = (lessonId: string, questionId: string, isCorrect: boolean) => {
    setProgress(prev => {
      const current = prev[lessonId] || getInitProgress(lessonId);
      const updatedScores = {
        ...current.quizScores,
        [questionId]: isCorrect ? 1 : 0
      };
      const updated = {
        ...prev,
        [lessonId]: {
          ...current,
          quizScores: updatedScores
        }
      };
      saveToLocal('lms_progress_ie', updated);
      return updated;
    });
  };

  const getModuleCompletionPercentage = (moduleId: string): number => {
    const moduleLessons = lessons.filter(l => l.moduleId === moduleId);
    if (moduleLessons.length === 0) return 0;
    const completedCount = moduleLessons.filter(l => progress[l.id]?.completed).length;
    return Math.round((completedCount / moduleLessons.length) * 100);
  };

  const getCourseCompletionPercentage = (courseId: string): number => {
    const courseModules = modules.filter(m => m.courseId === courseId);
    const courseModuleIds = courseModules.map(m => m.id);
    const courseLessons = lessons.filter(l => courseModuleIds.includes(l.moduleId));
    
    if (courseLessons.length === 0) return 0;
    
    const completedCount = courseLessons.filter(l => progress[l.id]?.completed).length;
    return Math.round((completedCount / courseLessons.length) * 100);
  };

  // BOOKMARKS MANAGEMENT
  const addBookmark = (item: Omit<Bookmark, 'id'>) => {
    setBookmarks(prev => {
      const id = `bmark-${Date.now()}`;
      const newBookmark = { ...item, id };
      const updated = [...prev, newBookmark];
      saveToLocal('lms_bookmarks_ie', updated);
      return updated;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id);
      saveToLocal('lms_bookmarks_ie', updated);
      return updated;
    });
  };

  const toggleBookmark = (item: Omit<Bookmark, 'id'>) => {
    const exists = bookmarks.find(b => 
      b.lessonId === item.lessonId && 
      b.type === item.type && 
      b.refData === item.refData
    );
    if (exists) {
      removeBookmark(exists.id);
    } else {
      addBookmark(item);
    }
  };

  // OFFLINE DOWNLOADS MANAGEMENT
  const addDownload = (item: Omit<Download, 'id'>) => {
    setDownloads(prev => {
      if (prev.some(d => d.lessonId === item.lessonId && d.type === item.type)) {
        return prev;
      }
      const id = `dl-${Date.now()}`;
      const newDownload = { ...item, id };
      const updated = [...prev, newDownload];
      saveToLocal('lms_downloads_ie', updated);
      return updated;
    });
  };

  const removeDownload = (id: string) => {
    setDownloads(prev => {
      const updated = prev.filter(d => d.id !== id);
      saveToLocal('lms_downloads_ie', updated);
      return updated;
    });
  };

  const handleSetOfflineMode = (offline: boolean) => {
    setOfflineMode(offline);
    saveToLocal('lms_offline_mode_ie', offline);
  };

  const handleSetUserRole = (role: RoleType) => {
    setUserRole(role);
    localStorage.setItem('lms_user_role_ie', role);
    if (role === 'admin') {
      setActiveView('AdminPanel');
    } else {
      setActiveView('Dashboard');
    }
  };

  const handleSetLanguage = (lang: 'en' | 'hi' | 'gu' | 'mr') => {
    setLanguageState(lang);
    localStorage.setItem('lms_language_ie', lang);
  };

  const loginUser = (name: string, email: string, role: RoleType) => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      progressPercentage: 0
    };
    
    setUsers(prev => {
      const updated = [...prev.filter(u => u.email !== email), newUser];
      saveToLocal('lms_users_v2_ie', updated);
      return updated;
    });

    setCurrentUserState(newUser);
    localStorage.setItem('lms_current_user_v2_ie', JSON.stringify(newUser));
  };

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      userRole,
      setUserRole: handleSetUserRole,
      language,
      setLanguage: handleSetLanguage,
      
      selectedCourseId,
      setSelectedCourseId,
      selectedModuleId,
      setSelectedModuleId,
      selectedLessonId,
      setSelectedLessonId,
      selectedModuleTab,
      setSelectedModuleTab,
      
      courses,
      modules,
      lessons,
      users,
      certificates,
      
      saveCourse,
      deleteCourse,
      saveModule,
      deleteModule: deleteModule,
      saveLesson,
      deleteLesson,
      reorderLessons,
      saveUser,
      issueCertificate,
      
      progress,
      markLessonComplete,
      updateReadingProgress,
      updateWatchTime,
      saveQuizScore,
      getCourseCompletionPercentage,
      getModuleCompletionPercentage,
      
      bookmarks,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      
      downloads,
      addDownload,
      removeDownload,
      offlineMode,
      setOfflineMode: handleSetOfflineMode,

      globalSearchQuery,
      setGlobalSearchQuery,
      
      currentUser,
      setCurrentUser: setCurrentUserState,
      loginUser,
      resetDatabase
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
