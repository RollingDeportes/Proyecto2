// Obtener el nombre de la página actual
const currentPage = window.location.pathname.split('/').pop().split('.')[0];

// Obtener la lista de productos almacenados en el Local Storage
const storedProducts = JSON.parse(localStorage.getItem('productAdded')) || [];
console.log(currentPage);

// Filtrar productos según la categoría de la página actual
let filteredProducts = [];
if (currentPage === 'accessoriesMen') {
  filteredProducts = storedProducts.filter(product => ( product.category.includes('Hombres') && (product.type.includes('Accesorios')) ));
} else if (currentPage === 'accessoriesWomen') {
  filteredProducts = storedProducts.filter(product => ( product.category.includes('Mujeres') && (product.type.includes('Accesorios')) ));
} else if (currentPage === 'accessoriesKids') {
  filteredProducts = storedProducts.filter(product => ( product.category.includes('Niños') && (product.type.includes('Accesorios')) ));
} else {
  // Página no reconocida o sin categoría específica
  console.error('Página no reconocida o sin categoría específica.', currentPage);
}

// Función para mostrar las tarjetas de productos en el contenedor
function displayProductCards() {
  const container = document.querySelector('.productCardContainer');

  
  
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('col-lg-3', 'col-sm-6', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'product-item', 'my-3', 'product-card');
    
    card.innerHTML = `
      <div class="product">
        <a href=""><img src="${product.image}" alt="${product.title}"></a>
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
    container.appendChild(card);
});
}

// Mostrar todas las tarjetas de productos al cargar la página
displayProductCards();