import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiCoffee, FiFrown } from 'react-icons/fi';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.errorIcon}>
          <FiFrown />
        </div>
        
        <div className={styles.errorCode}>404</div>
        
        <h1 className={styles.title}>Страница не найдена</h1>
        
        <p className={styles.message}>
          Кажется, эта страница пропала или никогда не существовала.
          Возможно, вы ищете наше меню или хотите узнать о нас больше?
        </p>

        <motion.div 
          className={styles.coffeeCup}
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={styles.cup}>
            <div className={styles.handle}></div>
            <div className={styles.steam}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </motion.div>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            <FiHome />
            На главную
          </Link>
          <Link to="/menu" className={styles.secondaryButton}>
            <FiCoffee />
            Перейти в меню
          </Link>
        </div>

        <div className={styles.suggestions}>
          <h3>Попробуйте посмотреть:</h3>
          <div className={styles.suggestionLinks}>
            <Link to="/about">О нашей кофейне</Link>
            <Link to="/contacts">Контакты и расположение</Link>
            <Link to="/cart">Ваша корзина</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;