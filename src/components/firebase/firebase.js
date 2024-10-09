import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBxR8hi4S4wFx2KpfOKBgndO8KxrRfkRvQ",
  authDomain: "nannies-services-4ec04.firebaseapp.com",
  projectId: "nannies-services-4ec04",
  storageBucket: "nannies-services-4ec04.appspot.com",
  messagingSenderId: "209955685442",
  appId: "1:209955685442:web:ec3775c737efc9b8a759db",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
