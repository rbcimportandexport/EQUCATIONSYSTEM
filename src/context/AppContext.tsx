import React, { createContext, useContext, useState, useEffect } from 'react';
import { videosApi, usersApi, authApi, lessonsApi } from '../utils/api';
import { getVideoFromIDB, getAllVideosFromIDB, saveLessonsToIDB, getLessonsFromIDB } from '../utils/indexedDB';
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

export interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface AlertModalInfo {
  isOpen: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}

export interface ConfirmModalInfo {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  alertModal: AlertModalInfo;
  showAlert: (title: string, message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  closeAlert: () => void;
  confirmModal: ConfirmModalInfo;
  showConfirm: (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => void;
  closeConfirm: () => void;
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
  saveLesson: (lesson: Lesson) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  reorderLessons: (moduleId: string, orderedIds: string[]) => void;
  
  // User Management
  saveUser: (user: User) => void;
  fetchAllUsers: () => Promise<void>;
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
  loginUser: (name: string, email: string, role: RoleType, id?: string) => void;
  syncCustomVideo: (lessonId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation states
  // Toast & Custom Alert Modal States
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [alertModal, setAlertModal] = useState<AlertModalInfo>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, isOpen: false }));
  };

  const [confirmModal, setConfirmModal] = useState<ConfirmModalInfo>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const showConfirm = (title: string, message: string, onConfirm: () => void, onCancel?: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        closeConfirm();
      },
      onCancel: () => {
        if (onCancel) onCancel();
        closeConfirm();
      }
    });
  };

  const closeConfirm = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

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
    // Clear legacy lesson cache keys to prevent stale English content from sticking in localStorage
    ['lms_lessons_ie', 'lms_lessons_v2_ie', 'lms_lessons_v3_ie', 'lms_lessons_v4_ie', 'lms_lessons_v5_ie', 'lms_lessons_v6_ie', 'lms_lessons_v7_ie', 'lms_lessons_v8_ie', 'lms_lessons_v9_ie', 'lms_lessons_v10_ie', 'lms_lessons_v11_ie', 'lms_lessons_v12_ie', 'lms_lessons_v13_ie', 'lms_lessons_v14_ie', 'lms_lessons_v15_ie', 'lms_lessons_v16_ie', 'lms_lessons_v17_ie', 'lms_lessons_v18_ie', 'lms_lessons_v19_ie', 'lms_lessons_v20_ie', 'lms_lessons_v21_ie', 'lms_lessons_v22_ie'].forEach(k => {
      try { localStorage.removeItem(k); } catch (e) {}
    });

    const savedLessons = localStorage.getItem('lms_lessons_v23_ie');
    const savedUsers = localStorage.getItem('lms_users_v2_ie');
    const savedCerts = localStorage.getItem('lms_certs_ie');
    const savedProgress = localStorage.getItem('lms_progress_ie');
    const savedBookmarks = localStorage.getItem('lms_bookmarks_ie');
    const savedDownloads = localStorage.getItem('lms_downloads_ie');
    const savedOffline = localStorage.getItem('lms_offline_mode_ie');

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

    if (savedLessons) {
      try {
        let parsed = JSON.parse(savedLessons);
        if (Array.isArray(parsed)) {
          let migrated = false;
          parsed = parsed.map(lesson => {
            if (!lesson.content || !Array.isArray(lesson.content.images)) return lesson;
            const hasPlaceholder = lesson.content.images.some((img: any) => 
              img && typeof img === 'object' && img.url && 
              (img.url.includes('logo_emblem') || img.url === '')
            );
            if (hasPlaceholder) {
              const defaultLesson = initialLessons.find(l => l.id === lesson.id);
              if (defaultLesson && defaultLesson.content && Array.isArray(defaultLesson.content.images)) {
                migrated = true;
                return {
                  ...lesson,
                  content: {
                    ...lesson.content,
                    images: defaultLesson.content.images
                  }
                };
              }
            }
            return lesson;
          });
          if (migrated) {
            localStorage.setItem('lms_lessons_v23_ie', JSON.stringify(parsed));
          }
        }
        setLessons(parsed);
      } catch (e) {
        setLessons(initialLessons);
      }
    } else {
      setLessons(initialLessons);
    }

    // Async check from IndexedDB cache to load large base64 custom diagrams immediately
    getLessonsFromIDB().then(idbLessons => {
      if (idbLessons && idbLessons.length > 0) {
        let parsed = idbLessons;
        let migrated = false;
        parsed = parsed.map(lesson => {
          if (!lesson.content || !Array.isArray(lesson.content.images)) return lesson;
          const hasPlaceholder = lesson.content.images.some((img: any) => 
            img && typeof img === 'object' && img.url && 
            (img.url.includes('logo_emblem') || img.url === '')
          );
          if (hasPlaceholder) {
            const defaultLesson = initialLessons.find(l => l.id === lesson.id);
            if (defaultLesson && defaultLesson.content && Array.isArray(defaultLesson.content.images)) {
              migrated = true;
              return {
                ...lesson,
                content: {
                  ...lesson.content,
                  images: defaultLesson.content.images
                }
              };
            }
          }
          return lesson;
        });
        if (migrated) {
          localStorage.setItem('lms_lessons_v23_ie', JSON.stringify(parsed));
          saveLessonsToIDB(parsed);
        }
        setLessons(parsed);
      }
    }).catch(err => {
      console.warn('Failed to load lessons from IndexedDB cache:', err);
    });

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
    const savedRole = localStorage.getItem('lms_user_role_ie');
    if (savedRole) setUserRole(savedRole as RoleType);

    const savedCurrentUser = localStorage.getItem('lms_current_user_v2_ie');
    if (savedCurrentUser) {
      try {
        const parsedUser = JSON.parse(savedCurrentUser);
        setCurrentUserState(parsedUser);
        if (parsedUser && parsedUser.email) {
          const userProgKey = `lms_progress_${parsedUser.email.toLowerCase().trim()}`;
          const userProgStr = localStorage.getItem(userProgKey);
          if (userProgStr) {
            setProgress(JSON.parse(userProgStr));
          } else if (savedProgress) {
            setProgress(JSON.parse(savedProgress));
          }
        }
      } catch (e) {}
    } else if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    // Fetch real users from MongoDB Atlas backend
    fetchAllUsers();

    // Default select first course
    const firstCourse = savedCourses ? JSON.parse(savedCourses)[0] : initialCourses[0];
    if (firstCourse) {
      setSelectedCourseId(firstCourse.id);
    }
  }, []);

  // Auto-sync active logged-in user to MongoDB Atlas Cloud Database if missing
  useEffect(() => {
    if (currentUser && currentUser.email) {
      authApi.register({
        name: currentUser.name || currentUser.email.split('@')[0],
        email: currentUser.email.toLowerCase().trim(),
        password: 'rbcuser123',
        role: currentUser.role || 'student',
        otp: '123456'
      }).then(() => {
        fetchAllUsers();
      }).catch(() => {
        // Already registered in MongoDB Atlas
      });
    }
  }, [currentUser?.email]);

  // Load all custom video thumbnails on app mount (from IndexedDB & API)
  useEffect(() => {
    const fetchAllCustomVideos = async () => {
      // 1. First check local IndexedDB for instant offline/large video payload loading
      try {
        const idbList = await getAllVideosFromIDB();
        if (idbList.length > 0) {
          setLessons(prevLessons => {
            return prevLessons.map(lesson => {
              const match = idbList.find(c => c.lessonId === lesson.id);
              if (match) {
                return {
                  ...lesson,
                  content: {
                    ...lesson.content,
                    video: {
                      videoUrl: match.videoData || lesson.content.video?.videoUrl || '',
                      thumbnail: match.thumbnailData || lesson.content.video?.thumbnail || '',
                      duration: match.duration || lesson.content.video?.duration || 120
                    }
                  }
                };
              }
              return lesson;
            });
          });
        }
      } catch (e) {
        console.warn('IDB fetchAll error:', e);
      }

      // 2. Fetch from backend server API
      try {
        const res = await videosApi.getAll();
        if (res.success && res.data) {
          const customList = res.data;
          setLessons(prevLessons => {
            return prevLessons.map(lesson => {
              const match = customList.find(c => c.lessonId === lesson.id);
              if (match) {
                return {
                  ...lesson,
                  content: {
                    ...lesson.content,
                    video: {
                      ...lesson.content.video,
                      thumbnail: match.thumbnailData || lesson.content.video?.thumbnail || '',
                      duration: match.duration || lesson.content.video?.duration || 120
                    }
                  }
                };
              }
              return lesson;
            });
          });
        }
      } catch (e) {
        console.warn('fetchAllCustomVideos error:', e);
      }
    };

    fetchAllCustomVideos();
  }, []);

  // Load custom lessons from MongoDB Atlas Cloud Database
  useEffect(() => {
    const fetchMongoLessons = async () => {
      try {
        const res = await lessonsApi.getAll();
        if (res.success && res.data && res.data.length > 0) {
          const mongoLessons = res.data;
          setLessons(prevLessons => {
            const merged = prevLessons.map(localLesson => {
              const match = mongoLessons.find(m => m.id === localLesson.id);
              if (match) {
                return {
                  ...localLesson,
                  ...match,
                  content: {
                    ...localLesson.content,
                    ...match.content
                  }
                };
              }
              return localLesson;
            });
            mongoLessons.forEach(mongoLesson => {
              const exists = merged.some(m => m.id === mongoLesson.id);
              if (!exists) {
                merged.push(mongoLesson);
              }
            });
            merged.sort((a, b) => a.order - b.order);
            saveToLocal('lms_lessons_v23_ie', merged);
            saveLessonsToIDB(merged);
            return merged;
          });
        }
      } catch (err) {
        console.warn('Failed to fetch customized lessons from MongoDB Atlas:', err);
      }
    };

    fetchMongoLessons();
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

  // Load custom video payload when selectedLessonId changes
  useEffect(() => {
    if (!selectedLessonId) return;

    const fetchCustomVideo = async () => {
      try {
        const res = await videosApi.getByLesson(selectedLessonId);
        if (res.success && res.data) {
          const custom = res.data;
          setLessons(prevLessons => {
            return prevLessons.map(lesson => {
              if (lesson.id === selectedLessonId) {
                return {
                  ...lesson,
                  content: {
                    ...lesson.content,
                    video: {
                      videoUrl: custom.videoData || '',
                      thumbnail: custom.thumbnailData || '',
                      duration: custom.duration || 120
                    }
                  }
                };
              }
              return lesson;
            });
          });
        }
      } catch (e) {
        // Quietly fail if no server connection or custom video exists
      }
    };

    fetchCustomVideo();
  }, [selectedLessonId]);

  const saveToLocal = (key: string, data: any) => {
    try {
      if (key === 'lms_lessons_v23_ie' && Array.isArray(data)) {
        // Strip large base64 strings (longer than 100KB) from the data saved to localStorage
        // to prevent QuotaExceededError and ensure instant loading from cache.
        const sanitized = data.map(lesson => {
          if (!lesson.content) return lesson;
          const content = { ...lesson.content };
          
          if (Array.isArray(content.images)) {
            content.images = content.images.map((img: any) => {
              if (img && typeof img === 'object' && img.url && img.url.startsWith('data:') && img.url.length > 100000) {
                return { ...img, url: '/logo_emblem.png', highResUrl: '/logo_emblem.png' };
              }
              return img;
            });
          }
          
          if (content.video && content.video.videoUrl && content.video.videoUrl.startsWith('data:') && content.video.videoUrl.length > 100000) {
            content.video = { ...content.video, videoUrl: '' };
          }
          
          return { ...lesson, content };
        });
        localStorage.setItem(key, JSON.stringify(sanitized));
      } else {
        localStorage.setItem(key, JSON.stringify(data));
        if (key === 'lms_progress_ie' && currentUser && currentUser.email) {
          try {
            const userProgKey = `lms_progress_${currentUser.email.toLowerCase().trim()}`;
            localStorage.setItem(userProgKey, JSON.stringify(data));
          } catch (err) {}
        }
      }
    } catch (e) {
      console.warn(`localStorage write failed for key "${key}":`, e);
    }
  };

  // Database Reset
  const resetDatabase = () => {
    localStorage.removeItem('lms_courses_ie');
    localStorage.removeItem('lms_modules_v3_ie');
    localStorage.removeItem('lms_lessons_v23_ie');
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

  const saveLesson = async (lesson: Lesson) => {
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
      saveToLocal('lms_lessons_v23_ie', updated);
      saveLessonsToIDB(updated);
      return updated;
    });

    try {
      await lessonsApi.save(lesson);
    } catch (err) {
      console.warn('Failed to save lesson to MongoDB Atlas:', err);
    }
  };

  const deleteLesson = async (id: string) => {
    setLessons(prev => {
      const updated = prev.filter(l => l.id !== id);
      saveToLocal('lms_lessons_v23_ie', updated);
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

    try {
      await lessonsApi.delete(id);
    } catch (err) {
      console.warn('Failed to delete lesson from MongoDB Atlas:', err);
    }
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
      saveToLocal('lms_lessons_v23_ie', updated);
      return updated;
    });
  };

  // USER MANAGEMENT
  const fetchAllUsers = async () => {
    try {
      console.log('[DEBUG] fetchAllUsers: initiating request...');
      const res = await usersApi.getAll();
      console.log('[DEBUG] fetchAllUsers: raw response:', res);
      const rawUsers = res.users || (res as any).data || (Array.isArray(res) ? res : []);
      console.log('[DEBUG] fetchAllUsers: parsed rawUsers:', rawUsers);
      if (rawUsers && Array.isArray(rawUsers)) {
        const mongoUsers: User[] = rawUsers.map((u: any) => ({
          id: u.id || u._id || `usr-${Math.random()}`,
          name: u.name || (u.email ? u.email.split('@')[0] : 'User'),
          email: u.email || '',
          role: u.role || 'student',
          progressPercentage: typeof u.progressPercentage === 'number' ? u.progressPercentage : 0,
          phone: u.phone || '',
          country: u.country || 'India'
        }));

        setUsers(mongoUsers);
        saveToLocal('lms_users_v2_ie', mongoUsers);

        // Update currentUser if their email matches one of the backend users to heal stale local storage cache IDs
        const savedCurrentUserStr = localStorage.getItem('lms_current_user_v2_ie');
        if (savedCurrentUserStr) {
          try {
            const currentObj = JSON.parse(savedCurrentUserStr);
            const dbMatch = mongoUsers.find((u: User) => u.email.toLowerCase().trim() === currentObj.email.toLowerCase().trim());
            if (dbMatch && dbMatch.id !== currentObj.id) {
              console.log('[DEBUG] Syncing cached user ID to MongoDB ID:', dbMatch.id);
              const updatedUser = { ...currentObj, id: dbMatch.id };
              setCurrentUserState(updatedUser);
              localStorage.setItem('lms_current_user_v2_ie', JSON.stringify(updatedUser));
            }
          } catch (err) {
            console.error('Error syncing currentUser ID:', err);
          }
        }
      }
    } catch (e: any) {
      console.error('Backend user load error:', e);
    }
  };

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

  const loginUser = (name: string, email: string, role: RoleType, id?: string) => {
    const cleanEmail = email.toLowerCase().trim();
    const newUser: User = {
      id: id || `u-${Date.now()}`,
      name,
      email: cleanEmail,
      role,
      progressPercentage: 0
    };
    
    const userProgKey = `lms_progress_${cleanEmail}`;
    const savedUserProg = localStorage.getItem(userProgKey);
    if (savedUserProg) {
      try {
        const parsedProg = JSON.parse(savedUserProg);
        setProgress(parsedProg);
        saveToLocal('lms_progress_ie', parsedProg);
      } catch (e) {}
    } else {
      const globalProg = localStorage.getItem('lms_progress_ie');
      if (globalProg) {
        try {
          const parsedGlobal = JSON.parse(globalProg);
          saveToLocal(userProgKey, parsedGlobal);
        } catch (e) {}
      }
    }

    setUsers(prev => {
      const updated = [...prev.filter(u => u.email.toLowerCase().trim() !== cleanEmail), newUser];
      saveToLocal('lms_users_v2_ie', updated);
      return updated;
    });

    setCurrentUserState(newUser);
    localStorage.setItem('lms_current_user_v2_ie', JSON.stringify(newUser));
  };

  const syncCustomVideo = async (lessonId: string) => {
    // 1. Check local IndexedDB first for instant video playback
    try {
      const idbVideo = await getVideoFromIDB(lessonId);
      if (idbVideo && idbVideo.videoData) {
        setLessons(prevLessons => {
          return prevLessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                content: {
                  ...lesson.content,
                  video: {
                    videoUrl: idbVideo.videoData || '',
                    thumbnail: idbVideo.thumbnailData || '',
                    duration: idbVideo.duration || 120
                  }
                }
              };
            }
            return lesson;
          });
        });
      }
    } catch (err) {
      console.warn('syncCustomVideo IDB check error:', err);
    }

    // 2. Fetch from backend API
    try {
      const res = await videosApi.getByLesson(lessonId);
      if (res.success && res.data) {
        const custom = res.data;
        setLessons(prevLessons => {
          return prevLessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                content: {
                  ...lesson.content,
                  video: {
                    videoUrl: custom.videoData || lesson.content.video?.videoUrl || '',
                    thumbnail: custom.thumbnailData || lesson.content.video?.thumbnail || '',
                    duration: custom.duration || 120
                  }
                }
              };
            }
            return lesson;
          });
        });
      }
    } catch (e) {
      console.warn('syncCustomVideo error:', e);
    }
  };

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      userRole,
      setUserRole: handleSetUserRole,
      language,
      setLanguage: handleSetLanguage,
      syncCustomVideo,
      
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
      fetchAllUsers,
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
      resetDatabase,
      
      toasts,
      showToast,
      removeToast,
      alertModal,
      showAlert,
      closeAlert,
      confirmModal,
      showConfirm,
      closeConfirm
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
