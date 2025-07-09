# MTS_TEST_TASK
Это репозиторий с тестовым заданием на стажировку мтс

## Requirements

- Node.js 18+
- Yarn

## Запуск 

1. Клонирование репозитория:
   ```bash
    git clone https://github.com/e11sy/mts_test_task.git
    cd mts_test_task
   ```
### Запуск API

1. Установка зависимостей:
   ```bash
    cd ./backend
    yarn install
   ```

2. Установка переменных окружения
   - Copy the `.env.sample` file to `.env`:
     ```bash
     cp .env.sample .env
     ```
   - Обновление `.env` файла - установка всех ключей

3. Запуск
   ```bash
    yarn dev
   ```

### Запуск WEB
1. Установка зависимостей:
   ```bash
    cd ./frontend
    yarn install
   ```

2. Установка переменных окружения
   - Copy the `.env.sample` file to `.env`:
     ```bash
     cp .env.sample .env
     ```
   - Обновление `.env` файла:
     ```env
     VITE_API_URL=your-api-url
     ```
> [!NOTE]  
> При локальном запуске апи запускается на `http://localhost:1337/api`

3. Запуск:
   - Запуск сервера в dev режиме 
   ```bash
   yarn dev
