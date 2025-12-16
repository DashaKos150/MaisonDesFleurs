// account.js - управление аккаунтом пользователя

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const accountForm = document.getElementById('account-form');
    const resetBtn = document.getElementById('reset-btn');
    const successNotification = document.getElementById('success-notification');
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    // Поля формы
    const nameInput = document.getElementById('user-name');
    const phoneInput = document.getElementById('user-phone');
    const emailInput = document.getElementById('user-email');
    
    // Маска для телефона
    phoneInput.addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '');
        
        // Убираем первую 7 или 8 если пользователь начал с неё
        if (input.startsWith('7') || input.startsWith('8')) {
            input = input.substring(1);
        }
        
        // Ограничиваем длину (только 10 цифр)
        if (input.length > 10) {
            input = input.substring(0, 10);
        }
        
        e.target.value = input;
    });
    
    // Валидация имени - только буквы и пробелы
    function validateName(name) {
        const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
        return nameRegex.test(name) && name.trim().length > 0;
    }
    
    // Валидация телефона - проверяем что есть ровно 10 цифр
    function validatePhone(phone) {
        const phoneDigits = phone.replace(/\D/g, '');
        // Убираем возможную первую 7 или 8
        let digits = phoneDigits;
        if (digits.startsWith('7') || digits.startsWith('8')) {
            digits = digits.substring(1);
        }
        return digits.length === 10 && /^\d+$/.test(digits);
    }
    
    // Валидация email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Валидация формы
    function validateForm() {
        let isValid = true;
        
        // Проверка имени
        const nameValue = nameInput.value.trim();
        if (!nameValue) {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (!validateName(nameValue)) {
            showError(nameInput, 'Имя может содержать только буквы, пробелы и дефисы');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Проверка телефона
        const phoneValue = phoneInput.value;
        if (!phoneValue) {
            showError(phoneInput, 'Пожалуйста, введите номер телефона');
            isValid = false;
        } else if (!validatePhone(phoneValue)) {
            showError(phoneInput, 'Введите 10 цифр номера телефона');
            isValid = false;
        } else {
            clearError(phoneInput);
        }
        
        // Проверка email
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            showError(emailInput, 'Пожалуйста, введите email адрес');
            isValid = false;
        } else if (!validateEmail(emailValue)) {
            showError(emailInput, 'Введите корректный email адрес');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        return isValid;
    }
    
    // Показать ошибку
    function showError(input, message) {
        clearError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    }
    
    // Очистить ошибку
    function clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.style.borderColor = '';
    }
    
    // Форматировать телефон в красивый вид
    function formatPhoneForDisplay(phoneDigits) {
        if (phoneDigits.length === 10) {
            return '+7 (' + phoneDigits.substring(0, 3) + ') ' + 
                   phoneDigits.substring(3, 6) + '-' + 
                   phoneDigits.substring(6, 8) + '-' + 
                   phoneDigits.substring(8, 10);
        }
        return phoneDigits;
    }
    
    // Показать уведомление об успехе
    function showSuccessNotification() {
        successNotification.style.display = 'block';
        
        // Скрыть через 5 секунд
        setTimeout(() => {
            successNotification.style.display = 'none';
        }, 5000);
    }
    
    // Обновление счетчика корзины
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    // Обработчик отправки формы
    accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Показываем отформатированный телефон перед отправкой
            const phoneDigits = phoneInput.value.replace(/\D/g, '');
            let cleanDigits = phoneDigits;
            if (cleanDigits.startsWith('7') || cleanDigits.startsWith('8')) {
                cleanDigits = cleanDigits.substring(1);
            }
            
            if (cleanDigits.length === 10) {
                phoneInput.value = formatPhoneForDisplay(cleanDigits);
            }
            
            // Показываем уведомление
            showSuccessNotification();
            
            // Прокручиваем к уведомлению
            successNotification.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Сбрасываем форму через 3 секунды
            setTimeout(() => {
                accountForm.reset();
            }, 3000);
        }
    });
    
    // Обработчик кнопки сброса
    resetBtn.addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите очистить все поля?')) {
            accountForm.reset();
            
            // Очищаем ошибки
            [nameInput, phoneInput, emailInput].forEach(clearError);
        }
    });
    
    // Форматировать телефон при потере фокуса
    phoneInput.addEventListener('blur', function() {
        const phoneDigits = this.value.replace(/\D/g, '');
        let cleanDigits = phoneDigits;
        
        // Убираем первую 7 или 8
        if (cleanDigits.startsWith('7') || cleanDigits.startsWith('8')) {
            cleanDigits = cleanDigits.substring(1);
        }
        
        // Валидация при потере фокуса
        if (this.value && cleanDigits.length !== 10) {
            showError(this, 'Введите 10 цифр номера телефона');
        } else if (cleanDigits.length === 10) {
            clearError(this);
            // Форматируем для отображения
            this.value = formatPhoneForDisplay(cleanDigits);
        }
    });
    
    // Валидация при вводе
    nameInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && !validateName(value)) {
            showError(this, 'Имя может содержать только буквы, пробелы и дефисы');
        } else if (value) {
            clearError(this);
        }
    });
    
    emailInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && !validateEmail(value)) {
            showError(this, 'Введите корректный email адрес');
        } else if (value) {
            clearError(this);
        }
    });
    
    // Инициализация при загрузке
    function init() {
        // Обновляем счетчик корзины
        updateCartCount();
    }
    
    // Запускаем инициализацию
    init();
});