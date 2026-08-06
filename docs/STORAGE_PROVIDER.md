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

Browser Local Storage

The current Favorites implementation stores data in browser Local Storage.

This is considered an infrastructure implementation.

---

# Future Implementations

Telegram Cloud

Database

REST API

Offline Cache

---

# Rules

Services never access storage directly.

Applications never manipulate storage directly.

Only Storage Providers communicate with the storage layer.

Storage Providers may be replaced without changing business logic.

---

# Example

Today

Favorite Button

↓

Favorites Service

↓

Browser Storage Provider

↓

Local Storage

Tomorrow

Favorite Button

↓

Favorites Service

↓

Cloud Storage Provider

↓

Database

Business logic remains unchanged.