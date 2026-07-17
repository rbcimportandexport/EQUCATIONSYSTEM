import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../utils/data';
import { useApp } from '../context/AppContext';
import { HelpCircle, Check, X, ArrowRight, RotateCcw, Award } from 'lucide-react';

interface QuizViewProps {
  lessonId: string;
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ lessonId, questions, onComplete }) => {
  const { saveQuizScore, language } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load progress and reset on lessonId update
  useEffect(() => {
    setCurrentIdx(0);
    setSelectedOptions([]);
    setTypedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setQuizFinished(false);
  }, [lessonId]);

  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[currentIdx];

  const handleOptionToggle = (optionIdx: string) => {
    if (isAnswered) return;

    if (currentQuestion.type === 'mcq' || currentQuestion.type === 'true-false') {
      setSelectedOptions([optionIdx]);
    } else if (currentQuestion.type === 'multi-answer') {
      setSelectedOptions(prev => 
        prev.includes(optionIdx) 
          ? prev.filter(o => o !== optionIdx) 
          : [...prev, optionIdx]
      );
    }
  };

  const checkAnswer = () => {
    if (isAnswered) return;

    let correct = false;

    if (currentQuestion.type === 'mcq' || currentQuestion.type === 'true-false') {
      correct = selectedOptions[0] === currentQuestion.correctAnswers[0];
    } else if (currentQuestion.type === 'multi-answer') {
      // Sort and compare arrays
      const sortedSelected = [...selectedOptions].sort();
      const sortedCorrect = [...currentQuestion.correctAnswers].sort();
      correct = 
        sortedSelected.length === sortedCorrect.length && 
        sortedSelected.every((val, i) => val === sortedCorrect[i]);
    } else if (currentQuestion.type === 'fill-blank') {
      const formattedInput = typedAnswer.trim().toLowerCase();
      correct = currentQuestion.correctAnswers.some(ans => ans.trim().toLowerCase() === formattedInput);
    }

    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
      setScore(s => s + 1);
    }

    // Save score in context progress
    saveQuizScore(lessonId, currentQuestion.id, correct);
  };

  const handleNext = () => {
    setSelectedOptions([]);
    setTypedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
      if (onComplete) onComplete();
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptions([]);
    setTypedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const passed = score >= questions.length * 0.7; // 70% to pass
    return (
      <div className="quiz-result-card card">
        <Award size={48} className={`result-medal ${passed ? 'success' : 'fail'}`} />
        <h3 className="result-title">
          {passed 
            ? (language === 'hi' ? 'मूल्यांकन पूरा हुआ!' : language === 'gu' ? 'મૂલ્યાંકન પૂર્ણ થયું!' : language === 'mr' ? 'मूल्यांकन पूर्ण झाले!' : 'Assessment Completed!')
            : (language === 'hi' ? 'सीखते रहें!' : language === 'gu' ? 'શીખતા રહો!' : language === 'mr' ? 'शिकत राहा!' : 'Keep Learning!')}
        </h3>
        <p className="result-score-label">
          {language === 'hi' 
            ? <>आपने <strong className="score-span">{questions.length}</strong> में से <strong className="score-span">{score}</strong> प्रश्नों का सही उत्तर दिया।</>
            : language === 'gu'
              ? <>તમે <strong className="score-span">{questions.length}</strong> માંથી <strong className="score-span">{score}</strong> પ્રશ્નોના સાચા જવાબ આપ્યા.</>
              : language === 'mr'
                ? <>तुम्ही <strong className="score-span">{questions.length}</strong> पैकी <strong className="score-span">{score}</strong> प्रश्नांची अचूक उत्तरे दिली.</>
                : <>You scored <strong className="score-span">{score}</strong> out of <strong className="score-span">{questions.length}</strong> questions correctly.</>}
        </p>
        
        <div className="progress-bar-container large">
          <div 
            className={`progress-bar-fill ${passed ? 'success' : 'warning'}`} 
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="result-actions">
          <button className="btn btn-outlined" onClick={resetQuiz}>
            <RotateCcw size={16} />
            <span>{language === 'hi' ? 'पुनः प्रयास करें' : language === 'gu' ? 'ફરીથી પ્રયાસ કરો' : language === 'mr' ? 'पुन्हा प्रयत्न करा' : 'Retry Quiz'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container card">
      <div className="quiz-header">
        <div className="quiz-meta">
          <HelpCircle size={18} className="meta-icon" />
          <span className="quiz-count">
            {language === 'hi' 
              ? `प्रश्न ${currentIdx + 1} / ${questions.length}` 
              : language === 'gu' 
                ? `પ્રશ્ન ${currentIdx + 1} / ${questions.length}` 
                : language === 'mr' 
                  ? `प्रश्न ${currentIdx + 1} / ${questions.length}` 
                  : `Question ${currentIdx + 1} of ${questions.length}`}
          </span>
        </div>
        <span className="quiz-badge">
          {language === 'hi' ? 'अभ्यास जांच' : language === 'gu' ? 'અભ્યાસ ચકાસણી' : language === 'mr' ? 'सराव चाचणी' : 'Practice Check'}
        </span>
      </div>

      <h4 className="quiz-question-text">{currentQuestion.question}</h4>

      {/* Answer Inputs based on Question type */}
      <div className="quiz-answers-block">
        {currentQuestion.type === 'fill-blank' ? (
          <div className="fill-blank-wrapper">
            <input
              type="text"
              placeholder={language === 'hi' ? 'यहाँ अपना उत्तर लिखें...' : language === 'gu' ? 'અહીં તમારો જવાબ લખો...' : language === 'mr' ? 'तुमचे उत्तर येथे लिहा...' : 'Type your answer here...'}
              value={typedAnswer}
              onChange={e => setTypedAnswer(e.target.value)}
              disabled={isAnswered}
              className="input-field"
            />
          </div>
        ) : (
          <div className="options-list">
            {currentQuestion.options?.map((option, idx) => {
              const optionStr = idx.toString();
              const isSelected = selectedOptions.includes(optionStr);
              
              let optionClass = 'option-item';
              if (isSelected) optionClass += ' selected';
              
              if (isAnswered) {
                const isCorrectOption = currentQuestion.correctAnswers.includes(optionStr);
                if (isCorrectOption) {
                  optionClass += ' correct';
                } else if (isSelected) {
                  optionClass += ' incorrect';
                }
              }

              return (
                <button
                  key={idx}
                  className={optionClass}
                  onClick={() => handleOptionToggle(optionStr)}
                  disabled={isAnswered}
                >
                  <span className="option-bullet">
                    {currentQuestion.type === 'multi-answer' ? (
                      <input 
                        type="checkbox" 
                        checked={isSelected} 
                        readOnly 
                        disabled={isAnswered} 
                      />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span className="option-label">{option}</span>
                </button>
              );
            })}

            {/* True/False Options explicitly if no options are parsed */}
            {currentQuestion.type === 'true-false' && (
              <div className="tf-row">
                {['true', 'false'].map((val) => {
                  const isSelected = selectedOptions[0] === val;
                  
                  let optionClass = 'option-item tf-btn';
                  if (isSelected) optionClass += ' selected';
                  
                  if (isAnswered) {
                    const isCorrectOption = currentQuestion.correctAnswers[0] === val;
                    if (isCorrectOption) {
                      optionClass += ' correct';
                    } else if (isSelected) {
                      optionClass += ' incorrect';
                    }
                  }

                  return (
                    <button
                      key={val}
                      className={optionClass}
                      onClick={() => handleOptionToggle(val)}
                      disabled={isAnswered}
                    >
                      <span>
                        {val === 'true' 
                          ? (language === 'hi' ? 'सत्य (True)' : language === 'gu' ? 'સાચું (True)' : language === 'mr' ? 'सत्य (True)' : 'True')
                          : (language === 'hi' ? 'असत्य (False)' : language === 'gu' ? 'ખોટું (False)' : language === 'mr' ? 'असत्य (False)' : 'False')}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Answer feedback section */}
      {isAnswered && (
        <div className={`quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-header">
            {isCorrect ? (
              <>
                <Check size={18} color="var(--md-sys-color-success)" />
                <span className="feedback-result-title correct">
                  {language === 'hi' ? 'सही उत्तर!' : language === 'gu' ? 'સાચો જવાબ!' : language === 'mr' ? 'योग्य उत्तर!' : 'Correct Answer!'}
                </span>
              </>
            ) : (
              <>
                <X size={18} color="var(--md-sys-color-error)" />
                <span className="feedback-result-title incorrect">
                  {language === 'hi' ? 'गलत उत्तर' : language === 'gu' ? 'ખોટો જવાબ' : language === 'mr' ? 'चुकीचे उत्तर' : 'Incorrect Answer'}
                </span>
              </>
            )}
          </div>
          <div className="feedback-explanation">
            <p className="explanation-paragraph">{currentQuestion.explanation}</p>
            {!isCorrect && (
              <p className="correct-revealed-text">
                {language === 'hi' ? 'सही उत्तर:' : language === 'gu' ? 'સાચો જવાબ:' : language === 'mr' ? 'योग्य उत्तर:' : 'Correct answer:'} <strong>
                  {currentQuestion.type === 'fill-blank' 
                    ? currentQuestion.correctAnswers.join(' / ') 
                    : currentQuestion.type === 'true-false'
                      ? currentQuestion.correctAnswers[0] === 'true' 
                        ? (language === 'hi' ? 'सत्य (True)' : language === 'gu' ? 'સાચું (True)' : 'True')
                        : (language === 'hi' ? 'असत्य (False)' : language === 'gu' ? 'ખોટું (False)' : 'False')
                      : currentQuestion.correctAnswers.map(ansIdx => currentQuestion.options?.[parseInt(ansIdx)]).join(', ')}
                </strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer controls */}
      <div className="quiz-footer">
        {!isAnswered ? (
          <button 
            className="btn btn-primary"
            onClick={checkAnswer}
            disabled={
              (currentQuestion.type === 'fill-blank' && !typedAnswer.trim()) ||
              (currentQuestion.type !== 'fill-blank' && selectedOptions.length === 0)
            }
          >
            <span>{language === 'hi' ? 'उत्तर सबमिट करें' : language === 'gu' ? 'જવાબ સબમિટ કરો' : language === 'mr' ? 'उत्तर सबमिट करा' : 'Submit Answer'}</span>
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            <span>
              {currentIdx < questions.length - 1 
                ? (language === 'hi' ? 'अगला प्रश्न' : language === 'gu' ? 'આગલો પ્રશ્ન' : language === 'mr' ? 'पुढील प्रश्न' : 'Next Question') 
                : (language === 'hi' ? 'क्विज़ समाप्त करें' : language === 'gu' ? 'ક્વિઝ પૂર્ણ કરો' : language === 'mr' ? 'क्विझ पूर्ण करा' : 'Finish Quiz')}
            </span>
            <ArrowRight size={16} />
          </button>
        )}
    </div>
  );
};
