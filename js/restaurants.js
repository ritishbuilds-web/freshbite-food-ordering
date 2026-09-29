document.addEventListener('DOMContentLoaded', () => {
  const restaurantList = document.getElementById('restaurant-list');
  const searchInput = document.getElementById('restaurant-search');
  const cuisineFilter = document.getElementById('cuisine-filter');
  const sortSelect = document.getElementById('restaurant-sort');

  if (!restaurantList) return;

  const cuisineOptions = ['All', ...new Set(restaurants.map((restaurant) => restaurant.cuisine))];
  cuisineOptions.forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    if (cuisineFilter) cuisineFilter.appendChild(option);
  });

  function getFilteredRestaurants() {
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const cuisine = cuisineFilter ? cuisineFilter.value : 'All';
    let results = [...restaurants];

    results = results.filter((restaurant) => {
      const matchQuery = !query || restaurant.name.toLowerCase().includes(query) || restaurant.cuisine.toLowerCase().includes(query);
      const matchCuisine = cuisine === 'All' || restaurant.cuisine === cuisine;
      return matchQuery && matchCuisine;
    });

    if (sortSelect) {
      results.sort((a, b) => {
        const value = sortSelect.value;
        if (value === 'rating') return b.rating - a.rating;
        if (value === 'time') {
          return Number(a.deliveryTime.split('-')[0]) - Number(b.deliveryTime.split('-')[0]);
        }
        return a.name.localeCompare(b.name);
      });
    }

    return results;
  }

  function renderRestaurants() {
    const results = getFilteredRestaurants();

    if (!results.length) {
      restaurantList.innerHTML = `
        <div class="empty-state">
          <h3>No restaurants found</h3>
          <p>Try another keyword or switch to a different cuisine.</p>
        </div>
      `;
      return;
    }

    restaurantList.innerHTML = results.map((restaurant) => `
      <article class="card">
        <div class="card-image">
          <img src="${restaurant.image}" alt="${restaurant.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80';">
        </div>
        <div class="card-body">
          <div class="card-topline">
            <h3>${restaurant.name}</h3>
            <span class="rating-badge">★ ${restaurant.rating}</span>
          </div>
          <p>${restaurant.description}</p>
          <div class="meta-row">
            <span>${restaurant.cuisine}</span>
            <span>${restaurant.deliveryTime}</span>
          </div>
          <div class="price-row">
            <strong>Min. ${formatCurrency(restaurant.minOrder)}</strong>
            <span>Popular</span>
          </div>
          <div class="restaurant-actions">
            <a href="menu.html?restaurant=${restaurant.id}" class="small-btn primary-btn">View Menu</a>
            <button type="button" class="small-btn secondary-btn" data-restaurant-card="${restaurant.id}">Explore</button>
          </div>
        </div>
      </article>
    `).join('');

    restaurantList.querySelectorAll('[data-restaurant-card]').forEach((button) => {
      button.addEventListener('click', () => {
        window.location.href = `menu.html?restaurant=${button.dataset.restaurantCard}`;
      });
    });
  }

  searchInput?.addEventListener('input', renderRestaurants);
  cuisineFilter?.addEventListener('change', renderRestaurants);
  sortSelect?.addEventListener('change', renderRestaurants);

  renderRestaurants();
});
