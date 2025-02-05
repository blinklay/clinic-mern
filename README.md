# Clinic MERN

Полноценный сервис для подачи заявок с авторизацией.

## Стек технологий

- **Vite + React**
- **Mongoose + MongoDB**
- **Concurrently**
- **Jsonwebtoken**

## Маршруты

- **`/login`** – страница авторизации.
- **`/requests`** – просмотр заявок (доступно только авторизованным пользователям).
- **`/`** – главная страница для подачи заявок.

## Установка и запуск

1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/blinklay/clinic-mern .
    ```

2. Установите зависимости:
    ```bash
    npm i
    cd client
    npm i
    cd ..
    ```

3. Запустите проект:
    ```bash
    npm run dev
    ```
