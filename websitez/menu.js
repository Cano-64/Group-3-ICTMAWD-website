const tabBtns = document.querySelectorAll('.tab-btn');
const categoryBlocks = document.querySelectorAll('.menu-category-block');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        categoryBlocks.forEach(block => {
            if (filter === 'all' || block.getAttribute('data-category') === filter) {
                block.style.display = 'block';
            } else {
                block.style.display = 'none';
            }
        });
    });
});

let cart = [];

function addToCart(itemName, price) {
    const existing = cart.find(item => item.name === itemName);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    updateCartUI();
    toggleModal(true);
}

function updateCartUI() {
    const cartList = document.getElementById('cartList');
    const cartTotal = document.getElementById('cartTotal');
    
    cartList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="order-summary-item" style="color: var(--text-muted);">Your order is currently empty.</li>';
    } else {
        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const li = document.createElement('li');
            li.className = 'order-summary-item';
            li.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>₱${itemTotal}</span>
            `;
            cartList.appendChild(li);
        });
    }

    cartTotal.textContent = `₱${total}`;
}

function toggleModal(show) {
    const modal = document.getElementById('orderModal');
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

function handleCheckout(event) {
    event.preventDefault();
    if (cart.length === 0) {
        alert('Please add items to your order before placing it.');
        return;
    }
    alert('Thank you! Your order request has been submitted to Bukluran Cafe Luzviminda 2.');
    cart = [];
    updateCartUI();
    toggleModal(false);
}