# Usa una imagen base de PHP con Apache
FROM php:8.0-apache

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Copia los archivos del proyecto al contenedor
COPY . .

# Cambia los permisos para los directorios de EspoCRM
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Instala cron y otras dependencias necesarias para el backup
RUN apt-get update && apt-get install -y \
    cron \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Crea el directorio para los backups
RUN mkdir /backups

# Copia el script de backup al contenedor
COPY backup.sh /usr/local/bin/backup.sh
RUN chmod +x /usr/local/bin/backup.sh

# Configura cron para ejecutar el script a las 12:50 todos los días
RUN echo "50 12 * * * /usr/local/bin/backup.sh" > /etc/crontabs/root

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Inicia cron y el servidor Apache
CMD ["sh", -c "cron && apache2-foreground"]
