import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import firebase from 'firebase';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
Vue.config.productionTip = false;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrMYZI1ki51wzQSIffWr3sEgLEKwMR7X0",
    authDomain: "ts-vue-ec.firebaseapp.com",
    projectId: "ts-vue-ec",
    storageBucket: "ts-vue-ec.appspot.com",
    messagingSenderId: "721701174639",
    appId: "1:721701174639:web:c7949d86cfa9f450647c9a",
    measurementId: "G-5ZLH97BHDZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map