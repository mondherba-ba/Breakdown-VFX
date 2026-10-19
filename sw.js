/* Breakdown VFX : fonctionnement hors ligne.
   Quand tu modifies les fichiers, change le numéro de version ci-dessous. */
const VERSION = 'breakdown-vfx-v1';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
const EXTERNAL = [
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@400;500&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(SHELL);
    await Promise.all(EXTERNAL.map(async (u) => {
      try { const r = await fetch(u, { mode: 'no-cors' }); await cache.put(u, r); } catch (err) { /* hors ligne: sera mis en cache plus tard */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    /* fichiers de l'app : réponse immédiate depuis le cache, mise à jour en arrière-plan */
    e.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const hit = await cache.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await cache.match('index.html') : undefined);
      const net = fetch(req).then((r) => { if (r && r.ok) cache.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })());
    return;
  }
  /* polices et bibliothèque PDF : mises en cache à la première utilisation */
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
      const r = await fetch(req);
      if (r && (r.ok || r.type === 'opaque')) cache.put(req, r.clone());
      return r;
    } catch (err) {
      return new Response('', { status: 503 });
    }
  })());
});
