import React, { useState, useEffect } from 'react';
import type { QuizQuestion } from '../utils/data';
import { useApp } from '../context/AppContext';
import { 
  HelpCircle, Check, X, ArrowRight, RotateCcw, Award, Trophy, BookOpen, 
  Clock, AlertTriangle, ChevronDown, ChevronUp, FileText, CheckCircle2, XCircle, Filter
} from 'lucide-react';

interface QuizViewProps {
  lessonId: string;
  questions: QuizQuestion[];
  onComplete?: () => void;
  onNextModule?: () => void;
  nextModuleTitle?: string;
  nextModuleOrder?: number;
  onBackToChapter?: () => void;
}

// User submission record for Answer Key Preview
interface UserSubmissionRecord {
  questionId: string;
  questionText: string;
  type: string;
  options?: string[];
  userSelected: string[];
  userTyped: string;
  correctAnswers: string[];
  explanation: string;
  isCorrect: boolean;
}

// Fisher-Yates array shuffling utility
const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
};

export const QuizView: React.FC<QuizViewProps> = ({ 
  lessonId, 
  questions, 
  onComplete,
  onNextModule,
  nextModuleTitle,
  nextModuleOrder,
  onBackToChapter
}) => {
  const { saveQuizScore, language, currentUser } = useApp();
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; originalIdx: string }[]>([]);

  // Detailed Submissions Log for Answer Key Preview
  const [submissionHistory, setSubmissionHistory] = useState<UserSubmissionRecord[]>([]);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [answerKeyFilter, setAnswerKeyFilter] = useState<'all' | 'incorrect' | 'correct'>('all');

  // Live Timer State (in seconds)
  const [timeLeft, setTimeLeft] = useState<number>(40);

  // Stable key for questions so parent re-renders don't reset current question index
  const questionsKey = questions && questions.length > 0
    ? `${lessonId}_${questions.length}_${questions.map(q => q.id).join('_')}`
    : lessonId;

  // Initialize and shuffle questions ONLY when chapter or question list changes
  useEffect(() => {
    if (questions && questions.length > 0) {
      const shuffled = shuffleArray(questions);
      setActiveQuestions(shuffled);
    } else {
      setActiveQuestions([]);
    }
    setCurrentIdx(0);
    setSelectedOptions([]);
    setTypedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setQuizFinished(false);
    setSubmissionHistory([]);
    setShowAnswerKey(false);
    setTimeLeft(40);
  }, [questionsKey]);

  // Reset timer to 40s whenever moving to a new question
  useEffect(() => {
    if (activeQuestions.length > 0 && !quizFinished && !isAnswered) {
      setTimeLeft(40);
    }
  }, [currentIdx, quizFinished, isAnswered]);

  // Countdown Timer Interval Effect (40 seconds per question)
  useEffect(() => {
    if (quizFinished || isAnswered || timeLeft <= 0 || activeQuestions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time out auto submit
          autoSubmitTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizFinished, isAnswered, timeLeft, activeQuestions.length, currentIdx]);

  const currentQuestion = activeQuestions[currentIdx];

  // Shuffle option choices dynamically for the current question
  useEffect(() => {
    if (!currentQuestion) {
      setShuffledOptions([]);
      return;
    }
    if (currentQuestion.options) {
      const mapped = currentQuestion.options.map((opt, idx) => ({
        text: opt,
        originalIdx: idx.toString()
      }));
      setShuffledOptions(shuffleArray(mapped));
    } else {
      setShuffledOptions([]);
    }
  }, [currentIdx, currentQuestion]);

  if (!activeQuestions || activeQuestions.length === 0 || !currentQuestion) return null;

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

    // Record submission history for Detailed Answer Key Preview
    setSubmissionHistory(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        type: currentQuestion.type,
        options: currentQuestion.options,
        userSelected: [...selectedOptions],
        userTyped: typedAnswer,
        correctAnswers: currentQuestion.correctAnswers,
        explanation: currentQuestion.explanation,
        isCorrect: correct
      }
    ]);

    // Save score in context progress
    saveQuizScore(lessonId, currentQuestion.id, correct);
  };

  const autoSubmitTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setIsCorrect(false);

    setSubmissionHistory(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        questionText: currentQuestion.question,
        type: currentQuestion.type,
        options: currentQuestion.options,
        userSelected: [],
        userTyped: 'Time Expired',
        correctAnswers: currentQuestion.correctAnswers,
        explanation: currentQuestion.explanation + ' (Time expired for this question)',
        isCorrect: false
      }
    ]);

    saveQuizScore(lessonId, currentQuestion.id, false);
  };

  const handleNext = () => {
    setSelectedOptions([]);
    setTypedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
      setShowCelebration(true);
      setTimeout(() => setCelebrationVisible(true), 50);
      if (onComplete) onComplete();
    }
  };

  const resetQuiz = () => {
    if (questions && questions.length > 0) {
      const shuffled = shuffleArray(questions);
      setActiveQuestions(shuffled);
    }
    setCurrentIdx(0);
    setSelectedOptions([]);
    setTypedAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setQuizFinished(false);
    setShowCelebration(false);
    setCelebrationVisible(false);
    setSubmissionHistory([]);
    setShowAnswerKey(false);
    setTimeLeft(40);
  };

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'mcq': return 'Multiple Choice';
      case 'multi-answer': return 'Multi-Select';
      case 'true-false': return 'True / False';
      case 'fill-blank': return 'Fill in the Blank';
      default: return 'Question';
    }
  };

  if (quizFinished) {
    const passed = score >= activeQuestions.length * 0.7;
    const pct = Math.round((score / activeQuestions.length) * 100);
    const userName = currentUser?.name || (language === 'hi' ? 'विद्यार्थी' : language === 'gu' ? 'વિદ્યાર્થી' : 'Student');

    // Grade designation
    const gradeBadge = pct >= 90 
      ? { title: 'Master Exporter', color: '#10b981', bg: '#d1fae5' }
      : pct >= 70
        ? { title: 'Passed - Senior Trader', color: '#0284c7', bg: '#e0f2fe' }
        : { title: 'Requires Revision', color: '#d97706', bg: '#fef3c7' };

    const filteredKeyItems = submissionHistory.filter(item => {
      if (answerKeyFilter === 'correct') return item.isCorrect;
      if (answerKeyFilter === 'incorrect') return !item.isCorrect;
      return true;
    });

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Celebration Overlay Popup */}
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
              padding: '44px 48px',
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
                marginBottom: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: 'drop-shadow(0 4px 16px rgba(251,191,36,0.6))'
              }}>
                {passed
                  ? <Trophy size={64} color="#fbbf24" strokeWidth={1.5} />
                  : <BookOpen size={64} color="#a78bfa" strokeWidth={1.5} />}
              </div>

              {/* Congrats text */}
              <p style={{
                margin: '0 0 4px',
                fontSize: '12px', fontWeight: '700', letterSpacing: '2.5px',
                color: '#fbbf24', textTransform: 'uppercase'
              }}>
                {passed ? 'Assessment Mastered!' : 'Keep Practicing!'}
              </p>

              {/* Big Name */}
              <h1 style={{
                margin: '0 0 16px',
                fontSize: '34px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #fbbf24, #f97316, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.15
              }}>
                {userName}
              </h1>

              {/* Score Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                background: passed ? 'rgba(34,197,94,0.12)' : 'rgba(251,191,36,0.12)',
                border: `2px solid ${passed ? 'rgba(34,197,94,0.4)' : 'rgba(251,191,36,0.4)'}`,
                borderRadius: '20px', padding: '10px 24px',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '32px', fontWeight: '900', color: passed ? '#4ade80' : '#fbbf24' }}>
                  {score}/{activeQuestions.length}
                </span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: passed ? '#4ade80' : '#fbbf24' }}>{pct}%</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>
                    {passed ? 'PASSED ✓' : 'TRY AGAIN'}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: passed
                    ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                    : 'linear-gradient(90deg, #fbbf24, #f97316)',
                  borderRadius: '8px'
                }} />
              </div>

              {/* Module Unlocked Banner - STRICTLY REQUIRES 100% SCORE */}
              {pct === 100 && nextModuleOrder && (
                <div style={{
                  margin: '0 0 20px',
                  padding: '14px 18px',
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.15))',
                  border: '1px solid rgba(34,197,94,0.4)',
                  borderRadius: '14px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#4ade80', marginBottom: '2px' }}>
                    Scored 100%! Unlocked Module {nextModuleOrder}
                  </div>
                  {nextModuleTitle && (
                    <div style={{ fontSize: '12.5px', color: '#cbd5e1' }}>
                      {nextModuleTitle}
                    </div>
                  )}
                </div>
              )}

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {pct === 100 && onNextModule && nextModuleOrder && (
                  <button
                    onClick={() => {
                      setShowCelebration(false);
                      setCelebrationVisible(false);
                      onNextModule();
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '12px 20px', borderRadius: '12px', border: 'none',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#ffffff', fontWeight: '800', fontSize: '13.5px', cursor: 'pointer'
                    }}
                  >
                    <span>Go to Module {nextModuleOrder}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
                <button
                  onClick={() => { setShowCelebration(false); setCelebrationVisible(false); }}
                  style={{
                    padding: '12px 20px', borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff', fontWeight: '700', fontSize: '13.5px', cursor: 'pointer'
                  }}
                >
                  View Summary & Answer Key
                </button>
                <button
                  onClick={resetQuiz}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '12px 20px', borderRadius: '12px', border: 'none',
                    background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                    color: '#1e293b', fontWeight: '800', fontSize: '13.5px', cursor: 'pointer'
                  }}
                >
                  <RotateCcw size={15} />
                  <span>Retry Quiz</span>
                </button>
                {onBackToChapter && (
                  <button
                    onClick={() => {
                      setShowCelebration(false);
                      setCelebrationVisible(false);
                      onBackToChapter();
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '12px 20px', borderRadius: '12px', border: 'none',
                      background: 'linear-gradient(135deg, #64748b, #475569)',
                      color: '#ffffff', fontWeight: '800', fontSize: '13.5px', cursor: 'pointer'
                    }}
                  >
                    <BookOpen size={15} />
                    <span>Back to Chapter</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Background Result Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: gradeBadge.bg, color: gradeBadge.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Award size={32} />
          </div>

          <span style={{ fontSize: '12px', fontWeight: '800', color: gradeBadge.color, background: gradeBadge.bg, padding: '4px 12px', borderRadius: '12px', marginBottom: '8px' }}>
            {gradeBadge.title}
          </span>

          <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
            {passed ? 'Assessment Completed Successfully!' : 'Keep Reviewing Module Material'}
          </h3>

          <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px 0' }}>
            You scored <strong style={{ color: '#0f172a' }}>{score}</strong> out of <strong style={{ color: '#0f172a' }}>{activeQuestions.length}</strong> questions correctly ({pct}% score).
          </p>

          <div style={{ width: '100%', maxWidth: '400px', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: passed ? '#16a34a' : '#d97706' }} />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              style={{
                background: '#f1f5f9',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <FileText size={16} />
              <span>{showAnswerKey ? 'Hide Detailed Answer Key' : 'Preview Detailed Answer Key'}</span>
              {showAnswerKey ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <button
              onClick={resetQuiz}
              style={{
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RotateCcw size={15} />
              <span>Retry Quiz</span>
            </button>
            {onBackToChapter && (
              <button
                onClick={onBackToChapter}
                style={{
                  background: '#64748b',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <BookOpen size={15} />
                <span>Back to Chapter</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Answer Key Preview Accordion / Widget */}
        {showAnswerKey && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={20} color="#0284c7" />
                  <span>Detailed Answer Key & Explanations</span>
                </h3>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  Review your answers and verified trade compliance explanations below.
                </div>
              </div>

              {/* Filter Buttons */}
              <div style={{ display: 'flex', gap: '6px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                <button
                  onClick={() => setAnswerKeyFilter('all')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: 'none',
                    background: answerKeyFilter === 'all' ? '#ffffff' : 'transparent',
                    color: answerKeyFilter === 'all' ? '#0284c7' : '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  All ({submissionHistory.length})
                </button>
                <button
                  onClick={() => setAnswerKeyFilter('incorrect')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: 'none',
                    background: answerKeyFilter === 'incorrect' ? '#ffffff' : 'transparent',
                    color: answerKeyFilter === 'incorrect' ? '#ef4444' : '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  Incorrect ({submissionHistory.filter(s => !s.isCorrect).length})
                </button>
                <button
                  onClick={() => setAnswerKeyFilter('correct')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: 'none',
                    background: answerKeyFilter === 'correct' ? '#ffffff' : 'transparent',
                    color: answerKeyFilter === 'correct' ? '#16a34a' : '#64748b',
                    cursor: 'pointer'
                  }}
                >
                  Correct ({submissionHistory.filter(s => s.isCorrect).length})
                </button>
              </div>
            </div>

            {/* Answer List Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredKeyItems.length > 0 ? (
                filteredKeyItems.map((rec, idx) => (
                  <div 
                    key={rec.questionId || idx}
                    style={{
                      border: `1px solid ${rec.isCorrect ? '#bbf7d0' : '#fecaca'}`,
                      background: rec.isCorrect ? '#f0fdf4' : '#fef2f2',
                      borderRadius: '14px',
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {rec.isCorrect ? (
                          <CheckCircle2 size={20} color="#16a34a" />
                        ) : (
                          <XCircle size={20} color="#ef4444" />
                        )}
                        <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                          Q{idx + 1}. {rec.questionText}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700', background: '#ffffff', padding: '3px 8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                        {getQuestionTypeLabel(rec.type)}
                      </span>
                    </div>

                    {/* Explanation details */}
                    <div style={{ fontSize: '13px', color: '#334155', background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <div style={{ marginBottom: '6px', fontWeight: '600' }}>
                        <strong>Explanation:</strong> {rec.explanation}
                      </div>
                      {!rec.isCorrect && (
                        <div style={{ color: '#16a34a', fontWeight: '700', fontSize: '12.5px' }}>
                          ✓ Correct Answer: {
                            rec.type === 'fill-blank'
                              ? rec.correctAnswers.join(' / ')
                              : rec.options 
                                ? rec.correctAnswers.map(ansIdx => rec.options?.[parseInt(ansIdx)]).join(', ')
                                : rec.correctAnswers.join(', ')
                          }
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '13px' }}>
                  No questions match the selected filter.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  const isTimeLow = timeLeft <= 10;

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '20px',
      padding: '28px 32px',
      boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)'
    }}>
      {/* Header with question counter, question type tag & timer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#0284c7', background: '#e0f2fe', padding: '4px 12px', borderRadius: '8px' }}>
            Question {currentIdx + 1} of {activeQuestions.length}
          </span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '8px' }}>
            {getQuestionTypeLabel(currentQuestion.type)}
          </span>
        </div>

        {/* Dynamic Countdown Timer Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '20px',
          fontWeight: '800',
          fontSize: '13px',
          backgroundColor: isTimeLow ? 'rgba(239, 68, 68, 0.15)' : 'rgba(2, 132, 199, 0.1)',
          color: isTimeLow ? '#ef4444' : '#0284c7',
          border: `1px solid ${isTimeLow ? 'rgba(239, 68, 68, 0.4)' : 'rgba(2, 132, 199, 0.3)'}`,
          transition: 'all 0.3s ease'
        }}>
          {isTimeLow ? <AlertTriangle size={15} className="animate-pulse" /> : <Clock size={15} />}
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ width: `${Math.round(((currentIdx + 1) / activeQuestions.length) * 100)}%`, height: '100%', background: '#0284c7', transition: 'width 0.3s ease' }} />
      </div>

      <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '24px', lineHeight: 1.4 }}>
        {currentQuestion.question}
      </h3>

      {/* Answer Inputs based on Question type */}
      <div style={{ marginBottom: '28px' }}>
        {currentQuestion.type === 'fill-blank' ? (
          <div>
            <input
              type="text"
              placeholder={language === 'hi' ? 'यहाँ अपना उत्तर लिखें...' : 'Type your answer here...'}
              value={typedAnswer}
              onChange={e => setTypedAnswer(e.target.value)}
              disabled={isAnswered}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {shuffledOptions.map((opt, idx) => {
              const isSelected = selectedOptions.includes(opt.originalIdx);
              
              let borderCol = isSelected ? '#0284c7' : '#e2e8f0';
              let bgCol = isSelected ? '#f0f9ff' : '#ffffff';

              if (isAnswered) {
                const isCorrectOption = currentQuestion.correctAnswers.includes(opt.originalIdx);
                if (isCorrectOption) {
                  borderCol = '#16a34a';
                  bgCol = '#f0fdf4';
                } else if (isSelected) {
                  borderCol = '#ef4444';
                  bgCol = '#fef2f2';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionToggle(opt.originalIdx)}
                  disabled={isAnswered}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: `1.5px solid ${borderCol}`,
                    background: bgCol,
                    cursor: isAnswered ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                >
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isSelected ? '#0284c7' : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justify-content: 'center',
                    fontWeight: '800',
                    fontSize: '13px',
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#0f172a', flex: 1 }}>
                    {opt.text}
                  </span>
                  {isAnswered && currentQuestion.correctAnswers.includes(opt.originalIdx) && (
                    <Check size={18} color="#16a34a" />
                  )}
                  {isAnswered && isSelected && !currentQuestion.correctAnswers.includes(opt.originalIdx) && (
                    <X size={18} color="#ef4444" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Answer feedback section */}
      {isAnswered && (
        <div style={{
          padding: '16px 20px',
          borderRadius: '14px',
          background: isCorrect ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            {isCorrect ? <Check size={18} color="#16a34a" /> : <X size={18} color="#ef4444" />}
            <span style={{ fontSize: '14px', fontWeight: '800', color: isCorrect ? '#16a34a' : '#ef4444' }}>
              {isCorrect ? 'Correct Answer!' : 'Incorrect Answer'}
            </span>
          </div>
          <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
            <p style={{ margin: '0 0 6px 0' }}>{currentQuestion.explanation}</p>
            {!isCorrect && (
              <div style={{ color: '#16a34a', fontWeight: '700' }}>
                Correct answer: {
                  currentQuestion.type === 'fill-blank'
                    ? currentQuestion.correctAnswers.join(' / ')
                    : currentQuestion.correctAnswers.map(ansIdx => currentQuestion.options?.[parseInt(ansIdx)]).join(', ')
                }
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isAnswered ? (
          <button 
            onClick={checkAnswer}
            disabled={
              (currentQuestion.type === 'fill-blank' && !typedAnswer.trim()) ||
              (currentQuestion.type !== 'fill-blank' && selectedOptions.length === 0)
            }
            style={{
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              opacity: (currentQuestion.type === 'fill-blank' && !typedAnswer.trim()) || (currentQuestion.type !== 'fill-blank' && selectedOptions.length === 0) ? 0.5 : 1
            }}
          >
            <span>Submit Answer</span>
          </button>
        ) : (
          <button 
            onClick={handleNext}
            style={{
              background: '#0f172a',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{currentIdx < activeQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
