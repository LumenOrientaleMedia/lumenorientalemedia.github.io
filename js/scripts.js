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

    if (pageLoader) {
        let progress = 1;
        const progressInterval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(progressInterval);
                pageLoader.classList.add('hidden');
                return;
            }

            progress += 1;

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
    const toggleScrollTop = function () {
        if (scrollTop) {
            scrollTop.classList.toggle('visible', window.scrollY > 300);
        }
    };

    if (scrollTop) {
        scrollTop.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        toggleScrollTop();
        document.addEventListener('scroll', toggleScrollTop);
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
