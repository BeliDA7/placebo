import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { catalogCategories } from '../data/catalogCategories';
//import { catalogProducts } from '../data/catalogProducts';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/allProducts';

export default function CatalogPage({ onAddToBasket, searchQuery = '' }) {
  const { categoryId } = useParams();
  const category = catalogCategories.find(c => c.id === parseInt(categoryId));

  // Фильтры
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [prescriptionFilter, setPrescriptionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9;

  if (!category) {
    return <div className="container mx-auto p-8">Категория не найдена</div>;
  }

  let products = allProducts.filter(p => p.categoryId === parseInt(categoryId));

//serach

  if (searchQuery.trim()) {
     console.log();
    
    products = products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Фильтр по цене
  if (minPrice !== '') {
    const min = Number(minPrice);
    if (!isNaN(min)) products = products.filter(p => p.price >= min);
  }
  if (maxPrice !== '') {
    const max = Number(maxPrice);
    if (!isNaN(max)) products = products.filter(p => p.price <= max);
  }

  // Фильтр по рецепту
  if (prescriptionFilter === 'prescription') {
    products = products.filter(p => p.prescription === true);
  } else if (prescriptionFilter === 'no-prescription') {
    products = products.filter(p => p.prescription === false);
  }

  const setPriceRange = (min, max) => {
    setMinPrice(min !== null ? min.toString() : '');
    setMaxPrice(max !== null ? max.toString() : '');
  };

  const handleResetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setPrescriptionFilter('all');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Фильтры – на мобилках внизу, на десктопе справа */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Основной контент (слева на десктопе) */}
        <div className="flex-1 order-2 md:order-1">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">{category.name}</h1>
          <p className="text-gray-600 mb-6">{category.description}</p>

          {products.length === 0 ? (
            <p className="text-gray-500">Нет товаров, соответствующих выбранным фильтрам.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} onAddToBasket={onAddToBasket} />
                ))}
              </div> 

              {/* Имитация пагинации */}
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <p className="text-center text-gray-400 text-sm mt-2">
                Показаны все товары по выбранным фильтрам. Нумерация страниц – визуальный элемент.
              </p>
            </>
          )}
        </div>

        {/* Фильтры – на мобилках внизу, на десктопе справа */}
        <div className="w-full md:w-64 order-1 md:order-2 mb-6 md:mb-0">
          <div className="bg-gray-50 p-4 rounded-lg sticky top-20">
            <h3 className="font-bold text-lg mb-3">Фильтры</h3>

            {/* Цена */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Цена (₽)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  placeholder="от"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="до"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setPriceRange(null, 350)} className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100">до 350</button>
                <button onClick={() => setPriceRange(350, 700)} className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100">350–700</button>
                <button onClick={() => setPriceRange(700, 1000)} className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100">700–1000</button>
                <button onClick={() => setPriceRange(1000, null)} className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100">от 1000</button>
              </div>
            </div>

            {/* Рецепт */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Рецепт</label>
              <select
                value={prescriptionFilter}
                onChange={(e) => setPrescriptionFilter(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
              >
                <option value="all">Все</option>
                <option value="prescription">Требуют рецепт</option>
                <option value="no-prescription">Без рецепта</option>
              </select>
            </div>

            <button onClick={handleResetFilters} className="w-full bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300 text-sm">
              Сбросить фильтры
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент CatalogPage представляет страницу каталога товаров конкретной категории (например, «Противоаллергическое», «Витамины»).
// Он получает categoryId из URL, 
// находит соответствующую категорию в статическом массиве catalogCategories и отображает товары, принадлежащие этой категории, из общего массива allProducts.

//  Основные функции:
// Отображение товаров в виде сетки карточек ProductCard.
// Фильтрация по цене (минимальная/максимальная, включая быстрые диапазоны), по наличию рецепта (все / требуют рецепт / без рецепта) и по поисковому запросу, переданному через проп searchQuery.
// Сброс фильтров до исходного состояния.
// Имитация пагинации: визуальные кнопки страниц (1–9), не влияющие на реальную разбивку товаров; все товары показываются сразу.
// Адаптивная вёрстка: на мобильных фильтры сверху, на десктопах — справа в сайдбаре.
// Компонент принимает проп onAddToBasket для добавления товара в корзину и опциональный searchQuery для фильтрации по названию (обычно приходит из поисковой строки хедера).
// Данные загружаются статически, без запросов к API.

// Пагинация — не функциональна: все товары отображаются вне зависимости от выбранной страницы. 
// Это задумано как визуальный элемент. Такая демонстрация может быть реализована только в  учебном,
// для настоящего веб-сайта такое недопустимо и всё должно быть реализовано полностью.
