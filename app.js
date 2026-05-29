document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('arcade-contact');

  // Кастомный обработчик ошибок
  const handleValidation = (input) => {
    const errorSpan = input.parentNode.querySelector('.error-msg');
    if (!errorSpan) return;

    if (input.validity.valid) {
      input.classList.remove('invalid');
      errorSpan.textContent = '';
    } else {
      input.classList.add('invalid');
      if (input.validity.valueMissing) {
        errorSpan.textContent = '[ОШИБКА: ПОЛЕ ПУСТОЕ]';
      } else if (input.validity.typeMismatch && input.type === 'email') {
        errorSpan.textContent = '[ОШИБКА: КАНАЛ СВЯЗИ НЕКОРРЕКТЕН]';
      }
    }
  };

  // Слушатель отправки формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('.arcade-input');
    let isFormValid = true;

    inputs.forEach(input => {
      handleValidation(input);
      if (!input.validity.valid) isFormValid = false;

      // Живой трекинг ошибок после попытки сабмита
      if (!input.dataset.tracked) {
        input.addEventListener('input', () => handleValidation(input));
        input.dataset.tracked = 'true';
      }
    });

    if (isFormValid) {
      const submitBtn = form.querySelector('.arcade-btn-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'ОТПРАВКА СИГНАЛА...';

      // Эмуляция отправки на бэк
      setTimeout(() => {
        alert('Сигнал успешно транслирован. Миссия создана.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'ОТПРАВИТЬ СИГНАЛ';
        form.reset();
      }, 1200);
    }
  });
});

