// Add to cart
function addToCart(productId, productName, price, quantity, image) {
    fetch('cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=add&productId=${productId}&productName=${productName}&price=${price}&quantity=${quantity}&image=${image}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Product added to cart');
        } else {
            alert('Error adding product to cart: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Remove from cart
function removeFromCart(productId) {
    fetch('cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=remove&productId=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        alert('Product removed from cart');
        updateCart();
    });
}

// Update cart display
function updateCart() {
    fetch('cart.php?action=getCart')
    .then(response => response.json())
    .then(data => {
        const cartTable = document.querySelector('#cart tbody');
        cartTable.innerHTML = '';

        data.cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity}</td>
            `;
            cartTable.appendChild(row);
        });

        document.querySelector('#subtotal').innerText = `$${data.total}`;
    });
}

// Call updateCart on page load
window.onload = updateCart;