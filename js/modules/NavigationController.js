/**
 * NavigationController
 * Single Responsibility: Handle sidebar navigation, panel switching,
 * and mobile sidebar open/close toggling.
 */
export class NavigationController {
  init() {
    // Panel switching
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        this.#activateMode(btn.dataset.mode);
        // Auto-close sidebar on mobile
        if (window.innerWidth <= 768) this.#closeSidebar();
      });
    });

    // Mobile menu open
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => this.#openSidebar());

    // Mobile sidebar close button
    document.getElementById('sidebarClose')?.addEventListener('click', () => this.#closeSidebar());

    // Reset profile button
    document.getElementById('resetBtn')?.addEventListener('click', () => {
      if (confirm('Reset your profile and API key? You will go through onboarding again.')) {
        localStorage.clear();
        window.location.reload();
      }
    });
  }

  #activateMode(mode) {
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelector(`.nav-item[data-mode="${mode}"]`)?.classList.add('active');
    document.getElementById(`panel-${mode}`)?.classList.add('active');
  }

  #openSidebar() {
    document.getElementById('sidebar')?.classList.add('open');
  }

  #closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
  }
}
