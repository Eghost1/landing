# 🔧 GA4 Multi-Page Tracking - Guía de Solución

## 🎯 Problema Identificado

**Google Analytics solo muestra la página "/" en los reportes**, cuando debería mostrar todas las páginas del sitio (nosotros.html, gracias.html, servicio/, trabajador/).

## 🔍 Causas del Problema

1. **Eventos `page_view` duplicados** - Se estaban enviando eventos manuales que conflictuaban con el tracking automático
2. **Configuración inconsistente** - Diferentes páginas tenían diferentes configuraciones de tracking
3. **Timing issues** - Los eventos se enviaban antes de que GA4 estuviera completamente cargado

## ✅ Soluciones Implementadas

### 1. **Eliminación de Eventos Duplicados**
- ❌ Removido: Evento manual `page_view` en `nosotros.html` (línea 349)
- ✅ Ahora: Solo GA4 automático maneja `page_view` via `gtag('config')`

### 2. **Nuevo Sistema de Tracking Mejorado**
- ✅ Creado: `ga4-page-fix.js` - Asegura tracking correcto por página
- ✅ Creado: `ga4-test.html` - Herramienta de verificación en tiempo real
- ✅ Actualizado: `analytics-config.js` - Eliminados conflictos de `page_view`

### 3. **Archivos Actualizados**
```
✅ index.html - Incluye ga4-page-fix.js
✅ nosotros.html - Incluye ga4-page-fix.js + evento duplicado removido
✅ gracias.html - Incluye ga4-page-fix.js
✅ servicio/index.html - Incluye ga4-page-fix.js
✅ trabajador/index.html - Incluye ga4-page-fix.js
✅ analytics-config.js - Optimizado, sin page_view duplicados
➕ ga4-page-fix.js - Nuevo: Fix específico de tracking
➕ ga4-test.html - Nuevo: Herramienta de testing
```

## 🧪 Cómo Verificar la Solución

### Paso 1: Usar la Herramienta de Testing
1. Abrir `ga4-test.html` en el navegador
2. Verificar que GA4 y GTM aparezcan como "✅ Disponible"
3. Hacer clic en "Test Page View" y verificar que se envíe correctamente
4. Visitar cada página del sitio usando los enlaces

### Paso 2: Verificar en Google Analytics
1. Ir a **Google Analytics** → **Informes** → **Tiempo real**
2. En la sección "Páginas vistas", deberías ver:
   - `/` o `/index.html` (página principal)
   - `/nosotros.html` (página nosotros)
   - `/gracias.html` (página gracias)
   - `/servicio/` (deep link servicio)
   - `/trabajador/` (deep link trabajador)

### Paso 3: Verificar en Consola del Navegador
1. Abrir DevTools (F12) → Consola
2. Navegar por las páginas
3. Buscar mensajes como:
   ```
   🎯 GA4 Page Tracking configurado: {page_title: "...", page_path: "/nosotros.html"}
   ✅ GA4 Event sent: nubira_page_session
   ```

## 📊 Debugging Manual

### Función de Debug
En cualquier página, ejecutar en la consola:
```javascript
debugGA4()
```

### Verificar DataLayer
```javascript
console.log(dataLayer)
```

### Forzar Evento de Página
```javascript
gtag('event', 'manual_page_test', {
    page_path: window.location.pathname,
    page_title: document.title
})
```

## ⏰ Tiempo de Aparición de Datos

- **Tiempo Real**: Inmediato (1-5 minutos)
- **Informes Estándar**: 24-48 horas
- **Informes Personalizados**: Hasta 48 horas

## 🔧 Configuración Técnica

### GA4 ID: `G-SWXSF3D6YS`
- ✅ Configurado en todas las páginas
- ✅ Tracking automático de `page_view`
- ✅ Dimensiones personalizadas configuradas

### GTM ID: `GTM-WDTVWF7C`
- ✅ DataLayer implementado
- ✅ Eventos personalizados habilitados
- ✅ Fallback para cuando gtag no está disponible

## 🚨 Puntos Importantes

1. **No enviar `page_view` manual** - GA4 lo hace automáticamente
2. **Usar `nubira_page_session`** - Para tracking adicional sin conflictos
3. **Esperar carga completa** - Los scripts tienen delays para asegurar disponibilidad
4. **Verificar en tiempo real** - No esperar 24 horas para verificar

## ✅ Checklist de Verificación

- [ ] `ga4-test.html` muestra GA4 y GTM como disponibles
- [ ] Cada página genera logs en consola
- [ ] Google Analytics Tiempo Real muestra múltiples páginas
- [ ] No hay errores 404 en Network tab para scripts GA4
- [ ] DataLayer se puebla correctamente en cada página

## 🆘 Si Siguen los Problemas

1. **Verificar AdBlockers** - Pueden bloquear GA4
2. **Revisar Network Tab** - Verificar que gtag.js se carga
3. **Verificar CORS** - Si las páginas están en different domains
4. **Usar ga4-test.html** - Para diagnosis detallada

---

**Resultado Esperado**: Todas las páginas aparecerán en Google Analytics dentro de las próximas 24-48 horas, con datos en tiempo real disponibles inmediatamente.