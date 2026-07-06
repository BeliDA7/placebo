import {
  IconDiscount,
  IconStar,
  IconBuilding,
  IconStethoscope,
  IconWheelchair,
  IconBabyCarriage,
  IconPill,
} from '@tabler/icons-react';

export const sectionIcons = {
  sale: IconDiscount,
  hit: IconStar,
  brand: IconBuilding,
  medical: IconStethoscope,
  rehabilitation: IconWheelchair,
  children: IconBabyCarriage,
  vitamins: IconPill,
};

// Файл sectionsicons.js служит связующим звеном между секциями главной страницы и их визуальным оформлением.
// Он экспортирует объект sectionIcons, где ключами выступают идентификаторы секций (такие же, как в массиве sections из sections.js),
// а значениями — соответствующие React-компоненты иконок из библиотеки Tabler.
// Это позволяет в компонентах, рендерящих секции, динамически получать нужную иконку по id секции и отображать её рядом с заголовком, 
// не прибегая к условным конструкциям. Решение делает код чище и упрощает добавление новых секций в будущем.