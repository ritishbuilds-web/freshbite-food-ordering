document.addEventListener('DOMContentLoaded', () => {
  const productId = getQueryParam('id');
  const container = document.getElementById('product-detail');
  const relatedContainer = document.getElementById('related-products');

  if (!container) return;

  if (!productId) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Product not found</h3>
        <p>The item you requested is missing or invalid. Explore the menu to continue ordering.</p>
        <a class="primary-btn" href="menu.html">Browse Menu</a>
      </div>
    `;
    return;
  }

  const product = getProductById(productId);

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Oops, this dish is unavailable</h3>
        <p>We couldn’t find the item you are looking for. Please choose another favorite from our menu.</p>
        <a class="primary-btn" href="menu.html">Browse Menu</a>
      </div>
    `;
    return;
  }

  let quantity = 1;

  function buildRelatedItems() {
    const related = foodItems.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

    if (!relatedContainer) return;
    relatedContainer.innerHTML = related.length ? related.map((item) => `
      <article class="card">
        <div class="card-image">
          <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80';">
        </div>
        <div class="card-body">
          <h3>${item.name}</h3>
          <div class="meta-row">
            <span class="rating-badge">★ ${item.rating}</span>
            <span>${item.dietary}</span>
          </div>
          <div class="price-row">
            <strong>${formatCurrency(item.price)}</strong>
            <a href="product.html?id=${item.id}" class="small-btn secondary-btn">View</a>
          </div>
        </div>
      </article>
    `).join('') : '<div class="empty-state">No related items currently available.</div>';
  }

  function renderProduct() {
    container.innerHTML = `
      <div class="product-layout">
        <div class="product-gallery">
          <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80';">
        </div>
        <div class="product-info">
          <div class="product-badges">
            <span class="badge">${product.category}</span>
            <span class="badge">${product.dietary}</span>
            <span class="badge">${getRestaurantById(product.restaurantId)?.name || 'FreshBite'}</span>
          </div>
          <div class="product-head">
            <h3>${product.name}</h3>
            <span class="rating-badge">★ ${product.rating}</span>
          </div>
          <p>${product.description}</p>
          <div class="price-row" style="justify-content:flex-start; gap:18px; margin-top:18px;">
            <strong style="font-size:2rem;">${formatCurrency(product.price)}</strong>
            <span>Estimated delivery: ${getRestaurantById(product.restaurantId)?.deliveryTime || '25-35 min'}</span>
          </div>
          <div class="product-controls">
            <div class="qty-box">
              <button type="button" aria-label="Decrease quantity" data-qty-change="-1">−</button>
              <span id="product-qty">${quantity}</span>
              <button type="button" aria-label="Increase quantity" data-qty-change="1">+</button>
            </div>
            <button class="primary-btn" type="button" id="add-product-btn">Add to Cart</button>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span>Category</span>
              <strong>${product.category}</strong>
            </div>
            <div class="info-item">
              <span>Dietary</span>
              <strong>${product.dietary}</strong>
            </div>
            <div class="info-item">
              <span>Restaurant</span>
              <strong>${getRestaurantById(product.restaurantId)?.name || 'FreshBite'}</strong>
            </div>
            <div class="info-item">
              <span>Freshness</span>
              <strong>Always served hot</strong>
            </div>
          </div>
          <div class="inline-actions">
            <button class="secondary-btn" type="button" id="wishlist-product-btn">${isItemWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
            <a class="secondary-btn" href="menu.html?restaurant=${product.restaurantId}">See restaurant menu</a>
          </div>
        </div>
      </div>
    `;

    document.querySelector('[data-qty-change="-1"]').addEventListener('click', () => {
      quantity = Math.max(1, quantity - 1);
      document.getElementById('product-qty').textContent = quantity;
    });

    document.querySelector('[data-qty-change="1"]').addEventListener('click', () => {
      quantity += 1;
      document.getElementById('product-qty').textContent = quantity;
    });

    document.getElementById('add-product-btn').addEventListener('click', () => {
      addToCart(product.id, quantity);
    });

    document.getElementById('wishlist-product-btn').addEventListener('click', () => {
      const isAdded = toggleWishlist(product.id);
      const text = isAdded ? 'Added to wishlist' : 'Removed from wishlist';
      showToast(text, 'info');
      renderProduct();
    });
  }

  renderProduct();
  buildRelatedItems();
});
