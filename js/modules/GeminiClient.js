/**
 * GeminiClient
 * Single Responsibility: Handle all communication with the Gemini API.
 * Calls the Vercel proxy endpoint (/api/gemini) — the API key
 * lives in Vercel Environment Variables and never reaches the browser.
 */
export class GeminiClient {
  // Always call our own proxy — never Google directly
  #proxyEndpoint = '/api/gemini';

  /**
   * Send a single-turn request.
   * @param {Array<object>} parts
   * @returns {Promise<string>}
   */
  async sendParts(parts) {
    return this.#post([{ role: 'user', parts }]);
  }

  /**
   * Send a multi-turn conversation.
   * @param {Array<object>} history
   * @returns {Promise<string>}
   */
  async sendHistory(history) {
    return this.#post(history);
  }

  /**
   * Internal POST to Vercel proxy.
   * @param {Array<object>} contents
   * @returns {Promise<string>}
   */
  async #post(contents) {
    const response = await fetch(this.#proxyEndpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error('Empty response from Aminda. Please try again.');
    return text;
  }
}
