// Service Worker cleanup script
// This file exists to properly unregister any previously registered service workers

self.addEventListener('install', function(event) {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // Clear all caches
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(function() {
      // Unregister this service worker
      return self.registration.unregister();
    }).then(function() {
      console.log('Service Worker unregistered and caches cleared');
      // Force reload of all clients
      return self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
          client.postMessage({ action: 'SW_UNREGISTERED' });
        });
      });
    })
  );
});

// Handle fetch events (do nothing, just let network handle everything)
self.addEventListener('fetch', function(event) {
  // Don't handle any fetch events, let them go to network
  return;
});