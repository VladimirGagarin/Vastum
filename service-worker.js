const CACHE_NAME = "allegrovastum-v1";
const STATIC_FILES = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/audio.json", // Ensure audio.json is cached
  "/manifest.json",
  "/offline/index.html",
];

// Files to cache on install (static files that don’t change often)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES); // Cache all static files
    })
  );
});

// Clean up old caches during activation
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Delete outdated caches
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Handle fetch events for audio and other resources
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/cantabile/") || event.request.url.includes("/images/")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              // Cache the fetched response
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
    );
  } else {
    // Handle static files like HTML, CSS, JS from cache
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).catch(() => caches.match('/offline/index.html')) // Show offline page if network fails
        );
      })
    );
  }
});
