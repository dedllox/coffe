import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        {product.isNew && <span className={styles.badge}>Новинка</span>}
        {product.isPopular && <span className={styles.popularBadge}>🔥 Популярное</span>}
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.details}>
          <div className={styles.weight}>{product.weight} г</div>
          <div className={styles.calories}>{product.calories} ккал</div>
        </div>

        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{product.price} ₽</span>
            {product.oldPrice && (
              <span className={styles.oldPrice}>{product.oldPrice} ₽</span>
            )}
          </div>

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button onClick={decrement} className={styles.quantityButton}>
                <FiMinus />
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button onClick={increment} className={styles.quantityButton}>
                <FiPlus />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`${styles.addButton} ${isAdded ? styles.added : ''}`}
            >
              {isAdded ? (
                'Добавлено!'
              ) : (
                <>
                  <FiShoppingCart />
                  В корзину
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;