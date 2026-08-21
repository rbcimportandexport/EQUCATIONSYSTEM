import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import logoEmblem from '../assets/logo_emblem.png';
import { useApp } from '../context/AppContext';

declare global {
  interface Window {
    pwaDeferredPrompt: any;
    pwaInstallAction: () => void;
  }
}

export const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const { language } = useApp();

  useEffect(() => {
    // Check if already installed or dismissed
    const hasDismissed = localStorage.getItem('rbc_pwa_dismissed');
    if (hasDismissed === 'true') return;

    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (isStandalone) return;

    // Listen for the install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      window.pwaDeferredPrompt = e;
      window.pwaInstallAction = handleInstall; window.pwaDeferredPrompt = e;
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // We will show a generic manual banner for iOS users since they don't get beforeinstallprompt
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIOS && !isStandalone) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (window.pwaDeferredPrompt && !deferredPrompt) setDeferredPrompt(window.pwaDeferredPrompt);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // iOS fallback alert
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        alert("To install this app on iOS:\n1. Tap the Share button at the bottom of Safari.\n2. Scroll down and tap 'Add to Home Screen'.");
      }
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('rbc_pwa_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="install-banner-overlay" style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '400px',
      backgroundColor: '#0f172a',
      borderRadius: '16px',
      padding: '16px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <button 
        onClick={handleDismiss}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          padding: '4px'
        }}
      >
        <X size={18} />
      </button>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', paddingRight: '24px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden'
        }}>
          <img src={logoEmblem} alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
        </div>
        <div>
          <h3 style={{ 
            color: '#ffffff', 
            fontSize: '16px', 
            fontWeight: '700',
            margin: '0 0 4px 0'
          }}>
            Download RBC Academy App
          </h3>
          <p style={{ 
            color: '#cbd5e1', 
            fontSize: '12px',
            margin: 0,
            lineHeight: 1.4
          }}>
            {language === 'hi' ? 'Fast access ke liye phone par install karein.' : 
             language === 'gu' ? 'ઝડપી ઍક્સેસ માટે ફોન પર ઇન્સ્ટોલ કરો.' :
             language === 'mr' ? 'जलद प्रवेशासाठी फोनवर इन्स्टॉल करा.' :
             'Fast access ke liye phone par install karein.'}
          </p>
        </div>
      </div>

      <button 
        onClick={handleInstall}
        style={{
          width: '100%',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '15px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          marginTop: '4px'
        }}
      >
        <Download size={18} />
        <span>Install App</span>
      </button>
    </div>
  );
};
