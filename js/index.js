document.addEventListener('DOMContentLoaded', () => {
  const restaurantContainer = document.getElementById('featured-restaurants');
  const dishesContainer = document.getElementById('featured-dishes');
  const reviewsContainer = document.getElementById('homepage-reviews');

  if (restaurantContainer) {
    restaurantContainer.innerHTML = restaurants.slice(0, 3).map((restaurant) => `
      <article class="card">
        <div class="card-image">
          <img src="${restaurant.image}" alt="${restaurant.name}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80';">
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
          <div class="restaurant-actions">
            <a href="menu.html?restaurant=${restaurant.id}" class="small-btn primary-btn">View menu</a>
          </div>
        </div>
      </article>
    `).join('');
  }

  if (dishesContainer) {
    const featured = foodItems.filter((item) => item.featured).slice(0, 6);
    dishesContainer.innerHTML = featured.map((item) => `
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
            <button type="button" class="small-btn primary-btn add-cart-btn" data-product-id="${item.id}">Add</button>
          </div>
        </div>
      </article>
    `).join('');

    dishesContainer.querySelectorAll('.add-cart-btn').forEach((button) => {
      button.addEventListener('click', () => addToCart(button.dataset.productId));
    });
  }

  if (reviewsContainer) {
    const reviews = getReviews().slice(0, 3);
    reviewsContainer.innerHTML = reviews.map((review) => `
      <div class="review-card">
        <div class="rating-badge">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
        <p>“${review.comment}”</p>
        <div class="review-author">
          <div class="avatar">${review.name.charAt(0)}</div>
          <div>
            <strong>${review.name}</strong>
            <div style="font-size: 0.8rem; color: rgba(45, 27, 18, 0.6);">Demo customer</div>
          </div>
        </div>
      </div>
    `).join('');
  }
});
