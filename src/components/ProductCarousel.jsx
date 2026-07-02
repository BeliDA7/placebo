import { useRef } from 'react';
import ProductCard from './ProductCard';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'; // ← импорт иконок

export default function ProductCarousel({ title,icon, products, onAddToBasket }) {
  const scrollRef = useRef(null);

   const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.firstChild?.offsetWidth || 280;
      const gap = 16; // gap-4 в Tailwind = 16px
      const scrollAmount = cardWidth + gap;
      const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  if (!products.length) return null;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4 px-4">
        <div className="flex items-center gap-2"> {/* ← обёртка для заголовка + иконки */}
          {icon && <span>{icon}</span>}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Назад"
          >
            <IconChevronLeft className="h-5 w-5 text-gray-700" /> {/* ← заменили ◀ */}
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Вперёд"
          >
            <IconChevronRight className="h-5 w-5 text-gray-700" /> {/* ← заменили ▶ */}
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-4 pb-2 scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'thin' }}
      >
        {products.map(product => (
          <div key={product.id} className="shrink-0 w-[85vw] sm:w-64 snap-center">
            <ProductCard product={product} onAddToBasket={onAddToBasket} />
          </div>
        ))}
      </div>
    </div>
  );
}