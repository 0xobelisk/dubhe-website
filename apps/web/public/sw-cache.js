// Service Worker for Dubhe Website with Caching
// Version: 1.0.0

const CACHE_NAME = 'dubhe-cache-v1';
const RUNTIME_CACHE = 'dubhe-runtime-v1';

// Assets to cache immediately on install
const STATIC_CACHE_URLS = [
  '/',
  '/favicon-black.ico',
  '/favicon-white.ico',
  '/logo/light.png',
  '/logo/dark.png',
];

// Cache strategies configuration
const CACHE_STRATEGIES = {
  // Network first for API and dynamic content
  networkFirst: [
    '/api/',
    '/auth/',
  ],
  // Cache first for static assets
  cacheFirst: [
    '/fonts/',
    '/_next/static/',
    '/images/',
    '/logo/',
    '/marketing/',
    '.css',
    '.js',
    '.woff2',
    '.woff',
    '.ttf',
    '.png',
    '.jpg',
    '.jpeg',
    '.svg',
    '.webp',
    '.avif',
  ],
  // Stale while revalidate for Next.js assets
  staleWhileRevalidate: [
    '/_next/',
    '/locales/',
  ],
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Only cache critical assets initially
      return cache.addAll(STATIC_CACHE_URLS.slice(0, 3)).catch(err => {
        console.warn('Failed to cache some assets:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extension requests
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }

  // Skip WebSocket connections
  if (url.protocol === 'ws:' || url.protocol === 'wss:') {
    return;
  }

  // Skip hot reload in development
  if (url.pathname.includes('_next/webpack-hmr')) {
    return;
  }

  // Determine cache strategy
  const strategy = getStrategy(url.pathname);

  if (strategy === 'networkFirst') {
    event.respondWith(networkFirst(request));
  } else if (strategy === 'cacheFirst') {
    event.respondWith(cacheFirst(request));
  } else if (strategy === 'staleWhileRevalidate') {
    event.respondWith(staleWhileRevalidate(request));
  } else {
    // Default to network only for unmatched requests
    event.respondWith(fetch(request));
  }
});

// Helper function to determine cache strategy
function getStrategy(pathname) {
  for (const [strategy, patterns] of Object.entries(CACHE_STRATEGIES)) {
    for (const pattern of patterns) {
      if (pathname.includes(pattern) || pathname.endsWith(pattern)) {
        return strategy;
      }
    }
  }
  return null;
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return a fallback for images
    if (request.destination === 'image') {
      return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#f0f0f0"/></svg>', {
        headers: { 'Content-Type': 'image/svg+xml' }
      });
    }
    throw error;
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(RUNTIME_CACHE);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Silent fail for background revalidation
  });

  return cachedResponse || fetchPromise;
}

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  }
});