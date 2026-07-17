import React from 'react';
import { useApp } from '../context/AppContext';
import { QuizView } from '../components/QuizView';
import { translateModuleTitle, getTranslatedLesson } from '../utils/translator';
import { ArrowLeft, Award } from 'lucide-react';

export const QuizScreen: React.FC = () => {
  const { 
    selectedModuleId, 
    modules, 
    lessons, 
    language, 
    setActiveView 
  } = useApp();

  // Resolve active module
  const activeModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  const rawModuleLessons = lessons.filter(l => l.moduleId === (activeModule?.id || ''));
  const moduleLessons = rawModuleLessons.map(l => getTranslatedLesson(l, language));
  
  // Gather all quiz questions for this module
  const questions = moduleLessons.flatMap(l => l.content.quiz || []);

  const translatedTitle = activeModule ? translateModuleTitle(activeModule.title, language) : '';

  return (
    <div className="quiz-workspace-page">
      <div className="quiz-workspace-header">
        <button className="back-btn" onClick={() => setActiveView('Chapters')}>
          <ArrowLeft size={16} />
          <span>{language === 'hi' ? 'वापस जाएँ' : language === 'gu' ? 'પાછા જાઓ' : language === 'mr' ? 'मागे जा' : 'Back to Chapter'}</span>
        </button>
      </div>

      <div className="quiz-workspace-body">
        <div className="quiz-info-header-card card">
          <div className="info-meta">
            <span className="info-badge">
              {language === 'hi' ? 'अंतिम मूल्यांकन' : language === 'gu' ? 'અંતિમ મૂલ્યાંકન' : language === 'mr' ? 'अंतिम मूल्यांकन' : 'Final Assessment'}
            </span>
            <span className="dot-separator">•</span>
            <span className="info-text">{questions.length} {language === 'hi' ? 'प्रश्न' : language === 'gu' ? 'પ્રશ્નો' : language === 'mr' ? 'प्रश्न' : 'Questions'}</span>
          </div>
          <h2 className="quiz-main-title">{translatedTitle}</h2>
          <p className="quiz-main-desc">
            {language === 'hi' 
              ? 'यह परीक्षण इस अध्याय के सभी विषयों के ज्ञान का मूल्यांकन करता है। पास होने के लिए 70% अंक आवश्यक हैं।' 
              : language === 'gu'
                ? 'આ કસોટી આ પ્રકરણના તમામ વિષયોના જ્ઞાનનું મૂલ્યાંકન કરે છે. પાસ થવા માટે 70% ગુણ જરૂરી છે.'
                : language === 'mr'
                  ? 'ही चाचणी या प्रकरणातील सर्व विषयांच्या ज्ञानाचे मूल्यांकन करते. उत्तीर्ण होण्यासाठी 70% गुण आवश्यक आहेत.'
                  : 'This assessment evaluates your knowledge of all topics in this chapter. A score of 70% or higher is required to pass.'}
          </p>
        </div>

        {questions.length > 0 ? (
          <QuizView 
            lessonId={`mod-quiz-${activeModule?.id}`} 
            questions={questions}
            onComplete={() => {
              // Optional callback on finish
            }}
          />
        ) : (
          <div className="empty-quiz-card card">
            <Award size={48} className="empty-icon" />
            <h3>{language === 'hi' ? 'कोई प्रश्न उपलब्ध नहीं हैं' : language === 'gu' ? 'કોઈ પ્રશ્નો ઉપલબ્ધ નથી' : language === 'mr' ? 'कोणतेही प्रश्न उपलब्ध नाहीत' : 'No Questions Available'}</h3>
            <p>
              {language === 'hi' 
                ? 'इस अध्याय के लिए वर्तमान में कोई प्रश्नोत्तरी प्रश्न उपलब्ध नहीं हैं।' 
                : 'There are currently no quiz questions configured for this chapter.'}
            </p>
            <button className="btn btn-primary" onClick={() => setActiveView('Chapters')}>
              {language === 'hi' ? 'अध्याय पर वापस जाएं' : 'Back to Chapter'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
