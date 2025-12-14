import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import { productsData } from '../../data/products';
import styles from './Menu.module.css';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [sortBy, setSortBy] = useState('default');

  // Получаем уникальные категории
  const categories = [
    'all',
    ...Array.from(new Set(productsData.map(product => product.category)))
  ];

  // Фильтрация и сортировка
  useEffect(() => {
    let result = productsData;

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Фильтр по поиску
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'calories':
        result.sort((a, b) => a.calories - b.calories);
        break;
      case 'popular':
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      default:
        // Оставляем порядок по умолчанию
        break;
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className={styles.container}>
      {/* Hero секция меню */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Наше меню</h1>
          <p className={styles.subtitle}>
            Более 50 видов кофе, авторские десерты и закуски
          </p>
        </motion.div>
      </section>

      {/* Фильтры и поиск */}
      <section className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Поиск по меню..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.categories}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryButton} ${
                  selectedCategory === category ? styles.active : ''
                }`}
              >
                {category === 'all' ? 'Все' : category}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="calories">Калорийность</option>
            <option value="popular">Популярные</option>
          </select>
        </div>

        <div className={styles.resultsInfo}>
          <span>Найдено: {filteredProducts.length} позиций</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className={styles.clearFilter}
            >
              Сбросить фильтр
            </button>
          )}
        </div>
      </section>

      {/* Сетка товаров */}
      <section className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        ) : (
          <div className={styles.noResults}>
            <h3>Товары не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </section>

      {/* Информация о доставке */}
      <section className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3>🚚 Бесплатная доставка</h3>
          <p>При заказе от 1000 рублей</p>
        </div>
        <div className={styles.infoCard}>
          <h3>⏱ Быстрое приготовление</h3>
          <p>Ваш заказ будет готов за 15-20 минут</p>
        </div>
        <div className={styles.infoCard}>
          <h3>🎁 Бонусная система</h3>
          <p>1 бонус = 1 рубль. Копите и оплачивайте бонусами</p>
        </div>
      </section>
    </div>
  );
};

export default Menu;