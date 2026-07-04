# PREVIA Ideas

## Search 2.1

- SearchMessages вместо строк в коде.
- Renderer (SearchManager не должен управлять DOM напрямую).
- История последних поисков.
- Популярные бренды при пустом поиске.
- Подсветка найденного текста (highlightMatch()).
- Поиск по тегам.
- Поиск по нескольким словам.
- Поиск с учётом опечаток (в будущем).
- Анимация появления результатов.
- Кнопка ✕ внутри поисковой строки.
- Возможность выхода из поиска по blur (если UX останется удобным).

---

## Boutique

- Избранное.
- Недавно просмотренные товары.
- Быстрый переход к последнему открытому товару.

---

## CMS

- Dashboard.
- Журнал публикаций.
- Восстановление после ошибок.
- Статистика товаров.
- Проверка фотографий перед Publish.

---

## Architecture

- SearchMessages.
- UI Components.
- Общая система Renderer.

## Search 3.0

Разделить SearchManager на небольшие модули.

search.js

search.engine.js

search.renderer.js

search.messages.js

search.state.js

search.utils.js

const MIN_SEARCH_LENGTH = 3;

const MAX_SUGGESTIONS = 5;

const SEARCH_DELAY = 500;

UI Components

- renderProductCard()
- renderStatusBadge()
- renderPrice()
- renderImage()