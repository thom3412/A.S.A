// Script principal pour le site web A.S.A
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main script loaded');
    
    // --------- Navbar dynamique ---------
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked');
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Dropdowns on mobile
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                console.log('Mobile dropdown toggled');
                dropdown.classList.toggle('active');
                // Empêcher le suivi du lien seulement en mode mobile
                const link = dropdown.querySelector('a');
                if (link && link === e.target) {
                    e.preventDefault();
                }
            }
        });
    });

    // --------- FAQ accordions ---------
    const initFaqAccordions = () => {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (faqQuestions.length > 0) {
            console.log('Initializing FAQ accordions');
            
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const faqItem = question.parentElement;
                    faqItem.classList.toggle('active');
                    console.log('FAQ item toggled');
                });
            });
        }
    };

    // Initialize FAQ accordions
    initFaqAccordions();

    // --------- Smooth scroll pour liens d'ancrage ---------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    console.log('Smooth scrolling to', targetId);
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --------- Année actuelle pour copyright ---------
    const updateCopyright = () => {
        const copyrightElement = document.querySelector('.copyright p');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.innerHTML = copyrightElement.innerHTML.replace(/\d{4}/, currentYear);
            console.log('Copyright year updated to', currentYear);
        }
    };

    updateCopyright();

    // --------- Validation de formulaire ---------
    const initFormValidation = () => {
        const contactForm = document.getElementById('contact-form');
        const recruitmentForm = document.getElementById('recruitment-form');
        
        const validateForm = (form) => {
            console.log('Setting up validation for form', form.id);
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation example
                let isValid = true;
                const formElements = this.elements;
                
                for (let i = 0; i < formElements.length; i++) {
                    if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                        isValid = false;
                        formElements[i].classList.add('error');
                    } else {
                        formElements[i].classList.remove('error');
                    }
                }
                
                if (isValid) {
                    console.log('Form is valid, preparing to submit');
                    // Form submission logic would go here
                    // For demonstration purposes, show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    successMessage.innerHTML = 'Votre message a été envoyé avec succès !';
                    
                    this.insertAdjacentElement('beforebegin', successMessage);
                    this.reset();
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                } else {
                    console.log('Form validation failed');
                }
            });
        };
        
        if (contactForm) validateForm(contactForm);
        if (recruitmentForm) validateForm(recruitmentForm);
        
        // File upload handling
        const fileInputs = document.querySelectorAll('.file-upload-input');
        
        fileInputs.forEach(input => {
            const fileInfoDiv = input.nextElementSibling;
            const fileList = fileInfoDiv.nextElementSibling;
            
            input.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const fileName = this.files[0].name;
                    fileInfoDiv.textContent = fileName;
                    console.log('File selected:', fileName);
                    
                    // Create file list item
                    fileList.innerHTML = '';
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    fileItem.innerHTML = `
                        <i class="fas fa-file"></i>
                        <span class="file-name">${fileName}</span>
                        <span class="file-remove"><i class="fas fa-times"></i></span>
                    `;
                    fileList.appendChild(fileItem);
                    
                    // Remove file functionality
                    const removeBtn = fileItem.querySelector('.file-remove');
                    removeBtn.addEventListener('click', () => {
                        input.value = '';
                        fileInfoDiv.textContent = 'Aucun fichier sélectionné';
                        fileList.innerHTML = '';
                        console.log('File removed');
                    });
                } else {
                    fileInfoDiv.textContent = 'Aucun fichier sélectionné';
                    fileList.innerHTML = '';
                }
            });
        });
    };
    
    // Initialize form validation
    initFormValidation();
    
    // --------- Back to top button ---------
    const addBackToTopButton = () => {
        const backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopButton);
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('Back to top button added');
    };
    
    // Add back to top button
    addBackToTopButton();
    
    console.log('Main script initialization complete');
});