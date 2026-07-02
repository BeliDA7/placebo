import { useNavigate } from 'react-router-dom';

function ProductCard({ product, onAddToBasket }) {
  const navigate = useNavigate();

  const handleCardClick = () => navigate(`/product/${product.id}`);
  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToBasket(product);
  };

  // Функция для генерации цвета placeholder 
  const getPlaceholderColor = (id) => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];
    return colors[id % colors.length];
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
    >
      <div className={`${getPlaceholderColor(product.id)} p-4 flex items-center justify-center h-32`}>
        <span className="text-lg font-semibold text-gray-700 text-center px-2">
          {product.name}
        </span>
      </div>

      <div className="p-4 flex flex-col h-full">
        {/* Растягивающийся блок с текстом */}
        <div className="grow">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        </div>

        {/* Блок с ценой и наличием – всегда внизу, перед кнопкой */}
        <div className="mt-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">{product.price} ₽</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">{product.oldPrice} ₽</span>
              )}
            </div>
            <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'В наличии' : 'Нет'}
            </span>
          </div>
          {product.prescription && (
            <div className="mt-1">
              <span className="text-xs text-red-600 font-semibold">⚠️ Строго по рецепту</span>
            </div>
          )}
        </div>

        <button
          onClick={handleAddClick}
          disabled={!product.inStock}
          className={`mt-3 w-full py-2 rounded-lg font-medium transition ${
            product.inStock
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'В корзину' : 'Нет в наличии'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;