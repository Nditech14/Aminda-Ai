/**
 * ToastService
 * Single Responsibility: Display branded toast notifications.
 * Replaces all alert() calls with smooth slide-in toasts.
 */
export class ToastService {
  #container;

  constructor() {
    this.#container = document.getElementById('toastContainer');
  }

  show(message, type = 'info', duration = 3000) {
    const icons = { success: '✓', error: '✕', info: '💜' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type]}</span> ${message}`;
    this.#container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
    }, duration);
  }

  success(msg) { this.show(msg, 'success'); }
  error(msg)   { this.show(msg, 'error', 4000); }
  info(msg)    { this.show(msg, 'info'); }
}
