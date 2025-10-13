/**
 * GA4 Multi-Page Tracking Fix
 * Solución para que todas las páginas aparezcan correctamente en Google Analytics
 */

// Función para verificar y forzar el tracking correcto de GA4
function ensureGA4PageTracking() {
    // Esperar a que GA4 esté completamente cargado
    setTimeout(() => {
        if (typeof gtag !== 'undefined') {
            // Configurar parámetros de página específicos
            const pageData = {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
                page_referrer: document.referrer || '(direct)',
                language: document.documentElement.lang || 'es',
                site_section: getPageSection(),
                custom_page_id: generatePageId()
            };

            // Enviar configuración de página actualizada
            gtag('config', 'G-SWXSF3D6YS', {
                page_title: pageData.page_title,
                page_location: pageData.page_location,
                custom_map: {
                    'custom_dimension_1': 'page_section',
                    'custom_dimension_2': 'page_type'
                }
            });

            console.log('🎯 GA4 Page Tracking configurado:', pageData);

        } else {
            console.warn('⚠️ gtag no disponible para tracking de página');
        }
    }, 2000);
}

function getPageSection() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('nosotros')) return 'about';
    if (path.includes('gracias')) return 'conversion';
    if (path.includes('servicio')) return 'service';
    if (path.includes('trabajador')) return 'worker';
    return 'other';
}

function generatePageId() {
    const path = window.location.pathname;
    const timestamp = Date.now();
    return `${path.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}`;
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureGA4PageTracking);
} else {
    ensureGA4PageTracking();
}

// Función para debug de GA4
window.debugGA4 = function() {
    console.log('🔍 GA4 Debug Info:');
    console.log('- URL actual:', window.location.href);
    console.log('- Path:', window.location.pathname);
    console.log('- Título:', document.title);
    console.log('- gtag disponible:', typeof gtag !== 'undefined');
    console.log('- dataLayer disponible:', typeof dataLayer !== 'undefined');
    console.log('- Referrer:', document.referrer);
    
    if (typeof dataLayer !== 'undefined') {
        console.log('- dataLayer content:', dataLayer);
    }
};