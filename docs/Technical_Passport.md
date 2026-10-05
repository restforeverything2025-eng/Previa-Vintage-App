# PREVIA Vintage App Technical Passport

## Source of truth

Google Sheets.

---

# Ecosystem Components

- Google Sheets — product and customer data
- Incoming — temporary photos
- Products — permanent photos
- Apps Script CMS — business logic
- GitHub — published storefront
- Telegram Mini App — customer interface
- PREVIA Core — customer and application API layer
- VS Code — development

---

# Frontend Runtime

The PREVIA Vintage App is the public storefront.

Main public features:

- Home;
- Catalog;
- Product pages;
- Search;
- Gallery;
- Favorites;
- Cart.

Customer personalization is implemented as an independent layer.

---

# Customer Infrastructure

Current Customer infrastructure includes:

- TelegramBridge;
- Customer;
- Identity;
- CustomerClient;
- Customer Platform;
- Cloud Favorites;
- Local Favorites.

Authenticated Customer flow:

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

---

# Favorites Infrastructure

Anonymous:

```
Favorites
    ↓
FavoritesStorageManager
    ↓
LocalFavoritesStorage
    ↓
localStorage
```

Authenticated:

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

---

# Startup Lifecycle

The application uses two conceptual readiness boundaries.

## UI_READY

Public storefront is initialized.

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

## PERSONALIZATION_READY

Customer and Favorites infrastructure is initialized.

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

Customer restoration must not block public storefront startup.

---

# Favorites State

Favorites uses:

```
idle
loading
ready
error
```

Favorite actions are guarded until the state becomes:

```
ready
```

The application provides:

```
Favorites.init()
Favorites.reinitialize()
Favorites.getState()
Favorites.isReady()
Favorites.waitUntilReady()
Favorites.has()
Favorites.toggle()
Favorites.getAll()
Favorites.count()
```

---

# Telegram Mini App

Telegram-specific communication is isolated in:

```
TelegramBridge
```

Telegram Mini App readiness is centralized through:

```
TelegramBridge.ready()
```

Customer restoration is performed through:

```
TelegramBridge.restore()
```

Manual Customer Platform login uses the same personalization lifecycle as automatic restoration.

---

# Publish Modes

1. No new products → update data.js only.
2. New products → full publish pipeline.

---

# Rules

- Never edit ID manually.
- Never edit SKU manually.
- Never edit data.js manually.
- Incoming folders are named 1,2,3...
- After CMS publication execute `git pull` before continuing development.
- Do not access Favorites storage providers directly from application modules.
- Do not make Customer restoration a blocking dependency of the public storefront.
- Do not introduce WebView-specific startup hacks before checking the application lifecycle.

---

# Production Verification

The startup lifecycle and Customer Platform were verified on a real Android Telegram WebView using:

```
chrome://inspect/#devices
```

Verified:

- public UI startup;
- vertical scrolling;
- Customer creation;
- existing Customer restoration;
- Identity;
- Cloud Favorites;
- Favorites persistence;
- Google Sheets synchronization;
- manual Telegram login;
- Favorites reinitialization;
- Cart;
- Order;
- product reservation;
- PDF generation.

Status:

**PASSED**
