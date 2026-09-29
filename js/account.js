document.addEventListener('DOMContentLoaded', () => {
  const accountPanel = document.getElementById('account-panel');
  const loginPrompt = document.getElementById('account-login-prompt');
  const profileForm = document.getElementById('profile-form');
  const logoutButton = document.getElementById('logout-btn');

  const user = getCurrentUser();

  if (!user) {
    if (accountPanel) accountPanel.classList.add('hidden');
    if (loginPrompt) loginPrompt.classList.remove('hidden');
    return;
  }

  if (accountPanel) accountPanel.classList.remove('hidden');
  if (loginPrompt) loginPrompt.classList.add('hidden');

  const profileName = document.getElementById('profile-name');
  const profileEmail = document.getElementById('profile-email');
  const profilePhone = document.getElementById('profile-phone');
  const profileAddress = document.getElementById('profile-address');

  if (profileName) profileName.textContent = user.name || 'FreshBite Customer';
  if (profileEmail) profileEmail.textContent = user.email || 'No email saved';
  if (profilePhone) profilePhone.textContent = user.phone || 'No phone saved';
  if (profileAddress) profileAddress.textContent = user.address || 'No default address saved';

  if (profileForm) {
    profileForm.elements['full-name'].value = user.name || '';
    profileForm.elements['email'].value = user.email || '';
    profileForm.elements['phone'].value = user.phone || '';
    profileForm.elements['address'].value = user.address || '';
    profileForm.elements['city'].value = user.city || '';
    profileForm.elements['postal-code'].value = user.postalCode || '';
  }

  profileForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(profileForm);
    const updatedUser = {
      ...user,
      name: formData.get('full-name')?.toString().trim() || user.name,
      email: formData.get('email')?.toString().trim() || user.email,
      phone: formData.get('phone')?.toString().trim() || user.phone,
      address: formData.get('address')?.toString().trim() || '',
      city: formData.get('city')?.toString().trim() || '',
      postalCode: formData.get('postal-code')?.toString().trim() || ''
    };

    saveCurrentUser(updatedUser);

    const users = getSavedUsers();
    const index = users.findIndex((entry) => entry.email.toLowerCase() === user.email.toLowerCase());
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      saveUsers(users);
    }

    showToast('Profile updated', 'success');
    window.location.reload();
  });

  const orderList = document.getElementById('order-list');
  if (orderList) {
    const orders = getOrders();
    if (!orders.length) {
      orderList.innerHTML = '<div class="empty-state">No orders yet. Your recent orders will appear here.</div>';
    } else {
      orderList.innerHTML = orders.slice(0, 4).map((order) => `
        <div class="list-item">
          <div class="card-topline">
            <strong>${order.id}</strong>
            <span class="rating-badge">${order.status}</span>
          </div>
          <p>${order.items.map((item) => `${item.name} × ${item.quantity}`).join(', ')}</p>
          <div class="price-row">
            <span>${new Date(order.createdAt).toLocaleDateString()}</span>
            <button type="button" class="small-btn secondary-btn reorder-btn" data-order-id="${order.id}">Reorder</button>
          </div>
        </div>
      `).join('');

      orderList.querySelectorAll('.reorder-btn').forEach((button) => {
        button.addEventListener('click', () => {
          const order = getOrders().find((entry) => entry.id === button.dataset.orderId);
          if (!order) return;

          const cart = getCart();
          order.items.forEach((item) => {
            const existing = cart.find((entry) => entry.id === item.id);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              cart.push({ id: item.id, name: item.name, price: item.price, quantity: item.quantity, image: getProductById(item.id)?.image || '' });
            }
          });

          saveCart(cart);
          showToast('Order added to cart', 'success');
          window.location.href = 'cart.html';
        });
      });
    }
  }

  const wishlistContainer = document.getElementById('wishlist-panel');
  if (wishlistContainer) {
    renderWishlistCards('wishlist-panel', 'Remove');
    wishlistContainer.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-wishlist-action="toggle"]');
      if (!trigger) return;
      const productId = trigger.dataset.id;
      toggleWishlist(productId);
      renderWishlistCards('wishlist-panel', 'Remove');
    });
  }

  logoutButton?.addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    showToast('Logged out', 'info');
    window.location.href = 'login.html';
  });
});
