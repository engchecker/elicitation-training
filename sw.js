/* Network-first service worker so the app opens offline and always updates when online.
   Only same-origin GET requests are cached. API calls are never intercepted. */
const CACHE = "cst-v4";
const FILES = ["./", "index.html", "style.css", "data.js", "drillcontext.js", "tracks.js", "tracks2.js", "tracks3.js", "scenes.js", "app.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  e.respondWith(fetch(r, { cache: "no-cache" }).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); return res; }).catch(() => caches.match(r)));
});
