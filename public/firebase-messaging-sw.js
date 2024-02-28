

// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// const firebaseConfig = {
//     apiKey: "AIzaSyBdNnOg_OjNkKsxd3QEAvqDjvgeYWtQUIg",
//     authDomain: "fir-fcm-8d942.firebaseapp.com",
//     projectId: "fir-fcm-8d942",
//     storageBucket: "fir-fcm-8d942.appspot.com",
//     messagingSenderId: "884651803428",
//     appId: "1:884651803428:web:0c00ae7605494184ffe9b1",
//     measurementId: "G-FJQ0176Y0M",
// };

const firebaseConfig = {
    apiKey: "AIzaSyB1uob2iYMaChEP3LZ5qAXvhN2xctaNFm4",
    authDomain: "onlearn-capstoneproject-fall23.firebaseapp.com",
    projectId: "onlearn-capstoneproject-fall23",
    storageBucket: "onlearn-capstoneproject-fall23.appspot.com",
    messagingSenderId: "113559191677",
    appId: "1:113559191677:web:b9587cdd955f3c9c523114",
    measurementId: "G-HQF39WRSD5"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };
    // eslint-disable-next-line no-restricted-globals
    self.registration.showNotification(notificationTitle,
        notificationOptions);
});