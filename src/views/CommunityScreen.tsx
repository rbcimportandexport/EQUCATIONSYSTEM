import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, UserCheck, MessageSquare, Send, X, MessageCircle } from 'lucide-react';
import { chatApi } from '../utils/api';
import type { ChatMessage } from '../utils/api';

export const CommunityScreen: React.FC = () => {
  const { users, currentUser, language, fetchAllUsers } = useApp();

  const [activeChatUser, setActiveChatUser] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = React.useState('');
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [unreadSenders, setUnreadSenders] = React.useState<string[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Poll for message notifications (which users have messaged the current user)
  React.useEffect(() => {
    if (!currentUser) return;

    const fetchNotifications = async () => {
      try {
        const res = await chatApi.getNotifications(currentUser.id);
        if (res.success) {
          setUnreadSenders(res.senderIds);
        }
      } catch (err) {
        console.error('Error fetching chat notifications:', err);
      }
    };

    fetchNotifications(); // initial load
    const interval = setInterval(fetchNotifications, 3000); // poll every 3 seconds

    return () => clearInterval(interval);
  }, [currentUser]);

  // Poll for messages when a chat is active
  React.useEffect(() => {
    if (!activeChatUser || !currentUser) return;

    const fetchMessages = async () => {
      try {
        const res = await chatApi.getMessages(currentUser.id, activeChatUser.id);
        if (res.success) {
          setMessages(res.messages);
        }
      } catch (err) {
        console.error('Error fetching chat messages:', err);
      }
    };

    fetchMessages(); // initial load

    const interval = setInterval(fetchMessages, 1500); // poll every 1.5s for real-time live updates

    return () => clearInterval(interval);
  }, [activeChatUser, currentUser]);

  // Scroll to bottom on new message
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !currentUser || !activeChatUser) return;

    const txt = messageText.trim();
    setMessageText('');

    try {
      const res = await chatApi.sendMessage(currentUser.id, activeChatUser.id, txt);
      if (res.success) {
        setMessages(prev => [...prev, res.chatMessage]);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  React.useEffect(() => {
    fetchAllUsers();
  }, []);

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
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
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
                      {!isMe && unreadSenders.includes(u.id) && (
                        <span style={{
                          fontSize: '10px', fontWeight: '800',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: '#ffffff', padding: '2px 8px',
                          borderRadius: '10px', letterSpacing: '0.5px',
                          boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)',
                          animation: 'pulse 1.5s infinite'
                        }}>
                          NEW MESSAGE
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

                {/* Chat button if not me */}
                {!isMe && (
                  <div style={{ marginTop: '14px' }}>
                    <button
                      onClick={() => {
                        setActiveChatUser(u);
                        setIsChatOpen(true);
                        setUnreadSenders(prev => prev.filter(id => id !== u.id));
                      }}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--md-sys-color-primary)',
                        background: 'transparent',
                        color: 'var(--md-sys-color-primary)',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--md-sys-color-primary-container)';
                      }}
                      onMouseOut={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      }}
                    >
                      <MessageSquare size={13} />
                      <span>{language === 'hi' ? 'लाइव चैट' : language === 'gu' ? 'લાઇવ ચેટ' : 'Live Chat'}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Live Chat Panel */}
      {isChatOpen && activeChatUser && currentUser && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease forwards',
            padding: '20px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              height: '80vh',
              maxHeight: '640px',
              background: '#ffffff',
              borderRadius: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              border: '1px solid rgba(226, 232, 240, 0.8)'
            }}
          >
            {/* Chat Header */}
            <div 
              style={{
                padding: '18px 24px',
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Active Indicator Avatar */}
                <div style={{ position: 'relative' }}>
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '14px',
                      color: '#ffffff'
                    }}
                  >
                    {activeChatUser.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  {/* Pulsing online indicator */}
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '12px',
                      height: '12px',
                      background: '#22c55e',
                      border: '2px solid #0f172a',
                      borderRadius: '50%',
                      boxShadow: '0 0 8px #22c55e'
                    }} 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '0.2px' }}>{activeChatUser.name}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    {activeChatUser.role === 'admin' ? 'RBC Administrator' : 'RBC Learner'}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setIsChatOpen(false);
                  setActiveChatUser(null);
                }}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#ffffff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div 
              style={{
                flex: 1,
                padding: '24px',
                background: '#f8fafc',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {messages.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#64748b', textAlign: 'center', padding: '0 20px' }}>
                  <MessageCircle size={36} style={{ strokeWidth: 1.5, color: '#94a3b8' }} />
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>
                    {language === 'hi' ? 'कोई संदेश नहीं। लाइव बातचीत शुरू करने के लिए पहला संदेश भेजें!' : language === 'gu' ? 'કોઈ સંદેશ નથી. વાતચીત શરૂ કરવા પહેલો સંદેશ મોકલો!' : 'No messages yet. Send the first message to start a live conversation!'}
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isSentByMe = msg.senderId === currentUser.id;
                  const date = new Date(msg.createdAt);
                  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                  return (
                    <div 
                      key={msg.id || msg._id || index}
                      style={{
                        display: 'flex',
                        justifyContent: isSentByMe ? 'flex-end' : 'flex-start',
                        width: '100%'
                      }}
                    >
                      <div 
                        style={{
                          maxWidth: '75%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isSentByMe ? 'flex-end' : 'flex-start'
                        }}
                      >
                        {/* Bubble */}
                        <div
                          style={{
                            padding: '12px 16px',
                            borderRadius: isSentByMe ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                            background: isSentByMe 
                              ? 'linear-gradient(135deg, var(--md-sys-color-primary), var(--md-sys-color-secondary))' 
                              : '#ffffff',
                            color: isSentByMe ? '#ffffff' : '#1e293b',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            fontWeight: 500,
                            wordBreak: 'break-word',
                            border: isSentByMe ? 'none' : '1px solid #e2e8f0'
                          }}
                        >
                          {msg.text}
                        </div>
                        {/* Time */}
                        <span 
                          style={{
                            fontSize: '10px',
                            color: '#94a3b8',
                            marginTop: '4px',
                            fontWeight: 600
                          }}
                        >
                          {timeString}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Footer */}
            <form 
              onSubmit={handleSendMessage}
              style={{
                padding: '16px 20px',
                background: '#ffffff',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={language === 'hi' ? 'अपना संदेश यहाँ लिखें...' : language === 'gu' ? 'તમારો સંદેશ અહીં લખો...' : 'Write your message here...'}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.15s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--md-sys-color-primary)'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  border: 'none',
                  background: messageText.trim() 
                    ? 'var(--md-sys-color-primary)' 
                    : '#e2e8f0',
                  color: messageText.trim() ? '#ffffff' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: messageText.trim() ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  boxShadow: messageText.trim() ? '0 4px 10px rgba(16,42,86,0.15)' : 'none'
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
