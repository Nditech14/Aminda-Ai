/**
 * MarkdownRenderer
 * Single Responsibility: Convert a subset of Markdown syntax to safe HTML.
 * No network, no DOM manipulation — pure text transformation.
 */
export class MarkdownRenderer {
  /**
   * Render a Markdown string to an HTML string.
   * Supports: bold, italic, inline code, headings (h1–h3), and unordered lists.
   * @param {string} text
   * @returns {string}
   */
  static render(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g,   '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,       '<em>$1</em>')
      .replace(/`(.+?)`/g,         '<code>$1</code>')
      .replace(/^#{1,3} (.+)$/gm,  '<h3>$1</h3>')
      .replace(/^\- (.+)$/gm,      '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g,   '<br/>');
  }
}
