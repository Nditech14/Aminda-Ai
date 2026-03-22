/**
 * ChatController
 * Single Responsibility: Manage the chat panel — message rendering,
 * conversation history, and sending user input to Aminda AI.
 */
import { MarkdownRenderer } from './MarkdownRenderer.js';

export class ChatController {
  #client;
  #fileStore;
  #toast;
  #systemPrompt = '';
  #history = [];
  #messagesEl;
  #inputEl;
  #sendBtn;

  constructor(client, fileStore, toast) {
    this.#client    = client;
    this.#fileStore = fileStore;
    this.#toast     = toast;
  }

  setSystemPrompt(prompt) { this.#systemPrompt = prompt; }

  init() {
    this.#messagesEl = document.getElementById('messages');
    this.#inputEl    = document.getElementById('chatInput');
    this.#sendBtn    = document.getElementById('sendBtn');

    this.#inputEl.addEventListener('input', () => this.#autoGrow());
    this.#inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
    });
    this.#sendBtn.addEventListener('click', () => this.send());

    document.getElementById('welcomeChips')
      ?.querySelectorAll('.chip')
      .forEach(chip => chip.addEventListener('click', () => {
        this.#inputEl.value = chip.textContent;
        this.send();
      }));
  }

  async send() {
    const text = this.#inputEl.value.trim();
    if (!text) return;

    this.#appendMessage('user', text);
    this.#inputEl.value = '';
    this.#autoGrow();
    this.#sendBtn.disabled = true;

    const fullPrompt = this.#systemPrompt
      ? `${this.#systemPrompt}\n\n${text}`
      : text;

    const parts = this.#fileStore.buildParts(fullPrompt);
    this.#history.push({ role: 'user', parts });
    this.#showTyping();

    try {
      const reply = await this.#client.sendHistory(this.#history);
      this.#removeTyping();
      this.#appendMessage('assistant', MarkdownRenderer.render(reply));
      this.#history.push({ role: 'model', parts: [{ text: reply }] });
    } catch (err) {
      this.#removeTyping();
      this.#appendMessage('assistant', `<span style="color:var(--red)">⚠ ${err.message}</span>`);
    } finally {
      this.#sendBtn.disabled = false;
    }
  }

  #autoGrow() {
    this.#inputEl.style.height = 'auto';
    this.#inputEl.style.height = Math.min(this.#inputEl.scrollHeight, 130) + 'px';
  }

  #appendMessage(role, html) {
    document.getElementById('welcome')?.remove();
    const avatar = role === 'user' ? 'You' : '🪄';
    const label  = role === 'user' ? 'You' : 'Aminda · StudyMind AI';

    const el = document.createElement('div');
    el.className = `msg ${role}`;
    el.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-body">
        <div class="msg-meta">${label}</div>
        <div class="msg-content">${html}</div>
      </div>`;
    this.#messagesEl.appendChild(el);
    el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  #showTyping() {
    document.getElementById('welcome')?.remove();
    const el = document.createElement('div');
    el.className = 'msg assistant';
    el.id = 'typingIndicator';
    el.innerHTML = `
      <div class="msg-avatar">🪄</div>
      <div class="msg-body">
        <div class="msg-meta">Aminda · StudyMind AI</div>
        <div class="msg-content"><div class="typing"><span></span><span></span><span></span></div></div>
      </div>`;
    this.#messagesEl.appendChild(el);
    el.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  #removeTyping() {
    document.getElementById('typingIndicator')?.remove();
  }
}
