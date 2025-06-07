import { renderRegister } from '../components/Register.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from '../services/firebase.js';

export function showRegisterPage(rootElement, onSuccessRegister) {
  const onRegister = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registered user:', userCredential.user);
      onSuccessRegister(userCredential.user);
    } catch (error) {
      // This error will be caught and displayed by the error handler in renderRegister
      console.error('Registration error:', error);
      throw error; // Re-throw to be caught by renderRegister's handler
    }
  };

  const registerComponent = renderRegister(onRegister);

  rootElement.innerHTML = ''; // Clear existing content
  rootElement.appendChild(registerComponent);

  const loginLink = registerComponent.querySelector('#login-link');
  if (loginLink) {
    loginLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.hash = '#login';
    });
  }
}
