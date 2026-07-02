// src/pages/CookiesInfo.jsx
import { Link } from 'react-router-dom';

const CookiesInfo = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl pb-40">
      <Link to="/" className="inline-block mb-6 text-green-600 hover:underline">
        ← Назад на главную страницу
      </Link>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Что такое файлы cookie?</h1>
      <div className="space-y-6 text-gray-700">
        <p className="mb-2 text-gray-700">
          Файлы cookie — это небольшие текстовые файлы, которые веб-сайт сохраняет на вашем устройстве при посещении. Они помогают сайту запоминать ваши действия и предпочтения, чтобы вам не приходилось заново вводить их при каждом визите.
        </p>
        <h2 className="text-xl font-semibold text-gray-800">Какие cookie мы используем?</h2>
        <ul className="list-disc pl-5">
          <li><strong>Строго необходимые</strong> — без них сайт не может нормально работать (например, для сохранения корзины).</li>
          <li><strong>Функциональные</strong> — запоминают ваши настройки, такие как версия для слабовидящих.</li>
          <li><strong>Аналитические</strong> — помогают нам улучшать работу сайта (не передаются третьим лицам).</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800">Как управлять cookie?</h2>
        <p className="mb-2 text-gray-700">
          Вы можете изменить настройки cookie в любое время через наш баннер согласия. Также вы можете настроить ваш браузер на блокировку или удаление cookie.
        </p>
        <p className="text-sm text-gray-500 mt-8">
          Информация не передаётся третьим лицам.
        </p>
      </div>
    </div>
  );
};

export default CookiesInfo;