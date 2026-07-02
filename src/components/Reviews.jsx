// src/components/Reviews.jsx
import { StarIcon } from '@heroicons/react/24/solid';

const reviews = [
  {
    id: 1,
    name: 'Екатерина С.',
    date: '15 мая 2026',
    rating: 5,
    text: 'Заказывала лекарства для мамы через сайт. Очень удобно, что можно посмотреть аналоги. Доставили быстро, курьер вежливый. Цены приемлемые, скидки порадовали.',
    avatar: '👩‍⚕️'
  },
  {
    id: 2,
    name: 'Андрей К.',
    date: '3 июня 2026',
    rating: 5,
    text: 'Отличная аптека! Всегда в наличии нужные препараты. Несколько раз пользовался доставкой – всё привозят вовремя. Фармацевты на месте помогли подобрать лекарства для ребёнка.',
    avatar: '👨‍⚕️'
  },
  {
    id: 3,
    name: 'Мария П.',
    date: '20 мая 2026',
    rating: 4,
    text: 'Сайтом удобно пользоваться, много информации о товарах. Один раз была заминка с доставкой, но оператор быстро решил проблему. В целом – хорошо!',
    avatar: '💊'
  }
];

const Reviews = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Что говорят наши покупатели</h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mt-3 rounded-full"></div>
          <p className="text-gray-600 mt-4">Нам важно ваше мнение – мы становимся лучше каждый день</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;