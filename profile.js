// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // Tab Navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const profileTabs = document.querySelectorAll('.profile-tab');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links and tabs
            sidebarLinks.forEach(l => l.classList.remove('active'));
            profileTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding tab
            const tabId = this.getAttribute('href').substring(1);
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // Avatar Upload Handling
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const uploadFromDevice = document.getElementById('uploadFromDevice');
    const avatarUpload = document.getElementById('avatarUpload');
    const uploadArea = document.getElementById('uploadArea');
    const avatarImage = document.getElementById('avatarImage');
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');

    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', () => {
            avatarUpload.click();
        });
    }

    if (uploadFromDevice) {
        uploadFromDevice.addEventListener('click', () => {
            avatarUpload.click();
        });
    }

    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            avatarUpload.click();
        });

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--accent-primary)';
            uploadArea.style.background = 'rgba(45, 159, 95, 0.05)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--glass-border)';
            uploadArea.style.background = 'transparent';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--glass-border)';
            uploadArea.style.background = 'transparent';

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
    }

    if (avatarUpload) {
        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        });
    }

    function handleFileUpload(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Read and display the image
        const reader = new FileReader();
        reader.onload = (e) => {
            if (avatarImage) {
                avatarImage.src = e.target.result;
                avatarImage.style.display = 'block';
                if (avatarPlaceholder) {
                    avatarPlaceholder.style.display = 'none';
                }
            }

            // Also update the sidebar avatar if it exists
            const profileAvatarDisplay = document.getElementById('profileAvatarDisplay');
            if (profileAvatarDisplay) {
                const sidebarImg = profileAvatarDisplay.querySelector('img');
                const sidebarPlaceholder = profileAvatarDisplay.querySelector('.avatar-placeholder');

                if (sidebarImg) {
                    sidebarImg.src = e.target.result;
                    sidebarImg.style.display = 'block';
                }
                if (sidebarPlaceholder) {
                    sidebarPlaceholder.style.display = 'none';
                }
            }

            // Show success message
            showNotification('Profile picture updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }

    // Form Submission Handlers
    const profileEditForm = document.querySelector('.profile-edit-form');
    if (profileEditForm) {
        profileEditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Profile updated successfully!', 'success');

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Settings saved successfully!', 'success');
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? 'var(--accent-primary)' : 'var(--accent-secondary)'};
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(45, 159, 95, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      font-family: var(--font-body);
      font-weight: 600;
    `;

        // Add to document
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add animation styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
        document.head.appendChild(style);
    }

    // Auto-save functionality (optional)
    let autoSaveTimeout;
    const formInputs = document.querySelectorAll('.profile-edit-form input, .profile-edit-form textarea');

    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                // Auto-save logic here
                console.log('Auto-saving...');
            }, 2000);
        });
    });

    // Character counter for bio
    const bioTextarea = document.querySelector('.profile-edit-form textarea');
    if (bioTextarea) {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.style.cssText = 'text-align: right; font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;';
        bioTextarea.parentNode.appendChild(counter);

        function updateCounter() {
            const remaining = maxLength - bioTextarea.value.length;
            counter.textContent = `${bioTextarea.value.length} / ${maxLength} characters`;
            if (remaining < 50) {
                counter.style.color = 'var(--accent-secondary)';
            } else {
                counter.style.color = 'var(--text-muted)';
            }
        }

        bioTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
});
