// src/index.js
import { showLoginPage } from "./pages/loginPage.js";
import { showDashboard } from "./pages/dashboardPage.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from "./services/firebase.js";

const root = document.getElementById("app");

function renderApp(user) {
  if (user) {
    showDashboard(root, user, async () => {
      await signOut(auth);
      renderApp(null); // Go back to login on logout
    });
  } else {
    showLoginPage(root, (user) => {
      renderApp(user); // Go to dashboard on login
    });
  }
}

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
  renderApp(user);
});
