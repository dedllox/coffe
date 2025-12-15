import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext'; // ДОБАВЬТЕ ЭТОТ ИМПОРТ
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { totalItems } = useCart(); // ДОБАВЬТЕ ЭТУ СТРОЧКУ

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/menu', label: 'Меню' },
    { path: '/about', label: 'О нас' },
    { path: '/contacts', label: 'Контакты' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>☕</span>
          <span className={styles.logoText}>Кофейня "Уют"</span>
        </Link>

        {/* Навигация для десктопа */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Корзина и кнопка меню */}
        <div className={styles.rightSection}>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          
          <Link to="/cart" className={styles.cartButton}>
            <FiShoppingCart />
            {/* ИЗМЕНИТЕ ЭТУ СТРОЧКУ: */}
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </Link>
          
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.active : ''}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;