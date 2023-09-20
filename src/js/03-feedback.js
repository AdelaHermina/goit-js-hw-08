import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  const formData = JSON.parse(
    localStorage.getItem('feedback-form-state') || '{}'
  );

  if (formData.email) {
    emailInput.value = formData.email;
  }

  if (formData.message) {
    messageInput.value = formData.message;
  }

  const saveToLocalStorage = throttle(() => {
    const data = {
      email: emailInput.value,
      message: messageInput.value,
    };

    localStorage.setItem('feedback-form-state', JSON.stringify(data));
  }, 500);

  form.addEventListener('input', saveToLocalStorage);

  form.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
      email: emailInput.value,
      message: messageInput.value,
    };

    console.log('Form data submitted:', data);

    localStorage.removeItem('feedback-form-state');
  });
});