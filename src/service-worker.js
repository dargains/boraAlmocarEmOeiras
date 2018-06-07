var cacheName = 'aeo v2.14';
var filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/share.png',
  '/static/css/main.css',
  '/static/css/main.css.map',
  '/static/js/main.js',
  '/static/js/main.js.map',
  '/static/media/logo-top.svg',
  '/static/media/logo-bottom.svg',
  '/static/media/load.svg',
  '/static/media/ticket.png',
  '/static/media/location.svg',
  '/static/media/close.svg',
  '/static/media/icon-32x32.png',
  '/static/media/icon-144x144.png',
  '/static/media/icon-152x152.png',
  '/static/media/icon-180x180.png',
  '/static/media/icon-192x192.png',
  '/static/media/icon-256x256.png',
  '/static/media/icon-384x384.png',
  '/static/media/icon-512x512.png',
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
