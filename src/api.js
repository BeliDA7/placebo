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