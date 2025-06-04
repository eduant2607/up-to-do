// src/pages/dashboardPage.js
export function showDashboard(rootElement, user, onLogout) {
  rootElement.innerHTML = `
    <h2>Bienvenido, ${user.email}!</h2>
    <button id="logout-btn">Cerrar sesión</button>
  `;

  document.getElementById("logout-btn").addEventListener("click", () => {
    onLogout();
  });
}
