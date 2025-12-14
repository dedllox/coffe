import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingCart, FiPlus, FiMinus, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import styles from './QuickViewModal.module.css';

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose();
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (!isOpen || !product) return null;

  const nutritionInfo = [
    { label: 'Белки', value: `${(product.calories * 0.05).toFixed(1)} г` },
    { label: 'Жиры', value: `${(product.calories * 0.3).toFixed(1)} г` },
    { label: 'Углеводы', value: `${(product.calories * 0.65).toFixed(1)} г` },
    { label: 'Энергетическая ценность', value: `${product.calories} ккал` },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>

          <div className={styles.modalGrid}>
            {/* Левая колонка - изображение */}
            <div className={styles.imageSection}>
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage}
                  loading="lazy"
                />
                <div className={styles.imageBadges}>
                  {product.isNew && <span className={styles.newBadge}>Новинка</span>}
                  {product.isPopular && <span className={styles.popularBadge}>Популярное</span>}
                </div>
                <button 
                  className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <FiHeart />
                </button>
              </div>
              
              <div className={styles.thumbnailGallery}>
                {[1, 2, 3].map((num) => (
                  <div key={num} className={styles.thumbnail}>
                    <img 
                      src={product.image} 
                      alt={`${product.name} ${num}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Правая колонка - информация */}
            <div className={styles.infoSection}>
              <div className={styles.category}>{product.category}</div>
              <h2 className={styles.productName}>{product.name}</h2>
              
              <div className={styles.rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={styles.star}>★</span>
                ))}
                <span className={styles.ratingText}>(4.8 • 127 отзывов)</span>
              </div>

              <div className={styles.priceSection}>
                <div className={styles.currentPrice}>{product.price} ₽</div>
                {product.oldPrice && (
                  <div className={styles.oldPrice}>{product.oldPrice} ₽</div>
                )}
                <div className={styles.discountBadge}>-15%</div>
              </div>

              {/* Тэбы с информацией */}
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
                  onClick={() => setActiveTab('description')}
                >
                  Описание
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'nutrition' ? styles.active : ''}`}
                  onClick={() => setActiveTab('nutrition')}
                >
                  Пищевая ценность
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Отзывы (127)
                </button>
              </div>

              <div className={styles.tabContent}>
                {activeTab === 'description' && (
                  <div className={styles.description}>
                    <p>{product.description}</p>
                    <ul className={styles.featuresList}>
                      <li>✓ Свежеобжаренные зерна арабики</li>
                      <li>✓ Приготовление занимает 3-5 минут</li>
                      <li>✓ Можно добавить сироп (+50 ₽)</li>
                      <li>✓ Подается с печеньем</li>
                    </ul>
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className={styles.nutritionGrid}>
                    {nutritionInfo.map((item, index) => (
                      <div key={index} className={styles.nutritionItem}>
                        <div className={styles.nutritionLabel}>{item.label}</div>
                        <div className={styles.nutritionValue}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className={styles.reviews}>
                    <div className={styles.reviewSummary}>
                      <div className={styles.ratingNumber}>4.8</div>
                      <div className={styles.ratingStars}>★★★★★</div>
                      <div className={styles.totalReviews}>На основе 127 отзывов</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Управление количеством и кнопка добавления */}
              <div className={styles.actions}>
                <div className={styles.quantityControl}>
                  <button onClick={decrement} className={styles.quantityButton}>
                    <FiMinus />
                  </button>
                  <div className={styles.quantityDisplay}>{quantity}</div>
                  <button onClick={increment} className={styles.quantityButton}>
                    <FiPlus />
                  </button>
                </div>

                <button onClick={handleAddToCart} className={styles.addToCartButton}>
                  <FiShoppingCart />
                  Добавить в корзину
                  <span className={styles.totalPrice}>{product.price * quantity} ₽</span>
                </button>
              </div>

              {/* Дополнительная информация */}
              <div className={styles.additionalInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>🚚 Доставка:</span>
                  <span className={styles.infoValue}>30-60 минут</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>📦 Вес:</span>
                  <span className={styles.infoValue}>{product.weight} г</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>🔥 Калории:</span>
                  <span className={styles.infoValue}>{product.calories} ккал</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;