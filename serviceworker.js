// Installing service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sample').then(function(cache) {
      return cache.addAll([ ]);
    }));
});
//  Cache and return requests using fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('sample').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }));
});

self.addEventListener('activate', function(event) {
  var cacheKeeplist = ['sample1'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
