const CACHE_NAME = "allegrovastum-v1";

const STATIC_FILES = [
  "/", 
  "/index.html",
  "/style.css",
  "/script.js",
  "/audio.json",
  "/manifest.json",
  "/offline/index.html",
  "/offline/style.css",
  "/offline/offline.js",
  "/share/index.html",
  "/share/style.css",
  "/share/share.js",
  "/cantabile/Two Steps From Hell, Thomas Bergersen - Never Give Up On Your Dreams (Live).mp3",
  "/cantabile/y2mate.com - Thomas Bergersen  Creation of Earth Sun.mp3",
  "/cantabile/y2mate.com - Thomas Bergersen  Colors of Love Sun.mp3",
  "/cantabile/thomas-bergersen-new-life-sun-128-ytshorts.savetube.me.mp3",
  "/cantabile/y2mate.com - Thomas Bergersen  Always Mine Sun.mp3",
  "/cantabile/two-steps-from-hell-protectors-of-the-earth-128-ytshorts.savetube.me.mp3",
  "cantabile/y2mate.com - Two Steps From Hell  Strength of a Thousand Men Archangel.mp3",
  "cantabile/y2mate.com - Two Steps From Hell Victory.mp3",
  "cantabile/y2mate.com - Two Steps From Hell  Never Back Down.mp3",
  "cantabile/y2mate.com - Thomas Bergersen  Homecoming.mp3"


];

// Install event - pre-cache everything listed in STATIC_FILES
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Activate event - clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event - respond from cache, fallback to offline page if failed
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Show offline fallback for navigation requests only
          if (event.request.mode === "navigate") {
            return caches.match("/offline/index.html");
          }
        })
      );
    })
  );
});
