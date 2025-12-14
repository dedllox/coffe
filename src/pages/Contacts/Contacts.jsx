import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import styles from './Contacts.module.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Введите имя';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Введите корректный email';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Введите сообщение';
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // В реальном приложении здесь будет отправка на сервер
      console.log('Форма отправлена:', formData);
      setIsSubmitted(true);
      
      // Сбрасываем форму
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Сбрасываем сообщение об успехе через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } else {
      setFormErrors(errors);
    }
  };

  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: 'Адрес',
      content: 'ул. Кофейная, 15, Санкт-Петербург',
      details: 'Ближайшее метро: "Невский проспект"'
    },
    {
      icon: <FiPhone />,
      title: 'Телефон',
      content: '+7 (999) 123-45-67',
      details: 'Ежедневно с 8:00 до 22:00'
    },
    {
      icon: <FiMail />,
      title: 'Email',
      content: 'coffee@uyt.ru',
      details: 'Отвечаем в течение 24 часов'
    },
    {
      icon: <FiClock />,
      title: 'Часы работы',
      content: 'Пн-Пт: 8:00 - 22:00',
      details: 'Сб-Вс: 9:00 - 23:00'
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero секция */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.title}>Контакты</h1>
          <p className={styles.subtitle}>
            Мы всегда рады вашим вопросам и предложениям
          </p>
        </motion.div>
      </section>

      {/* Контактная информация */}
      <section className={styles.contactInfo}>
        <div className={styles.infoGrid}>
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.infoCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.infoIcon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={styles.infoContent}>{item.content}</p>
              <p className={styles.infoDetails}>{item.details}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Основной контент */}
      <div className={styles.mainContent}>
        {/* Форма обратной связи */}
        <motion.section
          className={styles.formSection}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>Напишите нам</h2>
          
          {isSubmitted && (
            <div className={styles.successMessage}>
              Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? styles.errorInput : ''}
                placeholder="Ваше имя"
              />
              {formErrors.name && (
                <span className={styles.errorText}>{formErrors.name}</span>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={formErrors.email ? styles.errorInput : ''}
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <span className={styles.errorText}>{formErrors.email}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Сообщение *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={formErrors.message ? styles.errorInput : ''}
                placeholder="Ваше сообщение..."
                rows="6"
              />
              {formErrors.message && (
                <span className={styles.errorText}>{formErrors.message}</span>
              )}
            </div>

            <button type="submit" className={styles.submitButton}>
              <FiSend />
              Отправить сообщение
            </button>
          </form>
        </motion.section>

        {/* Карта и дополнительная информация */}
        <motion.section
          className={styles.mapSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.sectionTitle}>Как нас найти</h2>
          
          <div className={styles.mapContainer}>
            {/* Заглушка для карты */}
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapOverlay}>
                <h3>Карта находится здесь</h3>
                <p>В реальном проекте здесь будет интерактивная карта</p>
              </div>
            </div>
            
            <div className={styles.mapInfo}>
              <h3>Удобное расположение</h3>
              <p>
                Мы находимся в центре города, в 5 минутах ходьбы от метро 
                "Невский проспект". Рядом есть парковка.
              </p>
              
              <h3>Как добраться</h3>
              <ul className={styles.directionsList}>
                <li>🚇 От метро "Невский проспект" - 5 минут пешком</li>
                <li>🚌 Автобусы: 3, 7, 22 до остановки "Кофейная улица"</li>
                <li>🚗 Парковка: ул. Кофейная, парковка №15 (бесплатно для клиентов)</li>
              </ul>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contacts;