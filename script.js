// ============ FIREBASE CONFIG ============
// REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "lattice-app.firebaseapp.com",
  projectId: "lattice-app",
  storageBucket: "lattice-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase Initialized");
} catch (e) {
  console.error("Firebase Init Error (Check Config):", e);
}

// ============ DOM ELEMENTS ============
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

const authOverlay = document.getElementById('auth-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const landingPage = document.getElementById('landing-page');
const appContainer = document.getElementById('app-container');

// ============ AUTH UI LOGIC ============
document.getElementById('login-btn')?.addEventListener('click', () => {
  authOverlay.classList.add('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});

document.getElementById('hero-join-btn')?.addEventListener('click', () => {
  authOverlay.classList.add('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});

document.getElementById('close-auth')?.addEventListener('click', () => {
  authOverlay.classList.remove('active');
});

document.getElementById('show-signup')?.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.classList.remove('active');
  signupForm.classList.add('active');
});

document.getElementById('show-login')?.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.classList.remove('active');
  loginForm.classList.add('active');
});

// ============ AUTH FUNCTIONALITY ============
const loginEmail = document.getElementById('login-email');
const loginPass = document.getElementById('login-password');
const signupEmail = document.getElementById('signup-email');
const signupPass = document.getElementById('signup-password');
const signupName = document.getElementById('signup-name');

// Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPass.value;

  // Simulate Login for Demo if no Firebase Config
  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    alert("Demo Mode: Logging in...");
    toggleAppState(true, "Demo User");
    authOverlay.classList.remove('active');
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      authOverlay.classList.remove('active');
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Signup
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupEmail.value;
  const password = signupPass.value;
  const name = signupName.value;

  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    alert("Demo Mode: Account Created!");
    toggleAppState(true, name);
    authOverlay.classList.remove('active');
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update profile with name
      userCredential.user.updateProfile({
        displayName: name
      });
      authOverlay.classList.remove('active');
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Logout
document.getElementById('logout-btn')?.addEventListener('click', () => {
  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    toggleAppState(false);
    return;
  }
  firebase.auth().signOut();
});

// Auth State Listener
if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      toggleAppState(true, user.displayName || user.email);
    } else {
      toggleAppState(false);
    }
  });
}

function toggleAppState(isLoggedIn, userName = "User") {
  if (isLoggedIn) {
    landingPage.style.display = 'none';
    appContainer.style.display = 'block';
    document.getElementById('user-display').textContent = userName;
    document.getElementById('sidebar-name').textContent = userName;
  } else {
    landingPage.style.display = 'block';
    appContainer.style.display = 'none';
  }
}

// Social Login Handlers
document.querySelectorAll('.btn-social').forEach(btn => {
  btn.addEventListener('click', () => {
    const provider = btn.classList.contains('google') ? 'Google' :
      btn.classList.contains('github') ? 'GitHub' : 'LinkedIn';

    if (firebaseConfig.apiKey === "YOUR_API_KEY") {
      alert(`Demo Mode: Connecting with ${provider}...`);
      toggleAppState(true, `User via ${provider}`);
      authOverlay.classList.remove('active');
    } else {
      // Real Firebase Auth Provider Logic would go here
      alert("Please configure Firebase Auth Providers in script.js");
    }
  });
});

// ============ DASHBOARD NAVIGATION ============
const sidebarLinks = document.querySelectorAll('.sidebar-nav .nav-item');
const contentSections = document.querySelectorAll('.content-section');

sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove active class from all links
    sidebarLinks.forEach(l => l.classList.remove('active'));
    // Add active class to clicked link
    link.classList.add('active');

    // Hide all sections
    contentSections.forEach(section => section.style.display = 'none');

    // Show target section
    const targetId = `section-${link.dataset.target}`;
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = 'block';
    }
  });
});

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

document.querySelectorAll('.card, .hero-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});
