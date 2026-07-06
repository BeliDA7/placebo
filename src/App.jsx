import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Basket from './components/Basket';
import ProductCard from './components/ProductCard';
import PharmacyMap from './pages/PharmacyMap';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CookieConsent from './components/CookieConsent';
import Terms from './pages/Terms';
import CookiesInfo from './pages/CookiesInfo';
import AccessibilityPanel from './components/AccessibilityPanel';
import CatalogPage from './pages/CatalogPage';
import { allProducts } from './data/allProducts';
import { AuthProvider, useAuth } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import { cart as cartApi } from './api';
import Account from './pages/Account';
import SearchResults from './pages/SearchResults';
import BottomNav from './components/BottomNav';
import PharmacyMapSelect from './pages/PharmacyMapSelect';

function AppContent() {
  const [basket, setBasket] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, token, loading, refreshUser } = useAuth();


  useEffect(() => {
      if (location.pathname === '/') {
        setSearchQuery('');
        setSearchTrigger(0);

        if (user) {
          loadCart();
        }
      }
    }, [location.pathname, user]);

  // Загрузка корзины с сервера при входе
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setBasket([]);
    }
  }, [user]);

  useEffect(() => {
    if (isBasketOpen) {
      setIsBasketOpen(false);
      }
    }, [location.pathname]);
  

  const loadCart = async () => {
    try {
      const cartData = await cartApi.get();
      setBasket(cartData);
    } catch (err) {
      console.error('Ошибка загрузки корзины:', err);
    }
  };

  const togglePanel = () => setIsPanelOpen(prev => !prev);

  const addToBasket = (product) => {
    if (!user) {
      alert('Для добавления товаров в корзину необходимо войти');
      navigate('/login');
      return;
    }
    setBasket(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Отправка на сервер (если пользователь авторизован)
    if (user) {
      cartApi.add(product).catch(err => {
        console.error('Ошибка синхронизации добавления:', err);
        // Можно откатить или показать уведомление
      });
    }
  };

  const updateBasketItem = (productId, quantity) => {
    // Локальное обновление
    setBasket(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    // Отправка на сервер
    if (user) {
      cartApi.update(productId, quantity).catch(err => {
        console.error('Ошибка синхронизации обновления:', err);
        // Можно откатить или показать уведомление
      });
    }
  };

  const removeBasketItem = (productId) => {
    // Локальное обновление
    setBasket(prev => prev.filter(item => item.id !== productId));

    // Отправка на сервер
    if (user) {
      cartApi.remove(productId).catch(err => {
        console.error('Ошибка синхронизации удаления:', err);
        // Можно откатить или показать уведомление
      });
    }
  };

  const clearBasket = () => {
    setBasket([]);
    if (user) {
      cartApi.clear().catch(err => {
        console.error('Ошибка очистки корзины:', err);
      });
    }
  };

  // const response = await ordersApi.create(orderData);
  // if (response) {
  //   await refreshUser();
  // }


  const basketCount = basket.reduce((sum, item) => sum + item.quantity, 0);

  const handleGlobalSearch = (query) => {
  setSearchQuery(query);
  setSearchTrigger(prev => prev + 1);
  const trimmed = query.trim();
  if (!trimmed) {
    // Если запрос пустой, не переходим на /search и не делаем ничего
    // Можно также сбросить searchQuery, если нужно, но это не обязательно
    return;
  }
  
  // Если мы на странице аптек — не перенаправляем на /search
  if (!location.pathname.startsWith('/pharmacies')) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }
};

  const filteredProducts = location.pathname === '/'
    ? allProducts.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Загрузка...</div>;
  }

  return (
    <div>
      <Hero
        onSearchSubmit={handleGlobalSearch}
        onBasketClick={() => setIsBasketOpen(true)}
        basketCount={basketCount}
        onPharmacyClick={() => navigate('/pharmacies')}
        onLogoClick={() => navigate('/')}
        onCatalogClick={() => navigate('/')}
        onTogglePanel={togglePanel}
      />

      <Routes>
        <Route path="/" element={<HomePage onAddToBasket={addToBasket} products={filteredProducts} />} />
        <Route path="/product/:id" element={<ProductPage onAddToBasket={addToBasket} />} />
        <Route path="/pharmacies" element={<PharmacyMap searchQuery={searchQuery} searchTrigger={searchTrigger} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/catalog/:categoryId" element={<CatalogPage onAddToBasket={addToBasket} searchQuery={searchQuery} />} />
        <Route path="/cookies-info" element={<CookiesInfo />} />
        <Route path="/account" element={<Account onAddToBasket={addToBasket} />} /> 
        <Route path="/search" element={<SearchResults onAddToBasket={addToBasket} />} />
        <Route path="/pharmacies/select" element={<PharmacyMapSelect searchQuery={searchQuery} searchTrigger={searchTrigger} />} />
      </Routes>

      <Basket
        basket={basket}
        onUpdateQuantity={updateBasketItem}
        onRemoveItem={removeBasketItem}
        onClear={clearBasket}
        onClose={() => setIsBasketOpen(false)}
        isOpen={isBasketOpen}
        onOrderSuccess={refreshUser}
      />
      <CookieConsent />
      <AccessibilityPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
        <div className="lg:hidden pb-16">
          <BottomNav
          basketCount={basketCount}
          onBasketClick={() => setIsBasketOpen(true)}
          user={user}/>
        </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

// App.jsx — корневой компонент всего фронтенд-приложения.
// Он выполняет роль «мозга», связывающего все компоненты воедино, и управляет глобальным состоянием. Основные функции:

// Аутентификация: оборачивает приложение в AuthProvider и использует useAuth для получения пользователя, токена, загрузки профиля.

// Корзина: управляет состоянием корзины (basket), синхронизирует его с сервером через API (cartApi).
// Предоставляет методы addToBasket, updateBasketItem, removeBasketItem, clearBasket и вычисляет basketCount для бейджа.

// Поиск: обрабатывает глобальный поиск (handleGlobalSearch), передаёт searchQuery и searchTrigger в хедер и на соответствующие страницы, перенаправляет на /search.

// Маршрутизация: определяет все маршруты 
// (/, /product/:id, /pharmacies, /register, /login, /terms, /catalog/:categoryId, /cookies-info, /account, /search, /pharmacies/select)
// и связывает их с компонентами страниц.

// Глобальные UI-элементы: хедер Hero, боковая панель корзины Basket, баннер CookieConsent, панель доступности AccessibilityPanel, нижняя навигация BottomNav.
// Сброс поиска при возврате на главную, закрытие корзины при переходе на другую страницу, загрузка корзины при входе пользователя.

// В целом App.jsx — это центральный хаб, через который проходят все данные и колбэки, обеспечивающий связность приложения.