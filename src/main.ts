import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import firebase from 'firebase';
// Import the functions you need from the SDKs you need
import firebase from "firebase/app";//compatをpathに加える
import 'firebase/auth';


Vue.config.productionTip = false;



interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig:Config = {
  apiKey: "AIzaSyCrMYZI1ki51wzQSIffWr3sEgLEKwMR7X0",
  authDomain: "ts-vue-ec.firebaseapp.com",
  projectId: "ts-vue-ec",
  storageBucket: "ts-vue-ec.appspot.com",
  messagingSenderId: "721701174639",
  appId: "1:721701174639:web:c7949d86cfa9f450647c9a",
  measurementId: "G-5ZLH97BHDZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
