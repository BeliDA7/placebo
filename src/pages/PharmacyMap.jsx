import { useState, useEffect } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { favorites as favoritesApi } from '../api';
import { useAuth } from '../context/AuthContext'; // где начинаются изменения
import {MapPinIcon, PhoneIcon, ClockIcon, HeartIcon, MapIcon} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';


const pharmacy_name ="Плацебо"

const pharmacies = [

  { id: 1, name: pharmacy_name, address: 'г. Москва, ул. Изумрудная, 15',           coords: [55.76832809754611,   37.57881992215338], phone: '+7 (999) 999-99-99', workTime: '09:00 - 21:00' },
  { id: 2, name: pharmacy_name, address: 'г. Москва, пр. Римма, 33 к 2',            coords: [55.774247576809636,  37.60752679820575], phone: '+7 (999) 888-88-88', workTime: 'Круглосуточно' },
  { id: 3, name: pharmacy_name, address: 'г. Москва, ул. Погранца, 8',              coords: [55.750394496754474,   37.6620951817811], phone: '+7 (999) 777-77-77', workTime: '08:00 - 23:00' },
  { id: 4, name: pharmacy_name, address: 'г. Москва, ул. Каловрата, 26',            coords: [55.79163359611171,   37.66454409225724], phone: '+7 (999) 666-66-66', workTime: '09:00 - 20:00' },
  { id: 5, name: pharmacy_name, address: 'г. Москва, бульвар Варвары , 12 к 6',     coords: [55.73636737410619,   37.57145184464501], phone: '+7 (999) 555-55-55', workTime: '10:00 - 22:00' },
  { id: 6, name: pharmacy_name, address: 'г. Москва, ул. Пионеров 2/2',             coords: [55.8342797158459,    37.66160440526012], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id: 7, name: pharmacy_name, address: 'г. Москва, площадь Захарова 20',          coords: [55.655355679611354,  37.47671739862214], phone: '+7 (999) 555-55-56', workTime: '10:00 - 22:00' },
  { id: 8, name: pharmacy_name, address: 'г.Москва, Московское водохранилище 56  ', coords: [55.866962040473894, 37.485011151462544], phone: '+7 (999) 555-55-56', workTime: '08:00 - 23:00' },
  { id: 9, name: pharmacy_name, address: 'г.Москва, Интернат 8',                    coords: [55.672598972456896,  37.79544804076393], phone: '+7 (999) 555-55-56', workTime: '09:00 - 20:00' },
  { id:10, name: pharmacy_name, address: 'г.Москва, Университет Гуманитариев 17 ',  coords: [55.89346721428316,    37.6470517013606], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:11, name: pharmacy_name, address: 'г.Москва, Золотой бор 20',                coords: [55.75478352718954,    37.8159771617801], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00' },
  { id:12, name: pharmacy_name, address: 'г.Москва, Сосновая поляна 6/4',           coords: [55.63428513916359,   37.52048083817938], phone: '+7 (999) 555-55-56', workTime: '09:00 - 20:00' },
  { id:13, name: pharmacy_name, address: 'г.Москва, Березовая поляна 27',           coords: [55.709540359608916,  37.45205698549804], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:14, name: pharmacy_name, address: 'г.Мосвка, Площадь Пасечников 50',         coords: [55.85013075926872,   37.68823612562855], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00' },
  { id:15, name: pharmacy_name, address: 'г.Мосвка, Северо-Западный округ 5',       coords: [55.65184338190642,   37.75088061787687], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:16, name: pharmacy_name, address: 'г.Химки, бульвар Виктории 68 ',           coords: [55.89390625600079,  37.425791821409646], phone: '+7 (999) 555-55-56', workTime: '08:00 - 23:00' },
  { id:17, name: pharmacy_name, address: 'г.Химки, Зелёная поляна 8',               coords: [55.88758871990579,   37.41612554540521], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:18, name: pharmacy_name, address: 'г.Химки, Малахитовая поляна 54 к 4',      coords: [55.921981095498474,  37.39142478179095], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00' },
  { id:19, name: pharmacy_name, address: 'г.Химки, Озерные берега 5 к 2',           coords: [55.946668331119334,  37.44438889037747], phone: '+7 (999) 555-55-56', workTime: '10:00 - 22:00' },
  { id:20, name: pharmacy_name, address: 'г.Химки, Кедровая поляна 22/3 ',          coords: [55.922178975013814,  37.39151328890445], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:21, name: pharmacy_name, address: 'г.Зеленоград, ул. Константинова 5',       coords: [55.974511544161786,  37.19362905685564], phone: '+7 (999) 555-55-56', workTime: '09:00 - 20:00' },
  { id:22, name: pharmacy_name, address: 'г.Зеленоград, Природные берега 4 к 3',    coords: [55.98508161147021,   37.17642332231488], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:23, name: pharmacy_name, address: 'г.Зеленоргад, площадь Иванова 8',         coords: [55.991658640283994,  37.18638571130893], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00' },
  { id:24, name: pharmacy_name, address: 'г.Обнинск, 2-я Кирпичная ул. д 32 ',      coords: [55.11709093023046,  36.597111758997684], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:25, name: pharmacy_name, address: 'г.Обнинск, проспект Невесты 63',          coords: [55.12317204805785,   36.56990650609786], phone: '+7 (999) 555-55-56', workTime: '08:00 - 23:00' },
  { id:26, name: pharmacy_name, address: 'г.Обнинск, Юридический проезд 4',         coords: [55.092745695880915,  36.61287536497103], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:27, name: pharmacy_name, address: 'г.Владимир, проспект Шахтёров 5',         coords: [56.143270193789235,  40.39035788816689], phone: '+7 (999) 555-55-56', workTime: '08:00 - 23:00' },
  { id:28, name: pharmacy_name, address: 'г.Владимир, ул. Георгия 45',              coords: [56.15318502811304,   40.36750668907147], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:29, name: pharmacy_name, address: 'г.Владимир, ул. 1960 г. д. 89',           coords: [56.117341305110884,  40.41752317490449], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00' },
  { id:30, name: pharmacy_name, address: 'г.Владимир, Бронзовый проспект 8/4',      coords: [56.14638204054376,  40.427532526650175], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:31, name: pharmacy_name, address: 'г.Владимир, Проспект Влюблённых 2 к 5 ',  coords: [56.172138557917755,  40.41823637681815], phone: '+7 (999) 555-55-56', workTime: '09:00 - 20:00' },
  { id:32, name: pharmacy_name, address: 'г.Воркута, пр. Анастасии Кудрявых 9',     coords: [67.49381574970025,   64.05044438065114], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00' },
  { id:33, name: pharmacy_name, address: 'г.Омск, ул. Михаила Старовойтова 17/8  ', coords: [54.98923142880577,   73.36846885576482], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:34, name: pharmacy_name, address: 'г.Омск, Рубиновая застава 9 ',            coords: [54.99593123038931,   73.36471863592507], phone: '+7 (999) 555-55-56', workTime: '10:00 - 22:00' },
  { id:35, name: pharmacy_name, address: 'г.Омск, ул. Хаски 19 к 2',                coords: [55.00968551784091,   73.34136889553695], phone: '+7 (999) 555-55-56', workTime: '08:00 - 23:00' },
  { id:36, name: pharmacy_name, address: 'г.Омск, ул. Тимофея Грозного 41 ',        coords: [55.01333031270493,     73.329328433526], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:37, name: pharmacy_name, address: 'г.Омск, площадь Рыбаков 1 к 2',           coords: [54.99860236958734,   73.40776766211745], phone: '+7 (999) 555-55-56', workTime: '10:00 - 22:00' },
  { id:38, name: pharmacy_name, address: 'г.Иркутск, Деловой Центр 56 ',            coords: [52.280026707076644, 104.28258055511294], phone: '+7 (999) 555-55-56', workTime: '08:00 - 23:00' },
  { id:39, name: pharmacy_name, address: 'г.Иркутск, ул Максимильяна 8',            coords: [52.28915663783147,  104.28484286857068], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:40, name: pharmacy_name, address: 'г.Иркутск, Серебряная поляна 2',          coords: [52.28778125926198,  104.29980197851924], phone: '+7 (999) 555-55-56', workTime: '09:00 - 20:00' },
  { id:41, name: pharmacy_name, address: 'г.Новосибирск, проспект Седых 93 ',       coords: [54.97893418105539,   82.88513657385785], phone: '+7 (999) 555-55-56', workTime: '08:00 - 23:00' },
  { id:42, name: pharmacy_name, address: 'г.Новосибирск, проспект Библиотекарей 7', coords: [54.992314058069425,  82.87939058640211], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:43, name: pharmacy_name, address: 'г.Новосибирск, ул. Шахматистов 34',       coords: [54.974657952483625,  82.81880537703115], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00' },
  { id:44, name: pharmacy_name, address: 'г.Санкт-Петербург, Туманная застава 49',  coords: [59.883927530736024, 30.367169143766443], phone: '+7 (999) 555-55-56', workTime: '09:00 - 20:00' },
  { id:45, name: pharmacy_name, address: 'г.Санкт-Петербург, Разводной мост 5/5',   coords: [59.9629777397215,   30.465785456469426], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:46, name: pharmacy_name, address: 'г.Санкт-Петербург, Лазурные края 9' ,     coords: [60.025715999113075, 30.410478539282032], phone: '+7 (999) 555-55-56', workTime: '09:00 - 21:00о' },
  { id:47, name: pharmacy_name, address: 'г.Санкт-Петербург, Белые паруса 88',      coords: [60.08387978485581,  30.241423636203127], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },
  { id:48, name: pharmacy_name, address: 'г.Санкт-Петербург, Лесная полянка 3',     coords: [59.80257679115382,   29.91977628866166], phone: '+7 (999) 555-55-56', workTime: '09:00 - 20:00' },
  { id:49, name: pharmacy_name, address: 'г.Санкт-Петербург,Интернат 23',           coords: [59.82841520286296,  30.441215290639086], phone: '+7 (999) 555-55-56', workTime: '10:00 - 22:00' },
  { id:50, name: pharmacy_name, address: 'г.Санкт-Петербург, Гастрономический комплекс № 9', coords: [59.90964389747737, 30.34863343006675], phone: '+7 (999) 555-55-56', workTime: 'Круглосуточно' },  
];

export default function PharmacyMap({ searchQuery = '', searchTrigger = 0 }) {
  const [favorites, setFavorites] = useState([])
  const [center, setCenter] = useState([59.9343, 30.3351]);
  const [zoom, setZoom] = useState(12);
  const [activeMarker, setActiveMarker] = useState(null);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // ← добавить

 useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      const data = await favoritesApi.get();
      setFavorites(data.map(item => item.pharmacy_id));
    } catch (err) {
      console.error('Ошибка загрузки избранного:', err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (pharmacyId) => {
    if (!user) {
      alert('Войдите в аккаунт, чтобы добавлять аптеки в избранное');
      return;
    }
    const isFavorite = favorites.includes(pharmacyId);
    try {
      if (isFavorite) {
        await favoritesApi.remove(pharmacyId);
      } else {
        await favoritesApi.add(pharmacyId);
      }
      await loadFavorites(); // обновляем список
    } catch (err) {
      console.error('Ошибка обновления избранного:', err);
      alert('Не удалось обновить избранное. Попробуйте позже.');
    }
  };

  // Поиск аптеки (без изменений)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setNotification('');
      return;
    }
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const found = pharmacies.find(
      (p) =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.address.toLowerCase().includes(normalizedQuery)
    );
    if (found) {
      setCenter(found.coords);
      setZoom(14);
      setActiveMarker(found);
      setNotification('');
    } else {
      setNotification('Аптека не найдена. Попробуйте другой запрос.');
      setActiveMarker(null);
    }
  }, [searchQuery, searchTrigger]);

  return (
    <div className="flex flex-col h-screen">
      <div className="pharmacy-map flex-1 relative">
        <Map
          //key={`${center[0]}-${center[1]}`} // убрал key, чтобы не тряслось
          center={center}
          zoom={zoom}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
          height="100%"
          width="100%"
        >
          {pharmacies.map((pharmacy) => (
            <Marker
              key={pharmacy.id}
              anchor={pharmacy.coords}
              onClick={() => setActiveMarker(pharmacy)}
            />
          ))}
        </Map>

        {notification && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow z-30">
            {notification}
          </div>
        )}

        {activeMarker && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-md mx-auto">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-green-700">{activeMarker.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" /> {activeMarker.address}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                <PhoneIcon className="h-4 w-4" /> {activeMarker.phone}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />{activeMarker.workTime}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleFavorite(activeMarker.id)}
                  className="text-2xl"
                >
                  {favorites.includes(activeMarker.id) ? (
                  <HeartSolidIcon className="h-6 w-6 text-red-500" />) : (<HeartIcon className="h-6 w-6 text-gray-400" />)
                  }
                </button>
                <button onClick={() => setActiveMarker(null)} className="text-gray-400">
                  ✕
                </button>
              </div>
            </div>
            <button
              onClick={() =>
                window.open(
                  `https://yandex.ru/maps/?rtext=~${activeMarker.coords[0]},${activeMarker.coords[1]}&rtt=auto`,
                  '_blank'
                )
              }
              className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
            >
             <MapIcon className="h-5 w-5" />
              Маршрут
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 p-4 max-h-48 overflow-auto">
        <h3 className="font-bold text-gray-700 mb-2"><MapPinIcon className="h-8 w-8"/> Все аптеки:</h3>
        <div className="space-y-2">
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="border-b pb-2 last:border-0">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{pharmacy.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(pharmacy.id)}
                    className="text-xl"
                  >
                    {favorites.includes(pharmacy.id) ?(<HeartSolidIcon className="h-6 w-6 text-red-500" />) : (<HeartIcon className="h-6 w-6 text-gray-400" />)}
                  </button>
                  <button
                    onClick={() => {
                      setCenter(pharmacy.coords);
                      setZoom(14);
                      setActiveMarker(pharmacy);
                    }}
                    className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    <MapPinIcon className="h-8 w-8"/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="fixed bottom-24 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs z-20">
          <p className="text-sm font-semibold text-gray-700 mb-1">⭐ Избранное:</p>
          <div className="flex flex-wrap gap-1">
            {favorites.map((id) => {
              const pharmacy = pharmacies.find((p) => p.id === id);
              return pharmacy ? (
                <button
                  key={id}
                  onClick={() => {
                    setCenter(pharmacy.coords);
                    setZoom(14);
                    setActiveMarker(pharmacy);
                  }}
                  className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                >
                  {pharmacy.address}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export const pharmaciesList = pharmacies;
  
//   // Загрузка избранного при монтировании
//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const loadFavorites = async () => {
//     try {
//       const data = await favoritesApi.get();
//       setFavorites(data.map(item => item.pharmacy_id));
//     } catch (err) {
//       console.error('Ошибка загрузки избранного:', err);
//       if (saved) {
//         setFavorites(JSON.parse(saved));
//         // Пытаемся синхронизировать с сервером в фоне
//         syncFavorites(JSON.parse(saved));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Синхронизация localStorage с сервером (на случай ошибки API)
//   const syncFavorites = async (localFavs) => {
//     try {
//       for (const id of localFavs) {
//         await favoritesApi.add(id);
//       }
//       localStorage.removeItem('favoritePharmacies');
//     } catch (err) {
//       console.error('Ошибка синхронизации избранного:', err);
//     }
//   };

//   const toggleFavorite = async (pharmacyId) => {
//     const isFavorite = favorites.includes(pharmacyId);
//     try {
//       if (isFavorite) {
//         await favoritesApi.remove(pharmacyId);
//       } else {
//         await favoritesApi.add(pharmacyId);
//       }
//       // После успешного обновления перезагружаем список
//       await loadFavorites();
//     } catch (err) {
//       console.error('Ошибка обновления избранного:', err);
//       // fallback: сохраняем в localStorage
//       const newFavs = isFavorite
//         ? favorites.filter(id => id !== pharmacyId)
//         : [...favorites, pharmacyId];
//       localStorage.setItem('favoritePharmacies', JSON.stringify(newFavs));
//       setFavorites(newFavs);
//       alert('Избранное сохранено локально. Синхронизация с сервером будет выполнена позже.');
//     }
//   };

//   // Поиск аптеки по запросу
//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setNotification('');
//       return;
//     }
//     const normalizedQuery = searchQuery.trim().toLowerCase();
//     const found = pharmacies.find(
//       (p) =>
//         p.name.toLowerCase().includes(normalizedQuery) ||
//         p.address.toLowerCase().includes(normalizedQuery)
//     );
//     if (found) {
//       setCenter(found.coords);
//       setZoom(14);
//       setActiveMarker(found);
//       setNotification('');
//     } else {
//       setNotification('Аптека не найдена. Попробуйте другой запрос.');
//       setActiveMarker(null);
//     }
//   }, [searchQuery, searchTrigger]);

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="pharmacy-map flex-1 relative">
//         <Map
//           //key={`${center[0]}-${center[1]}`}
//           center={center}
//           zoom={zoom}
//           onBoundsChanged={({ center, zoom }) => {
//             setCenter(center);
//             setZoom(zoom);
//           }}
//           height="100%"
//           width="100%"
//         >
//           {pharmacies.map((pharmacy) => (
//             <Marker
//               key={pharmacy.id}
//               anchor={pharmacy.coords}
//               onClick={() => setActiveMarker(pharmacy)}
//             />
//           ))}
//         </Map>

//         {notification && (
//           <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow z-30">
//             {notification}
//           </div>
//         )}

//         {activeMarker && (
//           <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-md mx-auto">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-green-700">{activeMarker.name}</h3>
//                 <p className="text-sm text-gray-600">📍 {activeMarker.address}</p>
//                 <p className="text-sm text-gray-600">📞 {activeMarker.phone}</p>
//                 <p className="text-sm text-gray-600">🕐 {activeMarker.workTime}</p>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={() => toggleFavorite(activeMarker.id)}
//                   className="text-2xl"
//                 >
//                   {favorites.includes(activeMarker.id) ? '⭐' : '☆'}
//                 </button>
//                 <button onClick={() => setActiveMarker(null)} className="text-gray-400">
//                   ✕
//                 </button>
//               </div>
//             </div>
//             <button
//               onClick={() =>
//                 window.open(
//                   `https://yandex.ru/maps/?rtext=~${activeMarker.coords[0]},${activeMarker.coords[1]}&rtt=auto`,
//                   '_blank'
//                 )
//               }
//               className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
//             >
//               🚶 Маршрут
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="bg-white border-t border-gray-200 p-4 max-h-48 overflow-auto">
//         <h3 className="font-bold text-gray-700 mb-2">📍 Все аптеки:</h3>
//         <div className="space-y-2">
//           {pharmacies.map((pharmacy) => (
//             <div key={pharmacy.id} className="border-b pb-2 last:border-0">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-600">{pharmacy.address}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => toggleFavorite(pharmacy.id)}
//                     className="text-xl"
//                   >
//                     {favorites.includes(pharmacy.id) ? '⭐' : '☆'}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setCenter(pharmacy.coords);
//                       setZoom(14);
//                       setActiveMarker(pharmacy);
//                     }}
//                     className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
//                   >
//                     📍
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {favorites.length > 0 && (
//         <div className="fixed bottom-24 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs z-20">
//           <p className="text-sm font-semibold text-gray-700 mb-1">⭐ Избранное:</p>
//           <div className="flex flex-wrap gap-1">
//             {favorites.map((id) => {
//               const pharmacy = pharmacies.find((p) => p.id === id);
//               return pharmacy ? (
//                 <button
//                   key={id}
//                   onClick={() => {
//                     setCenter(pharmacy.coords);
//                     setZoom(14);
//                     setActiveMarker(pharmacy);
//                   }}
//                   className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
//                 >
//                   {pharmacy.address}
//                 </button>
//               ) : null;
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export const pharmaciesList = pharmacies;














































  //   useEffect(() => {
//     localStorage.setItem('favoritePharmacies', JSON.stringify(favorites));
//   }, [favorites]);

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setNotification('');
//       return;
//     }
//     const normalizedQuery = searchQuery.trim().toLowerCase();
//     const found = pharmacies.find(
//       (p) =>
//         p.name.toLowerCase().includes(normalizedQuery) ||
//         p.address.toLowerCase().includes(normalizedQuery)
//     );
//     if (found) {
//       setCenter(found.coords);
//       setZoom(14);
//       setActiveMarker(found);
//       setNotification('');
//     } else {
//       setNotification('Аптека не найдена. Попробуйте другой запрос.');
//       setActiveMarker(null);
//     }
//   }, [searchQuery, searchTrigger]);

//   const toggleFavorite = (id) => {
//     setFavorites((prev) =>
//       prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* КАРТА – защищена классом pharmacy-map */}
//       <div className="pharmacy-map flex-1 relative">
//         <Map
//           key={`${center[0]}-${center[1]}`}
//           center={center}
//           zoom={zoom}
//           onBoundsChanged={({ center, zoom }) => {
//             setCenter(center);
//             setZoom(zoom);
//           }}
//           height="100%"
//           width="100%"
//         >
//           {pharmacies.map((pharmacy) => (
//             <Marker
//               key={pharmacy.id}
//               anchor={pharmacy.coords}
//               onClick={() => setActiveMarker(pharmacy)}
//             />
//           ))}
//         </Map>

//         {notification && (
//           <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow z-30">
//             {notification}
//           </div>
//         )}

//         {activeMarker && (
//           <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-md mx-auto">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="font-bold text-green-700">{activeMarker.name}</h3>
//                 <p className="text-sm text-gray-600">📍 {activeMarker.address}</p>
//                 <p className="text-sm text-gray-600">📞 {activeMarker.phone}</p>
//                 <p className="text-sm text-gray-600">🕐 {activeMarker.workTime}</p>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <button onClick={() => toggleFavorite(activeMarker.id)} className="text-2xl">
//                   {favorites.includes(activeMarker.id) ? '⭐' : '☆'}
//                 </button>
//                 <button onClick={() => setActiveMarker(null)} className="text-gray-400">
//                   ✕
//                 </button>
//               </div>
//             </div>
//             <button
//               onClick={() =>
//                 window.open(
//                   `https://yandex.ru/maps/?rtext=~${activeMarker.coords[0]},${activeMarker.coords[1]}&rtt=auto`,
//                   '_blank'
//                 )
//               }
//               className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
//             >
//               🚶 Маршрут
//             </button>
//           </div>
//         )}
//       </div>

//       {/* СПИСОК АПТЕК */}
//       <div className="bg-white border-t border-gray-200 p-4 max-h-48 overflow-auto">
//         <h3 className="font-bold text-gray-700 mb-2">📍 Все аптеки:</h3>
//         <div className="space-y-2">
//           {pharmacies.map((pharmacy) => (
//             <div key={pharmacy.id} className="border-b pb-2 last:border-0">
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <p className="text-sm text-gray-600">{pharmacy.address}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button onClick={() => toggleFavorite(pharmacy.id)} className="text-xl">
//                     {favorites.includes(pharmacy.id) ? '⭐' : '☆'}
//                   </button>
//                   <button
//                     onClick={() => {
//                       setCenter(pharmacy.coords);
//                       setZoom(14);
//                       setActiveMarker(pharmacy);
//                     }}
//                     className="text-sm bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
//                   >
//                     📍
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ИЗБРАННОЕ */}
//       {favorites.length > 0 && (
//         <div className="fixed bottom-24 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs z-20">
//           <p className="text-sm font-semibold text-gray-700 mb-1">⭐ Избранное:</p>
//           <div className="flex flex-wrap gap-1">
//             {favorites.map((id) => {
//               const pharmacy = pharmacies.find((p) => p.id === id);
//               return pharmacy ? (
//                 <button
//                   key={id}
//                   onClick={() => {
//                     setCenter(pharmacy.coords);
//                     setZoom(14);
//                     setActiveMarker(pharmacy);
//                   }}
//                   className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
//                 >
//                   {pharmacy.address}
//                 </button>
//               ) : null;
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export const pharmaciesList = pharmacies;