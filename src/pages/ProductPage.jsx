import { useParams, useNavigate } from 'react-router-dom';
import { allProducts } from '../data/allProducts';

const getPlaceholderColor = (id) => {
  const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];
  return colors[id % colors.length];
};

export default function ProductPage({ onAddToBasket }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Товар не найден</h2>
        <button onClick={() => navigate('/')} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Вернуться на главную
        </button>
      </div>
    );
  }

  const handleAddToBasket = () => {
    onAddToBasket(product);
   // alert(`${product.name} добавлен в корзину`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-600 hover:text-green-600">
        ← Назад
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Placeholder изображения */}
        <div className="md:w-1/2 flex justify-center">
          <div className={`${getPlaceholderColor(product.id)} rounded-2xl p-8 w-full max-w-md flex items-center justify-center`}>
            <span className="text-xl font-semibold text-gray-700 text-center">
              {product.name}
            </span>
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-4 text-lg">{product.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-green-600">{product.price} ₽</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">{product.oldPrice} ₽</span>
            )}
            <span className={`px-3 py-1 rounded-full text-sm ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </span>
          </div>

          {product.prescription && (
            <div className="mt-3">
              <span className="text-sm text-red-600 font-semibold">⚠️ Строго по рецепту</span>
            </div>
          )}

          <button
            onClick={handleAddToBasket}
            disabled={!product.inStock}
            className={`mt-8 w-full py-3 rounded-lg font-medium text-white transition ${
              product.inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
          </button>

          {/* Характеристики – теперь берутся из данных товара */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">Характеристики</h2>
            <ul className="space-y-2 text-gray-600">
              <li><span className="font-medium">Страна производитель:</span> {product.country || 'Не указана'}</li>
              <li><span className="font-medium">Форма выпуска:</span> {product.form || 'Не указана'}</li>
              <li><span className="font-medium">Условия хранения:</span> {product.storage || 'Не указаны'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}