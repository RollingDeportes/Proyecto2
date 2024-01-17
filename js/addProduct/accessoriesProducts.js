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
    <div>
    <div class="product">
        <img src="${product.image}"
            alt="${product.title}">
    </div>
    <div class="title pt-4 pb-1">${product.title}</div>
    <div class="d-flex align-content-center justify-content-center">
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
        <span class="fas fa-star"></span>
    </div>
    <div class="price">$${product.price}</div>
    <div>
    <button class="bg-success text-light border rounded-3 p-2" data-bs-toggle="modal"
  data-bs-target="#exampleModal${product.code}">Ver detalles</button>
</div>

<div class="modal fade" id="exampleModal${product.code}" tabIndex="-1" aria-labelledby="exampleModalLabel" >
<div class="modal-dialog modal-xl">
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="card">
        <div class="row g-0">
          <div class="col-md-6 border-end">
            <div class="d-flex flex-column justify-content-center">
              <div class="main_image"> <img class="card-image"
                  src="${product.image}"
                  id="main_product_image" 
                  width="350"> </div>
              <div class="thumbnail_images">
                <ul id="thumbnail">
                  <li><img onclick="changeImage(this)"
                  src="${product.image}"                                  
                  width="70"></li>
                  <li><img onclick="changeImage(this)"
                  src="${product.image2}"                                  
                  width="70"></li>
                  <li><img onclick="changeImage(this)"
                  src="${product.image3}"                                  
                  width="70"></li>
                  <li><img onclick="changeImage(this)"
                  src="${product.image4}"                                  
                  width="70"></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="p-3 right-side">
              <div class="d-flex justify-content-between align-items-center">
                <h3 class="card-title">${product.title}</h3>
              </div>
              <div class="mt-2 pr-3 content">
                <p>${product.description}</p>
              </div>
              <h3 class="card-price">$${product.price}</h3>
              <div class="ratings d-flex flex-row align-items-center">
                <div class="d-flex flex-row"> <i class='bx bxs-star' id="star"></i> <i class='bx bxs-star'
                    id="star"></i> <i class='bx bxs-star' id="star"></i> <i class='bx bxs-star'
                    id="star"></i> <i class='bx bxs-star' id="star"></i> </div> <span>441
                  reviews</span>
              </div>
              <div class="size">
                <select class="card-size">
                  <option>Size : S</option>
                  <option>Size : M</option>
                  <option>Size : L</option>
                  <option>Size : XL</option>
                </select>
                <div class="buttons d-flex flex-row mt-5 gap-3"> <button
                    class="btn-success p-2 rounded-3 buy">Comprar</button> <button
                    class="btn-warning p-2 rounded-3 addToCart">Agregar al carrito</button>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
    `;
    container.appendChild(card);
});
}

// Mostrar todas las tarjetas de productos al cargar la página
displayProductCards();