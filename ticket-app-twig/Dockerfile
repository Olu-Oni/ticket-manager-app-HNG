# Use Apache with PHP 8.2
FROM php:8.2-apache

# Install Node.js (needed for Tailwind build) and other essentials
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get update && apt-get install -y \
    nodejs \
    git \
    unzip \
    libzip-dev && \
    docker-php-ext-install zip && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy package files and install Node dependencies
COPY package*.json ./
RUN npm install

# Copy composer files and install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# Copy the rest of the application
COPY . .

# Build Tailwind CSS
RUN npm run build:css

# Configure Apache to serve from 'public' directory
RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf && \
    echo '<Directory /var/www/html/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' >> /etc/apache2/apache2.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]