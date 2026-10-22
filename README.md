# Dota 2 Heroes Tracker

Веб-приложение для просмотра статистики героев Dota 2.

Проект получает игровые данные из **STRATZ GraphQL API**, сохраняет их в PostgreSQL и отображает через Laravel, Inertia.js и React.

## Возможности

- 📊 Статистика героев Dota 2
- 📈 Месячная статистика и winrate
- ⚔️ Matchups между героями
- 🛡️ Counter picks
- 🎯 Герои, против которых герой показывает лучшие результаты
- 🛒 Популярные предметы и билды
- ⭐ Добавление героев в избранное
- 🔐 Регистрация и авторизация пользователей
- 👤 Личный dashboard с избранными героями
- 🔄 Синхронизация данных со STRATZ API

## Технологический стек

### Backend
- PHP 8.4
- Laravel 13
- Laravel Fortify
- PostgreSQL 18
- STRATZ GraphQL API

### Frontend
- React 19
- Inertia.js 3
- TypeScript / TSX
- Tailwind CSS 4
- Vite
- Wayfinder

### Инфраструктура
- Docker
- Docker Compose
- Nginx

## Запуск проекта через Docker

Docker позволяет запустить приложение вместе с необходимыми сервисами без ручной установки PHP, Composer, Node.js и PostgreSQL на компьютере.

### 1. Требования

Перед началом установи:

- [Docker](https://docs.docker.com/get-docker/)
- Docker Compose (обычно доступен через команду `docker compose` вместе с Docker)

### 2. Клонирование репозитория

```bash
git clone https://github.com/Seleznyo/Tracker-heroes-dota2.git

cd Tracker-heroes-dota2
```

### 3. Настройка окружения

Создай файл `.env` на основе примера:

```bash
cp .env.example .env
```

Открой `.env` и укажи настройки приложения, базы данных и STRATZ API.

Пример настроек:

```env
APP_NAME="Dota 2 Heroes Tracker"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=tracker
DB_USERNAME=tracker
DB_PASSWORD=tracker

STRATZ_API_URL=https://api.stratz.com/graphql
STRATZ_API_TOKEN=your_token
```

> **Важно:** `DB_HOST=postgres` — это имя сервиса PostgreSQL из `docker-compose.yml`. Внутри Docker-контейнеров приложение подключается к базе через внутреннюю сеть, а не через `localhost`.

Убедись, что параметры подключения к базе в `.env` совпадают с настройками сервиса `postgres` в `docker-compose.yml`.

Для работы синхронизации данных также понадобится токен STRATZ API.

### 4. Сборка и запуск контейнеров

Выполни:

```bash
docker compose up -d --build
```

Команда соберёт образ приложения и запустит контейнеры в фоновом режиме.

В проекте используются три основных сервиса:

| Сервис | Назначение |
|---|---|
| `app` | Laravel и PHP-FPM |
| `nginx` | Веб-сервер, обрабатывающий HTTP-запросы |
| `postgres` | PostgreSQL для хранения данных |

Проверить состояние контейнеров можно командой:

```bash
docker compose ps
```

Посмотреть логи приложения:

```bash
docker compose logs -f app
```

### 5. Генерация ключа приложения

Выполни:

```bash
docker compose exec app php artisan key:generate
```

Эта команда сгенерирует `APP_KEY`, необходимый Laravel для работы с шифрованием и сессиями.

### 6. Миграции базы данных

Создай таблицы:

```bash
docker compose exec app php artisan migrate
```

Laravel подключится к PostgreSQL внутри Docker и выполнит миграции.

### 7. Открытие приложения

После запуска контейнеров открой в браузере:

**http://localhost:8080**

## Синхронизация данных со STRATZ API

После настройки приложения и базы данных можно запустить Artisan-команды синхронизации.

Например, синхронизация предметов:

```bash
docker compose exec app php artisan sync:items
```

Синхронизация предметов героев:

```bash
docker compose exec app php artisan items:sync-hero-items
```
Синхронизация героев:

```bash
docker compose exec app php artisan heroes:sync
```
Синхронизация матчапов:

```bash
docker compose exec app php artisan heroes:sync-matchups
```
Синхронизация статистики:

```bash
docker compose exec app php artisan heroes:sync-stats
```

Остальные команды синхронизации зависят от актуальной реализации проекта. Посмотреть доступные команды можно так:

```bash
docker compose exec app php artisan list
```

Перед запуском синхронизации убедись, что токен STRATZ API указан в `.env`, а необходимые справочные данные уже загружены в базу.

## Полезные Docker-команды

Запустить контейнеры:

```bash
docker compose up -d
```

Остановить контейнеры:

```bash
docker compose down
```

Пересобрать приложение после изменения Dockerfile или зависимостей:

```bash
docker compose up -d --build
```

Посмотреть состояние контейнеров:

```bash
docker compose ps
```

Посмотреть логи:

```bash
docker compose logs -f
```

Выполнить Artisan-команду:

```bash
docker compose exec app php artisan <command>
```

## Структура проекта

```text
app/
├── Console/
│   └── Commands/
├── Http/
│   └── Controllers/
├── Models/
└── Services/

database/
└── migrations/

resources/
├── css/
└── js/
    ├── components/
    ├── layouts/
    └── pages/

docker/
└── entrypoint.sh

nginx/
└── default.conf

Dockerfile
docker-compose.yml
vite.config.ts
```

## Основные модели

```text
User
 └── Favorite Heroes

Hero
 ├── HeroStats
 ├── HeroMatchups
 ├── HeroItems
 └── HeroStartingItems

Item
 ├── HeroItems
 └── HeroStartingItems
```

## Работа со STRATZ API

Для получения игровой статистики используется GraphQL API сервиса STRATZ.

Данные загружаются из STRATZ и сохраняются в PostgreSQL. Благодаря этому приложение может получать статистику из локальной базы, не обращаясь к внешнему API при каждом открытии страницы.

## Цели проекта

Проект создаётся для изучения и практического применения:

- Laravel и PHP
- REST и GraphQL API
- Eloquent ORM
- PostgreSQL и SQL
- Inertia.js и React
- TypeScript
- Tailwind CSS
- Docker и Docker Compose
- Nginx
- Авторизации и работы с пользователями
- Синхронизации данных из внешних API

## License

This project is for educational purposes.
