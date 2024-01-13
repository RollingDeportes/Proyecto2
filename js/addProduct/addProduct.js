const row = document.querySelector('.row');

    // Obtener la información del producto desde el localStorage
    let products = JSON.parse(localStorage.getItem('productAdded')) || [];

        // Crear filas para cada producto
       
        products.forEach(function (product, index) {
            
                let newRow = document.createElement('div');
            newRow.className = "col-lg-3 col-sm-6 d-flex flex-column align-items-center justify-content-center product-item my-3 text-center"
            newRow.innerHTML = `
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
            </div>
            `;

            // Agregar la nueva fila al tbody
            row.appendChild(newRow);
            
        });