# Architecture

## System Overview

Google Sheets
    |
Apps Script CMS
 |      |      |
Drive  GitHub Telegram

VS Code <--- git pull --- GitHub

---

# Frontend Architecture

GitHub Pages
    |
PREVIA Vintage App
    |
    +---------------------------+
    |                           |
    v                           v
PUBLIC UI                 PERSONALIZATION
    |                           |
    |                           +--> TelegramBridge
    |                           |
    |                           +--> Identity
    |                           |
    |                           +--> Customer
    |                           |
    |                           +--> Favorites
    |
    +--> Home
    +--> Catalog
    +--> Product
    +--> Search
    +--> Gallery
    +--> Cart

The public UI and personalization paths are intentionally separated.

---

# Startup Boundaries

The application uses two readiness boundaries:

```
UI_READY
    |
    +--> Public storefront available
    +--> Catalog available
    +--> Scrolling available
    +--> Product navigation available

PERSONALIZATION_READY
    |
    +--> Customer restored
    +--> Identity initialized
    +--> Favorites initialized
    +--> Favorite UI synchronized
```

Customer restoration must not block public storefront initialization.

---

# Customer Architecture

Telegram Mini App
    |
TelegramBridge
    |
CustomerClient
    |
PREVIA Core
    |
PREVIA CMS
    |
Google Sheets

Customer identity is stored through the Customer infrastructure.

---

# Cloud Favorites Architecture

Favorites
    |
FavoritesStorageManager
    |
CloudFavoritesStorage
    |
FavoritesClient
    |
PREVIA Core
    |
PREVIA CMS
    |
Google Sheets

Anonymous users use LocalFavoritesStorage.

Authenticated users use CloudFavoritesStorage.

---

# Data Flow

Product data:

```
Google Sheets
    ↓
PREVIA CMS
    ↓
data.js
    ↓
PREVIA Vintage App
```

Customer:

```
Telegram
    ↓
TelegramBridge
    ↓
CustomerClient
    ↓
PREVIA Core
    ↓
PREVIA CMS
    ↓
Google Sheets
```

Favorites:

```
Favorite action
    ↓
Favorites
    ↓
FavoritesStorageManager
    ↓
CloudFavoritesStorage / LocalFavoritesStorage
```

---

# Architectural Rule

Each module has one responsibility.

The public storefront must remain usable even when optional personalization infrastructure is slow or unavailable.

See:

- `Customer Platform Architecture.md`
- `Customer Login Flow.md`
- `Startup Lifecycle.md`
- `STORAGE_PROVIDER.md`
