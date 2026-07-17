import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, UserCheck } from 'lucide-react';

export const CommunityScreen: React.FC = () => {
  const { users, currentUser, language } = useApp();

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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
