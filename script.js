// Hero button demo
const heroButton = document.getElementById("hero-button");
const heroMessage = document.getElementById("hero-message");

if (heroButton && heroMessage) {
  heroButton.addEventListener("click", () => {
    heroMessage.classList.toggle("hidden");
  });
}

// Simple demo contact form handler
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stop real submit
    formStatus.textContent = "This is a demo. No data is actually sent.";
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
