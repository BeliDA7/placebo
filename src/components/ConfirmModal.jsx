// src/components/ConfirmModal.jsx
export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

// Компонент ConfirmModal — это переиспользуемое модальное окно подтверждения. 
// Оно не привязано к конкретному действию и может использоваться в любом месте приложения, где требуется подтверждение пользователя перед выполнением критической операции.
// Пропсы:
//isOpen — флаг открытия/закрытия окна.
//onClose — функция, вызываемая при отмене (клик по фону или кнопка «Отмена»).
//onConfirm — функция, вызываемая при подтверждении (кнопка «Удалить»).
//title — текст заголовка окна.
//message — текст предупреждения/описания.

