/**
 * FileStore
 * Single Responsibility: Manage the collection of user-uploaded study files.
 * Handles add, remove, retrieval, and building Gemini API content parts.
 */
export class FileStore {
  #files = [];

  /** @returns {number} */
  get count() {
    return this.#files.length;
  }

  /** @returns {boolean} */
  get isEmpty() {
    return this.#files.length === 0;
  }

  /**
   * Read a File object and add it to the store.
   * @param {File} file
   * @returns {Promise<void>}
   */
  add(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.#files.push({
          name:     file.name,
          mimeType: file.type,
          base64:   e.target.result.split(',')[1],
        });
        resolve();
      };
      reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Remove a file by index.
   * @param {number} index
   */
  remove(index) {
    this.#files.splice(index, 1);
  }

  /**
   * Returns a shallow copy of the file metadata list for rendering.
   * @returns {Array<{name: string, mimeType: string}>}
   */
  getAll() {
    return this.#files.map(({ name, mimeType }) => ({ name, mimeType }));
  }

  /**
   * Build Gemini API content parts from all stored files + a text prompt.
   * @param {string} text
   * @returns {Array<object>}
   */
  buildParts(text) {
    const parts = [];

    for (const file of this.#files) {
      if (file.mimeType.startsWith('image/')) {
        parts.push({ inline_data: { mime_type: file.mimeType, data: file.base64 } });
      } else if (file.mimeType === 'application/pdf') {
        parts.push({ inline_data: { mime_type: 'application/pdf', data: file.base64 } });
      } else {
        // Plain text — decode and embed directly
        try {
          parts.push({ text: `[File: ${file.name}]\n${atob(file.base64)}` });
        } catch {
          console.warn(`Could not decode file: ${file.name}`);
        }
      }
    }

    parts.push({ text });
    return parts;
  }

  /**
   * Returns the emoji icon appropriate for a given MIME type.
   * @param {string} mimeType
   * @returns {string}
   */
  static iconFor(mimeType) {
    if (mimeType === 'application/pdf')    return '📄';
    if (mimeType.startsWith('image/'))     return '🖼️';
    if (mimeType.startsWith('text/'))      return '📝';
    return '📎';
  }
}
