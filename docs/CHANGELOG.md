# Changelog

## 2026-10-04

### Startup Lifecycle Refactor

- Separated public storefront startup from Customer and Favorites initialization.
- Introduced the `UI_READY` startup boundary.
- Introduced the `PERSONALIZATION_READY` concept.
- Public Home and Catalog initialization no longer wait for Customer restoration.
- Centralized `Telegram.WebApp.ready()` through `TelegramBridge.ready()`.
- Moved Customer restoration into an independent personalization path.
- Added explicit Favorites initialization states:
  - `idle`
  - `loading`
  - `ready`
  - `error`
- Added `Favorites.reinitialize()`.
- Added Favorites readiness checks.
- Prevented Favorite actions while Favorites is still initializing.
- Added Favorite UI refresh after personalization initialization.
- Added loading behavior for the Favorites page while Favorites is not ready.
- Aligned manual Telegram Customer Platform login with the same personalization lifecycle.
- Added startup diagnostics:
  - `window.testPreviaStartup()`
  - `window.testFavoritesReadiness()`
- Added product Favorite data attributes for targeted UI refresh.
- Verified the new lifecycle on a real Android Telegram WebView.
- Verified repeated Telegram entry restores the existing Customer.
- Verified Customer creation and persistence.
- Verified Cloud Favorites creation, removal and persistence.
- Verified Favorites synchronization with Google Sheets.
- Verified Cart and Order flows after the startup refactor.
- Verified `orders` and `orderItems` records.
- Verified automatic product reservation.
- Verified PDF document generation.
- Verified Customer Platform / Immerse flow.

### Verification Status

Startup lifecycle refactor: **PASSED**.

Real Telegram Mini App verification: **PASSED**.

Customer and Cloud Favorites lifecycle verification: **PASSED**.

Order flow verification after refactor: **PASSED**.

---

## v1.1

- Automatic ID generation
- Automatic SKU generation
- Incoming workflow
- Automatic Products folders
- Automatic image publication
- Automatic data.js publication
- One Publish Boutique button
- Automatic Incoming cleanup
- Price/status updates without new products

## 2026-08-08

### Added

- Completed Customer + Cloud Favorites integration.
- Added real Telegram Customer creation and identity flow.
- Added cloud-based Favorites linked to Customer.
- Verified Favorites synchronization between mobile and desktop.
- Verified duplicate Customer prevention on repeated Telegram login.
- Verified persistence of Customers and Favorites in Google Sheets.

### Status

Customer infrastructure and Cloud Favorites integration: **PASSED**.
