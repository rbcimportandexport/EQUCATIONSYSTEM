import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { authApi, usersApi } from '../utils/api';
import type { Lesson, User } from '../utils/data';
import { 
  Edit2, Trash2, Save, Video, Settings,
  Layers, BookOpen, FileText, Users as UsersIcon, Award, ArrowLeft, Eye,
  Search, Download, RefreshCw, Database
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

const convertGoogleDriveLink = (url: string): string => {
  if (!url) return '';
  
  let cleanUrl = url.trim();
  
  // Extract src attribute if it's an iframe tag (e.g. from YouTube or Google Drive share embeds)
  if (cleanUrl.startsWith('<') && cleanUrl.includes('src=')) {
    const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      cleanUrl = srcMatch[1];
    }
  }

  let fileId = '';
  const pathMatch = cleanUrl.match(/\/file\/d\/([^/&?#\s]+)/);
  if (pathMatch && pathMatch[1]) {
    fileId = pathMatch[1];
  } else {
    const queryMatch = cleanUrl.match(/[?&]id=([^/&?#\s]+)/);
    if (queryMatch && queryMatch[1]) {
      fileId = queryMatch[1];
    }
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return cleanUrl;
};

const renderPreviewVideo = (videoUrl: string, thumbnail?: string) => {
  if (!videoUrl) return null;
  let cleanUrl = videoUrl.trim();
  if (cleanUrl.startsWith('<') && cleanUrl.includes('src=')) {
    const srcMatch = cleanUrl.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      cleanUrl = srcMatch[1];
    }
  }
  const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
  const ytMatch = cleanUrl.match(youtubeRegex);
  if (ytMatch && ytMatch[1]) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytMatch[1]}`}
        title="Video preview"
        frameBorder="0"
        allowFullScreen
        style={{ width: '100%', height: '240px', display: 'block' }}
      />
    );
  }
  const driveRegex = /(?:https?:\/\/)?(?:docs|drive)\.google\.com\/(?:file\/d\/|open\?id=)([^/&?#\s]+)/;
  const driveMatch = cleanUrl.match(driveRegex);
  if (driveMatch && driveMatch[1]) {
    return (
      <iframe
        src={`https://drive.google.com/file/d/${driveMatch[1]}/preview`}
        title="Video preview"
        frameBorder="0"
        allowFullScreen
        style={{ width: '100%', height: '240px', display: 'block' }}
      />
    );
  }
  return (
    <video 
      src={cleanUrl} 
      poster={thumbnail}
      controls 
      style={{ width: '100%', maxHeight: '380px', objectFit: 'contain', background: '#000000', display: 'block' }}
    />
  );
};

export const AdminPanel = () => {
  const { 
    modules,
    lessons, saveLesson, deleteLesson,
    users, saveUser, fetchAllUsers, certificates, issueCertificate,
    setActiveView, setSelectedModuleId, setSelectedLessonId, setSelectedModuleTab,
    showAlert,
    showConfirm
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'modules' | 'lessons' | 'users' | 'settings'>('courses');
  const [selectedAdminModuleId, setSelectedAdminModuleId] = useState<string | null>(null);

  // Access Code State
  const [adminAccessCode, setAdminAccessCode] = useState('');
  const [isMasterActive, setIsMasterActive] = useState(false);
  const [accessCodeLoading, setAccessCodeLoading] = useState(false);

  // Fetch access code when settings tab is clicked
  React.useEffect(() => {
    if (activeTab === 'settings') {
      const loadAccessCode = async () => {
        setAccessCodeLoading(true);
        try {
          const res = await authApi.getAccessCode();
          if (res.success && res.code) {
            setAdminAccessCode(res.code);
              setIsMasterActive(res.isActive || false);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setAccessCodeLoading(false);
        }
      };
      loadAccessCode();
    }
  }, [activeTab]);

  const handleSaveAccessCode = async () => {
    if (!adminAccessCode || adminAccessCode.trim().length < 4) {
      showAlert('Invalid Code', 'Access code must be at least 4 characters long.', 'warning');
      return;
    }
    setAccessCodeLoading(true);
    try {
      const res = await authApi.updateAccessCode(adminAccessCode.trim(), isMasterActive);
      if (res.success && res.code) {
        setAdminAccessCode(res.code);
        showAlert('Updated Successfully', 'Access code successfully updated!', 'success');
      } else {
        showAlert('Error', res.message || 'Failed to update access code.', 'error');
      }
    } catch (err) {
      console.error(err);
      showAlert('Error', 'Failed to save settings.', 'error');
    } finally {
      setAccessCodeLoading(false);
    }
  };

  // Diagrams states
  const [selectedDiagramModuleId, setSelectedDiagramModuleId] = useState<string | null>(null);
  const [editingDiagramLessonId, setEditingDiagramLessonId] = useState<string | null>(null);
  const [diagramImageUrl, setDiagramImageUrl] = useState<string>('');
  const [diagramImageCaption, setDiagramImageCaption] = useState<string>('');

  // Video states
  const [selectedVideoModuleId, setSelectedVideoModuleId] = useState<string | null>(null);
  const [moduleVideoUrl, setModuleVideoUrl] = useState<string>('');
  const [moduleVideoCover, setModuleVideoCover] = useState<string>('');
  const [moduleVideoDesc, setModuleVideoDesc] = useState<string>('');
  const [moduleVideoLoading, setModuleVideoLoading] = useState<boolean>(false);
  const [moduleVideoDuration, setModuleVideoDuration] = useState<string>('3:09');

  // Load existing video settings when selectedVideoModuleId changes
  React.useEffect(() => {
    if (selectedVideoModuleId) {
      const moduleLessons = lessons.filter(l => l.moduleId === selectedVideoModuleId);
      const firstVideoLesson = moduleLessons.find(l => l.content?.video?.videoUrl);
      if (firstVideoLesson?.content?.video?.videoUrl) {
        setModuleVideoUrl(firstVideoLesson.content.video.videoUrl);
        setModuleVideoCover(firstVideoLesson.content.video.thumbnail || '');
        setModuleVideoDesc(firstVideoLesson.description || '');
        
        // Format the duration from seconds back to MM:SS string
        const secs = firstVideoLesson.content.video.duration || 120;
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        setModuleVideoDuration(`${m}:${s < 10 ? '0' : ''}${s}`);
      } else {
        setModuleVideoUrl('');
        setModuleVideoCover('');
        setModuleVideoDesc('');
        setModuleVideoDuration('3:09'); // default
      }
    }
  }, [selectedVideoModuleId, lessons]);



  // Form states - Lesson
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  
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
    summary: '',
    quizType: 'mcq' as 'mcq' | 'true-false' | 'fill-blank',
    quizQuestion: '',
    quizOptionA: '',
    quizOptionB: '',
    quizOptionC: '',
    quizOptionD: '',
    quizCorrectAnswer: '0',
    quizExplanation: ''
  });

  // Form states - User
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userForm, setUserForm] = useState<Omit<User, 'id' | 'progressPercentage'>>({
    name: '',
    email: '',
    role: 'student'
  });
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'admin'>('all');

  // Quiz Translation States
  const [quizLang, setQuizLang] = useState<'en' | 'hi' | 'gu' | 'mr'>('en');
  const [quizTranslations, setQuizTranslations] = useState<{
    [key in 'hi' | 'gu' | 'mr']: {
      question: string;
      options: string[];
      explanation: string;
    }
  }>({
    hi: { question: '', options: ['', '', '', ''], explanation: '' },
    gu: { question: '', options: ['', '', '', ''], explanation: '' },
    mr: { question: '', options: ['', '', '', ''], explanation: '' }
  });




  // ----------------------------------------------------
  // LESSON HANDLERS
  // ----------------------------------------------------
  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.moduleId) {
      showAlert('Required Selection', 'Please select a module for the lesson.', 'warning');
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
            id: `q-custom-${id}`,
            type: lessonForm.quizType,
            question: lessonForm.quizQuestion || `Concept check for: ${lessonForm.title}`,
            options: lessonForm.quizType === 'mcq' ? [
              lessonForm.quizOptionA || 'Option A',
              lessonForm.quizOptionB || 'Option B',
              lessonForm.quizOptionC || 'Option C',
              lessonForm.quizOptionD || 'Option D'
            ] : undefined,
            correctAnswers: [lessonForm.quizCorrectAnswer || '0'],
            explanation: lessonForm.quizExplanation || 'Concept matches standard global customs regulations.'
          }
        ]
      },
      translations: {
        hi: {
          quiz: [
            {
              id: `q-custom-${id}-hi`,
              type: lessonForm.quizType,
              question: quizTranslations.hi.question || lessonForm.quizQuestion,
              options: lessonForm.quizType === 'mcq' ? [
                quizTranslations.hi.options[0] || lessonForm.quizOptionA,
                quizTranslations.hi.options[1] || lessonForm.quizOptionB,
                quizTranslations.hi.options[2] || lessonForm.quizOptionC,
                quizTranslations.hi.options[3] || lessonForm.quizOptionD
              ] : undefined,
              correctAnswers: [lessonForm.quizCorrectAnswer],
              explanation: quizTranslations.hi.explanation || lessonForm.quizExplanation
            }
          ]
        },
        gu: {
          quiz: [
            {
              id: `q-custom-${id}-gu`,
              type: lessonForm.quizType,
              question: quizTranslations.gu.question || lessonForm.quizQuestion,
              options: lessonForm.quizType === 'mcq' ? [
                quizTranslations.gu.options[0] || lessonForm.quizOptionA,
                quizTranslations.gu.options[1] || lessonForm.quizOptionB,
                quizTranslations.gu.options[2] || lessonForm.quizOptionC,
                quizTranslations.gu.options[3] || lessonForm.quizOptionD
              ] : undefined,
              correctAnswers: [lessonForm.quizCorrectAnswer],
              explanation: quizTranslations.gu.explanation || lessonForm.quizExplanation
            }
          ]
        },
        mr: {
          quiz: [
            {
              id: `q-custom-${id}-mr`,
              type: lessonForm.quizType,
              question: quizTranslations.mr.question || lessonForm.quizQuestion,
              options: lessonForm.quizType === 'mcq' ? [
                quizTranslations.mr.options[0] || lessonForm.quizOptionA,
                quizTranslations.mr.options[1] || lessonForm.quizOptionB,
                quizTranslations.mr.options[2] || lessonForm.quizOptionC,
                quizTranslations.mr.options[3] || lessonForm.quizOptionD
              ] : undefined,
              correctAnswers: [lessonForm.quizCorrectAnswer],
              explanation: quizTranslations.mr.explanation || lessonForm.quizExplanation
            }
          ]
        }
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
    setQuizLang('en');
    setQuizTranslations({
      hi: { question: '', options: ['', '', '', ''], explanation: '' },
      gu: { question: '', options: ['', '', '', ''], explanation: '' },
      mr: { question: '', options: ['', '', '', ''], explanation: '' }
    });
    setLessonForm(prev => ({
      ...prev,
      title: '',
      description: '',
      writtenExplanation: '',
      codeSnippet: '',
      videoUrl: '',
      pdfUrl: '',
      order: prev.order + 1,
      quizType: 'mcq',
      quizQuestion: '',
      quizOptionA: '',
      quizOptionB: '',
      quizOptionC: '',
      quizOptionD: '',
      quizCorrectAnswer: '0',
      quizExplanation: ''
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

    const firstQuiz = lesson.content.quiz?.[0] || {
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      correctAnswers: ['0'],
      explanation: ''
    };

    const trans = lesson.translations || {
      hi: { quiz: [] },
      gu: { quiz: [] },
      mr: { quiz: [] }
    };

    setQuizLang('en');
    setQuizTranslations({
      hi: {
        question: trans.hi?.quiz?.[0]?.question || '',
        options: [
          trans.hi?.quiz?.[0]?.options?.[0] || '',
          trans.hi?.quiz?.[0]?.options?.[1] || '',
          trans.hi?.quiz?.[0]?.options?.[2] || '',
          trans.hi?.quiz?.[0]?.options?.[3] || ''
        ],
        explanation: trans.hi?.quiz?.[0]?.explanation || ''
      },
      gu: {
        question: trans.gu?.quiz?.[0]?.question || '',
        options: [
          trans.gu?.quiz?.[0]?.options?.[0] || '',
          trans.gu?.quiz?.[0]?.options?.[1] || '',
          trans.gu?.quiz?.[0]?.options?.[2] || '',
          trans.gu?.quiz?.[0]?.options?.[3] || ''
        ],
        explanation: trans.gu?.quiz?.[0]?.explanation || ''
      },
      mr: {
        question: trans.mr?.quiz?.[0]?.question || '',
        options: [
          trans.mr?.quiz?.[0]?.options?.[0] || '',
          trans.mr?.quiz?.[0]?.options?.[1] || '',
          trans.mr?.quiz?.[0]?.options?.[2] || '',
          trans.mr?.quiz?.[0]?.options?.[3] || ''
        ],
        explanation: trans.mr?.quiz?.[0]?.explanation || ''
      }
    });

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
      summary: lesson.content.summary || '',
      quizType: (firstQuiz.type === 'mcq' || firstQuiz.type === 'true-false' || firstQuiz.type === 'fill-blank') ? firstQuiz.type : 'mcq',
      quizQuestion: firstQuiz.question || '',
      quizOptionA: firstQuiz.options?.[0] || '',
      quizOptionB: firstQuiz.options?.[1] || '',
      quizOptionC: firstQuiz.options?.[2] || '',
      quizOptionD: firstQuiz.options?.[3] || '',
      quizCorrectAnswer: firstQuiz.correctAnswers?.[0] || '0',
      quizExplanation: firstQuiz.explanation || ''
    });
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
      } else {
        await usersApi.update(editingUserId, {
          name: userForm.name.trim(),
          email: userForm.email.toLowerCase().trim(),
          role: userForm.role
        });
      }
      await fetchAllUsers();
    } catch (err) {
      console.warn('Backend user sync:', err);
    }

    const savedName = userForm.name;
    setEditingUserId(null);
    setUserForm({ name: '', email: '', role: 'student' });
    showAlert('User Status', editingUserId ? 'User updated successfully!' : `User "${savedName}" enrolled & saved to MongoDB Atlas!`, 'success');
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
            <span>Written Lessons (Text)</span>
          </button>
          <button 
            className={`admin-tab ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => setActiveTab('modules')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'modules' ? '#102A56' : '#ffffff', color: activeTab === 'modules' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <Layers size={16} />
            <span>Visual Diagrams (Photos)</span>
          </button>
          <button 
            className={`admin-tab ${activeTab === 'lessons' ? 'active' : ''}`}
            onClick={() => setActiveTab('lessons')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'lessons' ? '#102A56' : '#ffffff', color: activeTab === 'lessons' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <FileText size={16} />
            <span>Module Videos</span>
          </button>
          <button 
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'users' ? '#102A56' : '#ffffff', color: activeTab === 'users' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <UsersIcon size={16} />
            <span>Enrolled Students</span>
          </button>
          <button 
            className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer', background: activeTab === 'settings' ? '#102A56' : '#ffffff', color: activeTab === 'settings' ? '#ffffff' : '#334155', fontWeight: 600, fontSize: '13.5px' }}
          >
            <Settings size={16} />
            <span>Access Code Settings</span>
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
                  const imgData = MODULE_IMAGES_AND_COLORS[mod.order] || { image: '/logo_emblem.png', accentColor: '#2563eb' };
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
                <div className="admin-split-layout">
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
                                  showConfirm(
                                    'Confirm Deletion',
                                    `Are you sure you want to delete "${les.title}"?`,
                                    () => deleteLesson(les.id)
                                  );
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

                  {/* Text Editor Form on the Right */}
                  <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                      {editingLessonId ? 'Edit Lesson Text' : 'Create New Lesson (Text)'}
                    </h3>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        lessonForm.contentType = 'text'; // Lock format to text
                        handleLessonSubmit(e);
                      }} 
                      className="admin-form"
                    >
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

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700 }}>Written Explanation</label>
                        <textarea
                          rows={6}
                          required
                          placeholder="Write explanation text here..."
                          value={lessonForm.writtenExplanation}
                          onChange={e => setLessonForm({ ...lessonForm, writtenExplanation: e.target.value })}
                          className="input-field text-area"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700 }}>Objectives (One per line)</label>
                        <textarea
                          rows={2}
                          placeholder="Objective 1&#10;Objective 2"
                          value={lessonForm.objectives}
                          onChange={e => setLessonForm({ ...lessonForm, objectives: e.target.value })}
                          className="input-field text-area"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700 }}>Important Notes (One per line)</label>
                        <textarea
                          rows={2}
                          placeholder="Note 1&#10;Note 2"
                          value={lessonForm.importantNotes}
                          onChange={e => setLessonForm({ ...lessonForm, importantNotes: e.target.value })}
                          className="input-field text-area"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700 }}>Key Points (One per line)</label>
                        <textarea
                          rows={2}
                          placeholder="Point 1&#10;Point 2"
                          value={lessonForm.keyPoints}
                          onChange={e => setLessonForm({ ...lessonForm, keyPoints: e.target.value })}
                          className="input-field text-area"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" style={{ fontWeight: 700 }}>Summary</label>
                        <textarea
                          rows={2}
                          placeholder="Quick summary..."
                          value={lessonForm.summary}
                          onChange={e => setLessonForm({ ...lessonForm, summary: e.target.value })}
                          className="input-field text-area"
                        />
                      </div>

                      {/* Custom Quiz Question Customization Section */}
                      <div style={{
                        marginTop: '24px',
                        padding: '16px',
                        borderRadius: '12px',
                        background: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        marginBottom: '20px'
                      }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0', borderBottom: '1.5px solid #cbd5e1', paddingBottom: '6px' }}>
                          Lesson Quiz Question Customization
                        </h4>

                        {/* Language tabs */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                          <button
                            type="button"
                            onClick={() => setQuizLang('en')}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1.5px solid #cbd5e1',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              background: quizLang === 'en' ? '#102A56' : '#ffffff',
                              color: quizLang === 'en' ? '#ffffff' : '#334155'
                            }}
                          >
                            🇬🇧 English
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuizLang('hi')}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1.5px solid #cbd5e1',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              background: quizLang === 'hi' ? '#102A56' : '#ffffff',
                              color: quizLang === 'hi' ? '#ffffff' : '#334155'
                            }}
                          >
                            🇮🇳 Hindi (हिंदी)
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuizLang('gu')}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1.5px solid #cbd5e1',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              background: quizLang === 'gu' ? '#102A56' : '#ffffff',
                              color: quizLang === 'gu' ? '#ffffff' : '#334155'
                            }}
                          >
                            🇮🇳 Gujarati (ગુજરાતી)
                          </button>
                          <button
                            type="button"
                            onClick={() => setQuizLang('mr')}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1.5px solid #cbd5e1',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              background: quizLang === 'mr' ? '#102A56' : '#ffffff',
                              color: quizLang === 'mr' ? '#ffffff' : '#334155'
                            }}
                          >
                            🇮🇳 Marathi (मराठी)
                          </button>
                        </div>

                        <div className="form-group" style={{ marginBottom: '12px' }}>
                          <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Question Type (Shared)</label>
                          <select
                            value={lessonForm.quizType}
                            onChange={e => setLessonForm({ ...lessonForm, quizType: e.target.value as any })}
                            className="input-field"
                            style={{ width: '100%', height: '40px', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                          >
                            <option value="mcq">Multiple Choice (MCQ)</option>
                            <option value="true-false">True / False</option>
                            <option value="fill-blank">Fill in the Blank</option>
                          </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: '12px' }}>
                          <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>
                            Question Text ({quizLang.toUpperCase()})
                          </label>
                          <input
                            type="text"
                            required
                            placeholder={quizLang === 'en' ? "e.g. Which of the following is correct?" : `Write translation in ${quizLang === 'hi' ? 'Hindi' : quizLang === 'gu' ? 'Gujarati' : 'Marathi'}...`}
                            value={quizLang === 'en' ? lessonForm.quizQuestion : quizTranslations[quizLang].question}
                            onChange={e => {
                              if (quizLang === 'en') {
                                setLessonForm({ ...lessonForm, quizQuestion: e.target.value });
                              } else {
                                setQuizTranslations({
                                  ...quizTranslations,
                                  [quizLang]: { ...quizTranslations[quizLang], question: e.target.value }
                                });
                              }
                            }}
                            className="input-field"
                          />
                        </div>

                        {lessonForm.quizType === 'mcq' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                            <div className="form-group">
                              <label className="form-label">Option A ({quizLang.toUpperCase()})</label>
                              <input
                                type="text"
                                required
                                value={quizLang === 'en' ? lessonForm.quizOptionA : quizTranslations[quizLang].options[0]}
                                onChange={e => {
                                  if (quizLang === 'en') {
                                    setLessonForm({ ...lessonForm, quizOptionA: e.target.value });
                                  } else {
                                    const newOpts = [...quizTranslations[quizLang].options];
                                    newOpts[0] = e.target.value;
                                    setQuizTranslations({
                                      ...quizTranslations,
                                      [quizLang]: { ...quizTranslations[quizLang], options: newOpts }
                                    });
                                  }
                                }}
                                className="input-field"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Option B ({quizLang.toUpperCase()})</label>
                              <input
                                type="text"
                                required
                                value={quizLang === 'en' ? lessonForm.quizOptionB : quizTranslations[quizLang].options[1]}
                                onChange={e => {
                                  if (quizLang === 'en') {
                                    setLessonForm({ ...lessonForm, quizOptionB: e.target.value });
                                  } else {
                                    const newOpts = [...quizTranslations[quizLang].options];
                                    newOpts[1] = e.target.value;
                                    setQuizTranslations({
                                      ...quizTranslations,
                                      [quizLang]: { ...quizTranslations[quizLang], options: newOpts }
                                    });
                                  }
                                }}
                                className="input-field"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Option C ({quizLang.toUpperCase()})</label>
                              <input
                                type="text"
                                required
                                value={quizLang === 'en' ? lessonForm.quizOptionC : quizTranslations[quizLang].options[2]}
                                onChange={e => {
                                  if (quizLang === 'en') {
                                    setLessonForm({ ...lessonForm, quizOptionC: e.target.value });
                                  } else {
                                    const newOpts = [...quizTranslations[quizLang].options];
                                    newOpts[2] = e.target.value;
                                    setQuizTranslations({
                                      ...quizTranslations,
                                      [quizLang]: { ...quizTranslations[quizLang], options: newOpts }
                                    });
                                  }
                                }}
                                className="input-field"
                              />
                            </div>
                            <div className="form-group">
                              <label className="form-label">Option D ({quizLang.toUpperCase()})</label>
                              <input
                                type="text"
                                required
                                value={quizLang === 'en' ? lessonForm.quizOptionD : quizTranslations[quizLang].options[3]}
                                onChange={e => {
                                  if (quizLang === 'en') {
                                    setLessonForm({ ...lessonForm, quizOptionD: e.target.value });
                                  } else {
                                    const newOpts = [...quizTranslations[quizLang].options];
                                    newOpts[3] = e.target.value;
                                    setQuizTranslations({
                                      ...quizTranslations,
                                      [quizLang]: { ...quizTranslations[quizLang], options: newOpts }
                                    });
                                  }
                                }}
                                className="input-field"
                              />
                            </div>
                          </div>
                        )}

                        <div className="form-group" style={{ marginBottom: '12px' }}>
                          <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>Correct Answer (Shared)</label>
                          {lessonForm.quizType === 'mcq' ? (
                            <select
                              value={lessonForm.quizCorrectAnswer}
                              onChange={e => setLessonForm({ ...lessonForm, quizCorrectAnswer: e.target.value })}
                              className="input-field"
                              style={{ width: '100%', height: '40px', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            >
                              <option value="0">Option A</option>
                              <option value="1">Option B</option>
                              <option value="2">Option C</option>
                              <option value="3">Option D</option>
                            </select>
                          ) : lessonForm.quizType === 'true-false' ? (
                            <select
                              value={lessonForm.quizCorrectAnswer}
                              onChange={e => setLessonForm({ ...lessonForm, quizCorrectAnswer: e.target.value })}
                              className="input-field"
                              style={{ width: '100%', height: '40px', padding: '8px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                            >
                              <option value="true">True (सत्य)</option>
                              <option value="false">False (असत्य)</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              required
                              placeholder="e.g. Export"
                              value={lessonForm.quizCorrectAnswer}
                              onChange={e => setLessonForm({ ...lessonForm, quizCorrectAnswer: e.target.value })}
                              className="input-field"
                            />
                          )}
                        </div>

                        <div className="form-group" style={{ marginBottom: '12px' }}>
                          <label className="form-label" style={{ fontWeight: 700, fontSize: '12px' }}>
                            Answer Explanation ({quizLang.toUpperCase()})
                          </label>
                          <textarea
                            rows={2}
                            required
                            placeholder={quizLang === 'en' ? "Explanation of the correct answer..." : `Write explanation translation in ${quizLang === 'hi' ? 'Hindi' : quizLang === 'gu' ? 'Gujarati' : 'Marathi'}...`}
                            value={quizLang === 'en' ? lessonForm.quizExplanation : quizTranslations[quizLang].explanation}
                            onChange={e => {
                              if (quizLang === 'en') {
                                setLessonForm({ ...lessonForm, quizExplanation: e.target.value });
                              } else {
                                setQuizTranslations({
                                  ...quizTranslations,
                                  [quizLang]: { ...quizTranslations[quizLang], explanation: e.target.value }
                                });
                              }
                            }}
                            className="input-field text-area"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                          <Save size={16} />
                          <span>{editingLessonId ? 'Update Lesson' : 'Save Lesson'}</span>
                        </button>
                        {editingLessonId && (
                          <button
                            type="button"
                            className="btn btn-outlined"
                            onClick={() => {
                              setEditingLessonId(null);
                              setLessonForm({
                                moduleId: selectedAdminModuleId || '',
                                title: '',
                                description: '',
                                duration: 10,
                                order: filteredLessons.length + 1,
                                contentType: 'text',
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
                                summary: '',
                                quizType: 'mcq',
                                quizQuestion: '',
                                quizOptionA: '',
                                quizOptionB: '',
                                quizOptionC: '',
                                quizOptionD: '',
                                quizCorrectAnswer: '0',
                                quizExplanation: ''
                              });
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              );
            })()
          )
          }
        </div>
      )}

      {/* ====================================================================
         2. VISUAL DIAGRAMS (PHOTOS)
         ==================================================================== */}
      {activeTab === 'modules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedDiagramModuleId === null ? (
            <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                Course Modules Grid (Select a module to view/edit chapter photos)
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {modules.map(mod => {
                  const imgData = MODULE_IMAGES_AND_COLORS[mod.order] || { image: '/logo_emblem.png', accentColor: '#2563eb' };
                  return (
                    <div
                      key={mod.id}
                      onClick={() => {
                        setSelectedDiagramModuleId(mod.id);
                        setEditingDiagramLessonId(null);
                      }}
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
                          <span>Manage Diagrams →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Module diagrams viewer & editor
            (() => {
              const selectedModObj = modules.find(m => m.id === selectedDiagramModuleId);
              if (!selectedModObj) return null;
              const filteredLessons = lessons.filter(l => l.moduleId === selectedDiagramModuleId).sort((a,b) => a.order - b.order);

              return (
                <div className="admin-split-layout">
                  <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDiagramModuleId(null);
                          setEditingDiagramLessonId(null);
                        }}
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
                            MODULE {selectedModObj.order} DIAGRAMS
                          </span>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                          {selectedModObj.title}
                        </h3>
                      </div>
                    </div>

                    {/* Diagrams list */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                      {filteredLessons.map((les) => {
                        const hasImg = les.content?.images && les.content.images.length > 0;
                        const displayImg = hasImg ? les.content.images[0].url : '/logo_emblem.png';
                        const displayCaption = hasImg ? les.content.images[0].caption : 'No illustration diagram uploaded yet.';

                        return (
                          <div 
                            key={les.id}
                            style={{ 
                              border: '1.5px solid #e2e8f0', 
                              borderRadius: '12px', 
                              overflow: 'hidden', 
                              background: '#ffffff',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <div style={{ height: '110px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              <img src={displayImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b' }}>TOPIC {les.order}</span>
                                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', margin: '2px 0 6px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{les.title}</h4>
                                <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '32px' }}>
                                  {displayCaption}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn btn-outlined btn-mini"
                                onClick={() => {
                                  setEditingDiagramLessonId(les.id);
                                  setDiagramImageUrl(hasImg ? les.content.images[0].url : '');
                                  setDiagramImageCaption(hasImg ? les.content.images[0].caption : '');
                                }}
                                style={{ marginTop: '10px', width: '100%', fontSize: '11.5px', fontWeight: 700 }}
                              >
                                Edit Diagram / Photo
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Diagram Editor */}
                  <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    {editingDiagramLessonId === null ? (
                      <div style={{ textAlign: 'center', padding: '40px 10px', color: '#94a3b8' }}>
                        <Layers size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#64748b' }}>Select Topic on the Left</h4>
                        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Click \"Edit Diagram / Photo\" to upload or update diagrams.</p>
                      </div>
                    ) : (
                      (() => {
                        const targetLesObj = lessons.find(l => l.id === editingDiagramLessonId);
                        if (!targetLesObj) return null;
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                              Edit Diagram: {targetLesObj.title}
                            </h3>

                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label className="form-label" style={{ fontWeight: 700 }}>Paste Google Drive or Direct Image URL Link</label>
                              <input
                                type="text"
                                placeholder="Paste link here (e.g., https://drive.google.com/...)"
                                value={diagramImageUrl}
                                onChange={(e) => {
                                  const rawUrl = e.target.value;
                                  const parsedUrl = convertGoogleDriveLink(rawUrl);
                                  setDiagramImageUrl(parsedUrl);
                                }}
                                className="input-field"
                                style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none' }}
                              />
                            </div>

                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label className="form-label" style={{ fontWeight: 700 }}>Or Upload Image File (Warning: Size must be small)</label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 1.5 * 1024 * 1024) {
                                      showAlert('Large File Warning', 'Warning: Large image file! Please use a Google Drive URL link instead to prevent browser storage crash.', 'warning');
                                    }
                                    const base64 = await new Promise<string>((resolve) => {
                                      const reader = new FileReader();
                                      reader.readAsDataURL(file);
                                      reader.onload = () => resolve(reader.result as string);
                                    });
                                    setDiagramImageUrl(base64);
                                  }
                                }}
                                className="input-field"
                              />
                              {diagramImageUrl && (
                                <div style={{ marginTop: '10px' }}>
                                  <img src={diagramImageUrl} style={{ width: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', padding: '6px' }} alt="Preview" />
                                  {diagramImageUrl.startsWith('data:') && (
                                    <span style={{ fontSize: '11px', color: '#ea580c', display: 'block', marginTop: '4px', fontWeight: 600 }}>Storing locally as Base64. Google Drive link is highly recommended!</span>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="form-group">
                              <label className="form-label" style={{ fontWeight: 700 }}>Diagram Caption / Description</label>
                              <textarea
                                rows={3}
                                placeholder="Describe the details shown in this diagram diagram..."
                                value={diagramImageCaption}
                                onChange={e => setDiagramImageCaption(e.target.value)}
                                className="input-field text-area"
                              />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                  if (!diagramImageUrl) {
                                    showAlert('Image Required', 'Please upload a diagram image first.', 'warning');
                                    return;
                                  }
                                  saveLesson({
                                    ...targetLesObj,
                                    content: {
                                      ...targetLesObj.content,
                                      images: [{
                                        url: diagramImageUrl,
                                        caption: diagramImageCaption || `Visual diagram for ${targetLesObj.title}`,
                                        highResUrl: diagramImageUrl
                                      }]
                                    }
                                  });
                                  showAlert('Diagram Saved', 'Diagram photo updated successfully!', 'success');
                                  setEditingDiagramLessonId(null);
                                  setDiagramImageUrl('');
                                  setDiagramImageCaption('');
                                }}
                                style={{ flex: 1 }}
                              >
                                <Save size={14} />
                                <span>Save Diagram</span>
                              </button>
                              <button
                                type="button"
                                className="btn btn-outlined"
                                onClick={() => {
                                  setEditingDiagramLessonId(null);
                                  setDiagramImageUrl('');
                                  setDiagramImageCaption('');
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                </div>
              );
            })()
          )
          }
        </div>
      )}

      {/* ====================================================================
         3. LESSONS
         ==================================================================== */}
      {activeTab === 'lessons' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {selectedVideoModuleId === null ? (
            <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                Course Modules Grid (Select a module to manage its video lecture)
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {modules.map(mod => {
                  const imgData = MODULE_IMAGES_AND_COLORS[mod.order] || { image: '/logo_emblem.png', accentColor: '#2563eb' };
                  
                  // Count how many lessons in this module have a video
                  const moduleLessons = lessons.filter(l => l.moduleId === mod.id);
                  const hasVideo = moduleLessons.some(l => l.content?.video?.videoUrl);

                  return (
                    <div
                      key={mod.id}
                      onClick={() => {
                        setSelectedVideoModuleId(mod.id);
                      }}
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

                        {hasVideo && (
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            background: '#16a34a',
                            color: '#ffffff',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
 gap: '4px'
                          }}>
                            <span>Active Video ✓</span>
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px 0' }}>{mod.title}</h4>
                          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{mod.description}</p>
                        </div>
                        <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', fontWeight: 700, color: '#ea580c' }}>
                          <span>Manage Video Lecture →</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Module Video viewer & editor
            (() => {
              const selectedModObj = modules.find(m => m.id === selectedVideoModuleId);
              if (!selectedModObj) return null;
              
              const moduleLessons = lessons.filter(l => l.moduleId === selectedVideoModuleId);
              const firstVideoLesson = moduleLessons.find(l => l.content?.video?.videoUrl);
              const hasVideo = !!firstVideoLesson?.content?.video?.videoUrl;

              return (
                <div className="admin-split-layout">
                  <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVideoModuleId(null);
                        }}
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
                          <span style={{ fontSize: '12px', fontWeight: 800, padding: '3px 8px', borderRadius: '12px', background: '#fff7ed', color: '#ea580c' }}>
                            MODULE {selectedModObj.order} VIDEO LECTURE
                          </span>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>
                          {selectedModObj.title}
                        </h3>
                      </div>
                    </div>

                    {/* Preview video */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {hasVideo ? (
                        <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', background: '#f8fafc' }}>
                          {renderPreviewVideo(firstVideoLesson.content.video.videoUrl, firstVideoLesson.content.video.thumbnail)}
                          <div style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 700, fontSize: '14px' }}>
                              <span>Active Video Lecture Loaded Successfully</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', margin: 0 }}>
                              This video will be played for all {moduleLessons.length} topics inside Module {selectedModObj.order}.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div style={{ padding: '60px 20px', textAlign: 'center', border: '2px dashed #cbd5e1', borderRadius: '16px', color: '#64748b' }}>
                          <Video size={48} style={{ margin: '0 auto 12px auto', opacity: 0.5, color: '#ea580c' }} />
                          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#475569' }}>No Video Lecture Uploaded Yet</h4>
                          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Use the form on the right to upload the video course for Module {selectedModObj.order}.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Video Editor */}
                  <div className="card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Video size={18} color="#ea580c" />
                      <span>Upload / Update Module Video</span>
                    </h3>

                    <div className="form-group" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>Paste Google Drive or Direct Video / YouTube URL Link</label>
                      <input
                        type="text"
                        placeholder="Paste Google Drive/YouTube video link here..."
                        value={moduleVideoUrl}
                        onChange={(e) => {
                          const rawUrl = e.target.value;
                          const parsedUrl = convertGoogleDriveLink(rawUrl);
                          setModuleVideoUrl(parsedUrl);
                        }}
                        className="input-field"
                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none', width: '100%' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>Or Upload Video File (Only for small clips &lt; 2MB)</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 2 * 1024 * 1024) {
                              showAlert('File Too Large', 'File too large! Storing base64 videos in browser storage will cause QuotaExceeded crashes. Please upload your video to Google Drive or YouTube and paste the link instead.', 'error');
                              return;
                            }
                            const base64 = await new Promise<string>((resolve) => {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () => resolve(reader.result as string);
                            });
                            setModuleVideoUrl(base64);
                          }
                        }}
                        className="input-field"
                      />
                      {moduleVideoUrl && (
                        <div>
                          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 800, display: 'block', marginTop: '4px' }}>✓ Video URL Loaded (Ready to apply)</span>
                          {moduleVideoUrl.startsWith('data:') && (
                            <span style={{ fontSize: '11px', color: '#ea580c', display: 'block', marginTop: '4px', fontWeight: 600 }}>Storing locally as Base64. Google Drive link is highly recommended!</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>Paste Video Cover / Poster Image URL Link</label>
                      <input
                        type="text"
                        placeholder="Paste image link here..."
                        value={moduleVideoCover}
                        onChange={(e) => {
                          const rawUrl = e.target.value;
                          const parsedUrl = convertGoogleDriveLink(rawUrl);
                          setModuleVideoCover(parsedUrl);
                        }}
                        className="input-field"
                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none', width: '100%' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>Or Upload Video Cover / Poster (Image)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 1 * 1024 * 1024) {
                              showAlert('Large File Warning', 'Warning: Large image file! Please paste a URL link instead.', 'warning');
                            }
                            const base64 = await new Promise<string>((resolve) => {
                              const reader = new FileReader();
                              reader.readAsDataURL(file);
                              reader.onload = () => resolve(reader.result as string);
                            });
                            setModuleVideoCover(base64);
                          }
                        }}
                        className="input-field"
                      />
                      {moduleVideoCover && (
                        <div>
                          <img src={moduleVideoCover} style={{ width: '100px', height: 'auto', borderRadius: '4px', marginTop: '6px', border: '1px solid #cbd5e1' }} alt="Poster" />
                          {moduleVideoCover.startsWith('data:') && (
                            <span style={{ fontSize: '11px', color: '#ea580c', display: 'block', marginTop: '4px', fontWeight: 600 }}>Storing locally as Base64. Google Drive link is highly recommended!</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>Video Lecture Description</label>
                      <textarea
                        rows={3}
                        placeholder="Write a short description or overview for this video lecture..."
                        value={moduleVideoDesc}
                        onChange={e => setModuleVideoDesc(e.target.value)}
                        className="input-field text-area"
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label className="form-label" style={{ fontWeight: 700 }}>Video Duration (MM:SS)</label>
                      <input
                        type="text"
                        placeholder="e.g. 3:09 or 14:00"
                        value={moduleVideoDuration}
                        onChange={(e) => setModuleVideoDuration(e.target.value)}
                        className="input-field"
                        style={{ padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '13.5px', outline: 'none', width: '100%' }}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-full"
                      disabled={moduleVideoLoading}
                      onClick={async () => {
                        if (!moduleVideoUrl) {
                          showAlert('Selection Required', 'Please upload a video file first.', 'warning');
                          return;
                        }
                        setModuleVideoLoading(true);
                        try {
                          // Parse duration string MM:SS to seconds (default: 180 seconds = 3:00)
                          let durationSeconds = 180;
                          if (moduleVideoDuration && moduleVideoDuration.includes(':')) {
                            const parts = moduleVideoDuration.split(':');
                            const mins = parseInt(parts[0], 10) || 0;
                            const secs = parseInt(parts[1], 10) || 0;
                            durationSeconds = (mins * 60) + secs;
                          } else if (moduleVideoDuration) {
                            const num = parseInt(moduleVideoDuration, 10);
                            if (!isNaN(num)) {
                              durationSeconds = num < 60 ? num * 60 : num;
                            }
                          }

                          // Apply to all lessons in this module
                          for (const les of moduleLessons) {
                            await saveLesson({
                              ...les,
                              content: {
                                ...les.content,
                                video: {
                                  videoUrl: moduleVideoUrl,
                                  thumbnail: moduleVideoCover || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
                                  duration: durationSeconds
                                }
                              }
                            });
                          }
                          showAlert('Video Applied Successfully', `Video lecture successfully applied to all ${moduleLessons.length} topics inside Module ${selectedModObj.order}!`, 'success');
                        } catch (err) {
                          console.error(err);
                          showAlert('System Error', 'Failed to save video to database.', 'error');
                        } finally {
                          setModuleVideoLoading(false);
                        }
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
                      {moduleVideoLoading ? 'Saving Video...' : 'Apply Video to Module Chapters'}
                    </button>
                  </div>
                </div>
              );
            })()
          )
          }
        </div>
      )}

      {/* ====================================================================
         4. USER PERMISSION & ROLE ACCESS MANAGEMENT
         ==================================================================== */}
      {activeTab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* User Metrics Overview Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Registered Users</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#102A56', marginTop: '4px' }}>{users.length}</div>
            </div>
            <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Enrolled Students</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>{users.filter(u => u.role !== 'admin').length}</div>
            </div>
            <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Administrators</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>{users.filter(u => u.role === 'admin').length}</div>
            </div>
            <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Certificates Issued</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>{certificates.length}</div>
            </div>
          </div>

          <div className="admin-content-grid grid-2">
            {/* Student Progress & Permission List */}
            <div className="card admin-list-card" style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UsersIcon size={20} color="#2563eb" />
                  <span>Enrolled Users Registry ({users.length})</span>
                </h3>
              </div>

              {/* Search & Filter Controls */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
                  <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={userSearchQuery}
                    onChange={e => setUserSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px 8px 32px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12.5px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '8px' }}>
                  {(['all', 'student', 'admin'] as const).map(r => (
                    <button
                      key={r}
                      onClick={() => setUserRoleFilter(r)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: userRoleFilter === r ? '#ffffff' : 'transparent',
                        color: userRoleFilter === r ? '#0f172a' : '#64748b',
                        textTransform: 'capitalize'
                      }}
                    >
                      {r === 'all' ? 'All Roles' : r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-items-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '560px', overflowY: 'auto' }}>
                {users
                  .filter(u => {
                    const matchesSearch = !userSearchQuery || 
                      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
                      u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
                    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
                    return matchesSearch && matchesRole;
                  })
                  .map(user => {
                    const hasCertificate = certificates.some(c => c.userId === user.id && c.courseId === 'import-export-master');
                    const isAdmin = user.role === 'admin';

                    const handleToggleRole = async () => {
                      const newRole: User['role'] = isAdmin ? 'student' : 'admin';
                      saveUser({ ...user, role: newRole });
                      try {
                        await usersApi.update(user.id, { name: user.name, email: user.email, role: newRole });
                        await fetchAllUsers();
                        showAlert('Role Updated', `Changed role for ${user.name} to ${newRole.toUpperCase()}`, 'success');
                      } catch (err) {
                        console.error(err);
                      }
                    };

                    return (
                      <div 
                        key={user.id} 
                        className="student-admin-row-item"
                        style={{ 
                          background: '#ffffff', 
                          border: '1.5px solid #e2e8f0', 
                          borderRadius: '12px', 
                          padding: '16px', 
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}
                      >
                        <div className="student-profile-info" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                          <div 
                            className="avatar" 
                            style={{ 
                              width: '42px', 
                              height: '42px', 
                              borderRadius: '50%', 
                              background: isAdmin ? '#0f172a' : '#2563eb', 
                              color: '#ffffff', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              fontWeight: 800, 
                              fontSize: '15px',
                              flexShrink: 0 
                            }}
                          >
                            {user.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="student-details" style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{user.name}</h4>
                              <span 
                                style={{ 
                                  fontSize: '10px', 
                                  fontWeight: 800, 
                                  padding: '2px 8px', 
                                  borderRadius: '12px', 
                                  background: isAdmin ? '#f1f5f9' : '#eff6ff', 
                                  color: isAdmin ? '#334155' : '#2563eb',
                                  border: `1px solid ${isAdmin ? '#cbd5e1' : '#bfdbfe'}`,
                                  textTransform: 'uppercase'
                                }}
                              >
                                {user.role}
                              </span>
                            </div>
                            <span style={{ fontSize: '12px', color: '#64748b' }}>{user.email}</span>
                          </div>

                          {/* Quick Role Toggle Switcher */}
                          <button
                            onClick={handleToggleRole}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1px solid #cbd5e1',
                              background: '#f8fafc',
                              fontSize: '11px',
                              fontWeight: 700,
                              color: '#334155',
                              cursor: 'pointer'
                            }}
                          >
                            Set as {isAdmin ? 'Student' : 'Admin'}
                          </button>
                        </div>

                        {/* Progress tracking */}
                        <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px 12px', border: '1px solid #f1f5f9', marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                            <span>Course Study Progress</span>
                            <span style={{ fontWeight: 800, color: '#2563eb' }}>{user.progressPercentage}%</span>
                          </div>
                          <div style={{ height: '6px', width: '100%', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ width: `${user.progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #0284c7)', borderRadius: '999px' }} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0' }}>
                          {hasCertificate ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '16px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', fontSize: '11px', fontWeight: 700 }}>
                              <Award size={13} />
                              <span>Certificate Issued</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                issueCertificate(user.id, 'import-export-master');
                                showAlert('Certificate Approved', `Approved and Issued Certificate of Completion to ${user.name}!`, 'success');
                              }}
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '6px 12px', borderRadius: '6px', background: '#ea580c',
                                color: '#ffffff', fontWeight: 700, fontSize: '12px', border: 'none', cursor: 'pointer'
                              }}
                            >
                              <Award size={13} />
                              <span>Issue Certificate</span>
                            </button>
                          )}

                          <button 
                            type="button"
                            onClick={() => handleEditUser(user)}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '4px',
                              padding: '6px 12px', borderRadius: '6px', background: '#ffffff',
                              color: '#475569', border: '1px solid #cbd5e1', fontWeight: 600, fontSize: '12px', cursor: 'pointer'
                            }}
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* User Vetting & Credentials Form */}
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
                    placeholder="Enter your name"
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
                    placeholder="Enter your email"
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
                  <span>Save User Credentials</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
         5. SYSTEM SETTINGS & MAINTENANCE UTILITIES
         ==================================================================== */}
      {activeTab === 'settings' && (
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Security Access Code Card */}
          <div className="card" style={{ padding: '28px', background: '#ffffff', borderRadius: '16px', border: '1.5px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={20} color="#0284c7" />
                <span>Admin Access Code Configuration</span>
              </h3>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', background: '#e0f2fe', color: '#0284c7', borderRadius: '20px', letterSpacing: '0.5px' }}>
                SUPER ADMIN
              </span>
            </div>

            {/* Today's Daily Dynamic Code Card */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                  Today's Active Dynamic Code
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', background: '#dcfce7', color: '#16a34a', borderRadius: '6px' }}>
                  ALWAYS ACTIVE
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0284c7', letterSpacing: '2px', background: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1.5px dashed #93c5fd', display: 'inline-block' }}>
                  {`RBC${String(new Date().getDate()).padStart(2, '0')}${String(new Date().getMonth() + 1).padStart(2, '0')}`}
                </div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  (Rotates automatically every night at 12:00 AM)
                </span>
              </div>
            </div>

            {/* Master Backup Code (RBC9988) Toggle Switch */}
            <div style={{ background: isMasterActive ? '#f0fdf4' : '#fef2f2', padding: '16px', borderRadius: '12px', border: `1.5px solid ${isMasterActive ? '#86efac' : '#fca5a5'}`, transition: 'all 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: isMasterActive ? '#166534' : '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>Master Backup Code (RBC9988)</span>
                  </div>
                  <div style={{ fontSize: '12px', color: isMasterActive ? '#15803d' : '#b91c1c', marginTop: '2px' }}>
                    {isMasterActive ? 'RBC9988 is currently ENABLED and can be used to login.' : 'RBC9988 is DISABLED. No one can use it to login.'}
                  </div>
                </div>

                {/* Big Interactive Toggle Switch Button */}
                <button
                  type="button"
                  onClick={() => setIsMasterActive(!isMasterActive)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 14px',
                    borderRadius: '30px',
                    border: `1.5px solid ${isMasterActive ? '#16a34a' : '#dc2626'}`,
                    background: isMasterActive ? '#16a34a' : '#dc2626',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: isMasterActive ? '0 2px 8px rgba(22, 163, 74, 0.3)' : '0 2px 8px rgba(220, 38, 38, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{isMasterActive ? 'ACTIVE' : 'INACTIVE'}</span>
                  <div style={{ width: '32px', height: '18px', background: '#ffffff', borderRadius: '20px', position: 'relative' }}>
                    <div style={{ width: '14px', height: '14px', background: isMasterActive ? '#16a34a' : '#dc2626', borderRadius: '50%', position: 'absolute', top: '2px', left: isMasterActive ? '16px' : '2px', transition: 'all 0.2s ease' }} />
                  </div>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveAccessCode}
              disabled={accessCodeLoading}
              style={{
                padding: '14px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 800,
                cursor: accessCodeLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '15px',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
                width: '100%',
                marginTop: '4px'
              }}
            >
              <Save size={18} />
              <span>{accessCodeLoading ? 'Saving Settings...' : 'Save Configuration Changes'}</span>
            </button>
          </div>

          {/* Database Maintenance & Backup Section */}
          <div className="card" style={{ padding: '28px', background: '#ffffff', borderRadius: '16px', border: '1.5px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} color="#102A56" />
              <span>System Data Maintenance & Backup</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Export Catalog Backup (JSON)</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Download a complete JSON export of modules, lessons, and user registries.</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const catalogData = { modules, lessons, usersCount: users.length, exportDate: new Date().toISOString() };
                    const blob = new Blob([JSON.stringify(catalogData, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `RBC-System-Backup-${Date.now()}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  style={{
                    padding: '8px 14px', borderRadius: '8px', border: 'none',
                    background: '#102A56', color: '#ffffff', fontSize: '12px', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <Download size={14} />
                  <span>Export JSON</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', background: '#fff7ed', borderRadius: '10px', border: '1px solid #ffedd5' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#9a3412' }}>Purge Progress Storage Cache</div>
                  <div style={{ fontSize: '12px', color: '#c2410c' }}>Clear offline progress cache stored in local browser storage.</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('rbc_user_progress');
                    showAlert('Cache Purged', 'Successfully purged local progress cache', 'info');
                  }}
                  style={{
                    padding: '8px 14px', borderRadius: '8px', border: 'none',
                    background: '#ea580c', color: '#ffffff', fontSize: '12px', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Purge Cache</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
