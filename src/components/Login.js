// src/components/Login.js
//This is the base UI
export function renderLogin(onLogin) {
  const container = document.createElement("div");
  container.className = "login-container";

  container.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <form id="login-form">
      <input type="email" id="email" placeholder="Correo electrónico" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
    <p id="login-error" style="color:red;"></p>
  `;

  container.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = container.querySelector("#email").value;
    const password = container.querySelector("#password").value;
    try {
      await onLogin(email, password);
    } catch (err) {
      container.querySelector("#login-error").textContent = err.message;
    }
  });

  return container;
}
