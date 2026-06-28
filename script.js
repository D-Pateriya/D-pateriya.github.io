// Dr. Deepika Pateriya - Portfolio Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Dark/Light Theme Switcher
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    htmlElement.setAttribute('data-theme', defaultTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Re-create icons to update Lucide icons if color changes affect them
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    const closeMenu = () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // 4. Scroll Header Blur & Active Section Tracker
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky Header effect on scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--card-shadow)';
            navbar.style.borderBottom = '1px solid var(--border-color)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Active Nav Link highlight on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load

    // 5. Publications Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pubItems = document.querySelectorAll('.pub-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            pubItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Show or hide based on category match
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Smooth entrance
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 6. Skills Intersection Observer for animation
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const widthValue = bar.style.width;
                // Temporarily set to 0 and trigger reflow, then apply actual width to animate
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = widthValue;
                    bar.style.transform = 'scaleX(1)';
                }, 100);
                // Unobserve once animated
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.1 });

    skillProgressBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // 7. Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show sending state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i data-lucide="loader" class="animate-spin"></i>';
            if (window.lucide) { window.lucide.createIcons(); }
            submitBtn.disabled = true;

            // Simulate server network latency
            setTimeout(() => {
                // Success message
                formFeedback.innerHTML = 'Thank you! Your message has been sent successfully.';
                formFeedback.className = 'form-feedback form-success';
                
                // Reset form inputs
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                if (window.lucide) { window.lucide.createIcons(); }

                // Clear feedback after 5 seconds
                setTimeout(() => {
                    formFeedback.innerHTML = '';
                    formFeedback.className = 'form-feedback';
                }, 5000);
            }, 1500);
        });
    }
});
