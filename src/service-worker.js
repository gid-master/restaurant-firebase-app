/* eslint-disable  */
// eslint-disable-next-line prettier/prettier


// Disable this line to be able to debug
workbox.setConfig({ debug: false });

// The precacheManifest will be imported using importScripts (as is workbox itself)
// This is all we need for precaching
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// Listen to events dispatched from application
// Inside PawController the user can update the application
// It will automatically call this event and skit waiting lifecly.
self.addEventListener("message", event => {
  if (event.data.action == "SKIP_WAITING") {
    self.skipWaiting();
  }
});


// Precache products data, when the application is accessed for the second time.
// All products information will be cached and used during offline mode.
// User can still browser through the menu and see the dishes until internet gets back
// Network first strategy tries to load data from server before caching it.
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/product"),
  new workbox.strategies.NetworkFirst({
    cacheName: "api-products"
    // plugins: [
    //   new workbox.expiration.Plugin({
    //     maxEntries: 50,
    //     maxAgeSeconds: 5 * 60 // 5 minutes
    //   })
    // ]
  })
);

// Precache all server images in order to display even if the applicaiton is offline
// Products images are loaded from server, that's why we also need to cache it
// Loads data from cache until the server request is returned.
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/assets"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "server-images"
  })
);

// Precache the Google fonts, as it never changes, will be loaded only for the first time
// after that it always comes from cache
// Always load from cache, however, loads form server if it's not available.
workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new workbox.strategies.CacheFirst({
    cacheName: "local-googleapis"
  })
);

