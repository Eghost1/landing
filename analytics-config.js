/**
 * Nubira Analytics - Google Analytics 4 & GTM Enhanced Tracking
 * Configuración completa para medición de conversiones y engagement
 */

// =============================================================================
// CONFIGURACIÓN GLOBAL
// =============================================================================

const NubiraAnalytics = {
    // IDs de configuración
    GA4_ID: 'G-SWXSF3D6YS',
    GTM_ID: 'GTM-WDTVWF7C',
    
    // Configuración de eventos
    events: {
        // CTAs principales
        CTA_COMENZAR: 'cta_comenzar_click',
        CTA_DESCARGAR: 'cta_descargar_click',
        CTA_CONTACTO: 'cta_contacto_click',
        
        // Deep Links
        DEEPLINK_SERVICIO: 'deeplink_servicio_access',
        DEEPLINK_TRABAJADOR: 'deeplink_trabajador_access',
        DEEPLINK_FALLBACK: 'deeplink_fallback_redirect',
        
        // Navegación
        NAV_CLICK: 'navigation_click',
        FOOTER_CLICK: 'footer_link_click',
        LOGO_CLICK: 'logo_click',
        
        // Formulario
        FORM_START: 'form_start',
        FORM_SUBMIT: 'form_submit_attempt',
        FORM_SUCCESS: 'form_submit_success',
        FORM_ERROR: 'form_submit_error',
        
        // Engagement
        SCROLL_MILESTONE: 'scroll_milestone',
        TIME_MILESTONE: 'time_on_page_milestone',
        SOCIAL_CLICK: 'social_media_click',
        
        // Descargas de app
        APP_DOWNLOAD_ANDROID: 'app_download_android',
        APP_DOWNLOAD_IOS: 'app_download_ios'
    },
    
    // Estado de tracking
    state: {
        scrollMilestones: [25, 50, 75, 90, 100],
        timeMilestones: [10, 30, 60, 120, 300], // segundos
        scrollTracked: [],
        timeTracked: [],
        startTime: Date.now(),
        formStarted: false
    }
};

// =============================================================================
// FUNCIONES DE TRACKING
// =============================================================================

// Función principal para enviar eventos
function trackEvent(eventName, parameters = {}) {
    try {
        // Enviar a GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: parameters.category || 'engagement',
                event_label: parameters.label || '',
                value: parameters.value || 0,
                custom_parameter_1: parameters.custom_1 || '',
                custom_parameter_2: parameters.custom_2 || '',
                page_location: window.location.href,
                page_title: document.title,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                ...parameters
            });
        }
        
        // Enviar a GTM dataLayer
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: eventName,
                eventCategory: parameters.category || 'engagement',
                eventAction: parameters.action || eventName,
                eventLabel: parameters.label || '',
                eventValue: parameters.value || 0,
                customParameters: parameters,
                timestamp: Date.now()
            });
        }
        
        console.log(`📊 Analytics Event: ${eventName}`, parameters);
    } catch (error) {
        console.error('Error enviando evento de analytics:', error);
    }
}

// =============================================================================
// TRACKING DE CTAs Y BOTONES PRINCIPALES
// =============================================================================

function setupCTATracking() {
    // Botones principales de CTA
    const ctaButtons = [
        { selector: '[href*="comenzar"], [data-cta="comenzar"], .cta-button-primary', event: NubiraAnalytics.events.CTA_COMENZAR },
        { selector: '[href*="descargar"], [data-cta="descargar"], .cta-download', event: NubiraAnalytics.events.CTA_DESCARGAR },
        { selector: '[href*="contacto"], [data-cta="contacto"], .contact-submit-btn', event: NubiraAnalytics.events.CTA_CONTACTO }
    ];
    
    ctaButtons.forEach(({ selector, event }) => {
        document.querySelectorAll(selector).forEach((button, index) => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent?.trim() || button.getAttribute('aria-label') || 'Sin texto';
                const buttonPosition = getElementPosition(button);
                
                trackEvent(event, {
                    category: 'cta_conversion',
                    action: 'click',
                    label: buttonText,
                    button_text: buttonText,
                    button_position: buttonPosition,
                    button_index: index,
                    page_section: getNearestSection(button)
                });
            });
        });
    });
    
    // Tracking específico para descargas de app
    document.querySelectorAll('a[href*="play.google.com"], a[href*="android"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent(NubiraAnalytics.events.APP_DOWNLOAD_ANDROID, {
                category: 'app_conversion',
                action: 'download_attempt',
                label: 'Android Play Store'
            });
        });
    });
    
    document.querySelectorAll('a[href*="apps.apple.com"], a[href*="ios"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent(NubiraAnalytics.events.APP_DOWNLOAD_IOS, {
                category: 'app_conversion',
                action: 'download_attempt',
                label: 'iOS App Store'
            });
        });
    });
}

// =============================================================================
// TRACKING DE NAVEGACIÓN
// =============================================================================

function setupNavigationTracking() {
    // Navegación principal
    document.querySelectorAll('nav a, .nav-link, .navbar a').forEach(link => {
        link.addEventListener('click', (e) => {
            trackEvent(NubiraAnalytics.events.NAV_CLICK, {
                category: 'navigation',
                action: 'click',
                label: link.textContent?.trim() || link.href,
                link_url: link.href,
                link_text: link.textContent?.trim()
            });
        });
    });
    
    // Footer links
    document.querySelectorAll('footer a, .footer-link').forEach(link => {
        link.addEventListener('click', (e) => {
            trackEvent(NubiraAnalytics.events.FOOTER_CLICK, {
                category: 'navigation',
                action: 'footer_click',
                label: link.textContent?.trim() || link.href,
                link_url: link.href,
                link_text: link.textContent?.trim()
            });
        });
    });
    
    // Logo clicks
    document.querySelectorAll('.logo, [data-logo]').forEach(logo => {
        logo.addEventListener('click', () => {
            trackEvent(NubiraAnalytics.events.LOGO_CLICK, {
                category: 'navigation',
                action: 'logo_click',
                label: 'Header Logo'
            });
        });
    });
    
    // Redes sociales
    document.querySelectorAll('.footer-social-link, [data-social]').forEach(social => {
        social.addEventListener('click', (e) => {
            const platform = getSocialPlatform(social.href || social.getAttribute('data-social'));
            trackEvent(NubiraAnalytics.events.SOCIAL_CLICK, {
                category: 'social_media',
                action: 'click',
                label: platform,
                social_platform: platform
            });
        });
    });
}

// =============================================================================
// TRACKING DE FORMULARIOS
// =============================================================================

function setupFormTracking() {
    const forms = document.querySelectorAll('form, .contact-form');
    
    forms.forEach((form, index) => {
        // Inicio de formulario (primer campo enfocado)
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (!NubiraAnalytics.state.formStarted) {
                    NubiraAnalytics.state.formStarted = true;
                    trackEvent(NubiraAnalytics.events.FORM_START, {
                        category: 'form_interaction',
                        action: 'form_start',
                        label: `Formulario ${index + 1}`,
                        form_index: index
                    });
                }
            });
        });
        
        // Envío de formulario
        form.addEventListener('submit', (e) => {
            trackEvent(NubiraAnalytics.events.FORM_SUBMIT, {
                category: 'form_conversion',
                action: 'form_submit',
                label: `Formulario ${index + 1}`,
                form_index: index
            });
        });
    });
}

// =============================================================================
// TRACKING DE ENGAGEMENT
// =============================================================================

function setupEngagementTracking() {
    // Scroll depth tracking
    let ticking = false;
    
    function trackScrollDepth() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollPercentage = Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                );
                
                NubiraAnalytics.state.scrollMilestones.forEach(milestone => {
                    if (scrollPercentage >= milestone && !NubiraAnalytics.state.scrollTracked.includes(milestone)) {
                        NubiraAnalytics.state.scrollTracked.push(milestone);
                        trackEvent(NubiraAnalytics.events.SCROLL_MILESTONE, {
                            category: 'engagement',
                            action: 'scroll_depth',
                            label: `${milestone}%`,
                            scroll_percentage: milestone
                        });
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', trackScrollDepth);
    
    // Time on page milestones
    NubiraAnalytics.state.timeMilestones.forEach(milestone => {
        setTimeout(() => {
            if (!NubiraAnalytics.state.timeTracked.includes(milestone)) {
                NubiraAnalytics.state.timeTracked.push(milestone);
                trackEvent(NubiraAnalytics.events.TIME_MILESTONE, {
                    category: 'engagement',
                    action: 'time_on_page',
                    label: `${milestone}s`,
                    time_seconds: milestone
                });
            }
        }, milestone * 1000);
    });
}

// =============================================================================
// TRACKING DE DEEP LINKS
// =============================================================================

function setupDeepLinkTracking() {
    // Esta función será llamada desde las páginas de deep links
    window.trackDeepLinkAccess = function(type, id, fallback = false) {
        const eventName = fallback ? 
            NubiraAnalytics.events.DEEPLINK_FALLBACK : 
            (type === 'servicio' ? NubiraAnalytics.events.DEEPLINK_SERVICIO : NubiraAnalytics.events.DEEPLINK_TRABAJADOR);
        
        trackEvent(eventName, {
            category: 'deep_links',
            action: fallback ? 'fallback_redirect' : 'deep_link_access',
            label: `${type}/${id}`,
            deeplink_type: type,
            deeplink_id: id,
            is_fallback: fallback,
            referrer: document.referrer,
            user_agent_mobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
        });
    };
    
    // Auto-detectar si estamos en una página de deep link
    const path = window.location.pathname;
    if (path.includes('/servicio/') || path.includes('/trabajador/')) {
        const parts = path.split('/');
        const type = parts[1]; // 'servicio' o 'trabajador'
        const id = parts[2] || 'unknown';
        
        // Tracking automático del acceso
        window.trackDeepLinkAccess(type, id, false);
        
        // Tracking del fallback después de 3 segundos (tiempo de espera típico)
        setTimeout(() => {
            window.trackDeepLinkAccess(type, id, true);
        }, 3500);
    }
}

// =============================================================================
// FUNCIONES AUXILIARES
// =============================================================================

function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        x: Math.round(rect.left),
        y: Math.round(rect.top + scrollTop),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
    };
}

function getNearestSection(element) {
    const section = element.closest('section, [class*="section"]');
    return section?.className || section?.id || 'unknown_section';
}

function getSocialPlatform(url) {
    if (!url) return 'unknown';
    if (url.includes('instagram')) return 'Instagram';
    if (url.includes('linkedin')) return 'LinkedIn';
    if (url.includes('facebook')) return 'Facebook';
    if (url.includes('twitter') || url.includes('x.com')) return 'Twitter';
    if (url.includes('whatsapp')) return 'WhatsApp';
    return 'Other';
}

// =============================================================================
// INICIALIZACIÓN
// =============================================================================

function initializeNubiraAnalytics() {
    // Esperar a que GA4 y GTM estén cargados
    if (typeof gtag === 'undefined' || typeof dataLayer === 'undefined') {
        setTimeout(initializeNubiraAnalytics, 500);
        return;
    }
    
    console.log('🚀 Iniciando Nubira Analytics...');
    
    // Configurar todos los trackings
    setupCTATracking();
    setupNavigationTracking();
    setupFormTracking();
    setupEngagementTracking();
    setupDeepLinkTracking();
    
    // Evento de página vista mejorado
    trackEvent('page_view_enhanced', {
        category: 'page_interaction',
        action: 'page_view',
        label: document.title,
        page_type: getPageType(),
        page_language: document.documentElement.lang || 'es',
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        screen_resolution: `${screen.width}x${screen.height}`,
        device_type: getDeviceType()
    });
    
    console.log('✅ Nubira Analytics inicializado correctamente');
}

function getPageType() {
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('nosotros')) return 'about';
    if (path.includes('gracias')) return 'thank_you';
    if (path.includes('servicio')) return 'service_deeplink';
    if (path.includes('trabajador')) return 'worker_deeplink';
    return 'other';
}

function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
        return 'mobile';
    }
    if (userAgent.includes('tablet') || userAgent.includes('ipad')) {
        return 'tablet';
    }
    return 'desktop';
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNubiraAnalytics);
} else {
    initializeNubiraAnalytics();
}

// =============================================================================
// API PÚBLICA
// =============================================================================

// Exponer funciones para uso manual
window.NubiraAnalytics = {
    track: trackEvent,
    trackDeepLink: window.trackDeepLinkAccess,
    events: NubiraAnalytics.events
};