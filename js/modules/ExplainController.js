/**
 * ExplainController
 * Single Responsibility: Manage the Deep Explain panel.
 */
export class ExplainController {
  #client; #fileStore; #toast;
  #selectedLevel = 'student';

  static #LEVELS = {
    beginner: 'for a complete beginner. Use simple language, everyday examples, and analogies.',
    student:  'for a university/secondary school student. Be thorough but clear, use examples and key facts.',
    advanced: 'at an advanced academic level with technical depth, precise terminology, and nuanced detail.',
  };

  constructor(client, fileStore, toast) {
    this.#client    = client;
    this.#fileStore = fileStore;
    this.#toast     = toast;
  }

  init() {
    document.querySelectorAll('[data-level-opt]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('[data-level-opt]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.#selectedLevel = card.dataset.levelOpt;
      });
    });

    document.getElementById('explainBtn').addEventListener('click', () => this.explain());
    document.getElementById('explainCopyBtn').addEventListener('click', () =>
      navigator.clipboard.writeText(document.getElementById('explainText').textContent)
        .then(() => this.#toast.success('📋 Explanation copied!'))
    );
  }

  async explain() {
    const concept = document.getElementById('explainInput').value.trim();
    if (!concept) { this.#toast.info('Please enter a concept or topic first.'); return; }

    const fileNote = this.#fileStore.isEmpty ? '' : '5. Any relevant context from the uploaded file(s).';
    const prompt   = `Explain the following concept ${ExplainController.#LEVELS[this.#selectedLevel]}

Concept: ${concept}

Structure your explanation with:
1. A simple one-sentence definition
2. Why it matters / real-world relevance
3. Key points or components (with examples)
4. A memorable analogy or revision tip
${fileNote}`.trim();

    const btn = document.getElementById('explainBtn');
    const txt = document.getElementById('explainBtnText');
    btn.disabled = true;
    txt.innerHTML = '<div class="spinner"></div> Aminda is explaining…';

    try {
      const parts  = this.#fileStore.buildParts(prompt);
      const result = await this.#client.sendParts(parts);
      document.getElementById('explainText').textContent = result;
      document.getElementById('explainResult').classList.add('show');
    } catch (err) {
      document.getElementById('explainText').textContent = `Error: ${err.message}`;
      document.getElementById('explainResult').classList.add('show');
    } finally {
      btn.disabled = false;
      txt.textContent = 'Ask Aminda to Explain';
    }
  }
}
