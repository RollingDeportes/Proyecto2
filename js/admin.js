// Función para agregar un producto
function agregarProducto() {
    const productId = document.getElementById('id').value;
    const productImg = document.getElementById('img').value;
    const productTitle = document.getElementById('title').value;
    const productPrice = parseFloat(document.getElementById('price').value);
    const productCategory = document.getElementById('category').value;
    const productType = document.getElementById('type').value;

    // Validar que se hayan ingresado datos
    if (!productTitle || isNaN(productPrice) || !productId || !productImg) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear un objeto de producto
    const product = {
        id: productId,
        img: productImg,
        title: productTitle,
        price: productPrice,
        category: productCategory,
        type: productType
    };

    // Obtener la lista de productos existentes o inicializarla si es la primera vez
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Agregar el nuevo producto a la lista
    products.push(product);

    // Guardar la lista actualizada en el LocalStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Actualizar la tabla de productos
    displayProductList();
}

// Función para mostrar la lista de productos en una tabla
function displayProductList() {
    const container = document.getElementById('productTableContainer');
    container.innerHTML = ''; // Limpiar el contenido anterior

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (products.length === 0) {
        container.innerHTML = '<p>No hay productos guardados.</p>';
        return;
    }

    const table = document.createElement('table');
    table.classList.add('productTable');

    // Encabezados de la tabla
    const headerRow = table.insertRow(0);
    const headers = ['Id', 'Img', 'Titulo', 'Precio', 'Categoria', 'Tipo'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // Filas de la tabla
    products.forEach(product => {
        const row = table.insertRow(-1);

        const idCell = row.insertCell(0);
        idCell.textContent = product.id;

        const imgCell = row.insertCell(1);
        imgCell.innerHTML = `<img src="${product.img}" alt="${product.title}" class="w-25">`;

        const titleCell = row.insertCell(2);
        titleCell.textContent = product.title;

        const priceCell = row.insertCell(3);
        priceCell.textContent = `$${product.price}`;

        const categoryCell = row.insertCell(4);
        categoryCell.textContent = product.category;

        const typeCell = row.insertCell(5);
        typeCell.textContent = product.type;
        
        row.addEventListener('click', function () {
            llenarCampos(product);
        });
    });

    container.appendChild(table);
}

// Mostrar la lista de productos al cargar la página
displayProductList();




// Función para modificar un producto existente
function modificarProducto() {
    const productId = document.getElementById('id').value;
    const productImg = document.getElementById('img').value;
    const productTitle = document.getElementById('title').value;
    const productPrice = parseFloat(document.getElementById('price').value);
    const productCategory = document.getElementById('category').value;
    const productType = document.getElementById('type').value;

    // Validar que se hayan ingresado datos
    if (!productTitle || isNaN(productPrice) || !productId || !productImg) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Obtener la lista de productos existentes
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Buscar el producto en la lista por su id
    const existingProductIndex = products.findIndex(product => product.id === productId);

    // Verificar si se encontró el producto
    if (existingProductIndex !== -1) {
        // Modificar el producto existente
        products[existingProductIndex] = {
            id: productId,
            img: productImg,
            title: productTitle,
            price: productPrice,
            category: productCategory,
            type: productType
        };

        // Actualizar la lista en el LocalStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Actualizar la tabla de productos
        displayProductList();
    } else {
        alert('El producto con el ID especificado no existe.');
    }
}

// Función para eliminar un producto existente
function eliminarProducto() {
    const productId = document.getElementById('id').value;

    // Obtener la lista de productos existentes
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Filtrar la lista para excluir el producto a eliminar
    const updatedProducts = products.filter(product => product.id !== productId);

    // Verificar si se eliminó algún producto
    if (updatedProducts.length < products.length) {
        // Actualizar la lista en el LocalStorage
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        // Actualizar la tabla de productos
        displayProductList();
    } else {
        alert('El producto con el ID especificado no existe.');
    }
}

// Función para llenar los campos con los datos de un producto
function llenarCampos(product) {
   /* selectedProductIndex = index;
    const product = storedProducts[index];*/

    document.getElementById('id').value = product.id;
    document.getElementById('img').value = product.img;
    document.getElementById('title').value = product.title;
    document.getElementById('price').value = product.price;
    document.getElementById('category').value = product.category;
    document.getElementById('type').value = product.type;
}