const cacheName = 'app-shell-v1';
const assetsToCache = [
  'https://unpkg.com/dexie@latest/dist/dexie.min.js',
  './assets/icons/agenda.jpg',
  './assets/icons/favicon.png',
  './assets/css/normalize.css',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/js/agendaService.js',
  './assets/js/htmlService.js',
  './index.html',
  '/'
];

function removeOldCache(key) {
  if (key !== cacheName) {
    console.log(`[Service Worker] Removing old cache: ${key}`);
    return caches.delete(key);
  }
}

async function cacheCleanup() {
  const keyList = await caches.keys();
  return Promise.all(keyList.map(removeOldCache));
}

async function cacheStaticAssets() {
  const cache = await caches.open(cacheName);
  return cache.addAll(assetsToCache);
}

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...', event);
  event.waitUntil(cacheStaticAssets());
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...', event);
  event.waitUntil(cacheCleanup());
  return self.clients.claim();
});

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(cacheName);
    return cache.match(request);
  }
}

async function cacheFirst(request) {
  try {
    const cache = await caches.open(cacheName);
    const response = await cache.match(request);
    return response || fetch(request);
  } catch (error) {
    console.log(error);
  }
}

self.addEventListener('fetch', event => {
  event.respondWith(cacheFirst(event.request));
});
