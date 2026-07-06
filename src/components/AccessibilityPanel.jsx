import { useAccessibility } from '../context/AccessibilityContext'; // Импорт настраимоего хука для работы с контекстом accessibility

const AccessibilityPanel = ({ isOpen = false, onClose = () => {} }) => { // Деструктурируем значения и методы из контекста accessibility
  const { 
    highContrast,// boolean: включён ли высокий контраст
    fontSize,// string: 'normal', 'large', 'xlarge'
    toggleHighContrast, // функция переключения контраста
    increaseFontSize, // увеличить шрифт
    decreaseFontSize, // уменьшить шрифт
    resetFontSize // сбросить на стандартный режим, сбросить настройки

  } = useAccessibility(); 

  if (!isOpen) return null; // Если панель не открыта, компонент прерывает свою работу и возвращает null, рендеринг не происходит, React ничего не показывает на странице

  return (
    // Контейнер панели: фиксированное позиционирование, белый фон, тень, рамка
    <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-xl p-4 border border-gray-200 flex flex-col gap-3 min-w-220px"> 
    {/* Заголовок и кнопка закрытия */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Настройки доступности</span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>

      {/* Кнопки изменения размера шрифта */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm">Размер шрифта:</span>
        <div className="flex gap-1">
          <button 
            onClick={decreaseFontSize} 
            className={`px-2 py-1 text-xs rounded ${fontSize !== 'normal' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-green-100 text-green-800'}`} // Если шрифт нормальный, кнопка неактивна
          >
            A-
          </button>
          <button 
            onClick={increaseFontSize} 
            className={`px-2 py-1 text-xs rounded ${fontSize === 'large' || fontSize === 'xlarge' ? 'bg-green-100 text-green-800' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            A+
          </button>
          <button 
            onClick={resetFontSize} 
            className="px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
          >
            Сброс
          </button>
        </div>
      </div>

      {/* Кнопка высокого контраста */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm">Высокий контраст:</span>
        <button
          onClick={toggleHighContrast}
          className={`px-3 py-1 text-sm rounded ${highContrast ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {highContrast ? 'Выключить' : 'Включить'}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">Настройки сохраняются автоматически</p>
    </div>
  );
};

export default AccessibilityPanel;

//  Компонент реализует интерфейс панели специальных возможностей (версия для слабовидящих).
//  Позволяет пользователю менять размер шрифта и включать/выключать высококонтрастный режим.
//  Состояние хранится в контексте AccessibilityContext и применяется глобально.