document.addEventListener('DOMContentLoaded', () => {
  const formData = { email: '', message: '' };
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const storageKey = 'feedback-form-state';

  const saveFormData = () => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  };

  const loadFormData = () => {
    try {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        formData.email = parsedData.email || '';
        formData.message = parsedData.message || '';
        emailInput.value = formData.email;
        messageInput.value = formData.message;
      }
    } catch (error) {
      console.error('Error loading form data from local storage:', error);
    }
  };

  loadFormData();

  form.addEventListener('input', event => {
    if (event.target.name === 'email') {
      formData.email = event.target.value.trim();
    } else if (event.target.name === 'message') {
      formData.message = event.target.value.trim();
    }
    saveFormData();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!formData.email || !formData.message) {
      alert('Fill please all fields');
      return;
    }

    console.log('Form data:', formData);
    localStorage.removeItem(storageKey);
    formData.email = '';
    formData.message = '';
    emailInput.value = '';
    messageInput.value = '';
  });
});
