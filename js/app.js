// js/app.js
// ПАРТНЁРСКИЙ СИМУЛЯТОР 3.0 — ENTRY POINT

import { initIcons } from './utils.js';
import { renderQuizStep, QUIZ_STEPS } from './components/quiz.js';
import { renderResult } from './components/result.js';

let currentState = {
  stepIndex: -1, // -1: Start, 0..2: Quiz steps, 3: Loading, 4: Result
  answers: {}
};

function render() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  if (currentState.stepIndex >= -1 && currentState.stepIndex < QUIZ_STEPS.length) {
    appEl.innerHTML = `
      <main class="max-w-xl mx-auto px-4 pt-6 pb-8 safe-top safe-bottom">
        ${renderQuizStep(currentState.stepIndex, currentState.answers)}
      </main>
    `;
    bindQuizEvents();
  } else if (currentState.stepIndex === QUIZ_STEPS.length) {
    // Эран загрузки / симуляции
    appEl.innerHTML = `
      <main class="max-w-xl mx-auto px-4 pt-12 pb-8 safe-top safe-bottom">
        <div class="dashboard-card p-8 text-center space-y-6 fade-in">
          <div class="w-10 h-10 border-3 border-[#4F8CFF] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div class="space-y-3">
            <span class="dashboard-badge">AI-ГЕНЕРАЦИЯ СИСТЕМЫ</span>
            <h3 class="text-base font-extrabold text-white uppercase tracking-wider">Обработка данных...</h3>
            <div class="font-mono text-xs text-[#4F8CFF] tracking-widest">▰▰▰▰▱▱▱</div>
            <p class="text-xs text-[#A7B0C0] max-w-xs mx-auto">Анализ ресурсов • Расчёт потенциала • Построение связок</p>
          </div>
        </div>
      </main>
    `;
    setTimeout(() => {
      currentState.stepIndex++;
      render();
    }, 1200);
  } else {
    // Финальный результат
    appEl.innerHTML = `
      <main class="max-w-xl mx-auto px-4 pt-6 pb-8 safe-top safe-bottom">
        ${renderResult(currentState.answers)}
        <div class="text-center mt-6">
          <button id="restart-btn" class="text-xs text-[#A7B0C0] hover:text-white underline font-mono btn-press">
            ↺ Перезапустить симулятор v3.0
          </button>
        </div>
      </main>
    `;
    bindResultEvents();
  }

  initIcons();
}

function bindQuizEvents() {
  const startBtn = document.getElementById('start-quiz-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      currentState.stepIndex = 0;
      render();
    });
  }

  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const optId = btn.getAttribute('data-opt-id');
      const currentStep = QUIZ_STEPS[currentState.stepIndex];
      if (currentStep) {
        currentState.answers[currentStep.id] = optId;
        currentState.stepIndex++;
        render();
      }
    });
  });
}

function bindResultEvents() {
  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentState.stepIndex = -1;
      currentState.answers = {};
      render();
    });
  }
}

function initApp() {
  render();
}

initApp();
