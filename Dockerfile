# Базовый образ для сборки
FROM node:20-alpine AS build-stage
WORKDIR /app

# Кладём манифесты отдельно — для кэша
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Копируем исходный код
COPY . .

# Прод сборка приложения
RUN npm run build

# 2) Финальный образ для Nginx
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]