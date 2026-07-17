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
  const { saveQuizScore, language, currentUser } = useApp();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationVisible, setCelebrationVisible] = useState(false);

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
      setShowCelebration(true);
      setTimeout(() => setCelebrationVisible(true), 50);
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
    setShowCelebration(false);
    setCelebrationVisible(false);
  };

  if (quizFinished) {
    const passed = score >= questions.length * 0.7;
    const pct = Math.round((score / questions.length) * 100);
    const userName = currentUser?.name || (language === 'hi' ? 'विद्यार्थी' : language === 'gu' ? 'વિદ્યાર્થી' : 'Student');
    const CONFETTI_COLORS = ['#fbbf24','#f97316','#ec4899','#8b5cf6','#3b82f6','#10b981','#ef4444','#06b6d4'];
    const confettiPieces = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1.2}s`,
      size: `${6 + Math.random() * 8}px`,
      rotation: `${Math.random() * 360}deg`,
      duration: `${1.5 + Math.random() * 1.5}s`
    }));

    return (
      <>
        {/* Celebration Overlay */}
        {showCelebration && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(6px)',
            opacity: celebrationVisible ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}>
            {/* Confetti */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
              {confettiPieces.map(p => (
                <div key={p.id} style={{
                  position: 'absolute',
                  top: '-20px',
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  transform: `rotate(${p.rotation})`,
                  animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`
                }} />
              ))}
            </div>

            {/* Main Card */}
            <div style={{
              position: 'relative', zIndex: 1,
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '28px',
              padding: '48px 56px',
              textAlign: 'center',
              maxWidth: '520px',
              width: '90%',
              transform: celebrationVisible ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(40px)',
              opacity: celebrationVisible ? 1 : 0,
              transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6)'
            }}>
              {/* Trophy / Badge */}
              <div style={{
                fontSize: '72px',
                lineHeight: 1,
                marginBottom: '12px',
                filter: 'drop-shadow(0 4px 16px rgba(251,191,36,0.6))',
                animation: 'trophyBounce 0.8s 0.3s cubic-bezier(0.34,1.56,0.64,1) both'
              }}>
                {passed ? '🏆' : '📚'}
              </div>

              {/* Congrats text */}
              <p style={{
                margin: '0 0 4px',
                fontSize: '13px', fontWeight: '700', letterSpacing: '3px',
                color: '#fbbf24', textTransform: 'uppercase'
              }}>
                {passed
                  ? (language === 'hi' ? 'बधाई हो!' : language === 'gu' ? 'અભિનંદન!' : 'Congratulations!')
                  : (language === 'hi' ? 'अच्छा प्रयास!' : language === 'gu' ? 'સારો પ્રયાસ!' : 'Great Effort!')}
              </p>

              {/* Big Name */}
              <h1 style={{
                margin: '0 0 20px',
                fontSize: '38px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #fbbf24, #f97316, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
                letterSpacing: '-1px'
              }}>
                {userName}
              </h1>

              {/* Score Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                background: passed ? 'rgba(34,197,94,0.12)' : 'rgba(251,191,36,0.12)',
                border: `2px solid ${passed ? 'rgba(34,197,94,0.4)' : 'rgba(251,191,36,0.4)'}`,
                borderRadius: '20px', padding: '12px 28px',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '36px', fontWeight: '900', color: passed ? '#4ade80' : '#fbbf24' }}>
                  {score}/{questions.length}
                </span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: passed ? '#4ade80' : '#fbbf24' }}>{pct}%</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                    {passed
                      ? (language === 'hi' ? 'उत्तीर्ण ✓' : language === 'gu' ? 'પાસ ✓' : 'PASSED ✓')
                      : (language === 'hi' ? 'फिर कोशिश करें' : language === 'gu' ? 'ફરી પ્રयास' : 'TRY AGAIN')}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden', marginBottom: '28px' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: passed
                    ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                    : 'linear-gradient(90deg, #fbbf24, #f97316)',
                  borderRadius: '8px',
                  transition: 'width 1s ease 0.5s',
                  boxShadow: passed ? '0 0 12px rgba(34,197,94,0.5)' : '0 0 12px rgba(251,191,36,0.5)'
                }} />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                  onClick={() => { setShowCelebration(false); setCelebrationVisible(false); }}
                  style={{
                    padding: '12px 28px', borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer'
                  }}
                >
                  {language === 'hi' ? 'परिणाम देखें' : language === 'gu' ? 'પરિણામ જુઓ' : 'View Result'}
                </button>
                <button
                  onClick={resetQuiz}
                  style={{
                    padding: '12px 28px', borderRadius: '12px', border: 'none',
                    background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                    color: '#1e293b', fontWeight: '800', fontSize: '14px', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(251,191,36,0.4)'
                  }}
                >
                  🔁 {language === 'hi' ? 'दोबारा खेलें' : language === 'gu' ? 'ફરી રમો' : 'Play Again'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Background result card (shown after overlay dismissed) */}
        <div className="quiz-result-card card">
          <Award size={48} className={`result-medal ${passed ? 'success' : 'fail'}`} />
          <h3 className="result-title">
            {passed
              ? (language === 'hi' ? 'मूल्यांकन पूरा हुआ!' : language === 'gu' ? 'મૂલ્યાંકન પૂર્ણ થયું!' : language === 'mr' ? 'मूल्यांकन पूर्ण झाले!' : 'Assessment Completed!')
              : (language === 'hi' ? 'सीखते रहें!' : language === 'gu' ? 'શીખતા રહો!' : language === 'mr' ? 'शिकत राहा!' : 'Keep Learning!')}
          </h3>
          <p className="result-score-label">
            {language === 'hi'
              ? <><strong className="score-span">{questions.length}</strong> में से <strong className="score-span">{score}</strong> प्रश्नों का सही उत्तर दिया।</>
              : language === 'gu'
                ? <><strong className="score-span">{questions.length}</strong> માંથી <strong className="score-span">{score}</strong> પ્રશ્નોના સાચા જવાબ આપ્યા.</>
                : language === 'mr'
                  ? <><strong className="score-span">{questions.length}</strong> पैकी <strong className="score-span">{score}</strong> प्रश्नांची अचूक उत्तरे दिली.</>
                  : <>You scored <strong className="score-span">{score}</strong> out of <strong className="score-span">{questions.length}</strong> questions correctly.</>}
          </p>
          <div className="progress-bar-container large">
            <div className={`progress-bar-fill ${passed ? 'success' : 'warning'}`} style={{ width: `${pct}%` }}></div>
          </div>
          <div className="result-actions">
            <button className="btn btn-outlined" onClick={resetQuiz}>
              <RotateCcw size={16} />
              <span>{language === 'hi' ? 'पुनः प्रयास करें' : language === 'gu' ? 'ફરીથી પ્રયાસ કરો' : language === 'mr' ? 'पुन्हा प्रयत्न करा' : 'Retry Quiz'}</span>
            </button>
          </div>
        </div>
      </>
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
    </div>
  );
};
