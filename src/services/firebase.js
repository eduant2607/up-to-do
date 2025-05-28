import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { firebaseConfig } from "../utils/firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
