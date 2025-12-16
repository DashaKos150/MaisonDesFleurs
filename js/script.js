// Данные о продуктах для главной страницы
const productsData = {
    1: {
        name: "МОНОБУКЕТ ИЗ ФРАНЦУЗСКОЙ РОЗЫ",
        art: "арт. 2619",
        image: "../img/mono1.jpg",
        sizes: {
            small: { price: 9500, name: "Малый" },
            medium: { price: 11500, name: "Стандартный" },
            large: { price: 13500, name: "Роскошный" }
        }
    },
    2: {
        name: "МОНОБУКЕТ ИЗ КУСТОВЫХ РОЗ",
        art: "арт. 2621",
        image: "../img/mono3.jpg",
        sizes: {
            small: { price: 7900, name: "Малый" },
            medium: { price: 9900, name: "Стандартный" },
            large: { price: 11900, name: "Роскошный" }
        }
    },
    3: {
        name: "АВТОРСКИЙ БУКЕТ «МЕЛОДИЯ»",
        art: "арт. 2617",
        image: "../img/author5.jpg",
        sizes: {
            small: { price: 8500, name: "Малый" },
            medium: { price: 10500, name: "Стандартный" },
            large: { price: 12500, name: "Роскошный" }
        }
    },
    4: {
        name: "БУКЕТ «ЗИМНЯЯ СКАЗКА",
        art: "арт. 2601",
        image: "../img/zimnskaska.jpg",
        sizes: {
            small: { price: 7800, name: "Малый" },
            medium: { price: 9800, name: "Стандартный" },
            large: { price: 11800, name: "Роскошный" }
        }
    }
};

// Функции для работы с корзиной
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.updateHeaderCartCount();
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
    
    // Добавление товара в корзину
    addItem(productId, size) {
        const product = productsData[productId];
        if (!product) return;
        
        const sizeData = product.sizes[size];
        if (!sizeData) return;
        
        // Создаем уникальный ID для товара с учетом размера
        const itemId = `${productId}-${size}`;
        
        const existingItem = this.cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: itemId,
                productId: productId,
                name: product.name,
                size: sizeData.name,
                price: sizeData.price,
                image: product.image,
                art: product.art,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateHeaderCartCount();
        this.showNotification(`${product.name} (${sizeData.name}) добавлен в корзину`);
    }
    
    // Получение общего количества товаров
    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Обновление отображения корзины в шапке
    updateHeaderCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }
    }
    
    // Показ уведомления
    showNotification(message) {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие через 3 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Инициализация корзины
const cartManager = new CartManager();

// Слайдер баннера
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Функция показа слайда
function showSlide(index) {
    // Убираем активный класс у всех слайдов
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Добавляем активный класс текущему слайду
    slides[index].classList.add('active');
    
    // Обновляем точки
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

// Функция следующего слайда
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Функция предыдущего слайда
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Автопрокрутка слайдов
let slideInterval = setInterval(nextSlide, 5000);

// Остановка автопрокрутки при наведении на баннер
const banner = document.querySelector('.banner');
if (banner) {
    banner.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    banner.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    if (slides.length > 0) {
        // Обработчики для кнопок слайдера
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
    
    // Обработчики для выбора размера на главной странице
    const sizeSelects = document.querySelectorAll('.size-select');
    sizeSelects.forEach(select => {
        select.addEventListener('change', function() {
            const productId = this.getAttribute('data-product-id');
            const selectedSize = this.value;
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.getAttribute('data-price');
            
            // Обновляем отображаемую цену
            const priceElement = this.closest('.product-card').querySelector('.product-price');
            priceElement.textContent = formatPrice(price) + ' ₽';
        });
    });
    
    // Обработчики для кнопок "В корзину" на главной странице
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const sizeSelect = this.closest('.product-card').querySelector('.size-select');
            const selectedSize = sizeSelect ? sizeSelect.value : 'medium';
            
            cartManager.addItem(productId, selectedSize);
            
            // Визуальная обратная связь
            this.textContent = 'Добавлено!';
            this.classList.add('added');
            
            setTimeout(() => {
                this.textContent = 'В корзину';
                this.classList.remove('added');
            }, 2000);
        });
    });
});

// Функция форматирования цены (добавление пробелов между тысячами)
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}