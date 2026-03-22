/**
 * Config
 * Single Responsibility: Application-level configuration.
 *
 * 🔐 SECURITY MODEL:
 * The Gemini API key lives ONLY in Vercel Environment Variables.
 * The frontend never sees or handles the key.
 * All AI requests go to /api/gemini (Vercel serverless function)
 * which adds the key server-side before calling Google.
 */
export class Config {
  static get API_MODEL() {
    return 'gemini-2.5-flash';
  }

  // Points to our Vercel serverless proxy — not Google directly
  static get API_ENDPOINT() {
    return '/api/gemini';
  }
}
