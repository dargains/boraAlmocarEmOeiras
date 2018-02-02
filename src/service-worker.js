var cacheName = 'baeo v1.0';
var filesToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/apple-touch-icon-72x72.png',
  '/apple-touch-icon-114x114.png',
  '/apple-touch-icon.png',
  '/static/css/main.css',
  '/static/css/main.css.map',
  '/static/js/main.js',
  '/static/js/main.js.map',
  '/static/media/back0.jpg',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
