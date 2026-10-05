# PREVIA Workflow

Краткая шпаргалка по ежедневной работе.

---

# PREVIA CMS

## Начало работы

Проверить состояние проекта.

```bash
git status
clasp status
```

Если всё в порядке — начинаем работу.

---

## Завершение работы

Проверить изменения.

```bash
git status
```

Добавить изменения.

```bash
git add .
```

Создать коммит.

```bash
git commit -m "..."
```

Отправить изменения в GitHub.

```bash
git push
```

Синхронизировать Apps Script.

```bash
clasp push
```

---

# PREVIA Vintage-App

## Начало работы

Проверить состояние проекта.

```bash
git status
```

Получить последние изменения.

```bash
git pull
```

---

## Завершение работы

Проверить изменения.

```bash
git status
```

Добавить изменения.

```bash
git add .
```

Создать коммит.

```bash
git commit -m "..."
```

Отправить изменения в GitHub.

```bash
git push
```

---

# Safe Feature Workflow

Для архитектурных изменений PREVIA Vintage App используется отдельная feature-ветка.

Пример:

```bash
git switch -c feature/my-change
```

Основная ветка `main` не должна использоваться для разработки непроверенных архитектурных изменений.

---

# Before Editing

Перед началом работы:

```bash
git status
```

Убедиться, что нет случайных незакоммиченных изменений.

Если рабочее дерево уже содержит изменения, сначала определить их происхождение.

---

# During Development

После изменения кода:

```bash
git status
```

Проверить изменённые файлы.

Затем:

```bash
git diff --stat
```

После этого проверить сам diff:

```bash
git diff
```

Не принимать большие или неожиданные изменения без проверки.

---

# Local Verification

Перед публикацией архитектурного изменения:

1. Запустить приложение локально.
2. Проверить public UI.
3. Проверить Catalog.
4. Проверить Product.
5. Проверить Favorites.
6. Проверить Cart.
7. Проверить Order flow, если изменение может его затронуть.
8. Проверить консоль браузера.
9. Проверить мобильное поведение.

---

# Telegram Mini App Verification

Если изменение касается:

- Telegram;
- startup;
- scrolling;
- viewport;
- touch;
- authentication;
- Customer;
- Favorites;
- WebView lifecycle;

необходимо по возможности проверить реальное устройство.

Chrome mobile emulation не заменяет реальный Telegram WebView.

---

# Real Device Debugging

Android Telegram WebView можно инспектировать через:

```
chrome://inspect/#devices
```

Проверять:

- Console;
- Elements;
- computed styles;
- document scroll state;
- Telegram WebApp state;
- network requests;
- runtime errors.

---

# Startup Verification

Для PREVIA startup доступны:

```javascript
window.testPreviaStartup()
```

и:

```javascript
window.testFavoritesReadiness()
```

Проверять:

```
UI_READY
Favorites state
Favorites readiness
Identity state
Telegram Mini App state
scrollHeight
viewportHeight
scrollable
```

---

# Architecture Changes

Для архитектурных изменений сначала определить:

- какой модуль отвечает за функцию;
- какие модули от неё зависят;
- является ли зависимость обязательной;
- можно ли сделать зависимость асинхронной;
- не блокирует ли изменение публичный storefront.

Особенно важно не делать Customer и Favorites блокирующими зависимостями public UI.

---

# Safe Merge Workflow

После локального и реального тестирования:

Сначала убедиться, что основная ветка актуальна.

```bash
git switch main
git pull --ff-only origin main
```

Затем вернуться в feature-ветку:

```bash
git switch feature/my-change
```

Обновить feature-ветку относительно актуального `main` только после проверки состояния веток.

---

# Merge

После успешного тестирования feature-ветка может быть объединена с `main`.

Предпочтительный вариант:

```bash
git switch main
git pull --ff-only origin main
git merge --no-ff feature/my-change
```

После merge:

```bash
git status
```

Проверить:

```bash
git diff HEAD~1
```

или другой подходящий диапазон diff в зависимости от количества коммитов.

---

# Push

Только после проверки:

```bash
git push origin main
```

---

# Documentation

Архитектурные изменения должны сопровождаться документацией.

Для startup/customer изменений обновляются соответствующие:

- `Architecture.md`
- `Customer Login Flow.md`
- `Customer Platform Architecture.md`
- `Startup Lifecycle.md`
- `PUBLIC_API.md`
- `STORAGE_PROVIDER.md`
- `Technical_Passport.md`
- `Lessons_Learned.md`
- `CHANGELOG.md`

---

# Rule

Если работа завершена — проект должен быть:

- проверен;
- без случайных незакоммиченных изменений;
- отправлен в GitHub;
- для CMS — синхронизирован через `clasp push`.

---

# Important Rule

Никогда не менять архитектурные модули только для устранения симптома на одном устройстве, пока не проверены:

1. startup lifecycle;
2. asynchronous dependencies;
3. rendering order;
4. storage initialization;
5. authentication lifecycle;
6. real WebView behavior.

Сначала причина.

Потом минимальное изменение.

Потом проверка.

Потом документация.
