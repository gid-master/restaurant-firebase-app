/* eslint-disable  */
// eslint-disable-next-line prettier/prettier

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js');


// CREATE YOUR OWN FIREBASE PROJECT AND ADD THE WEB CONNECTION HERE
firebase.initializeApp({
    apiKey: "AIzaSyBf2-2gcpNMVdbErvXpSZLUFFP6p8V9eX8",
    authDomain: "restaurant-app-f8a06.firebaseapp.com",
    projectId: "restaurant-app-f8a06",
    storageBucket: "restaurant-app-f8a06.appspot.com",
    messagingSenderId: "668006207274",
    appId: "1:668006207274:web:50d239fcfd39eaed3c9853"
});
  
const messaging = firebase.messaging();
  
  
messaging.onBackgroundMessage((payload) => {
   // {"notification": {"title":"Restaurant","icon":"img/icons/favicon-32x32.png","vibrate":[100, 50, 100],"body":"testing!!!"}}
   const notificationTitle = payload.notification.title;
   const notificationOptions = payload.notification;
   self.registration.showNotification(notificationTitle, notificationOptions);
});