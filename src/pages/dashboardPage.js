// src/pages/dashboardPage.js
export function showDashboard(rootElement, user, onLogout) {
  rootElement.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-semibold mb-4">Bienvenido, ${user.email}!</h2>
      <button id="logout-btn" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Cerrar sesión
      </button>
      <button id="buscar-servicios-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
        Ver Servicios
      </button>
      <button id="post-service-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
        Publicar Servicio
      </button>
    </div>
  `;

  // The button is part of the innerHTML, so it will be found.
  // Re-adding event listener is necessary because innerHTML replaces old elements.
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    // It's good practice to ensure an event listener isn't added multiple times,
    // but with complete innerHTML overwrite, this is less of a concern as the old button is gone.
    // However, if this function could be called without full innerHTML overwrite,
    // or if other scripts could add listeners, more robust handling might be needed.
    // For this simple case, this is fine.
    logoutBtn.addEventListener("click", () => {
        onLogout();
    });
  }

  const buscarServiciosBtn = document.getElementById("buscar-servicios-btn");
  if (buscarServiciosBtn) {
    buscarServiciosBtn.addEventListener("click", () => {
      window.location.hash = '#/services-feed';
    });
  }

  const postServiceBtn = document.getElementById("post-service-btn");
  if (postServiceBtn) {
    postServiceBtn.addEventListener("click", () => {
      window.location.hash = '#/post-service';
    });
  }
}
