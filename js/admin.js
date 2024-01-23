const addProductButton = document.querySelector('.addProduct');

addProductButton.addEventListener("submit", function (event) {
    
    const codeProduct = document.querySelector('.code-product').value;
    const imageProduct = document.querySelector('.image-product').value;
    const imageProduct2 = document.querySelector('.image-product-2').value;
    const imageProduct3 = document.querySelector('.image-product-3').value;
    const imageProduct4 = document.querySelector('.image-product-4').value;
    const titleProduct = document.querySelector('.title-product').value;
    const descriptionProduct = document.querySelector('.description-pageDetail').value;
    const priceProduct = document.querySelector('.price-product').value;
    const categoryProduct = document.querySelector('.category-product').value;
    const typeProduct = document.querySelector('.type-product').value;

    const existingProducts = JSON.parse(localStorage.getItem('productAdded')) || [];

    const newProduct = {
        code: codeProduct,
        image: imageProduct,
        image2: imageProduct2,
        image3: imageProduct3,
        image4: imageProduct4,
        title: titleProduct,
        description: descriptionProduct,
        price: priceProduct, 
        category: categoryProduct,
        type: typeProduct
    };

    existingProducts.push(newProduct);

    localStorage.setItem('productAdded', JSON.stringify(existingProducts));

    alert('Producto agregado al carrito exitosamente');
});









const tbody = document.querySelector('.tbody');

    // Obtener la información del producto desde el localStorage
    let products = JSON.parse(localStorage.getItem('productAdded')) || [];

        // Crear filas para cada producto
        products.forEach(function (product, index) {
            let newRow = document.createElement('tr');
            newRow.innerHTML = `
            <th scope="row">${product.code}</th>
            <td class="table-products">
                
                <h6>${product.title}</h6>
            </td>
            <td>
            <img src="${product.image}" alt="">
            </td>
            <td class="table-price">
                <p>$${product.price}</p>
            </td>
            <td>
                <button class="delete  btn-danger p-1"><i class='bx bxs-trash'></i></button>
                <button class="modify  btn-info p-1"><i class='bx bxs-edit' ></i></button>
            </td>
            `;

            // Agregar la nueva fila al tbody
            tbody.appendChild(newRow);
        });

         // Agregar manejador de eventos para los botones de eliminación
         tbody.addEventListener('click', function (event) {
            const target = event.target;

            if (target.classList.contains('delete')) {
                // Obtener la fila a la que pertenece el botón
                const row = target.closest('tr');

                // Obtener el índice de la fila
                const rowIndex = Array.from(row.parentNode.children).indexOf(row);

                // Eliminar el producto del array y actualizar el localStorage
                products.splice(rowIndex, 1);
                localStorage.setItem('productAdded', JSON.stringify(products));

                // Eliminar la fila visualmente
                row.remove();

                // Actualizar el total después de eliminar la fila
               
            }
        });

  

        // Función para modificar un producto
function modifyProduct(code) {
    // Buscar el producto en el array de productos
    const productIndex = products.findIndex(product => product.code === code);

    if (productIndex !== -1) {
        // Obtener el producto existente
        const existingProduct = products[productIndex];

        // Llenar los campos del formulario con la información del producto existente
        document.querySelector('.code-product').value = existingProduct.code;
        document.querySelector('.image-product').value = existingProduct.image;
        document.querySelector('.image-product-2').value = existingProduct.image2;
        document.querySelector('.image-product-3').value = existingProduct.image3;
        document.querySelector('.image-product-4').value = existingProduct.image4;
        document.querySelector('.title-product').value = existingProduct.title;
        document.querySelector('.description-pageDetail').value = existingProduct.description;
        document.querySelector('.price-product').value = existingProduct.price;

        // Eliminar el producto existente del array
        products.splice(productIndex, 1);

        // Actualizar el localStorage sin el producto existente
        localStorage.setItem('productAdded', JSON.stringify(products));

        // Mostrar un mensaje indicando que el producto se está modificando
        alert('Modificando producto. Puedes hacer los cambios y guardar.');

        // Puedes agregar aquí lógica adicional según tus necesidades, por ejemplo, mostrar un formulario de edición.
    } else {
        // Mostrar un mensaje si no se encuentra el producto
        alert('Producto no encontrado');
    }
}

// Agregar manejador de eventos para los botones de modificación
tbody.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('modify')) {
        // Obtener la fila a la que pertenece el botón
        const row = target.closest('tr');

        // Obtener el código del producto de la primera celda de la fila
        const code = row.querySelector('th').textContent;

        // Llamar a la función de modificar producto
        modifyProduct(code);
    }
});
