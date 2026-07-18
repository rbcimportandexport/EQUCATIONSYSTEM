import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Shield, User, Clock, FileText, Edit3, Save, X, CheckCircle, BookOpen, Star, TrendingUp } from 'lucide-react';

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {visibleCertificates.map(course => (
                <div key={course.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                  border: '1px solid #fde68a'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <CheckCircle size={22} color="#fff" />
                    </div>
                    <div>
                      <div style={{ color: '#78350f', fontWeight: '700', fontSize: '14px' }}>Certificate of Excellence</div>
                      <div style={{ color: '#92400e', fontSize: '12px' }}>{course.title} · {getLocalDateString()}</div>
                    </div>
                  </div>
                  <button onClick={() => handleOpenCertificate(course.title)} style={{
                    padding: '8px 18px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                    color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(245,158,11,0.3)'
                  }}>
                    View
                  </button>
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
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)'
        }}>
          <div onClick={() => setShowCertificate(false)}
            style={{ position: 'absolute', inset: 0 }} />
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'linear-gradient(135deg, #fefce8, #fff7ed)',
            borderRadius: '20px', padding: '4px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            maxWidth: '600px', width: '90%'
          }}>
            <div style={{
              border: '3px solid #d97706', borderRadius: '16px',
              padding: '40px', textAlign: 'center',
              background: 'linear-gradient(135deg, #fffbeb, #fef3c7)'
            }}>
              <div style={{ fontSize: '13px', letterSpacing: '3px', color: '#92400e', fontWeight: '700', marginBottom: '8px' }}>
                RBC IMPORT & EXPORT ACADEMY
              </div>
              <Award size={48} color="#d97706" style={{ margin: '8px auto 16px' }} />
              <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#78350f', margin: '0 0 8px', letterSpacing: '2px' }}>
                CERTIFICATE OF COMPLETION
              </h1>
              <p style={{ color: '#92400e', fontSize: '13px', margin: '0 0 20px' }}>THIS IS PROUDLY PRESENTED TO</p>
              <h2 style={{
                fontSize: '32px', fontWeight: '800', color: '#1e293b', margin: '0 0 12px',
                fontFamily: 'Georgia, serif', fontStyle: 'italic'
              }}>
                {currentUser?.name || fallbackName}
              </h2>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #d97706, transparent)', margin: '0 0 16px' }} />
              <p style={{ color: '#78350f', fontSize: '13px', lineHeight: 1.6, margin: '0 0 16px' }}>
                for successfully completing all syllabus modules, practice quizzes,<br/>
                video lectures, and assessments in the course
              </p>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e3a5f', margin: '0 0 24px' }}>
                {certCourseTitle}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '700', color: '#1e293b', borderBottom: '2px solid #d97706', paddingBottom: '4px', marginBottom: '4px' }}>
                    RBC Academy Director
                  </div>
                  <div style={{ fontSize: '11px', color: '#92400e' }}>Authorized Signatory</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '700', color: '#1e293b', borderBottom: '2px solid #d97706', paddingBottom: '4px', marginBottom: '4px' }}>
                    {getLocalDateString()}
                  </div>
                  <div style={{ fontSize: '11px', color: '#92400e' }}>Date of Issuance</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', padding: '16px 40px' }}>
              <button onClick={() => window.print()} style={{
                flex: 1, padding: '12px', borderRadius: '10px',
                border: '2px solid #d97706', background: 'transparent',
                color: '#92400e', fontWeight: '700', fontSize: '14px', cursor: 'pointer'
              }}>
                🖨️ Print
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
