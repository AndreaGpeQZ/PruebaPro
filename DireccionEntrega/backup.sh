#!/bin/bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="/backups/backup_$TIMESTAMP.tar.gz"

# Comprime el directorio /var/www/html en el contenedor
tar -czvf "$BACKUP_FILE" /var/www/html
