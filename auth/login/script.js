document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const hudLoader = document.getElementById('hudLoader');
  const loaderStatus = document.getElementById('loaderStatus');
  const passwordInput = document.getElementById('password');
  const passwordToggles = document.querySelectorAll('.password-toggle');

  // Password visibility toggle
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      const eyeIcon = this.querySelector('.eye-icon');
      if (type === 'text') {
        eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#fff"/>';
      } else {
        eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      }
    });
  });

  // Form submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.auth-submit');
    const username = document.getElementById('username').value;
    
    // Show loading state
    submitBtn.classList.add('loading');
    hudLoader.classList.add('is-active');
    loaderStatus.textContent = 'Verifying credentials...';

    // Simulate authentication
    setTimeout(() => {
      loaderStatus.textContent = 'Accessing secure channels...';
      
      setTimeout(() => {
        loaderStatus.textContent = 'Authentication successful!';
        
        setTimeout(() => {
          hudLoader.classList.remove('is-active');
          submitBtn.classList.remove('loading');
          
          // Show success feedback
          const successMsg = document.createElement('div');
          successMsg.className = 'copy-toast';
          successMsg.textContent = 'Welcome back, ' + username + '!';
          document.body.appendChild(successMsg);
          
          setTimeout(() => {
            successMsg.remove();
            // Redirect to panel
            window.location.href = '../panel/index.html';
          }, 1300);
        }, 400);
      }, 600);
    }, 1200);
  });

  // Input focus effects
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  });

  // Social login buttons
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const platform = this.querySelector('span').textContent;
      
      // Show connecting state
      const originalText = this.innerHTML;
      this.innerHTML = '<span class="btn-loader" style="width:16px;height:16px;border:2px solid transparent;border-top-color:currentColor;border-radius:50%;display:inline-block;vertical-align:middle;margin-right:8px;"></span> Connecting...';
      this.disabled = true;
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
        
        // Show toast
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = platform + ' sign-in initiated';
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 1300);
      }, 1500);
    });
  });
});
