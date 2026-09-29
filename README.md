# FreshBite – Online Food Ordering System

FreshBite is a frontend-only online food ordering website built for a web development internship project. It simulates a polished food delivery platform where users can browse restaurants, view food details, add items to a cart, apply coupons, place orders, and manage a mock account experience.

## Features

- Responsive restaurant listings and menu browsing
- Search and filter by cuisine, category, and dietary preference
- Food detail page with quantity selector and related items
- Shopping cart with quantity updates, total calculations, coupon support, and checkout flow
- Simulated login and registration using localStorage
- Account page with profile editing, order history, and wishlist
- Demo contact form and review cards
- Responsive sticky navigation and mobile hamburger menu
- Toast notifications for cart updates and actions
- LocalStorage-based persistence for cart, wishlist, orders, and user info

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- localStorage for demo persistence

## Folder Structure

```text
FreshBite/
├── index.html
├── restaurants.html
├── menu.html
├── product.html
├── cart.html
├── checkout.html
├── account.html
├── login.html
├── register.html
├── about.html
├── contact.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── common.js
│   ├── cart.js
│   ├── auth.js
│   ├── checkout.js
│   ├── restaurants.js
│   ├── menu.js
│   ├── product.js
│   ├── account.js
│   ├── contact.js
│   └── index.js
├── assets/
│   └── images/
└── screenshots/
```

## How to Run Locally

### Option 1: Open directly in the browser

- Open `index.html` directly in a browser.
- The app works without a backend or package installation.

### Option 2: Use VS Code Live Server

1. Install the VS Code Live Server extension.
2. Open the project folder in VS Code.
3. Right-click on `index.html` and choose "Open with Live Server".

### Option 3: Use a simple local server

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

## Demo Login Credentials

This project uses simulated authentication only.

- Create your own account on the register page.
- Or use any valid email/password combination for the local demo flow.

Example:

- Email: user@freshbite.demo
- Password: freshbite123

You can also create a new account and the app will save it in browser localStorage.

## localStorage Usage

The app uses browser `localStorage` to simulate persistence for:

- cart items
- wishlist items
- current user session
- registered users
- orders
- contact form submissions
- coupon selection

This keeps the project easy to run on static hosting without a backend.

## Important Notes

- Authentication is simulated and not secure.
- Payments are simulated and no real banking information is requested.
- No real backend or database is used.
- This is a frontend demonstration project.

## Coupon Codes

The cart supports these demo coupons:

- `WELCOME10` = 10% discount on the order subtotal
- `FRESH50` = ₹50 discount on orders above ₹499

## Deployment on GitHub Pages

1. Push the project to a GitHub repository.
2. Open the repository in GitHub.
3. Go to Settings > Pages.
4. Set the source to the main branch and the root folder.
5. Save the settings.
6. GitHub Pages will provide a deployment URL.

## Taking Screenshots and Recording a Demo Video

### Screenshots

- Open the site in a browser.
- Capture images of the homepage, menu, cart, checkout, and account pages.
- Save them in a folder such as `screenshots/`.

### Demo video

- Use screen recording software such as OBS Studio or your OS recorder.
- Record a short walkthrough of the main user flows:
  - browsing restaurants
  - menu filtering and search
  - adding items to cart
  - applying a coupon
  - checkout
  - account login and order history

## Future Improvement Ideas

- Add a real backend and database
- Integrate real payment gateways
- Add admin dashboard for restaurant management
- Introduce order tracking with a backend API
- Add more animations and micro-interactions
- Convert the project to a framework such as React later

## Final Note

This project is designed as a polished frontend learning project and is intended for educational and internship use. It focuses on strong UI/UX design, responsive behavior, and realistic user flows without relying on a backend.
