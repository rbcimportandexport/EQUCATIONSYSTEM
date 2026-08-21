import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, X } from 'lucide-react';

export const SmartReminder: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Only show if user is logged in
    if (!currentUser) return;

    // Check last time reminder was shown to prevent spamming
    const lastShown = localStorage.getItem('rbc_last_reminder');
    const now = new Date();
    const hour = now.getHours();

    // Determine current time block
    let timeBlock = '';
    let currGreeting = '';
    
    if (hour >= 8 && hour < 12) {
      timeBlock = 'morning';
      currGreeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      timeBlock = 'afternoon';
      currGreeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 22) {
      timeBlock = 'evening';
      currGreeting = 'Good Evening';
    } else {
      // Don't show late night or early morning
      return;
    }

    // If we already showed a reminder for THIS time block today, don't show again
    const todayStr = now.toDateString();
    const cacheKey = `${todayStr}-${timeBlock}`;
    
    if (lastShown === cacheKey) {
      return;
    }

    // Set message and show
    setGreeting(currGreeting);
    setMessage(`${currentUser.name}, don't forget to complete your progress today!`);
    setIsVisible(true);
    
    // Save to local storage so we don't spam
    localStorage.setItem('rbc_last_reminder', cacheKey);

    // Auto hide after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentUser]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      background: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      borderLeft: '4px solid #3b82f6',
      padding: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      maxWidth: '320px',
      animation: 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{
        background: '#eff6ff',
        padding: '8px',
        borderRadius: '50%',
        color: '#3b82f6'
      }}>
        <Bell size={20} className="animate-pulse" />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
          {greeting} 
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>
          {message}
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#94a3b8',
          padding: '4px',
          display: 'flex'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
};
