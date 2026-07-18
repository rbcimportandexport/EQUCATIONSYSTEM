const CACHE_NAME = 'rbc-academy-v1';

// Assets to cache immediately on install
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/logo_emblem.png',
  '/logo_emblem.jpg',
  '/logo_full.png',
  '/logo_full.jpg',
  '/favicon.svg',
  '/icons.svg'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Dynamic Caching Strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  
  // We want to cache local files, plus external resources like code.responsivevoice.org
  const isLocal = requestUrl.origin === self.location.origin;
  const isCDN = requestUrl.hostname.includes('responsivevoice.org') || requestUrl.hostname.includes('unsplash.com');

  if (!isLocal && !isCDN) {
    return; // Let the browser handle cross-origin non-essential requests natively
  }

  // Network-First strategy for the main index.html or document root to ensure updates are checked
  if (event.request.mode === 'navigate' || requestUrl.pathname === '/' || requestUrl.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Save a copy of the fresh page to cache
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseCopy);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network is down
          return caches.match('/index.html') || caches.match(event.request);
        })
    );
    return;
  }

  // Cache-First strategy for CSS, JS, images, media (Cache -> Network fallback + save to cache)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return from cache immediately
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Don't cache range requests or non-ok responses (e.g. video files might use Range requests)
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }

        // Cache the newly fetched resource dynamically
        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseCopy);
        });

        return response;
      }).catch(() => {
        return new Response('Offline resource not cached', { status: 408, headers: { 'Content-Type': 'text/plain' } });
      });
    })
  );
});
