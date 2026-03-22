# 🎓 Aminda AI — StudyMind

> **Built by Tech Sisters · Woman Techsters Bootcamp 5.0**

Aminda is an AI-powered student learning assistant — chat, summarise, quiz, and deeply understand any study material. Powered by Google Gemini AI.

![StudyMind](https://img.shields.io/badge/Built%20by-Tech%20Sisters-purple?style=for-the-badge)
![Bootcamp](https://img.shields.io/badge/Woman%20Techsters-Bootcamp%205.0-gold?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-blue?style=for-the-badge)

---

## 🔑 API Key Setup

**No API key is stored in this codebase.** On first launch, Aminda asks you to paste your own free Gemini API key. It is saved only in your browser's localStorage — never in any file or server.

Get a free key at 👉 [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — no credit card needed.

---

## ✨ Features

- 💬 **Chat with Aminda** — Conversational AI tutor with full session memory
- ⚡ **Smart Summariser** — 4 formats: Brief, Bullet Points, Full Summary, Plain Language
- 🎯 **Quiz Generator** — Auto-generate 5–20 questions at Foundation / Intermediate / Advanced level
- 🔬 **Deep Explain** — Any concept broken down with examples, analogies and key facts
- 📎 **File Upload** — PDF, images (JPG/PNG), and text files
- 🌍 **Nigerian Greetings** — Greeted in a random Nigerian language based on time of day with pronunciation and meaning
- 🎨 **Personalised Onboarding** — Name, subject, and level saved locally
- 📱 **Mobile Responsive** — Works on phones and tablets

---

## 🚀 Live Demo

👉 **[https://nditech14.github.io/Aminda-Ai](https://nditech14.github.io/Aminda-Ai)**

---

## 🏗️ Architecture

Clean architecture with Single Responsibility Principle — no business logic in `app.js`, every class does exactly one thing.

```
studymind/
├── index.html                        # Pure HTML structure
├── style.css                         # All styles
└── js/
    ├── app.js                        # Composition root
    └── modules/
        ├── Config.js                 # API config (NO hardcoded keys)
        ├── FileStore.js              # File state management
        ├── GeminiClient.js           # HTTP/API calls only
        ├── MarkdownRenderer.js       # Text → HTML formatting
        ├── ProfileStore.js           # localStorage profile persistence
        ├── ToastService.js           # Branded notifications
        ├── BrandingController.js     # Nigerian greetings + personalisation
        ├── OnboardingController.js   # 4-step onboarding (incl. API key)
        ├── NavigationController.js   # Panel switching + mobile menu
        ├── UploadController.js       # File upload UI
        ├── ChatController.js         # Chat panel
        ├── SummaryController.js      # Summary panel
        ├── QuizController.js         # Quiz panel
        └── ExplainController.js      # Explain panel
```

---

## 🛠️ Run Locally

```bash
# VS Code — right-click index.html → Open with Live Server

# Node.js
npx serve .

# Python
python -m http.server 8000
```

---

## 🌍 Nigerian Language Greetings

| Time | Language | Greeting | Meaning |
|------|----------|----------|---------|
| 🌅 Morning | Yoruba | Ẹ káàárọ̀ | Good morning |
| 🌅 Morning | Igbo | Ụtụtụ ọma | Beautiful morning |
| 🌅 Morning | Bini (Edo) | Karo | Good morning |
| 🌅 Morning | Ibibio | Isọn esit | Good morning |
| 🌅 Morning | Hausa | Ina kwana | How was the night? |
| ☀️ Afternoon | Yoruba | Ẹ káàsán | Good afternoon |
| 🌇 Evening | Yoruba | Ẹ káalẹ̀ | Good evening |
| 🌙 Night | Hausa | Sai da safe | Until tomorrow morning |

---

## 👩‍💻 Built By

**Tech Sisters** — Woman Techsters Bootcamp 5.0

---

## 📄 License

MIT License — Free to use, modify, and share.
