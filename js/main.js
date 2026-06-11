/* ==============================================
   Academic Personal Website — Main Scripts
   ============================================== */

(function () {
    'use strict';

    // ----- DOM Elements -----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinksAll = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    // ----- Mobile Navigation Toggle -----
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav__links--open');
        navToggle.classList.toggle('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    navLinksAll.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav__links--open');
            navToggle.classList.remove('nav__toggle--open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ----- Scroll: Navbar Shadow -----
    function onScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('nav--scrolled');
        } else {
            navbar.classList.remove('nav--scrolled');
        }
    }

    // ----- Scroll: Active Nav Link (Intersection Observer) -----
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.getAttribute('id');
            navLinksAll.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // ----- Combined scroll handler (throttled) -----
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Run once on load
    onScroll();

    // ----- Smooth scroll for any anchor links not in nav -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ----- Fade-in on scroll -----
    const fadeEls = document.querySelectorAll(
        '.card, .timeline__item, .honour-item, .skill-group, .project-item, .contact-card'
    );

    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    fadeEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(el);
    });

})();
