self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([]).catch((error) => {
        console.error("Error caching files:", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
