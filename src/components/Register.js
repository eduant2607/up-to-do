export function renderRegister(onRegister) {
  const container = document.createElement('div');
  container.className = 'register-container mx-auto max-w-md p-6 bg-white rounded-lg shadow-md';

  const title = document.createElement('h2');
  title.textContent = 'Registrarse';
  title.className = 'text-2xl font-bold mb-4 text-center';
  container.appendChild(title);

  const form = document.createElement('form');
  form.id = 'register-form';
  form.className = 'space-y-4';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.placeholder = 'Correo electrónico';
  emailInput.required = true;
  emailInput.className = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';
  form.appendChild(emailInput);

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.placeholder = 'Contraseña';
  passwordInput.required = true;
  passwordInput.className = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500';
  form.appendChild(passwordInput);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Registrarse';
  submitButton.className = 'w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  form.appendChild(submitButton);

  container.appendChild(form);

  const errorParagraph = document.createElement('p');
  errorParagraph.id = 'register-error';
  errorParagraph.className = 'text-red-500 text-sm mt-2';
  container.appendChild(errorParagraph);

  const loginLinkParagraph = document.createElement('p');
  loginLinkParagraph.className = 'text-sm text-center mt-4';
  const loginLink = document.createElement('a');
  loginLink.id = 'login-link';
  loginLink.textContent = 'Ya tienes cuenta? Inicia Sesión';
  loginLink.href = '#';
  loginLink.className = 'text-indigo-600 hover:underline';
  loginLinkParagraph.appendChild(loginLink);
  container.appendChild(loginLinkParagraph);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    errorParagraph.textContent = ''; // Clear previous errors

    try {
      await onRegister(email, password);
    } catch (error) {
      errorParagraph.textContent = error.message;
    }
  });

  return container;
}
