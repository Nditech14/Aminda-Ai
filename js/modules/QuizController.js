/**
 * QuizController
 * Single Responsibility: Manage the Quiz Generator panel.
 */
export class QuizController {
  #client; #fileStore; #toast;
  #selectedCount      = '5';
  #selectedDifficulty = 'easy';

  constructor(client, fileStore, toast) {
    this.#client    = client;
    this.#fileStore = fileStore;
    this.#toast     = toast;
  }

  init() {
    document.querySelectorAll('[data-qa-opt]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('[data-qa-opt]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.#selectedCount = card.dataset.qaOpt;
      });
    });

    document.querySelectorAll('[data-diff-opt]').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('[data-diff-opt]').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.#selectedDifficulty = card.dataset.diffOpt;
      });
    });

    document.getElementById('qaBtn').addEventListener('click', () => this.generate());
    document.getElementById('qaCopyBtn').addEventListener('click', () => this.#copyAll());
  }

  async generate() {
    const prompt = `Generate exactly ${this.#selectedCount} ${this.#selectedDifficulty}-level study questions with detailed answers based on the uploaded material (or a general academic topic if none).
Return ONLY valid JSON, no markdown, no code blocks:
{"qa":[{"q":"Question text","a":"Answer text"}]}`;

    const btn = document.getElementById('qaBtn');
    const txt = document.getElementById('qaBtnText');
    btn.disabled = true;
    txt.innerHTML = '<div class="spinner"></div> Aminda is building your quiz…';

    try {
      const parts = this.#fileStore.buildParts(prompt);
      const raw   = (await this.#client.sendParts(parts)).trim().replace(/^```json|^```|```$/gm, '').trim();
      this.#renderItems(JSON.parse(raw).qa || []);
    } catch {
      try {
        const parts = this.#fileStore.buildParts(prompt);
        const raw2  = await this.#client.sendParts(parts);
        const match = raw2.match(/\{[\s\S]*\}/);
        if (match) this.#renderItems(JSON.parse(match[0]).qa || []);
        else throw new Error('Could not parse questions. Please try again.');
      } catch (err) {
        document.getElementById('qaList').innerHTML = `<p style="color:var(--red)">⚠ ${err.message}</p>`;
        document.getElementById('qaResult').classList.add('show');
      }
    } finally {
      btn.disabled = false;
      txt.textContent = 'Generate Questions';
    }
  }

  #renderItems(items) {
    const list = document.getElementById('qaList');
    list.innerHTML = items.map((item, i) => `
      <div class="qa-item" id="qa-${i}">
        <div class="qa-question" data-index="${i}">
          <div class="qa-num">${i + 1}</div>
          <div class="qa-q-text">${this.#esc(item.q)}</div>
          <span class="qa-toggle">+</span>
        </div>
        <div class="qa-answer">
          <div class="qa-badge">✓ Answer</div>
          <div class="qa-answer-text">${this.#esc(item.a)}</div>
        </div>
      </div>`).join('');

    list.querySelectorAll('.qa-question').forEach(q => {
      q.addEventListener('click', () =>
        document.getElementById(`qa-${q.dataset.index}`).classList.toggle('open')
      );
    });

    document.getElementById('qaResult').classList.add('show');
  }

  #copyAll() {
    const text = Array.from(document.querySelectorAll('.qa-item')).map((item, i) =>
      `Q${i+1}. ${item.querySelector('.qa-q-text').textContent}\nAnswer: ${item.querySelector('.qa-answer-text').textContent.trim()}`
    ).join('\n\n');
    navigator.clipboard.writeText(text).then(() => this.#toast.success('📋 All questions copied!'));
  }

  #esc(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
}
