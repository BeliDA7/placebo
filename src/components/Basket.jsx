import { useState } from 'react'; // Импорт хук useState из React для управления локальным состоянием компонента
import { XMarkIcon } from '@heroicons/react/24/outline';
import { orders as ordersApi } from '../api'; // Импорт объекта ordersApi из модуля api (содержит методы для работы с заказами)
import { useAuth } from '../context/AuthContext'; // Импорт хук useAuth из контекста аутентификации (даёт доступ к данным пользователя)

/**
 * Вспомогательная функция: возвращает CSS-класс фона-заглушки для товара без изображения.
 * Цвет выбирается на основе id товара, чтобы каждый товар получал свой оттенок ↓.
 */

const getPlaceholderColor = (id) => {
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];
  return colors[id % colors.length];
};

export default function Basket({
  basket = [],                   // по умолчанию, пустой массив товаров в корзине
  onUpdateQuantity,             //  колбэк для обновления количества товара
  onRemoveItem,                // колбэк для удаления товара из корзины
  onClear,                    // колбэк для полной очистки корзины
  onClose,                   // колбэк закрытия панели корзины
  isOpen,                   // флаг, открыта ли корзина
  onOrderSuccess           // колбэк, вызываемый после успешного оформления заказа
}) {
  const { user } = useAuth();                                                               // Получаем объект пользователь (может быть null, если пользователь не авторизован)
  const [isSubmitting, setIsSubmitting] = useState(false);                                 // Локальное состояние: флаг отправки заказа (блокирует кнопку)
  const [formData, setFormData] = useState({ address: '' });                              // Локальное состояние:форма данных (адрес доставки)
  const [showClearConfirm, setShowClearConfirm] = useState(false);                       // Состояние для показа подтверждения очистки корзины
  const [deliveryMethod, setDeliveryMethod] = useState('home');                         // Состояние выбора способа доставки: 'home' (на дом) или 'pharmacy' (самовывоз)

  if (!isOpen) return null;                                                            // Если корзина не открыта — ничего не рендерим/отображаем

  const total = basket.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0); // Вычисление общей суммы корзины: сумма цена товаров на количество

  /**
   * Функция обработчика изменения количества товара.
   * Если количество меньше 1 — удаляет товар, или(else) обновляет количество товара .
   */

  const handleQuantityChange = (itemId, newQuantity) => { 
    if (newQuantity < 1) {
      onRemoveItem(itemId);
    } else {
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Главная функция отправки заказа
    e.preventDefault(); // предотвращаем перезагрузку страницы

    // Проверка для доставки на дом
    if (deliveryMethod === 'home' && !formData.address) { // Если выбран этот метод "Доставка на дом", проверяем, что адресная строка заполнена - любым символом
      alert('Пожалуйста, укажите адрес доставки');
      return;
    }

    // ===== НОВАЯ ЛОГИКА ДЛЯ САМОВЫВОЗА =====
    if (deliveryMethod === 'pharmacy') {
      // Сохраняем данные заказа в localStorage, чтобы использовать выбор аптеки
      localStorage.setItem('pendingOrder', JSON.stringify({
        name: user?.name || 'Гость',
        phone: 'не указан',
        total: total,
        items: basket.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      }));
      // Перенаправляем на страницу выбора аптеки
      window.location.href = '/pharmacies/select';
      return;
    }
    

    // Обычное оформление для доставки на дом
    setIsSubmitting(true); // индикатор загрузки
    try {
      const address = formData.address;

      await ordersApi.create({                     //Отправляем запрос на создание заказа через API
        name: user?.name || 'Гость',
        phone: 'не указан',                       //Заглушка
        address: address,
        total,
        items: basket.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      if (onOrderSuccess) {                  // Вызываем колбэк успешного оформления, если он был удачно передан
        await onOrderSuccess();
      }

      alert('Заказ оформлен! С вами свяжется оператор для уточнения деталей.');
      onClear(); // очищает корзину
      onClose();// закрываем панель корзины
    } catch (err) {
      console.error('Ошибка оформления заказа:', err);
      alert('Ошибка при оформлении заказа. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-2xl bg-white shadow-xl flex flex-col h-full">
          {/* Заголовок */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-medium">Корзина</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Список товаров */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {basket.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Корзина пуста</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {basket.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex gap-3">
                       {/* Плейсхолдер-картинка вместо изображения товара */}
                      <div className={`${getPlaceholderColor(item.id)} w-16 h-16 rounded-md flex items-center justify-center shrink-0`}>
                        <span className="text-xs font-medium text-gray-700 text-center px-1 line-clamp-2">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.price} ₽ × {item.quantity}</p>
                          </div>
                          {/* Блок управления количеством и удалением */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-2 py-1 border rounded hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-2 py-1 border rounded hover:bg-gray-100"
                            >
                              +
                            </button>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Форма заказа и итоги, отображается только если есть товары */}
          {basket.length > 0 && (
            <div className="border-t px-4 py-4">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Итого:</span>
                <span>{total} ₽</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-3">
                  <p className="font-medium text-sm">Способ доставки</p>
                  {/* Радио-кнопки выбора способа доставки */}
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="delivery"
                        value="home"
                        checked={deliveryMethod === 'home'}
                        onChange={() => setDeliveryMethod('home')}
                        className="w-4 h-4 text-green-600"
                      />
                      Доставить на дом
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="delivery"
                        value="pharmacy"
                        checked={deliveryMethod === 'pharmacy'}
                        onChange={() => setDeliveryMethod('pharmacy')}
                        className="w-4 h-4 text-green-600"
                      />
                      Забрать в аптеке
                    </label>
                  </div>

                  {/* Поле ввода адреса, отображается только при выборе "доставка на дом" */}
                  {deliveryMethod === 'home' && (
                    <input
                      type="text"
                      name="address"
                      placeholder="Адрес доставки *"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                      required
                    />
                  )}

                  {/*  БЛОК ДЛЯ САМОВЫВОЗА ===== */}
                  {deliveryMethod === 'pharmacy' && (
                    <p className="text-sm text-gray-500 mt-2">
                      Вы выбрали самовывоз. После нажатия кнопки "Оформить заказ" вы сможете выбрать аптеку на карте.
                    </p>
                  )}
                  {/* ===== КОНЕЦ БЛОКА ===== */}
                </div>

                <button //кнопка оформления заказа
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                </button>
              </form>

              <button //очистить корзину
                onClick={() => setShowClearConfirm(true)}
                className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Очистить корзину
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно подтверждения очистки */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowClearConfirm(false)} />
          <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-3">Очистка корзины</h2>
            <p className="text-gray-600 mb-6">Вы уверены, что хотите удалить все товары из корзины?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  onClear();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Очистить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Компонент реализует боковую панель корзины интернет-магазина (веб-сайт аптеки).
// Отображает список добавленных товаров с возможностью изменения количества, удаления отдельных позиций и полной очистки.
// Поддерживает два способа оформления заказа: доставка на дом (с указанием адреса) и самовывоз из аптеки (с перенаправлением на дубликат карты выбора аптеки).
// Взаимодействует с API через ordersApi.create, а также использует контекст аутентификации для получения имени пользователя. 
