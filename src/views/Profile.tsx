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
                background: '#fbfaf7',
                border: '14px solid #0f172a',
                position: 'relative',
                boxSizing: 'border-box',
                padding: '0',
                fontFamily: '"Inter", sans-serif',
                color: '#0f172a',
                overflow: 'hidden',
                display: 'flex',
                margin: '0 auto',
                flexShrink: 0
              }}>
                {/* Thin gold inner frame border */}
                <div style={{
                  position: 'absolute', left: '16px', right: '16px', top: '16px', bottom: '16px',
                  border: '1.5px solid #c5a880', pointerEvents: 'none', zIndex: 3
                }} />

                {/* Hourglass Navy Left Border Overlay SVG */}
                <svg style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '310px', height: '100%', zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 310 670" preserveAspectRatio="none">
                  {/* Navy background shape */}
                  <polygon points="0,0 300,0 160,240 160,430 300,670 0,670" fill="#0b1a30" />
                  {/* Gold divider line */}
                  <polyline points="300,0 160,240 160,430 300,670" stroke="#c5a880" strokeWidth="4" fill="none" />
                  {/* Orange highlight line */}
                  <polyline points="308,0 176,248 176,422 308,670" stroke="#ea580c" strokeWidth="2" fill="none" />

                  {/* Cargo Ship Line Art (bottom left) */}
                  <g stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" transform="translate(15, 570)">
                    <path d="M10,35 L60,35 L70,22 L25,22 Z" />
                    <rect x="30" y="8" width="8" height="14" />
                    <rect x="42" y="13" width="8" height="9" />
                    <line x1="0" y1="35" x2="80" y2="35" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                  </g>
                </svg>

                {/* Bottom-Right Corner Navy Wedge SVG */}
                <svg style={{ position: 'absolute', right: 0, bottom: 0, width: '220px', height: '220px', zIndex: 1, pointerEvents: 'none' }} viewBox="0 0 220 220">
                  <polygon points="220,220 40,220 220,40" fill="#0b1a30" />
                  <line x1="40" y1="220" x2="220" y2="40" stroke="#c5a880" strokeWidth="4" />
                  <line x1="32" y1="220" x2="220" y2="32" stroke="#ea580c" strokeWidth="2" />
                  {/* Harbor Crane Line Art */}
                  <g stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" transform="translate(130, 130)">
                    <line x1="30" y1="50" x2="30" y2="15" />
                    <line x1="5" y1="20" x2="55" y2="20" />
                    <line x1="5" y1="20" x2="30" y2="50" />
                    <line x1="55" y1="20" x2="30" y2="50" />
                    <line x1="30" y1="15" x2="10" y2="30" />
                    <line x1="30" y1="15" x2="50" y2="30" />
                  </g>
                </svg>

                {/* Gold Wax Seal Medallion (Top Left) */}
                <svg style={{ position: 'absolute', left: '32px', top: '32px', width: '110px', height: '160px', zIndex: 10 }} viewBox="0 0 110 160">
                  {/* Ribbons behind seal */}
                  <polygon points="35,60 20,130 45,115 70,130 55,60" fill="#b45309" opacity="0.8" />
                  <polygon points="50,60 35,135 60,120 85,135 70,60" fill="#d97706" />
                  {/* Gold circular badge */}
                  <circle cx="50" cy="55" r="42" fill="url(#goldGrad)" stroke="#fff" strokeWidth="2" />
                  <circle cx="50" cy="55" r="36" fill="none" stroke="#b45309" strokeWidth="2" strokeDasharray="3,3" />
                  {/* Text inside badge */}
                  <text x="50" y="46" fill="#78350f" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Georgia, serif">RBC</text>
                  <text x="50" y="58" fill="#78350f" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Georgia, serif">ACADEMY</text>
                  <text x="50" y="70" fill="#78350f" fontSize="8" textAnchor="middle">★★★★★</text>
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Left Sidebar Details overlay (Date, Duration, Level) */}
                <div style={{
                  position: 'absolute', left: 0, top: '240px', bottom: '240px', width: '170px',
                  zIndex: 5, padding: '10px 14px', color: '#fff', display: 'flex',
                  flexDirection: 'column', gap: '18px', justifyContent: 'center', boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #c5a880',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a880', flexShrink: 0
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>Date of Issue</div>
                      <div style={{ fontSize: '10px', fontWeight: '700' }}>{getLocalDateString()}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #c5a880',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a880', flexShrink: 0
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>Duration</div>
                      <div style={{ fontSize: '10px', fontWeight: '700' }}>10+ Hours</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #c5a880',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a880', flexShrink: 0
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>Level</div>
                      <div style={{ fontSize: '10px', fontWeight: '700' }}>Beginner to Advanced</div>
                    </div>
                  </div>
                </div>

                {/* Main Right Area Wrapper */}
                <div style={{
                  marginLeft: '210px', flexGrow: 1, height: '100%', display: 'flex',
                  flexDirection: 'row', zIndex: 2, boxSizing: 'border-box', padding: '24px 28px'
                }}>
                  {/* Center Text Column */}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '24px' }}>
                    {/* Header Row (Logo and Cert ID) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img 
                          src="/logo_emblem.png" 
                          alt="RBC Emblem" 
                          style={{ 
                            width: '42px', 
                            height: '42px', 
                            objectFit: 'contain',
                            mixBlendMode: 'multiply'
                          }} 
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: '28px', fontWeight: '900', color: '#0b1a30', letterSpacing: '-0.5px', lineHeight: '1.0', fontFamily: 'system-ui, sans-serif' }}>
                            rbc
                          </div>
                          <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.2px', marginTop: '1px', fontFamily: 'system-ui, sans-serif' }}>
                            <span style={{ color: '#ea580c' }}>I</span><span style={{ color: '#0b1a30' }}>mport & </span>
                            <span style={{ color: '#ea580c' }}>E</span><span style={{ color: '#0b1a30' }}>xport</span>
                          </div>
                          <div style={{ fontSize: '6.5px', color: '#0b1a30', fontWeight: '700', letterSpacing: '0.5px', marginTop: '1px', textAlign: 'right' }}>
                            Since <span style={{ color: '#ea580c' }}>2011</span>
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

                    {/* Certificate Titles */}
                    <div style={{ textAlign: 'center', margin: '6px 0' }}>
                      <h1 style={{
                        fontSize: '32px', fontWeight: '900', color: '#0b1a30', margin: '0 0 2px',
                        letterSpacing: '2.5px', fontFamily: '"Georgia", serif'
                      }}>
                        CERTIFICATE
                      </h1>
                      <h2 style={{
                        fontSize: '22px', fontWeight: '800', color: '#c5a880', margin: '0 0 6px',
                        letterSpacing: '3px', fontFamily: '"Georgia", serif', textTransform: 'uppercase'
                      }}>
                        Of Completion
                      </h2>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '6px 0 2px' }}>
                        <span style={{ color: '#c5a880', fontSize: '10px' }}>✦</span>
                        <span style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#64748b', fontWeight: '700' }}>THIS IS PROUDLY PRESENTED TO</span>
                        <span style={{ color: '#c5a880', fontSize: '10px' }}>✦</span>
                      </div>

                      {/* Student Name */}
                      <h2 style={{
                        fontSize: '44px', fontWeight: '800', color: '#0b1a30', margin: '4px 0',
                        fontFamily: '"Georgia", serif', fontStyle: 'italic'
                      }}>
                        {currentUser?.name || fallbackName}
                      </h2>

                      {/* Name divider ribbon decoration */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '2px 0 8px' }}>
                        <div style={{ width: '80px', height: '1px', background: '#c5a880' }} />
                        <span style={{ color: '#c5a880', fontSize: '10px' }}>◊</span>
                        <div style={{ width: '80px', height: '1px', background: '#c5a880' }} />
                      </div>

                      <p style={{ fontSize: '10px', color: '#475569', lineHeight: 1.5, margin: '6px auto', maxWidth: '480px' }}>
                        for successfully completing all syllabus modules, practice quizzes, video lectures, and assessments in the course
                      </p>

                      {/* Course Banner Ribbon */}
                      <div style={{
                        background: '#0f172a', color: '#fff', padding: '10px 30px', borderRadius: '2px',
                        display: 'inline-block', fontWeight: '800', fontSize: '14px', letterSpacing: '1.5px',
                        boxShadow: '0 4px 10px rgba(15,23,42,0.2)', border: '1px solid #c5a880', margin: '6px 0',
                        position: 'relative'
                      }}>
                        {/* Ribbon swallowtails */}
                        <svg style={{ position: 'absolute', right: '100%', top: 0, height: '100%', width: '12px' }} viewBox="0 0 12 38" preserveAspectRatio="none">
                          <polygon points="12,0 0,19 12,38" fill="#0f172a" />
                          <polyline points="12,0 0,19 12,38" stroke="#c5a880" strokeWidth="2" fill="none" />
                        </svg>
                        <svg style={{ position: 'absolute', left: '100%', top: 0, height: '100%', width: '12px' }} viewBox="0 0 12 38" preserveAspectRatio="none">
                          <polygon points="0,0 12,19 0,38" fill="#0f172a" />
                          <polyline points="0,0 12,19 0,38" stroke="#c5a880" strokeWidth="2" fill="none" />
                        </svg>
                        {certCourseTitle.toUpperCase()}
                      </div>

                      <p style={{ fontSize: '9px', color: '#64748b', fontStyle: 'italic', margin: '6px auto 0', maxWidth: '480px', lineHeight: '1.3' }}>
                        You have demonstrated dedication, consistency, and a strong understanding of International Trade, Logistics, Documentation, Customs, Shipping, Payment Terms, and Global Business Practices.
                      </p>
                    </div>

                    {/* Bottom Row Signatures & Wax Seal & QR Code */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginTop: '4px' }}>
                      {/* Left: Kunal Pawar Signature */}
                      <div style={{ width: '150px', textAlign: 'center', paddingBottom: '10px' }}>
                        <div style={{ fontFamily: '"Georgia", serif', fontStyle: 'italic', fontSize: '20px', color: '#1e293b', height: '24px', lineHeight: '24px' }}>
                          Kunal Pawar
                        </div>
                        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '4px', marginTop: '4px' }}>
                          <div style={{ fontSize: '9px', fontWeight: '800', color: '#0f172a' }}>KUNAL PAWAR</div>
                          <div style={{ fontSize: '7px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Academy Director</div>
                        </div>
                      </div>

                      {/* Center: Wax Seal & QR code */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', bottom: '-4px', width: '180px' }}>
                        <svg width="72" height="72" viewBox="0 0 100 100">
                          <path d="M50 0 L55 35 L90 10 L65 45 L100 50 L65 55 L90 90 L55 65 L50 100 L45 65 L10 90 L35 55 L0 50 L35 45 L10 10 L45 35 Z" fill="#d97706" />
                          <circle cx="50" cy="50" r="38" fill="#0f172a" />
                          <circle cx="50" cy="50" r="34" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="3,3" />
                          <text x="50" y="42" fill="#d97706" fontSize="7" fontWeight="900" textAnchor="middle">COMPLETED</text>
                          <text x="50" y="52" fill="#d97706" fontSize="7" fontWeight="900" textAnchor="middle">WITH</text>
                          <text x="50" y="62" fill="#d97706" fontSize="7" fontWeight="900" textAnchor="middle">EXCELLENCE</text>
                        </svg>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                          <svg width="28" height="28" viewBox="0 0 25 25" style={{ background: '#fff', padding: '2px', border: '1px solid #cbd5e1', flexShrink: 0 }}>
                            <path d="M0 0h7v7H0zm1 1v5h5V1zm10 0h3v3h-3zm3 0h4v4h-4zM0 10h3v3H0zm5 0h3v3H5zm6 0h3v3h-3zm4 0h4v4h-4zm-8 4v4H0v-4zm4 0h3v3H7zm11 0h3v3h-3zM0 18h7v7H0zm1 1v5h5v-5zm10 0h3v3h-3z" fill="#0f172a" />
                          </svg>
                          <div style={{ fontSize: '5px', color: '#64748b', textAlign: 'left', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.3px', lineHeight: '1.2' }}>
                            <span style={{ color: '#0f172a', fontWeight: '900' }}>VERIFY CERTIFICATE</span><br />
                            Scan QR code or visit<br />
                            academy.rbcimportandexport.com/verify
                          </div>
                        </div>
                      </div>

                      {/* Right: Prakash Signature */}
                      <div style={{ width: '150px', textAlign: 'center', paddingBottom: '10px' }}>
                        <div style={{ fontFamily: '"Georgia", serif', fontStyle: 'italic', fontSize: '20px', color: '#1e293b', height: '24px', lineHeight: '24px' }}>
                          Prakash Kachchhi
                        </div>
                        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '4px', marginTop: '4px' }}>
                          <div style={{ fontSize: '9px', fontWeight: '800', color: '#0f172a' }}>PRAKASH KACHCHHI</div>
                          <div style={{ fontSize: '7px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Founder & CEO</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Benefits list */}
                  <div style={{
                    width: '130px', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-around', height: '100%', boxSizing: 'border-box'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a880', margin: '0 auto 4px', flexShrink: 0
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5V4.5z" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: '1.2' }}>
                        COMPREHENSIVE<br />CURRICULUM
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a880', margin: '0 auto 4px', flexShrink: 0
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: '1.2' }}>
                        INDUSTRY<br />RELEVANT
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a880', margin: '0 auto 4px', flexShrink: 0
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: '1.2' }}>
                        EXPERT<br />INSTRUCTORS
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%', background: '#0f172a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c5a880', margin: '0 auto 4px', flexShrink: 0
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                      </div>
                      <div style={{ fontSize: '7px', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: '1.2' }}>
                        GLOBAL<br />PERSPECTIVE
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
