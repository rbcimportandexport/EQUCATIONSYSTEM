import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Course, Module, Lesson, User } from '../utils/data';
import { 
  Edit2, Trash2, ArrowUp, ArrowDown, Save, 
  Layers, BookOpen, FileText, Users as UsersIcon, Award 
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    courses, saveCourse, deleteCourse,
    modules, saveModule, deleteModule,
    lessons, saveLesson, deleteLesson, reorderLessons,
    users, saveUser, certificates, issueCertificate
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'modules' | 'lessons' | 'users'>('courses');

  // Form states - Course
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<Omit<Course, 'id'>>({
    title: '',
    description: '',
    thumbnail: '',
    category: '',
    level: 'Intermediate',
    language: 'English'
  });

  // Form states - Module
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [moduleForm, setModuleForm] = useState<Omit<Module, 'id'>>({
    courseId: courses[0]?.id || '',
    title: '',
    description: '',
    order: 1
  });

  // Form states - Lesson
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonFilterCourseId, setLessonFilterCourseId] = useState<string>(courses[0]?.id || '');
  const [lessonFilterModuleId, setLessonFilterModuleId] = useState<string>('');
  
  const [lessonForm, setLessonForm] = useState({
    moduleId: '',
    title: '',
    description: '',
    duration: 10,
    order: 1,
    objectives: '',
    writtenExplanation: '',
    codeLanguage: 'typescript',
    codeSnippet: '',
    videoUrl: '',
    videoThumbnail: '',
    videoDuration: 0,
    pdfUrl: '',
    pdfTitle: '',
    pdfPages: 1,
    pdfMockText: '',
    importantNotes: '',
    keyPoints: '',
    summary: ''
  });

  // Form states - User
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<Omit<User, 'id' | 'progressPercentage'>>({
    name: '',
    email: '',
    role: 'student'
  });

  // ----------------------------------------------------
  // COURSE HANDLERS
  // ----------------------------------------------------
  const handleCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingCourseId || `course-${Date.now()}`;
    saveCourse({
      id,
      ...courseForm
    });
    setEditingCourseId(null);
    setCourseForm({
      title: '',
      description: '',
      thumbnail: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
      category: '',
      level: 'Intermediate',
      language: 'English'
    });
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      category: course.category,
      level: course.level,
      language: course.language
    });
  };

  // ----------------------------------------------------
  // MODULE HANDLERS
  // ----------------------------------------------------
  const handleModuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingModuleId || `mod-${Date.now()}`;
    saveModule({
      id,
      ...moduleForm,
      order: Number(moduleForm.order)
    });
    setEditingModuleId(null);
    setModuleForm(prev => ({
      ...prev,
      title: '',
      description: '',
      order: prev.order + 1
    }));
  };

  const handleEditModule = (moduleObj: Module) => {
    setEditingModuleId(moduleObj.id);
    setModuleForm({
      courseId: moduleObj.courseId,
      title: moduleObj.title,
      description: moduleObj.description,
      order: moduleObj.order
    });
  };

  // ----------------------------------------------------
  // LESSON HANDLERS
  // ----------------------------------------------------
  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.moduleId) {
      alert('Please select a module for the lesson.');
      return;
    }

    const id = editingLessonId || `les-${Date.now()}`;
    
    const assembledLesson: Lesson = {
      id,
      moduleId: lessonForm.moduleId,
      title: lessonForm.title,
      description: lessonForm.description,
      duration: Number(lessonForm.duration),
      order: Number(lessonForm.order),
      content: {
        definition: 'Sample Definition',
        whyImportant: 'Sample Importance summary checklist.',
        businessExample: 'Sample Case Study description.',
        images: [],
        video: { 
          videoUrl: lessonForm.videoUrl || '', 
          thumbnail: lessonForm.videoThumbnail || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', 
          duration: Number(lessonForm.videoDuration) || Number(lessonForm.duration) * 60 || 120 
        },
        pdf: { 
          pdfUrl: lessonForm.pdfUrl || '', 
          title: lessonForm.pdfTitle || 'Handbook', 
          totalPages: Number(lessonForm.pdfPages) || 1, 
          size: '1.2 MB', 
          mockPagesText: lessonForm.pdfMockText ? lessonForm.pdfMockText.split('\n') : ['Study guide text content reference slides.'] 
        },
        downloadOption: { title: 'Download File', fileUrl: '', size: '50 KB', type: 'pdf' },
        relatedTopics: [],
        faqs: [],
        commonMistakes: [],
        practicalTips: [],
        objectives: lessonForm.objectives.split('\n').filter(l => l.trim()),
        writtenExplanation: lessonForm.writtenExplanation,
        importantNotes: lessonForm.importantNotes.split('\n').filter(l => l.trim()),
        keyPoints: lessonForm.keyPoints.split('\n').filter(l => l.trim()),
        summary: lessonForm.summary,
        quiz: [
          {
            id: `q-default-${id}`,
            type: 'true-false',
            question: `Concept check for: ${lessonForm.title}`,
            correctAnswers: ['true'],
            explanation: 'Concept matches standard global customs regulations.'
          }
        ]
      }
    };

    if (lessonForm.codeSnippet) {
      assembledLesson.content.codeBlock = {
        language: lessonForm.codeLanguage,
        code: lessonForm.codeSnippet
      };
    }

    saveLesson(assembledLesson);
    setEditingLessonId(null);
    setLessonForm(prev => ({
      ...prev,
      title: '',
      description: '',
      writtenExplanation: '',
      codeSnippet: '',
      videoUrl: '',
      pdfUrl: '',
      order: prev.order + 1
    }));
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setLessonForm({
      moduleId: lesson.moduleId,
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      order: lesson.order,
      objectives: lesson.content.objectives?.join('\n') || '',
      writtenExplanation: lesson.content.writtenExplanation,
      codeLanguage: lesson.content.codeBlock?.language || 'typescript',
      codeSnippet: lesson.content.codeBlock?.code || '',
      videoUrl: lesson.content.video?.videoUrl || '',
      videoThumbnail: lesson.content.video?.thumbnail || '',
      videoDuration: lesson.content.video?.duration || 0,
      pdfUrl: lesson.content.pdf?.pdfUrl || '',
      pdfTitle: lesson.content.pdf?.title || '',
      pdfPages: lesson.content.pdf?.totalPages || 1,
      pdfMockText: lesson.content.pdf?.mockPagesText[0] || '',
      importantNotes: lesson.content.importantNotes?.join('\n') || '',
      keyPoints: lesson.content.keyPoints?.join('\n') || '',
      summary: lesson.content.summary
    });
  };

  const handleShiftLesson = (lessonId: string, direction: 'up' | 'down', currentModuleId: string) => {
    const list = lessons.filter(l => l.moduleId === currentModuleId);
    const index = list.findIndex(l => l.id === lessonId);
    
    if (direction === 'up' && index > 0) {
      const reordered = [...list.map(l => l.id)];
      reordered[index] = list[index - 1].id;
      reordered[index - 1] = lessonId;
      reorderLessons(currentModuleId, reordered);
    } else if (direction === 'down' && index < list.length - 1) {
      const reordered = [...list.map(l => l.id)];
      reordered[index] = list[index + 1].id;
      reordered[index + 1] = lessonId;
      reorderLessons(currentModuleId, reordered);
    }
  };

  // ----------------------------------------------------
  // USER HANDLERS
  // ----------------------------------------------------
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingUserId || `usr-${Date.now()}`;
    saveUser({
      id,
      progressPercentage: editingUserId ? (users.find(u => u.id === editingUserId)?.progressPercentage || 0) : 0,
      ...userForm
    });
    setEditingUserId(null);
    setUserForm({ name: '', email: '', role: 'student' });
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  const activeModuleOptions = modules.filter(m => m.courseId === (lessonFilterCourseId || courses[0]?.id));
  const activeLessonsList = lessons.filter(l => l.moduleId === (lessonFilterModuleId || activeModuleOptions[0]?.id));

  // Sync module selection and auto-select active module option
  React.useEffect(() => {
    if (activeModuleOptions.length > 0) {
      const exists = activeModuleOptions.some(m => m.id === lessonFilterModuleId);
      if (!exists) {
        setLessonFilterModuleId(activeModuleOptions[0].id);
      }
    } else {
      setLessonFilterModuleId('');
    }
  }, [lessonFilterCourseId, activeModuleOptions, lessonFilterModuleId]);

  React.useEffect(() => {
    if (lessonFilterModuleId) {
      setLessonForm(prev => ({ ...prev, moduleId: lessonFilterModuleId }));
    }
  }, [lessonFilterModuleId]);

  return (
    <div className="admin-panel-view">
      <div className="card admin-tabs-card" style={{ marginBottom: '24px', padding: '12px 16px' }}>
        <div className="admin-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <button 
            className={`admin-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'courses' ? '#102A56' : '#ffffff', color: activeTab === 'courses' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <BookOpen size={16} />
            <span>Manage Courses</span>
          </button>
          <button 
            className={`admin-tab ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'modules' ? '#102A56' : '#ffffff', color: activeTab === 'modules' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <Layers size={16} />
            <span>Manage Modules</span>
          </button>
          <button 
            className={`admin-tab ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setActiveTab('lessons')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'lessons' ? '#102A56' : '#ffffff', color: activeTab === 'lessons' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <FileText size={16} />
            <span>Manage Lessons</span>
          </button>
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'users' ? '#102A56' : '#ffffff', color: activeTab === 'users' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <UsersIcon size={16} />
            <span>Manage Users</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
         1. COURSES
         ==================================================================== */}
      {activeTab === 'courses' && (
        <div className="admin-content-grid grid-2">
          <div className="card admin-list-card">
            <h3>Registered Courses ({courses.length})</h3>
            <div className="admin-items-stack">
              {courses.map(course => (
                <div key={course.id} className="admin-item-row-block">
                  <div className="admin-item-details">
                    <img src={course.thumbnail} className="admin-thumb" alt="" />
                    <div className="admin-item-info">
                      <h4>{course.title}</h4>
                      <span className="admin-meta-span">{course.category} • {course.level}</span>
                    </div>
                  </div>
                  <div className="admin-row-actions">
                    <button className="btn btn-outlined btn-mini" onClick={() => handleEditCourse(course)}>
                      <Edit2 size={12} />
                    </button>
                    <button className="btn btn-text btn-danger btn-mini" onClick={() => deleteCourse(course.id)}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card admin-form-card">
            <h3>{editingCourseId ? 'Edit Course Settings' : 'Create New Course'}</h3>
            <form onSubmit={handleCourseSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={e => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description Summary</label>
                <textarea
                  required
                  rows={3}
                  value={courseForm.description}
                  onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="input-field text-area"
                />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    required
                    value={courseForm.category}
                    onChange={e => setCourseForm({ ...courseForm, category: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Language</label>
                  <input
                    type="text"
                    required
                    value={courseForm.language}
                    onChange={e => setCourseForm({ ...courseForm, language: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Upload Course Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                      });
                      setCourseForm({ ...courseForm, thumbnail: base64 });
                    }
                  }}
                  className="input-field"
                />
                {courseForm.thumbnail && (
                  <img src={courseForm.thumbnail} style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px', border: '1px solid #cbd5e1' }} alt="Preview" />
                )}
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <Save size={16} />
                <span>Save Course</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
         2. MODULES
         ==================================================================== */}
      {activeTab === 'modules' && (
        <div className="admin-content-grid grid-2">
          <div className="card admin-list-card">
            <h3>Course Modules ({modules.length})</h3>
            <div className="admin-items-stack">
              {modules.map(mod => {
                const parent = courses.find(c => c.id === mod.courseId);
                return (
                  <div key={mod.id} className="admin-item-row-block">
                    <div className="admin-item-info">
                      <h4>Module {mod.order}. {mod.title}</h4>
                      <span className="admin-meta-span">Parent: {parent?.title || 'Unknown'}</span>
                    </div>
                    <div className="admin-row-actions">
                      <button className="btn btn-outlined btn-mini" onClick={() => handleEditModule(mod)}>
                        <Edit2 size={12} />
                      </button>
                      <button className="btn btn-text btn-danger btn-mini" onClick={() => deleteModule(mod.id)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card admin-form-card">
            <h3>{editingModuleId ? 'Edit Module Settings' : 'Create New Module'}</h3>
            <form onSubmit={handleModuleSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Select Course</label>
                <select
                  value={moduleForm.courseId}
                  onChange={e => setModuleForm({ ...moduleForm, courseId: e.target.value })}
                  className="input-field"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Module Title</label>
                <input
                  type="text"
                  required
                  value={moduleForm.title}
                  onChange={e => setModuleForm({ ...moduleForm, title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description Blueprint</label>
                <textarea
                  required
                  rows={2}
                  value={moduleForm.description}
                  onChange={e => setModuleForm({ ...moduleForm, description: e.target.value })}
                  className="input-field text-area"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Order Sequence</label>
                <input
                  type="number"
                  required
                  value={moduleForm.order}
                  onChange={e => setModuleForm({ ...moduleForm, order: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <Save size={16} />
                <span>Save Module</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
         3. LESSONS
         ==================================================================== */}
      {activeTab === 'lessons' && (
        <div className="admin-content-grid grid-2">
          <div className="card admin-list-card">
            <h3>Syllabus Workspace & Reordering</h3>
            <div className="scope-selection-box card">
              <div className="form-group">
                <label className="form-label">Select Course</label>
                <select
                  value={lessonFilterCourseId}
                  onChange={e => {
                    setLessonFilterCourseId(e.target.value);
                    const matchingChaps = modules.filter(c => c.courseId === e.target.value);
                    setLessonFilterModuleId(matchingChaps[0]?.id || '');
                  }}
                  className="input-field"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Select Module</label>
                <select
                  value={lessonFilterModuleId}
                  onChange={e => setLessonFilterModuleId(e.target.value)}
                  className="input-field"
                >
                  <option value="">-- Select Module --</option>
                  {activeModuleOptions.map(ch => (
                    <option key={ch.id} value={ch.id}>Module {ch.order}. {ch.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="admin-items-stack">
              {activeLessonsList.length === 0 ? (
                <div className="empty-syllabus-label">No lessons in this scope. Add one using the form on the right!</div>
              ) : (
                activeLessonsList.map((lesson, idx) => (
                  <div key={lesson.id} className="admin-item-row-block">
                    <div className="admin-item-info">
                      <h4>{lesson.order}. {lesson.title}</h4>
                      <span className="admin-meta-span">Duration: {lesson.duration}m</span>
                    </div>

                    <div className="admin-row-actions">
                      <div className="reordering-controls">
                        <button 
                          className="btn btn-outlined btn-mini"
                          onClick={() => handleShiftLesson(lesson.id, 'up', lesson.moduleId)}
                          disabled={idx === 0}
                          title="Move Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button 
                          className="btn btn-outlined btn-mini"
                          onClick={() => handleShiftLesson(lesson.id, 'down', lesson.moduleId)}
                          disabled={idx === activeLessonsList.length - 1}
                          title="Move Down"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>

                      <button className="btn btn-outlined btn-mini" onClick={() => handleEditLesson(lesson)}>
                        <Edit2 size={12} />
                      </button>
                      
                      <button className="btn btn-text btn-danger btn-mini" onClick={() => deleteLesson(lesson.id)}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card admin-form-card max-h-800">
            <h3>{editingLessonId ? 'Edit Lesson Workspace' : 'Add New Lesson'}</h3>
            <form onSubmit={handleLessonSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Select Module</label>
                <select
                  value={lessonForm.moduleId}
                  onChange={e => setLessonForm({ ...lessonForm, moduleId: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">-- Select Module --</option>
                  {modules.map(ch => {
                    const course = courses.find(c => c.id === ch.courseId);
                    return (
                      <option key={ch.id} value={ch.id}>
                        {course?.title.substring(0, 15)}.. &gt; Module {ch.order}. {ch.title}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Lesson Title</label>
                <input
                  type="text"
                  required
                  value={lessonForm.title}
                  onChange={e => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Est. Duration (minutes)</label>
                  <input
                    type="number"
                    required
                    value={lessonForm.duration}
                    onChange={e => setLessonForm({ ...lessonForm, duration: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Order Sequence</label>
                  <input
                    type="number"
                    required
                    value={lessonForm.order}
                    onChange={e => setLessonForm({ ...lessonForm, order: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Upload Video Lecture (Real Upload)</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                      });
                      setLessonForm({ ...lessonForm, videoUrl: base64 });
                    }
                  }}
                  className="input-field"
                />
                {lessonForm.videoUrl && (
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>✓ Video File Loaded successfully</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Upload Video Cover Page / Poster (Image)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                      });
                      setLessonForm({ ...lessonForm, videoThumbnail: base64 });
                    }
                  }}
                  className="input-field"
                />
                {lessonForm.videoThumbnail && (
                  <img src={lessonForm.videoThumbnail} style={{ width: '80px', height: 'auto', borderRadius: '4px', marginTop: '6px' }} alt="Poster Preview" />
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Upload Study Slides & Handbook (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const base64 = await new Promise<string>((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result as string);
                      });
                      setLessonForm({ ...lessonForm, pdfUrl: base64, pdfTitle: file.name });
                    }
                  }}
                  className="input-field"
                />
                {lessonForm.pdfUrl && (
                  <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>✓ PDF Study Handbook Loaded</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Written Explanation</label>
                <textarea
                  rows={4}
                  required
                  value={lessonForm.writtenExplanation}
                  onChange={e => setLessonForm({ ...lessonForm, writtenExplanation: e.target.value })}
                  className="input-field text-area"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                <Save size={16} />
                <span>Save Lesson</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
         4. USER TRACKING & CERTIFICATES MANAGEMENT
         ==================================================================== */}
      {activeTab === 'users' && (
        <div className="admin-content-grid grid-2">
          {/* Student Progress List */}
          <div className="card admin-list-card">
            <h3>Enrolled Students Registry ({users.length})</h3>
            <div className="admin-items-stack">
              {users.map(user => {
                const hasCertificate = certificates.some(c => c.userId === user.id && c.courseId === 'import-export-master');
                return (
                  <div key={user.id} className="card student-admin-row-item">
                    <div className="student-profile-info">
                      <div className="avatar">{user.name.substring(0, 2).toUpperCase()}</div>
                      <div className="student-details">
                        <h4>{user.name}</h4>
                        <span className="student-email-span">{user.email}</span>
                      </div>
                    </div>

                    {/* Progress tracking */}
                    <div className="student-progress-meter">
                      <div className="progress-labels">
                        <span>Course Study Progress</span>
                        <span className="bold">{user.progressPercentage}%</span>
                      </div>
                      <div className="progress-bar-container">
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${user.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="student-cert-action-row">
                      {hasCertificate ? (
                        <span className="badge badge-success cert-badge-status">
                          <Award size={14} />
                          <span>Certificate Issued</span>
                        </span>
                      ) : (
                        <button
                          className="btn btn-primary btn-mini"
                          onClick={() => {
                            issueCertificate(user.id, 'import-export-master');
                            alert(`Issued Certificate of Completion to ${user.name}!`);
                          }}
                        >
                          Issue Certificate
                        </button>
                      )}

                      <button 
                        className="btn btn-outlined btn-mini"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Vetting Form */}
          <div className="card admin-form-card">
            <h3>{editingUserId ? 'Edit User Credentials' : 'Enroll New User'}</h3>
            <form onSubmit={handleUserSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Rajesh Kumar"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                  className="input-field"
                  placeholder="e.g. rajesh@logistics.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role Privilege</label>
                <select
                  value={userForm.role}
                  onChange={e => setUserForm({ ...userForm, role: e.target.value as User['role'] })}
                  className="input-field"
                >
                  <option value="student">Student Account</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                <Save size={16} />
                <span>Save User Settings</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
