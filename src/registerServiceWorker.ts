/* eslint-disable no-console */

import { register } from "register-service-worker";

const dispatchEvent = <T>(eventName: string, params?: T) => {
  const customEvent: CustomEvent = new CustomEvent(
    eventName,
    params ? { detail: { params } } : {}
  );

  setTimeout(() => document.dispatchEvent(customEvent), 500);
};

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("App is being served from cache by a service worker.");
      dispatchEvent("permission");
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated(registration) {
      console.log("New content is available; please refresh.");
      dispatchEvent<ServiceWorkerRegistration>("update", registration);
    },
    offline() {
      console.log("No internet connection found.");
      dispatchEvent("connection");
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
