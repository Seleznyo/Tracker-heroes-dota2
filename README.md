# Dota 2 Heroes Tracker

Веб-приложение для просмотра статистики героев Dota 2.

Проект получает данные из **STRATZ API**, сохраняет их в PostgreSQL и отображает статистику через Laravel + Inertia + React.

## Возможности

* 📊 Статистика героев Dota 2
* 📈 Месячная статистика и winrate
* ⚔️ Matchups между героями
* 🛡️ Counter picks
* 🎯 Heroes, против которых герой показывает лучший результат
* 🛒 Популярные предметы и билды
* ⭐ Добавление героев в избранное
* 🔐 Регистрация и авторизация пользователей
* 👤 Личный dashboard с избранными героями
* 🔄 Синхронизация данных со STRATZ API

## Стек

### Backend

* PHP 8.4
* Laravel 13
* Laravel Fortify
* PostgreSQL 18
* STRATZ GraphQL API

### Frontend

* React 19
* Inertia.js 3
* TypeScript / TSX
* Tailwind CSS 4
* Vite
* Wayfinder


## Требования

Для локальной разработки понадобятся:

* PHP 8.4+
* Composer
* Node.js 22+
* PostgreSQL

## Установка

Клонируйте репозиторий:

```bash
git clone https://github.com/Seleznyo/Tracker-heroes-dota2.git

cd Tracker-heroes-dota2
```

Создайте `.env`:

```bash
cp .env.example .env
```

Добавьте данные STRATZ API:

```env
STRATZ_API_URL=https://api.stratz.com/graphql
STRATZ_API_TOKEN=your_token
```
Так же нужно добавить данные базы данных

## База данных

После первого запуска необходимо выполнить миграции:

```bash
php artisan migrate
```

## Синхронизация данных

Проект использует Artisan-команды для получения данных из STRATZ API.

Синхронизация героев:

```bash
docker compose exec app php artisan heroes:sync
```

Синхронизация предметов:

```bash
docker compose exec app php artisan items:sync
```

Синхронизация статистики героев:

```bash
docker compose exec app php artisan heroes:sync-stats
```

Синхронизация matchups:

```bash
docker compose exec app php artisan heroes:sync-matchups
```

Синхронизация предметов героев:

```bash
docker compose exec app php artisan items:sync-hero-items   
```

> Названия команд должны соответствовать актуальным Artisan-командам проекта.

## Frontend

Для production-сборки:

```bash
npm run build
```

Для разработки:

```bash
composer run dev
```

В режиме разработки Vite запускает dev server и автоматически обновляет frontend при изменении файлов.

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
 │
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

## STRATZ API

Для получения игровой статистики используется GraphQL API сервиса STRATZ.

Данные сначала загружаются из STRATZ, затем сохраняются в локальную базу данных PostgreSQL.

Это позволяет приложению не обращаться к STRATZ API при каждом открытии страницы.


## Статус проекта

Основная цель проекта — изучение и практическое применение:

* Laravel
* REST / GraphQL API
* Eloquent ORM
* PostgreSQL
* Inertia.js
* React
* TypeScript
* Tailwind CSS
* Docker
* Nginx
* авторизации и работы с пользователями
* фоновых задач и синхронизации данных

## License

This project is for educational purposes.
