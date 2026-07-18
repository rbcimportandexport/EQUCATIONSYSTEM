import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Register Service Worker for offline capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('Service Worker registered successfully:', reg.scope);
        
        // Dynamically find and cache hashed index.js, index.css and local assets
        const urlsToCache = [
          window.location.origin + '/',
          window.location.origin + '/index.html'
        ];
        
        document.querySelectorAll('script[src]').forEach(el => {
          const src = el.getAttribute('src');
          if (src && !src.startsWith('http')) {
            urlsToCache.push(new URL(src, window.location.href).href);
          }
        });
        
        document.querySelectorAll('link[href]').forEach(el => {
          const href = el.getAttribute('href');
          if (href && !href.startsWith('http')) {
            urlsToCache.push(new URL(href, window.location.href).href);
          }
        });

        // Send to Service Worker when ready
        navigator.serviceWorker.ready.then((readyReg) => {
          if (readyReg.active) {
            readyReg.active.postMessage({
              type: 'CACHE_URLS',
              urls: urlsToCache
            });
          }
        });
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
