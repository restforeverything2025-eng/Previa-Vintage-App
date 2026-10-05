# Lessons Learned

## J0008

A leftover test folder blocked publication.

Result: validation stayed, orphan folder removed.

---

## VS Code sync

CMS publishes directly to GitHub.

After publishing through CMS always run:

```bash
git pull
```

---

# Startup Lifecycle

## Public UI must not wait for personalization

Customer restoration and Favorites are personalization features.

They must not block:

- Home;
- Catalog;
- Product pages;
- Search;
- Gallery;
- Cart;
- public scrolling.

The correct architecture is:

```
Public UI
    ↓
UI_READY

Customer
    ↓
Identity
    ↓
Favorites
    ↓
PERSONALIZATION_READY
```

Not:

```
Customer
    ↓
Favorites
    ↓
Home
```

---

## Empty Favorites is not the same as Ready Favorites

An empty array does not prove that Favorites has finished loading.

The application therefore uses explicit states:

```
idle
loading
ready
error
```

This prevents a false empty Favorites state.

---

## Favorite actions require readiness

A Favorite action must not be performed while Customer authentication and Favorites provider selection are still in progress.

Otherwise the application can write data to Local Storage before switching to Cloud Favorites.

The readiness guard prevents this race condition.

---

## Reinitialization after authentication

When Customer identity changes, Favorites must be reinitialized.

Use:

```
Favorites.reinitialize()
```

Then refresh the Favorite UI.

This keeps the active Favorites provider synchronized with the current Identity.

---

## Real Telegram WebView testing is necessary

Desktop Chrome and mobile emulation do not always reproduce behavior of the actual Telegram Android WebView.

For Telegram Mini App changes, real-device testing should be performed when the behavior involves:

- scrolling;
- viewport;
- Telegram WebApp lifecycle;
- touch interaction;
- WebView startup;
- authentication;
- Telegram-specific UI behavior.

Chrome DevTools can inspect the real WebView through:

```
chrome://inspect/#devices
```

---

## Prefer architectural fixes over WebView-specific hacks

When startup behavior is inconsistent in a real WebView, first inspect:

- startup dependencies;
- asynchronous initialization;
- rendering order;
- readiness boundaries;
- storage initialization;
- authentication dependencies.

Do not immediately add:

- forced overflow rules;
- artificial delays;
- touch event hacks;
- WebView-specific scrolling workarounds.

The PREVIA startup issue was solved by removing an unnecessary startup dependency.

---

## Full lifecycle verification matters

After an architectural change, test the complete user lifecycle rather than only the changed function.

For Customer and Favorites this includes:

1. First Mini App entry.
2. Public UI initialization.
3. Customer creation.
4. Identity initialization.
5. Favorites initialization.
6. Add Favorite.
7. Remove Favorite.
8. Multiple Favorites.
9. Re-entry.
10. Existing Customer restoration.
11. Favorites persistence.
12. Google Sheets verification.
13. Manual Telegram connection.
14. Favorites reinitialization.
15. Cart.
16. Order creation.
17. Product reservation.
18. PDF generation.

---

## Separate observations from root causes

During real-device testing the following console message was observed:

```
window.__tg__postBackgroundChange is not a function
```

This was treated as a separate observation.

It was not included in the startup refactor because it was not demonstrated to be the cause of the startup or scrolling problem.

Architectural changes should be based on verified dependencies rather than unrelated console noise.
