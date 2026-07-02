import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { allProducts } from '../data/allProducts';
import ProductCard from '../components/ProductCard';
import { IconArrowLeft } from '@tabler/icons-react'; // или используйте обычный текст

export default function SearchResults({ onAddToBasket }) {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    } else {
      setProducts([]);
    }
  }, [query]);

  const goHome = () => {
    navigate('/'); // возврат на главную страницу
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Результаты поиска по запросу «{query}»
      </h1>
      {products.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Ничего не найдено, попробуйте ещё раз набрать лекарство в поисковой строке.</p>
          <button onClick={goHome}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
            <IconArrowLeft className="h-5 w-5" /> 
            На главную страницу
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToBasket={onAddToBasket} />
          ))}
        </div>
      )}
    </div>
  );
}