export function showBrowsePage(rootElement) {
  const categories = [
    "Plomería",
    "Carpintería",
    "Electricista",
    "Programación",
    "Fletes y Mudanzas",
    "Clases Particulares",
    "Otros",
  ];

  let categoryLinksHTML = "";
  categories.forEach(category => {
    categoryLinksHTML += `
      <li class="mb-2">
        <a href="#/category/${encodeURIComponent(category)}" class="text-blue-500 hover:text-blue-700">${category}</a>
      </li>
    `;
  });

  rootElement.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-semibold mb-4">Categorías de Servicios</h2>
      <ul class="list-disc pl-5 mb-6">
        ${categoryLinksHTML}
      </ul>
      <button id="back-to-dashboard-btn" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Volver al Dashboard
      </button>
    </div>
  `;

  const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
  if (backToDashboardBtn) {
    backToDashboardBtn.addEventListener('click', () => {
      window.location.hash = '#/dashboard';
    });
  }
}
