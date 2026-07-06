import { createContext, useContext, useState, useEffect } from 'react';
import { auth, cart as cartApi } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Проверка токена при загрузке
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const userData = await auth.getMe();
      setUser(userData);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email, password) => {
    const data = await auth.login(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, name) => {
    const data = await auth.register(email, password, name);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  const refreshUser = async () => {
    try {
      const userData = await auth.getMe();
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Ошибка обновления пользователя:', err);
      // Если ошибка — просто возвращаем null, не ломаем приложение
      return null;
    }
  };

  const value = { user, token, loading, login, register, logout,refreshUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Модуль AuthContext реализует централизованное управление аутентификацией в приложении. 
// Он включает: Контекст AuthContext и провайдер AuthProvider, которые обеспечивают доступ к данным авторизованного пользователя и методам входа/выхода из любого компонента через хук useAuth.
// Состояния: user (объект пользователя), token (JWT из localStorage), loading (флаг загрузки профиля при старте).
// Инициализация при загрузке: если в localStorage сохранён токен, происходит проверка его валидности через auth.getMe(); при успехе user заполняется, при ошибке – автоматический выход.

// Методы:

// login(email, password) – аутентификация, сохранение токена и данных пользователя.
// register(email, password, name) – регистрация с аналогичным сохранением ипнфоирмации о пользователе.
// logout() – очистка токена и состояния, полное перенаправление на главную страницу.
// refreshUser() – повторная загрузка профиля (без выхода при ошибке).

// Взаимодействие с API через импортированный объект auth (методы login, register, getMe). 


// Провайдер оборачивает всё приложение, делая состояние аутентификации доступным повсеместно. 
// Модуль является ключевым для работы закрытых маршрутов, отображения имени пользователя в интерфейсе и выполнения действий, требующих авторизации (например, добавления в корзину).

