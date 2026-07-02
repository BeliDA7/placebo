import { Link, useLocation } from 'react-router-dom';
import {
  IconHome,
 // IconCategory,
  IconMapSearch,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons-react';

export default function BottomNav({ basketCount, onBasketClick, user }) {
  const location = useLocation();

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

        // Корзина – модальное окно
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