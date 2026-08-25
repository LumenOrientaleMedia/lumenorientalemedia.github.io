/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    const pageLoader = document.getElementById('pageLoader');
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderBarFill = document.getElementById('loaderBarFill');
    const loaderStatus = document.getElementById('loaderStatus');

    if (pageLoader) {
        let progress = 1;
        const progressInterval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(progressInterval);
                pageLoader.classList.add('hidden');
                return;
            }

            progress += 1;

            if (loaderStatus) {
                if (progress === 28) loaderStatus.textContent = 'Gathering stories';
                if (progress === 58) loaderStatus.textContent = 'Focusing the vision';
                if (progress === 84) loaderStatus.textContent = 'Almost illuminated';
            }

            if (loaderPercent) {
                loaderPercent.textContent = `${progress}%`;
            }

            if (loaderBarFill) {
                loaderBarFill.style.width = `${progress}%`;
            }
        }, 50);

        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 5000);
        });
    }

    const themeToggle = document.body.querySelector('#themeToggle');

    const getScheduledTheme = function () {
        const now = new Date();
        const minutes = now.getHours() * 60 + now.getMinutes();
        return minutes >= 18 * 60 || minutes < 6 * 60 ? 'dark' : 'light';
    };

    const applyTheme = function (theme, animate = false) {
        const isLightMode = theme === 'light';

        if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('theme-transition');
            window.setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 500);
        }

        document.body.classList.toggle('light-mode', isLightMode);

        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', String(!isLightMode));

            if (isLightMode) {
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            } else {
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            }
        }

    };

    applyTheme(getScheduledTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(nextTheme, true);
        });
    }

    let scheduledTheme = getScheduledTheme();
    window.setInterval(() => {
        const currentScheduledTheme = getScheduledTheme();
        if (currentScheduledTheme !== scheduledTheme) {
            scheduledTheme = currentScheduledTheme;
            applyTheme(currentScheduledTheme, true);
        }
    }, 60000);

    const scrollTop = document.body.querySelector('#scrollTop');

    if (scrollTop) {
        scrollTop.classList.add('visible');
        scrollTop.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Reveal page content as it enters the viewport.
    const revealGroups = [
        '#about .about-intro',
        '#about .about-founder-image',
        '#about .about-founder-copy',
        '#projects .about-intro',
        '#projects .about-founder-image',
        '#projects .about-founder-copy',
        '#signup .col-md-10',
        '.contact-section .col-md-4',
        '.contact-section .social'
    ];
    const revealElements = document.querySelectorAll(revealGroups.join(','));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    revealElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.setProperty('--reveal-delay', `${(index % 3) * 110}ms`);
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(element => element.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14,
            rootMargin: '0px 0px -45px 0px'
        });

        revealElements.forEach(element => revealObserver.observe(element));
    }

    // Add a short echo and particle burst wherever the custom cursor clicks.
    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('pointerdown', (event) => {
            if (!event.isPrimary || event.button !== 0) return;

            const echo = document.createElement('span');
            echo.className = 'cursor-echo';
            echo.style.left = `${event.clientX}px`;
            echo.style.top = `${event.clientY}px`;

            for (let index = 0; index < 6; index += 1) {
                const particle = document.createElement('span');
                particle.className = 'cursor-echo-particle';
                particle.style.setProperty('--particle-angle', `${index * 60}deg`);
                echo.appendChild(particle);
            }

            document.body.appendChild(echo);
            echo.addEventListener('animationend', (animationEvent) => {
                if (animationEvent.target === echo) echo.remove();
            });
        });
    }

    // Search the visible text of each page section.
    const siteSearchToggles = Array.from(document.querySelectorAll('.site-search-toggle'));
    const siteSearch = document.querySelector('#site-search');
    const siteSearchClose = document.querySelector('#site-search-close');
    const siteSearchForm = document.querySelector('#site-search-form');
    const siteSearchInput = document.querySelector('#site-search-input');
    const siteSearchMessage = document.querySelector('#site-search-message');
    const siteSearchResults = document.querySelector('#site-search-results');

    if (siteSearchToggles.length && siteSearch && siteSearchInput && siteSearchMessage && siteSearchResults) {
        let activeSearchToggle = siteSearchToggles[0];
        const searchableSections = Array.from(document.querySelectorAll('header, body > section[id]:not(#site-search)'))
            .filter(section => section.id);

        const closeSiteSearch = function () {
            document.body.classList.remove('search-open');
            siteSearch.setAttribute('aria-hidden', 'true');
            siteSearchToggles.forEach(toggle => toggle.setAttribute('aria-expanded', 'false'));
            activeSearchToggle.focus();
        };

        const renderSearchResults = function (query) {
            const normalizedQuery = query.trim().toLowerCase();
            siteSearchResults.replaceChildren();

            if (!normalizedQuery) {
                siteSearchMessage.textContent = 'Try “projects”, “founder”, or “contact”.';
                return;
            }

            const matches = searchableSections.filter(section =>
                `${section.id} ${section.textContent}`.toLowerCase().includes(normalizedQuery)
            );
            siteSearchMessage.textContent = matches.length
                ? `${matches.length} result${matches.length === 1 ? '' : 's'} found.`
                : 'No matching sections found.';

            matches.forEach(section => {
                const item = document.createElement('li');
                const link = document.createElement('a');
                const heading = document.createElement('strong');
                const excerpt = document.createElement('span');
                const summary = section.textContent.replace(/\s+/g, ' ').trim().slice(0, 150);

                link.href = `#${section.id}`;
                heading.textContent = section.querySelector('h1, h2')?.textContent.trim()
                    || section.id.replace(/-/g, ' ').replace(/\b\w/g, character => character.toUpperCase());
                excerpt.textContent = `${summary}${summary.length === 150 ? '…' : ''}`;
                link.append(heading, excerpt);
                link.addEventListener('click', closeSiteSearch);
                item.appendChild(link);
                siteSearchResults.appendChild(item);
            });
        };

        siteSearchToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                activeSearchToggle = toggle;
                const mobileMenu = document.querySelector('#navbarResponsive');
                if (toggle.classList.contains('site-search-toggle-mobile') && mobileMenu?.classList.contains('show')) {
                    bootstrap.Collapse.getOrCreateInstance(mobileMenu).hide();
                }
                document.body.classList.add('search-open');
                siteSearch.setAttribute('aria-hidden', 'false');
                toggle.setAttribute('aria-expanded', 'true');
                window.setTimeout(() => siteSearchInput.focus(), 150);
            });
        });
        siteSearchClose?.addEventListener('click', closeSiteSearch);
        siteSearchForm?.addEventListener('submit', event => event.preventDefault());
        siteSearchInput.addEventListener('input', event => renderSearchResults(event.target.value));
        siteSearch.addEventListener('click', event => {
            if (event.target === siteSearch) closeSiteSearch();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && document.body.classList.contains('search-open')) closeSiteSearch();
        });
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', (event) => {
            applyTheme(getScheduledTheme(), true);
        });
    }

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
