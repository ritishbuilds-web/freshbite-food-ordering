const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}


// ====================================
// 2. CART DATA
// ====================================

let cart = [];


// ====================================
// 3. SELECT CART ELEMENTS
// ====================================

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElements = document.querySelectorAll(".cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const clearCartButton = document.getElementById("clear-cart");


// ====================================
// 4. ADD ITEMS TO CART
// ====================================

addToCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }

        renderCart();

    });

});


// ====================================
// 5. DISPLAY CART ITEMS
// ====================================

function renderCart() {

    if (!cartItemsContainer || !cartTotalElement) {
        return;
    }

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotalElement.textContent = "0.00";

        updateCartCount();

        return;
    }

    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        const itemInfo = document.createElement("div");
        itemInfo.className = "cart-item-info";

        const itemName = document.createElement("h4");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("p");
        itemPrice.textContent =
            `₹${item.price.toFixed(2)} × ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`;

        itemInfo.append(itemName, itemPrice);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "−";
        decreaseButton.setAttribute("aria-label", `Decrease ${item.name} quantity`);

        decreaseButton.addEventListener("click", () => {
            changeQuantity(item.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.setAttribute("aria-label", `Increase ${item.name} quantity`);

        increaseButton.addEventListener("click", () => {
            changeQuantity(item.id, 1);
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "×";
        removeButton.className = "remove-item";
        removeButton.setAttribute("aria-label", `Remove ${item.name}`);

        removeButton.addEventListener("click", () => {
            removeItem(item.id);
        });

        controls.append(
            decreaseButton,
            quantity,
            increaseButton,
            removeButton
        );

        cartItem.append(itemInfo, controls);

        cartItemsContainer.appendChild(cartItem);

    });

    updateCartTotal();
    updateCartCount();

}


// ====================================
// 6. CHANGE ITEM QUANTITY
// ====================================

function changeQuantity(id, change) {

    const item = cart.find(item => item.id === id);

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }

    renderCart();

}


// ====================================
// 7. REMOVE ITEM
// ====================================

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    renderCart();

}


// ====================================
// 8. UPDATE TOTAL PRICE
// ====================================

function updateCartTotal() {

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    cartTotalElement.textContent = total.toFixed(2);

}


// ====================================
// 9. UPDATE CART COUNTER
// ====================================

function updateCartCount() {

    const totalQuantity = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    cartCountElements.forEach(element => {
        element.textContent = totalQuantity;
    });

}


// ====================================
// 10. CLEAR CART
// ====================================

if (clearCartButton) {

    clearCartButton.addEventListener("click", () => {

        cart = [];

        renderCart();

    });

}


// ====================================
// 11. CHECKOUT FORM
// ====================================

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", event => {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty. Please add food items first.");
            return;
        }

        const customerName =
            document.getElementById("customer-name").value.trim();

        const customerAddress =
            document.getElementById("customer-address").value.trim();

        const paymentMethod =
            document.getElementById("payment-method").value;

        if (!customerName || !customerAddress) {
            alert("Please enter your name and delivery address.");
            return;
        }

        const total = cart.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        alert(
            `Order placed successfully!\n\n` +
            `Customer: ${customerName}\n` +
            `Address: ${customerAddress}\n` +
            `Payment: ${paymentMethod}\n` +
            `Total: ₹${total.toFixed(2)}`
        );

        cart = [];

        renderCart();

        checkoutForm.reset();

    });

}


// ====================================
// 12. LOGIN FORM VALIDATION
// ====================================

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        alert("Demo login successful!");

        loginForm.reset();

    });

}


// ====================================
// 13. CONTACT FORM VALIDATION
// ====================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all contact form fields.");
            return;
        }

        alert("Thank you! Your message has been received in this demo.");

        contactForm.reset();

    });

}


// ====================================
// 14. SMOOTH SCROLLING
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            history.replaceState(null, "", targetId);

        }

    });

});


// ====================================
// 15. INITIALIZE CART
// ====================================

renderCart();