// Скрипты сайта «Гардероб».
// Минимальная логика: модальное окно, валидация форм, кнопка «Наверх».

// Модальное окно быстрого заказа (страница товара).
const quickDialog = document.getElementById('quick-order-dialog');
const quickButton = document.querySelector('.product__quick-button');
const closeQuickDialogButton = document.getElementById('close-quick-dialog');
const quickForm = document.getElementById('quick-order-form');
const selectedProductInput = document.getElementById('selected-product');

if (quickButton && quickDialog) {
  // Открываем модальное окно и подставляем название товара.
  quickButton.addEventListener('click', () => {
    selectedProductInput.value = quickButton.dataset.product;
    quickDialog.showModal();
  });
}

if (closeQuickDialogButton && quickDialog) {
  closeQuickDialogButton.addEventListener('click', () => {
    quickDialog.close();
  });
}

// Проверка формы: подсветка незаполненных обязательных полей.
function markInvalid(form) {
  form.querySelectorAll('input, select, textarea').forEach((element) => {
    if (element.willValidate && !element.checkValidity()) {
      element.setAttribute('aria-invalid', 'true');
    } else {
      element.removeAttribute('aria-invalid');
    }
  });
}

// Быстрый заказ: показываем сообщение и закрываем окно.
if (quickForm) {
  quickForm.addEventListener('submit', (event) => {
    event.preventDefault();
    markInvalid(quickForm);

    if (quickForm.checkValidity()) {
      alert('Заявка отправлена! Менеджер свяжется с вами.');
      quickForm.reset();
      quickDialog.close();
    }
  });
}

// Форма заявки на странице order.html.
const orderForm = document.getElementById('order-form');
const orderSuccess = document.getElementById('success-message');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    markInvalid(orderForm);

    if (orderForm.checkValidity()) {
      orderForm.reset();
      orderSuccess.hidden = false;
    }
  });
}

// Форма обратной связи на странице contacts.html.
const feedbackForm = document.getElementById('feedback-form');
const feedbackSuccess = document.getElementById('feedback-success');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    markInvalid(feedbackForm);

    if (feedbackForm.checkValidity()) {
      feedbackForm.reset();
      feedbackSuccess.hidden = false;
    }
  });
}

// Кнопка «Наверх»: плавная прокрутка к началу страницы.
const toTopButton = document.querySelector('.to-top');

if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
