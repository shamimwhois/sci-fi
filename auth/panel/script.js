document.addEventListener('DOMContentLoaded', function() {
  const panelLoader = document.getElementById('panelLoader');
  const menuToggle = document.getElementById('menuToggle');
  const panelSidebar = document.getElementById('panelSidebar');
  const navItems = document.querySelectorAll('.nav-item');
  const panelSections = document.querySelectorAll('.panel-section');
  const pageTitle = document.getElementById('pageTitle');
  const logoutBtn = document.getElementById('logoutBtn');
  const themeToggle = document.getElementById('themeToggle');

  // Simulate loading
  setTimeout(() => {
    panelLoader.classList.remove('is-active');
  }, 800);

  // Get username from URL or storage
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('user') || 'Alex Chen';
  document.getElementById('panelUsername').textContent = username;
  document.getElementById('profileName').textContent = username;
  document.getElementById('profileEmail').textContent = username.toLowerCase().replace(/\s+/g, '.') + '@example.com';

  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
    panelSidebar.classList.toggle('open');
  });

  // Navigation
  const sectionTitles = {
    dashboard: 'Dashboard',
    profile: 'Profile',
    billing: 'Billing',
    security: 'Security',
    activity: 'Activity'
  };

  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.dataset.section;

      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');

      // Show corresponding section
      panelSections.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === 'section-' + section) {
          panel.classList.add('active');
        }
      });

      // Update page title
      pageTitle.textContent = sectionTitles[section];

      // Close mobile menu
      panelSidebar.classList.remove('open');
    });
  });

  // Theme toggle
  const themes = ['dark_cyan', 'dark_magenta', 'dark_violet', 'dark_emerald', 'dark_amber'];
  let currentThemeIndex = 0;

  themeToggle.addEventListener('click', function() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.setAttribute('data-theme', themes[currentThemeIndex]);
    localStorage.setItem('hud-theme', themes[currentThemeIndex]);
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('hud-theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
  }

  // Logout
  logoutBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
      window.location.href = '../login/index.html';
    }
  });

  // Quick action buttons
  const quickActionBtns = document.querySelectorAll('.quick-action-btn');
  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.querySelector('span').textContent;
      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = action + ' action initiated';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1300);
    });
  });

  // Profile save button
  const profileActions = document.querySelector('.profile-actions');
  if (profileActions) {
    const saveBtn = profileActions.querySelector('.hud-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', function() {
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'Profile updated successfully';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1300);
      });
    }
  }

  // Password update button
  const passwordChange = document.querySelector('.password-change');
  if (passwordChange) {
    const updateBtn = passwordChange.querySelector('.hud-btn');
    if (updateBtn) {
      updateBtn.addEventListener('click', function() {
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'Password updated successfully';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1300);
      });
    }
  }

  // Security switches
  const switches = document.querySelectorAll('.switch input');
  switches.forEach(switchEl => {
    switchEl.addEventListener('change', function() {
      const label = this.closest('.security-item').querySelector('.security-label');
      const toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.textContent = (label ? label.textContent : 'Setting') + ' ' + (this.checked ? 'enabled' : 'disabled');
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 1300);
    });
  });

  // Activity items hover effect
  const activityItems = document.querySelectorAll('.activity-item');
  activityItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(42, 246, 255, 0.08)';
    });
    item.addEventListener('mouseleave', function() {
      this.style.background = '';
    });
  });
});
