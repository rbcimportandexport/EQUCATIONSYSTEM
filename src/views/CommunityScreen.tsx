import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, UserCheck, Award } from 'lucide-react';

export const CommunityScreen: React.FC = () => {
  const { users, currentUser, language, certificates } = useApp();
  const [showCertModal, setShowCertModal] = React.useState(false);
  const [selectedCertUser, setSelectedCertUser] = React.useState('');

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

  const title = language === 'hi' ? 'सक्रिय सदस्य' : language === 'gu' ? 'સક્રિય સભ્યો' : 'Active Members';
  const subtitle = language === 'hi'
    ? 'इस प्लेटफॉर्म पर रजिस्टर्ड सभी यूज़र्स की सूची'
    : language === 'gu'
    ? 'આ પ્લેટફોર્મ પર નોંધાયેલ તમામ વપરાશકર્તાઓ'
    : 'All users registered on this platform';

  const youLabel = language === 'hi' ? 'आप' : language === 'gu' ? 'તમે' : 'YOU';
  const progressLabel = language === 'hi' ? 'प्रगति' : language === 'gu' ? 'પ્રગતિ' : 'Progress';
  const emptyLabel = language === 'hi'
    ? 'अभी तक कोई सदस्य नहीं। प्रोफाइल अपडेट करें!'
    : language === 'gu'
    ? 'હજુ સુધી કોઈ સભ્ય નથી. પ્રોફાઇલ અપડેટ કરો!'
    : 'No members yet. Update your profile to appear here!';

  return (
    <div style={{
      minHeight: '100%',
      background: 'var(--md-sys-color-background)',
      padding: '32px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        marginBottom: '8px'
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'var(--md-sys-color-primary-container)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--md-sys-color-primary)'
        }}>
          <Users size={24} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: 'var(--md-sys-color-on-background)' }}>
            {title}
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--md-sys-color-on-surface-variant)' }}>
            {subtitle}
          </p>
        </div>
        <div style={{
          marginLeft: 'auto',
          padding: '6px 16px', borderRadius: '20px',
          background: 'var(--md-sys-color-primary-container)',
          color: 'var(--md-sys-color-primary)',
          fontWeight: '700', fontSize: '14px'
        }}>
          {users.length}
        </div>
      </div>

      <div style={{
        height: '1px', background: 'var(--md-sys-color-outline-variant)',
        margin: '20px 0'
      }} />

      {/* Members Grid */}
      {users.length === 0 ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '80px 20px', gap: '16px',
          border: '2px dashed var(--md-sys-color-outline-variant)',
          borderRadius: '20px', textAlign: 'center'
        }}>
          <UserCheck size={48} color="var(--md-sys-color-outline)" />
          <p style={{ margin: 0, color: 'var(--md-sys-color-on-surface-variant)', fontSize: '15px' }}>
            {emptyLabel}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {users.map(u => {
            const isMe = u.email === currentUser?.email;
            const initials = u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            const pct = u.progressPercentage || 0;
            const lvl = getLevelDetails(pct, language);

            return (
              <div key={u.id} style={{
                padding: '20px',
                borderRadius: '16px',
                border: isMe
                  ? '2px solid var(--md-sys-color-primary)'
                  : '1px solid var(--md-sys-color-outline-variant)',
                background: isMe
                  ? 'var(--md-sys-color-primary-container)'
                  : 'var(--md-sys-color-surface)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}>
                {/* Avatar + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: isMe
                      ? 'var(--md-sys-color-primary)'
                      : 'var(--md-sys-color-secondary-container)',
                    color: isMe ? '#fff' : 'var(--md-sys-color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '16px', flexShrink: 0
                  }}>
                    {initials}
                  </div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '15px', fontWeight: '700',
                        color: 'var(--md-sys-color-on-surface)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        maxWidth: '140px'
                      }}>
                        {u.name}
                      </span>
                      {isMe && (
                        <span style={{
                          fontSize: '10px', fontWeight: '700',
                          background: 'var(--md-sys-color-primary)',
                          color: '#fff', padding: '2px 7px',
                          borderRadius: '10px', letterSpacing: '0.5px'
                        }}>
                          {youLabel}
                        </span>
                      )}
                    </div>
                    <div style={{
                      fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)',
                      marginTop: '2px', whiteSpace: 'nowrap',
                      overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>
                      {u.email}
                    </div>
                  </div>
                </div>

                {/* Level Badge */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '4px 10px', borderRadius: '20px',
                    fontSize: '11px', fontWeight: '800',
                    background: lvl.bg, color: lvl.color,
                    border: lvl.border, boxShadow: lvl.shadow,
                    textTransform: 'uppercase', letterSpacing: '0.5px'
                  }}>
                    {lvl.name}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)',
                    marginBottom: '5px'
                  }}>
                    <span>{progressLabel}</span>
                    <span style={{ fontWeight: '700', color: pct === 100 ? '#22c55e' : 'var(--md-sys-color-primary)' }}>
                      {pct}%
                    </span>
                  </div>
                  <div style={{
                    height: '6px', borderRadius: '6px',
                    background: 'var(--md-sys-color-outline-variant)', overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: pct === 100
                        ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                        : 'linear-gradient(90deg, var(--md-sys-color-primary), var(--md-sys-color-secondary))',
                      borderRadius: '6px', transition: 'width 0.6s ease'
                    }} />
                  </div>
                </div>

                {/* Certificate button if completed */}
                {(pct === 100 || (certificates && certificates.some(c => c.userId === u.id))) && (
                  <div style={{ marginTop: '14px' }}>
                    <button
                      onClick={() => {
                        setSelectedCertUser(u.name);
                        setShowCertModal(true);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #fbbf24, #f97316)',
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 6px rgba(245,158,11,0.2)',
                        transition: 'transform 0.1s ease'
                      }}
                    >
                      {language === 'hi' ? 'प्रमाणपत्र देखें' : language === 'gu' ? 'પ્રમાણપત્ર જુઓ' : 'View Certificate'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Certificate Modal */}
      {showCertModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)'
        }}>
          <div onClick={() => setShowCertModal(false)}
            style={{ position: 'absolute', inset: 0 }} />
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'linear-gradient(135deg, #fefce8, #fff7ed)',
            borderRadius: '20px', padding: '4px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            maxWidth: '600px', width: '95%'
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
                {selectedCertUser}
              </h2>
              <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #d97706, transparent)', margin: '0 0 16px' }} />
              <p style={{ color: '#78350f', fontSize: '13px', lineHeight: 1.6, margin: '0 0 16px' }}>
                for successfully completing all syllabus modules, practice quizzes,<br/>
                video lectures, and assessments in the course
              </p>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e3a5f', margin: '0 0 24px' }}>
                {language === 'hi' ? 'आयात एवं निर्यात मास्टर कोर्स' : language === 'gu' ? 'આયાત અને નિકાસ માસ્ટર કોર્સ' : 'Import & Export Master Course'}
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '700', color: '#1e293b', borderBottom: '2px solid #d97706', paddingBottom: '4px', marginBottom: '4px', fontSize: '12px' }}>
                    RBC Academy Director
                  </div>
                  <div style={{ fontSize: '11px', color: '#92400e' }}>Authorized Signatory</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: '700', color: '#1e293b', borderBottom: '2px solid #d97706', paddingBottom: '4px', marginBottom: '4px', fontSize: '12px' }}>
                    {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                Print
              </button>
              <button onClick={() => setShowCertModal(false)} style={{
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
