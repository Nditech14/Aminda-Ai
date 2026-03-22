/**
 * BrandingController
 * Single Responsibility: Apply user profile to the UI —
 * Native Nigerian greetings for every time of day,
 * motivational quotes, subject display, header personalisation.
 */
export class BrandingController {

  static #QUOTES = [
    "An investment in knowledge pays the best interest. — Benjamin Franklin",
    "Education is the most powerful weapon you can use to change the world. — Nelson Mandela",
    "The beautiful thing about learning is nobody can take it away from you. — B.B. King",
    "She believed she could, so she did. 💜 — Tech Sisters",
    "Knowledge is power. Information is liberating. — Kofi Annan",
    "Empowered women empower women. Keep learning, keep rising. 🚀",
    "Your only limit is your mind. Push through, Scholar. 💜",
    "Every expert was once a beginner. You're exactly where you need to be.",
    "Built by Tech Sisters, for every student who dares to dream. 💜",
    "The future belongs to those who learn more skills and combine them. — Robert Greene",
  ];

  /**
   * Full native Nigerian greetings for every time of day.
   * Each language has: morning, afternoon, evening entries.
   */
  static #NIGERIAN_GREETINGS = {
    morning: [
      {
        language:      'Yoruba',
        greeting:      'Ẹ káàárọ̀',
        pronunciation: 'Eh kah-ah-roh',
        meaning:       '"Good morning" — the classic Yoruba morning salutation spoken across South-West Nigeria (Lagos, Oyo, Osun, Ekiti, Ondo, Ogun States).',
        response:      'Káàárọ̀ (the reply — meaning the same back to you)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Igbo',
        greeting:      'Ụtụtụ ọma',
        pronunciation: 'Oo-too-too oh-mah',
        meaning:       '"Beautiful morning" — a warm Igbo morning greeting from the South-East (Anambra, Enugu, Imo, Abia, Ebonyi States).',
        response:      'Ụtụtụ ọma (same reply — wishing each other a good morning)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Bini (Edo)',
        greeting:      'Karo',
        pronunciation: 'Kah-roh',
        meaning:       '"Good morning" — the traditional morning greeting of the Edo people, rooted in the ancient Benin Kingdom of Edo State.',
        response:      'Karo (you greet back the same way)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Ibibio',
        greeting:      'Isọn esit',
        pronunciation: 'Ee-son eh-sit',
        meaning:       '"Good morning" — a respectful morning greeting from the Ibibio people of Akwa Ibom State, South-South Nigeria.',
        response:      'Isọn esit (the same greeting is returned)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Hausa',
        greeting:      'Ina kwana',
        pronunciation: 'Ee-nah kwah-nah',
        meaning:       '"How was the night?" — the Hausa way of saying good morning, asking if you slept well. Spoken across North Nigeria (Kano, Kaduna, Sokoto, Zamfara States).',
        response:      'Lafiya lau (reply — meaning "I slept well, peacefully")',
        flag:          '🟢⚪🟢',
      },
    ],
    afternoon: [
      {
        language:      'Yoruba',
        greeting:      'Ẹ káàsán',
        pronunciation: 'Eh kah-ah-sahn',
        meaning:       '"Good afternoon" — the Yoruba afternoon greeting. "Àsán" refers to midday/afternoon time.',
        response:      'Káàsán (same reply back)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Igbo',
        greeting:      'Ehihie ọma',
        pronunciation: 'Eh-hee-hee-eh oh-mah',
        meaning:       '"Good afternoon" — literally "beautiful afternoon" in Igbo. "Ehihie" means the midday period.',
        response:      'Ehihie ọma (same warm reply)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Bini (Edo)',
        greeting:      'Vbe ẹdẹ',
        pronunciation: 'Vbeh eh-deh',
        meaning:       '"Good afternoon / good day" — the Bini Edo greeting used during the daytime hours.',
        response:      'Vbe ẹdẹ (greeted back the same way)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Ibibio',
        greeting:      'Nte ke ebot',
        pronunciation: 'Nteh keh eh-bot',
        meaning:       '"Good afternoon" — the Ibibio midday greeting, a sign of warm respect in Akwa Ibom culture.',
        response:      'Nte ke ebot (same reply)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Hausa',
        greeting:      'Ina yini',
        pronunciation: 'Ee-nah yee-nee',
        meaning:       '"How is the day going?" — the Hausa way of saying good afternoon, checking in on how your day is progressing.',
        response:      'Lafiya lau (reply — "It is going well, peacefully")',
        flag:          '🟢⚪🟢',
      },
    ],
    evening: [
      {
        language:      'Yoruba',
        greeting:      'Ẹ káalẹ̀',
        pronunciation: 'Eh kah-ah-leh',
        meaning:       '"Good evening" — the Yoruba evening salutation. "Alẹ̀" means evening/night time.',
        response:      'Káalẹ̀ (same reply)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Igbo',
        greeting:      'Anyasị ọma',
        pronunciation: 'Ah-nyah-see oh-mah',
        meaning:       '"Good evening" — literally "beautiful evening" in Igbo. A warm way to greet as the day winds down.',
        response:      'Anyasị ọma (same evening blessing)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Bini (Edo)',
        greeting:      'Oghian vbe otọ',
        pronunciation: 'Oh-gee-an vbeh oh-toh',
        meaning:       '"Good evening" — the evening greeting in Bini (Edo), used respectfully as dusk approaches.',
        response:      'Oghian vbe otọ (same reply)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Ibibio',
        greeting:      'Isọn idiọk',
        pronunciation: 'Ee-son ee-dee-ok',
        meaning:       '"Good evening" — the Ibibio evening greeting, showing warmth and care as the day closes.',
        response:      'Isọn idiọk (same evening greeting returned)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Hausa',
        greeting:      'Ina yamma',
        pronunciation: 'Ee-nah yam-mah',
        meaning:       '"Good evening" — literally "how is the evening?" in Hausa. "Yamma" means the evening/West (direction of sunset).',
        response:      'Lafiya lau (reply — "Peacefully, all is well")',
        flag:          '🟢⚪🟢',
      },
    ],
    night: [
      {
        language:      'Yoruba',
        greeting:      'Ẹ káalẹ̀ / Ó dàárọ̀',
        pronunciation: 'Eh kah-ah-leh / Oh dah-ah-roh',
        meaning:       '"Good night" — "Ó dàárọ̀" is used when saying goodnight and going to sleep. A peaceful Yoruba nighttime farewell.',
        response:      'Ó dàárọ̀ (same goodnight wish)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Igbo',
        greeting:      'Ka chi foo',
        pronunciation: 'Kah chee foo',
        meaning:       '"Goodnight" — literally "let the sun rise (find you well)" — a beautiful Igbo way of wishing someone a restful night.',
        response:      'Ka chi foo (same blessing back)',
        flag:          '🟢🟢⚫',
      },
      {
        language:      'Bini (Edo)',
        greeting:      'Rrọọ vbe otọ',
        pronunciation: 'R-roh vbeh oh-toh',
        meaning:       '"Sleep well / good night" — the Bini (Edo) way of wishing someone a peaceful and restful night.',
        response:      'Rrọọ vbe otọ (same goodnight wish)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Ibibio',
        greeting:      'Kọrọ idiọk',
        pronunciation: 'Koh-roh ee-dee-ok',
        meaning:       '"Rest well tonight" — a peaceful Ibibio nighttime farewell wishing you a good and restful sleep.',
        response:      'Kọrọ idiọk (same wish returned)',
        flag:          '🟢⚪🟢',
      },
      {
        language:      'Hausa',
        greeting:      'Sai da safe',
        pronunciation: 'Sigh dah sah-feh',
        meaning:       '"Until tomorrow morning" — the warm Hausa goodnight farewell, meaning "see you in the morning."',
        response:      'Sai da safe (same — see you in the morning)',
        flag:          '🟢⚪🟢',
      },
    ],
  };

  /** Returns the current time period: morning | afternoon | evening | night */
  static #getTimePeriod() {
    const h = new Date().getHours();
    if (h >= 5  && h < 12) return 'morning';
    if (h >= 12 && h < 17) return 'afternoon';
    if (h >= 17 && h < 21) return 'evening';
    return 'night';
  }

  /** Pick a random greeting from the correct time bucket */
  static #pickGreeting() {
    const period = BrandingController.#getTimePeriod();
    const list   = BrandingController.#NIGERIAN_GREETINGS[period];
    return { ...list[Math.floor(Math.random() * list.length)], period };
  }

  /**
   * Apply the full profile + greeting to all UI elements.
   * @param {{ name: string, subject: string, level: string, icon: string }} profile
   */
  static apply(profile) {
    const ng = BrandingController.#pickGreeting();

    // Store globally so app.js and the AI prompt can use it
    window.__nigerianGreeting = ng;

    // ── Welcome heading ─────────────────────────────────
    const heading = document.getElementById('welcomeHeading');
    if (heading) {
      heading.innerHTML = `
        <span class="ng-greeting">${ng.greeting},</span>
        <i class="ng-name">${profile.name}!</i>
        <span class="ng-tag">${ng.language}</span>
      `;
    }

    // ── Meaning + pronunciation card ────────────────────
    const meaningEl = document.getElementById('welcomeMeaning');
    if (meaningEl) {
      meaningEl.innerHTML = `
        <div class="ng-meaning-inner">
          <div class="ng-meaning-top">
            <span class="ng-pronounce">/${ng.pronunciation}/</span>
            <span class="ng-period-badge">${BrandingController.#periodLabel(ng.period)}</span>
          </div>
          <div class="ng-meaning-text">${ng.meaning}</div>
          <div class="ng-response">💬 Reply: <em>${ng.response}</em></div>
        </div>
      `;
      meaningEl.classList.remove('hidden');
    }

    // ── Welcome subtext ─────────────────────────────────
    const subtext = document.getElementById('welcomeSubtext');
    if (subtext) {
      subtext.innerHTML = `I'm <strong>Aminda</strong>, your personal AI tutor for <strong>${profile.subject}</strong>. Drop your study material and let's get to work — I'll help you understand, summarise, and master anything at <strong>${profile.level}</strong> level.`;
    }

    // ── Header user tag ─────────────────────────────────
    const headerUser = document.getElementById('headerUser');
    if (headerUser) headerUser.textContent = `👋 ${profile.name}`;

    // ── Sidebar subject mode ────────────────────────────
    const iconEl = document.getElementById('subjectModeIcon');
    const nameEl = document.getElementById('subjectModeName');
    const lvlEl  = document.getElementById('subjectModeLevel');
    if (iconEl) iconEl.textContent = profile.icon;
    if (nameEl) nameEl.textContent = profile.subject;
    if (lvlEl)  lvlEl.textContent  = profile.level;

    // ── Motivational quote banner ───────────────────────
    const quoteEl = document.getElementById('quoteText');
    if (quoteEl) {
      const quotes = BrandingController.#QUOTES;
      quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }
  }

  static #periodLabel(period) {
    return { morning: '🌅 Morning', afternoon: '☀️ Afternoon', evening: '🌇 Evening', night: '🌙 Night' }[period];
  }

  /**
   * Build personalised system prompt for Aminda.
   * @param {{ name: string, subject: string, level: string }} profile
   * @returns {string}
   */
  static buildSystemPrompt(profile) {
    const ng = window.__nigerianGreeting;
    const greetNote = ng
      ? `You greeted the student in ${ng.language} with "${ng.greeting}" (${ng.pronunciation}) which means: ${ng.meaning}`
      : '';

    return `You are Aminda, a warm, encouraging, and expert AI tutor built by Tech Sisters as part of the Woman Techsters Bootcamp 5.0. You are speaking directly to ${profile.name}, a ${profile.level} student studying ${profile.subject}.

${greetNote}

Always address the student by name (${profile.name}) at least once per response. Tailor explanations to ${profile.level} level. Be encouraging, clear, and professional. Use examples relevant to ${profile.subject} where possible. When study material is uploaded, refer to it directly. End responses with a short motivational nudge when appropriate.`;
  }
}
