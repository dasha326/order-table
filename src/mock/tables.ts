export default [
  {//стол по умолчанию
    "number": 1,
    "private": false,
    "available": true,
    "places": 6,
    "emptyPlaces": 6,
    "comments": "",
    "orderTime": "",
    "user": {
      "name": "",
      "tel": "",
      "visibility": true
    },
    "gameMaster": {
      "required": false,
      "comments": "",
    },
    "games": []
  },
  {
    "number": 2, // номер стола
    "private": true, //забронирован приватно, без возможности присоединения
    "available": false, //возможеность стола для бронирования
    "places": 4, // всего мест за столом
    "emptyPlaces": 2, // свободные места
    "comments": "", // комментарии видимые всем ролям
    "orderTime": "14.00", // время на какое забронирован стол
    "user": { // на кого забронирован стол
      "name": "Иванова Иванна",
      "tel": "+7(908)999-99-99",
      "visibility": false // отображать его для всех или нет
    },
    "gameMaster": { // Нужен ли игровед
      "required": true,
      "comments": "Хотим чтобы нам рассказали правила игры Алое Восстание",
    },
    "games": ["Алое Восстание"] // игры за столом
  },
  {
    "number": 3,
    "private": false,
    "available": true,
    "places": 5,
    "emptyPlaces": 3,
    "comments": "Правила знаем. Все расскажем, если присоединитесь",
    "orderTime": "16.00",
    "user": {
      "name": "Макарова Иванна",
      "tel": "+7(908)999-99-99",
      "visibility": true
    },
    "gameMaster": {
      "required": false,
      "comments": "",
    },
    "games": ["Доминион","Двор Чудес","Голем"]
  },
  {
    "number": 4,
    "private": false,
    "available": false,
    "places": 5,
    "emptyPlaces": 0,
    "comments": "Приглашаем еще 2 человека на Алхимиков",
    "orderTime": "16.00",
    "gameMaster": {
      "required": false,
      "comments": "",
    },
    "user": {
      "name": "Максимов Максим",
      "tel": "+7(908)999-99-99",
      "visibility": false
    },
    "games": ["Адель", "Алхимики + королевский голем"]
  },
  {
    "number": 5,
    "private": true,
    "available": false,
    "places": 8,
    "emptyPlaces": 1,
    "comments": "",
    "orderTime": "14.00",
    "user": {
      "name": "Вася Васин",
      "tel": "+7(908)999-99-99",
      "visibility": true
    },
    "games": ["Жадюги", "Запретный остров"]
  },
  {
    "number": 6,
    "private": false,
    "available": true,
    "places": 5,
    "emptyPlaces": 5,
    "comments": "",
    "orderTime": "",
    "user": {
      "name": "",
      "tel": "",
      "visibility": true
    },
    "games": []
  },
]

