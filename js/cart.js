document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  const couponForm = document.getElementById('coupon-form');
  const couponInput = document.getElementById('coupon-code');
  const clearCartButton = document.getElementById('clear-cart');
  const checkoutButton = document.getElementById('checkout-btn');

  if (!cartContainer) return;

  function renderCartPage() {
    const cart = getCart();
    const summary = getCartSummary();

    if (!cart.length) {
      cartContainer.innerHTML = `
        <div class="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add a few favorites from the menu and they will appear here.</p>
          <a href="menu.html" class="primary-btn">Browse Food</a>
        </div>
      `;
      if (cartSummary) {
        cartSummary.innerHTML = `
          <h3>Order Summary</h3>
          <div class="summary-line"><span>Subtotal</span><span>${formatCurrency(0)}</span></div>
          <div class="summary-line"><span>Delivery</span><span>${formatCurrency(0)}</span></div>
          <div class="summary-line"><span>Tax</span><span>${formatCurrency(0)}</span></div>
          <div class="summary-line"><span>Discount</span><span>${formatCurrency(0)}</span></div>
          <div class="summary-line total"><span>Total</span><span>${formatCurrency(0)}</span></div>
        `;
      }
      return;
    }

    cartContainer.innerHTML = cart.map((item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80';">
        <div class="item-main">
          <h4>${item.name}</h4>
          <div class="item-price">${formatCurrency(item.price)} each</div>
          <div class="item-controls">
            <button type="button" class="qty-button" data-action="decrease" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button type="button" class="qty-button" data-action="increase" data-id="${item.id}">+</button>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:12px;">
          <strong>${formatCurrency(item.price * item.quantity)}</strong>
          <button type="button" class="delete-btn" data-action="remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join('');

    if (cartSummary) {
      cartSummary.innerHTML = `
        <h3>Order Summary</h3>
        <div class="summary-line"><span>Subtotal</span><span>${formatCurrency(summary.subtotal)}</span></div>
        <div class="summary-line"><span>Delivery</span><span>${formatCurrency(summary.deliveryFee)}</span></div>
        <div class="summary-line"><span>Tax</span><span>${formatCurrency(summary.tax)}</span></div>
        <div class="summary-line"><span>Discount</span><span>-${formatCurrency(summary.discount)}</span></div>
        <div class="summary-line total"><span>Total</span><span>${formatCurrency(summary.grandTotal)}</span></div>
      `;
    }

    cartContainer.querySelectorAll('[data-action="increase"]').forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.id;
        const cartItems = getCart();
        const item = cartItems.find((entry) => entry.id === targetId);
        if (item) {
          item.quantity += 1;
          saveCart(cartItems);
          renderCartPage();
        }
      });
    });

    cartContainer.querySelectorAll('[data-action="decrease"]').forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.id;
        const cartItems = getCart();
        const item = cartItems.find((entry) => entry.id === targetId);
        if (!item) return;

        item.quantity -= 1;
        if (item.quantity <= 0) {
          const updated = cartItems.filter((entry) => entry.id !== targetId);
          saveCart(updated);
        } else {
          saveCart(cartItems);
        }
        renderCartPage();
      });
    });

    cartContainer.querySelectorAll('[data-action="remove"]').forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.dataset.id;
        const updated = getCart().filter((entry) => entry.id !== targetId);
        saveCart(updated);
        renderCartPage();
        showToast('Item removed from cart', 'info');
      });
    });

    if (checkoutButton) {
      checkoutButton.disabled = cart.length === 0;
      checkoutButton.style.opacity = cart.length === 0 ? '0.6' : '1';
    }
  }

  couponForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const code = couponInput?.value || '';
    const result = applyCoupon(code);

    if (!result.valid) {
      showToast(result.message, 'error');
      return;
    }

    showToast(result.message, 'success');
    renderCartPage();
    couponForm.reset();
  });

  clearCartButton?.addEventListener('click', () => {
    const confirmClear = window.confirm('Clear your full cart?');
    if (!confirmClear) return;

    saveCart([]);
    clearCoupon();
    renderCartPage();
    showToast('Cart cleared', 'info');
  });

  renderCartPage();
});
