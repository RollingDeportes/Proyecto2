function generateRandomCode() {
    return Math.floor(Math.random() * 1000000);
}

// Función para inicializar la página
function initializePage() {
    // Obtener el campo de código y asignar el código generado
    const codeProductField = document.querySelector('.code-product');
    codeProductField.value = generateRandomCode();
}

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', initializePage);



function isValidURL(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}

function isValidStringLength(value, minLength, maxLength) {
    return value.length >= minLength && value.length <= maxLength;
}

function isValidFloat(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function initializePage() {
    const codeProductField = document.querySelector('.code-product');
    codeProductField.value = generateRandomCode();
}

// Llamar a la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', initializePage);

const addProductButton = document.querySelector('.addProduct');

addProductButton.addEventListener("submit", function (event) {
    const generatedCode = generateRandomCode();

    const codeProduct = document.querySelector('.code-product').value = generatedCode;
    const imageProduct = document.querySelector('.image-product').value;
    const imageProduct2 = document.querySelector('.image-product-2').value;
    const imageProduct3 = document.querySelector('.image-product-3').value;
    const imageProduct4 = document.querySelector('.image-product-4').value;
    const titleProduct = document.querySelector('.title-product').value;
    const descriptionProduct = document.querySelector('.description-pageDetail').value;
    const priceProduct = document.querySelector('.price-product').value;
    const categoryProduct = document.querySelector('.category-product').value;
    const typeProduct = document.querySelector('.type-product').value;

    // Validar las entradas
    if (!isValidURL(imageProduct) || !isValidURL(imageProduct2) || !isValidURL(imageProduct3) || !isValidURL(imageProduct4)) {
        alert('Ingrese URLs válidas para las imágenes.');
        event.preventDefault();
        return;
    }

    if (!isValidStringLength(titleProduct, 4, 15)) {
        alert('El título debe tener entre 4 y 15 caracteres.');
        event.preventDefault();
        return; 
    }

    if (!isValidStringLength(descriptionProduct, 10, 200)) {
        alert('La descripción debe tener entre 10 y 200 caracteres.');
        event.preventDefault();
        return;
    }

    if (!isValidFloat(priceProduct)) {
        alert('Ingrese un precio válido.');
        event.preventDefault();
        return;
    }

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

    row.addEventListener('click', function () {
        llenarCampos(product);
    });
});


const tbody = document.querySelector('.tbody');

// Obtener la información del producto desde el localStorage
let products = JSON.parse(localStorage.getItem('productAdded')) || [];

// Crear filas para cada producto
function renderProducts() {
    tbody.innerHTML = ''; // Limpiar el contenido actual

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
                <button class="delete btn-danger p-1"><i class='bx bxs-trash'></i></button>
                <button class="modify btn-info p-1"><i class='bx bxs-edit'></i></button>
            </td>
        `;

        // Agregar la nueva fila al tbody
        tbody.appendChild(newRow);

        // Agregar manejador de eventos para los botones de modificación
        const modifyButton = newRow.querySelector('.modify');
        modifyButton.addEventListener('click', function () {
            modifyProduct(product.code);
        });
    });
}

// Renderizar productos al cargar la página
renderProducts();

// Agregar manejador de eventos para los botones de eliminación
tbody.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('delete')) {
        const row = target.closest('tr');

        const rowIndex = Array.from(row.parentNode.children).indexOf(row);

        // Eliminar el producto del array y actualizar el localStorage
        products.splice(rowIndex, 1);
        localStorage.setItem('productAdded', JSON.stringify(products));

        // Eliminar la fila visualmente
        row.remove();

    }
});



function modifyProduct(code) {
    // Buscar el producto en el array de productos
    const productIndex = products.findIndex(product => product.code === code);

    if (productIndex !== -1) {
        const existingProduct = products[productIndex];

        document.querySelector('.code-product').value = existingProduct.code;
        document.querySelector('.category-product').value = existingProduct.category;
        document.querySelector('.type-product').value = existingProduct.type;
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

        alert('Modificando producto. Puedes hacer los cambios y guardar.');
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

        modifyProduct(code);
    }
});

function generateRandomCode() {
    return Math.floor(Math.random() * 1000000);
}

function llenarCampos(product) {
     document.getElementById('id').value = product.id;
     document.getElementById('img').value = product.img;
     document.getElementById('title').value = product.title;
     document.getElementById('price').value = product.price;
     document.getElementById('category').value = product.category;
     document.getElementById('type').value = product.type;
 }