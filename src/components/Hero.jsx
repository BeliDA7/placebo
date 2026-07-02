import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { catalogCategories } from '../data/catalogCategories';
import { allProducts } from '../data/allProducts';
import { pharmaciesList } from '../pages/PharmacyMap';
import { useAuth } from '../context/AuthContext';
import {
  PhoneIcon,
  EyeIcon,
  UserCircleIcon,
  ShoppingCartIcon,
  UserPlusIcon,
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { IconPill, IconMapSearch, IconPills } from '@tabler/icons-react';
import {
  IconStethoscope,
  IconWheelchair,
  IconBabyCarriage,
  IconPill as IconPillAlt,
  IconSparkles,
  IconBath,
} from '@tabler/icons-react';

import HeroMobile from './HeroMobile';

// Названия товаров и аптек для подсказок
const productNames = allProducts.map(p => p.name);
const pharmacyAddresses = pharmaciesList.map(p => p.address);

export default function Hero({
  onSearchSubmit = () => {},
  onBasketClick = () => {},
  basketCount = 0,
  onPharmacyClick = () => {},
  onLogoClick = () => {},
  onCatalogClick = () => {},
  onTogglePanel = () => {}
}) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const staticMenuIcons = {
    'Медицинская техника': IconStethoscope,
    'Товары для реабилитации': IconWheelchair,
    'Малыш и мама': IconBabyCarriage,
    'Витамины и БАДы': IconPillAlt,
    'Косметика': IconSparkles,
    'Гигиена': IconBath,
  };

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(localSearch);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
  const value = e.target.value;
  setLocalSearch(value);

  if (value.trim().length > 0) {
    let filtered;
    if (location.pathname.startsWith('/pharmacies')) {
      // На странице аптек – показываем только адреса аптек
      filtered = pharmacyAddresses.filter(addr =>
        addr.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      // На других страницах – только товары
      filtered = productNames.filter(name =>
        name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSearchSuggestions(filtered.slice(0, 10));
    setShowSuggestions(true);
  } else {
    setSearchSuggestions([]);
    setShowSuggestions(false);
  }
};

  const clearSearch = () => {
    setLocalSearch('');
    setSearchSuggestions([]);
    setShowSuggestions(false);
    onSearchSubmit('');
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalSearch(suggestion);
    setShowSuggestions(false);
    onSearchSubmit(suggestion);
  };

  const mobileProps = {
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
  };

  return (
    <div className="bg-white sticky top-0 z-40">
      {isDesktop ? (
        // ===== ДЕСКТОПНАЯ ВЕРСИЯ =====
        <>
          {/* Верхняя зелёная строка */}
          <div className="bg-green-600 text-white text-sm py-2 px-4 flex justify-between items-center">
            <span className="flex items-center gap-1">
              <PhoneIcon className="h-5 w-5 text-white" />
              +7 (555) 555-55-55
            </span>
            <button onClick={onTogglePanel} className="hover:underline focus:outline-none flex items-center gap-1">
              Версия для слабовидящих
              <EyeIcon className="h-7 w-15" />
            </button>
          </div>

          <header className="relative bg-white">
            <nav aria-label="Top" className="w-full px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex flex-wrap items-center gap-3 py-3 lg:py-0 lg:h-16">
                  {/* Левая группа */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => { e.preventDefault(); onLogoClick(); }}
                      className="text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap flex items-center gap-1 p-1 rounded-lg border border-gray-300 hover:border-green-500 transition-colors"
                    >
                      <IconPill className="h-8 w-8" />
                      Главная
                    </button>

                    <div className="hidden lg:block">
                      <Popover className="relative">
                        {({ open: popoverOpen }) => (
                          <>
                            <PopoverButton
                              className={clsx(
                                popoverOpen ? 'text-gray-900' : 'text-gray-700',
                                "group inline-flex items-center text-sm font-medium hover:text-green-600"
                              )}
                            >
                              <span>Каталог</span>
                              <Bars3Icon className="h-7 w-7 ml-2" />
                            </PopoverButton>

                            <PopoverPanel
                              transition
                              className="absolute left-0 z-20 mt-3 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                            >
                              <div className="py-2">
                                <Menu as="div" className="relative">
                                  <MenuButton className="flex w-full justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span className="flex items-center gap-1">
                                      <IconPills className="h-5 w-5" />
                                      Лекарственные препараты
                                    </span>
                                    <ChevronDownIcon className="h-3 w-3 ml-2" aria-hidden="true" />
                                  </MenuButton>
                                  <MenuItems
                                    anchor="right start"
                                    className="absolute left-full top-0 ml-1 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30"
                                  >
                                    <div className="py-2">
                                      {catalogCategories.map(cat => (
                                        <MenuItem key={cat.id}>
                                          {({ active }) => (
                                            <a
                                              href={`/catalog/${cat.id}`}
                                              onClick={(e) => { e.preventDefault(); navigate(`/catalog/${cat.id}`); }}
                                              className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-green-600' : 'text-gray-700'} flex items-center gap-2`}
                                            >
                                              {cat.name}
                                            </a>
                                          )}
                                        </MenuItem>
                                      ))}
                                    </div>
                                  </MenuItems>
                                </Menu>
                                {Object.entries(staticMenuIcons).map(([name, Icon]) => (
                                  <a key={name} href="#" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                                    <Icon className="h-5 w-5" />
                                    {name}
                                  </a>
                                ))}
                              </div>
                            </PopoverPanel>
                          </>
                        )}
                      </Popover>
                    </div>

                    <button
                      onClick={onPharmacyClick}
                      className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap"
                    >
                      Аптеки
                      <IconMapSearch className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Поиск */}
                  <div className="flex-1 mx-4">
                    <form onSubmit={handleSubmit} className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={location.pathname.startsWith("/pharmacies") ? "Поиск аптеки" : "Поиск лекарства"}
                          value={localSearch}
                          onChange={handleInputChange}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          onFocus={() => {
                            if (localSearch.trim().length > 0 && searchSuggestions.length > 0) {
                              setShowSuggestions(true);
                            }
                          }}
                          className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-28 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {localSearch && (
                          <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl leading-none"
                          >
                            ×
                          </button>
                        )}
                        <button
                          type="submit"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition text-sm"
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

                  {/* Правая группа */}
                  <div className="flex items-center gap-3 shrink-0">
                    {user ? (
                      <>
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap flex items-center gap-1">
                          <UserCircleIcon className="h-7 w-7" />
                          {user.name || user.email}
                        </span>
                        <Link to="/account" className="text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap">
                          Личный кабинет
                        </Link>
                        <button onClick={() => logout()} className="text-sm text-red-500 hover:text-red-700 whitespace-nowrap">
                          Выйти
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap flex items-center gap-1">
                          Регистрация
                          <UserPlusIcon className="h-6 w-6" />
                        </Link>
                        <span className="text-gray-300"></span>
                        <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap flex items-center gap-1">
                          Вход
                          <UserIcon className="h-6 w-6" />
                        </Link>
                      </>
                    )}
                    <button
                      onClick={onBasketClick}
                      className="ml-2 text-sm font-medium text-gray-700 hover:text-green-600 whitespace-nowrap flex items-center gap-1"
                    >
                      Корзина
                      <ShoppingCartIcon className="h-6 w-6 ml-2" />
                      {basketCount > 0 && (
                        <span className="inline-flex items-center justify-center rounded-full bg-green-600 px-2 py-0.5 text-xs text-white">
                          {basketCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </>
      ) : (
        <HeroMobile {...mobileProps} />
      )}
    </div>
  );
}