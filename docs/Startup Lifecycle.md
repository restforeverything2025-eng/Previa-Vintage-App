# PREVIA Startup Lifecycle

## Purpose

This document describes how PREVIA Vintage App starts, becomes interactive and initializes customer personalization.

The startup lifecycle is intentionally divided into two independent readiness boundaries:

- `UI_READY`
- `PERSONALIZATION_READY`

The public boutique must become usable before optional customer infrastructure finishes loading.

---

# 1. Startup Principle

The storefront is public.

Customer identification and Favorites are personalization features.

Therefore:

> Public UI must not wait for Customer restoration or Favorites initialization.

The correct startup model is:

```
START
  |
  +-----------------------------+
  |                             |
  v                             v
PUBLIC UI PATH             PERSONALIZATION PATH
  |                             |
  |                             v
  |                       TelegramBridge.restore()
  |                             |
  |                             v
  |                          Identity
  |                             |
  |                             v
  |                       Favorites.init()
  |                             |
  |                             v
  |                      refreshFavoriteUI()
  |
  v
UI_READY
```

The two paths are related, but they are not allowed to block each other.

---

# 2. UI_READY

`UI_READY` means that the public boutique interface is available.

The following operations belong to the public startup path:

- Theme initialization;
- DailyInfo initialization;
- static interface icons;
- Home initialization;
- catalog rendering;
- Telegram Mini App readiness notification;
- initial product route;
- public browsing and scrolling.

The startup sequence is:

```
Theme.init()
    ↓
DailyInfo.init()
    ↓
initializeStaticUI()
    ↓
initializeHome()
    ↓
TelegramBridge.ready()
    ↓
initializeInitialRoute()
    ↓
UI_READY
```

The application then starts personalization independently.

---

# 3. Public UI Path

The public UI path is intentionally free from Customer dependencies.

Current structure:

```
Application Start
    |
    +--> Theme
    |
    +--> DailyInfo
    |
    +--> Static UI
    |
    +--> Home / Catalog
    |
    +--> Telegram.WebApp.ready()
    |
    +--> Initial Route
    |
    +--> UI_READY
```

This path must not wait for:

- Customer API;
- Identity restoration;
- Favorites API;
- Google Sheets;
- Core;
- CMS;
- Telegram customer lookup.

The boutique must be able to display products and respond to normal public interaction even when personalization services are slow or temporarily unavailable.

---

# 4. Personalization Path

Customer personalization starts after the public UI has been initialized.

Current sequence:

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

`TelegramBridge.restore()` determines whether a Customer can be restored from the current Telegram Mini App session.

If a Customer exists:

```
Telegram
   ↓
TelegramBridge
   ↓
CustomerClient
   ↓
Customer
   ↓
Identity
```

If a Customer does not exist, the application remains a valid anonymous storefront session.

The absence of a Customer is not an application startup failure.

---

# 5. Anonymous and Authenticated Favorites

Favorites can operate in two modes.

## Anonymous user

```
Favorites
    ↓
FavoritesStorageManager
    ↓
LocalFavoritesStorage
    ↓
localStorage
```

The browser key is:

```
previa-favorites
```

## Authenticated user

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

The selected provider depends on the current `Identity`.

---

# 6. Favorites Readiness State

Favorites has an explicit initialization state.

Possible states:

```
idle
loading
ready
error
```

## idle

Favorites has not started initialization.

## loading

Favorites is currently loading its storage provider.

The application must not treat an empty Favorites array as a confirmed empty Favorites collection while the state is `loading`.

## ready

Favorites has successfully loaded.

Only in this state is it safe to perform normal Favorite actions.

## error

Favorites initialization failed.

The public storefront must remain usable even when Favorites fails.

---

# 7. Why Favorites Needs a Readiness State

A simple empty array is not enough to represent the initialization state.

For example:

```
favorites = []
```

can mean either:

```
The customer has no favorites.
```

or:

```
Favorites have not finished loading yet.
```

These are different states.

Without an explicit readiness state, a user could interact with a Favorite button before Customer restoration completes.

That creates a race condition.

---

# 8. Favorite Action Guard

Favorite actions are allowed only after Favorites becomes ready.

During initialization:

```
Favorites.state = loading
```

Favorite buttons are rendered with:

```
aria-disabled="true"
```

The application must not write a Favorite to Local Storage while Customer authentication is still being restored if the final provider may become Cloud Favorites.

This prevents the following race:

```
Favorites starts
    ↓
LocalFavoritesStorage selected
    ↓
User clicks Favorite
    ↓
Favorite written locally
    ↓
Customer restoration completes
    ↓
Identity becomes authenticated
    ↓
CloudFavoritesStorage becomes active
```

The Favorite could then exist in the wrong storage provider.

The readiness guard prevents this situation.

---

# 9. Favorites UI Refresh

The public catalog is allowed to render before Favorites has completed.

Initially Favorite buttons may not yet represent the final customer state.

After Favorites becomes ready:

```
Favorites initialized
        ↓
refreshFavoriteUI()
        ↓
currently rendered Favorite buttons updated
```

The application does not need to rebuild the entire catalog.

Favorite UI elements can be refreshed using the product identifier:

```
data-favorite-product
```

This keeps the public startup path fast while allowing personalization to arrive later.

---

# 10. Favorites Page

The Favorites page has a special readiness requirement.

If the user opens Favorites while initialization is still running, the application must not show:

```
No favorites
```

because the collection may simply not have finished loading.

Instead, the page displays a loading state.

After Favorites becomes ready:

```
Favorites ready
    ↓
refreshFavoritesViewAfterReady()
    ↓
Favorites page rendered with actual data
```

This prevents a false empty state.

---

# 11. Favorites Reinitialization

The application provides:

```
Favorites.reinitialize()
```

This is required when the active Identity changes.

The sequence is:

```
Identity changes
      ↓
Favorites.reinitialize()
      ↓
Favorites state reset
      ↓
Favorites loaded using current provider
      ↓
Favorites ready
      ↓
refreshFavoriteUI()
```

This is especially important after manual Customer Platform login.

---

# 12. Automatic Telegram Mini App Restoration

When PREVIA starts inside Telegram Mini App, the application attempts to restore an existing Customer.

The sequence is:

```
Telegram Mini App
        ↓
TelegramBridge.restore()
        ↓
CustomerClient.findCustomerMiniApp()
        ↓
Customer API
        ↓
Customer
        ↓
Identity
```

If an existing Customer is found:

```
Existing Identity restored
```

If no Customer is found:

```
No existing Customer found.
```

The second case is valid.

It does not prevent the public boutique from starting.

---

# 13. Manual Customer Platform Login

The manual Customer Platform flow must use the same personalization lifecycle.

The sequence is:

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
        ↓
Customer Platform personalization initialized
```

The application must not leave Favorites using the anonymous provider after the user becomes authenticated.

---

# 14. Telegram WebApp Ready

Telegram Mini App readiness is centralized in:

```
TelegramBridge.ready()
```

The application startup calls:

```
TelegramBridge.ready()
```

after the public UI has been initialized.

This keeps direct Telegram initialization inside the Telegram Bridge rather than spreading Telegram-specific calls throughout the application startup code.

---

# 15. Initial Product Route

The initial URL can contain a product identifier.

The route is processed after the public UI is initialized:

```
initializeInitialRoute()
```

If a product is specified:

```
showProduct(productId)
```

This route is part of the public UI startup and does not depend on Customer restoration.

---

# 16. Startup Diagnostics

The application provides diagnostic helpers:

```
window.testPreviaStartup()
```

and:

```
window.testFavoritesReadiness()
```

`testPreviaStartup()` reports:

- UI readiness;
- Favorites state;
- Favorites readiness;
- Identity authentication state;
- Telegram Mini App state;
- document scroll height;
- viewport height;
- whether the document is scrollable.

`testFavoritesReadiness()` reports:

- Favorites state;
- Favorites readiness;
- Favorite count;
- Identity authentication state.

These helpers are intended for development and real-device diagnostics.

---

# 17. Real Telegram WebView Verification

The startup architecture was verified on a real Android device using:

```
Chrome DevTools
chrome://inspect/#devices
```

The tested environment included:

```
Telegram WebView
Android device
Telegram Mini App
PREVIA Vintage App
```

The real device reported:

```
Telegram.WebApp.version = 9.6
```

and:

```
isExpanded = true
isVerticalSwipesEnabled = true
```

The document was confirmed to be normally scrollable:

```
scrollingElement = HTML
html overflow = visible
body overflow = visible
touchAction = auto
```

---

# 18. Original Startup Problem

The original startup sequence was:

```
Theme
  ↓
DailyInfo
  ↓
TelegramBridge.restore()
  ↓
Favorites.init()
  ↓
Home
```

This meant that public Home/Catalog initialization was downstream of Customer restoration and Favorites initialization.

On the real Telegram Android WebView this could create a noticeable period during which the interface was visible but normal vertical interaction did not behave as expected.

The investigation showed that the problem was related to startup sequencing rather than a persistent CSS overflow rule.

---

# 19. Architectural Fix

The solution was not to force scrolling through WebView-specific hacks.

Instead, the startup dependency was removed.

The old model:

```
Customer restore
      ↓
Favorites
      ↓
Home
```

was replaced by:

```
Public UI
   ↓
UI_READY

Customer restore
   ↓
Identity
   ↓
Favorites
   ↓
PERSONALIZATION_READY
```

This makes Customer infrastructure a personalization dependency rather than a public storefront dependency.

---

# 20. Production Verification

The refactored startup lifecycle was tested in the real production Telegram Mini App.

Verified scenarios included:

- initial Mini App entry;
- public catalog loading;
- vertical scrolling;
- existing Customer restoration;
- new Customer creation;
- manual Telegram connection;
- Favorites initialization;
- adding Favorites;
- removing Favorites;
- multiple Favorites;
- Favorite persistence;
- Customer data in Google Sheets;
- Favorites data in Google Sheets;
- Cart flow;
- Order creation;
- `orders` sheet;
- `orderItems` sheet;
- automatic product reservation;
- PDF document generation;
- repeated Telegram entry;
- existing Customer restoration;
- Immerse / Customer Platform flow.

The tested Customer was restored as the same existing Customer on repeated entry.

---

# 21. Important Verification Rule

The following startup order is prohibited:

```
Customer
    ↓
Favorites
    ↓
Home
```

The correct architecture is:

```
Public UI
    ↓
UI_READY
```

and independently:

```
Customer
    ↓
Identity
    ↓
Favorites
    ↓
PERSONALIZATION_READY
```

---

# 22. Architectural Principle

Customer infrastructure is valuable, but it is not required for the public boutique to function.

Therefore:

> Personalization may enhance the storefront, but it must not block the storefront.

This principle applies to future customer features as well.

Future modules should not be placed into the public startup path unless the feature is genuinely required for public browsing.
