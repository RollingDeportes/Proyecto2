

document.addEventListener('DOMContentLoaded', function (event) {
    // Obtener referencia al tbody de la tabla
    const tbody = document.querySelector('.tbody');

    // Obtener la información del producto desde el localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Verificar si hay información de productos en el localStorage
    if (products.length > 0) {
        // Crear filas para cada producto
        products.forEach(function (product, index) {
            let newRow = document.createElement('tr');
            newRow.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td class="table-products">
                    <img src="${product.image}" alt="">
                    <h6>${product.name}</h6>
                </td>
                <td class="table-size">
                    <p>Talle: ${product.size}</p>
                </td>
                <td class="table-price">
                    <p>${product.price}</p>
                </td>
                <td class="table-quantity">
                    <input type="number" min="1" value="1">
                    <button class="delete btn btn-danger">X</button>
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
                localStorage.setItem('products', JSON.stringify(products));

                // Eliminar la fila visualmente
                row.remove();

                // Actualizar el total después de eliminar la fila
                updateTotal();
            }
        });

        // Agregar manejador de eventos para cambiar la cantidad
        tbody.addEventListener('input', function (event) {
            const target = event.target;

            if (target.tagName === 'INPUT' && target.type === 'number') {
                // Actualizar el producto con la nueva cantidad
                const row = target.closest('tr');
                const rowIndex = Array.from(row.parentNode.children).indexOf(row);
                products[rowIndex].quantity = parseInt(target.value);

                // Actualizar el localStorage con la nueva cantidad
                localStorage.setItem('products', JSON.stringify(products));

                // Actualizar el total después de cambiar la cantidad
                updateTotal();
            }
        });

        // Calcular el total
        updateTotal();
    }
});

// Función para actualizar el total
function updateTotal() {
    // Obtener todas las filas de la tabla
    const rows = document.querySelectorAll('.table tbody tr');

    // Inicializar el total
    let total = 0;

    // Iterar sobre todas las filas y sumar los precios
    rows.forEach(function (row) {
        const price = parseFloat(row.querySelector('.table-price p').textContent.replace('$', '').replace(',', '').trim());
        const quantity = parseInt(row.querySelector('.table-quantity input').value);
        total += price * quantity;
    });

    // Actualizar el texto del total en la página
    document.querySelector('.itemCarTotal').textContent = 'Total: $' + total.toFixed(3);

    // Actualizar el total en el localStorage
    localStorage.setItem('total', total.toFixed(3));
}
