/**
 * NavigationController
 * Single Responsibility: Handle sidebar navigation, panel switching,
 * mobile sidebar drawer, and overlay toggling.
 */
export class NavigationController {
  init() {
    // Panel switching
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        this.#activateMode(btn.dataset.mode);
        if (window.innerWidth <= 768) this.#closeSidebar();
      });
    });

    // Mobile menu open
    document.getElementById('mobileMenuBtn')
      ?.addEventListener('click', () => this.#openSidebar());

    // Sidebar close button
    document.getElementById('sidebarClose')
      ?.addEventListener('click', () => this.#closeSidebar());

    // Overlay click closes sidebar
    document.getElementById('sidebarOverlay')
      ?.addEventListener('click', () => this.#closeSidebar());

    // Close sidebar on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.#closeSidebar();
    });

    // Reset profile
    document.getElementById('resetBtn')?.addEventListener('click', () => {
      if (confirm('Reset your profile? You will go through onboarding again.')) {
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
    document.getElementById('sidebarOverlay')?.classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  #closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebarOverlay')?.classList.remove('show');
    document.body.style.overflow = '';
  }
}