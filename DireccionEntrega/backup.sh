#!/bin/bash

# Variables
REPO_URL="https://github.com/AndreaGpeQZ/PruebaPro.git"
BACKUP_DIR="/backups/$(date +'%Y-%m-%d_%H-%M-%S')"

# Crea el directorio de backup
mkdir -p "$BACKUP_DIR"

# Clona o actualiza el repositorio en el directorio de backups
if [ -d "$BACKUP_DIR/.git" ]; then
  cd "$BACKUP_DIR"
  git pull
else
  git clone "$REPO_URL" "$BACKUP_DIR"
fi
