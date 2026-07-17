import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Users, Send, ShieldCheck } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline';
  bio: string;
  avatarText: string;
}

interface ChatMessage {
  sender: 'student' | 'expert';
  text: string;
  time: string;
}

export const CommunityScreen: React.FC = () => {
  const { users, currentUser, language } = useApp();
  const [activeTab, setActiveTab] = useState<'experts' | 'directory'>('experts');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ [expertId: string]: ChatMessage[] }>({});
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // List of Senior Experts
  const experts: Expert[] = [
    {
      id: 'exp-1',
      name: language === 'hi' ? 'शांतनु शर्मा' : language === 'gu' ? 'શાંતનુ શર્મા' : 'Shantanu Sharma',
      role: language === 'hi' ? 'निर्यात निदेशक (Export Director)' : language === 'gu' ? 'નિકાસ નિયામક' : 'Export Director',
      status: 'online',
      bio: language === 'hi' ? 'FCL कंटेनर प्लानिंग, ग्लोबल कस्टम्स क्लीयरेंस और बायर वेटिंग के विशेषज्ञ।' : 'Specializes in FCL container planning, global customs clearance, and buyer vetting.',
      avatarText: 'SS'
    },
    {
      id: 'exp-2',
      name: language === 'hi' ? 'पूजा मेहता' : language === 'gu' ? 'પૂજા મહેતા' : 'Pooja Mehta',
      role: language === 'hi' ? 'सीमा शुल्क सलाहकार (Customs Consultant)' : language === 'gu' ? 'કસ્ટમ્સ કન્સલ્ટન્ટ' : 'Customs Consultant',
      status: 'online',
      bio: language === 'hi' ? 'CDSCO, BIS नियमों, HSN कोड वर्गीकरण और आयात शुल्क गणना पर विशेषज्ञ।' : 'Expert on CDSCO, BIS regulations, HSN code classifications, and import duty calculations.',
      avatarText: 'PM'
    },
    {
      id: 'exp-3',
      name: 'Alex Wong',
      role: language === 'hi' ? 'रसद प्रबंधक (Logistics Manager)' : language === 'gu' ? 'લોજિસ્ટિક્સ મેનેજર' : 'Logistics Manager',
      status: 'offline',
      bio: language === 'hi' ? 'समुद्री माल ढुलाई फारवर्डर, THC समन्वयक और पोर्ट डेमरेज वार्ताकार।' : 'Ocean freight forwarder, THC coordinator, and port demurrage negotiator.',
      avatarText: 'AW'
    }
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, selectedExpert]);

  // Expert answer simulator
  const getExpertReply = (query: string, _expertName: string): string => {
    const q = query.toLowerCase();
    
    if (language === 'hi') {
      if (q.includes('landed cost') || q.includes('लागत')) {
        return `नमस्ते! लैंडेड कॉस्ट (Landed Cost) का मतलब केवल सप्लायर की बिल रेट नहीं होती। इसमें माल की फैक्टरी कीमत, समुद्र/हवाई माल ढुलाई, सीमा शुल्क (Customs Clearance) और आपके गोदाम तक लाने का स्थानीय किराया सब शामिल होता है। हमेशा इसी पर प्रॉफिट कैलकुलेट करें!`;
      }
      if (q.includes('fob')) {
        return `FOB (Free On Board) में रिस्क तब ट्रांसफर होता है जब माल लोडिंग पोर्ट पर जहाज के रेल (ship's rail) को पार कर जाता है। इसके बाद समुद्री भाड़ा और रिस्क बायर का होता है।`;
      }
      if (q.includes('custom') || q.includes('कस्टम') || q.includes('duty') || q.includes('शुल्क')) {
        return `सीमा शुल्क (Customs Duty) के लिए सही HSN कोड होना बहुत जरूरी है। गलत HSN कोड डिक्लेरेशन से आपका शिपमेंट रुक सकता है और भारी पेनाल्टी लग सकती है।`;
      }
      return `यह एक बेहतरीन सवाल है! आयात-निर्यात में इस तरह की व्यावहारिक बारीकियां बहुत महत्व रखती हैं। क्या आप इस विषय पर अधिक विस्तार से जानना चाहते हैं? मैं यहाँ मदद के लिए हूँ।`;
    }

    if (language === 'gu') {
      if (q.includes('landed cost') || q.includes('ખર્ચ')) {
        return `નમસ્તે! લેન્ડેડ કોસ્ટ એટલે ફક્ત પ્રોડક્ટની કિંમત નહીં, પણ તેમાં નૂર, કસ્ટમ્સ ડ્યુટી અને ગોડાઉન સુધી લાવવાનો તમામ સ્થાનિક ખર્ચ શામેલ છે. પ્રોફિટ હંમેશા આના આધારે જ ગણો!`;
      }
      if (q.includes('fob')) {
        return `FOB શરતો હેઠળ, એકવાર માલ જહાજ પર લોડ થઈ જાય પછી તમામ જોખમ અને નૂર ખર્ચ ખરીદારના વશમાં જાય છે.`;
      }
      return `ખૂબ સારો પ્રશ્ન છે! આયાત અને નિકાસ પ્રક્રિયામાં આવા દસ્તાવેજો અને નિયમો ખૂબ જ મહત્વપૂર્ણ છે. જો તમારે કોઈ ચોક્કસ દસ્તાવેજ વિશે માહિતી જોઈતી હોય તો મને જણાવો.`;
    }

    // Default English replies
    if (q.includes('landed cost')) {
      return `Hello! Landed Cost is crucial. Remember to calculate: Product price + Ocean/Air freight + Custom clearance + BCD/IGST duties + Local warehousing transport. Never rely solely on the factory invoice price!`;
    }
    if (q.includes('fob')) {
      return `Under FOB terms, the risk transfers to the buyer as soon as the goods are loaded on board the vessel. The buyer is responsible for ocean freight and cargo insurance.`;
    }
    if (q.includes('custom') || q.includes('duty')) {
      return `Customs compliance is heavily dependent on correct HSN codes. Ensure your supplier mentions the exact 8-digit HSN code on the Proforma Invoice.`;
    }
    return `That's a practical question! Experienced traders always verify these details before sending deposit wire transfers. Let me know if you need specific guidance on documentation.`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !selectedExpert) return;

    const studentMsg: ChatMessage = {
      sender: 'student',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const expertId = selectedExpert.id;
    const expertName = selectedExpert.name;
    const userQuery = chatInput;

    setMessages(prev => ({
      ...prev,
      [expertId]: [...(prev[expertId] || []), studentMsg]
    }));

    setChatInput('');
    setIsTyping(true);

    // Simulate expert thinking & typing
    setTimeout(() => {
      const replyText = getExpertReply(userQuery, expertName);
      const expertMsg: ChatMessage = {
        sender: 'expert',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => ({
        ...prev,
        [expertId]: [...(prev[expertId] || []), expertMsg]
      }));
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="community-view-layout" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: 'calc(100vh - var(--topbar-height))', backgroundColor: 'var(--md-sys-color-background)' }}>
      {/* Left Sidebar: Tabs and Lists */}
      <div className="community-sidebar" style={{ borderRight: '1px solid var(--md-sys-color-outline-variant)', backgroundColor: 'var(--md-sys-color-surface)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Toggle Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--md-sys-color-outline-variant)', padding: '12px' }}>
          <button 
            className={`btn ${activeTab === 'experts' ? 'btn-primary' : 'btn-outlined'}`} 
            onClick={() => setActiveTab('experts')}
            style={{ flex: 1, padding: '8px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '8px 0 0 8px' }}
          >
            <MessageSquare size={14} />
            <span>{language === 'hi' ? 'वरिष्ठ विशेषज्ञ' : language === 'gu' ? 'નિષ્ણાતો' : 'Seniors'}</span>
          </button>
          <button 
            className={`btn ${activeTab === 'directory' ? 'btn-primary' : 'btn-outlined'}`} 
            onClick={() => setActiveTab('directory')}
            style={{ flex: 1, padding: '8px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '0 8px 8px 0', borderLeft: 'none' }}
          >
            <Users size={14} />
            <span>{language === 'hi' ? 'यूज़र प्रोफाइल' : language === 'gu' ? 'સભ્યો' : 'Members'}</span>
          </button>
        </div>

        {/* List Content */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '12px' }}>
          {activeTab === 'experts' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {experts.map(exp => {
                const isSelected = selectedExpert?.id === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => {
                      if (exp.status === 'online') {
                        setSelectedExpert(exp);
                      }
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                      backgroundColor: isSelected ? 'var(--md-sys-color-primary-container)' : 'transparent',
                      cursor: exp.status === 'online' ? 'pointer' : 'not-allowed',
                      opacity: exp.status === 'online' ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      gap: '12px'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#ffffff' : 'var(--md-sys-color-secondary-container)',
                      color: 'var(--md-sys-color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      position: 'relative'
                    }}>
                      {exp.avatarText}
                      <span style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: exp.status === 'online' ? '#22c55e' : '#94a3b8',
                        border: '2px solid #ffffff'
                      }}></span>
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface)' }}>{exp.name}</strong>
                        <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: exp.status === 'online' ? '#22c55e' : '#94a3b8' }}>
                          {exp.status === 'online' ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--md-sys-color-primary)', fontWeight: 600, marginTop: '2px' }}>{exp.role}</div>
                      <p style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)', margin: '4px 0 0', lineHeight: 1.3 }}>{exp.bio}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '12px', color: 'var(--md-sys-color-secondary)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {language === 'hi' ? 'सक्रिय यूज़र डायरेक्टरी' : language === 'gu' ? 'સક્રિય સભ્યો' : 'Active User Profiles'} ({users.length})
              </h4>
              {users.map(u => (
                <div 
                  key={u.id}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: u.email === currentUser?.email ? 'rgba(21, 128, 61, 0.05)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--md-sys-color-primary-container)',
                    color: 'var(--md-sys-color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '13px'
                  }}>
                    {u.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)' }}>
                      {u.name} {u.email === currentUser?.email && <span style={{ fontSize: '9px', backgroundColor: '#22c55e', color: '#ffffff', padding: '2px 6px', borderRadius: '10px', marginLeft: '4px' }}>YOU</span>}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>{u.email}</div>
                    <div style={{ fontSize: '10px', color: 'var(--md-sys-color-secondary)', marginTop: '2px', fontWeight: 500 }}>
                      Progress: {u.progressPercentage || 0}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Area: Interactive Chat Space */}
      <div className="community-chat-area" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--md-sys-color-background)' }}>
        {selectedExpert ? (
          <>
            {/* Chat Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--md-sys-color-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '15px'
                }}>
                  {selectedExpert.avatarText}
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)', margin: 0 }}>
                    {selectedExpert.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
                    <span style={{ fontSize: '11px', color: 'var(--md-sys-color-primary)', fontWeight: 500 }}>{selectedExpert.role}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.1)', padding: '6px 12px', borderRadius: '20px', fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>RBC Senior Advisor</span>
              </div>
            </div>

            {/* Message History View */}
            <div style={{ flexGrow: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Default Greeting Message */}
              <div style={{ display: 'flex', gap: '12px', maxWidth: '80%' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>
                  {selectedExpert.avatarText}
                </div>
                <div style={{ padding: '12px 16px', borderRadius: '0 16px 16px 16px', backgroundColor: 'var(--md-sys-color-surface)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: 'var(--md-sys-color-on-surface)' }}>
                    {language === 'hi' 
                      ? `नमस्कार! मैं ${selectedExpert.name} हूँ। निर्यात-आयात व्यापार या हमारे सिलेबस के नियमों के संबंध में आपका कोई भी प्रश्न हो, तो बेझिझक यहाँ पूछें!`
                      : `Hello! I am ${selectedExpert.name}. Feel free to ask any question regarding export-import procedures, cargo guidelines, or syllabus topics.`}
                  </p>
                </div>
              </div>

              {/* Chat Thread */}
              {(messages[selectedExpert.id] || []).map((msg, idx) => {
                const isStudent = msg.sender === 'student';
                return (
                  <div 
                    key={idx} 
                    style={{
                      display: 'flex',
                      gap: '12px',
                      maxWidth: '80%',
                      alignSelf: isStudent ? 'flex-end' : 'flex-start',
                      flexDirection: isStudent ? 'row-reverse' : 'row'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isStudent ? 'var(--md-sys-color-secondary)' : 'var(--md-sys-color-primary)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      flexShrink: 0
                    }}>
                      {isStudent ? (currentUser?.name || 'JD').split(' ').map(n => n[0]).join('').toUpperCase() : selectedExpert.avatarText}
                    </div>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: isStudent ? '16px 0 16px 16px' : '0 16px 16px 16px',
                      backgroundColor: isStudent ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      color: isStudent ? '#ffffff' : 'var(--md-sys-color-on-surface)'
                    }}>
                      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{msg.text}</p>
                      <div style={{ fontSize: '10px', textAlign: 'right', marginTop: '4px', opacity: 0.7 }}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                    {selectedExpert.avatarText}
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '0 16px 16px 16px', backgroundColor: 'var(--md-sys-color-surface)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                    <div className="typing-dots" style={{ display: 'flex', gap: '4px', padding: '4px 0' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary)', animation: 'bounce-dot 1.4s infinite ease-in-out both' }}></span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary)', animation: 'bounce-dot 1.4s infinite ease-in-out both 0.2s' }}></span>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary)', animation: 'bounce-dot 1.4s infinite ease-in-out both 0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface)',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <input 
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'hi' ? 'वरिष्ठ सलाहकार से अपना सवाल पूछें...' : language === 'gu' ? 'નિષ્ણાતને તમારો પ્રશ્ન પૂછો...' : 'Ask your query to senior expert...'}
                className="input-field"
                style={{ flexGrow: 1 }}
              />
              <button 
                className="btn btn-primary"
                onClick={handleSendMessage}
                disabled={!chatInput.trim()}
                style={{ padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '48px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--md-sys-color-primary)' }}>
              <MessageSquare size={36} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--md-sys-color-on-surface)', margin: 0 }}>
              {language === 'hi' ? 'वरिष्ठ सलाहकार हॉटलाइन' : language === 'gu' ? 'નિષ્ણાત હોટલાઇન' : 'Senior Advisory Hotline'}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '400px', margin: 0 }}>
              {language === 'hi' 
                ? 'बाईं ओर दी गई सूची से किसी भी ऑनलाइन विशेषज्ञ (Online Expert) को चुनें और सीधे अपने व्यापार के संदेहों पर चैट शुरू करें।'
                : 'Select an online expert from the left sidebar list and start chatting about your business doubts in real-time.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
