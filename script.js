document.addEventListener('DOMContentLoaded', () => {
    const cart = {};
    const cartItems = document.getElementById('cart-items');
    const totalCostElement = document.getElementById('total-cost');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutSection = document.getElementById('checkout-section');
    const checkoutForm = document.getElementById('checkout-form');

    const paymentButtons = document.querySelectorAll('.payment-method');
    const paymentMethodInput = document.getElementById('payment-method');
    const confirmButton = document.getElementById('confirm-button');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const sabor = button.closest('.sandwich').getAttribute('data-sabor');
            if (!cart[sabor]) {
                cart[sabor] = 1;
            } else {
                cart[sabor]++;
            }
            updateCart();
        });
    });

    checkoutButton.addEventListener('click', () => {
        checkoutSection.classList.remove('hidden');
        window.scrollTo({
            top: checkoutSection.offsetTop,
            behavior: 'smooth'
        });
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Compra confirmada. ¡Gracias por tu pedido!');
        checkoutSection.classList.add('hidden');
        cartItems.innerHTML = '';
        totalCostElement.textContent = 'Total: $0';
        Object.keys(cart).forEach(key => delete cart[key]);
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let totalCost = 0;

        for (const [sabor, quantity] of Object.entries(cart)) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${sabor} - Cantidad: 
                <span class="quantity">
                    <button class="decrease" data-sabor="${sabor}">-</button>
                    ${quantity}
                    <button class="increase" data-sabor="${sabor}">+</button>
                </span>
            `;
            cartItems.appendChild(listItem);
            totalCost += quantity * 2000;
        }

        totalCostElement.textContent = `Total: $${totalCost}`;

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const sabor = button.getAttribute('data-sabor');
                if (cart[sabor] > 1) {
                    cart[sabor]--;
                } else {
                    delete cart[sabor];
                }
                updateCart();
            });
        });

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const sabor = button.getAttribute('data-sabor');
                cart[sabor]++;
                updateCart();
            });
        });
    }

    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentMethodInput.value = button.getAttribute('data-method');
            alert(`Método de pago seleccionado: ${paymentMethodInput.value}`);
        });
    });
    
    confirmButton.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const classroom = document.getElementById('classroom').value;
    const paymentMethod = paymentMethodInput.value;

    if (name && phone && classroom && paymentMethod) {
        let cartDetails = '';
        let totalCost = 0;

        // Recorre el carrito y construye el detalle de los sándwiches
        for (const [sabor, quantity] of Object.entries(cart)) {
            cartDetails += `${sabor} - Cantidad: ${quantity}\n`;
            totalCost += quantity * 2000;
        }

        // Mensaje a enviar
        const message = `Nuevo pedido:\n\nNombre: ${name}\nCelular: ${phone}\nSalón: ${classroom}\nMétodo de Pago: ${paymentMethod}\n\nDetalles del Carrito:\n${cartDetails}Total: $${totalCost}`;
        const whatsappLink = `https://wa.me/573103513674?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappLink;
    } else {
        alert('Por favor, complete todos los campos antes de confirmar.');
    }
});

    
    checkoutButton.addEventListener('click', () => {
        checkoutSection.classList.remove('hidden');
        document.querySelector('.container').classList.add('hidden');
    });
});
