import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Award, Shield, User, Clock, FileText, Edit3, Save, X, CheckCircle, BookOpen, Star, TrendingUp } from 'lucide-react';

export const Profile: React.FC = () => {
  const { courses, progress, getCourseCompletionPercentage, currentUser, loginUser } = useApp();
  const [showCertificate, setShowCertificate] = useState(false);
  const [certCourseTitle, setCertCourseTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || 'Jane Doe');
  const [editEmail, setEditEmail] = useState(currentUser?.email || 'jane.doe@edu.org');

  const completedLessons = Object.values(progress).filter(p => p.completed).length;
  const quizzesAttempted = Object.values(progress).filter(p => Object.keys(p.quizScores).length > 0).length;
  const completedCourses = courses.filter(c => getCourseCompletionPercentage(c.id) === 100);
  const totalProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + getCourseCompletionPercentage(c.id), 0) / courses.length)
    : 0;

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

  const avatarInitials = (currentUser?.name || 'Jane Doe')
    .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)',
      padding: '0',
      overflowY: 'auto'
    }}>
      {/* ── Hero Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a365d 0%, #2d5a9e 50%, #1e3a5f 100%)',
        padding: '48px 40px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '30%', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '28px', position: 'relative', zIndex: 1 }}>
          {/* Avatar */}
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', fontWeight: '800', color: '#1e293b',
            border: '4px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            flexShrink: 0
          }}>
            {avatarInitials}
          </div>

          {/* Name / Email */}
          <div style={{ flexGrow: 1 }}>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px' }}>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  placeholder="Full Name"
                  style={{
                    padding: '10px 16px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '16px',
                    outline: 'none', backdropFilter: 'blur(8px)'
                  }}
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  placeholder="Email Address"
                  style={{
                    padding: '10px 16px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '14px',
                    outline: 'none', backdropFilter: 'blur(8px)'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleSave} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 18px', borderRadius: '8px', border: 'none',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer'
                  }}>
                    <Save size={14} /> Save
                  </button>
                  <button onClick={() => setIsEditing(false)} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)',
                    background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer'
                  }}>
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px' }}>
                  {currentUser?.name || 'Jane Doe'}
                </h1>
                <p style={{ margin: '4px 0 12px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                  {currentUser?.email || 'jane.doe@edu.org'}
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 12px', borderRadius: '20px',
                    background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.4)',
                    color: '#fbbf24', fontSize: '12px', fontWeight: '600'
                  }}>
                    <User size={11} /> RBC Academy Student
                  </span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 12px', borderRadius: '20px',
                    background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)',
                    color: '#c4b5fd', fontSize: '12px', fontWeight: '600'
                  }}>
                    <Shield size={11} /> Import & Export Master
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Edit button */}
          {!isEditing && (
            <button onClick={() => {
              setEditName(currentUser?.name || 'Jane Doe');
              setEditEmail(currentUser?.email || 'jane.doe@edu.org');
              setIsEditing(true);
            }} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.1)',
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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
          backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '20px', padding: '24px 28px', marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#fbbf24" />
              <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: '600' }}>Overall Course Progress</span>
            </div>
            <span style={{ color: '#fbbf24', fontSize: '22px', fontWeight: '800' }}>{totalProgress}%</span>
          </div>
          <div style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${totalProgress}%`,
              background: 'linear-gradient(90deg, #fbbf24, #f97316)',
              borderRadius: '10px',
              transition: 'width 1s ease',
              boxShadow: '0 0 12px rgba(251,191,36,0.4)'
            }} />
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { icon: <FileText size={22} color="#60a5fa" />, label: 'Lessons Done', value: completedLessons, unit: 'lessons', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
            { icon: <Award size={22} color="#a78bfa" />, label: 'Quizzes Taken', value: quizzesAttempted, unit: 'quizzes', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
            { icon: <Clock size={22} color="#34d399" />, label: 'Study Hours', value: (completedLessons * 0.3).toFixed(1), unit: 'hours', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: stat.bg, border: `1px solid ${stat.border}`,
              borderRadius: '16px', padding: '20px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}>
              <div style={{ marginBottom: '12px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#f1f5f9', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{stat.unit}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '6px', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Course Progress List */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px', padding: '24px', marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <BookOpen size={18} color="#60a5fa" />
            <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '16px', fontWeight: '700' }}>Course Progress</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {courses.map(course => {
              const pct = getCourseCompletionPercentage(course.id);
              return (
                <div key={course.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '500' }}>{course.title}</span>
                    <span style={{ fontSize: '13px', color: pct === 100 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                      {pct === 100 ? '✓ Done' : `${pct}%`}
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: pct === 100
                        ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                        : 'linear-gradient(90deg, #3b82f6, #60a5fa)',
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
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px', padding: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Star size={18} color="#fbbf24" />
            <h3 style={{ margin: 0, color: '#e2e8f0', fontSize: '16px', fontWeight: '700' }}>Earned Certificates</h3>
          </div>

          {completedCourses.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '40px 20px',
              border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px'
            }}>
              <Award size={48} color="rgba(255,255,255,0.2)" style={{ marginBottom: '12px' }} />
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
                No certificates yet. Complete 100% of any course to earn your credential!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {completedCourses.map(course => (
                <div key={course.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(249,115,22,0.1))',
                  border: '1px solid rgba(251,191,36,0.2)'
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
                      <div style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '14px' }}>Certificate of Excellence</div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{course.title} · {getLocalDateString()}</div>
                    </div>
                  </div>
                  <button onClick={() => handleOpenCertificate(course.title)} style={{
                    padding: '8px 18px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                    color: '#1e293b', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
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
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)'
        }}>
          <div onClick={() => setShowCertificate(false)}
            style={{ position: 'absolute', inset: 0 }} />
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'linear-gradient(135deg, #fefce8, #fff7ed)',
            borderRadius: '20px', padding: '4px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
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
                {currentUser?.name || 'Jane Doe'}
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
