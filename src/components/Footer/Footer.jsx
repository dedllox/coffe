import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* О компании */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Кофейня "Уют"</h3>
            <p className={styles.description}>
              Создаём лучший кофе с 2010 года. Мы гордимся качеством наших продуктов
              и уютной атмосферой для наших гостей.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink}>
                <FiFacebook />
              </a>
              <a href="#" className={styles.socialLink}>
                <FiInstagram />
              </a>
              <a href="#" className={styles.socialLink}>
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Контакты */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Контакты</h3>
            <div className={styles.contactItem}>
              <FiMapPin />
              <span>ул. Кофейная, 15, Санкт-Петербург</span>
            </div>
            <div className={styles.contactItem}>
              <FiPhone />
              <span>+7 (999) 123-45-67</span>
            </div>
            <div className={styles.contactItem}>
              <FiMail />
              <span>coffee@uyt.ru</span>
            </div>
          </div>

          {/* Часы работы */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Часы работы</h3>
            <div className={styles.hours}>
              <div className={styles.hourItem}>
                <span>Пн-Пт:</span>
                <span>8:00 - 22:00</span>
              </div>
              <div className={styles.hourItem}>
                <span>Сб-Вс:</span>
                <span>9:00 - 23:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Кофейня "Уют". Все права защищены.
          </p>
          <p className={styles.developer}>
            Разработано для курсовой работы по Web-разработке
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;