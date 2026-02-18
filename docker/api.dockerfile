FROM php:8.2-fpm-alpine

# Install PostgreSQL driver and other essentials
RUN apk add --no-cache \
    postgresql-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Set working directory
WORKDIR /var/www/api-server

# Copy PHP code (will be volume mounted in compose)
COPY api-server/ /var/www/api-server/

EXPOSE 9000
CMD ["php-fpm"]