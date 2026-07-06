// Импорт компонентов Link и хука useLocation из react-router-dom для навигации и определения текущего пути
import { Link, useLocation } from 'react-router-dom';
import {
  IconHome,
 // IconCategory,
  IconMapSearch,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react';

export default function BottomNav({ basketCount, onBasketClick, user }) {
  const location = useLocation(); //  Получить текущий объект location, содержащий путь, для подсветки активной ссылки
  
  // Массив конфигурации пунктов нижней навигации
  const navItems = [
    { path: '/', icon: IconHome, label: 'Главная' },
    //{ path: '/catalog', icon: IconCategory, label: 'Каталог' },
    { path: '/pharmacies', icon: IconMapSearch, label: 'Аптеки' },
    { path: '/basket', icon: IconShoppingCart, label: 'Корзина', isBasket: true },
    { path: user ? '/account' : '/login', icon: IconUser, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg z-50 flex justify-around items-center h-16 px-2 md:px-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        // Корзина – модальное окно - рендерим как кнопку (вызывает onBasketClick вместо перехода)
        if (item.isBasket) {
          return (
            <button
              key={item.path}
              onClick={onBasketClick}
              className="flex flex-col items-center justify-center text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {basketCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] text-white">
                    {basketCount}
                  </span>
                )}
              </div>
              <span className="mt-1 hidden sm:inline">{item.label}</span>
            </button>
          );
        }

        // Обычные ссылки
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center text-xs font-medium transition-colors ${
              isActive ? 'text-green-600' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="mt-1 hidden sm:inline">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

// Компонент BottomNav представляет собой нижнюю панель навигации мобильного приложения ( адаптивный сайт).
// Она зайиксированна внизу экрана и содержит четыре основные иконки:
// Главная (ссылка /)
// Аптеки (ссылка /pharmacies)
// Корзина (кнопка, открывающая модальное окно корзины)
//Профиль (ссылка на /account для авторизованных пользователей или /login для гостей)

// Для каждого пункта, кроме корзины, используется компонент Link из React Router.
// Корзина реализована как <button>, чтобы вызывать переданный колбэк onBasketClick (открывающий боковую панель корзины, не перезагружая страницу).
// На кнопке корзины динамически отображается счётчик количества товаров (basketCount), когда он больше нуля.
// Текущий активный маршрут подсвечивается зелёным цветом (text-green-600). 
// На узких экранах подписи к иконкам скрываются, на более широких (sm:) становятся видимыми.

// Компонент принимает пропсы:
// basketCount – количество позиций в корзине,
// onBasketClick – функция-обработчик клика по корзине,
// user – объект пользователя (или null), чтобы определить, показывать ли /account или /login.