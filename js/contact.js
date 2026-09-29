document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const subject = formData.get('subject')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all contact details.', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const messages = getContactMessages();
    messages.unshift({
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    });

    saveContactMessages(messages);
    showToast('Message saved for demo purposes', 'success');
    form.reset();
    const status = document.getElementById('contact-status');
    if (status) {
      status.textContent = 'Thanks! Your demo message has been saved locally in this browser.';
    }
  });
});
