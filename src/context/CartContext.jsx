import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Создаем контекст
const CartContext = createContext();

// Загрузка корзины из localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('coffeeShopCart');
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  } catch {
    return { items: [] };
  }
};

// Сохранение корзины в localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('coffeeShopCart', JSON.stringify(cart));
  } catch (error) {
    console.error('Ошибка сохранения корзины:', error);
  }
};

// Редуктор для управления состоянием корзины
const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
      break;
      
    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      break;
      
    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
      break;
      
    case 'CLEAR_CART':
      newState = {
        ...state,
        items: [],
      };
      break;
      
    default:
      newState = state;
  }
  
  // Сохраняем новое состояние в localStorage
  saveCartToStorage(newState);
  return newState;
};

// Провайдер контекста
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  // Общее количество товаров (сумма всех quantity)
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Общая стоимость
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Функция добавления в корзину
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  // Функция удаления из корзины
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  // Функция обновления количества
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  // Функция очистки корзины
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Значение контекста
  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};