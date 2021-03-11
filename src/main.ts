import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import directives from "./directives";

import { FIREBASE_CONNECTION } from "./firebase-connection";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import { isDevelopmentMode } from "./utils/EnvironmentUtil";

firebase.initializeApp(FIREBASE_CONNECTION);

// Use emulator to run cloud functions locally
if (isDevelopmentMode()) {
  firebase.functions().useEmulator("localhost", 5001);
}

firebase.auth().onAuthStateChanged(async () => {
  await store.dispatch("authenticate");
});

createApp(App)
  .use(store)
  .use(router)
  .directive("image-fallback", directives.imageFallback)
  .mount("#app");
