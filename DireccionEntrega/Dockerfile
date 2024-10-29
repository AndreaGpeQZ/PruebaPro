# Usa una imagen base de PHP con Apache
FROM php:8.0-apache

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos del proyecto al contenedor
COPY . .

# Cambia los permisos para los directorios de EspoCRM
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Inicia el servidor Apache
CMD ["apache2-foreground"]
