// src/index.js
//This file will call all the functions inside other files!
import { showLoginPage } from "./pages/loginPage.js";

const root = document.getElementById("app");

showLoginPage(root, (user) => {
  root.innerHTML = `<h2>Bienvenido, ${user.email}!</h2>`;
});