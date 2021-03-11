module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/index.scss";
        `
      }
    }
  },
  // Vue creates its own service worker automatically once your app is built.
  // The default behaviour caches your entire applciation.
  // However, you can create your own service worker to control extra stuff
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
};
