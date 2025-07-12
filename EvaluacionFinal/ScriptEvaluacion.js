document.addEventListener('DOMContentLoaded', () => {
    const usuarios = [
        { email: 'user@example.com', password: 'password123' },
        { email: 'admin@company.com', password: 'admin' }
    ];

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;
            const loginMessage = document.getElementById('loginMessage');

            const usuarioEncontrado = usuarios.find(
                usuario => usuario.email === emailInput && usuario.password === passwordInput
            );

            if (usuarioEncontrado) {
                localStorage.setItem('sesionIniciada', 'true');
                localStorage.setItem('usuarioActual', usuarioEncontrado.email);
                window.location.href = 'EvaluacionFinal2.html'; // Redirige a la página del carrito
            } else {
                loginMessage.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
            }
        });
    }

    const productSelect = document.getElementById('productSelect');
    const addSelectedProductBtn = document.getElementById('addSelectedProductBtn');
    const itemsCarritoBody = document.getElementById('itemsCarrito');
    const montoTotalSpan = document.getElementById('montoTotal');
    const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');

    if (productSelect && addSelectedProductBtn && itemsCarritoBody && montoTotalSpan && btnFinalizarCompra) {
        const productos = [
            { id: 1, nombre: 'Laptop Gamer', precio: 1250.00 },
            { id: 2, nombre: 'Auriculares Bluetooth', precio: 79.50 },
            { id: 3, nombre: 'Teclado Mecánico', precio: 99.99 },
            { id: 4, nombre: 'Tablet', precio: 349.99 }
        ];

        let carrito = [];

        const renderProductos = () => {
            productSelect.innerHTML = '';
            productos.forEach(producto => {
                const option = document.createElement('option');
                option.value = producto.id;
                option.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
                productSelect.appendChild(option);
            });
        };

        const agregarProductoAlCarrito = (productId) => {
            const productoExistente = carrito.find(item => item.id === productId);
            const productoAAgregar = productos.find(prod => prod.id === productId);

            if (productoAAgregar) {
                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({ ...productoAAgregar, cantidad: 1 });
                }
                renderCarrito();
            }
        };

        const eliminarProductoDelCarrito = (productId) => {
            carrito = carrito.filter(item => item.id !== productId);
            renderCarrito();
        };

        const actualizarCantidadProducto = (productId, newQuantity) => {
            const item = carrito.find(item => item.id === productId);
            if (item) {
                if (newQuantity > 0) {
                    item.cantidad = newQuantity;
                } else {
                    const currentItem = carrito.find(item => item.id === productId);
                    if (currentItem) {
                    }
                    if (newQuantity <= 0) {
                        eliminarProductoDelCarrito(productId);
                    }
                }
                renderCarrito();
            }
        };

        const renderCarrito = () => {
            itemsCarritoBody.innerHTML = '';
            let total = 0;

            if (carrito.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = `<td colspan="5" class="empty-cart-message">El carrito está vacío.</td>`;
                itemsCarritoBody.appendChild(emptyRow);
            } else {
                carrito.forEach(item => {
                    const subtotal = item.precio * item.cantidad;
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td data-label="Producto">${item.nombre}</td>
                        <td data-label="Precio">$${item.precio.toFixed(2)}</td>
                        <td data-label="Cantidad">
                            <input type="number" min="1" value="${item.cantidad}" data-id="${item.id}"
                                   class="quantity-input">
                        </td>
                        <td data-label="Subtotal">$${subtotal.toFixed(2)}</td>
                        <td data-label="Acciones">
                            <button data-id="${item.id}" class="remove-from-cart-btn">
                                Eliminar
                            </button>
                        </td>
                    `;
                    itemsCarritoBody.appendChild(newRow);
                    total += subtotal;
                });
            }

            montoTotalSpan.textContent = total.toFixed(2);

            document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    eliminarProductoDelCarrito(productId);
                });
            });

            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const productId = parseInt(e.target.dataset.id);
                    const newQuantity = parseInt(e.target.value);
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                        actualizarCantidadProducto(productId, newQuantity);
                    } else {
                        const currentItem = carrito.find(item => item.id === productId);
                        if (currentItem) {
                        }
                        if (newQuantity <= 0) {
                            eliminarProductoDelCarrito(productId);
                        }
                    }
                });
            });
        };

        addSelectedProductBtn.addEventListener('click', () => {
            const selectedProductId = parseInt(productSelect.value);
            if (selectedProductId) {
                agregarProductoAlCarrito(selectedProductId);
            } else {
                alert('Por favor, selecciona un producto para agregar.');
            }
        });

        if (btnFinalizarCompra) {
            btnFinalizarCompra.addEventListener('click', () => {
                if (carrito.length > 0) {
                    const totalFinal = parseFloat(montoTotalSpan.textContent);
                    alert(`¡Compra finalizada con éxito!\nTotal a pagar: $${totalFinal.toFixed(2)}\nGracias por tu compra.`);
                    carrito = [];
                    renderCarrito();
                } else {
                    alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
                }
            });
        }

        renderProductos();
        renderCarrito();
    }
});