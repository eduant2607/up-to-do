import { db } from "../../services/firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function showServicesFeedPage(rootElement) {
  rootElement.innerHTML = '<p class="text-center p-8">Cargando servicios...</p>';

  let services = [];
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching services: ", error);
    rootElement.innerHTML = `
      <div class="p-4 text-center">
        <p class="text-red-500">Error al cargar los servicios. Inténtalo de nuevo más tarde.</p>
        <button id="back-to-dashboard-btn" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-6">
          Volver al Dashboard
        </button>
      </div>`;
    // Re-attach event listener for the button in error case
    const backToDashboardBtnOnError = document.getElementById('back-to-dashboard-btn');
    if (backToDashboardBtnOnError) {
      backToDashboardBtnOnError.addEventListener('click', () => {
        window.location.hash = '#dashboard';
      });
    }
    return;
  }

  const categories = [
    "Plomería",
    "Carpintería",
    "Electricista",
    "Programación",
    "Fletes y Mudanzas",
    "Clases Particulares",
    "Otros",
  ];

  let pageHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-semibold mb-6">Servicios Disponibles</h2>
  `;

  // Global View Section
  pageHTML += `
    <section class="mb-8">
      <h3 class="text-xl font-semibold mb-4 border-b pb-2">Todos los Servicios</h3>
      <div class="services-grid">
  `;
  if (services.length > 0) {
    services.forEach(service => {
      // Ensure price is displayed correctly, especially if it's a number
      const displayPrice = typeof service.price === 'number' ? `$${service.price.toFixed(2)}` : service.price;
      pageHTML += `
        <div class="service-card">
          <h4 class="service-title">${service.title}</h4>
          <p class="service-category">Categoría: ${service.category}</p>
          <p class="service-description">${service.description}</p>
          <p class="service-price">Precio: ${displayPrice}</p> 
          ${service.userEmail ? `<p class="text-xs text-gray-500 pt-2">Publicado por: ${service.userEmail}</p>` : ''}
        </div>
      `;
    });
  } else {
    pageHTML += '<p>No hay servicios disponibles actualmente.</p>';
  }
  pageHTML += '</div></section>'; // Close services-grid and section

  // Categorized View Section
  categories.forEach(category => {
    pageHTML += `
      <section class="mb-8">
        <h3 class="text-xl font-semibold mb-4 border-b pb-2">${category}</h3>
        <div class="services-grid">
    `;
    const servicesInCategory = services.filter(service => service.category === category);
    if (servicesInCategory.length > 0) {
      servicesInCategory.forEach(service => {
        const displayPrice = typeof service.price === 'number' ? `$${service.price.toFixed(2)}` : service.price;
        pageHTML += `
          <div class="service-card">
            <h4 class="service-title">${service.title}</h4>
            <p class="service-category">Categoría: ${service.category}</p>
            <p class="service-description">${service.description}</p>
            <p class="service-price">Precio: ${displayPrice}</p>
            ${service.userEmail ? `<p class="text-xs text-gray-500 pt-2">Publicado por: ${service.userEmail}</p>` : ''}
          </div>
        `;
      });
    } else {
      pageHTML += `<p>No hay servicios disponibles en esta categoría (${category}) por el momento.</p>`;
    }
    pageHTML += '</div></section>'; // Close services-grid and section
  });

  pageHTML += `
      <button id="back-to-dashboard-btn" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-6">
        Volver al Dashboard
      </button>
    </div>
  `; // Close p-4

  rootElement.innerHTML = pageHTML;

  const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
  if (backToDashboardBtn) {
    backToDashboardBtn.addEventListener('click', () => {
      window.location.hash = '#dashboard';
    });
  }
}
