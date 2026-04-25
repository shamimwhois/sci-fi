document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const hudLoader = document.getElementById('hudLoader');
  const loaderStatus = document.getElementById('loaderStatus');
  const passwordInput = document.getElementById('regPassword');
  const confirmPasswordInput = document.getElementById('regConfirmPassword');
  const usernameInput = document.getElementById('regUsername');
  const emailInput = document.getElementById('regEmail');
  const passwordToggles = document.querySelectorAll('.password-toggle');

  // Password visibility toggle
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      confirmPasswordInput.setAttribute('type', type);
      
      const eyeIcon = this.querySelector('.eye-icon');
      if (type === 'text') {
        eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/><path d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#fff"/>';
      } else {
        eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      }
    });
  });

  // Username validation
  usernameInput.addEventListener('input', function() {
    const value = this.value;
    const feedback = document.getElementById('usernameFeedback');
    
    if (value.length === 0) {
      feedback.textContent = '';
      this.classList.remove('success', 'error');
    } else if (value.length < 3) {
      feedback.textContent = 'Username must be at least 3 characters';
      feedback.className = 'error';
      this.classList.remove('success');
      this.classList.add('error');
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      feedback.textContent = 'Only letters, numbers, and underscore';
      feedback.className = 'error';
      this.classList.remove('success');
      this.classList.add('error');
    } else {
      feedback.textContent = 'Username available';
      feedback.className = 'success';
      this.classList.remove('error');
      this.classList.add('success');
    }
  });

  // Email validation
  emailInput.addEventListener('input', function() {
    const value = this.value;
    const feedback = document.getElementById('emailFeedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value.length === 0) {
      feedback.textContent = '';
      this.classList.remove('success', 'error');
    } else if (!emailRegex.test(value)) {
      feedback.textContent = 'Please enter a valid email';
      feedback.className = 'error';
      this.classList.remove('success');
      this.classList.add('error');
    } else {
      feedback.textContent = 'Valid email address';
      feedback.className = 'success';
      this.classList.remove('error');
      this.classList.add('success');
    }
  });

  // Password strength checker
  passwordInput.addEventListener('input', function() {
    const value = this.value;
    const strength = document.getElementById('passwordStrength');
    const criteria = document.getElementById('passwordCriteria');
    const lengthCheck = document.getElementById('criteriaLength');
    const numberCheck = document.getElementById('criteriaNumber');
    const specialCheck = document.getElementById('criteriaSpecial');
    
    criteria.classList.remove('hidden');
    
    const hasLength = value.length >= 8;
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    
    lengthCheck.className = hasLength ? 'w-1.5 h-1.5 rounded-full bg-cyanx' : 'w-1.5 h-1.5 rounded-full bg-slate-600';
    numberCheck.className = hasNumber ? 'w-1.5 h-1.5 rounded-full bg-cyanx' : 'w-1.5 h-1.5 rounded-full bg-slate-600';
    specialCheck.className = hasSpecial ? 'w-1.5 h-1.5 rounded-full bg-cyanx' : 'w-1.5 h-1.5 rounded-full bg-slate-600';
    
    const score = [hasLength, hasNumber, hasSpecial].filter(Boolean).length;
    
    if (value.length === 0) {
      strength.textContent = '';
      this.classList.remove('success', 'error');
    } else if (score < 2) {
      strength.textContent = 'Password too weak';
      strength.className = 'error';
      this.classList.remove('success');
      this.classList.add('error');
    } else if (score === 2) {
      strength.textContent = 'Password moderate';
      strength.className = 'text-violetx';
      this.classList.remove('success', 'error');
    } else {
      strength.textContent = 'Password strong';
      strength.className = 'success';
      this.classList.remove('error');
      this.classList.add('success');
    }
    
    // Check confirm password match
    if (confirmPasswordInput.value) {
      checkPasswordMatch();
    }
  });

  // Confirm password validation
  function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const feedback = document.getElementById('confirmFeedback');
    
    if (confirm.length === 0) {
      feedback.textContent = '';
      confirmPasswordInput.classList.remove('success', 'error');
    } else if (password !== confirm) {
      feedback.textContent = 'Passwords do not match';
      feedback.className = 'error';
      confirmPasswordInput.classList.remove('success');
      confirmPasswordInput.classList.add('error');
    } else {
      feedback.textContent = 'Passwords match';
      feedback.className = 'success';
      confirmPasswordInput.classList.remove('error');
      confirmPasswordInput.classList.add('success');
    }
  }

  confirmPasswordInput.addEventListener('input', checkPasswordMatch);

  // Form submission
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.auth-submit');
    const username = usernameInput.value;
    const email = emailInput.value;
    
    // Validate all fields
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const terms = this.querySelector('[name="terms"]').checked;
    
    if (password.length < 8) {
      document.getElementById('passwordStrength').textContent = 'Password must be at least 8 characters';
      document.getElementById('passwordStrength').className = 'error';
      return;
    }
    
    if (password !== confirm) {
      document.getElementById('confirmFeedback').textContent = 'Passwords do not match';
      document.getElementById('confirmFeedback').className = 'error';
      return;
    }
    
    if (!terms) {
      alert('Please agree to the terms');
      return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    hudLoader.classList.add('is-active');
    loaderStatus.textContent = 'Creating account...';

    // Simulate registration
    setTimeout(() => {
      loaderStatus.textContent = 'Setting up secure profile...';
      
      setTimeout(() => {
        loaderStatus.textContent = 'Registration complete!';
        
        setTimeout(() => {
          hudLoader.classList.remove('is-active');
          submitBtn.classList.remove('loading');
          
          // Show success feedback
          const successMsg = document.createElement('div');
          successMsg.className = 'copy-toast';
          successMsg.textContent = 'Account created! Welcome, ' + username + '!';
          document.body.appendChild(successMsg);
          
          setTimeout(() => {
            successMsg.remove();
            // Redirect to login
            window.location.href = '../login/index.html';
          }, 1500);
        }, 400);
      }, 600);
    }, 1500);
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
        toast.textContent = platform + ' sign-up initiated';
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 1300);
      }, 1500);
    });
  });
});
