// ============ PAGE MANAGEMENT ============
function showLoginPage() {
  document.getElementById('auth-container').classList.add('active');
  document.getElementById('app-container').classList.remove('active');
}

function showAppPage() {
  document.getElementById('auth-container').classList.remove('active');
  document.getElementById('app-container').classList.add('active');
}

// ============ NAVIGATION ============
const navButtons = document.querySelectorAll('.nav-icon[data-target]');
const contentSections = document.querySelectorAll('.content-section');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and sections
    navButtons.forEach(b => b.classList.remove('active'));
    contentSections.forEach(s => s.classList.remove('active'));

    // Add active class to clicked button
    btn.classList.add('active');

    // Show target section
    const targetId = btn.getAttribute('data-target');
    document.getElementById(targetId).classList.add('active');
  });
});

// ============ AUTHENTICATION ============
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupBtn = document.getElementById('show-signup-btn');
const showLoginBtn = document.getElementById('show-login-btn');
const authError = document.getElementById('auth-error');

// Toggle between Login and Signup
showSignupBtn.addEventListener('click', () => {
  loginForm.classList.remove('active');
  signupForm.classList.add('active');
  authError.textContent = '';
});

showLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signupForm.classList.remove('active');
  loginForm.classList.add('active');
  authError.textContent = '';
});

// Login Logic
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email && password) {
    // Simulate login
    localStorage.setItem('currentUser', JSON.stringify({ username: email.split('@')[0] }));
    loadApp();
  } else {
    authError.textContent = 'Please enter valid credentials';
  }
});

// Signup Logic
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;

  if (username && email) {
    // Simulate signup
    localStorage.setItem('currentUser', JSON.stringify({ username: username }));
    loadApp();
  }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  showLoginPage();
});

// ============ APP LOGIC ============
function loadApp() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    document.getElementById('current-username').textContent = user.username;
    document.getElementById('sidebar-username').textContent = user.username;
    showAppPage();
    loadPosts();
  } else {
    showLoginPage();
  }
}

// Feed Logic
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const feedStream = document.getElementById('feed-stream');

function loadPosts() {
  // Simulate loading posts
  feedStream.innerHTML = '';
  const posts = [
    {
      author: 'Dr. Emily Carter',
      role: 'Molecular Biologist',
      time: '2h ago',
      content: 'Just published our latest findings on CRISPR-Cas9 off-target effects. Exciting times for gene editing! 🧬 #Science #Genetics',
      avatar: '👩‍🔬'
    },
    {
      author: 'Prof. Alan Grant',
      role: 'Paleontologist',
      time: '5h ago',
      content: 'Digging into some new strata today. The fossil record never ceases to amaze. 🦕',
      avatar: '🦖'
    },
    {
      author: 'Dr. Sheldon Cooper',
      role: 'Theoretical Physicist',
      time: '1d ago',
      content: 'String theory suggests that the fundamental constituents of the universe are one-dimensional "strings". Discuss.',
      avatar: '⚛️'
    }
  ];

  posts.forEach(post => addPostToDOM(post));
}

function addPostToDOM(post) {
  const postEl = document.createElement('div');
  postEl.className = 'post-card';
  postEl.innerHTML = `
    <div class="post-header">
      <div class="user-avatar">${post.avatar || '👤'}</div>
      <div class="post-info">
        <h4>${post.author}</h4>
        <p>${post.role} • ${post.time}</p>
      </div>
    </div>
    <div class="post-content">
      <p>${post.content}</p>
    </div>
    <div class="action-row">
      <button class="action-btn">👍 Like</button>
      <button class="action-btn">💬 Comment</button>
      <button class="action-btn">↗️ Share</button>
    </div>
  `;
  feedStream.prepend(postEl);
}

sendBtn.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (text) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    addPostToDOM({
      author: user.username,
      role: 'Research Scientist',
      time: 'Just now',
      content: text,
      avatar: '👤'
    });
    messageInput.value = '';
  }
});

// Initialize
window.addEventListener('load', () => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    loadApp();
  } else {
    showLoginPage();
  }
});
