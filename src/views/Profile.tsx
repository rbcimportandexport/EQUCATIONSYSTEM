import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Shield, User, Clock, FileText, Edit3, Save, X, BookOpen, Star, TrendingUp } from 'lucide-react';

export const Profile: React.FC = () => {
  const { courses, progress, getCourseCompletionPercentage, currentUser, loginUser, language, certificates } = useApp();
  const [showCertificate, setShowCertificate] = useState(false);
  const [certCourseTitle, setCertCourseTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fallbackName = language === 'hi' ? 'विद्यार्थी' : language === 'gu' ? 'વિદ્યાર્થી' : 'Student';
  const fallbackEmail = 'student@rbcacademy.com';

  const [editName, setEditName] = useState(currentUser?.name || fallbackName);
  const [editEmail, setEditEmail] = useState(currentUser?.email || fallbackEmail);

  const completedLessons = Object.values(progress).filter(p => p.completed).length;
  const quizzesAttempted = Object.values(progress).filter(p => Object.keys(p.quizScores).length > 0).length;

  const totalProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + getCourseCompletionPercentage(c.id), 0) / courses.length)
    : 0;

  const getLevelDetails = (pct: number, lang: string) => {
    if (pct === 100) {
      return {
        name: lang === 'hi' ? 'डायमंड (Diamond)' : lang === 'gu' ? 'ડાયમંડ' : 'Diamond',
        bg: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
        color: '#006064',
        border: '1px solid #4dd0e1',
        shadow: '0 0 10px rgba(0, 151, 167, 0.25)'
      };
    } else if (pct >= 70) {
      return {
        name: lang === 'hi' ? 'प्लेटिनम (Platinum)' : lang === 'gu' ? 'પ્લેટિનમ' : 'Platinum',
        bg: 'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)',
        color: '#0f172a',
        border: '1px solid #94a3b8',
        shadow: '0 0 8px rgba(148, 163, 184, 0.15)'
      };
    } else if (pct >= 30) {
      return {
        name: lang === 'hi' ? 'गोल्ड (Gold)' : lang === 'gu' ? 'ગોલ્ડ' : 'Gold',
        bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
        color: '#92400e',
        border: '1px solid #fde047',
        shadow: '0 0 8px rgba(234, 179, 8, 0.15)'
      };
    } else {
      return {
        name: lang === 'hi' ? 'सिल्वर (Silver)' : lang === 'gu' ? 'સિલ્વર' : 'Silver',
        bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        color: '#475569',
        border: '1px solid #cbd5e1',
        shadow: 'none'
      };
    }
  };

  const userLevel = getLevelDetails(totalProgress, language);

  const hasCourseCertificate = (courseId: string) => {
    return getCourseCompletionPercentage(courseId) === 100 || 
      (certificates && certificates.some(c => c.userId === currentUser?.id && c.courseId === courseId));
  };

  const visibleCertificates = courses.filter(c => hasCourseCertificate(c.id));

  const handleOpenCertificate = (courseTitle: string) => {
    setCertCourseTitle(courseTitle);
    setShowCertificate(true);
  };

  const getLocalDateString = () =>
    new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleSave = () => {
    if (editName.trim() && editEmail.trim()) {
      loginUser(editName.trim(), editEmail.trim(), 'student');
      setIsEditing(false);
    }
  };

  const avatarInitials = (currentUser?.name || fallbackName)
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{
      height: '100%',
      background: '#f8fafc',
      padding: '0',
      overflowY: 'auto'
    }}>
      {/* ── Hero Banner (Blue & Orange Accents) ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        padding: '48px 40px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '30%', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #fbbf24, #f97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', fontWeight: '800', color: '#fff',
            border: '4px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 24px rgba(37,99,235,0.2)',
            flexShrink: 0
          }}>
            {avatarInitials}
          </div>

          {/* Name / Email */}
          <div style={{ flexGrow: 1, minWidth: '200px' }}>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px' }}>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Full Name"
                  style={{
                    padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.4)',
                    background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '16px',
                    outline: 'none', backdropFilter: 'blur(8px)'
                  }}
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  placeholder="Email Address"
                  style={{
                    padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.4)',
                    background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '14px',
                    outline: 'none', backdropFilter: 'blur(8px)'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleSave} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 18px', borderRadius: '8px', border: 'none',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                  }}>
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => setIsEditing(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.4)',
                    background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer'
                  }}>
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>
                  {currentUser?.name || fallbackName}
                </h1>
                <p style={{ margin: '4px 0 12px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                  {currentUser?.email || fallbackEmail}
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 12px', borderRadius: '20px',
                    background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.4)',
                    color: '#fff', fontSize: '12px', fontWeight: '600'
                  }}>
                    <User size={11} /> RBC Academy Student
                  </span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 12px', borderRadius: '20px',
                    background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)',
                    color: '#fff', fontSize: '12px', fontWeight: '600'
                  }}>
                    <Shield size={11} /> Import & Export Master
                  </span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 12px', borderRadius: '20px',
                    background: userLevel.bg, border: userLevel.border,
                    color: userLevel.color, fontSize: '12px', fontWeight: '800',
                    textTransform: 'uppercase', letterSpacing: '0.5px'
                  }}>
                    {userLevel.name}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Edit button */}
          {!isEditing && (
            <button onClick={() => {
              setEditName(currentUser?.name || fallbackName);
              setEditEmail(currentUser?.email || fallbackEmail);
              setIsEditing(true);
            }} style={{
              marginLeft: 'auto',
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer',
              transition: 'all 0.2s'
            }}>
              <Edit3 size={14} /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* ── Content below hero ── */}
      <div style={{ padding: '0 32px 48px', marginTop: '-40px', position: 'relative', zIndex: 2 }}>

        {/* Overall Progress Bar Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '20px', padding: '24px 28px', marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#f97316" />
              <span style={{ color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Overall Course Progress</span>
            </div>
            <span style={{ color: '#f97316', fontSize: '22px', fontWeight: '800' }}>{totalProgress}%</span>
          </div>
          <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${totalProgress}%`,
              background: 'linear-gradient(90deg, #f97316, #fbbf24)',
              borderRadius: '10px',
              transition: 'width 1s ease',
              boxShadow: '0 2px 8px rgba(249,115,22,0.2)'
            }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { icon: <FileText size={22} color="#2563eb" />, label: 'Lessons Done', value: completedLessons, unit: 'lessons', bg: '#eff6ff', border: '#bfdbfe' },
            { icon: <Award size={22} color="#7c3aed" />, label: 'Quizzes Taken', value: quizzesAttempted, unit: 'quizzes', bg: '#f5f3ff', border: '#ddd6fe' },
            { icon: <Clock size={22} color="#059669" />, label: 'Study Hours', value: (completedLessons * 0.3).toFixed(1), unit: 'hours', bg: '#ecfdf5', border: '#a7f3d0' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#ffffff', border: `1px solid ${stat.border}`,
              borderRadius: '16px', padding: '20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '14px'
              }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{stat.unit}</div>
              <div style={{ fontSize: '13px', color: '#334155', marginTop: '8px', fontWeight: '600' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Course Progress List */}
        <div style={{
          background: '#ffffff', border: '1px solid #e2e8f0',
          borderRadius: '20px', padding: '24px', marginBottom: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BookOpen size={18} color="#2563eb" />
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: '700' }}>Course Progress</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {courses.map(course => {
              const pct = getCourseCompletionPercentage(course.id);
              return (
                <div key={course.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>{course.title}</span>
                    <span style={{ fontSize: '13px', color: pct === 100 ? '#10b981' : '#f97316', fontWeight: '700' }}>
                      {pct === 100 ? '✓ Done' : `${pct}%`}
                    </span>
                  </div>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: pct === 100
                        ? 'linear-gradient(90deg, #10b981, #34d399)'
                        : 'linear-gradient(90deg, #2563eb, #60a5fa)',
                      borderRadius: '6px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificates Section */}
        <div style={{
          background: '#ffffff', border: '1px solid #e2e8f0',
          borderRadius: '20px', padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Star size={18} color="#fbbf24" />
            <h3 style={{ margin: 0, color: '#0f172a', fontSize: '16px', fontWeight: '700' }}>Earned Certificates</h3>
          </div>

          {visibleCertificates.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '40px 20px',
              border: '2px dashed #e2e8f0', borderRadius: '16px'
            }}>
              <Award size={48} color="#cbd5e1" style={{ marginBottom: '12px' }} />
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                No certificates yet. Complete 100% of any course to earn your credential!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {visibleCertificates.map(course => (
                <div key={course.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)',
                  border: '1px solid #fef3c7',
                  borderLeft: '5px solid #d97706',
                  boxShadow: '0 10px 25px -5px rgba(217, 119, 6, 0.08), 0 8px 16px -6px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', minWidth: '240px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                      border: '1px solid #fde68a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(217, 119, 6, 0.1)',
                      flexShrink: 0
                    }}>
                      <Award size={28} color="#d97706" />
                    </div>
                    <div>
                      <div style={{
                        textTransform: 'uppercase',
                        fontSize: '10px',
                        fontWeight: '800',
                        color: '#b45309',
                        letterSpacing: '1.5px',
                        marginBottom: '3px'
                      }}>
                        RBC ACADEMY CREDENTIAL
                      </div>
                      <div style={{
                        color: '#1e293b',
                        fontWeight: '800',
                        fontSize: '16px',
                        lineHeight: '1.2'
                      }}>
                        Certificate of Excellence
                      </div>
                      <div style={{
                        color: '#64748b',
                        fontSize: '13px',
                        marginTop: '4px',
                        fontWeight: '500'
                      }}>
                        {course.title} • {getLocalDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    marginLeft: 'auto',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => handleOpenCertificate(course.title)}
                      style={{
                        padding: '12px 28px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '13px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(217,119,6,0.35)',
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                      }}
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)'
        }}>
          {/* Print specific CSS override */}
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body * {
                visibility: hidden !important;
              }
              .print-certificate-container, .print-certificate-container * {
                visibility: visible !important;
              }
              .print-certificate-container {
                position: fixed !important;
                left: 0 !important;
                top: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                border: none !important;
                box-shadow: none !important;
                background: white !important;
                padding: 0 !important;
                margin: 0 !important;
                z-index: 9999999 !important;
                transform: scale(1) !important;
              }
              @page {
                size: landscape;
                margin: 0;
              }
            }
          `}} />

          <div onClick={() => setShowCertificate(false)}
            style={{ position: 'absolute', inset: 0 }} />
          
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'linear-gradient(135deg, #ffffff, #fcfbfa)',
            borderRadius: '24px', padding: '12px',
            boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
            maxWidth: '1000px', width: '95%',
            overflowX: 'auto'
          }}>
            {/* Scrollable preview wrapper for smaller screens */}
            <div style={{ overflowX: 'auto', width: '100%' }}>
              
              {/* Landscape Certificate Container */}
              <div className="print-certificate-container" style={{
                width: '950px',
                height: '670px',
                background: '#ffffff',
                border: '14px solid #0f172a',
                position: 'relative',
                boxSizing: 'border-box',
                padding: '24px',
                fontFamily: '"Inter", sans-serif',
                color: '#0f172a',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                margin: '0 auto',
                flexShrink: 0
              }}>
                {/* Corner Wedges Decor (Left side) */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: '220px',
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  zIndex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', padding: '30px 20px', color: '#fff',
                  borderRight: '4px solid #d97706'
                }}>
                  {/* Gold Crest */}
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <div style={{
                      width: '74px', height: '74px', borderRadius: '50%', border: '2px solid #fbbf24',
                      margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(251,191,36,0.1)'
                    }}>
                      <Award size={38} color="#fbbf24" />
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '1.5px', color: '#fbbf24' }}>
                      RBC ACADEMY
                    </div>
                    <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                      ESTABLISHED 2011
                    </div>
                  </div>

                  {/* Left Sidebar Details (Date, Duration, Level) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ color: '#fbbf24', display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date of Issue</div>
                        <div style={{ fontSize: '11px', fontWeight: '700' }}>{getLocalDateString()}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ color: '#fbbf24', display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Duration</div>
                        <div style={{ fontSize: '11px', fontWeight: '700' }}>10+ Hours</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ color: '#fbbf24', display: 'flex' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Level</div>
                        <div style={{ fontSize: '11px', fontWeight: '700' }}>Beginner to Advanced</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gold Inner Border Line (Right of left sidebar) */}
                <div style={{
                  position: 'absolute', left: '232px', right: '12px', top: '12px', bottom: '12px',
                  border: '1.5px solid #fbbf24', pointerEvents: 'none', zIndex: 0
                }} />

                {/* Main Content Area (Right side) */}
                <div style={{
                  marginLeft: '224px', flexGrow: 1, height: '100%', display: 'flex',
                  flexDirection: 'row', zIndex: 2, boxSizing: 'border-box', padding: '16px 20px'
                }}>
                  {/* Center Content Column */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '20px' }}>
                    {/* Top Header Row (Logo and Cert ID) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      {/* Logo Mock */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '6px', background: '#0f172a',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24',
                          fontWeight: '900', fontSize: '16px'
                        }}>
                          R
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.5px', lineHeight: '1.1' }}>
                            rbc <span style={{ color: '#d97706' }}>Import & Export</span>
                          </div>
                          <div style={{ fontSize: '8px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Since 2011
                          </div>
                        </div>
                      </div>

                      {/* Cert ID */}
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '8px', color: '#64748b', fontWeight: '600' }}>CERTIFICATE ID</div>
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#0f172a', letterSpacing: '0.5px' }}>
                          {(() => {
                            const uName = currentUser?.name || fallbackName;
                            let sum = 0;
                            for (let i = 0; i < uName.length; i++) { sum += uName.charCodeAt(i); }
                            const serial = String(sum % 10000).padStart(4, '0');
                            return `RBC-2026-0718-${serial}`;
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Main Titles */}
                    <div style={{ textAlign: 'center', margin: '14px 0' }}>
                      <h1 style={{
                        fontSize: '28px', fontWeight: '900', color: '#d97706', margin: '0 0 6px',
                        letterSpacing: '3px', fontFamily: '"Georgia", serif'
                      }}>
                        CERTIFICATE OF COMPLETION
                      </h1>
                      <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#64748b', fontWeight: '700' }}>
                        THIS IS PROUDLY PRESENTED TO
                      </div>

                      {/* Student Name */}
                      <h2 style={{
                        fontSize: '38px', fontWeight: '800', color: '#0f172a', margin: '8px 0',
                        fontFamily: '"Georgia", serif', fontStyle: 'italic', textDecoration: 'underline',
                        textDecorationColor: '#fbbf24', textUnderlineOffset: '6px'
                      }}>
                        {currentUser?.name || fallbackName}
                      </h2>

                      <p style={{ fontSize: '10px', color: '#475569', lineHeight: 1.5, margin: '6px auto', maxWidth: '480px' }}>
                        for successfully completing all syllabus modules, practice quizzes, video lectures, and assessments in the course
                      </p>

                      {/* Course Banner Ribbon */}
                      <div style={{
                        background: '#0f172a', color: '#fff', padding: '10px 24px', borderRadius: '4px',
                        display: 'inline-block', fontWeight: '800', fontSize: '14px', letterSpacing: '1.5px',
                        boxShadow: '0 4px 10px rgba(15,23,42,0.2)', border: '1px solid #fbbf24', margin: '6px 0'
                      }}>
                        {certCourseTitle.toUpperCase()}
                      </div>

                      <p style={{ fontSize: '9px', color: '#64748b', fontStyle: 'italic', margin: '4px auto 0', maxWidth: '460px', lineHeight: '1.3' }}>
                        You have demonstrated dedication, consistency, and a strong understanding of International Trade, Logistics, Documentation, Customs, Shipping, Payment Terms, and Global Business Practices.
                      </p>
                    </div>

                    {/* Signatures & Seal Footer Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginTop: '6px' }}>
                      {/* Kunal Pawar Director */}
                      <div style={{ width: '150px', textAlign: 'center' }}>
                        <div style={{ fontFamily: '"Georgia", serif', fontStyle: 'italic', fontSize: '16px', color: '#1e293b', height: '24px', lineHeight: '24px' }}>
                          Kunal Pawar
                        </div>
                        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '4px', marginTop: '2px' }}>
                          <div style={{ fontSize: '9px', fontWeight: '800', color: '#0f172a' }}>Kunal Pawar</div>
                          <div style={{ fontSize: '7px', color: '#64748b', textTransform: 'uppercase' }}>Academy Director</div>
                        </div>
                      </div>

                      {/* Completed Badge Seal */}
                      <div style={{ textAlign: 'center', position: 'relative', bottom: '-4px' }}>
                        <div style={{
                          width: '74px', height: '74px', borderRadius: '50%',
                          border: '4px double #d97706', background: 'radial-gradient(circle, #fffbeb 0%, #fef3c7 100%)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(217,119,6,0.15)', padding: '2px'
                        }}>
                          <div style={{ fontSize: '7px', fontWeight: '900', color: '#b45309', textTransform: 'uppercase' }}>COMPLETED</div>
                          <div style={{ fontSize: '7px', fontWeight: '900', color: '#b45309', textTransform: 'uppercase' }}>WITH</div>
                          <div style={{ fontSize: '7px', fontWeight: '900', color: '#b45309', textTransform: 'uppercase' }}>EXCELLENCE</div>
                        </div>
                      </div>

                      {/* Prakash Founder */}
                      <div style={{ width: '150px', textAlign: 'center' }}>
                        <div style={{ fontFamily: '"Georgia", serif', fontStyle: 'italic', fontSize: '16px', color: '#1e293b', height: '24px', lineHeight: '24px' }}>
                          Prakash K
                        </div>
                        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '4px', marginTop: '2px' }}>
                          <div style={{ fontSize: '9px', fontWeight: '800', color: '#0f172a' }}>Prakash Kachchhi</div>
                          <div style={{ fontSize: '7px', color: '#64748b', textTransform: 'uppercase' }}>Founder & CEO</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Benefits Sidebar (Comprehensive Curriculum, etc.) */}
                  <div style={{
                    width: '140px', borderLeft: '1px solid #e2e8f0', paddingLeft: '16px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '100%',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#d97706', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        COMPREHENSIVE CURRICULUM
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#d97706', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        INDUSTRY RELEVANT
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#d97706', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        EXPERT INSTRUCTORS
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#d97706', marginBottom: '2px', display: 'flex', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        GLOBAL PERSPECTIVE
                      </div>
                    </div>

                    {/* QR Code and verification tag at very bottom */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <svg width="32" height="32" viewBox="0 0 25 25" style={{ background: '#fff', padding: '2px' }}>
                        <path d="M0 0h7v7H0zm1 1v5h5V1zm10 0h3v3h-3zm3 0h4v4h-4zM0 10h3v3H0zm5 0h3v3H5zm6 0h3v3h-3zm4 0h4v4h-4zm-8 4v4H0v-4zm4 0h3v3H7zm11 0h3v3h-3zM0 18h7v7H0zm1 1v5h5v-5zm10 0h3v3h-3z" fill="#0f172a" />
                      </svg>
                      <div style={{ fontSize: '5px', color: '#64748b', textAlign: 'center', marginTop: '4px', textTransform: 'uppercase', lineHeight: '1.2' }}>
                        VERIFY CREDENTIAL<br />academy.rbc.com/verify
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Print & Close Toolbar */}
            <div style={{ display: 'flex', gap: '12px', padding: '16px 20px', borderTop: '1px solid #e2e8f0', marginTop: '12px' }}>
              <button onClick={() => window.print()} style={{
                flex: 1, padding: '12px', borderRadius: '10px',
                border: '2px solid #d97706', background: 'transparent',
                color: '#92400e', fontWeight: '700', fontSize: '14px', cursor: 'pointer'
              }}>
                Print
              </button>
              <button onClick={() => setShowCertificate(false)} style={{
                flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #d97706, #b45309)',
                color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer'
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
