/*
document.addEventListener('DOMContentLoaded', function (event) {
    // Obtener referencia al contenedor de productos en el HTML
    const productContainer = document.querySelector('.productContainer');

    // Inicializar la lista de productos como un array vacío
    let products = [];

    try {
        // Intentar obtener productos desde localStorage
        const storedProducts = localStorage.getItem('products');

        // Verificar si hay datos y son válidos
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        }
    } catch (error) {
        console.error('Error al obtener productos desde localStorage:', error);
    }

    // Verificar si hay productos para mostrar
    if (products.length > 0) {
        // Crear filas para cada producto y agregar al contenedor
        products.forEach(function (product, index) {
            let newRow = document.createElement('div');
            newRow.innerHTML = `
                <div class="col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3">
                    <div class="product">
                        <img src="${product.image}" alt="">
                    </div>
                    <div class="title pt-4 pb-1">${product.title}</div>
                    <div class="d-flex align-content-center justify-content-center">
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star"></span>
                        <span class="fas fa-star"></span>
                    </div>
                    <div class="price">${product.price}</div>
                </div>
            `;

            // Agregar la nueva fila al contenedor de productos
            productContainer.appendChild(newRow);
        });
    }
});

*/


/*

document.addEventListener("DOMContentLoaded", function() {
    // Obtén el producto almacenado en el localStorage
    var storedProduct = localStorage.getItem("products");

    // Verifica si hay un producto almacenado
    if (storedProduct) {
        // Parsea el producto desde JSON a un objeto JavaScript
        var product = JSON.parse(storedProduct);

        // Llama a la función para crear la tarjeta con la información del producto
        createProductCard(product);
    }
});

// Función para crear una tarjeta con la información del producto
function createProductCard(product) {
    // Obtén el contenedor de productos
    var productContainer = document.querySelector(".productContainer");

    // Crea un nuevo elemento div para la tarjeta
    var card = document.createElement("div");
    card.className = "col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3";

    // Crea el contenido de la tarjeta
    card.innerHTML = `
        <div class="product">
            <img src="${product.image}" alt="">
        </div>
        <div class="title pt-4 pb-1">${product.name}</div>
        <div class="d-flex align-content-center justify-content-center">
            <span class="fas fa-star"></span>
            <span class="fas fa-star"></span>
            <span class="fas fa-star"></span>
            <span class="fas fa-star"></span>
            <span class="fas fa-star"></span>
        </div>
        <div class="price">$ ${product.price}</div>
    `;

    // Agrega la tarjeta al contenedor de productos
    productContainer.appendChild(card);
}

*/








/*

const row = document.querySelector('.row');

    // Obtener la información del producto desde el localStorage
    let products = JSON.parse(localStorage.getItem('productAdded')) || [];

        // Crear filas para cada producto
       
        products.forEach(function (product, index) {
            if(product.category === 'Niños' && product.type === 'Ropa'){
                let newRow = document.createElement('div');
            newRow.className = "col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3 text-center"
            newRow.innerHTML = `
            <div>
                <div class="product">
                    <img src="${product.image}"
                        alt="">
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
            </div>
            `;

            // Agregar la nueva fila al tbody
            row.appendChild(newRow);
            } else {
                console.log('No se pudo agregar el producto')
            }
        });

       */





// Obtener el nombre de la página actual
const currentPage = window.location.pathname.split('/').pop().split('.')[0];

// Obtener la lista de productos almacenados en el Local Storage
const storedProducts = JSON.parse(localStorage.getItem('productAdded')) || [];
console.log(currentPage);

// Filtrar productos según la categoría de la página actual
let filteredProducts = [];
if (currentPage === 'clothesMen') {
  filteredProducts = storedProducts.filter(product => ( product.category.includes('Hombres') && (product.type.includes('Ropa')) ));
} else if (currentPage === 'clothesWomen') {
  filteredProducts = storedProducts.filter(product => ( product.category.includes('Mujeres') && (product.type.includes('Ropa')) ));
} else if (currentPage === 'clothesKids') {
  filteredProducts = storedProducts.filter(product => ( product.category.includes('Niños') && (product.type.includes('Ropa')) ));
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





