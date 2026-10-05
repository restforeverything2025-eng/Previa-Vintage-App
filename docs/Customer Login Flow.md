Immerse

↓

Connect Telegram

↓

Telegram confirms identity

↓

Customer ID

↓

Cloud Favorites

↓

Return to Boutique

# Customer Login Flow

## Goal

Allow the customer to identify themselves without creating a traditional account.

Customer identification is used for personalization features such as Cloud Favorites.

The public boutique does not require Customer authentication.

---

## Entry

User clicks:

Immerse

↓

Connect with Telegram

---

## Authentication

Telegram confirms the user's identity.

PREVIA receives a Telegram ID.

Telegram communication is handled by:

```
TelegramBridge
```

The application does not communicate directly with Telegram business logic from unrelated modules.

---

## Customer

If the customer is new:

- Create Customer.

If the customer already exists:

- Load Customer.

Customer identity is determined by the Telegram provider identity.

Repeated Telegram entry must not create duplicate Customers.

---

## Session

Vintage App receives Customer ID.

Customer becomes available to the application through:

```
Identity
```

Identity stores the current authenticated Customer.

---

# Automatic Mini App Restoration

When PREVIA starts inside Telegram Mini App, the application automatically attempts to restore an existing Customer.

The sequence is:

```
Telegram Mini App
        ↓
TelegramBridge.restore()
        ↓
CustomerClient
        ↓
Customer API
        ↓
Customer
        ↓
Identity
```

If a Customer exists:

```
Existing Identity restored
```

If no Customer exists:

```
No existing Customer found.
```

The second case is valid.

The public boutique remains available as an anonymous storefront.

---

# Favorites Initialization

After Customer restoration, Favorites is initialized using the current Identity.

Authenticated Customer:

```
Identity
    ↓
FavoritesStorageManager
    ↓
CloudFavoritesStorage
```

Anonymous user:

```
FavoritesStorageManager
    ↓
LocalFavoritesStorage
```

Favorites initialization is part of personalization and must not block the public catalog.

---

# Startup Lifecycle

The public boutique starts first:

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
UI_READY
```

Customer personalization starts independently:

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

The Customer Platform must never be placed between application startup and public Home/Catalog initialization.

---

# Manual Telegram Login

When the customer manually connects Telegram through Immerse:

```
Connect Telegram
        ↓
TelegramBridge.connect()
        ↓
Customer
        ↓
Identity
        ↓
Favorites.reinitialize()
        ↓
refreshFavoriteUI()
```

`Favorites.reinitialize()` is required because the active storage provider may change from:

```
LocalFavoritesStorage
```

to:

```
CloudFavoritesStorage
```

after Customer authentication.

---

# Favorites Readiness

Favorites has explicit states:

```
idle
loading
ready
error
```

Favorite actions are allowed only when Favorites is ready.

This prevents a race where the customer could add a Favorite to Local Storage immediately before authentication switches the application to Cloud Favorites.

---

# Repeated Telegram Entry

Repeated entry into the Telegram Mini App must restore the existing Customer.

Expected behavior:

```
Existing Telegram identity
        ↓
Existing Customer
        ↓
Existing Identity
        ↓
Cloud Favorites
```

A second Customer must not be created for the same Telegram provider identity.

---

# Public Storefront Independence

Customer restoration is optional personalization infrastructure.

It must not block:

- Home;
- Catalog;
- Product pages;
- Search;
- Gallery;
- Cart;
- public browsing;
- vertical scrolling.

The storefront must remain usable if Customer infrastructure is temporarily slow or unavailable.

---

# Features

Available:

- Customer identification through Telegram;
- persistent Customer identity;
- Favorites synchronization;
- Cloud Favorites;
- local Favorites for anonymous users.

Future:

- Personal vintage search.
- Collector privileges.
- Purchase history.
- Reserved items.
- Loyalty program.
