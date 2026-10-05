# Roadmap

# Completed

## Customer Infrastructure

Completed:

- Customer domain;
- Telegram Customer identification;
- Identity;
- Customer persistence;
- duplicate Customer prevention;
- Cloud Favorites;
- Local Favorites;
- Favorites synchronization;
- Customer and Favorites Google Sheets persistence;
- Customer Platform integration;
- startup personalization lifecycle;
- Favorites readiness states;
- Favorites reinitialization;
- real Telegram Mini App verification.

Status:

**COMPLETED**

---

## Startup Lifecycle

Completed:

- public UI startup independent from Customer restoration;
- `UI_READY`;
- independent personalization path;
- `PERSONALIZATION_READY`;
- centralized `TelegramBridge.ready()`;
- Favorites initialization states;
- Favorite action guards;
- `Favorites.reinitialize()`;
- Favorite UI refresh;
- Favorites page loading state;
- startup diagnostics;
- real Telegram WebView verification.

Status:

**COMPLETED**

---

# v1.2

## Customer Panel

- Connect existing Customer Panel UI to Customer / Identity infrastructure.
- Display current Customer information.
- Display Customer-specific state.
- Keep Customer Panel independent from public storefront rendering.

## Personal Vintage Search

Allow customers to request items currently unavailable in the boutique.

## Collector Privileges

Possible future features:

- loyalty levels;
- collector discounts;
- early access;
- exclusive offers;
- invitations.

## Purchase History

Display previous customer orders.

## Reserved Items History

Display products previously reserved by the customer.

## Progress Indicator

Improve feedback during asynchronous Customer and personalization operations.

## Rollback / Recovery

Provide safe recovery mechanisms for publishing and data operations.

## Decor Category

Expand product categories with Decor.

## Frontend Cache Improvements

Improve static resource and catalog loading without introducing unnecessary startup dependencies.

---

# Future

- Analytics
- Multi-language CMS
- Auctions
- Messages
- Community
- AI Recommendations
- Collection History
- Wishlists

Future features must preserve the existing modular architecture.

Optional personalization features must not become blocking dependencies of public storefront startup.
