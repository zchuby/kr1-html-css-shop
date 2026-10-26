// Скрипты сайта фотостудии «Ракурс».
// Минимальная логика: модальное окно, валидация форм, кнопка «Наверх».

// Модальное окно быстрого заказа (страница товара).
const quickDialog = document.getElementById('quick-order-dialog');
const quickButton = document.querySelector('.product__quick-button');
const closeQuickDialogButton = document.getElementById('close-quick-dialog');
const quickForm = document.getElementById('quick-order-form');
const selectedProductInput = document.getElementById('selected-product');
const quickOrderProduct = document.getElementById('quick-order-product');

if (quickButton && quickDialog) {
  // Открываем модальное окно, подставляем название товара и фокус на первое поле.
  quickButton.addEventListener('click', () => {
    selectedProductInput.value = quickButton.dataset.product;

    if (quickOrderProduct) {
      quickOrderProduct.textContent = 'Вы заказываете: ' + quickButton.dataset.product;
    }

    quickDialog.showModal();
    const firstField = quickDialog.querySelector('input:not([type="hidden"])');

    if (firstField) {
      firstField.focus();
    }
  });
}

if (closeQuickDialogButton && quickDialog) {
  closeQuickDialogButton.addEventListener('click', () => {
    quickDialog.close();
  });
}

// Закрытие модального окна по клику на затемнение вокруг (backdrop).
if (quickDialog) {
  quickDialog.addEventListener('click', (event) => {
    if (event.target === quickDialog) {
      quickDialog.close();
    }
  });
}

// Проверка формы: подсветка незаполненных обязательных полей и тексты ошибок.
function markInvalid(form) {
  form.querySelectorAll('input, select, textarea').forEach((element) => {
    if (element.willValidate && !element.checkValidity()) {
      element.setAttribute('aria-invalid', 'true');
    } else {
      element.removeAttribute('aria-invalid');
    }

    // Показываем или скрываем текст ошибки, связанный с полем через aria-describedby.
    const describedBy = element.getAttribute('aria-describedby');

    if (describedBy) {
      describedBy.split(' ').forEach((id) => {
        const hint = document.getElementById(id);

        if (hint && hint.classList.contains('order-form__error')) {
          hint.hidden = element.getAttribute('aria-invalid') !== 'true';
        }
      });
    }
  });
}

// Скрыть все сообщения об ошибках формы (после успешной отправки).
function hideErrors(form) {
  form.querySelectorAll('.order-form__error').forEach((hint) => {
    hint.hidden = true;
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
      hideErrors(quickForm);
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
      hideErrors(orderForm);
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
      hideErrors(feedbackForm);
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
