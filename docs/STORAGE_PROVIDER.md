# PREVIA Storage Provider

## Purpose

Storage Providers are responsible for reading and writing application data.

They provide infrastructure only.

They never contain business logic.

Business logic always belongs to Services.

---

# Responsibilities

A Storage Provider:

- stores data;
- loads data;
- updates data;
- removes data.

A Storage Provider never decides:

- what should be stored;
- when data should be synchronized;
- who owns the data.

---

# Current Implementation

PREVIA Favorites currently supports two storage providers.

---

## LocalFavoritesStorage

Used for anonymous users.

Flow:

```
Favorites
    ↓
FavoritesStorageManager
    ↓
LocalFavoritesStorage
    ↓
Browser localStorage
```

Storage key:

```
previa-favorites
```

Local Favorites allow the public storefront to provide Favorites functionality without requiring Customer authentication.

---

## CloudFavoritesStorage

Used for authenticated Customers.

Flow:

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

Cloud Favorites are associated with the current Customer identity.

The Customer ID is obtained from:

```
Identity
```

---

# Provider Selection

`FavoritesStorageManager` selects the provider according to the current authentication state.

Anonymous:

```
Identity
    ↓
not authenticated
    ↓
LocalFavoritesStorage
```

Authenticated:

```
Identity
    ↓
authenticated
    ↓
CloudFavoritesStorage
```

The application does not select the storage provider directly.

---

# Authentication Transition

When a user becomes authenticated after manual Telegram login, Favorites must be reinitialized.

Sequence:

```
Anonymous user
    ↓
LocalFavoritesStorage
    ↓
Telegram connection
    ↓
Identity becomes authenticated
    ↓
Favorites.reinitialize()
    ↓
CloudFavoritesStorage
```

This prevents Favorites from remaining attached to the wrong storage provider.

---

# Rules

Services never access storage directly.

Applications never manipulate storage directly.

Only Storage Providers communicate with the storage layer.

Storage Providers may be replaced without changing business logic.

---

# Example

## Anonymous user

```
Favorite Button
    ↓
Favorites
    ↓
FavoritesStorageManager
    ↓
LocalFavoritesStorage
    ↓
Local Storage
```

## Authenticated user

```
Favorite Button
    ↓
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

Business logic remains unchanged.

---

# Architecture Rule

The storage layer is an implementation detail.

Application modules must use the public Favorites API rather than accessing a storage provider directly.

See:

```
PUBLIC_API.md
```
