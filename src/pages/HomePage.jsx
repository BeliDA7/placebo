// src/pages/HomePage.jsx
//import { list } from '../data/list';
import { sections } from '../data/sections';
import { sectionIcons } from '../data/sectionsIcons';
import ProductCarousel from '../components/ProductCarousel';
import CompanyInfo from '../components/CompanyInfo';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function HomePage({ onAddToBasket, products = [] }) {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        {sections.map(section => {
          const sectionProducts = products.filter(p => p.categoryId === section.id);
          if (sectionProducts.length === 0) return null;
          const Icon = sectionIcons[section.id];
          const cleanTitle = section.title.replace(/^[^\s]+\s/, '');
          return (
            <ProductCarousel
              key={section.id}
              //title={section.title}
              title={cleanTitle} //передаём чистый заголовок
              icon={Icon && <Icon className="h-6 w-6" />} // передаём иконку как JSX
              products={sectionProducts}
              onAddToBasket={onAddToBasket}
            />
          );
        })}
      </main>
      <CompanyInfo />
      <Reviews />
      <Footer />
    </>
  );
}

// Компонент HomePage представляет главную страницу интернет-аптеки. 
// Он отвечает за: Динамическое формирование секций с товарами на основе массива sections и переданных через пропс products.
// Каждая секция отображается в виде горизонтальной карусели (ProductCarousel) с соответствующим заголовком.
// Статические блоки: информация о компании (CompanyInfo), отзывы (Reviews) и подвал (Footer).
//
// Это композиционный компонент, объединяющий все ключевые элементы главной страницы. 
// Он полностью полагается на данные, переданные извне (товары, функция добавления в корзину).

