export const list = [
  // ========== Скидки / Акции ==========
  {
    id: 1,
    name: 'Парацетамол 500 мг',
    price: 150,
    oldPrice: 155,
    description: '500 мг, 20 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'sale',
    country: 'Россия',
    form: 'Таблетки',
    storage: 'В защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 2,
    name: 'Ибупрофен 200 мг',
    price: 250,
    oldPrice: 300,
    description: '200 мг, 20 таблеток, покрытых пленочной оболочкой',
    inStock: true,
    image: '💊',
    categoryId: 'sale',
    country: 'Россия',
    form: 'Таблетки, покрытые пленочной оболочкой',
    storage: 'В защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 151,
    name: 'Ацетилсалициловая кислота',
    price: 120,
    oldPrice: 500,
    description: '100 мг, 20 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'sale',
    country: 'Россия',
    form: 'Таблетки',
    storage: 'В защищенном от света и влаги месте, при температуре не выше 25 °C'
  },
  {
    id: 152,
    name: 'Комбинированный анальгетик ',
    price: 90,
    oldPrice: 120,
    description: '300 мг + 50 мг + 100 мг, 10 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'sale',
    country: 'Россия',
    form: 'Таблетки (Парацетамол + Кофеин + Ацетилсалициловая кислота)',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 153,
    name: 'Диклофенак гель 5%',
    price: 280,
    oldPrice: 300,
    description: '5%, 30 г',
    inStock: true,
    image: '🧴',
    categoryId: 'sale',
    country: 'Россия',
    form: 'Гель для наружного применения',
    storage: 'В защищенном от света месте, при температуре не выше 25 °C'
  },

  // ========== Товар дня (hit) ==========
  {
    id: 251,
    name: 'Ибупрофен 200 мг',
    price: 99,
    oldPrice: 250,
    description: '200 мг, 20 таблеток. Суперцена! -60% только сегодня',
    inStock: true,
    image: '💊',
    categoryId: 'hit',
    isHit: true,
    country: 'Россия',
    form: 'Таблетки, покрытые пленочной оболочкой',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 252,
    name: 'Аскорбиновая кислота',
    price: 49,
    oldPrice: 120,
    description: '1000 мг, 20 шипучих таблеток. Повышает иммунитет. Скидка дня!',
    inStock: true,
    image: '🍊',
    categoryId: 'hit',
    isHit: true,
    country: 'Россия',
    form: 'Таблетки шипучие',
    storage: 'В оригинальной упаковке (тубе) при температуре не выше 25 °C'
  },
  {
    id: 253,
    name: 'Омега-3',
    price: 299,
    oldPrice: 599,
    description: '1000 мг, 30 капсул. Для сердца и сосудов',
    inStock: true,
    image: '🐟',
    categoryId: 'hit',
    isHit: true,
    country: 'Россия',
    form: 'Капсулы',
    storage: 'Хранить в холодильнике'
  },
  {
    id: 254,
    name: 'Магний B6',
    price: 199,
    oldPrice: 380,
    description: 'Магния цитрат 618 мг + Пиридоксин 10 мг, 30 таблеток. Снимает стресс',
    inStock: true,
    image: '⚡',
    categoryId: 'hit',
    isHit: true,
    country: 'Россия',
    form: 'Таблетки',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 255,
    name: 'Поливитамины',
    price: 399,
    oldPrice: 650,
    description: '11 витаминов + 8 минералов, 30 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'hit',
    isHit: true,
    country: 'Россия',
    form: 'Таблетки, покрытые оболочкой',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },

  // ========== Собственная продукция (brand) ==========
  {
    id: 3,
    name: 'Ацетилсалициловая кислота СТМ',
    price: 99,
    oldPrice: null,
    description: '100 мг, 20 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'brand',
    country: 'Россия',
    form: 'Таблетки',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 9,
    name: 'Ибупрофен СТМ',
    price: 89,
    oldPrice: null,
    description: '200 мг, 20 таблеток, покрытых оболочкой',
    inStock: true,
    image: '💊',
    categoryId: 'brand',
    country: 'Россия',
    form: 'Таблетки, покрытые пленочной оболочкой',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 154,
    name: 'Метамизол натрия СТМ',
    price: 69,
    oldPrice: null,
    description: '500 мг, 10 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'brand',
    country: 'Россия',
    form: 'Таблетки',
    storage: 'В защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 155,
    name: 'Лоратадин СТМ',
    price: 99,
    oldPrice: null,
    description: '10 мг, 10 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'brand',
    country: 'Россия',
    form: 'Таблетки',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 156,
    name: 'Панкреатин СТМ',
    price: 129,
    oldPrice: null,
    description: '25 ЕД, 20 таблеток, покрытых оболочкой',
    inStock: true,
    image: '💊',
    categoryId: 'brand',
    country: 'Россия',
    form: 'Таблетки, покрытые кишечнорастворимой оболочкой',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },

  // ========== Медицинская техника (medical) ==========
  {
    id: 4,
    name: 'Тонометр автоматический',
    price: 2500,
    oldPrice: null,
    description: 'Измерение давления на плече, память на 2 пользователей',
    inStock: true,
    image: '🩺',
    categoryId: 'medical',
    country: 'Япония',
    form: 'Медицинское изделие',
    storage: 'Хранить в сухом месте, беречь от ударов и попадания влаги'
  },
  {
    id: 10,
    name: 'Небулайзер компрессорный',
    price: 3800,
    oldPrice: null,
    description: 'Компрессорный ингалятор, для всей семьи',
    inStock: true,
    image: '🩺',
    categoryId: 'medical',
    country: 'Германия',
    form: 'Медицинское изделие',
    storage: 'Хранить в сухом, защищенном от пыли месте'
  },
  {
    id: 157,
    name: 'Глюкометр',
    price: 1200,
    oldPrice: null,
    description: 'Измерение уровня сахара в крови, комплект: прибор + 10 тест-полосок',
    inStock: true,
    image: '🩺',
    categoryId: 'medical',
    country: 'Германия',
    form: 'Медицинское изделие',
    storage: 'Хранить при комнатной температуре, вдали от прямых солнечных лучей'
  },
  {
    id: 158,
    name: 'Пульсоксиметр',
    price: 800,
    oldPrice: null,
    description: 'Измерение насыщения крови кислородом (SpO2) и пульса',
    inStock: true,
    image: '🩺',
    categoryId: 'medical',
    country: 'Германия',
    form: 'Медицинское изделие',
    storage: 'Беречь от ударов и воздействия агрессивных сред'
  },
  {
    id: 159,
    name: 'Ингалятор ультразвуковой',
    price: 2200,
    oldPrice: null,
    description: 'Бесшумный, для детей и взрослых',
    inStock: true,
    image: '🩺',
    categoryId: 'medical',
    country: 'Германия',
    form: 'Медицинское изделие',
    storage: 'Хранить в чехле, в сухом месте'
  },

  // ========== Товары для реабилитации (rehabilitation) ==========
  {
    id: 5,
    name: 'Костыли алюминиевые',
    price: 1200,
    oldPrice: null,
    description: 'Регулируемые по высоте, для взрослых (115-135 кг)',
    inStock: true,
    image: '🩼',
    categoryId: 'rehabilitation',
    country: 'Россия',
    form: 'Изделие',
    storage: 'Хранить в сухом месте, избегать повреждений'
  },
  {
    id: 11,
    name: 'Противопролежневая подушка',
    price: 1800,
    oldPrice: null,
    description: 'С эффектом памяти, для лежачих больных',
    inStock: true,
    image: '🛏️',
    categoryId: 'rehabilitation',
    country: 'Россия',
    form: 'Изделие',
    storage: 'Хранить в чехле, в сухом месте'
  },
  {
    id: 150,
    name: 'Ходунки с колёсиками',
    price: 2500,
    oldPrice: null,
    description: 'Алюминиевые, складные, с 4-мя колёсами и сиденьем',
    inStock: true,
    image: '🩼',
    categoryId: 'rehabilitation',
    country: 'Россия',
    form: 'Изделие',
    storage: 'Хранить в сложенном виде, в сухом месте'
  },
  {
    id: 151,
    name: 'Трость складная алюминиевая',
    price: 600,
    oldPrice: null,
    description: 'С ремешком на руку, регулируемая по высоте',
    inStock: true,
    image: '🩼',
    categoryId: 'rehabilitation',
    country: 'Россия',
    form: 'Изделие',
    storage: 'Хранить в сухом месте'
  },
  {
    id: 152,
    name: 'Противопролежневый матрас динамический',
    price: 3500,
    oldPrice: null,
    description: 'С компрессором (чередование давления), до 120 кг',
    inStock: true,
    image: '🛏️',
    categoryId: 'rehabilitation',
    country: 'Россия',
    form: 'Изделие',
    storage: 'Хранить в сложенном виде, в сухом месте'
  },

  // ========== Детское здоровье (children) ==========
  {
    id: 6,
    name: 'Парацетамол суспензия',
    price: 200,
    oldPrice: null,
    description: '120 мг/5 мл, 100 мл. С 3 месяцев',
    inStock: true,
    image: '🍼',
    categoryId: 'children',
    country: 'Россия',
    form: 'Суспензия для приема внутрь',
    storage: 'Хранить при температуре не выше 25 °C, в защищенном от света месте. Хранить в недоступном для детей месте'
  },
  {
    id: 12,
    name: 'Гель для прорезывания зубов',
    price: 150,
    oldPrice: null,
    description: 'Снимает боль и зуд, с 3 месяцев',
    inStock: true,
    image: '🦷',
    categoryId: 'children',
    country: 'Россия',
    form: 'Гель',
    storage: 'Хранить в недоступном для детей месте, при температуре не выше 25 °C'
  },
  {
    id: 153,
    name: 'Ибупрофен суспензия',
    price: 180,
    oldPrice: null,
    description: '100 мг/5 мл, 100 мл. Для детей с 3 месяцев',
    inStock: true,
    image: '🍼',
    categoryId: 'children',
    country: 'Россия',
    form: 'Суспензия для приема внутрь',
    storage: 'Хранить в защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 154,
    name: 'Мультивитамины для детей',
    price: 350,
    oldPrice: null,
    description: 'С 1 года до 4 лет, 30 жевательных таблеток',
    inStock: true,
    image: '🍬',
    categoryId: 'children',
    country: 'Россия',
    form: 'Жевательные таблетки',
    storage: 'Хранить в сухом месте, при температуре не выше 25 °C'
  },
  {
    id: 155,
    name: 'Подгузники 4-9 кг',
    price: 1200,
    oldPrice: null,
    description: '56 штук, дышащие',
    inStock: true,
    image: '🧸',
    categoryId: 'children',
    country: 'Россия',
    form: 'Подгузники',
    storage: 'Хранить в сухом месте, избегать попадания прямых солнечных лучей'
  },

  // ========== Витамины и БАДы (vitamins) ==========
  {
    id: 7,
    name: 'Аскорбиновая кислота шипучая',
    price: 80,
    oldPrice: null,
    description: '1000 мг, 20 таблеток',
    inStock: true,
    image: '🍊',
    categoryId: 'vitamins',
    country: 'Россия',
    form: 'Таблетки шипучие',
    storage: 'В оригинальной упаковке (тубе) при температуре не выше 25 °C'
  },
  {
    id: 8,
    name: 'Омега-3 БАД',
    price: 450,
    oldPrice: null,
    description: '1000 мг, 30 капсул',
    inStock: true,
    image: '🐟',
    categoryId: 'vitamins',
    country: 'Россия',
    form: 'Капсулы',
    storage: 'Хранить в холодильнике'
  },
  {
    id: 156,
    name: 'Кальций с витамин D3',
    price: 500,
    oldPrice: null,
    description: '2500 мг (кальций) + 200 МЕ (витамин D3), 100 таблеток жевательных',
    inStock: true,
    image: '🥛',
    categoryId: 'vitamins',
    country: 'Никомед',
    form: 'Таблетки жевательные',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 157,
    name: 'Магний В6 ',
    price: 280,
    oldPrice: null,
    description: 'Магний (цитрат) 300 мг + Витамин В6 5 мг, 50 таблеток',
    inStock: true,
    image: '⚡',
    categoryId: 'vitamins',
    country: 'Россия',
    form: 'Таблетки',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
  {
    id: 158,
    name: 'Витаминно-минеральный комплекс',
    price: 350,
    oldPrice: null,
    description: '11 витаминов + 8 минералов, 60 таблеток',
    inStock: true,
    image: '💊',
    categoryId: 'vitamins',
    country: 'Россия',
    form: 'Таблетки, покрытые оболочкой',
    storage: 'В сухом, защищенном от света месте, при температуре не выше 25 °C'
  },
];

// Во избежания юридичиских претензий со стороны компаний производителей,
// вместо запантинтованных названий лекарств, используются общедоступные названия действующих веществ.

// Файл list.js предоставляет статический массив товаров, предназначенных для главной страницы интернет-аптеки. 
// Эти данные формируют витрину с акциями и популярными товарами. 
// Они импортируются и объединяются с catalogProducts в общий список allProducts для использования в поиске и других компонентах, 
// однако основное назначение — отображение на главной странице (например, в каруселях ProductCarousel).

// Особенности:

// В отличие от catalogProducts,

// categoryId часто имеет значение 'sale', что позволяет выделять эти товары как акционные.
//Структура полностью совместима с ProductCard, поэтому компоненты работают без изменений.

// Массив используется для первоначального наполнения витрины, когдау веб-сайта ещё нет загруженных с сервера данных, 
// так же сдужат учебной заглушкой.