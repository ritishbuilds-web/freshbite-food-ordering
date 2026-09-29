document.addEventListener('DOMContentLoaded', () => {
  const menuList = document.getElementById('menu-list');
  const categoryBar = document.getElementById('category-bar');
  const searchInput = document.getElementById('food-search');
  const categoryFilter = document.getElementById('food-category');
  const dietaryFilter = document.getElementById('dietary-filter');
  const sortSelect = document.getElementById('menu-sort');
  const restaurantTitle = document.getElementById('selected-restaurant');
  const chosenRestaurantId = getQueryParam('restaurant');

  function getActiveProducts() {
    let results = [...foodItems];

    if (chosenRestaurantId) {
      const restaurant = getRestaurantById(chosenRestaurantId);
      if (restaurant) {
        restaurantTitle.textContent = `Showing menu from ${restaurant.name}`;
      }
      results = results.filter((item) => item.restaurantId === chosenRestaurantId);
    }

    const keyword = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const categoryValue = categoryFilter ? categoryFilter.value : 'All';
    const dietaryValue = dietaryFilter ? dietaryFilter.value : 'All';

    results = results.filter((item) => {
      const matchText = !keyword || item.name.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword);
      const matchCategory = categoryValue === 'All' || item.category === categoryValue;
      const matchDietary = dietaryValue === 'All' || item.dietary === dietaryValue;
      return matchText && matchCategory && matchDietary;
    });

    if (sortSelect) {
      results.sort((a, b) => {
        if (sortSelect.value === 'price-low') return a.price - b.price;
        if (sortSelect.value === 'price-high') return b.price - a.price;
        if (sortSelect.value === 'rating') return b.rating - a.rating;
        return a.name.localeCompare(b.name);
      });
    }

    return results;
  }

  function renderCategoryChips() {
    if (!categoryBar) return;

    const chips = ['All', ...categories.filter((item) => item !== 'All')];
    categoryBar.innerHTML = chips.map((chip) => `
      <button class="category-chip ${chip === (categoryFilter ? categoryFilter.value : 'All') ? 'active' : ''}" type="button" data-chip="${chip}">${chip}</button>
    `).join('');

    categoryBar.querySelectorAll('[data-chip]').forEach((chipButton) => {
      chipButton.addEventListener('click', () => {
        const selected = chipButton.dataset.chip;
        if (categoryFilter) categoryFilter.value = selected;
        renderMenu();
      });
    });
  }

  function renderMenu() {
    renderCategoryChips();

    const results = getActiveProducts();
    if (!menuList) return;

    if (!results.length) {
      menuList.innerHTML = `
        <div class="empty-state">
          <h3>No dishes match your search</h3>
          <p>Try a different category, dietary option, or keyword.</p>
        </div>
      `;
      return;
    }

    menuList.innerHTML = results.map((item) => `
      <article class="card">
        <div class="card-image">
          <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80';">
        </div>
        <div class="card-body">
          <div class="card-topline">
            <h3>${item.name}</h3>
            <span class="rating-badge">★ ${item.rating}</span>
          </div>
          <p>${item.description}</p>
          <div class="meta-row">
            <span>${item.dietary}</span>
            <span>${item.category}</span>
          </div>
          <div class="price-row">
            <strong>${formatCurrency(item.price)}</strong>
            <span>${getRestaurantById(item.restaurantId)?.name || 'FreshBite'}</span>
          </div>
          <div class="food-card-actions">
            <button type="button" class="small-btn primary-btn add-cart-btn" data-product-id="${item.id}">Add to cart</button>
            <a href="product.html?id=${item.id}" class="small-btn secondary-btn">View details</a>
          </div>
        </div>
      </article>
    `).join('');

    menuList.querySelectorAll('.add-cart-btn').forEach((button) => {
      button.addEventListener('click', () => addToCart(button.dataset.productId));
    });
  }

  searchInput?.addEventListener('input', renderMenu);
  categoryFilter?.addEventListener('change', renderMenu);
  dietaryFilter?.addEventListener('change', renderMenu);
  sortSelect?.addEventListener('change', renderMenu);

  renderMenu();
});
