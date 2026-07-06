// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { MapPinIcon,EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Колонка 1: О компании */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Аптека «Плацебо»</h3>
            <p className="text-sm text-gray-400 mb-4">
              Ваша надёжная сеть аптек. Мы заботимся о вашем здоровье с 2021 года. Качественные лекарства, низкие цены, быстрая доставка.
            </p>
            <p className="text-sm text-gray-400 space-y-1">
              <span className="flex items-center gap-1"><MapPinIcon className="h-8 w-8"/> г.Москва, ул. Навигаторов 16 к 3</span>
              <span className="flex items-center gap-1"><PhoneIcon className="h-8 w-8"/>  +7 (555) 555-55-55</span>
              <span className="flex items-center gap-1"><EnvelopeIcon className="h-8 w-8"/> info@placebo.ru</span>
            </p>
          </div>

          {/* Колонка 2: Полезные ссылки */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition">Каталог</Link></li>
              <li><Link to="/pharmacies" className="text-gray-400 hover:text-green-400 transition">Аптеки на карте</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-green-400 transition">Пользовательское соглашение</Link></li>
              <li><Link to="/cookies-info" className="text-gray-400 hover:text-green-400 transition">Что такое cookies?</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Арендаторам и соискателям</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Аренда помещений</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Сотрудничество с юрлицами</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Вакансии в аптеку</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Вакансии в офис</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 transition">Партнёрство</a></li>
            </ul>
          </div>

          {/* Колонка 3: Социальные сети (заглушки) */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Мы в соцсетях</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition text-2xl">📘</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition text-2xl">📸</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition text-2xl">🎵</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition text-2xl">▶️</a>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Подписывайтесь – будьте в курсе акций и новостей.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 Аптека «Плацебо». Учебный проект. Вся информация носит демонстрационный характер.</p>
          <p className="mt-1">
            <Link to="/terms" className="hover:text-green-400">Пользовательское соглашение</Link> | 
            <Link to="/cookies-info" className="ml-2 hover:text-green-400">Политика cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

//Компонент Footer реализует подвал сайта аптечной сети.
// Он содержит следующие информационные блоки:
// О компании — название, описание и контактные данные (адрес, телефон, email), в целях учебного проекта используются вымышленные названия.
// Покупателям — внутренние ссылки на каталог, карту аптек, пользовательское соглашение и информацию о cookies.
// Арендаторам и соискателям — внешние ссылки-заглушки (без реальных URL) на аренду, вакансии, партнёрство.

// В нижней части подвала размещён копирайт с указанием учебного характера проекта и ссылки на правовые документы.
//  Все персональные данные компании (название компании, адрес, телефон, email) вымышлены, все вопадения с реальными названиями случайны.
//  Компонент статический, не принимает пропсов, используется для отображения на всех страницах сайта.