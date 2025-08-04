#!/bin/bash

# Script para ajustar los archivos JS para mayor compatibilidad con servidores compartidos

echo "Iniciando ajuste de archivos JS para compatibilidad con DonWeb..."

# Ubicación de la carpeta dist
DIST_DIR="./dist"
ASSETS_DIR="$DIST_DIR/assets"

# Verificar que la carpeta existe
if [ ! -d "$ASSETS_DIR" ]; then
  echo "Error: No se encontró la carpeta $ASSETS_DIR"
  exit 1
fi

# Crear un archivo de texto plano para cada archivo JS 
# que ayude al servidor a interpretar correctamente el tipo MIME
echo "Agregando archivos de ayuda para MIME types..."

find "$ASSETS_DIR" -name "*.js" | while read file; do
  filename=$(basename "$file")
  echo "/* Este archivo debe servirse como application/javascript */" > "$ASSETS_DIR/$filename.txt"
done

# Crear un archivo mime.types en dist
echo "Creando archivo mime.types..."
cat > "$DIST_DIR/mime.types" << EOL
application/javascript    js
text/css    css
image/webp    webp
image/png    png
image/jpeg    jpg jpeg
EOL

# Mensaje final
echo "¡Proceso completado! Los archivos están listos para subirse a DonWeb."
echo "Recuerda copiar TODOS los archivos, incluyendo los .htaccess, web.config y mime.types"

exit 0
