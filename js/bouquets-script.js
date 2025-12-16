// Данные о букетах
const bouquetsData = {
    1: {
        name: "БУКЕТ «ЗИМНЯЯ СКАЗКА",
        art: "арт. 2601",
        image: "../img/zimnskaska.jpg",
        sizes: {
            small: { price: 7800, name: "Малый" },
            medium: { price: 9800, name: "Стандартный" },
            large: { price: 11800, name: "Роскошный" }
        }
    },
    2: {
        name:"БУКЕТ «ДЖУЛЬЕТТА»",
        art: "арт. 2602",
        image: "../img/francerose.jpg",
        sizes: {
            small: { price: 6200, name: "Малый" },
            medium: { price: 8200, name: "Стандартный" },
            large: { price: 10200, name: "Роскошный" }
        }
    },
    3: {
        name: "БУКЕТ «ЛЕТНИЙ РАССВЕТ»",
        art: "арт. 2603",
        image: "../img/leto.jpg",
        sizes: {
            small: { price: 2900, name: "Малый" },
            medium: { price: 3900, name: "Стандартный" },
            large: { price: 5200, name: "Роскошный" }
        }
    },
    4: {
        name: "БУКЕТ «ОСЕННЯЯ СИМФОНИЯ С ГОРТЕНЗИЕЙ»",
        art: "арт. 2604",
        image: "../img/osen.jpg",
        sizes: {
            small: { price: 8500, name: "Малый" },
            medium: { price: 10500, name: "Стандартный" },
            large: { price: 12500, name: "Роскошный" }
        }
    },
    5: {
        name: "БУКЕТ «ДИВО»",
        art: "арт. 2605",
        image: "../img/divo.jpg",
        sizes: {
            small: { price: 7500, name: "Малый" },
            medium: { price: 9500, name: "Стандартный" },
            large: { price: 11500, name: "Роскошный" }
        }
    },
    6: {
        name: "БУКЕТ «САДОВЫЕ РОЗЫ»",
        art: "арт. 2606",
        image: "../img/sadrosa.jpg",
        sizes: {
            small: { price: 8500, name: "Малый" },
            medium: { price: 10500, name: "Стандартный" },
            large: { price: 12500, name: "Роскошный" }
        }
    },
    7: {
        name: "СВАДЕБНЫЙ БУКЕТ «СИЛУЭТ»",
        art: "арт. 2607",
        image: "../img/wedding1.jpg",
        sizes: {
            small: { price: 7500, name: "Малый" },
            medium: { price: 9500, name: "Стандартный" },
            large: { price: 11500, name: "Роскошный" }
        }
    },
    8: {
        name: "СВАДЕБНЫЙ БУКЕТ «СИМФОНИЯ»",
        art: "арт. 2608",
        image: "../img/wedding2.jpg",
        sizes: {
            small: { price: 6500, name: "Малый" },
            medium: { price: 8500, name: "Стандартный" },
            large: { price: 10500, name: "Роскошный" }
        }
    },
    9: {
        name: "СВАДЕБНЫЙ БУКЕТ «ШЕПОТ ЗЕЛЕНИ»",
        art: "арт. 2609",
        image: "../img/wedding3.jpg",
        sizes: {
            small: { price: 4900, name: "Малый" },
            medium: { price: 6900, name: "Стандартный" },
            large: { price: 8900, name: "Роскошный" }
        }
    },
    10: {
        name: "СВАДЕБНЫЙ БУКЕТ «СОЛНЦЕ»",
        art: "арт. 2610",
        image: "../img/wedding4.jpg",
        sizes: {
            small: { price: 7500, name: "Малый" },
            medium: { price: 9500, name: "Стандартный" },
            large: { price: 11500, name: "Роскошный" }
        }
    },
    11: {
        name: "СВАДЕБНЫЙ БУКЕТ «ЭСКИЗ»",
        art: "арт. 2611",
        image: "../img/wedding5.jpg",
        sizes: {
            small: { price: 5500, name: "Малый" },
            medium: { price: 7500, name: "Стандартный" },
            large: { price: 9500, name: "Роскошный" }
        }
    },
    12: {
        name: "СВАДЕБНЫЙ БУКЕТ «ОБЛАКО»",
        art: "арт. 2612",
        image: "../img/wedding6.jpg",
        sizes: {
            small: { price: 7800, name: "Малый" },
            medium: { price: 9800, name: "Стандартный" },
            large: { price: 11800, name: "Роскошный" }
        }
    },
    13: {
        name: "АВТОРСКИЙ БУКЕТ «МЭРИ»",
        art: "арт. 2613",
        image: "../img/author1.jpg",
        sizes: {
            small: { price: 8500, name: "Малый" },
            medium: { price: 10500, name: "Стандартный" },
            large: { price: 12500, name: "Роскошный" }
        }
    },
    14: {
        name: "АВТОРСКИЙ БУКЕТ «ТЕНИ В РАЮ»",
        art: "арт. 2614",
        image: "../img/author2.jpg",
        sizes: {
            small: { price: 7200, name: "Малый" },
            medium: { price: 9200, name: "Стандартный" },
            large: { price: 11200, name: "Роскошный" }
        }
    },
    15: {
        name: "АВТОРСКИЙ БУКЕТ «КАПРИЗ»",
        art: "арт. 2615",
        image: "../img/author3.jpg",
        sizes: {
            small: { price: 7900, name: "Малый" },
            medium: { price: 9900, name: "Стандартный" },
            large: { price: 11900, name: "Роскошный" }
        }
    },
    16: {
        name: "АВТОРСКИЙ БУКЕТ «КРУЖЕВА»",
        art: "арт. 2616",
        image: "../img/author4.jpg",
        sizes: {
            small: { price: 8900, name: "Малый" },
            medium: { price: 10900, name: "Стандартный" },
            large: { price: 12900, name: "Роскошный" }
        }
    },
    17: {
        name: "АВТОРСКИЙ БУКЕТ «МЕЛОДИЯ»",
        art: "арт. 2617",
        image: "../img/author5.jpg",
        sizes: {
            small: { price: 8500, name: "Малый" },
            medium: { price: 10500, name: "Стандартный" },
            large: { price: 12500, name: "Роскошный" }
        }
    },
    18: {
        name: "АВТОРСКИЙ БУКЕТ «СКАЗКА»",
        art: "арт. 2618",
        image: "../img/author6.jpg",
        sizes: {
            small: { price: 7800, name: "Малый" },
            medium: { price: 9800, name: "Стандартный" },
            large: { price: 11800, name: "Роскошный" }
        }
    },
    19: {
        name: "МОНОБУКЕТ ИЗ ФРАНЦУЗСКОЙ РОЗЫ",
        art: "арт. 2619",
        image: "../img/mono1.jpg",
        sizes: {
            small: { price: 9500, name: "Малый" },
            medium: { price: 11500, name: "Стандартный" },
            large: { price: 13500, name: "Роскошный" }
        }
    },
    20: {
        name: "МОНОБУКЕТ ИЗ РАНУНКУЛЮСОВ",
        art: "арт. 2620",
        image: "../img/mono2.jpg",
        sizes: {
            small: { price: 7200, name: "Малый" },
            medium: { price: 9200, name: "Стандартный" },
            large: { price: 11200, name: "Роскошный" }
        }
    },
    21: {
        name: "МОНОБУКЕТ ИЗ КУСТОВЫХ РОЗ",
        art: "арт. 2621",
        image: "../img/mono3.jpg",
        sizes: {
            small: { price: 7900, name: "Малый" },
            medium: { price: 9900, name: "Стандартный" },
            large: { price: 11900, name: "Роскошный" }
        }
    },
    22: {
        name: "МОНОБУКЕТ «ЗЕФИРНАЯ НЕЖНОСТЬ»",
        art: "арт. 2622",
        image: "../img/mono4.jpg",
        sizes: {
            small: { price: 8500, name: "Малый" },
            medium: { price: 10500, name: "Стандартный" },
            large: { price: 12500, name: "Роскошный" }
        }
    },
    23: {
        name: "МОНОБУКЕТ ИЗ ФРАНЦУЗКИХ РОЗ",
        art: "арт. 2623",
        image: "../img/mono5.jpg",
        sizes: {
            small: { price: 8500, name: "Малый" },
            medium: { price: 10500, name: "Стандартный" },
            large: { price: 12500, name: "Роскошный" }
        }
    },
    24: {
        name: "МОНОБУКЕТ ИЗ ФРАНЦУЗКИХ РОЗ",
        art: "арт. 2624",
        image: "../img/mono6.jpg",
        sizes: {
            small: { price: 7800, name: "Малый" },
            medium: { price: 9800, name: "Стандартный" },
            large: { price: 11800, name: "Роскошный" }
        }
    },
    25: {
        name: "ИНТЕРЬЕРНАЯ КОМПОЗИЦИЯ №1",
        art: "арт. 2625",
        image: "../img/interior1.jpg",
        sizes: {
            small: { price: 11500, name: "Малый" },
            medium: { price: 13500, name: "Стандартный" },
            large: { price: 15500, name: "Роскошный" }
        }
    },
    26: {
        name: "ИНТЕРЬЕРНАЯ КОМПОЗИЦИЯ №2",
        art: "арт. 2626",
        image: "../img/interior2.jpg",
        sizes: {
            small: { price: 12200, name: "Малый" },
            medium: { price: 14200, name: "Стандартный" },
            large: { price: 16200, name: "Роскошный" }
        }
    },
    27: {
        name: "ИНТЕРЬЕРНАЯ КОМПОЗИЦИЯ №3",
        art: "арт. 2627",
        image: "../img/interior3.jpg",
        sizes: {
            small: { price: 14900, name: "Малый" },
            medium: { price: 16900, name: "Стандартный" },
            large: { price: 18900, name: "Роскошный" }
        }
    },
    28: {
        name: "ИНТЕРЬЕРНАЯ КОМПОЗИЦИЯ №4",
        art: "арт. 2628",
        image: "../img/interior4.jpg",
        sizes: {
            small: { price: 12900, name: "Малый" },
            medium: { price: 14900, name: "Стандартный" },
            large: { price: 16900, name: "Роскошный" }
        }
    },
    29: {
        name: "ИНТЕРЬЕРНАЯ КОМПОЗИЦИЯ №5",
        art: "арт. 2629",
        image: "../img/interior5.jpg",
        sizes: {
            small: { price: 9800, name: "Малый" },
            medium: { price: 11800, name: "Стандартный" },
            large: { price: 13800, name: "Роскошный" }
        }
    },
    30: {
        name: "ИНТЕРЬЕРНАЯ КОМПОЗИЦИЯ №6",
        art: "арт. 2630",
        image: "../img/interior6.jpg",
        sizes: {
            small: { price: 9800, name: "Малый" },
            medium: { price: 11800, name: "Стандартный" },
            large: { price: 13800, name: "Роскошный" }
        }
    },
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
    addItem(bouquetId, size) {
        const bouquet = bouquetsData[bouquetId];
        if (!bouquet) return;
        
        const sizeData = bouquet.sizes[size];
        if (!sizeData) return;
        
        // Создаем уникальный ID для товара с учетом размера
        const itemId = `${bouquetId}-${size}`;
        
        const existingItem = this.cart.find(item => item.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: itemId,
                bouquetId: bouquetId,
                name: bouquet.name,
                size: sizeData.name,
                price: sizeData.price,
                image: bouquet.image,
                art: bouquet.art,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateHeaderCartCount();
        this.showNotification(`${bouquet.name} (${sizeData.name}) добавлен в корзину`);
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

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для выбора размера
    const sizeSelects = document.querySelectorAll('.size-select');
    sizeSelects.forEach(select => {
        select.addEventListener('change', function() {
            const bouquetId = this.getAttribute('data-bouquet-id');
            const selectedSize = this.value;
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.getAttribute('data-price');
            
            // Обновляем отображаемую цену
            const priceElement = this.closest('.bouquet-card').querySelector('.bouquet-price');
            priceElement.textContent = formatPrice(price) + ' ₽';
        });
    });
    
    // Обработчики для кнопок "В корзину"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bouquetId = this.getAttribute('data-bouquet-id');
            const sizeSelect = this.closest('.bouquet-card').querySelector('.size-select');
            const selectedSize = sizeSelect.value;
            
            cartManager.addItem(bouquetId, selectedSize);
            
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