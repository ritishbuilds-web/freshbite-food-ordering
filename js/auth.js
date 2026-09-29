document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const fullName = formData.get('full-name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const phone = formData.get('phone')?.toString().trim();
      const password = formData.get('password')?.toString();
      const confirmPassword = formData.get('confirm-password')?.toString();

      if (!fullName || !email || !phone || !password || !confirmPassword) {
        showToast('Please fill in all fields.', 'error');
        return;
      }

      if (password.length < 6) {
        showToast('Password must be at least 6 characters long.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showToast('Passwords do not match.', 'error');
        return;
      }

      const users = getSavedUsers();
      const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

      if (exists) {
        showToast('An account already exists for this email.', 'error');
        return;
      }

      users.push({
        id: Date.now().toString(),
        name: fullName,
        email: email.toLowerCase(),
        phone,
        password,
        address: '',
        city: '',
        postalCode: '',
        createdAt: new Date().toISOString()
      });

      saveUsers(users);
      showToast('Registration successful. Please log in.', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 600);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(loginForm);
      const email = formData.get('email')?.toString().trim().toLowerCase();
      const password = formData.get('password')?.toString();

      if (!email || !password) {
        showToast('Email and password are required.', 'error');
        return;
      }

      const users = getSavedUsers();
      const user = users.find((entry) => entry.email === email && entry.password === password);

      if (!user) {
        showToast('Invalid login credentials. Try the demo account from the README.', 'error');
        return;
      }

      saveCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        postalCode: user.postalCode
      });

      showToast('Login successful', 'success');
      setTimeout(() => {
        window.location.href = 'account.html';
      }, 600);
    });
  }
});
