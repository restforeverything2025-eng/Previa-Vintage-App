# PREVIA Public APIs

## Favorites

Favorites exposes a public API for application modules.

Applications may use only these public methods.

Internal storage providers and implementation details must not be accessed directly.

---

## init()

Initializes Favorites.

The method selects the appropriate storage provider according to the current authentication state.

Possible initialization states:

```
idle
loading
ready
error
```

Example:

```javascript
await Favorites.init();
```

---

## reinitialize()

Reinitializes Favorites using the current Identity.

This is required after the active Customer changes.

Example:

```javascript
await Favorites.reinitialize();
```

Typical flow:

```
Telegram connection
    ↓
Identity changes
    ↓
Favorites.reinitialize()
    ↓
refreshFavoriteUI()
```

---

## getState()

Returns the current Favorites initialization state.

Possible values:

```
idle
loading
ready
error
```

Example:

```javascript
Favorites.getState();
```

---

## isReady()

Returns whether Favorites has completed initialization successfully.

Example:

```javascript
if (Favorites.isReady()) {
    // Favorite actions are available.
}
```

---

## waitUntilReady()

Waits for the current Favorites initialization to complete.

Example:

```javascript
await Favorites.waitUntilReady();
```

If Favorites has not been initialized, the method reports an initialization error rather than silently assuming that Favorites is empty.

---

## has(id)

Checks whether a product is currently in Favorites.

Example:

```javascript
Favorites.has(product.id);
```

---

## toggle(id)

Adds or removes a product from Favorites.

Favorite actions are valid only after Favorites initialization has completed.

Example:

```javascript
await Favorites.toggle(product.id);
```

---

## getAll()

Returns the current Favorite product identifiers.

Example:

```javascript
Favorites.getAll();
```

---

## count()

Returns the current number of Favorites.

Example:

```javascript
Favorites.count();
```

---

# Public API Rule

Application modules must use:

```
Favorites
```

and must not access:

```
LocalFavoritesStorage
CloudFavoritesStorage
FavoritesStorageManager
```

directly.

Storage implementation may change without changing application modules.

---

# Readiness Rule

Do not use:

```javascript
Favorites.getAll().length === 0
```

as proof that Favorites has finished loading.

Use:

```javascript
Favorites.isReady()
```

or:

```javascript
await Favorites.waitUntilReady()
```

instead.

An empty Favorite collection and an uninitialized Favorite collection are different states.
