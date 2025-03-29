// Script d'animations pour le site web A.S.A
document.addEventListener('DOMContentLoaded', () => {
    console.log('Animations script loaded');
    
    // Vérification de la compatibilité avec IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported, applying animations directly');
        // Pour les navigateurs ne supportant pas IntersectionObserver
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
            el.classList.add('appear');
        });
        return; // Sortir de la fonction
    }

    // --------- Animations on scroll ---------
    const initFadeAnimations = () => {
        // Sélectionner tous les éléments animés
        const faders = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        
        if (faders.length > 0) {
            console.log('Found', faders.length, 'elements to animate');
            
            // Rendre d'abord les éléments visibles pendant un court instant
            // puis les préparer pour l'animation après un court délai
            setTimeout(() => {
                faders.forEach(fader => {
                    fader.classList.add('ready-to-animate');
                });
                
                // Configuration de l'observateur d'intersection
                const appearOptions = {
                    threshold: 0.2, // Déclencher plus tôt
                    rootMargin: "0px 0px -50px 0px"
                };

                const appearOnScroll = new IntersectionObserver(function(entries, observer) {
                    entries.forEach(entry => {
                        if (!entry.isIntersecting) return;
                        
                        console.log('Animating element:', entry.target);
                        entry.target.classList.add('appear');
                        observer.unobserve(entry.target);
                    });
                }, appearOptions);

                // Observer chaque élément
                faders.forEach(fader => {
                    appearOnScroll.observe(fader);
                });
                
                // Animer immédiatement les éléments déjà visibles
                faders.forEach(fader => {
                    const rect = fader.getBoundingClientRect();
                    const isVisible = (
                        rect.top <= (window.innerHeight * 0.8) &&
                        rect.bottom >= 0
                    );
                    
                    if (isVisible) {
                        fader.classList.add('appear');
                    }
                });
            }, 100);
        }
    };

    // --------- Hero Slider - CORRIGÉ ---------
    const initSlider = () => {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        if (slides.length > 0 && dots.length > 0) {
            console.log('Initializing slider with', slides.length, 'slides');
            
            let currentSlide = 0;
            let sliderInterval;

            // Fonction pour changer de slide
            function changeSlide(index) {
                // Mettre à jour l'index si besoin
                if (index !== undefined) {
                    currentSlide = index;
                }
                
                // Masquer tous les slides
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Afficher le slide actif
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
                
                console.log('Changed to slide', currentSlide);
            }

            // Fonction pour passer au slide suivant
            function nextSlide() {
                currentSlide = (currentSlide + 1) % slides.length;
                changeSlide();
            }

            // Démarrer le défilement automatique
            function startSlider() {
                console.log('Starting slider automation');
                // Arrêter un éventuel timer existant pour éviter les cumuls
                if (sliderInterval) {
                    clearInterval(sliderInterval);
                }
                sliderInterval = setInterval(nextSlide, 5000); // Changer de slide toutes les 5 secondes
            }

            // Arrêter le défilement automatique
            function stopSlider() {
                console.log('Pausing slider automation');
                clearInterval(sliderInterval);
            }

            // S'assurer que le premier slide est visible
            changeSlide(0);

            // Ajouter des événements de clic aux points du slider
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    console.log('Dot clicked:', index);
                    changeSlide(index);
                    stopSlider();
                    startSlider();
                });
            });

            // Démarrer le slider automatique
            startSlider();

            // Mettre en pause le slider au survol
            const slider = document.querySelector('.slider');
            if (slider) {
                slider.addEventListener('mouseenter', stopSlider);
                slider.addEventListener('mouseleave', startSlider);
            }
        } else {
            console.warn('Slider elements not found in the DOM');
        }
    };

    // --------- Compteurs animés ---------
    const initCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        if (counters.length > 0) {
            console.log('Initializing', counters.length, 'counters');
            
            const counterOptions = {
                threshold: 0.8,
                rootMargin: "0px 0px -50px 0px"
            };

            const counterObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                        const duration = parseInt(counter.getAttribute('data-duration')) || 2000; // Default 2 seconds
                        const increment = target / (duration / 16); // 60fps
                        let current = 0;

                        const updateCounter = () => {
                            current += increment;
                            counter.textContent = Math.round(current);
                            
                            if (current < target) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target;
                            }
                        };

                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            }, counterOptions);

            counters.forEach(counter => {
                counterObserver.observe(counter);
            });
        }
    };

    // --------- Effet parallaxe ---------
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length > 0) {
            console.log('Initializing parallax effect on', parallaxElements.length, 'elements');
            
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                
                parallaxElements.forEach(element => {
                    const speed = element.getAttribute('data-speed') || 0.3;
                    element.style.transform = `translateY(${scrollY * speed}px)`;
                });
            });
        }
    };

    // --------- Filtres portfolio ---------
    const initPortfolioFilters = () => {
        const filterButtons = document.querySelectorAll('.portfolio-filter button');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterButtons.length > 0 && portfolioItems.length > 0) {
            console.log('Initializing portfolio filters');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    button.classList.add('active');
                    
                    const filter = button.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.classList.contains(filter)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 500);
                        }
                    });
                });
            });
        }
    };

    // Initialisation de toutes les animations
    console.log('Initializing all animations');
    initFadeAnimations();
    initSlider(); // Appel de la fonction de slider corrigée
    initCounters();
    initParallax();
    initPortfolioFilters();
    
    console.log('All animations initialized');
});