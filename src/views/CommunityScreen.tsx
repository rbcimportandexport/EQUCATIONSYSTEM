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
      height: '100%',
      background: 'var(--md-sys-color-background)',
      padding: '32px',
      overflowY: 'auto'
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

      {/* Certificate modal preview */}
      {showCertModal && (
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

          <div onClick={() => setShowCertModal(false)}
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
                        <div style={{ fontSize: '11px', fontWeight: '700' }}>
                          {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
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
                            let sum = 0;
                            for (let i = 0; i < selectedCertUser.length; i++) { sum += selectedCertUser.charCodeAt(i); }
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
                        {selectedCertUser}
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
                        {((language === 'hi' ? 'आयात एवं निर्यात मास्टर कोर्स' : language === 'gu' ? 'આયાત અને નિકાસ માસ્ટર કોર્સ' : 'Import & Export Master Course')).toUpperCase()}
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
