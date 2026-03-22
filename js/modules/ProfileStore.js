/**
 * ProfileStore
 * Single Responsibility: Persist and retrieve the user's onboarding profile.
 * Uses localStorage so settings survive page reloads.
 */
export class ProfileStore {
  static #KEY = 'studymind_profile';

  static save(profile) {
    localStorage.setItem(ProfileStore.#KEY, JSON.stringify(profile));
  }

  static load() {
    try {
      const raw = localStorage.getItem(ProfileStore.#KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  static clear() {
    localStorage.removeItem(ProfileStore.#KEY);
  }

  static exists() {
    return !!localStorage.getItem(ProfileStore.#KEY);
  }
}
