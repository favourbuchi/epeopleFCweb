// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initFormValidation();
    initBackToTop();
    initSmoothScrolling();
    initAnimations();
    initCarousel();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const overlay = document.querySelector('.nav-overlay');

    if (!hamburger || !navMenu) return;

    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');
        if (overlay) {
            overlay.classList.add('active');
            overlay.removeAttribute('hidden');
        }
        hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.setAttribute('hidden', '');
        }
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Toggle mobile menu
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeMenu();
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Ensure menu closes on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButton = document.querySelector('.cta-button');
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle CTA button
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetElement = document.querySelector('#register');
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Form validation and submission
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement && errorElement.textContent) {
                errorElement.textContent = '';
                this.style.borderColor = 'rgba(255, 215, 0, 0.3)';
            }
        });
    });
}

function validateForm() {
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const teamName = document.getElementById('teamName');
    
    let isValid = true;
    
    // Validate full name
    if (!validateField(fullName)) {
        isValid = false;
    }
    
    // Validate email
    if (!validateField(email)) {
        isValid = false;
    }
    
    // Validate phone
    if (!validateField(phone)) {
        isValid = false;
    }
    
    // Validate team name
    if (!validateField(teamName)) {
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('placeholder');
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Check if field is empty
    if (!value) {
        showError(field, errorElement, `${fieldName} is required`);
        return false;
    }
    
    // Specific validations
    switch(field.type) {
        case 'email':
            if (!isValidEmail(value)) {
                showError(field, errorElement, 'Please enter a valid email address');
                return false;
            }
            break;
            
        case 'tel':
            if (!isValidPhone(value)) {
                showError(field, errorElement, 'Please enter a valid phone number');
                return false;
            }
            break;
            
        case 'text':
            if (value.length < 2) {
                showError(field, errorElement, `${fieldName} must be at least 2 characters long`);
                return false;
            }
            break;
    }
    
    // Clear error if validation passes
    clearFieldError(field, errorElement);
    return true;
}

function showError(field, errorElement, message) {
    errorElement.textContent = message;
    field.style.borderColor = '#ff6b6b';
    field.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
}

function clearFieldError(field, errorElement) {
    errorElement.textContent = '';
    field.style.borderColor = 'rgba(255, 215, 0, 0.3)';
    field.style.boxShadow = 'none';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('#registrationForm input');
    
    errorElements.forEach(error => error.textContent = '');
    inputs.forEach(input => {
        input.style.borderColor = 'rgba(255, 215, 0, 0.3)';
        input.style.boxShadow = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const registrationContent = document.querySelector('.registration-content');
    
    registrationContent.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Add success animation
    successMessage.style.animation = 'fadeInUp 0.6s ease forwards';
    
    // Auto hide after 10 seconds and show form again
    setTimeout(() => {
        successMessage.style.display = 'none';
        registrationContent.style.display = 'grid';
    }, 10000);
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize animations and intersection observer
function initAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.highlight-item, .detail-item, .prize-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.highlight-item, .detail-item, .prize-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeWriter);
            }
        }, 100);
    }
});

// Handle window resize for mobile menu
window.addEventListener('resize', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.nav-overlay');
    
    if (window.innerWidth > 768) {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (overlay) { overlay.classList.remove('active'); overlay.setAttribute('hidden', ''); }
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Keyboard navigation accessibility
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.nav-overlay');
        
        if (navMenu && navMenu.classList.contains('active')) {
            if (hamburger) hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            if (overlay) { overlay.classList.remove('active'); overlay.setAttribute('hidden', ''); }
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        }
    }
});

// Performance optimization - Debounce scroll events
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

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any intensive scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Carousel functionality
function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;
    
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    const items = document.querySelectorAll('.carousel-item');
    
    let currentSlide = 0;
    const totalSlides = items.length;
    
    function updateCarousel() {
        const slideWidth = 100;
        track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-play carousel
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    
    carouselContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    carouselContainer.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });
    
    carouselContainer.addEventListener('touchend', function(e) {
        distX = e.changedTouches[0].clientX - startX;
        distY = e.changedTouches[0].clientY - startY;
        
        // Check if horizontal swipe is greater than vertical
        if (Math.abs(distX) > Math.abs(distY)) {
            if (distX > 50) {
                prevSlide(); // Swipe right
            } else if (distX < -50) {
                nextSlide(); // Swipe left
            }
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Initialize first slide
    updateCarousel();
}

// Console welcome message
console.log('%c🎮 epeople FC Season 2 🎮', 'color: #ffd700; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the ultimate FIFA gaming experience with epeople FC!', 'color: #ffd700; font-size: 14px;');
