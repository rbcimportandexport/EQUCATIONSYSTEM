import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { VideoPlayer } from '../components/VideoPlayer';
import { PDFViewer } from '../components/PDFViewer';
import { ImageViewer } from '../components/ImageViewer';
import { DiagramViewer } from '../components/DiagramViewer';
import { QuizView } from '../components/QuizView';
import { getTranslatedLesson, uiTranslations } from '../utils/translator';
import { 
  ArrowLeft, ArrowRight, CheckCircle, Circle, 
  Copy, Check, FileText, Bookmark, HelpCircle, 
  Info, AlertTriangle, Lightbulb 
} from 'lucide-react';

export const LessonScreen: React.FC = () => {
  const {
    courses,
    modules,
    lessons,
    progress,
    selectedCourseId,
    selectedModuleId,
    selectedLessonId,
    setSelectedModuleId,
    setSelectedLessonId,
    setActiveView,
    markLessonComplete,
    toggleBookmark,
    bookmarks,
    language
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Active state objects
  const activeCourse = courses.find(c => c.id === selectedCourseId);
  const activeModule = modules.find(m => m.id === selectedModuleId);
  
  const rawActiveLesson = lessons.find(l => l.id === selectedLessonId);
  const activeLesson = rawActiveLesson ? getTranslatedLesson(rawActiveLesson, language) : undefined;

  // Modules & Lessons scoping
  const courseModules = modules.filter(m => m.courseId === selectedCourseId);
  
  const rawModuleLessons = lessons.filter(l => l.moduleId === selectedModuleId);
  const moduleLessons = rawModuleLessons.map(l => getTranslatedLesson(l, language));

  // Scroll to top on lesson change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    setActiveFaqIndex(null);
  }, [selectedLessonId]);

  if (!activeCourse || !activeModule || !activeLesson) {
    return (
      <div className="card error-lesson-card">
        <h3>No Lesson Selected</h3>
        <p>Please select a lesson from the curriculum outline.</p>
        <button className="btn btn-primary" onClick={() => setActiveView('Chapters')}>
          View Modules
        </button>
      </div>
    );
  }

  // Next and Previous Lesson navigation calculators
  const currentIdx = moduleLessons.findIndex(l => l.id === activeLesson.id);
  const prevLesson = currentIdx > 0 ? moduleLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < moduleLessons.length - 1 ? moduleLessons[currentIdx + 1] : null;

  // Cross module navigation logic
  const currentModIdx = courseModules.findIndex(m => m.id === activeModule.id);
  const nextModule = currentModIdx < courseModules.length - 1 ? courseModules[currentModIdx + 1] : null;
  const prevModule = currentModIdx > 0 ? courseModules[currentModIdx - 1] : null;

  const handlePrevLesson = () => {
    if (prevLesson) {
      setSelectedLessonId(prevLesson.id);
    } else if (prevModule) {
      const prevModLessons = lessons.filter(l => l.moduleId === prevModule.id);
      if (prevModLessons.length > 0) {
        setSelectedModuleId(prevModule.id);
        setSelectedLessonId(prevModLessons[prevModLessons.length - 1].id);
      }
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      setSelectedLessonId(nextLesson.id);
    } else if (nextModule) {
      const nextModLessons = lessons.filter(l => l.moduleId === nextModule.id);
      if (nextModLessons.length > 0) {
        setSelectedModuleId(nextModule.id);
        setSelectedLessonId(nextModLessons[0].id);
      }
    } else {
      markLessonComplete(activeLesson.id, true);
      alert('Congratulations! You have completed the final lesson of this course. Check out your certificate on the Profile tab!');
      setActiveView('Profile');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const isLessonBookmarked = bookmarks.some(b => b.lessonId === activeLesson.id && b.type === 'lesson');
  const handleBookmarkLesson = () => {
    toggleBookmark({
      type: 'lesson',
      title: activeLesson.title,
      courseId: selectedCourseId || 'import-export-master',
      moduleId: selectedModuleId || undefined,
      lessonId: activeLesson.id
    });
  };

  const isCompleted = progress[activeLesson.id]?.completed || false;

  const t = uiTranslations[language];

  return (
    <div className="lesson-workspace-view">
      {/* 1. Module Syllabus Outline Sidebar */}
      <div className="lesson-outline-sidebar">
        <div className="sidebar-header-outline">
          <span className="outline-subtitle">{activeCourse.title}</span>
          <h4 className="outline-title" title={activeModule.title}>{activeModule.title}</h4>
        </div>

        <div className="outline-lessons-stack">
          {moduleLessons.map((l, index) => {
            const isLActive = l.id === activeLesson.id;
            const isLDone = progress[l.id]?.completed || false;

            return (
              <button
                key={l.id}
                className={`outline-lesson-item ${isLActive ? 'active' : ''} ${isLDone ? 'completed' : ''}`}
                onClick={() => setSelectedLessonId(l.id)}
              >
                <div className="lesson-item-status">
                  {isLDone ? (
                    <CheckCircle size={14} className="status-icon done" />
                  ) : (
                    <Circle size={14} className="status-icon pending" />
                  )}
                </div>
                <div className="lesson-item-details">
                  <span className="lesson-item-order">
                    {language === 'hi' ? 'पाठ' : language === 'gu' ? 'પાઠ' : language === 'mr' ? 'पाठ' : 'Lesson'} {l.order || index + 1}
                  </span>
                  <span className="lesson-item-title" title={l.title}>{l.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <button className="back-chapters-btn" onClick={() => setActiveView('Chapters')}>
          <ArrowLeft size={14} />
          <span>{language === 'hi' ? 'मॉड्यूल ब्लूप्रिंट' : language === 'gu' ? 'મોડ્યુલ બ્લુપ્રિન્ટ' : language === 'mr' ? 'मॉड्यूल ब्लूप्रिंट' : 'Module Blueprint'}</span>
        </button>
      </div>

      {/* 2. Structured Scrollable Lesson Workspace */}
      <div className="lesson-content-viewport" ref={scrollRef}>
        <div className="lesson-content-inner">
          
          {/* Top Actions: Bookmark & Status */}
          <div className="lesson-action-top-row">
            <button 
              className={`lesson-action-btn ${isLessonBookmarked ? 'active' : ''}`} 
              onClick={handleBookmarkLesson}
            >
              <Bookmark size={16} fill={isLessonBookmarked ? "currentColor" : "none"} />
              <span>{isLessonBookmarked ? t.bookmarked : t.bookmark}</span>
            </button>

            <button 
              className={`lesson-action-btn complete-btn ${isCompleted ? 'completed' : ''}`}
              onClick={() => markLessonComplete(activeLesson.id, !isCompleted)}
            >
              <CheckCircle size={16} />
              <span>{isCompleted ? t.completed : t.markCompleted}</span>
            </button>
          </div>

          {/* 1. Lesson Title & Definition */}
          <h1 className="lesson-workspace-title">{activeLesson.title}</h1>
          <hr className="divider" />
          
          <div className="lesson-section-block">
            <h3 className="section-subtitle-inner">{t.definition}</h3>
            <p className="lesson-definition-text">{activeLesson.content.definition}</p>
          </div>

          {/* 2. Why it is Important (Callout box) */}
          <div className="callout important objectives-box">
            <div className="callout-title">
              <Info size={18} />
              <span>{t.whyImportant}</span>
            </div>
            <p className="callout-desc-text">{activeLesson.content.whyImportant}</p>
          </div>

          {/* 3. Detailed Explanation */}
          <div className="written-explanation-section">
            <h3 className="section-subtitle-inner">{t.simpleExplanation}</h3>
            {activeLesson.content.writtenExplanation.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i} className="explanation-paragraph">{paragraph}</p>
            ))}
          </div>

          {/* 4. Business Example */}
          <div className="business-example-card card">
            <h3 className="example-title">{t.realBusinessExample}</h3>
            <p className="example-text">{activeLesson.content.businessExample}</p>
          </div>

          {/* Technical Diagrams (SVG flowchart, if present) */}
          {activeLesson.content.diagram && (
            <DiagramViewer data={activeLesson.content.diagram} />
          )}

          {/* Code Blocks (if present) */}
          {/* Code Blocks (if present) */}
          {activeLesson.content.codeBlock && (
            <div className="code-block-wrapper card">
              <div className="code-block-header">
                <span className="code-lang-label">{activeLesson.content.codeBlock.language}</span>
                <button 
                  className="copy-code-btn"
                  onClick={() => handleCopyCode(activeLesson.content.codeBlock!.code)}
                  title="Copy code to clipboard"
                >
                  {copiedCode ? <Check size={14} color="var(--md-sys-color-success)" /> : <Copy size={14} />}
                  <span>{copiedCode ? (language === 'hi' ? 'कॉपी हो गया!' : language === 'gu' ? 'કોપી થઈ ગયું!' : language === 'mr' ? 'कॉपी झाले!' : 'Copied!') : (language === 'hi' ? 'कॉपी करें' : language === 'gu' ? 'કોપી કરો' : language === 'mr' ? 'कॉपी करा' : 'Copy')}</span>
                </button>
              </div>
              <pre className="code-pre">
                <code className="code-element">{activeLesson.content.codeBlock.code}</code>
              </pre>
            </div>
          )}

          {/* 5. Images with Captions */}
          {activeLesson.content.images && activeLesson.content.images.length > 0 && (
            <ImageViewer images={activeLesson.content.images} />
          )}

          {/* 6. Embedded Video Player */}
          {activeLesson.content.video && (
            <div className="media-player-block">
              <h3 className="section-subtitle">{language === 'hi' ? 'वीडियो व्याख्यान' : language === 'gu' ? 'વિડિઓ લેક્ચર' : language === 'mr' ? 'व्हिडिओ व्याख्यान' : 'Video Lecture'}</h3>
              <VideoPlayer
                lessonId={activeLesson.id}
                videoUrl={activeLesson.content.video.videoUrl}
                thumbnail={activeLesson.content.video.thumbnail}
                duration={activeLesson.content.video.duration}
              />
            </div>
          )}

          {/* 7. Built-in PDF Notes */}
          {activeLesson.content.pdf && (
            <div className="pdf-viewer-block">
              <h3 className="section-subtitle">{language === 'hi' ? 'अध्ययन पुस्तिका और तकनीकी स्लाइड्स' : language === 'gu' ? 'અભ્યાસ પુસ્તિકા અને તકનીકી સ્લાઇડ્સ' : language === 'mr' ? 'अभ्यास पुस्तिका आणि तांत्रिक स्लाइड्स' : 'Study Handbook & Technical Slides'}</h3>
              <PDFViewer
                lessonId={activeLesson.id}
                pdfUrl={activeLesson.content.pdf.pdfUrl}
                title={activeLesson.content.pdf.title}
                totalPages={activeLesson.content.pdf.totalPages}
                mockPagesText={activeLesson.content.pdf.mockPagesText}
              />
            </div>
          )}

          {/* 8. Download Option */}
          {activeLesson.content.downloadOption && (
            <div className="attachments-card card">
              <h3 className="card-title">{language === 'hi' ? 'डाउनलोड करने योग्य उपकरण' : language === 'gu' ? 'ડાઉનલોડ કરવા યોગ્ય સાધનો' : language === 'mr' ? 'डाउनलोड करण्यायोग्य साधने' : 'Downloadable Operations Tools'}</h3>
              <div className="attachments-list">
                <div className="attachment-item-row">
                  <div className="att-left">
                    <FileText size={18} color="var(--md-sys-color-primary)" />
                    <span className="att-name">
                      {activeLesson.content.downloadOption.title} ({activeLesson.content.downloadOption.size})
                    </span>
                  </div>
                  <button 
                    className="btn btn-outlined btn-mini"
                    onClick={() => alert(`Simulating file download: ${activeLesson.content.downloadOption.title}`)}
                  >
                    Download File
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 9. Related Topics */}
          {activeLesson.content.relatedTopics && activeLesson.content.relatedTopics.length > 0 && (
            <div className="related-topics-section">
              <span className="related-label">{language === 'hi' ? 'संबंधित शब्द:' : language === 'gu' ? 'સંબંધિત શબ્દો:' : language === 'mr' ? 'संबंधित संज्ञा:' : 'Related Terms:'}</span>
              <div className="related-tags-row">
                {activeLesson.content.relatedTopics.map((topic: string, idx: number) => (
                  <span key={idx} className="badge badge-secondary">{topic}</span>
                ))}
              </div>
            </div>
          )}

          {/* 10. Frequently Asked Questions (Collapsible lists) */}
          {activeLesson.content.faqs && activeLesson.content.faqs.length > 0 && (
            <div className="faqs-block-section">
              <h3 className="section-subtitle">{language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : language === 'gu' ? 'વારંવાર પૂછાતા પ્રશ્નો (FAQ)' : language === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न (FAQ)' : 'Frequently Asked Questions (FAQ)'}</h3>
              <div className="faqs-stack">
                {activeFaqIndex !== undefined && activeLesson.content.faqs.map((faq: { question: string; answer: string }, idx: number) => {
                  const isOpen = activeFaqIndex === idx;
                  return (
                    <div key={idx} className="faq-item-card card">
                      <button 
                        className="faq-question-btn"
                        onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                      >
                        <HelpCircle size={16} />
                        <span className="faq-question">{faq.question}</span>
                      </button>
                      {isOpen && (
                        <div className="faq-answer-panel">
                          <p className="faq-answer">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 11. Common Mistakes (Warning Callouts) */}
          {activeLesson.content.commonMistakes && activeLesson.content.commonMistakes.length > 0 && (
            <div className="common-mistakes-section">
              <div className="callout warning note-box">
                <div className="callout-title text-danger">
                  <AlertTriangle size={18} />
                  <span>{t.commonMistakes}</span>
                </div>
                <ul className="mistakes-list">
                  {activeLesson.content.commonMistakes.map((mistake: string, idx: number) => (
                    <li key={idx} className="mistake-item">{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 12. Practical Tips (Checklist Card) */}
          {activeLesson.content.practicalTips && activeLesson.content.practicalTips.length > 0 && (
            <div className="practical-tips-card card">
              <h3 className="card-title text-success">
                <Lightbulb size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                <span>{t.practicalTip}</span>
              </h3>
              <ul className="tips-list">
                {activeLesson.content.practicalTips.map((tip: string, idx: number) => (
                  <li key={idx} className="tip-item">
                    <span className="bullet text-success">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 13. Summary */}
          {activeLesson.content.summary && (
            <div className="summary-banner card">
              <p><strong>{t.topicSummary}:</strong> {activeLesson.content.summary}</p>
            </div>
          )}

          {/* Practice Quiz Section */}
          {activeLesson.content.quiz && activeLesson.content.quiz.length > 0 && (
            <div className="practice-quiz-section">
              <h3 className="section-subtitle">{t.takeChapterQuiz}</h3>
              <QuizView
                lessonId={activeLesson.id}
                questions={activeLesson.content.quiz}
              />
            </div>
          )}

          {/* Navigation Controls */}
          <div className="lesson-navigation-footer">
            <button 
              className="btn btn-secondary" 
              onClick={handlePrevLesson}
              disabled={!prevLesson && !prevModule}
            >
              <ArrowLeft size={16} />
              <span>{language === 'hi' ? 'पिछला पाठ' : language === 'gu' ? 'પાછલો પાઠ' : language === 'mr' ? 'मागील पाठ' : 'Previous Lesson'}</span>
            </button>

            <button className="btn btn-primary" onClick={handleNextLesson}>
              <span>{nextLesson || nextModule ? (language === 'hi' ? 'अगला पाठ' : language === 'gu' ? 'આગલો પાઠ' : language === 'mr' ? 'पुढील पाठ' : 'Next Lesson') : (language === 'hi' ? 'कोर्स समाप्त करें' : language === 'gu' ? 'કોર્સ પૂર્ણ કરો' : language === 'mr' ? 'कोर्स पूर्ण करा' : 'Finish Course')}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
