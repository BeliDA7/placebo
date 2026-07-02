// src/components/CookieConsent.jsx
import { useState, useEffect } from 'react';
//mport { IconCookie } from '@tabler/icons-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-green-600 p-4 z-50 flex flex-wrap justify-between items-center gap-4">
      <div className="text-sm text-gray-700">
        {/* <IconCookie className="h-5 w-5 text-gray-600" /> */}
        🍪 Мы используем cookies для улучшения работы сайта.
        <a href="/terms" className="text-green-600 hover:underline ml-1">Пользовательское соглашение</a>
        <span className="mx-1">|</span>
        <a href="/cookies-info" className="text-green-600 hover:underline ml-1">Нажмите для более подробной информации о файлах cookies</a>
      </div>
      <div className="flex gap-2">
        <button onClick={reject} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
          Отклонить
        </button>
        <button onClick={accept} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Принять
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;