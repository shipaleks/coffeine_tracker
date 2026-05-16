// Список популярных кофеиносодержащих напитков
// Данные основаны на исследованиях и средних значениях
// Источники: РБК, Росконтроль, Shuba Life, Sunrise Coffee

export const DRINKS = [
  // Кофе
  { id: 1, name: 'Эспрессо', caffeine_per_serving: 63, serving_ml: 30, category: 'coffee' },
  { id: 2, name: 'Двойной эспрессо', caffeine_per_serving: 126, serving_ml: 60, category: 'coffee' },
  { id: 3, name: 'Американо', caffeine_per_serving: 95, serving_ml: 240, category: 'coffee' },
  { id: 4, name: 'Капучино', caffeine_per_serving: 75, serving_ml: 180, category: 'coffee' },
  { id: 5, name: 'Латте', caffeine_per_serving: 80, serving_ml: 240, category: 'coffee' },
  { id: 6, name: 'Флэт Уайт', caffeine_per_serving: 77, serving_ml: 160, category: 'coffee' },
  { id: 7, name: 'Мокка', caffeine_per_serving: 90, serving_ml: 240, category: 'coffee' },
  { id: 8, name: 'Ристретто', caffeine_per_serving: 45, serving_ml: 20, category: 'coffee' },
  { id: 9, name: 'Лунго', caffeine_per_serving: 85, serving_ml: 60, category: 'coffee' },
  { id: 10, name: 'Фильтр-кофе', caffeine_per_serving: 95, serving_ml: 240, category: 'coffee' },
  { id: 11, name: 'Турка (по-восточному)', caffeine_per_serving: 165, serving_ml: 80, category: 'coffee' },
  { id: 12, name: 'Растворимый кофе', caffeine_per_serving: 70, serving_ml: 220, category: 'coffee' },
  { id: 13, name: 'Декаф', caffeine_per_serving: 5, serving_ml: 240, category: 'coffee' },
  { id: 14, name: 'Холодный брю (Cold Brew)', caffeine_per_serving: 200, serving_ml: 240, category: 'coffee' },
  { id: 15, name: 'Айс-кофе', caffeine_per_serving: 120, serving_ml: 350, category: 'coffee' },
  
  // Чай
  { id: 16, name: 'Чай черный', caffeine_per_serving: 50, serving_ml: 220, category: 'tea' },
  { id: 17, name: 'Чай зеленый', caffeine_per_serving: 28, serving_ml: 220, category: 'tea' },
  { id: 18, name: 'Чай белый', caffeine_per_serving: 20, serving_ml: 220, category: 'tea' },
  { id: 19, name: 'Чай улун', caffeine_per_serving: 37, serving_ml: 220, category: 'tea' },
  { id: 20, name: 'Чай матча', caffeine_per_serving: 70, serving_ml: 220, category: 'tea' },
  { id: 21, name: 'Чай травяной (рoмант)', caffeine_per_serving: 0, serving_ml: 220, category: 'tea' },
  { id: 22, name: 'Чай каркаде', caffeine_per_serving: 0, serving_ml: 220, category: 'tea' },
  { id: 23, name: 'Айс-ти (холодный чай)', caffeine_per_serving: 30, serving_ml: 350, category: 'tea' },
  
  // Энергетики и газировка
  { id: 24, name: 'Red Bull', caffeine_per_serving: 80, serving_ml: 250, category: 'energy' },
  { id: 25, name: 'Monster Energy', caffeine_per_serving: 160, serving_ml: 473, category: 'energy' },
  { id: 26, name: 'Burn', caffeine_per_serving: 80, serving_ml: 250, category: 'energy' },
  { id: 27, name: 'Adrenaline Rush', caffeine_per_serving: 76, serving_ml: 250, category: 'energy' },
  { id: 28, name: 'Coca-Cola', caffeine_per_serving: 34, serving_ml: 330, category: 'soda' },
  { id: 29, name: 'Coca-Cola Zero', caffeine_per_serving: 34, serving_ml: 330, category: 'soda' },
  { id: 30, name: 'Pepsi', caffeine_per_serving: 38, serving_ml: 330, category: 'soda' },
  { id: 31, name: 'Dr Pepper', caffeine_per_serving: 41, serving_ml: 330, category: 'soda' },
  { id: 32, name: 'Mountain Dew', caffeine_per_serving: 54, serving_ml: 330, category: 'soda' },
  { id: 33, name: 'Квас', caffeine_per_serving: 0, serving_ml: 330, category: 'soda' },
  { id: 34, name: 'Тархун', caffeine_per_serving: 0, serving_ml: 330, category: 'soda' },
  
  // Другое
  { id: 35, name: 'Какао', caffeine_per_serving: 8, serving_ml: 200, category: 'other' },
  { id: 36, name: 'Горячий шоколад', caffeine_per_serving: 5, serving_ml: 200, category: 'other' },
  { id: 37, name: 'Мате', caffeine_per_serving: 80, serving_ml: 220, category: 'other' },
  { id: 38, name: 'Гуарана (напиток)', caffeine_per_serving: 90, serving_ml: 250, category: 'other' },
];

// Категории для фильтрации
export const CATEGORIES = {
  coffee: '☕ Кофе',
  tea: '🍵 Чай',
  energy: '⚡ Энергетики',
  soda: '🥤 Газировка',
  other: '🍫 Другое',
};

// Получить напиток по ID
export const getDrinkById = (id) => DRINKS.find(d => d.id === id);

// Получить напитки по категории
export const getDrinksByCategory = (category) => DRINKS.filter(d => d.category === category);

// Экспортировать для совместимости с Supabase
export const drinks = DRINKS;
