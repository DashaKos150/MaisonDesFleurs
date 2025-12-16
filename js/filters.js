// filters.js - фильтрация букетов по категориям
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bouquetCards = document.querySelectorAll('.bouquet-card');
    
    // Массив с диапазонами ID для каждой категории
    const categoryRanges = {
        'seasonal': [1, 6],    // ID 1-6
        'svadba': [7, 12],     // ID 7-12
        'avtorsk': [13, 18],   // ID 13-18
        'mono': [19, 24],      // ID 19-24
        'interer': [25, 30]    // ID 25-30
    };
    
    // Добавляем обработчики для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Фильтруем букеты
            bouquetCards.forEach(card => {
                const bouquetId = parseInt(card.getAttribute('data-id'));
                
                if (filter === 'all') {
                    // Показываем все букеты
                    card.style.display = 'block';
                } else {
                    const range = categoryRanges[filter];
                    if (range && bouquetId >= range[0] && bouquetId <= range[1]) {
                        // Букет входит в диапазон выбранной категории
                        card.style.display = 'block';
                    } else {
                        // Букет не входит в категорию - скрываем
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});