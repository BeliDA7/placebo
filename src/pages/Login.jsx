import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(identifier, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Вход</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email или телефон</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
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
          <p className="text-xs text-gray-400 text-center mb-4">
            ⚠️ Учебный проект. Не вводите реальные данные.
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Войти
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Нет аккаунта? <Link to="/register" className="text-green-600">Зарегистрируйтесь</Link>
        </p>
      </div>
    </div>
  );
}

// Компонент Login представляет страницу аутентификации пользователя.
// Он содержит:

// Форму входа с полями «Email или телефон» и «Пароль».

// Валидацию на уровне HTML (атрибут required на обоих полях).
// Предупреждение о том, что проект учебный и не следует вводить реальные данные.

// Обработку отправки формы через асинхронную функцию handleSubmit, которая вызывает метод login из контекста AuthContext. 
// При успехе перенаправляет на главную, при ошибке отображает сообщение.

// Ссылку на страницу регистрации для новых пользователей.
// Он полностью зависит от AuthContext для выполнения логики аутентификации и навигации.
// В работающей версии рекомендуется реализовать каптчу или сложной валидацию.