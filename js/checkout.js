document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');
  const summaryBox = document.getElementById('checkout-summary');
  const confirmationBox = document.getElementById('order-confirmation');

  if (!checkoutForm) return;

  const cart = getCart();
  if (!cart.length) {
    checkoutForm.querySelectorAll('input, select, textarea, button').forEach((element) => {
      element.disabled = true;
    });
    summaryBox.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add items before checking out.</p>
        <a class="primary-btn" href="menu.html">Browse Menu</a>
      </div>
    `;
    return;
  }

  const user = getCurrentUser();
  const summary = getCartSummary();

  function populateSummary() {
    summaryBox.innerHTML = `
      <h3>Order Summary</h3>
      <div class="summary-line"><span>Items</span><span>${cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
      <div class="summary-line"><span>Subtotal</span><span>${formatCurrency(summary.subtotal)}</span></div>
      <div class="summary-line"><span>Delivery</span><span>${formatCurrency(summary.deliveryFee)}</span></div>
      <div class="summary-line"><span>Tax</span><span>${formatCurrency(summary.tax)}</span></div>
      <div class="summary-line"><span>Discount</span><span>-${formatCurrency(summary.discount)}</span></div>
      <div class="summary-line total"><span>Total</span><span>${formatCurrency(summary.grandTotal)}</span></div>
      <div class="summary-line"><span>ETA</span><span>${getRestaurantById(cart[0]?.restaurantId)?.deliveryTime || '25-35 min'}</span></div>
    `;
  }

  function prefillUser() {
    if (!user) return;
    const nameInput = document.getElementById('customer-name');
    const emailInput = document.getElementById('customer-email');
    const phoneInput = document.getElementById('customer-phone');
    const addressInput = document.getElementById('delivery-address');
    const cityInput = document.getElementById('delivery-city');
    const zipInput = document.getElementById('postal-code');

    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';
    if (addressInput) addressInput.value = user.address || '';
    if (cityInput) cityInput.value = user.city || '';
    if (zipInput) zipInput.value = user.postalCode || '';
  }

  function validateForm(formData) {
    const requiredFields = [
      { name: 'customer-name', label: 'Name' },
      { name: 'customer-email', label: 'Email' },
      { name: 'customer-phone', label: 'Phone' },
      { name: 'delivery-address', label: 'Address' },
      { name: 'delivery-city', label: 'City' },
      { name: 'postal-code', label: 'Postal code' }
    ];

    for (const field of requiredFields) {
      const input = document.getElementById(field.name);
      if (!input || !input.value.trim()) {
        showToast(`${field.label} is required.`, 'error');
        return false;
      }
    }

    const email = document.getElementById('customer-email').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return false;
    }

    if (phone.length < 10) {
      showToast('Please enter a valid phone number.', 'error');
      return false;
    }

    return true;
  }

  populateSummary();
  prefillUser();

  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(checkoutForm);
    const customerName = formData.get('customer-name')?.toString().trim();
    const email = formData.get('customer-email')?.toString().trim();
    const phone = formData.get('customer-phone')?.toString().trim();
    const deliveryAddress = formData.get('delivery-address')?.toString().trim();
    const city = formData.get('delivery-city')?.toString().trim();
    const postalCode = formData.get('postal-code')?.toString().trim();
    const instructions = formData.get('instructions')?.toString().trim();
    const paymentMethod = formData.get('payment-method')?.toString() || 'Cash on Delivery';

    if (!validateForm()) return;

    const order = {
      id: `FB-${Date.now()}`,
      customerName,
      email,
      phone,
      address: deliveryAddress,
      city,
      postalCode,
      instructions,
      paymentMethod,
      status: 'Order Placed',
      createdAt: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal: summary.subtotal,
      tax: summary.tax,
      deliveryFee: summary.deliveryFee,
      discount: summary.discount,
      total: summary.grandTotal,
      coupon: summary.couponCode || 'None'
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    clearCoupon();
    saveCart([]);

    const renderedConfirmation = `
      <div class="empty-state">
        <h3>Order Placed Successfully</h3>
        <p>Your order ID is <strong>${order.id}</strong>. Payment method: <strong>${paymentMethod}</strong> (simulated demo only).</p>
        <div class="order-status">
          <div class="status-step done">Order Placed</div>
          <div class="status-step active">Preparing</div>
          <div class="status-step">Out for Delivery</div>
          <div class="status-step">Delivered</div>
        </div>
        <br>
        <a class="primary-btn" href="account.html">Track in Account</a>
      </div>
    `;

    confirmationBox.innerHTML = renderedConfirmation;
    checkoutForm.classList.add('hidden');
    showToast('Order placed successfully', 'success');
  });
});
