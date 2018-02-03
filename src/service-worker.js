var cacheName = 'aeo v1.2';
var filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-32x32.ico',
  '/static/css/main.css',
  '/static/css/main.css.map',
  '/static/js/main.js',
  '/static/js/main.js.map',
  '/static/media/dash.svg',
  '/static/media/logo.svg',
  '/static/media/load.svg',
  '/static/media/pattern.png',
  '/static/media/icon-32x32.png',
  '/static/media/icon-144x144.png',
  '/static/media/icon-152x152.png',
  '/static/media/icon-180x180.png',
  '/static/media/icon-192x192.png',
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
