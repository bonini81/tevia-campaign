// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdnG6dt36mRFQgv3-YJ1gdNlyxL19TVck",
  authDomain: "stevia-campaign.firebaseapp.com",
  projectId: "stevia-campaign",
  storageBucket: "stevia-campaign.firebasestorage.app",
  messagingSenderId: "367862091751",
  appId: "1:367862091751:web:5c032bbd6a19e384d6b742"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;