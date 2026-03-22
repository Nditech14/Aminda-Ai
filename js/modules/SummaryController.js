/**
 * SummaryController
 * Single Responsibility: Manage the Summarise panel.
 */
export class SummaryController {
  #client; #fileStore; #toast;
  #selectedFormat = 'brief';

  static #PROMPTS = {
    brief:    'Provide a brief 3–5 sentence summary of the main ideas.',
    bullets:  'Summarise as a structured bullet-point list of the key takeaways (8–12 points).',
    detailed: 'Write a detailed, comprehensive summary covering all major topics and subtopics.',
    simple:   'Explain the main ideas in very plain language as if to a 12-year-old. Use relatable examples and avoid jargon.',
  };

  constructor(client, fileStore, toast) {
    this.#client    = client;
    this.#fileStore = fileStore;
    this.#toast     = toast;
  }

  init() {
    document.querySelectorAll('[data-opt]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('[data-opt]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.#selectedFormat = card.dataset.opt;
      });
    });

    document.getElementById('summaryBtn').addEventListener('click', () => this.generate());
    document.getElementById('summaryCopyBtn').addEventListener('click', () => this.#copy('summaryText'));
  }

  async generate() {
    const base = SummaryController.#PROMPTS[this.#selectedFormat];
    const prompt = this.#fileStore.isEmpty
      ? `${base} (No file uploaded — provide a general study revision tip instead.)`
      : `${base} Base it on the uploaded file(s).`;

    const btn = document.getElementById('summaryBtn');
    const txt = document.getElementById('summaryBtnText');
    btn.disabled = true;
    txt.innerHTML = '<div class="spinner"></div> Aminda is summarising…';

    try {
      const parts  = this.#fileStore.buildParts(prompt);
      const result = await this.#client.sendParts(parts);
      document.getElementById('summaryText').textContent = result;
      document.getElementById('summaryResult').classList.add('show');
    } catch (err) {
      document.getElementById('summaryText').textContent = `Error: ${err.message}`;
      document.getElementById('summaryResult').classList.add('show');
    } finally {
      btn.disabled = false;
      txt.textContent = 'Generate Summary';
    }
  }

  #copy(id) {
    navigator.clipboard.writeText(document.getElementById(id).textContent)
      .then(() => this.#toast.success('📋 Copied to clipboard!'));
  }
}
