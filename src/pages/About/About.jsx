import React from 'react';
import { motion } from 'framer-motion';
import { FiCoffee, FiHeart, FiAward, FiUsers } from 'react-icons/fi';
import styles from './About.module.css';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Анна Петрова',
      role: 'Главный бариста',
      experience: '8 лет',
      image: '/images/Бариста.jpg',
      description: 'Чемпион России по латте-арт 2021'
    },
    {
      id: 2,
      name: 'Михаил Иванов',
      role: 'Шеф-кондитер',
      experience: '12 лет',
      image: '/images/Кондитер.jpg',
      description: 'Автор уникальных десертов'
    },
    {
      id: 3,
      name: 'Елена Смирнова',
      role: 'Управляющая',
      experience: '6 лет',
      image: '/images/Управляющая.jpeg',
      description: 'Создаёт уютную атмосферу'
    },
  ];

  const milestones = [
    { year: '2010', title: 'Открытие первой кофейни', description: 'Начали с маленького заведения на 20 мест' },
    { year: '2014', title: 'Собственная обжарка', description: 'Запустили производство по обжарке кофейных зерен' },
    { year: '2018', title: 'Премия "Лучший кофе города"', description: 'Получили признание на городском конкурсе' },
    { year: '2022', title: 'Открытие онлайн-заказов', description: 'Запустили удобную систему доставки' },
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
          <h1 className={styles.title}>Наша история</h1>
          <p className={styles.subtitle}>
            Более 10 лет мы создаём идеальный кофе и уютную атмосферу
          </p>
        </motion.div>
      </section>

      {/* Основная информация */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <motion.div
            className={styles.storyText}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Наша философия</h2>
            <p>
              Мы верим, что хороший кофе — это не просто напиток, а искусство, которое 
              объединяет людей. С 2010 года мы отбираем лучшие зерна арабики со всего мира, 
              обжариваем их с любовью и готовим с вниманием к деталям.
            </p>
            <p>
              Наша миссия — создавать место, где каждый гость чувствует себя как дома. 
              Где можно насладиться не только превосходным кофе, но и тёплой атмосферой, 
              дружеской беседой и моментом покоя в суете дня.
            </p>
          </motion.div>
          <motion.div
            className={styles.storyImage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src="/images/Интерьер.jpg" alt="Интерьер кофейни" />
          </motion.div>
        </div>
      </section>

      {/* Преимущества */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
        <div className={styles.featuresGrid}>
          <motion.div 
            className={styles.featureCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.featureIcon}>
              <FiCoffee />
            </div>
            <h3>Свежая обжарка</h3>
            <p>Обжариваем зерна ежедневно для максимальной свежести и аромата</p>
          </motion.div>

          <motion.div 
            className={styles.featureCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className={styles.featureIcon}>
              <FiHeart />
            </div>
            <h3>Качество без компромиссов</h3>
            <p>Используем только качественные ингредиенты от проверенных поставщиков</p>
          </motion.div>

          <motion.div 
            className={styles.featureCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className={styles.featureIcon}>
              <FiAward />
            </div>
            <h3>Профессионализм</h3>
            <p>Наши бариста — победители российских и международных конкурсов</p>
          </motion.div>

          <motion.div 
            className={styles.featureCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className={styles.featureIcon}>
              <FiUsers />
            </div>
            <h3>Сообщество</h3>
            <p>Мы создаём пространство для общения, работы и творчества</p>
          </motion.div>
        </div>
      </section>

      {/* Вехи развития */}
      <section className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>Наш путь</h2>
        <div className={styles.timeline}>
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={styles.timelineYear}>{milestone.year}</div>
              <div className={styles.timelineContent}>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Команда */}
      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Наша команда</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className={styles.teamCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.teamImage}>
                <img src={member.image} alt={member.name} />
              </div>
              <div className={styles.teamInfo}>
                <h3>{member.name}</h3>
                <p className={styles.teamRole}>{member.role}</p>
                <p className={styles.teamExperience}>Опыт: {member.experience}</p>
                <p className={styles.teamDescription}>{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;