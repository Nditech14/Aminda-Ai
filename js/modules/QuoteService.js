/**
 * QuoteService
 * Single Responsibility: Provide motivational study quotes.
 */
export class QuoteService {
  static #QUOTES = [
    "An investment in knowledge pays the best interest. — Benjamin Franklin",
    "Education is the most powerful weapon you can use to change the world. — Nelson Mandela",
    "The beautiful thing about learning is that no one can take it away from you. — B.B. King",
    "She believed she could, so she did. 💜",
    "Tech Sisters don't just break barriers — they build doors. 🚀",
    "Knowledge is power. Power is freedom. — Mary McLeod Bethune",
    "The more that you read, the more things you will know. — Dr. Seuss",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Women in tech are not the exception — they are the future. 💜",
    "Your education is a dress rehearsal for a life that is yours to lead. — Nora Ephron",
    "Doubt kills more dreams than failure ever will. — Suzy Kassem",
    "A girl with a book has more power than any army. 📚",
    "Be the woman you needed when you were younger. 💜",
    "Bootcamp 5.0 — Tech Sisters building the future one line at a time. 🔥",
  ];

  /** @returns {string} */
  static getRandom() {
    return QuoteService.#QUOTES[Math.floor(Math.random() * QuoteService.#QUOTES.length)];
  }
}
