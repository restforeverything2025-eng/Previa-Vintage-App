# PREVIA Bible

## Mission

Build a reliable CMS where the owner thinks about products, not code.

## Principles

1. One button.
2. Google Sheets is the only source of truth.
3. Every function has one responsibility.
4. Simplicity before intelligence.
5. Intelligence before beauty.
6. Never bypass validation.
7. Document architecture before expanding it.
8. Public UI must not depend on optional personalization services.

# Completed Modules

### Dashboard v2.0

Dashboard has been redesigned into a compact administrative overview.

Features:

- two-column layout;
- statistics cards;
- publication summary card;
- modern card styling;
- no scrolling on standard screens;
- optimized readability.

Purpose:

Provide instant project status immediately after opening CMS.

---

# Frontend Architecture Principle

The public storefront and customer personalization are separate layers.

Public storefront functionality includes:

- Home;
- Catalog;
- Product pages;
- Search;
- Gallery;
- Cart;
- public browsing.

Customer personalization includes:

- Customer identity;
- Telegram authentication;
- Identity;
- Cloud Favorites;
- future personal customer features.

Customer personalization must not block public storefront startup.

The application therefore uses separate readiness boundaries:

```
UI_READY
```

and:

```
PERSONALIZATION_READY
```

---

# Simplicity Before Intelligence

When a module is optional for public browsing, it must not become a blocking dependency of the public startup path.

The architecture should prefer:

```
fast public UI
+
asynchronous personalization
```

over:

```
personalization
+
everything waits
```

This keeps the storefront resilient when external services are slow.
