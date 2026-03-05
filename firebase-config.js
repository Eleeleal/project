const firebaseConfig = {
  apiKey: "AIzaSyCUT8M82v7zHyM-8ZFQKnskMq49Bq1xr0U",
  authDomain: "project-tracker-f1c0c.firebaseapp.com",
  projectId: "project-tracker-f1c0c",
  storageBucket: "project-tracker-f1c0c.appspot.com",
  messagingSenderId: "1073499050735",
  appId: "1:1073499050735:web:e630f1441ce684f42dc11a"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Auth & Firestore
const auth = firebase.auth();
const db = firebase.firestore();