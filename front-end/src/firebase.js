// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC39ycH4q-EyrPK0RTVPq6Je2AxEDBQUUc",
  authDomain: "ecommerce-28fad.firebaseapp.com",
  projectId: "ecommerce-28fad",
  storageBucket: "ecommerce-28fad.appspot.com",
  messagingSenderId: "495372617547",
  appId: "1:495372617547:web:b11c8eb62c8fde2556cace",
  measurementId: "G-49CB9R25QW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;