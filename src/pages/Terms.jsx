import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-white text-gray-900">
      <Link to="/" className="inline-block mb-6 text-green-600 hover:underline">
        ← Назад на главную страницу
      </Link>
      <h1 className="text-3xl font-bold text-green-700 mb-6">Пользовательское соглашение</h1>
      <p className="mb-2 text-gray-700">Данный сайт является учебным проектом. Вся информация носит демонстрационный характер. Сайт не собирает личные персональные данные</p>
      <p className="mb-2 text-gray-700">Убедительная просьба не указывать настоящую информацию при регистрации в личном кабинете.</p>
      <p className="mb-2 text-gray-700">Файлы cookie используются только для сохранения настроек и корзины.</p>
      <p className="mt-4">Используя сайт, вы соглашаетесь с условиями данного соглашения.</p>
    </div>
  );
};
export default Terms;