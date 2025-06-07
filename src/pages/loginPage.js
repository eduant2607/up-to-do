// src/pages/loginPage.js
//This file will use render login and call FirebaseAuth
import { renderLogin } from "../components/Login.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from "../services/firebase.js";

export function showLoginPage(rootElement, onSuccess) {
  const loginComponent = renderLogin(async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario logueado:", userCredential.user);
    onSuccess(userCredential.user); // You can redirect or load dashboard
  });

  rootElement.innerHTML = "";
  rootElement.appendChild(loginComponent);

  const registerLink = loginComponent.querySelector('#register-link');
  if (registerLink) {
    registerLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.hash = '#/register';
    });
  }
}
