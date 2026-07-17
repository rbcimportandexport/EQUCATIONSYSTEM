import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, Image, Video, FileText, Download, Bookmark, 
  ChevronRight, ChevronDown, Award, Play, Pause, Maximize, 
  ArrowLeft, ArrowRight, CheckCircle2, Volume2
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
    language
  } = useApp();

  const [selectedTab, setSelectedTab] = useState<'read' | 'images' | 'video' | 'pdf'>('read');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string>('');
  
  // Accordion state: map of lessonId -> boolean (whether expanded)
  const [expandedTopics, setExpandedTopics] = useState<{ [topicId: string]: boolean }>({});

  // Video player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState(1);

  // PDF states
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  // Tablet topic dropdown state
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Active module data
  const activeModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  const moduleLessons = lessons.filter(l => l.moduleId === (activeModule?.id || ''));

  // Translate all lessons dynamically on load for the active language
  const translatedLessons = moduleLessons.map(l => getTranslatedLesson(l, language));

  // Get active translation keys
  const t = uiTranslations[language];

  // Calculate stats
  const totalTopics = translatedLessons.length;
  const totalEstDuration = translatedLessons.reduce((acc, curr) => acc + curr.duration, 0);

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

  // Set default active topic & clear accordion on module change
  useEffect(() => {
    if (translatedLessons.length > 0) {
      setActiveTopicId(translatedLessons[0].id);
      setExpandedTopics({});
    }
    setSelectedTab('read');
    setPdfPage(1);
    setIsPlaying(false);
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

  // Cross-module navigators
  const currentModIndex = modules.findIndex(m => m.id === activeModule?.id);
  const prevModule = currentModIndex > 0 ? modules[currentModIndex - 1] : null;
  const nextModule = currentModIndex < modules.length - 1 ? modules[currentModIndex + 1] : null;

  const handlePrevModule = () => {
    if (prevModule) setSelectedModuleId(prevModule.id);
  };

  const handleNextModule = () => {
    if (nextModule) setSelectedModuleId(nextModule.id);
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
    <div className="textbook-screen-layout">
      {/* 2. Main Chapter Reading & Interactive workspace */}
      <div className="textbook-workspace-viewport" ref={scrollContainerRef}>
        
        {/* Textbook Header Banner */}
        <div className="textbook-chapter-header">
          <div className="header-meta-row">
            <span className="module-badge">
              {language === 'hi' ? 'मॉड्यूल' : language === 'gu' ? 'મોડ્યુલ' : language === 'mr' ? 'मॉड्यूल' : 'Module'} {activeModule.order}
            </span>
            <span className="dot-separator">•</span>
            <span className="metadata-pill">{totalTopics} {t.topics}</span>
            <span className="dot-separator">•</span>
            <span className="metadata-pill">{t.estTime}: {totalEstDuration} {t.minutes}</span>
            <span className="dot-separator">•</span>
            <span className="metadata-pill">{t.beginnerLevel}</span>
          </div>

          <h1 className="chapter-main-title">{translatedModuleTitle}</h1>
          <p className="chapter-main-desc">{translatedModuleDesc}</p>
        </div>

        {/* Resource Toolbar */}
        <div className="textbook-resource-toolbar">
          <div className="toolbar-horizontal-scroll">
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
            <div className="download-dropdown-wrapper">
              <button 
                className={`toolbar-btn download-btn ${isDownloadOpen ? 'active' : ''}`}
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              >
                <Download size={16} />
                <span>{t.download}</span>
                <ChevronDown size={14} />
              </button>

              {isDownloadOpen && (
                <div className="download-dropdown-panel card">
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
                    a.href = url; a.download = `${moduleTitle.replace(/\s+/g,'-')}.html`;
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
                    a.href = url; a.download = `${moduleTitle.replace(/\s+/g,'-')}-notes.txt`;
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
                    a.href = url; a.download = `${moduleTitle.replace(/\s+/g,'-')}-complete.html`;
                    a.click(); URL.revokeObjectURL(url);
                    setIsDownloadOpen(false);
                  }}>
                    {t.downloadCompleteModule}
                  </button>
                  <button onClick={() => { setIsDownloadOpen(false); setActiveView('Downloads'); }}>
                    {t.saveOffline}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

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
                                  if (window.speechSynthesis.speaking) {
                                    window.speechSynthesis.cancel();
                                    return;
                                  }
                                  const text = [
                                    lesson.title,
                                    lesson.content?.definition,
                                    lesson.content?.simpleExplanation,
                                    lesson.content?.whyItMatters,
                                    ...(lesson.content?.keyPoints || [])
                                  ].filter(Boolean).join('. ');
                                  const utter = new SpeechSynthesisUtterance(text);
                                  
                                  const voices = window.speechSynthesis.getVoices();
                                  const langCodes: Record<string, string> = {
                                    hi: 'hi-IN',
                                    gu: 'gu-IN',
                                    mr: 'mr-IN',
                                    en: 'en-US'
                                  };
                                  const targetLang = langCodes[language] || 'en-US';

                                  // 1. Try exact match
                                  let voice = voices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase());
                                  
                                  // 2. Try prefix match (e.g. starts with 'gu' or 'mr')
                                  if (!voice) {
                                    voice = voices.find(v => v.lang.toLowerCase().startsWith(language));
                                  }

                                  // 3. Fallback for Indian languages (Gujarati/Marathi) to Hindi if target voice is missing in OS
                                  if (!voice && (language === 'gu' || language === 'mr')) {
                                    voice = voices.find(v => v.lang.toLowerCase().includes('hi-in') || v.lang.toLowerCase().startsWith('hi'));
                                  }

                                  if (voice) {
                                    utter.voice = voice;
                                    utter.lang = voice.lang;
                                  } else {
                                    utter.lang = targetLang;
                                  }

                                  utter.rate = 0.9;
                                  window.speechSynthesis.speak(utter);
                                }}
                                title="Listen to this lesson"
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '5px',
                                  padding: '4px 10px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                  background: '#f8fafc', cursor: 'pointer',
                                  fontSize: '12px', color: '#3b82f6', fontWeight: '600'
                                }}
                              >
                                <Volume2 size={13} />
                                <span>{language === 'hi' ? 'सुनें' : language === 'gu' ? 'સાંભળો' : 'Listen'}</span>
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
              <div className="card video-workspace-card">
                {/* Simulated video player */}
                <div className="textbook-video-viewport">
                  <div className="simulated-video-screen">
                    <Video size={48} color="white" />
                    <span>Watch Lesson Video Guide</span>
                    <button className="video-play-pause-overlay-btn" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                  </div>
                  {/* Controls bar */}
                  <div className="video-custom-controls-bar">
                    <button className="ctrl-icon-btn" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span className="duration-label">02:15 / 18:30</span>
                    <div className="video-scrub-bar">
                      <div className="scrub-bar-fill" style={{ width: '12%' }}></div>
                    </div>
                    <select 
                      className="speed-selector"
                      value={videoSpeed}
                      onChange={e => setVideoSpeed(Number(e.target.value))}
                    >
                      <option value={1}>1.0x Speed</option>
                      <option value={1.25}>1.25x Speed</option>
                      <option value={1.5}>1.5x Speed</option>
                      <option value={2}>2.0x Speed</option>
                    </select>
                    <button className="ctrl-icon-btn" onClick={() => alert('Vessel playback fullscreen triggered')} title="Fullscreen">
                      <Maximize size={16} />
                    </button>
                  </div>
                </div>

                <div className="video-meta-body">
                  <h3 className="video-title">{translatedModuleTitle} - Video Lecture Series</h3>
                  <span className="duration-tag">Duration: 18:30 mins</span>
                  <p className="video-description">
                    This comprehensive video guide covers the core operational systems defined in {translatedModuleTitle}. 
                    Follow the industry experts explaining the real-world business models.
                  </p>
                </div>
              </div>

              {/* Video Chapters section */}
              <div className="card video-chapters-card">
                <h4 className="chapters-card-title">Video Chapters</h4>
                <div className="video-chapters-timeline">
                  {translatedLessons.map((lesson, idx) => (
                    <button 
                      key={lesson.id}
                      className="video-chapter-row"
                      onClick={() => alert(`Seeking video to segment: ${lesson.title}`)}
                    >
                      <span className="chapter-timestamp">
                        {String(Math.floor((idx * 1.8))).padStart(2, '0')}:00
                      </span>
                      <span className="chapter-name">{lesson.title}</span>
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
