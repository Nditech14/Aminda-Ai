/**
 * UploadController
 * Single Responsibility: Handle file upload UI and render the file list.
 */
import { FileStore } from './FileStore.js';

export class UploadController {
  #fileStore; #toast; #onChangeCallback;
  #uploadZone; #fileInput; #fileList;

  constructor(fileStore, toast, onChangeCallback = null) {
    this.#fileStore        = fileStore;
    this.#toast            = toast;
    this.#onChangeCallback = onChangeCallback;
  }

  init() {
    this.#uploadZone = document.getElementById('uploadZone');
    this.#fileInput  = document.getElementById('fileInput');
    this.#fileList   = document.getElementById('fileList');

    this.#uploadZone.addEventListener('click',     () => this.#fileInput.click());
    this.#uploadZone.addEventListener('dragover',  e  => { e.preventDefault(); this.#uploadZone.classList.add('drag-over'); });
    this.#uploadZone.addEventListener('dragleave', ()  => this.#uploadZone.classList.remove('drag-over'));
    this.#uploadZone.addEventListener('drop', e => {
      e.preventDefault();
      this.#uploadZone.classList.remove('drag-over');
      this.#handleFiles(e.dataTransfer.files);
    });
    this.#fileInput.addEventListener('change', () => this.#handleFiles(this.#fileInput.files));
  }

  async #handleFiles(fileList) {
    await Promise.all(Array.from(fileList).map(f => this.#fileStore.add(f)));
    this.#render();
    this.#toast.success(`${fileList.length} file(s) uploaded!`);
    this.#onChangeCallback?.();
  }

  #render() {
    this.#fileList.innerHTML = this.#fileStore.getAll().map((file, i) => `
      <div class="file-item">
        <span class="file-icon">${FileStore.iconFor(file.mimeType)}</span>
        <span class="file-name" title="${file.name}">${file.name}</span>
        <button class="file-remove" data-index="${i}" title="Remove">✕</button>
      </div>`).join('');

    this.#fileList.querySelectorAll('.file-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        this.#fileStore.remove(Number(btn.dataset.index));
        this.#render();
        this.#onChangeCallback?.();
      });
    });
  }
}
