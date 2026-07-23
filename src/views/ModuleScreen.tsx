import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen, Image, Video, FileText, Download, Bookmark,
  ChevronRight, ChevronDown, Award, Pause,
  ArrowLeft, ArrowRight, CheckCircle2, Volume2, PlayCircle
} from 'lucide-react';
import { uiTranslations, translateModuleTitle, translateModuleDescription, getTranslatedLesson } from '../utils/translator';

export const ModuleScreen: React.FC = () => {
  const {
    modules,
    lessons,
    progress,
    selectedModuleId,
    setSelectedModuleId,
    selectedLessonId,
    setSelectedLessonId,
    setActiveView,
    markLessonComplete,
    bookmarks,
    toggleBookmark,
    language,
    setLanguage,
    selectedModuleTab,
    setSelectedModuleTab
  } = useApp();

  const handleCycleLanguage = () => {
    if (language === 'en') setLanguage('hi');
    else if (language === 'hi') setLanguage('gu');
    else if (language === 'gu') setLanguage('mr');
    else setLanguage('en');
  };

  const selectedTab = selectedModuleTab || 'read';
  const setSelectedTab = setSelectedModuleTab;

  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string>('');
  const [playingLessonId, setPlayingLessonId] = useState<string | null>(null);

  // Accordion state: map of lessonId -> boolean (whether expanded)
  const [expandedTopics, setExpandedTopics] = useState<{ [topicId: string]: boolean }>({});

  // PDF states
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  // Tablet topic dropdown state
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Active module data
  const activeModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  const currentModuleIndex = modules.findIndex(m => m.id === activeModule?.id);
  const prevModule = currentModuleIndex > 0 ? modules[currentModuleIndex - 1] : null;
  const nextModule = currentModuleIndex >= 0 && currentModuleIndex < modules.length - 1 ? modules[currentModuleIndex + 1] : null;

  const handleGoToModule = (modId: string) => {
    setSelectedModuleId(modId);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextModule = () => {
    if (nextModule) {
      handleGoToModule(nextModule.id);
    }
  };

  const handlePrevModule = () => {
    if (prevModule) {
      handleGoToModule(prevModule.id);
    }
  };

  const moduleLessons = lessons.filter(l => l.moduleId === (activeModule?.id || ''));

  // Translate all lessons dynamically on load for the active language
  const translatedLessons = moduleLessons.map(l => getTranslatedLesson(l, language));

  // Get active translation keys
  const t = uiTranslations[language];

  // Calculate stats
  const totalTopics = translatedLessons.length;

  // Calculate progress of this module
  const completedTopicsCount = translatedLessons.filter(l => progress[l.id]?.completed).length;
  const completionPercentage = totalTopics > 0
    ? Math.round((completedTopicsCount / totalTopics) * 100)
    : 0;

  const isModuleCompleted = completionPercentage === 100;

  // Sync selectedModuleId if null to avoid null states in downstream views
  useEffect(() => {
    if (!selectedModuleId && modules.length > 0) {
      setSelectedModuleId(modules[0].id);
    }
  }, [selectedModuleId, modules, setSelectedModuleId]);

  // Pre-load speech synthesis voices on mount
  const ttsSessionRef = useRef<number>(0);
  const ttsActiveRef = useRef<boolean>(false);
  const ttsKeepAliveRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => { window.speechSynthesis.getVoices(); };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => { window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged); };
    }
  }, []);

  const stopActiveTTS = () => {
    ttsActiveRef.current = false;
    ttsSessionRef.current = 0;
    clearInterval(ttsKeepAliveRef.current);
    ttsKeepAliveRef.current = undefined;
    // Stop Google TTS Audio element
    const audio = (window as any)._ttsCurrentAudio as HTMLAudioElement | null;
    if (audio) { try { audio.pause(); audio.src = ''; } catch (e) {} (window as any)._ttsCurrentAudio = null; }
    // Stop ResponsiveVoice
    try { const rv = (window as any).responsiveVoice; if (rv) rv.cancel(); } catch (e) {}
    // Stop WebSpeech
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) { }
    }
  };

  // Stop any playing TTS audio when the screen unmounts or changes
  useEffect(() => {
    return () => {
      stopActiveTTS();
    };
  }, []);

  // If selectedLessonId is set from outside (like Search, Dashboard, Bookmarks, etc.),
  // auto-expand it and scroll to it.
  useEffect(() => {
    if (selectedLessonId) {
      // Find if this lesson belongs to the active module
      const hasLesson = translatedLessons.some(l => l.id === selectedLessonId);
      if (hasLesson) {
        setExpandedTopics(prev => ({
          ...prev,
          [selectedLessonId]: true
        }));
        setActiveTopicId(selectedLessonId);

        // Scroll to it
        setTimeout(() => {
          handleScrollToTopic(selectedLessonId);
        }, 150);

        // Reset selectedLessonId to null in global state so that it doesn't trigger scroll on subsequent transitions
        setSelectedLessonId(null);
      }
    }
  }, [selectedLessonId, translatedLessons, setSelectedLessonId]);

  // Set default active topic & auto-expand Topic 1 by default on module change
  useEffect(() => {
    if (translatedLessons.length > 0) {
      const firstTopicId = translatedLessons[0].id;
      setActiveTopicId(firstTopicId);
      setExpandedTopics({ [firstTopicId]: true });
    }
    setPdfPage(1);
  }, [selectedModuleId, language]); // reset if language toggles as well

  // Scrollspy observer
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || selectedTab !== 'read') return;

    const handleScroll = () => {
      const containerScrollTop = container.scrollTop;

      for (const lesson of translatedLessons) {
        const el = document.getElementById(`topic-sec-${lesson.id}`);
        if (el) {
          const elTop = el.offsetTop - container.offsetTop;
          const elHeight = el.offsetHeight;

          if (containerScrollTop >= elTop - 120 && containerScrollTop < elTop + elHeight - 120) {
            setActiveTopicId(lesson.id);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [translatedLessons, selectedTab]);

  const handleScrollToTopic = (topicId: string) => {
    if (selectedTab !== 'read') {
      setSelectedTab('read');
      setExpandedTopics(prev => ({ ...prev, [topicId]: true }));
      setTimeout(() => {
        const el = document.getElementById(`topic-sec-${topicId}`);
        const container = scrollContainerRef.current;
        if (el && container) {
          container.scrollTo({
            top: el.offsetTop - container.offsetTop - 20,
            behavior: 'smooth'
          });
          setActiveTopicId(topicId);
        }
      }, 100);
      return;
    }

    const el = document.getElementById(`topic-sec-${topicId}`);
    const container = scrollContainerRef.current;
    if (el && container) {
      container.scrollTo({
        top: el.offsetTop - container.offsetTop - 20,
        behavior: 'smooth'
      });
      setActiveTopicId(topicId);
      setIsTopicDropdownOpen(false);
    }
  };

  const handleToggleModuleCompletion = () => {
    const nextState = !isModuleCompleted;
    translatedLessons.forEach(l => {
      markLessonComplete(l.id, nextState);
    });
  };

  const toggleTopicExpansion = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const handleSelectFromList = (topicId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: true
    }));
    setTimeout(() => {
      handleScrollToTopic(topicId);
    }, 60);
  };

  const handleBookmarkToggle = () => {
    if (!activeModule) return;
    toggleBookmark({
      type: 'lesson',
      title: activeModule.title,
      courseId: 'import-export-master',
      moduleId: activeModule.id,
      lessonId: translatedLessons[0]?.id || ''
    });
  };

  const isBookmarked = bookmarks.some(b => b.moduleId === activeModule?.id);

  if (!activeModule) {
    return (
      <div className="empty-state-card">
        <h3>{t.noModuleLoaded}</h3>
        <p>{t.selectModulePrompt}</p>
      </div>
    );
  }

  // Translating titles & description
  const translatedModuleTitle = translateModuleTitle(activeModule.title, language);
  const translatedModuleDesc = translateModuleDescription(activeModule.description, language);

  return (
    <div className="textbook-screen-layout" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* 2. Main Chapter Reading & Interactive workspace */}
      <div className="textbook-workspace-viewport" ref={scrollContainerRef} style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>

        {/* Zerodha Varsity Style Module Header */}
        <div style={{ paddingBottom: '24px', marginBottom: '32px', borderBottom: '1px solid #e2e8f0', width: '100%' }}>
          {/* Navigation row with Back button & Prev/Next module links */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => setActiveView('Courses')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: 'none',
                background: 'none',
                color: '#475569',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#0284c7')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#475569')}
            >
              <ArrowLeft size={16} />
              <span>{language === 'hi' ? 'मॉड्यूल सूची पर वापस जाएं' : language === 'gu' ? 'મોડ્યુલ સૂચિ પર પાછા જાઓ' : language === 'mr' ? 'मॉड्यूल सूचीवर परत जा' : 'Back to Modules'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {prevModule && (
                <button
                  type="button"
                  onClick={() => handleGoToModule(prevModule.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#334155',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.color = '#0284c7'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.color = '#334155'; }}
                >
                  <ArrowLeft size={14} />
                  <span>{language === 'hi' ? 'पिछला' : language === 'gu' ? 'અગાઉનું' : language === 'mr' ? 'मागील' : 'Prev'} (Module {prevModule.order})</span>
                </button>
              )}

              {nextModule && (
                <button
                  type="button"
                  onClick={() => handleGoToModule(nextModule.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    background: '#0284c7',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#0369a1'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = '#0284c7'; }}
                >
                  <span>{language === 'hi' ? 'अगला मॉड्यूल' : language === 'gu' ? 'આગળનું મોડ્યુલ' : language === 'mr' ? 'पुढील मॉड्यूल' : 'Next Module'} ({nextModule.order})</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Big Module Number & Accent Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontSize: 'clamp(44px, 8vw, 64px)', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{activeModule.order}</span>
            <div style={{ height: '5px', width: '180px', maxWidth: '40vw', background: '#10b981', borderRadius: '3px' }} />
          </div>

          {/* Module Title & Description */}
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', letterSpacing: '-0.5px', wordBreak: 'break-word' }}>
            {translatedModuleTitle}
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 16px 0', lineHeight: 1.5, maxWidth: '800px' }}>
            {translatedModuleDesc}
          </p>

          {/* Sub-actions Row (Watch videos, Hindi, Download PDF) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                type="button"
                onClick={() => setSelectedTab('video')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', fontSize: '14px', fontWeight: 600, padding: 0 }}
              >
                Watch videos
              </button>
              <button
                type="button"
                onClick={handleCycleLanguage}
                title="Click to toggle language (English, Hindi, Gujarati, Marathi)"
                style={{ background: '#e0f2fe', border: 'none', cursor: 'pointer', color: '#0284c7', fontSize: '13px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px', transition: 'all 0.15s ease' }}
              >
                {language === 'hi' ? 'हिंदी' : language === 'gu' ? 'ગુજરાતી' : language === 'mr' ? 'मराठी' : 'English'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedTab('pdf')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284c7', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
            >
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Resource Toolbar */}
        <div className="textbook-resource-toolbar">
          <div className="toolbar-horizontal-scroll" style={{ overflowX: 'auto' }}>
            <button
              className={`toolbar-btn ${selectedTab === 'read' ? 'active' : ''}`}
              onClick={() => setSelectedTab('read')}
            >
              <BookOpen size={16} />
              <span>{t.readChapter}</span>
            </button>

            <button
              className={`toolbar-btn ${selectedTab === 'images' ? 'active' : ''}`}
              onClick={() => setSelectedTab('images')}
            >
              <Image size={16} />
              <span>{t.viewImages}</span>
            </button>

            <button
              className={`toolbar-btn ${selectedTab === 'video' ? 'active' : ''}`}
              onClick={() => setSelectedTab('video')}
            >
              <Video size={16} />
              <span>{t.watchVideo}</span>
            </button>

            <button
              className={`toolbar-btn ${selectedTab === 'pdf' ? 'active' : ''}`}
              onClick={() => setSelectedTab('pdf')}
            >
              <FileText size={16} />
              <span>{t.openPdf}</span>
            </button>

            {/* Bookmark Module */}
            <button
              className={`toolbar-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleBookmarkToggle}
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? t.bookmarked : t.bookmark}</span>
            </button>

            {/* Downloads trigger */}
            <button
              className={`toolbar-btn download-btn ${isDownloadOpen ? 'active' : ''}`}
              onClick={() => setIsDownloadOpen(!isDownloadOpen)}
            >
              <Download size={16} />
              <span>{t.download}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Clean Fixed Download Options Modal (100% Mobile & Overflow Proof) */}
        {isDownloadOpen && (
          <div
            onClick={() => setIsDownloadOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(3px)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px'
            }}
          >
            <div
              className="download-modal-panel card"
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '300px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                border: '1px solid #e2e8f0',
                zIndex: 9999
              }}
            >
              <button onClick={() => {
                // Generate full module content as HTML and download
                const moduleTitle = activeModule ? translateModuleTitle(activeModule.title, language) : 'Module';
                const lessonsHtml = translatedLessons.map((lesson, idx) => `
                  <div style="margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid #e5e7eb;">
                    <h2 style="font-size:18px;color:#1d4ed8;margin-bottom:8px;">${idx + 1}. ${lesson.title}</h2>
                    ${lesson.content?.definition ? `<p><strong>Definition:</strong> ${lesson.content.definition}</p>` : ''}
                    ${lesson.content?.simpleExplanation ? `<p><strong>Simple Explanation:</strong> ${lesson.content.simpleExplanation}</p>` : ''}
                    ${lesson.content?.whyItMatters ? `<p><strong>Why It Matters:</strong> ${lesson.content.whyItMatters}</p>` : ''}
                    ${lesson.content?.realBusinessExample ? `<blockquote style="border-left:4px solid #3b82f6;padding-left:12px;color:#374151;"><strong>Real Example:</strong> ${lesson.content.realBusinessExample}</blockquote>` : ''}
                    ${(lesson.content?.keyPoints?.length ?? 0) > 0 ? `<ul>${lesson.content!.keyPoints!.map((p: string) => `<li>${p}</li>`).join('')}</ul>` : ''}
                    ${(lesson.content?.commonMistakes?.length ?? 0) > 0 ? `<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:8px 12px;"><strong>Common Mistakes:</strong><ul>${lesson.content!.commonMistakes!.map((m: string) => `<li>${m}</li>`).join('')}</ul></div>` : ''}
                  </div>`).join('');
                const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${moduleTitle}</title>
                  <style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;color:#111827;line-height:1.7;}
                  h1{color:#1e3a8a;border-bottom:3px solid #1d4ed8;padding-bottom:8px;}
                  h2{color:#1d4ed8;}p,li{font-size:15px;}blockquote{background:#eff6ff;}</style>
                  </head><body><h1>${moduleTitle} — RBC Import & Export Academy</h1>${lessonsHtml}</body></html>`;
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `${moduleTitle.replace(/\s+/g, '-')}.html`;
                a.click(); URL.revokeObjectURL(url);
                setIsDownloadOpen(false);
              }}>
                {t.downloadChapterPdf}
              </button>
              <button onClick={() => {
                // Download all key points as a text summary
                const moduleTitle = activeModule ? translateModuleTitle(activeModule.title, language) : 'Module';
                const text = translatedLessons.map((lesson, idx) =>
                  `${idx + 1}. ${lesson.title}\n${lesson.content?.keyPoints?.map((p: string) => `   • ${p}`).join('\n') || '   (No key points)'}`
                ).join('\n\n');
                const blob = new Blob([`${moduleTitle} — Key Points Summary\n\n${text}`], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `${moduleTitle.replace(/\s+/g, '-')}-notes.txt`;
                a.click(); URL.revokeObjectURL(url);
                setIsDownloadOpen(false);
              }}>
                {t.downloadImages}
              </button>
              <button onClick={() => {
                const moduleTitle = activeModule ? translateModuleTitle(activeModule.title, language) : 'Module';
                alert(`${moduleTitle} — Video lecture download is not available yet. Please use the Watch Video tab to stream online.`);
                setIsDownloadOpen(false);
              }}>
                {t.downloadVideo}
              </button>
              <button onClick={() => {
                // Download complete module content as comprehensive HTML
                const moduleTitle = activeModule ? translateModuleTitle(activeModule.title, language) : 'Module';
                const allLessonsHtml = translatedLessons.map((lesson, idx) => `
                  <section style="page-break-inside:avoid;margin-bottom:40px;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
                    <h2 style="color:#1d4ed8;">${idx + 1}. ${lesson.title}</h2>
                    ${lesson.content?.definition ? `<p><strong>Definition:</strong> ${lesson.content.definition}</p>` : ''}
                    ${lesson.content?.simpleExplanation ? `<p><strong>Simple Explanation:</strong> ${lesson.content.simpleExplanation}</p>` : ''}
                    ${lesson.content?.whyItMatters ? `<p><strong>Why It Matters:</strong> ${lesson.content.whyItMatters}</p>` : ''}
                    ${lesson.content?.realBusinessExample ? `<blockquote style="border-left:4px solid #3b82f6;padding:8px 12px;background:#eff6ff;"><strong>Real Example:</strong> ${lesson.content.realBusinessExample}</blockquote>` : ''}
                    ${(lesson.content?.keyPoints?.length ?? 0) > 0 ? `<div><strong>Key Points:</strong><ul>${lesson.content!.keyPoints!.map((p: string) => `<li>${p}</li>`).join('')}</ul></div>` : ''}
                    ${(lesson.content?.commonMistakes?.length ?? 0) > 0 ? `<div style="background:#fef2f2;border-left:4px solid #ef4444;padding:8px 12px;"><strong>Common Mistakes:</strong><ul>${lesson.content!.commonMistakes!.map((m: string) => `<li>${m}</li>`).join('')}</ul></div>` : ''}
                  </section>`).join('');
                const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${moduleTitle} — Complete Module</title>
                  <style>body{font-family:Arial,sans-serif;max-width:900px;margin:40px auto;padding:20px;color:#111827;line-height:1.8;}
                  h1{color:#1e3a8a;border-bottom:3px solid #1d4ed8;padding-bottom:12px;margin-bottom:32px;}
                  @media print{section{page-break-inside:avoid;}}</style>
                  </head><body><h1>📗 ${moduleTitle}<br><small style="font-size:14px;color:#6b7280;">RBC Import & Export Academy — Complete Module Notes</small></h1>${allLessonsHtml}</body></html>`;
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = `${moduleTitle.replace(/\s+/g, '-')}-complete.html`;
                a.click(); URL.revokeObjectURL(url);
                setIsDownloadOpen(false);
              }}>
                {t.downloadCompleteModule}
              </button>
              <button onClick={() => { setIsDownloadOpen(false); setActiveView('Downloads'); }}>
                {t.saveOffline}
              </button>
            </div>
          </div>
        )}

        {/* Mobile/Tablet Topics Navigation Dropdown */}
        <div className="tablet-topic-navigation-box">
          <button
            className="tablet-topic-dropdown-btn"
            onClick={() => setIsTopicDropdownOpen(!isTopicDropdownOpen)}
          >
            <span>{t.topicsInChapter} ({totalTopics})</span>
            <ChevronDown size={16} />
          </button>

          {isTopicDropdownOpen && (
            <div className="tablet-dropdown-list card">
              {translatedLessons.map((lesson, idx) => (
                <button
                  key={lesson.id}
                  className={`tablet-dropdown-item ${activeTopicId === lesson.id ? 'active' : ''}`}
                  onClick={() => handleSelectFromList(lesson.id)}
                >
                  <span className="order-num">{idx + 1}.</span>
                  <span className="title-text">{lesson.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Render Tab Contents */}
        <div className="textbook-workspace-content-pane">

          {/* ==========================================
             1. TEXT READ MODE
             ========================================== */}
          {selectedTab === 'read' && (
            <div className="textbook-reading-mode">
              <div className="compact-topics-list-box card">
                <h3 className="topics-list-box-title">{t.topicsInChapter}</h3>
                <div className="topics-list-links">
                  {translatedLessons.map((lesson, idx) => {
                    const isDone = progress[lesson.id]?.completed || false;
                    const isExpanded = expandedTopics[lesson.id] || false;

                    return (
                      <div
                        key={lesson.id}
                        id={`topic-sec-${lesson.id}`}
                        className="textbook-accordion-item"
                        style={{ borderBottom: '1px solid #F3F4F6', padding: '16px 0' }}
                      >
                        {/* Clickable Row to Toggle Expansion */}
                        <div
                          className="topic-link-row"
                          onClick={() => toggleTopicExpansion(lesson.id)}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', padding: '4px 0' }}
                        >
                          <div className="link-left">
                            <span className="link-num">{idx + 1}.</span>
                            <span className="link-title" style={{ fontSize: '16px', fontWeight: '600' }}>{lesson.title}</span>
                          </div>

                          <div className="link-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {isDone && <span className="completed-badge">{t.completed}</span>}

                            {/* Listen / Read Aloud button */}
                            <div onClick={e => e.stopPropagation()}>
                              <button
                                onClick={() => {
                                  // Toggle stop
                                  if (playingLessonId === lesson.id) {
                                    stopActiveTTS();
                                    setPlayingLessonId(null);
                                    return;
                                  }
                                  stopActiveTTS();

                                  // Build lesson text
                                  const rawLesson = moduleLessons.find(l => l.id === lesson.id) || lesson;
                                  const lessonLang = getTranslatedLesson(rawLesson, language);
                                  const activeLangCode = language === 'hi' ? 'hi' : language === 'gu' ? 'gu' : language === 'mr' ? 'mr' : 'en';

                                  // Clean text — keep unicode chars, only remove special symbols
                                  const clean = (txt: string) =>
                                    txt.replace(/[:\-–—=+*#•[\](){}]/g, ' ').replace(/\s+/g, ' ').trim();

                                  const parts: string[] = [];
                                  if (lessonLang.title) parts.push(lessonLang.title);
                                  if (lessonLang.content?.definition) parts.push(lessonLang.content.definition);
                                  if (lessonLang.content?.writtenExplanation) parts.push(lessonLang.content.writtenExplanation);
                                  if (lessonLang.content?.businessExample) parts.push(lessonLang.content.businessExample);
                                  if (lessonLang.content?.whyImportant) parts.push(lessonLang.content.whyImportant);
                                  if (lessonLang.content?.importantNotes?.length) parts.push(lessonLang.content.importantNotes.join('. '));
                                  if (lessonLang.content?.commonMistakes?.length) parts.push(lessonLang.content.commonMistakes.join('. '));
                                  if (lessonLang.content?.practicalTips?.length) parts.push(lessonLang.content.practicalTips.join('. '));
                                  if (lessonLang.content?.summary) parts.push(lessonLang.content.summary);

                                  const fullText = parts.map(clean).filter(p => p.length > 0).join('. ');

                                  // Split into chunks ≤ 150 chars at word/sentence boundaries for Google TTS
                                  const chunks: string[] = [];
                                  const sentences = fullText.split(/(?<=[.।?!])\s+/);
                                  let cur = '';
                                  for (const s of sentences) {
                                    if ((cur + ' ' + s).trim().length > 150) {
                                      if (cur.trim()) chunks.push(cur.trim());
                                      cur = s;
                                    } else {
                                      cur = cur ? cur + ' ' + s : s;
                                    }
                                  }
                                  if (cur.trim()) chunks.push(cur.trim());
                                  if (chunks.length === 0) chunks.push(fullText.substring(0, 150));

                                  const newSid = Date.now();
                                  ttsActiveRef.current = true;
                                  ttsSessionRef.current = newSid;
                                  setPlayingLessonId(lesson.id);

                                  // ─── PRIMARY: Google Translate TTS via Audio element ───
                                  // No backend needed, no CORS issues, free Gujarati audio
                                  const gttsLang = activeLangCode === 'mr' ? 'mr' : activeLangCode;

                                  const playChunk = (idx: number) => {
                                    if (ttsSessionRef.current !== newSid || !ttsActiveRef.current) return;
                                    if (idx >= chunks.length) {
                                      setPlayingLessonId(null);
                                      ttsActiveRef.current = false;
                                      return;
                                    }

                                    const text = chunks[idx];
                                    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${gttsLang}&client=tw-ob&ttsspeed=0.9`;

                                    const audio = new Audio();
                                    audio.src = url;
                                    (window as any)._ttsCurrentAudio = audio;

                                    audio.onended = () => {
                                      if (ttsSessionRef.current === newSid) playChunk(idx + 1);
                                    };
                                    audio.onerror = () => {
                                      // Google TTS failed → try ResponsiveVoice for this chunk onwards
                                      if (ttsSessionRef.current !== newSid || !ttsActiveRef.current) return;
                                      const rv = (window as any).responsiveVoice;
                                      const rvMap: Record<string, string> = { gu: 'Gujarati Female', hi: 'Hindi Female', mr: 'Marathi Female', en: 'UK English Female' };
                                      const remaining = chunks.slice(idx).join('. ');
                                      if (rv) {
                                        rv.speak(remaining, rvMap[activeLangCode] || 'UK English Female', {
                                          rate: 1, pitch: 1, volume: 1,
                                          onend: () => { if (ttsSessionRef.current === newSid) { setPlayingLessonId(null); ttsActiveRef.current = false; } },
                                          onerror: () => { if (ttsSessionRef.current === newSid) { setPlayingLessonId(null); ttsActiveRef.current = false; } },
                                        });
                                      } else {
                                        // Final fallback: WebSpeech
                                        const utter = new SpeechSynthesisUtterance(remaining);
                                        const lm: Record<string, string> = { gu: 'gu-IN', hi: 'hi-IN', mr: 'mr-IN', en: 'en-IN' };
                                        utter.lang = lm[activeLangCode] || 'en-IN';
                                        utter.rate = 1.0;
                                        utter.onend = () => { if (ttsSessionRef.current === newSid) { setPlayingLessonId(null); ttsActiveRef.current = false; } };
                                        window.speechSynthesis.speak(utter);
                                      }
                                    };

                                    audio.play().catch(() => {
                                      // autoplay blocked — try to play on next user interaction
                                      audio.onerror?.(new Event('error'));
                                    });
                                  };

                                  playChunk(0);
                                }}
                                title={playingLessonId === lesson.id ? "Stop reading" : "Listen to this lesson"}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '5px',
                                  padding: '4px 10px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                  background: playingLessonId === lesson.id ? '#ef4444' : '#f8fafc',
                                  cursor: 'pointer',
                                  fontSize: '12px', color: playingLessonId === lesson.id ? '#ffffff' : '#3b82f6',
                                  fontWeight: '600',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                {playingLessonId === lesson.id ? <Pause size={13} /> : <Volume2 size={13} />}
                                <span>
                                  {playingLessonId === lesson.id
                                    ? (language === 'hi' ? 'रोकें' : language === 'gu' ? 'અટકાવો' : 'Stop')
                                    : (language === 'hi' ? 'सुनें' : language === 'gu' ? 'સાંભળો' : 'Listen')}
                                </span>
                              </button>
                            </div>

                            {/* Stop propagation so clicking Complete doesn't collapse row */}
                            <div onClick={e => e.stopPropagation()}>
                              <button
                                className={`topic-complete-checkbox-btn ${isDone ? 'checked' : ''}`}
                                onClick={() => markLessonComplete(lesson.id, !isDone)}
                                title={isDone ? "Mark as Incomplete" : "Mark as completed"}
                                style={{ padding: '4px 8px', fontSize: '12px' }}
                              >
                                <CheckCircle2 size={16} />
                                <span>{isDone ? t.completed : t.markCompleted}</span>
                              </button>
                            </div>

                            <div style={{ color: 'var(--md-sys-color-secondary)' }}>
                              {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </div>
                          </div>
                        </div>

                        {/* Expanded details container */}
                        {isExpanded && (
                          <div className="topic-expanded-details" style={{ marginTop: '20px', padding: '0 12px 12px 24px', maxWidth: '820px' }}>
                            {/* Definition */}
                            <div className="topic-segment" style={{ marginBottom: '16px' }}>
                              <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.definition}</h4>
                              <p className="segment-body-text" style={{ fontSize: '15px', lineHeight: '1.6', color: '#111827' }}>{lesson.content.definition}</p>
                            </div>

                            {/* Simple Explanation */}
                            <div className="topic-segment" style={{ marginBottom: '16px' }}>
                              <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.simpleExplanation}</h4>
                              <p className="segment-body-text" style={{ fontSize: '15px', lineHeight: '1.6', color: '#111827' }}>{lesson.content.writtenExplanation}</p>
                            </div>

                            {/* Business Example */}
                            <div className="topic-segment business-example-segment callout example" style={{ marginBottom: '16px' }}>
                              <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.realBusinessExample}</h4>
                              <p className="segment-body-text" style={{ fontSize: '15px', lineHeight: '1.6', color: '#111827' }}>{lesson.content.businessExample}</p>
                            </div>

                            {/* Why it is Important */}
                            <div className="topic-segment" style={{ marginBottom: '16px' }}>
                              <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.whyImportant}</h4>
                              <p className="segment-body-text" style={{ fontSize: '15px', lineHeight: '1.6', color: '#111827' }}>{lesson.content.whyImportant}</p>
                            </div>

                            {/* Important Points */}
                            {lesson.content.importantNotes && lesson.content.importantNotes.length > 0 && (
                              <div className="topic-segment" style={{ marginBottom: '16px' }}>
                                <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.importantPoints}</h4>
                                <ul className="segment-bullet-list" style={{ paddingLeft: '20px' }}>
                                  {lesson.content.importantNotes.map((note: string, noteIdx: number) => (
                                    <li key={noteIdx} style={{ fontSize: '15px', color: '#111827', marginBottom: '4px' }}>{note}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Common Mistakes */}
                            {lesson.content.commonMistakes && lesson.content.commonMistakes.length > 0 && (
                              <div className="topic-segment callout warning" style={{ marginBottom: '16px' }}>
                                <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.commonMistakes}</h4>
                                <ul className="segment-bullet-list" style={{ paddingLeft: '20px' }}>
                                  {lesson.content.commonMistakes.map((mistake: string, mistakeIdx: number) => (
                                    <li key={mistakeIdx} style={{ fontSize: '15px', color: '#111827', marginBottom: '4px' }}>{mistake}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Practical Tip */}
                            {lesson.content.practicalTips && lesson.content.practicalTips.length > 0 && (
                              <div className="topic-segment callout practical-tip" style={{ marginBottom: '16px' }}>
                                <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.practicalTip}</h4>
                                <p className="segment-body-text" style={{ fontSize: '15px', color: '#111827' }}>
                                  {lesson.content.practicalTips[0]}
                                </p>
                              </div>
                            )}

                            {/* Summary */}
                            <div className="topic-segment" style={{ marginBottom: '16px' }}>
                              <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.topicSummary}</h4>
                              <p className="segment-body-text" style={{ fontSize: '15px', color: '#111827' }}>{lesson.content.summary}</p>
                            </div>

                            {/* Related Topics */}
                            {lesson.content.relatedTopics && lesson.content.relatedTopics.length > 0 && (
                              <div className="topic-segment related-topics-container">
                                <h4 className="segment-subtitle" style={{ fontSize: '13px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>{t.relatedTopics}</h4>
                                <div className="related-topics-tags-row" style={{ display: 'flex', gap: '8px' }}>
                                  {lesson.content.relatedTopics.map((topic: string, topicIdx: number) => (
                                    <span key={topicIdx} className="related-topic-pill">{topic}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
             2. IMAGES GRID MODE
             ========================================== */}
          {selectedTab === 'images' && (
            <div className="textbook-images-mode">
              <h3 className="mode-sub-title">Chapter Visual Resource Gallery</h3>
              <div className="textbook-images-grid">
                {translatedLessons.map(lesson => {
                  const hasImage = lesson.content.images && lesson.content.images.length > 0;
                  const img = hasImage ? lesson.content.images[0] : {
                    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
                    caption: `Visual diagram demonstrating operations for ${lesson.title}.`,
                    highResUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80'
                  };

                  return (
                    <div key={lesson.id} className="card textbook-image-card">
                      <div className="image-wrapper">
                        <img src={img.url} alt={lesson.title} />
                      </div>
                      <div className="image-card-info">
                        <h4 className="image-title">{lesson.title} Diagram</h4>
                        <p className="image-caption">{img.caption}</p>
                        <div className="image-actions">
                          <button onClick={() => window.open(img.highResUrl, '_blank')} className="btn btn-outlined btn-mini">
                            Zoom Fullscreen
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==========================================
             3. VIDEO PLAYER MODE
             ========================================== */}
          {selectedTab === 'video' && (
            <div className="textbook-video-mode">
              <div className="card video-workspace-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#000000' }}>
                <video
                  controls
                  autoPlay={false}
                  poster={translatedLessons[0]?.content?.images?.[0]?.url || "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"}
                  style={{ width: '100%', height: 'auto', display: 'block', outline: 'none', borderRadius: '12px 12px 0 0' }}
                >
                  <source
                    src={(activeModule as any).videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
                    type="video/mp4"
                  />
                  Your browser does not support HTML5 video playback.
                </video>

                <div className="video-meta-body" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 className="video-title" style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {translatedModuleTitle} - Video Lecture Masterclass
                    </h3>
                    <span className="duration-tag" style={{ background: '#e0f2fe', color: '#0284c7', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
                      HD Video • {translatedLessons.length} Topics
                    </span>
                  </div>
                  <p className="video-description" style={{ color: '#475569', fontSize: '14.5px', lineHeight: 1.6, margin: 0 }}>
                    {translatedModuleDesc}
                  </p>
                </div>
              </div>

              {/* Video Playlist Section */}
              <div className="card video-chapters-card" style={{ marginTop: '24px', padding: '24px' }}>
                <h4 className="chapters-card-title" style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                  Video Topics & Playlist ({translatedLessons.length})
                </h4>
                <div className="video-chapters-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {translatedLessons.map((lesson, idx) => (
                    <button
                      key={lesson.id}
                      type="button"
                      className="video-chapter-row"
                      onClick={() => handleScrollToTopic(lesson.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <PlayCircle size={20} color="#0284c7" />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>
                          Topic {idx + 1}: {lesson.title}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                        Watch Segment
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
             4. PDF VIEWER MODE
             ========================================== */}
          {selectedTab === 'pdf' && (
            <div className="textbook-pdf-mode">
              <div className="card textbook-pdf-viewer-card">
                {/* PDF Reader Toolbar */}
                <div className="pdf-viewer-toolbar">
                  <div className="pdf-toolbar-left">
                    <button className="btn btn-outlined btn-mini" onClick={() => setPdfPage(prev => Math.max(1, prev - 1))} disabled={pdfPage === 1}>
                      Previous Page
                    </button>
                    <span className="page-lbl">Page {pdfPage} / 8</span>
                    <button className="btn btn-outlined btn-mini" onClick={() => setPdfPage(prev => Math.min(8, prev + 1))} disabled={pdfPage === 8}>
                      Next Page
                    </button>
                  </div>

                  <div className="pdf-toolbar-right">
                    <button className="btn btn-outlined btn-mini" onClick={() => setPdfZoom(prev => Math.max(50, prev - 25))}>
                      Zoom Out
                    </button>
                    <span className="zoom-lbl">{pdfZoom}%</span>
                    <button className="btn btn-outlined btn-mini" onClick={() => setPdfZoom(prev => Math.min(200, prev + 25))}>
                      Zoom In
                    </button>
                    <button className="btn btn-outlined btn-mini" onClick={() => alert('Fullscreen PDF triggered')}>
                      Full Screen
                    </button>
                    <button className="btn btn-primary btn-mini" onClick={() => alert('Downloading PDF file...')}>
                      Download
                    </button>
                  </div>
                </div>

                {/* PDF Page Viewport */}
                <div className="pdf-page-canvas">
                  <div className="pdf-page-sheet" style={{ transform: `scale(${pdfZoom / 100})` }}>
                    <h3 className="sheet-pdf-title">RBC IMPORT EXPORT handbook</h3>
                    <h4 className="sheet-pdf-subtitle">{translatedModuleTitle} Study Notes</h4>
                    <hr />
                    <p className="sheet-pdf-content-text">
                      <strong>Section {pdfPage}: Reference Operational Guidelines</strong>
                      <br /><br />
                      All transactions and operations executed under international business frameworks must strictly comply
                      with destination country customs duty audits and packing verification standards.
                      Importers must check the HSN classification code prior to loading container cargos to avoid port demurrage.
                    </p>
                    <div className="sheet-pdf-footer">
                      <span>RBC Import & Export Academy • Page {pdfPage} of 8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation */}
        <div className="textbook-bottom-navigation">
          <div className="bottom-nav-row">
            <button
              className="bottom-nav-link-btn prev"
              onClick={handlePrevModule}
              disabled={!prevModule}
            >
              <ArrowLeft size={16} />
              <div className="link-details">
                <span className="direction-lbl">{t.previousModule}</span>
                <span className="title-lbl">{prevModule ? translateModuleTitle(prevModule.title, language) : 'None'}</span>
              </div>
            </button>

            <button
              className="bottom-nav-link-btn overview"
              onClick={() => setActiveView('Courses')}
            >
              <BookOpen size={16} />
              <div className="link-details">
                <span className="direction-lbl">{t.catalogOverview}</span>
                <span className="title-lbl">All Modules</span>
              </div>
            </button>

            <button
              className="bottom-nav-link-btn next"
              onClick={handleNextModule}
              disabled={!nextModule}
            >
              <div className="link-details">
                <span className="direction-lbl">{t.nextModule}</span>
                <span className="title-lbl">{nextModule ? translateModuleTitle(nextModule.title, language) : 'None'}</span>
              </div>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="bottom-nav-actions-row">
            <button
              className={`btn ${isModuleCompleted ? 'btn-outlined' : 'btn-primary'}`}
              onClick={handleToggleModuleCompletion}
            >
              <CheckCircle2 size={16} />
              <span>{isModuleCompleted ? t.completeChapter : t.markCompleted}</span>
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setActiveView('Quiz')}
            >
              <span>{t.takeChapterQuiz}</span>
              <Award size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* 3. Right Topic Sticky Navigation Sidebar */}
      <aside className="textbook-right-sidebar">
        <div className="right-sidebar-sticky-inner">
          <h4 className="sidebar-topic-title">{t.onThisPage}</h4>
          <div className="sidebar-topics-links-stack">
            {translatedLessons.map((lesson) => {
              const isActive = activeTopicId === lesson.id;
              return (
                <button
                  key={lesson.id}
                  className={`sidebar-topic-link-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleSelectFromList(lesson.id)}
                >
                  <span className="order-dot"></span>
                  <span className="topic-title-label" title={lesson.title}>{lesson.title}</span>
                </button>
              );
            })}
          </div>

          {/* Progress Tracker widget */}
          <div className="sidebar-progress-widget card">
            <div className="progress-label-row">
              <span className="lbl">{t.chapterProgress}</span>
              <span className="pct">{completionPercentage}%</span>
            </div>
            <div className="progress-bar-container mini">
              <div className="progress-bar-fill" style={{ width: `${completionPercentage}%` }}></div>
            </div>

            <button
              className={`btn btn-mini btn-full ${isModuleCompleted ? 'btn-outlined' : 'btn-primary'}`}
              onClick={handleToggleModuleCompletion}
              style={{ marginTop: '12px' }}
            >
              <span>{isModuleCompleted ? t.completeChapter : t.markCompleted}</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
