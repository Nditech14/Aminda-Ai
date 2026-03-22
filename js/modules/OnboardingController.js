/**
 * OnboardingController
 * Single Responsibility: Manage the 3-step onboarding flow.
 * Steps: Name → Subject → Level
 * No API key step — the key is handled server-side by Vercel.
 */
import { ProfileStore } from './ProfileStore.js';

export class OnboardingController {
  #onComplete;
  #currentStep     = 1;
  #selectedSubject = 'General';
  #selectedLevel   = 'Secondary School';

  static #SUBJECT_ICONS = {
    'General': '📚', 'Mathematics': '➗', 'Sciences': '🔬',
    'Law': '⚖️', 'Business': '📈', 'History': '🏛️',
    'Literature': '✍️', 'Technology': '💻', 'Medicine': '🏥',
  };

  constructor(onComplete) { this.#onComplete = onComplete; }

  init() {
    const existing = ProfileStore.load();
    if (existing) {
      document.getElementById('onboardingOverlay').classList.add('hidden');
      this.#onComplete(existing);
      return;
    }
    this.#bindEvents();
  }

  #bindEvents() {
    document.querySelectorAll('[data-subject]').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('[data-subject]').forEach(s => s.classList.remove('selected'));
        el.classList.add('selected');
        this.#selectedSubject = el.dataset.subject;
      });
    });

    document.querySelectorAll('[data-level]').forEach(el => {
      el.addEventListener('click', () => {
        document.querySelectorAll('[data-level]').forEach(l => l.classList.remove('selected'));
        el.classList.add('selected');
        this.#selectedLevel = el.dataset.level;
      });
    });

    document.getElementById('obStep1Btn')?.addEventListener('click', () => this.#step1Next());
    document.getElementById('obStep2Btn')?.addEventListener('click', () => this.#goToStep(3));
    document.getElementById('obStep3Btn')?.addEventListener('click', () => this.#finish());
    document.getElementById('obName')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.#step1Next();
    });
  }

  #step1Next() {
    const input = document.getElementById('obName');
    const name  = input?.value.trim();
    if (!name) { input?.focus(); return; }
    this.#goToStep(2);
  }

  #goToStep(n) {
    document.getElementById(`ob-step-${this.#currentStep}`)?.classList.remove('active');
    document.getElementById(`dot-${this.#currentStep}`)?.classList.remove('active');
    this.#currentStep = n;
    document.getElementById(`ob-step-${n}`)?.classList.add('active');
    document.getElementById(`dot-${n}`)?.classList.add('active');
  }

  #finish() {
    const name = document.getElementById('obName')?.value.trim() || 'Scholar';
    const profile = {
      name, subject: this.#selectedSubject,
      level: this.#selectedLevel,
      icon: OnboardingController.#SUBJECT_ICONS[this.#selectedSubject] || '📚',
    };
    ProfileStore.save(profile);
    const overlay = document.getElementById('onboardingOverlay');
    overlay.style.transition = 'opacity 0.4s ease';
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.classList.add('hidden'); this.#onComplete(profile); }, 400);
  }
}
