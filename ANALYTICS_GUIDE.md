# 📊 Configuración Completa de Analytics - Nubira

## 🎯 **RESUMEN EJECUTIVO**

Sistema completo de medición implementado para Nubira con **Google Analytics 4** y **Google Tag Manager**, enfocado en medir conversiones, engagement y uso de deep links.

---

## 📈 **EVENTOS DE CONVERSIÓN (CTAs)**

### **Botones Principales de CTA:**
| Evento | Descripción | Ubicación | Valor Negocio |
|--------|-------------|-----------|---------------|
| `cta_comenzar_click` | Click en "¡Comenzar!" | Nav, Hero, Secciones | **Alto** - Conversión principal |
| `cta_agendar_click` | Click en "Agendar cita" | Hero section | **Alto** - Intención de uso |
| `cta_registrar_click` | Click en "Registrarme" (trabajadores) | Hero section | **Alto** - Onboarding profesional |
| `form_submit_success` | Formulario enviado exitosamente | Página contacto | **Crítico** - Lead generado |

### **Métricas Clave a Observar:**
- **CTR del hero**: Ratio de clicks en botones principales vs vistas
- **Conversión de formulario**: % usuarios que completan contacto
- **Funnel de conversión**: Hero → Contacto → Envío exitoso

---

## 🔗 **DEEP LINKS - MEDICIÓN COMPLETA**

### **Eventos de Deep Links:**
| Evento | Qué Mide | Datos Capturados |
|--------|----------|------------------|
| `deeplink_servicio_access` | Acceso a `/servicio/{id}` | ID servicio, referrer, dispositivo |
| `deeplink_trabajador_access` | Acceso a `/trabajador/{id}` | ID trabajador, referrer, dispositivo |
| `deeplink_servicio_deeplink_attempt` | Intento de abrir app (servicio) | URL deep link, timing |
| `deeplink_trabajador_deeplink_attempt` | Intento de abrir app (trabajador) | URL deep link, timing |
| `deeplink_servicio_fallback_redirect` | Redirección a tienda (servicio) | Razón fallback, tiempo espera |
| `deeplink_trabajador_fallback_redirect` | Redirección a tienda (trabajador) | Razón fallback, tiempo espera |
| `deeplink_servicio_download_android_attempt` | Click descarga Android | Desde página servicio |
| `deeplink_trabajador_download_ios_attempt` | Click descarga iOS | Desde página trabajador |

### **KPIs Críticos de Deep Links:**
- **Tasa de éxito**: % usuarios que logran abrir la app vs los que van a tienda
- **Deep links más usados**: IDs de servicios/trabajadores más populares  
- **Conversión a descarga**: % usuarios que descargan app después del fallback
- **Origen de tráfico**: De dónde vienen los deep links (redes sociales, ads, etc.)

---

## 🧭 **NAVEGACIÓN Y ENGAGEMENT**

### **Eventos de Navegación:**
| Evento | Descripción | Utilidad |
|--------|-------------|----------|
| `navigation_click` | Clicks en menú principal | Flujo de usuarios |
| `footer_link_click` | Clicks en footer | Páginas más relevantes |
| `logo_click` | Clicks en logo Nubira | Reconocimiento de marca |
| `social_media_click` | Clicks redes sociales | Engagement social |

### **Eventos de Engagement:**
| Evento | Qué Mide | Valor |
|--------|----------|-------|
| `scroll_milestone` | Scroll depth (25%, 50%, 75%, 90%, 100%) | Interés en contenido |
| `time_on_page_milestone` | Tiempo en página (10s, 30s, 60s, 120s, 300s) | Calidad de engagement |
| `form_start` | Usuario comienza a llenar formulario | Intención de conversión |

---

## 📋 **FORMULARIO DE CONTACTO**

### **Funnel Completo del Formulario:**
1. `form_start` - Usuario enfoca primer campo
2. `form_submit_attempt` - Usuario hace click en enviar
3. `form_submit_success` - Formulario enviado exitosamente
4. `form_submit_error` - Error en envío (si aplica)

### **Datos Capturados:**
- Índice del formulario
- Campos completados
- Tiempo hasta completar
- Errores de validación

---

## 🔍 **CÓMO USAR ESTOS DATOS**

### **En Google Analytics 4:**

**1. Dashboard de Conversiones:**
```
Eventos > cta_*_click
Filtrar por: event_category = "cta_conversion"
Métricas: Total events, Unique users, Conversion rate
```

**2. Análisis Deep Links:**
```
Eventos > deeplink_*
Dimensiones personalizadas: deeplink_type, deeplink_id
Segmento: is_mobile = true/false
```

**3. Funnel de Conversión:**
```
Exploration > Funnel
Pasos:
1. page_view_enhanced
2. cta_*_click  
3. form_start
4. form_submit_success
```

### **En Google Tag Manager:**

**1. Triggers Personalizados:**
- Activar en clicks con `data-cta` o `data-analytics`
- Enviar a GA4 con dimensiones personalizadas

**2. Variables Útiles:**
- `{{Click Classes}}` - Para identificar tipo de botón
- `{{Page Path}}` - Para saber en qué página se hizo click
- `{{Referrer}}` - Para entender origen del tráfico

---

## 📊 **REPORTES SUGERIDOS**

### **Reporte Semanal de Conversiones:**
- Total de leads generados (form_submit_success)
- CTR por tipo de botón CTA
- Páginas con mayor conversión
- Dispositivos con mejor performance

### **Reporte Mensual de Deep Links:**
- Top 10 servicios/trabajadores más accedidos
- % éxito de deep links vs fallback
- Conversión de fallback a descarga de app
- Análisis por fuente de tráfico

### **Reporte de Engagement:**
- Tiempo promedio en página por sección
- Scroll depth promedio por página
- Tasa de rebote mejorada (usuarios que pasan >30s y >50% scroll)

---

## ⚙️ **CONFIGURACIÓN TÉCNICA**

### **Archivos Modificados:**
- `analytics-config.js` - Script principal de tracking
- `index.html` - CTAs con atributos de tracking
- `nosotros.html` - Script de analytics agregado
- `gracias.html` - Evento de conversión mejorado
- `servicio/index.html` - Tracking específico de deep links
- `trabajador/index.html` - Tracking específico de deep links

### **Dependencias:**
- Google Analytics 4 (ID: G-SWXSF3D6YS)
- Google Tag Manager (ID: GTM-WDTVWF7C)
- Feather Icons (para iconos de UI)

### **Eventos Automáticos:**
- Se inicializan cuando carga la página
- No requieren configuración adicional
- Funcionan en móvil y escritorio

---

## 🚀 **PRÓXIMOS PASOS**

### **Implementación Inmediata:**
1. ✅ Subir `analytics-config.js` al servidor
2. ✅ Verificar que los scripts cargan en todas las páginas
3. ⏳ Probar eventos en Google Analytics Real-Time
4. ⏳ Configurar alertas para caídas de conversión

### **Optimización Futura:**
- **A/B Testing**: Probar diferentes textos en CTAs
- **Heat Maps**: Implementar Hotjar/Crazy Egg para clicks visuales
- **User Sessions**: Grabar sesiones de usuarios problemáticos
- **Conversion Funnels**: Crear funnels personalizados por tipo de usuario

---

## 📞 **SOPORTE**

**Para consultas técnicas:**
- Revisar console del navegador para logs de eventos
- Verificar Google Analytics Real-Time para eventos en vivo
- Usar Google Tag Assistant para debugging

**Eventos críticos a monitorear:**
- ❗ Si `form_submit_success` baja drásticamente
- ❗ Si `deeplink_*_access` no aparece en analytics  
- ❗ Si CTR de hero buttons está bajo 5%

---

✨ **El sistema está configurado para capturar todo el customer journey desde el primer click hasta la conversión final. ¡Ahora puedes tomar decisiones basadas en datos reales!**