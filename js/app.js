/**
 * app.js — Composition Root
 * Wires all modules together. Zero business logic here.
 *
 * Boot sequence:
 * 1. Onboarding (or skip if profile exists)
 * 2. Apply branding (greeting, profile, quote)
 * 3. Initialise all feature controllers
 */

import { Config }                from './modules/Config.js';
import { FileStore }             from './modules/FileStore.js';
import { GeminiClient }          from './modules/GeminiClient.js';
import { ProfileStore }          from './modules/ProfileStore.js';
import { ToastService }          from './modules/ToastService.js';
import { BrandingController }    from './modules/BrandingController.js';
import { OnboardingController }  from './modules/OnboardingController.js';
import { NavigationController }  from './modules/NavigationController.js';
import { UploadController }      from './modules/UploadController.js';
import { ChatController }        from './modules/ChatController.js';
import { SummaryController }     from './modules/SummaryController.js';
import { QuizController }        from './modules/QuizController.js';
import { ExplainController }     from './modules/ExplainController.js';

// ── Shared infrastructure ────────────────────────────────
const fileStore = new FileStore();
const client    = new GeminiClient();
const toast     = new ToastService();

// ── Feature controllers ──────────────────────────────────
const navigation = new NavigationController();
const upload     = new UploadController(fileStore);
const chat       = new ChatController(client, fileStore, toast);
const summary    = new SummaryController(client, fileStore, toast);
const quiz       = new QuizController(client, fileStore, toast);
const explain    = new ExplainController(client, fileStore, toast);

/**
 * Called once onboarding is complete (or skipped).
 * Boots the main app with the user's profile.
 */
function bootApp(profile) {
  // Show the main app
  document.getElementById('mainApp').classList.remove('hidden');

  // Apply brand personalisation
  BrandingController.apply(profile);

  // Set personalised system prompt on Aminda
  chat.setSystemPrompt(BrandingController.buildSystemPrompt(profile));

  // Initialise all controllers
  navigation.init();
  upload.init();
  chat.init();
  summary.init();
  quiz.init();
  explain.init();

  // Nigerian greeting toast
  const ng = window.__nigerianGreeting;
  if (ng) {
    setTimeout(() => {
      toast.info(`${ng.greeting} means "${ng.meaning.split('—')[0].trim()}" in ${ng.language} 💜`);
    }, 1400);
  }
}

// ── Bootstrap ────────────────────────────────────────────
function bootstrap() {
  const onboarding = new OnboardingController(bootApp);
  onboarding.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
