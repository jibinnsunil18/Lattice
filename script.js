// ============ PAGE MANAGEMENT ============
function showLoginPage() {
  document.getElementById('login-page').classList.add('active');
  document.getElementById('chat-page').classList.remove('active');
}

function showChatPage() {
  document.getElementById('login-page').classList.remove('active');
  document.getElementById('chat-page').classList.add('active');
}

// ============ LOGIN FUNCTIONALITY ============
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Simple validation
  if (!username || !password) {
    loginError.textContent = 'Please enter both username and password';
    return;
  }

  if (username.length < 3) {
    loginError.textContent = 'Username must be at least 3 characters';
    return;
  }

  // Save user session to localStorage
  localStorage.setItem('currentUser', JSON.stringify({
    username: username,
    loginTime: new Date().toISOString()
  }));

  // Clear form and errors
  loginError.textContent = '';
  usernameInput.value = '';
  passwordInput.value = '';

  // Switch to chat page
  showChatPage();
  loadChat();
});

// ============ CHAT FUNCTIONALITY ============
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');
const currentUserSpan = document.getElementById('current-user');
const logoutBtn = document.getElementById('logout-btn');

// Load current user info
function loadChat() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    currentUserSpan.textContent = user.username;
  }
  loadMessages();
}

// Load messages from localStorage
function loadMessages() {
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messagesContainer.innerHTML = '';

  if (messages.length === 0) {
    const systemMsg = document.createElement('div');
    systemMsg.className = 'message system-message';
    systemMsg.innerHTML = '<p>Welcome to Lattice Chat! Start a conversation.</p>';
    messagesContainer.appendChild(systemMsg);
  } else {
    messages.forEach(msg => addMessageToDOM(msg));
  }

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add message to DOM
function addMessageToDOM(msg) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${msg.isOwn ? 'own' : 'other'}`;
  
  const content = document.createElement('p');
  content.textContent = msg.text;
  
  messageEl.appendChild(content);
  messagesContainer.appendChild(messageEl);
}

// Send message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = messageInput.value.trim();
  if (!text) return;

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const newMessage = {
    id: Date.now(),
    username: user.username,
    text: text,
    timestamp: new Date().toISOString(),
    isOwn: true
  };

  // Save message
  const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  messages.push(newMessage);
  localStorage.setItem('chatMessages', JSON.stringify(messages));

  // Add to DOM
  addMessageToDOM(newMessage);

  // Clear input
  messageInput.value = '';
  messageInput.focus();

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Simulate response after 1 second
  setTimeout(() => {
    const responses = [
      'That\'s interesting!',
      'I agree!',
      'Tell me more...',
      'Sounds good!',
      'Nice!',
      'Absolutely!',
      'How are you doing?',
      'What do you think about that?'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const botMessage = {
      id: Date.now(),
      username: 'ChatBot',
      text: randomResponse,
      timestamp: new Date().toISOString(),
      isOwn: false
    };

    const updatedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    updatedMessages.push(botMessage);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    addMessageToDOM(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 1000);
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  messageInput.value = '';
  showLoginPage();
});

// ============ INITIALIZATION ============
// Check if user is logged in
window.addEventListener('load', () => {
  const user = localStorage.getItem('currentUser');
  if (user) {
    showChatPage();
    loadChat();
  } else {
    showLoginPage();
  }
});
