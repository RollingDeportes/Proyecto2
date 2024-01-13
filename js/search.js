// Obtener la lista de productos almacenados en el Local Storage
const products = JSON.parse(localStorage.getItem('products')) || [];

// Función para aplicar filtros y mostrar las tarjetas de productos
function applyFiltersAndDisplayCards() {
  // Obtener valores de los filtros
  const productNameFilter = document.getElementById('productName').value.toLowerCase();
  const minPriceFilter = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxPriceFilter = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const menFilter = document.getElementById('menFilter').checked;
  const womenFilter = document.getElementById('womenFilter').checked;
  const kidFilter = document.getElementById('kidFilter').checked;
  const clothesFilter = document.getElementById('clothesFilter').checked;
  const shoesFilter = document.getElementById('shoesFilter').checked;
  const accesoriesFilter = document.getElementById('accesoriesFilter').checked;

  // Filtrar productos según los criterios
  const filteredProducts = products.filter(product => {
    const nameMatches = product.title.toLowerCase().includes(productNameFilter);
    const priceInRange = product.price >= minPriceFilter && product.price <= maxPriceFilter;
    const categoryMatches = (!menFilter || product.category === 'Hombre') &&
                            (!womenFilter || product.category === 'Mujer') &&
                            (!kidFilter || product.category === 'Niño');
    const typeMatches = (!clothesFilter || product.type === 'Ropa') &&
                        (!shoesFilter || product.type === 'Calzado') &&
                        (!accesoriesFilter || product.type === 'Accesorio');

    return nameMatches && priceInRange && categoryMatches && typeMatches;
  });

  // Mostrar las tarjetas de productos
  displayProductCards(filteredProducts);
}

// Función para mostrar las tarjetas de productos en el contenedor
function displayProductCards(products) {
  const container = document.getElementById('productCardContainer');
  container.innerHTML = ''; // Limpiar el contenido anterior

  if (products.length === 0) {
    container.innerHTML = '<p>No hay productos que coincidan con los filtros.</p>';
    return;
  }

  // Crear tarjetas de productos
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('col-lg-3', 'col-sm-6', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'product-item', 'my-3', 'product-card');

    // Agrega más contenido según sea necesario (imagen, enlace, etc.)
    card.innerHTML = `
      <div class="product">
        <a href=""><img src="${product.img}" alt="${product.title}"></a>
      </div>
      <div class="tag bg-red">sale</div>
      <div class="title pt-4 pb-1">${product.title}</div>
      <div class="d-flex align-content-center justify-content-center">
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
      </div>
      <div class="price">$${product.price}</div>
    `;

    // Agregar la tarjeta al contenedor
    container.appendChild(card);
  });

}

// Mostrar las tarjetas de productos al cargar la página
applyFiltersAndDisplayCards();

// Agregar eventos para actualizar las tarjetas cuando se cambian los filtros
document.getElementById('productName').addEventListener('input', applyFiltersAndDisplayCards);
document.getElementById('minPrice').addEventListener('input', applyFiltersAndDisplayCards);
document.getElementById('maxPrice').addEventListener('input', applyFiltersAndDisplayCards);
document.getElementById('menFilter').addEventListener('change', applyFiltersAndDisplayCards);
document.getElementById('womenFilter').addEventListener('change', applyFiltersAndDisplayCards);
document.getElementById('kidFilter').addEventListener('change', applyFiltersAndDisplayCards);
document.getElementById('clothesFilter').addEventListener('change', applyFiltersAndDisplayCards);
document.getElementById('shoesFilter').addEventListener('change', applyFiltersAndDisplayCards);
document.getElementById('accesoriesFilter').addEventListener('change', applyFiltersAndDisplayCards);
