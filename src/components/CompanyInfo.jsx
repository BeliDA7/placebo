//  Импорт компонентов Link и хук useLocation из react-router-dom для навигации и определения текущего пути
import { BuildingStorefrontIcon, HeartIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';

const CompanyInfo = () => {
  const advantages = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-green-600" />,
      title: 'Сертифицированные лекарства',
      description: 'Вся продукция имеет действующие сертификаты качества и поставляется напрямую от производителей.'
    },
    {
      icon: <HeartIcon className="w-8 h-8 text-green-600" />,
      title: 'Забота о здоровье',
      description: 'Наши фармацевты помогут подобрать безопасные аналоги и проконсультируют по применению.'
    },
    {
      icon: <TruckIcon className="w-8 h-8 text-green-600" />,
      title: 'Быстрая доставка',
      description: 'Доставляем заказы по городу в день оформления, бережно соблюдая температурный режим.'
    },
    {
      icon: <BuildingStorefrontIcon className="w-8 h-8 text-green-600" />,
      title: 'Более 50 аптек',
      description: 'Удобное расположение – всегда есть аптека рядом с вашим домом или работой.'
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">О сети аптек «Плацебо»</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Мы заботимся о вашем здоровье уже более 5 лет. Качественные лекарства, профессиональные фармацевты и современный сервис.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => (
            <div key={index} className="text-center p-4 rounded-xl hover:shadow-md transition">
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;

// Компонент CompanyInfo отображает промо-секцию с информацией о сети аптек «Плацебо». 
// Он включает в себя заголовок, краткое описание компании и ключевые преимущества перед конкурентами.
// Секция свёрстана с использованием Tailwind CSS, адаптивна: на мобильных устройствах преимущества выводятся в одну колонку, на планшетах — в две, на десктопах — в четыре. 
// Компонент не принимает пропсов, полностью статичен и предназначен для размещения на главной странице.