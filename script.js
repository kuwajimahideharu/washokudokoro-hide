document.addEventListener('DOMContentLoaded', () => {
    // Initial Load Animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // Hamburger Menu Logic
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const globalNav = document.querySelector('.global-nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (hamburgerMenu && globalNav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            globalNav.classList.toggle('active');
            
            // Toggle aria-label for accessibility
            const isActive = hamburgerMenu.classList.contains('active');
            hamburgerMenu.setAttribute('aria-label', isActive ? 'メニューを閉じる' : 'メニューを開く');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                globalNav.classList.remove('active');
                hamburgerMenu.setAttribute('aria-label', 'メニューを開く');
            });
        });
    }
});
