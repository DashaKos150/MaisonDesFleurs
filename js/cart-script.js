 
// Константы
const DELIVERY_PRICE = 1500;
const FREE_DELIVERY_THRESHOLD = 10000;

// DOM элементы для корзины
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartSummary = document.getElementById('cart-summary');
const totalItemsElement = document.getElementById('total-items');
const subtotalPriceElement = document.getElementById('subtotal-price');
const deliveryPriceElement = document.getElementById('delivery-price');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCountElements = document.querySelectorAll('.cart-count');

// DOM элементы для модального окна
const checkoutModal = document.getElementById('checkout-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelOrderBtn = document.getElementById('cancel-order');
const checkoutForm = document.getElementById('checkout-form');
const orderNameInput = document.getElementById('order-name');
const orderPhoneInput = document.getElementById('order-phone');
const recipientNameInput = document.getElementById('recipient-name');
const deliveryAddressInput = document.getElementById('delivery-address');
const orderCommentInput = document.getElementById('order-comment');
const orderTotalItemsElement = document.getElementById('order-total-items');
const orderSubtotalElement = document.getElementById('order-subtotal');
const orderDeliveryElement = document.getElementById('order-delivery');
const orderTotalElement = document.getElementById('order-total');

// Класс для управления корзиной
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }
    
    // Загрузка корзины из localStorage
    loadCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }
    
    // Сохранение корзины в localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    
    // Инициализация корзины
    init() {
        this.renderCart();
        this.updateCartSummary();
        this.updateHeaderCartCount();
        this.initModalEvents();
        this.initMobileMenu();
    }
    
    // Инициализация мобильного меню
    initMobileMenu() {
        const burgerMenu = document.querySelector('.burger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.overlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (!burgerMenu || !mobileNav || !overlay) return;

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        overlay.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Инициализация событий модального окна
    initModalEvents() {
        // Открытие модального окна при нажатии на кнопку оформления заказа
        checkoutBtn.addEventListener('click', () => {
            if (this.cart.length === 0) {
                this.showNotification('Ваша корзина пуста!', 'error');
                return;
            }
            this.openCheckoutModal();
        });
        
        // Закрытие модального окна
        closeModalBtn.addEventListener('click', () => this.closeCheckoutModal());
        cancelOrderBtn.addEventListener('click', () => this.closeCheckoutModal());
        
        // Закрытие модального окна при клике на фон
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                this.closeCheckoutModal();
            }
        });
        
        // Закрытие модального окна при нажатии Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && checkoutModal.classList.contains('active')) {
                this.closeCheckoutModal();
            }
        });
        
        // Маска для телефона в форме заказа
        orderPhoneInput.addEventListener('input', this.formatPhoneInput.bind(this));
        
        // Валидация формы заказа
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateCheckoutForm()) {
                this.processOrder();
            }
        });
        
        // Валидация при потере фокуса
        [orderNameInput, recipientNameInput].forEach(input => {
            input.addEventListener('blur', () => this.validateNameInput(input));
        });
        
        orderPhoneInput.addEventListener('blur', () => this.validatePhoneInput(orderPhoneInput));
        deliveryAddressInput.addEventListener('blur', () => this.validateAddressInput());
    }
    
    // Открытие модального окна оформления заказа
    openCheckoutModal() {
        // Заполняем данные о заказе
        this.updateOrderSummary();
        
        // Показываем модальное окно
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Автофокус на первом поле
        setTimeout(() => {
            orderNameInput.focus();
        }, 300);
    }
    
    // Закрытие модального окна
    closeCheckoutModal() {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
        checkoutForm.reset();
        this.clearAllErrors();
    }
    
    // Обновление сводки заказа в модальном окне
    updateOrderSummary() {
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_PRICE;
        const total = subtotal + delivery;
        
        orderTotalItemsElement.textContent = totalItems;
        orderSubtotalElement.textContent = this.formatPrice(subtotal);
        orderDeliveryElement.textContent = this.formatPrice(delivery);
        orderTotalElement.textContent = this.formatPrice(total);
        
        if (delivery === 0) {
            orderDeliveryElement.innerHTML = '<span style="color: var(--green-medium);">Бесплатно</span>';
        }
    }
    
    // Маска для телефона
    formatPhoneInput(e) {
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
    }
    
    // Валидация имени
    validateName(name) {
        const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
        return nameRegex.test(name) && name.trim().length > 0;
    }
    
    // Валидация телефона
    validatePhone(phone) {
        const phoneDigits = phone.replace(/\D/g, '');
        let digits = phoneDigits;
        if (digits.startsWith('7') || digits.startsWith('8')) {
            digits = digits.substring(1);
        }
        return digits.length === 10 && /^\d+$/.test(digits);
    }
    
    // Валидация поля имени
    validateNameInput(input) {
        const value = input.value.trim();
        if (value && !this.validateName(value)) {
            this.showError(input, 'Имя может содержать только буквы, пробелы и дефисы');
            return false;
        } else if (value) {
            this.clearError(input);
            return true;
        }
        return false;
    }
    
    // Валидация поля телефона
    validatePhoneInput(input) {
        const value = input.value;
        if (value && !this.validatePhone(value)) {
            this.showError(input, 'Введите 10 цифр номера телефона');
            return false;
        } else if (value) {
            this.clearError(input);
            return true;
        }
        return false;
    }
    
    // Валидация поля адреса
    validateAddressInput() {
        const value = deliveryAddressInput.value.trim();
        if (value && value.length < 5) {
            this.showError(deliveryAddressInput, 'Адрес должен содержать минимум 5 символов');
            return false;
        } else if (value) {
            this.clearError(deliveryAddressInput);
            return true;
        }
        return false;
    }
    
    // Валидация всей формы оформления заказа
    validateCheckoutForm() {
        let isValid = true;
        
        // Проверка имени заказчика
        const orderNameValue = orderNameInput.value.trim();
        if (!orderNameValue) {
            this.showError(orderNameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (!this.validateName(orderNameValue)) {
            this.showError(orderNameInput, 'Имя может содержать только буквы, пробелы и дефисы');
            isValid = false;
        } else {
            this.clearError(orderNameInput);
        }
        
        // Проверка телефона
        const phoneValue = orderPhoneInput.value;
        if (!phoneValue) {
            this.showError(orderPhoneInput, 'Пожалуйста, введите номер телефона');
            isValid = false;
        } else if (!this.validatePhone(phoneValue)) {
            this.showError(orderPhoneInput, 'Введите 10 цифр номера телефона');
            isValid = false;
        } else {
            this.clearError(orderPhoneInput);
        }
        
        // Проверка имени получателя
        const recipientValue = recipientNameInput.value.trim();
        if (!recipientValue) {
            this.showError(recipientNameInput, 'Пожалуйста, введите имя получателя');
            isValid = false;
        } else if (!this.validateName(recipientValue)) {
            this.showError(recipientNameInput, 'Имя может содержать только буквы, пробелы и дефисы');
            isValid = false;
        } else {
            this.clearError(recipientNameInput);
        }
        
        // Проверка адреса доставки
        const addressValue = deliveryAddressInput.value.trim();
        if (!addressValue) {
            this.showError(deliveryAddressInput, 'Пожалуйста, введите адрес доставки');
            isValid = false;
        } else if (addressValue.length < 5) {
            this.showError(deliveryAddressInput, 'Адрес должен содержать минимум 5 символов');
            isValid = false;
        } else {
            this.clearError(deliveryAddressInput);
        }
        
        return isValid;
    }
    
    // Показать ошибку
    showError(input, message) {
        this.clearError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        input.classList.add('error');
        input.parentNode.appendChild(errorDiv);
    }
    
    // Очистить ошибку
    clearError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }
    
    // Очистить все ошибки
    clearAllErrors() {
        const errorMessages = checkoutForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorInputs = checkoutForm.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }
    
    // Показать уведомление
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: ${type === 'error' ? '#e74c3c' : '#27ae60'};
            color: white;
            border-radius: 4px;
            z-index: 1001;
            box-shadow: 0 3px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Обработка заказа
    processOrder() {
        // Собираем данные заказа
        const orderData = {
            orderId: 'ORD' + Date.now(),
            customerName: orderNameInput.value.trim(),
            customerPhone: orderPhoneInput.value,
            recipientName: recipientNameInput.value.trim(),
            deliveryAddress: deliveryAddressInput.value.trim(),
            comment: orderCommentInput.value.trim(),
            items: [...this.cart],
            totalItems: this.cart.reduce((total, item) => total + item.quantity, 0),
            subtotal: this.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
            delivery: this.cart.reduce((total, item) => total + (item.price * item.quantity), 0) >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_PRICE,
            orderDate: new Date().toLocaleString('ru-RU'),
            status: 'pending'
        };
        
        // Сохраняем заказ в localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Форматируем телефон для отображения
        const phoneDigits = orderPhoneInput.value.replace(/\D/g, '');
        let cleanDigits = phoneDigits;
        if (cleanDigits.startsWith('7') || cleanDigits.startsWith('8')) {
            cleanDigits = cleanDigits.substring(1);
        }
        
        const formattedPhone = cleanDigits.length === 10 ? 
            '+7 (' + cleanDigits.substring(0, 3) + ') ' + cleanDigits.substring(3, 6) + '-' + cleanDigits.substring(6, 8) + '-' + cleanDigits.substring(8, 10) : 
            orderPhoneInput.value;
        
        // Показываем сообщение об успешном оформлении заказа
        const deliveryPrice = orderData.delivery === 0 ? 'Бесплатно' : this.formatPrice(orderData.delivery) + ' ₽';
        const orderMessage = `
            Заказ №${orderData.orderId} оформлен!
            
            Детали заказа:
            • Товаров: ${orderData.totalItems} шт.
            • Сумма: ${this.formatPrice(orderData.subtotal)} ₽
            • Доставка: ${deliveryPrice}
            • Итого: ${this.formatPrice(orderData.subtotal + orderData.delivery)} ₽
            
            Данные доставки:
            • Получатель: ${orderData.recipientName}
            • Адрес: ${orderData.deliveryAddress}
            • Телефон: ${formattedPhone}
            
            Спасибо за покупку! Мы свяжемся с вами для подтверждения заказа.
        `;
        
        // Закрываем модальное окно
        this.closeCheckoutModal();
        
        // Показываем уведомление
        setTimeout(() => {
            alert(orderMessage.replace(/\n\s+/g, '\n').trim());
        }, 500);
        
        // Очищаем корзину
        this.cart = [];
        this.updateCart();
        
        // Показываем уведомление
        this.showNotification('Заказ успешно оформлен!');
    }
    
    // Отображение товаров в корзине
    renderCart() {
        cartItemsContainer.innerHTML = '';
        
        if (this.cart.length === 0) {
            emptyCartMessage.classList.add('show');
            cartSummary.classList.remove('show');
            cartItemsContainer.style.display = 'none';
            return;
        }
        
        emptyCartMessage.classList.remove('show');
        cartSummary.classList.add('show');
        cartItemsContainer.style.display = 'flex';
        
        this.cart.forEach(item => {
            const cartItemElement = this.createCartItemElement(item);
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
    
    // Создание элемента товара в корзине (с мобильной адаптацией)
    createCartItemElement(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.dataset.id = item.id;
        
        const itemTotal = item.price * item.quantity;
        
        // Определяем текст размера - используем прямо то, что сохранено в item.size
        const sizeText = item.size || 'Стандартный'; // Берем сохраненное значение
        
        itemElement.innerHTML = `
            <div class="item-image" style="background-image: url('${item.image || '../img/default-bouquet.jpg'}')"></div>
            <button class="remove-item mobile-remove" data-id="${item.id}" aria-label="Удалить товар">×</button>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <div class="item-art">${item.art || this.generateArtNumber(item.id)}</div>
                <div class="item-size">Размер: ${sizeText}</div>
                
                <!-- Десктопная версия -->
                <div class="item-quantity desktop-quantity">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}" aria-label="Уменьшить количество">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}" aria-label="Увеличить количество">+</button>
                    </div>
                </div>
                
                <!-- Мобильная версия -->
                <div class="item-quantity-price mobile-quantity-price">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}" aria-label="Уменьшить количество">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}" aria-label="Увеличить количество">+</button>
                    </div>
                    <div class="item-price mobile-price">
                        <span class="price">${this.formatPrice(itemTotal)} ₽</span>
                        <button class="remove-item mobile-only" data-id="${item.id}" aria-label="Удалить товар">Удалить</button>
                    </div>
                </div>
            </div>
            
            <!-- Десктопная версия цены -->
            <div class="item-price desktop-price">
                <div class="price">${this.formatPrice(itemTotal)} ₽</div>
                <button class="remove-item desktop-remove" data-id="${item.id}" aria-label="Удалить товар">Удалить</button>
            </div>
        `;
        
        // Добавляем обработчики событий для кнопок
        const minusBtns = itemElement.querySelectorAll('.minus');
        const plusBtns = itemElement.querySelectorAll('.plus');
        const removeBtns = itemElement.querySelectorAll('.remove-item');
        
        minusBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.decreaseQuantity(item.id);
        }));
        
        plusBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.increaseQuantity(item.id);
        }));
        
        removeBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeFromCart(item.id);
        }));
        
        return itemElement;
    }
    
    // Уменьшение количества товара
    decreaseQuantity(itemId) {
        const item = this.cart.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            item.quantity--;
            this.updateCart();
        }
    }
    
    // Увеличение количества товара
    increaseQuantity(itemId) {
        const item = this.cart.find(item => item.id === itemId);
        if (item) {
            item.quantity++;
            this.updateCart();
        }
    }
    
    // Удаление товара из корзины
    removeFromCart(itemId) {
        if (confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
            this.cart = this.cart.filter(item => item.id !== itemId);
            this.updateCart();
            this.showNotification('Товар удален из корзины');
        }
    }
    
    // Обновление корзины
    updateCart() {
        this.saveCart();
        this.renderCart();
        this.updateCartSummary();
        this.updateHeaderCartCount();
    }
    
    // Обновление сводки корзины
    updateCartSummary() {
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Бесплатная доставка при заказе от 10000 ₽
        const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_PRICE;
        const total = subtotal + delivery;
        
        totalItemsElement.textContent = totalItems;
        subtotalPriceElement.textContent = this.formatPrice(subtotal);
        deliveryPriceElement.textContent = this.formatPrice(delivery);
        totalPriceElement.textContent = this.formatPrice(total);
        
        // Добавляем сообщение о бесплатной доставке
        if (delivery === 0) {
            deliveryPriceElement.innerHTML = '<span style="color: var(--green-medium);">Бесплатно</span>';
        }
        
        // Активируем/деактивируем кнопку оформления заказа
        checkoutBtn.disabled = this.cart.length === 0;
    }
    
    // Обновление счетчика товаров в шапке
    updateHeaderCartCount() {
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        
        // Обновляем все элементы с классом cart-count
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }
    
    // Генерация артикула на основе ID
    generateArtNumber(id) {
        const numId = parseInt(id);
        if (isNaN(numId)) {
            return `арт. MD${Math.floor(1000 + Math.random() * 9000)}`;
        }
        return `арт. MD${4000 + numId}`;
    }
    
    // Форматирование цены (добавление пробелов между тысячами)
    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}

// Добавление товара в корзину (функция для использования на других страницах)
function addToCart(productData) {
    const cartManager = new CartManager();
    
    // Проверяем, есть ли товар уже в корзине
    const existingItem = cartManager.cart.find(item => item.id === productData.id && item.size === productData.size);
    
    if (existingItem) {
        existingItem.quantity += productData.quantity || 1;
    } else {
        cartManager.cart.push({
            id: productData.id,
            name: productData.name,
            price: productData.price,
            size: productData.size,
            image: productData.image,
            quantity: productData.quantity || 1,
            art: productData.art || cartManager.generateArtNumber(productData.id)
        });
    }
    
    cartManager.updateCart();
    return cartManager;
}

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const cartManager = new CartManager();
    
    // Экспортируем менеджер корзины для использования на других страницах
    window.cartManager = cartManager;
    window.addToCart = addToCart;
});

// Добавляем CSS для анимации уведомлений и мобильной адаптации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Мобильная адаптация для карточек товаров */
    @media (max-width: 768px) {
        /* Скрываем десктопные элементы */
        .desktop-quantity,
        .desktop-price,
        .desktop-remove {
            display: none !important;
        }
        
        /* Показываем мобильные элементы */
        .mobile-quantity-price {
            display: flex !important;
        }
        
        .mobile-remove {
            display: block !important;
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            font-size: 18px;
            font-weight: bold;
            color: var(--rose-dark);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            cursor: pointer;
            line-height: 1;
        }
        
        .cart-item {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            padding: 15px;
            position: relative;
        }
        
        .item-image {
            width: 100% !important;
            height: 180px !important;
            margin-bottom: 15px;
            border-radius: 8px;
        }
        
        .item-details {
            width: 100%;
            margin-bottom: 15px;
        }
        
        .item-name {
            font-size: 16px;
            margin-bottom: 8px;
            line-height: 1.3;
        }
        
        .item-art,
        .item-size {
            font-size: 13px;
            color: var(--rose-dark);
            margin-bottom: 5px;
        }
        
        .mobile-quantity-price {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid var(--rose-light);
        }
        
        .mobile-price {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 5px;
        }
        
        .mobile-only {
            font-size: 13px;
            color: var(--rose-dark);
            background: none;
            border: none;
            text-decoration: underline;
            cursor: pointer;
            padding: 0;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .quantity-btn {
            width: 28px;
            height: 28px;
            font-size: 14px;
            background: var(--rose-light);
            border: none;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .quantity-value {
            min-width: 25px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }
        
        .price {
            font-size: 18px;
            font-weight: bold;
        }
    }
    
    @media (max-width: 480px) {
        .cart-item {
            padding: 12px;
        }
        
        .item-image {
            height: 150px !important;
        }
        
        .mobile-quantity-price {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
        }
        
        .mobile-price {
            align-items: flex-start;
        }
        
        .quantity-controls {
            justify-content: space-between;
            width: 100%;
        }
    }
    
    /* Десктопные стили */
    @media (min-width: 769px) {
        .mobile-quantity-price,
        .mobile-only,
        .mobile-remove {
            display: none !important;
        }
        
        .desktop-quantity,
        .desktop-price,
        .desktop-remove {
            display: flex !important;
        }
        
        .cart-item {
            flex-direction: row !important;
            align-items: center;
        }
        
        .item-image {
            width: 120px !important;
            height: 120px !important;
        }
        
        .item-details {
            flex: 1;
        }
    }
    
    /* Стили для ошибок формы */
    .error-message {
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
    }
    
    .error {
        border-color: #e74c3c !important;
    }
    
    /* Адаптация для модального окна на мобильных */
    @media (max-width: 768px) {
        .modal-content {
            padding: 20px 15px !important;
            width: 95% !important;
            max-width: 400px !important;
        }
        
        .form-group input,
        .form-group textarea {
            font-size: 16px !important; /* Увеличиваем для лучшего ввода на мобильных */
        }
    }
`;
document.head.appendChild(style);
