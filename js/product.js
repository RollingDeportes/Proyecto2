// Obtener referencia a todos los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.addToCart');

// Manejador de evento para el clic en los botones "Agregar al carrito"
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        // Evitar que la página se recargue al hacer clic
        event.preventDefault();

        // Obtener información del producto
        const productImage = button.closest('.card').querySelector('.card-image').src;
        const productName = button.closest('.card').querySelector('.card-title').textContent;
        const productSize = button.closest('.card').querySelector('.card-size').value;
        const productPrice = button.closest('.card').querySelector('.card-price').textContent;

        // Obtener la lista de productos del carrito del localStorage (si existe)
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

        // Crear un objeto con la información del nuevo producto
        const newProduct = {
            image: productImage,
            name: productName,
            size: productSize,
            price: productPrice
        };

        // Agregar el nuevo producto a la lista existente
        existingProducts.push(newProduct);

        // Actualizar la lista en el localStorage
        localStorage.setItem('products', JSON.stringify(existingProducts));

        // Confirmar que el producto se ha añadido al carrito
        alert('Producto agregado al carrito');

        // Puedes redirigir a la página del carrito u otras acciones según tus necesidades
        // window.location.href = '../pages/carrito.html';
    });
});
