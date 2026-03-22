/**
 * GreetingService
 * Single Responsibility: Provide random Nigerian-language morning greetings
 * with their English meanings. Only active during morning hours (5am–12pm).
 */
export class GreetingService {

  static #GREETINGS = [
    {
      language: 'Yoruba',
      text: 'Ẹ káàárọ̀ 🌅',
      meaning: '"Good morning" in Yoruba — spoken by over 40 million people in South-West Nigeria'
    },
    {
      language: 'Igbo',
      text: 'Ụtụtụ ọma 🌤',
      meaning: '"Good morning" in Igbo — spoken by over 30 million people in South-East Nigeria'
    },
    {
      language: 'Bini (Edo)',
      text: 'Karo 🌞',
      meaning: '"Good morning" in Bini (Edo) — the royal language of the ancient Benin Kingdom'
    },
    {
      language: 'Ibibio',
      text: 'Mme mfọ 🌄',
      meaning: '"Good morning" in Ibibio — spoken by the Ibibio people of Akwa Ibom State'
    },
  ];

  /**
   * Returns a random greeting object if the current time is morning (5am–12pm),
   * otherwise returns null.
   * @returns {{ language: string, text: string, meaning: string } | null}
   */
  static getMorningGreeting() {
    const hour = new Date().getHours();
    const isMorning = hour >= 5 && hour < 12;
    if (!isMorning) return null;

    const index = Math.floor(Math.random() * GreetingService.#GREETINGS.length);
    return GreetingService.#GREETINGS[index];
  }
}
