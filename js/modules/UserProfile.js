/**
 * UserProfile
 * Single Responsibility: Persist and retrieve the student profile.
 */
export class UserProfile {
  static #KEY = 'studymind_profile';

  static save(profile) {
    localStorage.setItem(UserProfile.#KEY, JSON.stringify(profile));
  }

  static load() {
    try {
      const raw = localStorage.getItem(UserProfile.#KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  static clear() { localStorage.removeItem(UserProfile.#KEY); }
  static exists() { return !!localStorage.getItem(UserProfile.#KEY); }
}
