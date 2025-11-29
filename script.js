// ============ DOM ELEMENTS ============
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

// ============ MOBILE NAVIGATION ============
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate Hamburger
    const bars = mobileToggle.querySelectorAll('.bar');
    if (navMenu.classList.contains('active')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
}

// Close menu when link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const bars = mobileToggle.querySelectorAll('.bar');
    if (bars.length > 0) {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  });
});

// ============ ACTIVE LINK HIGHLIGHTING ============
const currentLocation = location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentLocation) {
    link.classList.add('active');
  }
});

// ============ HEADER SCROLL EFFECT ============
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .hero-content, .section-title').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// ============ DYNAMIC YEAR ============
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ============ FORM DEMO ============
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'TRANSMITTING...';
    btn.style.background = 'var(--accent-secondary)';

    setTimeout(() => {
      alert('TRANSMISSION RECEIVED. WE WILL MAKE CONTACT SOON.');
      contactForm.reset();
      btn.textContent = originalText;
      btn.style.background = '';
    }, 1500);
  });
}
