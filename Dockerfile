# Stage 1: Build frontend assets
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production environment
FROM php:8.2-cli-alpine

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    unzip \
    libpq-dev \
    libxml2-dev \
    git \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql pgsql mbstring exif pcntl bcmath

# 1. تعديل إعدادات PHP لرفع حجم الملفات المسموح بها
RUN echo "upload_max_filesize = 25M" >> /usr/local/etc/php/conf.d/docker-php-upload.ini \
    && echo "post_max_size = 30M" >> /usr/local/etc/php/conf.d/docker-php-upload.ini \
    && echo "memory_limit = 256M" >> /usr/local/etc/php/conf.d/docker-php-upload.ini

# 2. تعديل إعدادات خادم Nginx (لمنع خطأ 413 الشهير)
RUN sed -i 's/client_max_body_size.*/client_max_body_size 30M;/' /etc/nginx/nginx.conf || true

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy project files
COPY . .

# Copy built assets from Stage 1
COPY --from=frontend-builder /app/public/build ./public/build

# Set correct permissions for Laravel storage and bootstrap cache
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

# Install PHP dependencies for production
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-plugins --no-scripts

# Expose port and start server
EXPOSE 10000
CMD php artisan config:clear && php artisan cache:clear && php artisan config:cache && php artisan route:cache && php artisan view:cache && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=10000