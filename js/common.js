document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  updateCartCount();
  renderUserChip();
  initGlobalSearch();
});

function safeReadStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn('Unable to read localStorage key:', key, error);
    return fallback;
  }
}

function safeWriteStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Unable to write localStorage key:', key, error);
  }
}

function getCart() {
  return safeReadStorage(STORAGE_KEYS.cart, []);
}

function saveCart(cart) {
  safeWriteStorage(STORAGE_KEYS.cart, cart);
  updateCartCount();
}

function getCurrentUser() {
  return safeReadStorage(STORAGE_KEYS.currentUser, null);
}

function saveCurrentUser(user) {
  safeWriteStorage(STORAGE_KEYS.currentUser, user);
  renderUserChip();
}

function getWishlist() {
  return safeReadStorage(STORAGE_KEYS.wishlist, []);
}

function saveWishlist(list) {
  safeWriteStorage(STORAGE_KEYS.wishlist, list);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
}

function updateCartCount() {
  const total = getCart().reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  document.querySelectorAll('.cart-count').forEach((element) => {
    element.textContent = total;
  });
  const cartLink = document.querySelector('.cart-link .cart-count');
  if (cartLink) cartLink.textContent = total;
}

function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}

function getProductById(id) {
  return foodItems.find((item) => item.id === id) || null;
}

function getRestaurantById(id) {
  return restaurants.find((item) => item.id === id) || null;
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);

  if (!product) {
    showToast('Item not found.', 'error');
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      restaurantId: product.restaurantId
    });
  }

  saveCart(cart);
  showToast(`${product.name} added to cart`, 'success');
}

function renderUserChip() {
  const user = getCurrentUser();
  const accountLabel = document.querySelector('[data-user-label]');
  if (!accountLabel) return;

  if (user && user.name) {
    accountLabel.textContent = `Hi, ${user.name.split(' ')[0]}`;
    accountLabel.setAttribute('href', 'account.html');
  } else {
    accountLabel.textContent = 'Account';
    accountLabel.setAttribute('href', 'login.html');
  }
}

function initGlobalSearch() {
  const searchForm = document.querySelector('[data-global-search]');
  if (!searchForm) return;

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = searchForm.querySelector('input');
    const keyword = (input?.value || '').trim();

    if (!keyword) {
      window.location.href = 'menu.html';
      return;
    }

    const productMatch = foodItems.find((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
    if (productMatch) {
      window.location.href = `product.html?id=${productMatch.id}`;
      return;
    }

    window.location.href = `menu.html?search=${encodeURIComponent(keyword)}`;
  });
}

function getCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const deliveryFee = subtotal > 0 ? (subtotal >= 500 ? 0 : 49) : 0;
  const tax = subtotal * 0.05;
  const couponCode = safeReadStorage(STORAGE_KEYS.coupon, '');
  let discount = 0;

  if (couponCode === 'WELCOME10') {
    discount = subtotal * 0.10;
  } else if (couponCode === 'FRESH50' && subtotal > 499) {
    discount = 50;
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discount);

  return {
    cart,
    subtotal,
    deliveryFee,
    tax,
    discount,
    grandTotal,
    couponCode
  };
}

function applyCoupon(code) {
  const cleanCode = String(code || '').trim().toUpperCase();
  const validCodes = Object.keys(couponRules);

  if (!validCodes.includes(cleanCode)) {
    return { valid: false, message: 'Invalid coupon code. Try WELCOME10 or FRESH50.' };
  }

  const { subtotal } = getCartSummary();
  if (cleanCode === 'FRESH50' && subtotal <= 499) {
    return { valid: false, message: 'FRESH50 applies only on orders above ₹499.' };
  }

  safeWriteStorage(STORAGE_KEYS.coupon, cleanCode);
  return { valid: true, message: `Coupon ${cleanCode} applied successfully.` };
}

function clearCoupon() {
  safeWriteStorage(STORAGE_KEYS.coupon, '');
}

function getSavedUsers() {
  return safeReadStorage(STORAGE_KEYS.users, []);
}

function saveUsers(users) {
  safeWriteStorage(STORAGE_KEYS.users, users);
}

function getOrders() {
  return safeReadStorage(STORAGE_KEYS.orders, []);
}

function saveOrders(orders) {
  safeWriteStorage(STORAGE_KEYS.orders, orders);
}

function getReviews() {
  return safeReadStorage(STORAGE_KEYS.reviews, demoReviews);
}

function saveReviews(reviews) {
  safeWriteStorage(STORAGE_KEYS.reviews, reviews);
}

function getContactMessages() {
  return safeReadStorage(STORAGE_KEYS.contactMessages, []);
}

function saveContactMessages(messages) {
  safeWriteStorage(STORAGE_KEYS.contactMessages, messages);
}

function getWishlistItemCount() {
  return getWishlist().length;
}

function toggleWishlist(productId) {
  const items = getWishlist();
  const exists = items.includes(productId);
  const updated = exists ? items.filter((id) => id !== productId) : [...items, productId];
  saveWishlist(updated);
  return !exists;
}

function isItemWishlisted(productId) {
  return getWishlist().includes(productId);
}

function renderWishlistCards(containerId, onAction) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const wishlistIds = getWishlist();
  const items = foodItems.filter((item) => wishlistIds.includes(item.id));

  if (!items.length) {
    container.innerHTML = '<div class="empty-state">Your wishlist is empty. Save a few favorites to revisit them later.</div>';
    return;
  }

  container.innerHTML = items.map((item) => `
    <div class="list-item">
      <div class="card-topline">
        <strong>${item.name}</strong>
        <span class="rating-badge">★ ${item.rating}</span>
      </div>
      <p>${item.description}</p>
      <div class="price-row">
        <strong>${formatCurrency(item.price)}</strong>
        <div class="inline-actions">
          <a class="small-btn secondary-btn" href="product.html?id=${item.id}">View</a>
          <button class="small-btn primary-btn" type="button" data-wishlist-action="toggle" data-id="${item.id}">${onAction || 'Remove'}</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addReviewToStorage(review) {
  const reviews = getReviews();
  reviews.unshift(review);
  saveReviews(reviews);
}
