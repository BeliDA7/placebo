import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { orders as ordersApi, favorites as favoritesApi } from '../api';
import { pharmaciesList } from './PharmacyMap';
import { HeartIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function Account({ onAddToBasket }) { // ===== НОВОЕ: добавлен проп =====
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadOrders();
      loadFavorites();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const data = await ordersApi.get();
      const formatted = data.map(order => ({
        ...order,
        items: order.items ? JSON.parse(order.items) : [],
      }));
      setOrders(formatted);
    } catch (err) {
      console.error('Ошибка загрузки заказов:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const data = await favoritesApi.get();
      const favoriteIds = data.map(item => item.pharmacy_id);
      const favPharmacies = pharmaciesList.filter(p => favoriteIds.includes(p.id));
      setFavorites(favPharmacies);
    } catch (err) {
      console.error('Ошибка загрузки избранного:', err);
      setFavorites([]);
    }
  };

  const deleteAccount = async () => {
    // ... (без изменений)
  };

  if (!user) {
    return <div className="p-8 text-center">Пожалуйста, войдите в аккаунт</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Профиль</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <p><strong>Имя:</strong> {user.name || '—'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="border rounded p-2 text-center">
            <p className="text-sm text-gray-500">Бонусы</p>
            <p className="text-xl font-bold">{user?.bonus || 0} ₽</p>
          </div>
          <div className="border rounded p-2 text-center">
            <p className="text-sm text-gray-500">Возвраты</p>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-1">
          <HeartIcon className="h-5 w-5 text-red-500" />
          Избранные аптеки
        </h2>
        {favorites.length === 0 ? (
          <p>Вы ещё не добавили ни одной аптеки в избранное.</p>
        ) : (
          <ul className="space-y-2">
            {favorites.map(pharmacy => (
              <li key={pharmacy.id} className="border-b pb-2">
                <p className="font-medium">{pharmacy.name}</p>
                <p className="text-sm text-gray-600">{pharmacy.address}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-1">
          <CubeIcon className="h-5 w-5 text-gray-700" />
          История заказов
        </h2>
        {loading ? (
          <p>Загрузка...</p>
        ) : orders.length === 0 ? (
          <p>У вас ещё нет заказов.</p>
        ) : (
          orders.map(order => (
            <div key={order.id} className="border-b py-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Заказ №{order.id} от {new Date(order.created_at).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">Сумма: {order.total} ₽</p>
                  <p className="text-sm text-gray-600">Статус: {order.status}</p>
                  {order.discount > 0 && (
                    <p className="text-sm text-green-600">Скидка: -{order.discount} ₽ (бонусами)</p>
                  )}
                  {order.bonusEarned > 0 && (
                    <p className="text-sm text-blue-600">Начислено бонусов: +{order.bonusEarned} ₽</p>
                  )}
                </div>
                {/* ===== НОВОЕ: кнопка "Повторить заказ" ===== */}
                {onAddToBasket && (
                  <button
                    onClick={() => {
                      order.items.forEach(item => {
                        onAddToBasket(item);
                      });
                      alert('Товары добавлены в корзину');
                    }}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Повторить заказ
                  </button>
                )}
                {/* ===== КОНЕЦ НОВОГО ===== */}
              </div>
              <details>
                <summary className="cursor-pointer text-sm text-green-600">Состав заказа</summary>
                <ul className="mt-2 space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-sm">
                      {item.name} — {item.price} ₽ × {item.quantity}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={logout}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Выйти
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
        >
          Удалить аккаунт
        </button>
      </div>

      {/* Модальное окно удаления аккаунта */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-3">Удаление аккаунта</h2>
            <p className="text-gray-600 mb-6">
              Вы действительно хотите удалить аккаунт? Все ваши данные включая заказы, избранное и бонусы будут потеряны, без возможности восстановления, для подтверждения нажмите удалить 2 раза.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Отмена
              </button>
              <button
                onClick={deleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}