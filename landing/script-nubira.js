/**
 * Nubira Landing Page - JavaScript Principal
 * Funcionalidades optimizadas para la gestión de citas profesionales
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Nubira Landing Page');
    
    // =============================================================================
    // NAVEGACIÓN Y MENÚ MÓVIL
    // =============================================================================
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    // Funcionalidad del menú móvil
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // =============================================================================
    // FUNCIONALIDAD DE PESTAÑAS (SECCIÓN NOSOTROS)
    // =============================================================================
    
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function activateTab(tabId) {
        console.log('Activando pestaña:', tabId);
        
        // Desactivar todas las pestañas
        tabHeaders.forEach(header => header.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
            content.style.opacity = '0';
        });
        
        // Activar pestaña seleccionada
        const activeHeader = document.querySelector(`[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(tabId);
        
        if (activeHeader && activeContent) {
            activeHeader.classList.add('active');
            activeContent.classList.add('active');
            activeContent.style.display = 'block';
            
            // Animación suave
            setTimeout(() => {
                activeContent.style.opacity = '1';
            }, 50);
        }
    }
    
    // Eventos de clic para pestañas
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
        });
        
        // Accesibilidad con teclado
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab');
                activateTab(tabId);
            }
        });
    });
    
    // Inicializar primera pestaña como activa
    if (tabHeaders.length > 0) {
        const firstTab = tabHeaders[0].getAttribute('data-tab') || 'vision';
        activateTab(firstTab);
    }
    
    // =============================================================================
    // FORMULARIOS DE CONTACTO Y SUSCRIPCIÓN
    // =============================================================================
    
    // Formulario de contacto principal
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Mostrar estado de carga
            submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (aquí conectarías con tu backend)
            setTimeout(() => {
                showMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Formulario de suscripción CTA
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            const selectField = this.querySelector('select');
            
            // Validación básica
            if (!emailInput.value || !validateEmail(emailInput.value)) {
                e.preventDefault();
                showMessage('Por favor, introduce un correo electrónico válido.', 'error');
                emailInput.focus();
                return;
            }
            
            if (!selectField.value) {
                e.preventDefault();
                showMessage('Por favor, selecciona tu tipo de perfil.', 'error');
                selectField.focus();
                return;
            }
            
            // El formulario se enviará normalmente a FormSubmit
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span class="loading"></span> Registrando...';
            submitBtn.disabled = true;
        });
    }
    
    // =============================================================================
    // BOTONES CTA Y NAVEGACIÓN
    // =============================================================================
    
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-outline, .btn-pulse');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim().toLowerCase();
            
            // Efecto visual de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Navegación basada en el texto del botón
            if (buttonText.includes('registr') || buttonText.includes('comenzar')) {
                e.preventDefault();
                scrollToElement('#cta-final');
            } else if (buttonText.includes('conocer') || buttonText.includes('más')) {
                e.preventDefault();
                scrollToElement('#caracteristicas');
            } else if (buttonText.includes('nosotros')) {
                e.preventDefault();
                scrollToElement('#nosotros');
            }
        });
    });
    
    // =============================================================================
    // ANIMACIONES Y EFECTOS VISUALES
    // =============================================================================
    
    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.feature-card, .testimonial-card, .valor-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Botón scroll to top
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // =============================================================================
    // FUNCIONES AUXILIARES
    // =============================================================================
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showMessage(text, type = 'info') {
        // Crear elemento de mensaje si no existe
        let messageEl = document.querySelector('.message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'message';
            document.body.appendChild(messageEl);
        }
        
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
        messageEl.style.display = 'block';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
    
    function scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: element.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }
    
    // =============================================================================
    // INICIALIZACIÓN FINAL
    // =============================================================================
    
    console.log('✅ Nubira Landing Page inicializada correctamente');
    
    // Verificar que todos los elementos críticos estén presentes
    const criticalElements = [
        '.hero',
        '.features',
        '.cta',
        '#nosotros'
    ];
    
    criticalElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`⚠️ Elemento crítico no encontrado: ${selector}`);
        }
    });
});

// =============================================================================
// ESTILOS DINÁMICOS
// =============================================================================

const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    /* Animaciones personalizadas para Nubira */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    /* Efectos hover mejorados */
    .btn:hover {
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .btn:active {
        transform: translateY(0);
    }
    
    /* Indicador de carga */
    .loading {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #ffffff;
        animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    /* Mensajes de estado */
    .message {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        animation: fadeInUp 0.3s ease;
    }
    
    .message.success {
        background: linear-gradient(135deg, #10B981, #059669);
    }
    
    .message.error {
        background: linear-gradient(135deg, #EF4444, #DC2626);
    }
    
    .message.info {
        background: linear-gradient(135deg, #6C3EB4, #8F5BD3);
    }
    
    /* Botón scroll to top */
    .scroll-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, #6C3EB4, #8F5BD3);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(108, 62, 180, 0.3);
    }
    
    .scroll-top.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-top:hover {
        transform: translateY(-3px) scale(1.1);
        box-shadow: 0 6px 16px rgba(108, 62, 180, 0.4);
    }
`;

document.head.appendChild(dynamicStyles);
