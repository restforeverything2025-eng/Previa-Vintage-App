Customer Platform Architecture

1. Purpose

2. Design Principles

3. System Overview

4. Identity Layer

5. Telegram Bridge

6. Customer Domain

7. Cloud Favorites

8. Personal Vintage Search

9. Collector Privileges

10. Settings

11. Module Responsibilities

12. Future Extensions

# Customer Platform Architecture

## 1. Purpose

Customer Platform extends PREVIA beyond a traditional boutique.

Its purpose is to provide every customer with a persistent personal experience across all devices while keeping the boutique simple, fast and privacy-friendly.

The platform is designed around independent modules with clear responsibilities and minimal coupling.

---

## 2. Design Principles

The Customer Platform follows the core architectural principles of PREVIA.

- One Module = One Responsibility.
- Loose coupling between modules.
- Public APIs instead of direct implementation access.
- Customer as the central business entity.
- Identity as the authentication layer.
- Telegram as an external provider through Telegram Bridge.
- Small, independently testable modules.
- Public storefront startup must not depend on optional personalization services.

---

## 3. System Overview

The Customer Platform consists of independent modules working together through well-defined public APIs.

The application interface never communicates directly with external providers.

Every request passes through the appropriate module responsible for that part of the system.

The Customer Platform is a personalization layer.

It is not a prerequisite for public catalog browsing.

---

## 4. Identity Layer

Identity manages the current authenticated customer.

Responsibilities:

- store current customer;
- validate customer identity;
- provide authentication state;
- never communicate with Telegram directly.

Identity does not own Favorites.

Identity only provides the current Customer authentication state to modules that require it.

---

## 5. Telegram Bridge

Telegram Bridge is responsible only for communication with Telegram.

Responsibilities:

- initiate Telegram authorization;
- restore Telegram Mini App Customer identity;
- receive Telegram customer data;
- convert Telegram response into Customer;
- notify Telegram that the Mini App is ready;
- never contain PREVIA business logic.

The application uses:

```
TelegramBridge.ready()
```

as the centralized Telegram Mini App readiness entry point.

---

## 6. Customer Domain

Customer represents the PREVIA business entity.

Initially Customer contains:

- provider
- id
- name

The model evolves only when new business requirements appear.

Customer is persisted through the Customer infrastructure.

---

## 7. Cloud Favorites

Cloud Favorites synchronize favourite products between all customer devices.

Identity determines whose favourites are loaded.

Customer never stores favourite products directly.

The flow is:

```
Favorites
    ↓
FavoritesStorageManager
    ↓
CloudFavoritesStorage
    ↓
FavoritesClient
    ↓
PREVIA Core
    ↓
PREVIA CMS
    ↓
Google Sheets
```

Anonymous users use LocalFavoritesStorage.

---

# 8. Startup and Readiness Architecture

Customer Platform initialization is separated from public storefront initialization.

The application has two conceptual readiness boundaries.

## UI_READY

The public storefront is ready.

```
Theme
    ↓
DailyInfo
    ↓
Static UI
    ↓
Home
    ↓
Telegram.WebApp.ready()
    ↓
Initial Route
    ↓
UI_READY
```

At this point the user can browse the public boutique.

## PERSONALIZATION_READY

Customer personalization is ready.

```
TelegramBridge.restore()
    ↓
Identity
    ↓
Favorites.init()
    ↓
refreshFavoriteUI()
    ↓
PERSONALIZATION_READY
```

The two paths are intentionally independent.

The Customer Platform must not block:

- Home;
- Catalog;
- Product pages;
- Search;
- Gallery;
- Cart;
- public scrolling.

---

# 9. Favorites Readiness

Favorites uses explicit initialization states:

```
idle
loading
ready
error
```

An empty Favorites array must not be interpreted as an initialized empty collection while loading is still in progress.

Favorite actions are guarded until Favorites reaches:

```
ready
```

This prevents a storage-provider race during Customer restoration.

---

# 10. Favorites Reinitialization

When the active Identity changes, Favorites must be reinitialized.

The public API is:

```
Favorites.reinitialize()
```

The sequence is:

```
Customer authentication
        ↓
Identity changes
        ↓
Favorites.reinitialize()
        ↓
Current storage provider selected
        ↓
Favorites loaded
        ↓
refreshFavoriteUI()
```

This is required for manual Telegram login.

---

# 11. Personal Vintage Search

Allows customers to request items currently unavailable in the boutique.

The search system is independent from Favorites and Identity while using Customer identification.

---

# 12. Collector Privileges

Stores customer privileges.

Possible future examples:

- loyalty levels;
- collector discounts;
- early access;
- invitations;
- exclusive offers.

The module remains isolated from Favorites.

---

# 13. Settings

Stores customer preferences.

Examples:

- language;
- currency;
- notifications;
- interface options.

Settings never contain authentication logic.

---

# 14. Module Responsibilities

Immerse
    ↓
Telegram Bridge
    ↓
Customer
    ↓
Identity
    ↓
Customer Services

Each module communicates only through public interfaces.

Direct access between implementation details is prohibited.

---

# 15. Future Extensions

The architecture intentionally leaves space for future modules.

Examples:

- Orders
- Collection History
- Wishlists
- Auctions
- Messages
- Community
- AI Recommendations

Future modules should follow the same architectural principles without changing the existing foundation.

---

# Customer + Cloud Favorites Integration — PASSED

Статус: проверено на реальном пользовательском сценарии.

### Customer

- Telegram-пользователь автоматически определяется через Telegram.
- Customer создаётся через Customer API.
- Данные Customer сохраняются в Google Sheets → `Customers`.
- При первом входе после очистки таблицы был создан `C000001`.
- Повторный вход не создаёт нового Customer.
- Идентификация выполняется по `provider + providerId`.
- Изменение имени пользователя в Telegram не создаёт нового Customer.

### Identity

- TelegramBridge получает данные пользователя.
- CustomerClient получает или создаёт Customer.
- Identity получает данные Customer и сохраняет текущую идентичность.
- `Identity.isAuthenticated()` корректно определяет авторизованного пользователя.
- `FavoritesStorageManager` получает `customerId` из текущей Identity.

### Cloud Favorites

- Авторизованный пользователь получает `CloudFavoritesStorage`.
- Favorites привязаны к `customerId`.
- Добавление товара создаёт запись в Google Sheets → `Favorites`.
- Удаление товара удаляет соответствующую запись.
- Поддерживается несколько Favorites одновременно.
- Favorites сохраняются после обновления и повторного открытия Boutique.
- Favorites синхронизируются между устройствами.
- Проверен сценарий телефон → ПК.
- Проверен сценарий ПК → телефон.
- Google Sheets `Favorites` используется как Single Source of Truth.

### Integration Test

Проверена полная цепочка:

Telegram  
→ TelegramBridge  
→ CustomerClient  
→ Customer  
→ Identity  
→ FavoritesStorageManager  
→ CloudFavoritesStorage  
→ Favorites  
→ Google Sheets

Результат: **PASSED**.

### Startup Integration Test

Проверена новая последовательность:

```
Public UI
    ↓
UI_READY

TelegramBridge.restore()
    ↓
Identity
    ↓
Favorites
    ↓
refreshFavoriteUI()
    ↓
PERSONALIZATION_READY
```

Проверено, что Customer restoration больше не является обязательной зависимостью для публичного Home/Catalog.

Результат: **PASSED**.

### Current State

Customer infrastructure и Cloud Favorites работают в реальном пользовательском сценарии.

Customer Panel / `Immerse` имеет подготовленный пользовательский интерфейс, однако полноценная Customer Panel ещё не реализована.

Следующий этап: подключение существующего Customer Panel UI к уже работающей Customer / Identity инфраструктуре.
