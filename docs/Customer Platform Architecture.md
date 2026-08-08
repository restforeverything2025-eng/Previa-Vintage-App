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


---

## 3. System Overview

The Customer Platform consists of independent modules working together through well-defined public APIs.

The application interface never communicates directly with external providers.

Every request passes through the appropriate module responsible for that part of the system.


---

## 4. Identity Layer

Identity manages the current authenticated customer.

Responsibilities:

- store current customer;
- validate customer identity;
- provide authentication state;
- never communicate with Telegram directly.


---

## 5. Telegram Bridge

Telegram Bridge is responsible only for communication with Telegram.

Responsibilities:

- initiate Telegram authorization;
- receive Telegram customer data;
- convert Telegram response into Customer;
- never contain PREVIA business logic.


---

## 6. Customer Domain

Customer represents the PREVIA business entity.

Initially Customer contains:

- provider
- id
- name

The model evolves only when new business requirements appear.


---

## 7. Cloud Favorites

Cloud Favorites synchronize favourite products between all customer devices.

Identity determines whose favourites are loaded.

Customer never stores favourite products directly.


---

## 8. Personal Vintage Search

Allows customers to request items currently unavailable in the boutique.

The search system is independent from Favorites and Identity while using Customer identification.


---

## 9. Collector Privileges

Stores customer privileges.

Possible future examples:

- loyalty levels;
- collector discounts;
- early access;
- invitations;
- exclusive offers.

The module remains isolated from Favorites.


---

## 10. Settings

Stores customer preferences.

Examples:

- language;
- currency;
- notifications;
- interface options.

Settings never contain authentication logic.


---

## 11. Module Responsibilities

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

## 12. Future Extensions

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

## Customer + Cloud Favorites Integration — PASSED

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

### Current State

Customer infrastructure и Cloud Favorites работают в реальном пользовательском сценарии.

Customer Panel / `Immerse` имеет подготовленный пользовательский интерфейс, однако полноценная Customer Panel ещё не реализована.

Следующий этап: подключение существующего Customer Panel UI к уже работающей Customer / Identity инфраструктуре.