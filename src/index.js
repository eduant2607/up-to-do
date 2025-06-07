import { showLoginPage } from './pages/loginPage.js';
import { showDashboard } from './pages/dashboardPage.js';
import { showRegisterPage } from './pages/registerPage.js';
import { showBrowsePage } from './pages/browsePage.js';
import { auth } from './services/firebase.js';

const appRoot = document.getElementById('app');
let currentUser = null;

function router() {
  const route = window.location.hash;
  // Note: It's generally better for each `showPage` function to clear appRoot.innerHTML
  // if needed, or manage its own content replacement.
  // appRoot.innerHTML = ''; // Clearing here might be too broad if pages want to manage transitions.

  switch (route) {
    case '#/login':
      if (currentUser) {
        window.location.hash = '#dashboard';
        break;
      }
      showLoginPage(appRoot, (user) => {
        currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Login exitoso! Bienvenido, ${user.email}`);
        window.location.hash = '#dashboard';
      });
      break;
    case '#/register':
      if (currentUser) {
        window.location.hash = '#dashboard';
        break;
      }
      showRegisterPage(appRoot, (user) => {
        currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Registro exitoso! Bienvenido, ${user.email}`);
        window.location.hash = '#dashboard';
      });
      break;
    case '#/browse':
      if (!currentUser) {
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
          currentUser = JSON.parse(storedUser);
        } else {
          window.location.hash = '#/login'; // Corrected
          break;
        }
      }
      showBrowsePage(appRoot);
      break;
    case '#dashboard':
      if (!currentUser) {
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
          currentUser = JSON.parse(storedUser);
        } else {
          window.location.hash = '#/login'; // Corrected
          break;
        }
      }
      showDashboard(appRoot, currentUser, () => { // onLogout callback
        auth.signOut().then(() => {
          currentUser = null;
          sessionStorage.removeItem('currentUser');
          // alert('Has cerrado sesión.'); // Alert can be part of showDashboard or here
          window.location.hash = '#/login'; // Corrected
        }).catch(error => {
          console.error("Error during sign out:", error);
          // Still attempt to clear session and redirect
          currentUser = null;
          sessionStorage.removeItem('currentUser');
          window.location.hash = '#/login'; // Corrected
        });
      });
      break;
    default:
      // Fallback logic based on current user status
      if (sessionStorage.getItem('currentUser')) { // Check session directly for default
          currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
          window.location.hash = '#dashboard';
      } else {
          window.location.hash = '#/login'; // Corrected
      }
  }
}

window.addEventListener('hashchange', router);

window.addEventListener('DOMContentLoaded', () => {
  const storedUser = sessionStorage.getItem('currentUser');
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    // If user is stored and hash is empty, '#', '#/login' or '#/register', redirect to dashboard.
    // This prevents logged-in users from landing on login/register unless explicitly navigating back.
    if (['', '#', '#/login', '#/register'].includes(window.location.hash)) { // Corrected
      window.location.hash = '#dashboard';
    }
  } else {
    // If no user, and not trying to register or already on login, force login.
    if (window.location.hash !== '#/register' && window.location.hash !== '#/login') { // Corrected
      window.location.hash = '#/login'; // Corrected
    }
  }
  // Initial call to router to load the correct page based on hash or updated hash.
  router();
});
