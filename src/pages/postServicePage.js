export function showPostServicePage(rootElement) {
  rootElement.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-semibold mb-4">Publicar Nuevo Servicio</h2>
      <form id="post-service-form">
        <div class="mb-4">
          <label for="service-title" class="block text-gray-700 text-sm font-bold mb-2">Título del Servicio:</label>
          <input type="text" id="service-title" name="service-title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        </div>

        <div class="mb-4">
          <label for="service-description" class="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
          <textarea id="service-description" name="service-description" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
        </div>

        <div class="mb-4">
          <label for="service-category" class="block text-gray-700 text-sm font-bold mb-2">Categoría:</label>
          <select id="service-category" name="service-category" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
            <option value="Plomeria">Plomería</option>
            <option value="Carpinteria">Carpintería</option>
            <option value="Electricista">Electricista</option>
            <option value="Programacion">Programación</option>
            <option value="Clases particulares">Clases particulares</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div class="mb-6">
          <label for="service-price" class="block text-gray-700 text-sm font-bold mb-2">Precio estimado (MXN):</label>
          <input type="number" id="service-price" name="service-price" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        </div>

        <div class="flex items-center justify-between">
          <button type="submit" id="publish-service-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Publicar
          </button>
          <button type="button" id="back-to-dashboard-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Volver al Dashboard
          </button>
        </div>
      </form>
    </div>
  `;

  const form = rootElement.querySelector('#post-service-form');
  const backToDashboardBtn = rootElement.querySelector('#back-to-dashboard-btn');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = rootElement.querySelector('#service-title').value;
    const description = rootElement.querySelector('#service-description').value;
    const category = rootElement.querySelector('#service-category').value;
    const price = rootElement.querySelector('#service-price').value;

    const serviceData = {
      title,
      description,
      category,
      price,
    };

    console.log('Service Data:', serviceData);
    alert('Servicio publicado con éxito');
    window.location.hash = '#/dashboard';
  });

  backToDashboardBtn.addEventListener('click', () => {
    window.location.hash = '#/dashboard';
  });
}
