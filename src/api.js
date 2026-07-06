const API_URL = '/api';

const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Ошибка запроса');
  return data;
};

export const auth = {
  register: (email, password, name) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getMe: () => request('/auth/me'),
};

export const cart = {
  get: () => request('/cart'),
  add: (product) =>
    request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ product }),
    }),
  update: (productId, quantity) =>
    request('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    }),
  remove: (productId) =>
    request(`/cart/item/${productId}`, { method: 'DELETE' }),
  clear: () => request('/cart/clear', { method: 'DELETE' }),
};

export const orders = {
  create: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  get: () => request('/orders'),
};

export const favorites = {
  get: () => request('/favorites'),
  add: (pharmacyId) => request('/favorites/add', { method: 'POST', body: JSON.stringify({ pharmacyId }) }),
  remove: (pharmacyId) => request(`/favorites/remove/${pharmacyId}`, { method: 'DELETE' }),
};

// Модуль api.js — централизованный API-клиент, через который фронтенд взаимодействует с бэкендом.
 
// Он инкапсулирует всю логику HTTP-запросов и предоставляет готовые методы для работы с основными сущностями приложения: 

// Функция request() — универсальная обёртка над fetch.
// Автоматически: устанавливает заголовок Content-Type:
// application/json,добавляет JWT-токен в заголовок Authorization (если пользователь авторизован),
// парсит JSON-ответ, выбрасывает ошибку с сообщением от сервера при неудачном статусе ответа.
// auth — методы регистрации, входа и получения профиля.
// cart — методы работы с корзиной: получение, добавление, обновление количества, удаление товара, полная очистка.
// orders — создание заказа и получение истории заказов.
// favorites — получение, добавление и удаление аптек из избранного.

// Модуль использует относительный путь /api, что предполагает настройку проксирования на стороне разработки (Vite) и/или продакшена (Netlify → Railway).
// Это ключевой файл, связывающий клиентскую часть с серверной логикой, и все компоненты приложения, требующие данных с сервера, обращаются к нему.