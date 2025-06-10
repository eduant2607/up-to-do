export function showServicesFeedPage(rootElement) {
  const services = [
    {
      title: "Plomería Profesional",
      description: "Reparaciones e instalaciones de plomería en general. Atención rápida y eficiente.",
      category: "Plomería",
      price: "A convenir",
    },
    {
      title: "Diseño Web Moderno",
      description: "Creación de sitios web responsivos y optimizados para SEO. Ideal para pequeñas y medianas empresas.",
      category: "Programación",
      price: "$500+",
    },
    {
      title: "Clases de Guitarra",
      description: "Clases personalizadas de guitarra para todos los niveles. Aprende tus canciones favoritas.",
      category: "Clases Particulares",
      price: "$20/hora",
    },
    {
      title: "Carpintería a Medida",
      description: "Fabricación y reparación de muebles. Trabajos en madera de alta calidad.",
      category: "Carpintería",
      price: "Consultar",
    },
    {
      title: "Instalaciones Eléctricas Seguras",
      description: "Servicio completo de instalaciones y reparaciones eléctricas para el hogar y la oficina.",
      category: "Electricista",
      price: "$50/hr",
    },
    {
      title: "Mudanza Express",
      description: "Servicio de fletes y mudanzas pequeñas y medianas. Rápido y confiable.",
      category: "Fletes y Mudanzas",
      price: "Desde $100",
    }
  ];

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
      pageHTML += `
        <div class="service-card">
          <h4 class="service-title">${service.title}</h4>
          <p class="service-category">Categoría: ${service.category}</p>
          <p class="service-description">${service.description}</p>
          <p class="service-price">Precio: ${service.price}</p>
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
        pageHTML += `
          <div class="service-card">
            <h4 class="service-title">${service.title}</h4>
            <p class="service-category">Categoría: ${service.category}</p>
            <p class="service-description">${service.description}</p>
            <p class="service-price">Precio: ${service.price}</p>
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
