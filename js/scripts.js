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
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = function (theme) {
        const isLightMode = theme === 'light';
        document.body.classList.toggle('light-mode', isLightMode);

        if (themeToggle) {
            const icon = themeToggle.querySelector('i');

            if (isLightMode) {
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                if (icon) {
                    icon.className = 'fa-solid fa-sun';
                    icon.style.color = '#111827';
                    icon.style.webkitTextStroke = '1.5px #111827';
                    icon.style.textShadow = 'none';
                }
            } else {
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
                if (icon) {
                    icon.className = 'fa-solid fa-moon';
                    icon.style.color = '#ffffff';
                    icon.style.webkitTextStroke = '1.5px #ffffff';
                    icon.style.textShadow = 'none';
                }
            }
        }

        localStorage.setItem('theme', theme);
    };

    const getInitialTheme = function () {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        return systemPrefersDark ? 'dark' : 'light';
    };

    applyTheme(getInitialTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', (event) => {
            const savedTheme = localStorage.getItem('theme');
            if (!savedTheme || (savedTheme !== 'light' && savedTheme !== 'dark')) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
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