import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { vapidKey } from "./Constants";
import Cookies from "js-cookie";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


export const requestPermission = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./firebase-messaging-sw.js')
            .then(function (registration) {
                console.log('Registration successful, scope is:', registration.scope);
            }).catch(function (err) {
                console.log('Service worker registration failed, error:', err);
            });
    }

    console.log("Requesting User Permission......");
    Notification.requestPermission().then((permission) => {

        if (permission === "granted") {

            console.log("Notification User Permission Granted.");
            return getToken(messaging, { vapidKey: vapidKey })
                .then((currentToken) => {

                    if (currentToken) {
                        Cookies.set('deviceToken', currentToken);
                        console.log('Client Token: ', currentToken);
                    } else {

                        console.log('Failed to generate the app registration token.');
                    }
                })
                .catch((err) => {

                    console.log('An error occurred when requesting to receive the token.', err);
                });
        } else {

            console.log("User Permission Denied.");
        }
    });

}

requestPermission();

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export const handleImageUpload = (file) => {
    // const storageRef = app.storage().ref();
    // const imageRef = storageRef.child(`elearning/video/${Date.now()}`);
    const storageRef = ref(storage, `/elearning/text/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            () => { },
            (error) => {
                reject(error);
            },
            () => {
                // uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                //     resolve(url);
                // });
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // console.log(url);
                    resolve(url)
                });
            }
        );
    });
};

const storage = getStorage(app);
export default storage;