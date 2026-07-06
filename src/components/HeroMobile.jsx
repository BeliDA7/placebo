import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon, PhoneIcon, EyeIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { IconPill, IconPills, IconMapSearch } from '@tabler/icons-react';

export default function HeroMobile({
  onSearchSubmit,
  onBasketClick,
  basketCount,
  onPharmacyClick,
  onLogoClick,
  onTogglePanel,
  user,
  logout,
  localSearch,
  handleSubmit,
  handleInputChange,
  clearSearch,
  handleSuggestionClick,
  showSuggestions,
  searchSuggestions,
  open,
  setOpen,
  location,
  navigate,
  catalogCategories,
  staticMenuIcons,
}) {
  const handlePhoneClick = () => {
    alert('+7 (555) 555-55-55'); // или window.location.href = 'tel:+75555555555';
  };

  return (
    <>
      {/* ===== ВЕРХНЯЯ ЗЕЛЁНАЯ СТРОКА ===== */}
      <div className="bg-green-600 text-white text-sm py-2 px-4 flex justify-between items-center">
        <button
          onClick={handlePhoneClick}
          className="flex items-center hover:underline focus:outline-none"
          aria-label="Позвонить"
        >
          <PhoneIcon className="h-5 w-5 text-white" />
        </button>
        <button onClick={onTogglePanel} className="hover:underline focus:outline-none flex items-center gap-1">
          Версия для слабовидящих
          <EyeIcon className="h-7 w-15" />
        </button>
      </div>

      <header className="relative bg-white">
        <nav className="w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            {/* ===== ВТОРАЯ СТРОКА (логотип + поиск + бургер) ===== */}
            <div className="flex items-center justify-between py-2">
              <button
                onClick={(e) => { e.preventDefault(); onLogoClick(); }}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-600"
              >
                <IconPill className="h-7 w-7" />
                <span className="hidden sm:inline">Главная</span>
              </button>

              <div className="flex-1 mx-2">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={location.pathname === "/pharmacies" ? "Поиск аптеки" : "Поиск лекарства"}
                      value={localSearch}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg py-1 pl-3 pr-24 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                    />
                    {localSearch && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    )}
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-2 py-0.5 rounded-md text-xs"
                    >
                       <MagnifyingGlassIcon className="h-4 w-4 sm:hidden" />
                       <span className="hidden sm:inline">Найти</span>
                    </button>
                  </div>
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((suggestion, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </form>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="p-1 rounded-md text-gray-700 hover:text-green-600"
              >
                <Bars3Icon className="h-7 w-7" />
              </button>
            </div>

            {/* ===== ТРЕТЬЯ СТРОКА (Аптеки слева, Профиль справа) ===== */}
            <div className="flex justify-between items-center py-2 border-t border-gray-100">
              <button
                onClick={onPharmacyClick}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-600"
              >
                Аптеки
                <IconMapSearch className="h-7 w-7" />
              </button>

              <Link
                to={user ? "/account" : "/login"}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-600"
              >
                Профиль
                <UserCircleIcon className="h-7 w-7" />
              </Link>
            </div>

            {/* ===== МОБИЛЬНОЕ МЕНЮ (Dialog) ===== */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
              <DialogBackdrop className="fixed inset-0 bg-black/25" />
              <div className="fixed inset-0 z-40 flex">
                <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    >
                      <XMarkIcon className="size-6" />
                    </button>
                  </div>
                  <div className="mt-4 px-4">
                    <div className="space-y-4">
                      <div className="border-b pb-2">
                        <div className="font-medium text-gray-900 flex items-center gap-1">
                          <IconPills className="h-5 w-5" />
                          Лекарственные препараты
                        </div>
                        <div className="mt-2 ml-2 space-y-1">
                          {catalogCategories.map(cat => (
                            <a
                              key={cat.id}
                              href={`/catalog/${cat.id}`}
                              onClick={(e) => { e.preventDefault(); navigate(`/catalog/${cat.id}`); setOpen(false); }}
                              className="block text-sm text-gray-600 hover:text-green-600"
                            >
                              {cat.name}
                            </a>
                          ))}
                        </div>
                      </div>
                      {Object.entries(staticMenuIcons).map(([name, Icon]) => (
                        <div key={name}>
                          <a href="#" className="font-medium text-gray-900 flex items-center gap-2">
                            <Icon className="h-5 w-5" />
                            {name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6 mt-4">
                    <Link to="/register" className="block text-sm font-medium text-gray-700 hover:text-green-600">
                      Регистрация
                    </Link>
                    <Link to="/login" className="block text-sm font-medium text-gray-700 hover:text-green-600">
                      Вход
                    </Link>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>

          </div>
        </nav>
      </header>
    </>
  );
}

//
// Компонент HeroMobile представляет собой мобильную версию главной навигационной панели интернет-аптеки. В отличие от десктопной, она оптимизирована для узких экранов и включает:
// 1 зелёная строка — кнопка телефона (показывает alert с номером) и кнопка «Версия для слабовидящих».
// 2 строка — логотип/кнопка «Главная», поисковая строка с подсказками и кнопка бургер-меню.
// 3 строка — быстрые ссылки: «Аптеки» (с иконкой карты) и «Профиль» (ведёт на /account для авторизованных, для обычных пользователей на /login).

// Выезжающее мобильное меню (Dialog) — открывается по бургеру, содержит:
// категории лекарственных препаратов (динамически из catalogCategories),
// статичные разделы каталога (медтехника, реабилитация, витамины и т.д.),
// ссылки «Регистрация» и «Вход» (дублируются внизу меню, даже если пользователь уже авторизован.

// Компонент получает все необходимые данные и колбэки через пропсы от родительского Hero, что позволяет легко менять поведение без дублирования логики. 
// Функциональность корзины в мобильном хедере не отображается (счётчик не используется, кнопка отсутствует) — доступ к корзине осуществляется через BottomNav. 
// Кнопка телефона не совершает звонок, а просто выводит номер в alert.

