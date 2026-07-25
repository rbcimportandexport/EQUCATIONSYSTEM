import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { authApi } from '../utils/api';
import type { Module, Lesson, User } from '../utils/data';
import { 
  Edit2, Trash2, ArrowUp, ArrowDown, Save, 
  Layers, BookOpen, FileText, Users as UsersIcon, Award, ArrowLeft, Eye 
} from 'lucide-react';

interface ModuleImageData {
  image: string;
  accentColor: string;
}

const MODULE_IMAGES_AND_COLORS: { [key: number]: ModuleImageData } = {
  1: { image: '/assets/Basic Import Export Terms   image.png', accentColor: '#10b981' },
  2: { image: '/assets/Product Terms image.png', accentColor: '#3b82f6' },
  3: { image: '/assets/Weight & Measurement.png', accentColor: '#eab308' },
  4: { image: '/assets/Container Terms image.png', accentColor: '#f43f5e' },
  5: { image: '/assets/Shipping Terms image.png', accentColor: '#8b5cf6' },
  6: { image: '/assets/Incoterms image.png', accentColor: '#a855f7' },
  7: { image: '/assets/Port & Logistics image.png', accentColor: '#14b8a6' },
  8: { image: '/assets/Documentation image.png', accentColor: '#f97316' },
  9: { image: '/assets/Customs image.png', accentColor: '#06b6d4' },
  10: { image: '/assets/Payment Terms image.png', accentColor: '#ef4444' },
  11: { image: '/assets/Freight Charges image.png', accentColor: '#3b82f6' },
  12: { image: '/assets/Quality & Inspection image.png', accentColor: '#d97706' },
  13: { image: '/assets/Business Operations image.png', accentColor: '#6366f1' },
  14: { image: '/assets/Risk Management image.png', accentColor: '#84cc16' },
  15: { image: '/assets/RBC Import & Export Internal Process  image.png', accentColor: '#f43f5e' }
};

export const AdminPanel: React.FC = () => {
  const { 
    courses,
    modules, saveModule, deleteModule,
    lessons, saveLesson, deleteLesson, reorderLessons,
    users, saveUser, fetchAllUsers, certificates, issueCertificate,
    setActiveView, setSelectedModuleId, setSelectedLessonId, setSelectedModuleTab
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'modules' | 'lessons' | 'users'>('courses');
  const [selectedAdminModuleId, setSelectedAdminModuleId] = useState<string | null>(null);

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
    contentType: 'video',
    imageUrl: '',
    imageCaption: '',
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
        images: lessonForm.contentType === 'image' && lessonForm.imageUrl ? [{
          url: lessonForm.imageUrl,
          caption: lessonForm.imageCaption || `Visual diagram for ${lessonForm.title}`,
          highResUrl: lessonForm.imageUrl
        }] : [],
        video: lessonForm.contentType === 'video' ? { 
          videoUrl: lessonForm.videoUrl || '', 
          thumbnail: lessonForm.videoThumbnail || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80', 
          duration: Number(lessonForm.videoDuration) || Number(lessonForm.duration) * 60 || 120 
        } : { videoUrl: '', thumbnail: '', duration: 0 },
        pdf: lessonForm.contentType === 'pdf' ? { 
          pdfUrl: lessonForm.pdfUrl || '', 
          title: lessonForm.pdfTitle || 'Handbook', 
          totalPages: Number(lessonForm.pdfPages) || 1, 
          size: '1.2 MB', 
          mockPagesText: lessonForm.pdfMockText ? lessonForm.pdfMockText.split('\n') : ['Study guide text content reference slides.'] 
        } : { pdfUrl: '', title: '', totalPages: 1, size: '', mockPagesText: [] },
        downloadOption: { title: 'Download File', fileUrl: '', size: '50 KB', type: 'pdf' },
        relatedTopics: [],
        faqs: [],
        commonMistakes: [],
        practicalTips: [],
        objectives: lessonForm.contentType === 'text' ? lessonForm.objectives.split('\n').filter(l => l.trim()) : [],
        writtenExplanation: lessonForm.contentType === 'text' ? lessonForm.writtenExplanation : '',
        importantNotes: lessonForm.contentType === 'text' ? lessonForm.importantNotes.split('\n').filter(l => l.trim()) : [],
        keyPoints: lessonForm.contentType === 'text' ? lessonForm.keyPoints.split('\n').filter(l => l.trim()) : [],
        summary: lessonForm.contentType === 'text' ? lessonForm.summary : '',
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
    let contentType = 'video';
    if (lesson.content.video?.videoUrl) {
      contentType = 'video';
    } else if (lesson.content.images && lesson.content.images.length > 0) {
      contentType = 'image';
    } else if (lesson.content.writtenExplanation) {
      contentType = 'text';
    } else if (lesson.content.pdf?.pdfUrl) {
      contentType = 'pdf';
    }

    setEditingLessonId(lesson.id);
    setLessonForm({
      moduleId: lesson.moduleId,
      title: lesson.title,
      description: lesson.description || '',
      duration: lesson.duration || 10,
      order: lesson.order || 1,
      contentType,
      imageUrl: lesson.content.images?.[0]?.url || '',
      imageCaption: lesson.content.images?.[0]?.caption || '',
      objectives: lesson.content.objectives?.join('\n') || '',
      writtenExplanation: lesson.content.writtenExplanation || '',
      codeLanguage: lesson.content.codeBlock?.language || 'typescript',
      codeSnippet: lesson.content.codeBlock?.code || '',
      videoUrl: lesson.content.video?.videoUrl || '',
      videoThumbnail: lesson.content.video?.thumbnail || '',
      videoDuration: lesson.content.video?.duration || 0,
      pdfUrl: lesson.content.pdf?.pdfUrl || '',
      pdfTitle: lesson.content.pdf?.title || '',
      pdfPages: lesson.content.pdf?.totalPages || 1,
      pdfMockText: lesson.content.pdf?.mockPagesText?.join('\n') || '',
      importantNotes: lesson.content.importantNotes?.join('\n') || '',
      keyPoints: lesson.content.keyPoints?.join('\n') || '',
      summary: lesson.content.summary || ''
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
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingUserId || `usr-${Date.now()}`;
    const newUser: User = {
      id,
      progressPercentage: editingUserId ? (users.find(u => u.id === editingUserId)?.progressPercentage || 0) : 0,
      ...userForm
    };
    saveUser(newUser);

    try {
      if (!editingUserId) {
        await authApi.register({
          name: userForm.name.trim(),
          email: userForm.email.toLowerCase().trim(),
          password: 'rbcuser123',
          role: userForm.role,
          otp: '123456'
        });
      }
      await fetchAllUsers();
    } catch (err) {
      console.warn('Backend user sync:', err);
    }

    const savedName = userForm.name;
    setEditingUserId(null);
    setUserForm({ name: '', email: '', role: 'student' });
    alert(editingUserId ? 'User updated successfully!' : `User "${savedName}" enrolled & saved to MongoDB Atlas!`);
  };

  // Auto-sync users from MongoDB Atlas on component mount & tab switch
  React.useEffect(() => {
    fetchAllUsers();
  }, [activeTab]);

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedAdminModuleId === null ? (
            <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                Course Modules Grid (Select a module to view its topics)
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {modules.map(mod => {
                  const imgData = MODULE_IMAGES_AND_COLORS[mod.order] || { image: '/assets/logo_emblem.png', accentColor: '#2563eb' };
                  const modLessons = lessons.filter(l => l.moduleId === mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => setSelectedAdminModuleId(mod.id)}
                      style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        border: `1.5px solid #e2e8f0`,
                        borderTop: `5px solid ${imgData.accentColor}`,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                      }}
                    >
                      <div style={{ position: 'relative', width: '100%', height: '140px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #e2e8f0' }}>
                        <img
                          src={imgData.image}
                          alt={mod.title}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: 800,
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(4px)'
                        }}>
                          {mod.order}
                        </div>
                      </div>
                      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>{mod.title}</h4>
                          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{mod.description}</p>
                        </div>
                        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#2563eb' }}>
                          <span>{modLessons.length} Topics/Lessons</span>
                          <span>Manage Topics →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Detail view of lessons inside selected module
            (() => {
              const selectedModObj = modules.find(m => m.id === selectedAdminModuleId);
              if (!selectedModObj) return null;
              const filteredLessons = lessons.filter(l => l.moduleId === selectedAdminModuleId).sort((a,b) => a.order - b.order);

              return (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
                  <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedAdminModuleId(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          border: '1.5px solid #cbd5e1',
                          background: '#ffffff',
                          cursor: 'pointer',
                          color: '#475569'
                        }}
                      >
                        <ArrowLeft size={16} />
                      </button>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, padding: '3px 8px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb' }}>
                            MODULE {selectedModObj.order}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                          {selectedModObj.title}
                        </h3>
                      </div>
                    </div>

                    {/* Topics/Lessons Stack */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#475569', margin: '10px 0 4px 0' }}>
                        Lessons in this Module ({filteredLessons.length})
                      </h4>
                      {filteredLessons.length === 0 ? (
                        <div style={{ padding: '32px', textAlign: 'center', border: '1.5px dashed #cbd5e1', borderRadius: '12px', color: '#94a3b8', fontSize: '14px' }}>
                          No topics or lessons have been created for this module yet.
                        </div>
                      ) : (
                        filteredLessons.map((les, idx) => (
                          <div
                            key={les.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '14px 18px',
                              borderRadius: '10px',
                              border: '1px solid #e2e8f0',
                              background: '#f8fafc'
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                                Topic #{idx + 1}
                              </div>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                                {les.title}
                              </div>
                              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                                {les.duration} mins • Order: {les.order}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                type="button"
                                className="btn btn-outlined btn-mini"
                                onClick={() => {
                                  setSelectedModuleId(les.moduleId);
                                  setSelectedLessonId(les.id);
                                  if (setSelectedModuleTab) {
                                    setSelectedModuleTab('read');
                                  }
                                  setActiveView('Chapters');
                                }}
                                style={{ padding: '6px 10px', borderRadius: '6px', color: '#2563eb', borderColor: '#bfdbfe', background: '#eff6ff', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                                title="Open / Preview Topic"
                              >
                                <Eye size={12} />
                                <span style={{ fontSize: '11px', fontWeight: 700 }}>Open</span>
                              </button>
                              <button
                                type="button"
                                className="btn btn-outlined btn-mini"
                                onClick={() => {
                                  setActiveTab('lessons');
                                  handleEditLesson(les);
                                }}
                                style={{ padding: '6px 10px', borderRadius: '6px' }}
                              >
                                <Edit2 size={12} />
                              </button>
                              <button
                                type="button"
                                className="btn btn-text btn-danger btn-mini"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${les.title}"?`)) {
                                    deleteLesson(les.id);
                                  }
                                }}
                                style={{ padding: '6px 10px', borderRadius: '6px' }}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Quick Add Form on the Right */}
                  <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                      Add Topic/Lesson to this Module
                    </h3>
                    <button
                      type="button"
                      className="btn btn-primary btn-full"
                      onClick={() => {
                        setActiveTab('lessons');
                        setEditingLessonId(null);
                        setLessonForm({
                          moduleId: selectedAdminModuleId,
                          title: '',
                          description: '',
                          duration: 10,
                          order: filteredLessons.length + 1,
                          contentType: 'video',
                          imageUrl: '',
                          imageCaption: '',
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
                      }}
                      style={{
                        padding: '12px',
                        background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      + Create New Lesson/Topic
                    </button>
                  </div>
                </div>
              );
            })()
          )}
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

                      <button
                        className="btn btn-outlined btn-mini"
                        onClick={() => {
                          setSelectedModuleId(lesson.moduleId);
                          setSelectedLessonId(lesson.id);
                          if (setSelectedModuleTab) {
                            setSelectedModuleTab('read');
                          }
                          setActiveView('Chapters');
                        }}
                        style={{ color: '#2563eb', borderColor: '#bfdbfe', background: '#eff6ff', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        title="Open / Preview Topic"
                      >
                        <Eye size={12} />
                        <span style={{ fontSize: '11px', fontWeight: 700 }}>Open</span>
                      </button>
                      
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

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, color: '#102A56' }}>Select Topic Format / Type</label>
                <select
                  value={lessonForm.contentType}
                  onChange={e => setLessonForm({ ...lessonForm, contentType: e.target.value })}
                  className="input-field"
                  style={{ border: '1.5px solid #102A56', background: '#f8fafc', fontWeight: 600 }}
                >
                  <option value="video">📽️ Video Lecture</option>
                  <option value="image">🖼️ Visual Diagram / Image</option>
                  <option value="text">📖 Written Explanation / Text</option>
                  <option value="pdf">📄 PDF Handbook / Slides</option>
                </select>
              </div>

              <div className="grid-2" style={{ marginBottom: '16px' }}>
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

              {/* 📽️ VIDEO TYPE INPUTS */}
              {lessonForm.contentType === 'video' && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Upload Video Lecture (Real Upload)</label>
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
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, display: 'block', marginTop: '4px' }}>✓ Video File Loaded successfully</span>
                    )}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Upload Video Cover Page / Poster (Image)</label>
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
                </div>
              )}

              {/* 🖼️ IMAGE DIAGRAM TYPE INPUTS */}
              {lessonForm.contentType === 'image' && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Upload Diagram / Illustration Image</label>
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
                          setLessonForm({ ...lessonForm, imageUrl: base64 });
                        }
                      }}
                      className="input-field"
                      required={!lessonForm.imageUrl}
                    />
                    {lessonForm.imageUrl && (
                      <img src={lessonForm.imageUrl} style={{ width: '120px', height: 'auto', borderRadius: '4px', marginTop: '6px', border: '1px solid #cbd5e1' }} alt="Diagram Preview" />
                    )}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Diagram Description / Caption</label>
                    <input
                      type="text"
                      placeholder="e.g. Operational flowchart of custom clearance..."
                      value={lessonForm.imageCaption}
                      onChange={e => setLessonForm({ ...lessonForm, imageCaption: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              {/* 📄 PDF TYPE INPUTS */}
              {lessonForm.contentType === 'pdf' && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Upload Study Slides & Handbook (PDF)</label>
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
                      required={!lessonForm.pdfUrl}
                    />
                    {lessonForm.pdfUrl && (
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, display: 'block', marginTop: '4px' }}>✓ PDF Study Handbook Loaded: {lessonForm.pdfTitle}</span>
                    )}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>PDF Total Page Count</label>
                    <input
                      type="number"
                      value={lessonForm.pdfPages}
                      onChange={e => setLessonForm({ ...lessonForm, pdfPages: Number(e.target.value) })}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              {/* 📖 WRITTEN TEXT TYPE INPUTS */}
              {lessonForm.contentType === 'text' && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Written Explanation</label>
                    <textarea
                      rows={6}
                      required
                      placeholder="Write your explanation text here..."
                      value={lessonForm.writtenExplanation}
                      onChange={e => setLessonForm({ ...lessonForm, writtenExplanation: e.target.value })}
                      className="input-field text-area"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Objectives (One per line)</label>
                    <textarea
                      rows={2}
                      placeholder="Objective 1&#10;Objective 2"
                      value={lessonForm.objectives}
                      onChange={e => setLessonForm({ ...lessonForm, objectives: e.target.value })}
                      className="input-field text-area"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Important Notes (One per line)</label>
                    <textarea
                      rows={2}
                      placeholder="Note 1&#10;Note 2"
                      value={lessonForm.importantNotes}
                      onChange={e => setLessonForm({ ...lessonForm, importantNotes: e.target.value })}
                      className="input-field text-area"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Key Points (One per line)</label>
                    <textarea
                      rows={2}
                      placeholder="Point 1&#10;Point 2"
                      value={lessonForm.keyPoints}
                      onChange={e => setLessonForm({ ...lessonForm, keyPoints: e.target.value })}
                      className="input-field text-area"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontWeight: 700 }}>Summary</label>
                    <textarea
                      rows={2}
                      placeholder="Quick summary summary..."
                      value={lessonForm.summary}
                      onChange={e => setLessonForm({ ...lessonForm, summary: e.target.value })}
                      className="input-field text-area"
                    />
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '10px' }}>
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
      {/* ====================================================================
         4. USER TRACKING & CERTIFICATES MANAGEMENT
         ==================================================================== */}
      {activeTab === 'users' && (
        <div className="admin-content-grid grid-2">
          {/* Student Progress List */}
          <div className="card admin-list-card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UsersIcon size={20} color="#2563eb" />
                <span>Enrolled Students Registry ({users.length})</span>
              </h3>
            </div>

            <div className="admin-items-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {users.map(user => {
                const hasCertificate = certificates.some(c => c.userId === user.id && c.courseId === 'import-export-master');
                const isAdmin = user.role === 'admin';
                return (
                  <div 
                    key={user.id} 
                    className="student-admin-row-item"
                    style={{ 
                      background: '#ffffff', 
                      border: '1.5px solid #e2e8f0', 
                      borderRadius: '12px', 
                      padding: '20px', 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div className="student-profile-info" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                      <div 
                        className="avatar" 
                        style={{ 
                          width: '46px', 
                          height: '46px', 
                          borderRadius: '50%', 
                          background: isAdmin ? 'linear-gradient(135deg, #0f172a, #334155)' : 'linear-gradient(135deg, #2563eb, #0284c7)', 
                          color: '#ffffff', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 800, 
                          fontSize: '16px',
                          letterSpacing: '0.5px',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
                          flexShrink: 0 
                        }}
                      >
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="student-details" style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{user.name}</h4>
                          <span 
                            style={{ 
                              fontSize: '11px', 
                              fontWeight: 700, 
                              padding: '2px 8px', 
                              borderRadius: '12px', 
                              background: isAdmin ? '#f1f5f9' : '#eff6ff', 
                              color: isAdmin ? '#334155' : '#2563eb',
                              border: `1px solid ${isAdmin ? '#cbd5e1' : '#bfdbfe'}`,
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}
                          >
                            {user.role}
                          </span>
                        </div>
                        <span className="student-email-span" style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>{user.email}</span>
                      </div>
                    </div>

                    {/* Progress tracking */}
                    <div className="student-progress-meter" style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 14px', border: '1px solid #f1f5f9', marginBottom: '16px' }}>
                      <div className="progress-labels" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                        <span>Course Study Progress</span>
                        <span className="bold" style={{ fontWeight: 800, color: '#2563eb' }}>{user.progressPercentage}%</span>
                      </div>
                      <div className="progress-bar-container" style={{ height: '8px', width: '100%', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${user.progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #0284c7)', borderRadius: '999px', transition: 'width 0.4s ease' }}
                        ></div>
                      </div>
                    </div>

                    <div className="student-cert-action-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '12px', borderTop: '1px dashed #e2e8f0' }}>
                      {hasCertificate ? (
                        <span className="badge badge-success cert-badge-status" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '12px', fontWeight: 700 }}>
                          <Award size={14} />
                          <span>Certificate Issued</span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-mini"
                          onClick={() => {
                            issueCertificate(user.id, 'import-export-master');
                            alert(`Issued Certificate of Completion to ${user.name}!`);
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                            color: '#ffffff',
                            fontWeight: 700,
                            fontSize: '13px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(234, 88, 12, 0.25)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Award size={14} />
                          <span>Issue Certificate</span>
                        </button>
                      )}

                      <button 
                        type="button"
                        className="btn btn-outlined btn-mini"
                        onClick={() => handleEditUser(user)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '8px',
                          background: '#ffffff',
                          color: '#475569',
                          border: '1.5px solid #cbd5e1',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Edit2 size={13} />
                        <span>Edit User</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Vetting Form */}
          <div className="card admin-form-card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
              {editingUserId ? 'Edit User Credentials' : 'Enroll New User'}
            </h3>
            <form onSubmit={handleUserSubmit} className="admin-form" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Rajesh Kumar"
                  style={{ padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                  className="input-field"
                  placeholder="e.g. rajesh@logistics.com"
                  style={{ padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label className="form-label" style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Role Privilege</label>
                <select
                  value={userForm.role}
                  onChange={e => setUserForm({ ...userForm, role: e.target.value as User['role'] })}
                  className="input-field"
                  style={{ padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '14px', outline: 'none', background: '#ffffff', cursor: 'pointer' }}
                >
                  <option value="student">Student Account</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-full"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '13px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #ea580c, #c2410c)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)',
                  marginTop: '8px'
                }}
              >
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
