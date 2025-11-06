document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio iOS prêt !');

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('formulaire-contact');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            // Ajouter l'état de chargement
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Simuler l'envoi (remplacez par votre endpoint Formspree)
            setTimeout(() => {
                // Afficher la confirmation
                confirmationMessage.style.display = 'flex';
                confirmationMessage.style.color = 'var(--ios-success)';
                
                // Réinitialiser le bouton
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Masquer la confirmation après 5 secondes
                setTimeout(() => {
                    confirmationMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        });
    }

    // Animation au défilement iOS-style
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animation en cascade pour les cartes de compétences
                if (entry.target.classList.contains('ios-skill-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observer les éléments animables
    document.querySelectorAll('.ios-card, .ios-project-card, .ios-skill-card').forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Gestion de la navigation active
    const sections = document.querySelectorAll('.ios-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Effet de glassmorphisme dynamique
    function updateBlurEffect() {
        const scrollY = window.scrollY;
        const navbar = document.querySelector('.ios-navbar');
        
        if (navbar) {
            if (scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(30px)';
            } else {
                navbar.style.background = 'var(--ios-blur)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        }
    }

    window.addEventListener('scroll', updateBlurEffect);

    // Animation d'entrée fluide
    function animateOnLoad() {
        const heroContent = document.querySelector('.ios-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    // Initialiser les animations
    animateOnLoad();
    updateBlurEffect();
    updateActiveNavLink();

    // Effet de hover amélioré pour les cartes
    document.querySelectorAll('.ios-card, .ios-project-card, .ios-skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Effet de particules pour la section hero (optionnel)
    function createParticles() {
        const heroSection = document.querySelector('.accueil.ios-section');
        if (!heroSection) return;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 6 + 4}s infinite ease-in-out`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            heroSection.appendChild(particle);
        }
    }

    // Ajouter l'animation flottante
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `;
    document.head.appendChild(style);

    createParticles();

    // Gestion du téléchargement du CV
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Animation de confirmation
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Téléchargé !';
            this.style.background = 'var(--ios-success)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    });

    // Amélioration de l'accessibilité
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Service Worker pour le mode hors ligne (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Interactions pour les projets
function initProjectInteractions() {
    // Animation au survol des cartes projet
    const projectCards = document.querySelectorAll('.ios-project-card');
    
    projectCards.forEach(card => {
        const link = card.querySelector('.project-link');
        const preview = card.querySelector('.project-preview');
        
        // Effet de profondeur au survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            if (preview) {
                preview.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            if (preview) {
                preview.style.transform = 'scale(1)';
            }
        });
        
        // Animation du lien
        if (link) {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(4px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        }
    });
    
    // Tracking des clics sur les projets
    document.querySelectorAll('.project-link[target="_blank"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const projectName = this.closest('.ios-project-card').querySelector('h3').textContent;
            console.log(`Projet visité: ${projectName} - URL: ${this.href}`);
            // Ici vous pourriez ajouter Google Analytics
            // gtag('event', 'project_click', { project_name: projectName });
        });
    });
}

// Appeler la fonction dans DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initProjectInteractions();
});