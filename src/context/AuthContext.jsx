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