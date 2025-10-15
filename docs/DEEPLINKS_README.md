# Configuración de Deep Links - Nubira Seguridad

## 📱 URLs de las Tiendas de Apps
- **Android Play Store**: https://play.google.com/store/apps/details?id=com.nubira.seguridad
- **iOS App Store**: https://apps.apple.com/app/nubira-seguridad/id123456789

## 🔧 Configuración Requerida

### 1. Android (assetlinks.json)
- **Ubicación**: `/.well-known/assetlinks.json`
- **Package Name**: `com.nubira.seguridad`
- **SHA256 Fingerprint**: Reemplazar `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` con tu fingerprint real

### 2. iOS (apple-app-site-association)
- **Ubicación**: `/.well-known/apple-app-site-association`
- **Team ID**: Reemplazar `REPLACE_WITH_TEAM_ID` con tu Team ID de Apple
- **Bundle ID**: `com.nubira.seguridad`

## 🌐 Rutas Configuradas

### Universal Links:
- `/servicio/*` - Para servicios específicos
- `/trabajador/*` - Para perfiles de trabajadores
- `/service/*` - Alternativa en inglés
- `/worker/*` - Alternativa en inglés

### Custom URL Scheme:
- `nubiraseguridad://servicio/{id}` - Abrir servicio específico
- `nubiraseguridad://trabajador/{id}` - Abrir perfil de trabajador

## 📄 Páginas Creadas

### Generales:
- `/servicio/index.html` - Página de redirección genérica para servicios
- `/trabajador/index.html` - Página de redirección genérica para trabajadores

### Ejemplos específicos:
- `/servicio/123.html` - Ejemplo de servicio específico
- `/trabajador/456.html` - Ejemplo de trabajador específico (Carlos Mendoza)

## 🚀 Cómo usar

### Para crear una nueva página de servicio:
1. Copia `/servicio/123.html`
2. Renombra a `/servicio/{nuevo_id}.html`
3. Actualiza el contenido con los datos del servicio
4. Actualiza el script para usar el nuevo ID

### Para crear una nueva página de trabajador:
1. Copia `/trabajador/456.html`
2. Renombra a `/trabajador/{nuevo_id}.html`
3. Actualiza el contenido con los datos del trabajador
4. Actualiza el script para usar el nuevo ID

## 🔍 Testing

### Probar en dispositivo:
1. **Android**: Instala la app y visita `https://www.nubiraoficial.cl/servicio/123`
2. **iOS**: Instala la app y visita `https://www.nubiraoficial.cl/trabajador/456`

### Probar sin app:
- Debería redirigir a la tienda correspondiente después de 3 segundos

## ⚙️ Configuración del Servidor

### Apache (.htaccess):
```apache
# Redirecciones para deep links dinámicos
RewriteEngine On
RewriteRule ^servicio/([0-9]+)$ /servicio/$1.html [L]
RewriteRule ^trabajador/([0-9]+)$ /trabajador/$1.html [L]

# Headers para archivos .well-known
<FilesMatch "assetlinks\.json">
    Header set Content-Type "application/json"
    Header set Access-Control-Allow-Origin "*"
</FilesMatch>

<FilesMatch "apple-app-site-association">
    Header set Content-Type "application/json"
    Header set Access-Control-Allow-Origin "*"
</FilesMatch>
```

### Nginx:
```nginx
# Redirecciones para deep links dinámicos
location ~ ^/servicio/([0-9]+)$ {
    try_files /servicio/$1.html /servicio/index.html;
}

location ~ ^/trabajador/([0-9]+)$ {
    try_files /trabajador/$1.html /trabajador/index.html;
}

# Headers para archivos .well-known
location /.well-known/assetlinks.json {
    add_header Content-Type application/json;
    add_header Access-Control-Allow-Origin *;
}

location /.well-known/apple-app-site-association {
    add_header Content-Type application/json;
    add_header Access-Control-Allow-Origin *;
}
```

## 📋 Checklist de Implementación

- [x] Crear directorio `.well-known/`
- [x] Crear `assetlinks.json` para Android
- [x] Crear `apple-app-site-association` para iOS
- [x] Crear páginas de redirección para `/servicio/`
- [x] Crear páginas de redirección para `/trabajador/`
- [x] Crear ejemplos funcionales
- [ ] Reemplazar placeholders con datos reales
- [ ] Subir archivos al servidor
- [ ] Configurar servidor web
- [ ] Probar deep links en dispositivos
- [ ] Verificar en Google Search Console
- [ ] Verificar en Apple App Site Association Validator