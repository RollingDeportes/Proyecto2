document.addEventListener('DOMContentLoaded', function () {
    displayProductList();
  
    const applyFiltersButton = document.getElementById('applyFilters');
    applyFiltersButton.addEventListener('click', applyFilters);
  });
  
  function displayProductList() {
    const container = document.getElementById('productListContainer');
    container.innerHTML = '';
  
    const products = getProductsFromLocalStorage();
  
    if (products.length === 0) {
        container.innerHTML = '<p>No hay productos guardados.</p>';
        return;
    }
  
    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
  }
  
  function createProductCard(product) {
    const card = document.createElement('div');
      card.classList.add('col-lg-3', 'col-sm-6', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center', 'product-item', 'my-3', 'product-card');
  
      card.innerHTML = `
        <div class="product">
          <a href=""><img src="${product.image}" alt="${product.title}"></a>
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
      `;
  
    return card;
  }
  
  function applyFilters() {
    const productName = document.getElementById('productName').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
      
    const filteredProducts = getProductsFromLocalStorage().filter(product => {
        const nameMatch = product.title.toLowerCase().includes(productName);
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
  
        return nameMatch && priceMatch;
    });
  
    displayFilteredProducts(filteredProducts);
  }
  
  function displayFilteredProducts(filteredProducts) {
    const container = document.getElementById('productListContainer');
    container.innerHTML = '';
  
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p>No hay productos que coincidan con los filtros.</p>';
        return;
    }
  
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
  }
  
  function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('productAdded')) || [];
  }