import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

const Cart = () => {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, parseInt(newQuantity) || 1);
  };

  const handleIncrement = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // В реальном приложении здесь будет отправка заказа на сервер
    console.log('Заказ оформлен:', { items, orderData, totalPrice });
    alert('Заказ успешно оформлен! Мы свяжемся с вами для подтверждения.');
    clearCart();
    setIsOrdering(false);
    setOrderData({
      name: '',
      phone: '',
      email: '',
      address: '',
      comment: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <motion.div
          className={styles.emptyCart}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.emptyIcon}>
            <FiShoppingBag />
          </div>
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из меню, чтобы оформить заказ</p>
          <Link to="/menu" className={styles.continueButton}>
            Перейти в меню
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <section className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Корзина
        </motion.h1>
        <Link to="/menu" className={styles.backButton}>
          <FiArrowLeft />
          Вернуться в меню
        </Link>
      </section>

      <div className={styles.mainContent}>
        {/* Список товаров */}
        <motion.section
          className={styles.cartItems}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.itemsHeader}>
            <h2>Ваши товары ({items.length})</h2>
            <button onClick={clearCart} className={styles.clearButton}>
              <FiTrash2 />
              Очистить корзину
            </button>
          </div>

          <div className={styles.itemsList}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                className={styles.cartItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>

                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.itemWeight}>{item.weight} г</div>
                </div>

                <div className={styles.itemControls}>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      className={styles.quantityButton}
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className={styles.quantityInput}
                    />
                    <button
                      onClick={() => handleIncrement(item.id, item.quantity)}
                      className={styles.quantityButton}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <div className={styles.itemPrice}>
                    {(item.price * item.quantity).toFixed(0)} ₽
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeButton}
                  title="Удалить товар"
                >
                  <FiTrash2 />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Итого и оформление заказа */}
        <motion.section
          className={styles.orderSummary}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Итого</h2>

            <div className={styles.summaryDetails}>
              <div className={styles.summaryRow}>
                <span>Товары ({items.length})</span>
                <span>{totalPrice.toFixed(0)} ₽</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Доставка</span>
                <span className={styles.freeDelivery}>
                  {totalPrice > 1000 ? 'Бесплатно' : '300 ₽'}
                </span>
              </div>
              
              {totalPrice < 1000 && (
                <div className={styles.deliveryNote}>
                  🎉 Добавьте товаров на {1000 - totalPrice} ₽ для бесплатной доставки!
                </div>
              )}

              <div className={styles.summaryDivider} />

              <div className={styles.totalRow}>
                <span>Общая сумма</span>
                <span className={styles.totalAmount}>
                  {totalPrice > 1000 ? totalPrice.toFixed(0) : (totalPrice + 300).toFixed(0)} ₽
                </span>
              </div>
            </div>

            {!isOrdering ? (
              <button
                onClick={() => setIsOrdering(true)}
                className={styles.orderButton}
              >
                Оформить заказ
              </button>
            ) : (
              <form onSubmit={handleOrderSubmit} className={styles.orderForm}>
                <h3>Данные для заказа</h3>
                
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    placeholder="Ваше имя *"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    placeholder="Телефон *"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    value={orderData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    placeholder="Адрес доставки *"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <textarea
                    name="comment"
                    value={orderData.comment}
                    onChange={handleInputChange}
                    placeholder="Комментарий к заказу"
                    rows="3"
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => setIsOrdering(false)}
                    className={styles.cancelButton}
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className={styles.submitOrderButton}
                  >
                    Подтвердить заказ
                  </button>
                </div>
              </form>
            )}

            <div className={styles.paymentInfo}>
              <h4>Способы оплаты:</h4>
              <div className={styles.paymentMethods}>
                <span>💳 Картой онлайн</span>
                <span>💰 Наличными</span>
                <span>📱 Apple Pay / Google Pay</span>
              </div>
              
              <div className={styles.deliveryTime}>
                🚚 Доставка: 30-60 минут
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Cart;