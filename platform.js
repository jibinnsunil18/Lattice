// Platform-specific JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // Auth Modal Handling
    const loginBtn = document.getElementById('loginBtn');
    const authOverlay = document.getElementById('authOverlay');
    const closeAuth = document.getElementById('closeAuth');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginFormSubmit = document.getElementById('loginFormSubmit');
    const signupFormSubmit = document.getElementById('signupFormSubmit');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            authOverlay.classList.add('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });
    }

    if (closeAuth) {
        closeAuth.addEventListener('click', () => {
            authOverlay.classList.remove('active');
        });
    }

    if (authOverlay) {
        authOverlay.addEventListener('click', (e) => {
            if (e.target === authOverlay) {
                authOverlay.classList.remove('active');
            }
        });
    }

    if (showSignup) {
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }

    // Handle Login Form Submission
    if (loginFormSubmit) {
        loginFormSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate login success
            alert('Login successful! Redirecting to your dashboard...');
            // Redirect to profile page
            window.location.href = 'profile.html';
        });
    }

    // Handle Signup Form Submission
    if (signupFormSubmit) {
        signupFormSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate signup success
            alert('Account created successfully! Redirecting to your dashboard...');
            // Redirect to profile page
            window.location.href = 'profile.html';
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
});
