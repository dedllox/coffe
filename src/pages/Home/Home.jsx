import React from 'react';
import { motion } from 'framer-motion';
import styles from './Home.module.css';
import coffeeImage from './images/coffee-main.jpg';

const Home = () => {
  return (
    <div className={styles.container}>
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroContent}>
          <h1>Добро пожаловать в кофейню "Уют"</h1>
          <p>Лучший кофе в городе с 2010 года</p>
          <button className={styles.ctaButton}>Посмотреть меню</button>
        </div>
        <img src={coffeeImage} alt="Кофе" className={styles.heroImage} />
      </motion.section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <h3>☕ Свежие зерна</h3>
          <p>Ежедневная обжарка отборной арабики</p>
        </div>
        <div className={styles.feature}>
          <h3>🏆 Профессиональные бариста</h3>
          <p>Победители российских чемпионатов</p>
        </div>
        <div className={styles.feature}>
          <h3>🎨 Уютная атмосфера</h3>
          <p>Идеальное место для работы и встреч</p>
        </div>
      </section>
    </div>
  );
};

export default Home;