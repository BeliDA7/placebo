import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false); // ===== НОВОЕ =====
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ===== НОВОЕ: проверка согласия =====
    if (!agreed) {
      setError('Для регистрации необходимо согласиться на обработку персональных данных');
      return;
    }
    // ===== КОНЕЦ НОВОГО =====

    console.log('📤 Отправка формы регистрации', { email, password, name });
    setError('');
    try {
      console.log('Вызов register из useAuth');
      await register(email, password, name);
      console.log('Регистрация успешна, переход на главную');
      navigate('/');
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      setError(err.message || 'Ошибка регистрации');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2 px-3"
              required
            />
          </div>

          {/* ===== НОВОЕ: чекбокс согласия ===== */}
          <div className="mb-4">
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 text-green-600 shrink-0"
                required
              />
              <span>
                Я даю своё согласие на обработку персональных данных 
                (имя, email !нивкоим случайе не указывайте настоящие данные ), 
                в ограниченных целях демонстрации учебного проекта. Данные не будут переданы третьим лицам.
              </span>
            </label>
          </div>
          {/* ===== КОНЕЦ НОВОГО ===== */}

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Уже есть аккаунт? <Link to="/login" className="text-green-600">Войдите</Link>
        </p>
      </div>
    </div>
  );
}