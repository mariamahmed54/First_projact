// ===== Language Switching Functionality =====
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.init();
    }

    init() {
        this.setLanguage(this.currentLang);
        this.bindEvents();
    }

    bindEvents() {
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        this.setLanguage(this.currentLang);
        localStorage.setItem('preferredLanguage', this.currentLang);
    }

    setLanguage(lang) {
        const html = document.documentElement;
        const body = document.body;

        // Set language and direction
        html.setAttribute('lang', lang);
        html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update all elements with data attributes
        this.updateContent(lang);

        // Update button text
        this.updateButtonText(lang);
    }

    updateContent(lang) {
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.innerHTML = text;
            }
        });

        // Update placeholders
        const inputs = document.querySelectorAll(`[data-${lang}-placeholder]`);
        inputs.forEach(input => {
            const placeholder = input.getAttribute(`data-${lang}-placeholder`);
            if (placeholder) {
                input.setAttribute('placeholder', placeholder);
            }
        });
    }

    updateButtonText(lang) {
        const langToggle = document.getElementById('langToggle');
        const langText = langToggle?.querySelector('.lang-text');
        if (langText) {
            langText.textContent = lang === 'en' ? 'العربية' : 'English';
        }
    }
}

// ===== Smooth Scrolling =====
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.scrollTo(target);
                }
            });
        });
    }

    scrollTo(element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ===== Navbar Scroll Effect =====
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===== Intersection Observer for Animations =====
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.init();
    }

    init() {
        const animateElements = document.querySelectorAll('.skill-card, .info-box, .stat-box, .roadmap-item');
        animateElements.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// ===== Counter Animation =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        this.init();
    }

    init() {
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = element.textContent;
        const isNumber = /^\d+$/.test(target);

        if (!isNumber) return;

        const targetNum = parseInt(target);
        const duration = 2000;
        const increment = targetNum / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                element.textContent = targetNum;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ===== Form Validation =====
class FormValidation {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });

        return isValid;
    }

    submitForm() {
        // Simulate form submission
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = document.documentElement.getAttribute('lang') === 'ar'
            ? 'جاري الإرسال...'
            : 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = document.documentElement.getAttribute('lang') === 'ar'
                ? 'تم الإرسال!'
                : 'Sent!';
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-primary');
                this.form.reset();
            }, 2000);
        }, 1500);
    }
}

// ===== Parallax Effect =====
class ParallaxEffect {
    constructor() {
        this.heroSection = document.querySelector('.hero-section');
        this.init();
    }

    init() {
        if (!this.heroSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            this.heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ===== Mouse Trail Effect =====
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 10;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.createTrailElement(e.clientX, e.clientY);
        });
    }

    createTrailElement(x, y) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '6px';
        trail.style.height = '6px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'rgba(108, 92, 231, 0.3)';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transition = 'all 0.5s ease';

        document.body.appendChild(trail);
        this.trail.push(trail);

        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
        }, 100);

        setTimeout(() => {
            document.body.removeChild(trail);
            this.trail.shift();
        }, 600);

        // Limit trail length
        if (this.trail.length > this.maxTrailLength) {
            const oldTrail = this.trail.shift();
            if (document.body.contains(oldTrail)) {
                document.body.removeChild(oldTrail);
            }
        }
    }
}

// ===== Typing Effect for Hero Text =====
class TypingEffect {
    constructor() {
        this.heroText = document.querySelector('.hero-text .lead');
        this.texts = [
            { en: 'Aspiring Software Developer & Programming Enthusiast', ar: 'مطورة برمجيات طموحة ومتحمسة للبرمجة' },
            { en: 'Learning & Growing Every Day', ar: 'أتعلم وأكبر كل يوم' },
            { en: 'Building the Future, One Line at a Time', ar: 'أبني المستقبل، سطر برمجي واحد في كل مرة' }
        ];
        this.currentIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseTime = 2000;

        this.init();
    }

    init() {
        if (!this.heroText) return;
        this.type();
    }

    type() {
        const currentLang = document.documentElement.getAttribute('lang') || 'en';
        const currentText = this.texts[this.currentIndex][currentLang];

        if (this.isDeleting) {
            this.heroText.textContent = currentText.substring(0, this.heroText.textContent.length - 1);
        } else {
            this.heroText.textContent = currentText.substring(0, this.heroText.textContent.length + 1);
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.heroText.textContent === currentText) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.heroText.textContent === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== Initialize All Components =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    new LanguageSwitcher();
    new SmoothScroller();
    new NavbarScroll();
    new AnimationObserver();
    new CounterAnimation();
    new FormValidation();

    // Initialize visual effects
    new ParallaxEffect();
    // new MouseTrail(); // Uncomment for mouse trail effect
    // new TypingEffect(); // Uncomment for typing effect

    // Add loading animation
    document.body.classList.add('loaded');
});

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Performance Optimization =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Accessibility Enhancements =====
// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Focus management for modals and dialogs
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ===== Service Worker Registration (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker for PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}