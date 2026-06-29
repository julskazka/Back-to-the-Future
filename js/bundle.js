// js/bundle.js
// ПАРТНЁРСКИЙ СИМУЛЯТОР 3.0 — STANDALONE BUNDLE (NO ES MODULES)

(function () {
  'use strict';

  // --- UTILS ---
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {
        console.warn('Lucide icons init skipped:', e);
      }
    }
  }

  // --- QUIZ DATA & COMPONENT ---
  const QUIZ_STEPS = [
    {
      id: 'step1',
      title: 'ШАГ 1: КТО ТЫ?',
      subtitle: 'Выберите ваш текущий статус и точку старта:',
      options: [
        { id: 'novice', label: '🌱 Новичок', desc: 'Нет опыта и ресурсов в партнёрках' },
        { id: 'product', label: '📦 Есть продукт', desc: 'Собственный продукт или услуга, нет трафика' },
        { id: 'audience', label: '📢 Есть аудитория', desc: 'Свой блог, канал или база подписчиков' },
        { id: 'experienced', label: '⚡ Уже пробовал', desc: 'Был опыт, но система работает хаотично' }
      ]
    },
    {
      id: 'step2',
      title: 'ШАГ 2: КАКАЯ У ТЕБЯ ЦЕЛЬ?',
      subtitle: 'Чего вы хотите достичь в первую очередь?',
      options: [
        { id: 'fast', label: '💸 Быстрые деньги', desc: 'Первые результаты в короткие сроки' },
        { id: 'stable', label: '📈 Стабильный доход', desc: 'Предсказуемый ежемесячный финансовый поток' },
        { id: 'auto', label: '🤖 Автоматическая система', desc: 'Система пассивного дохода без рутины' },
        { id: 'understand', label: '🔍 Разобраться', desc: 'Понять внутреннюю механику и построить связки' }
      ]
    },
    {
      id: 'step3',
      title: 'ШАГ 3: КАКОЙ ГЛАВНЫЙ РЕСУРС?',
      subtitle: 'Чем вы располагаете прямо сейчас?',
      options: [
        { id: 'socials', label: '📱 Соцсети', desc: 'Личные профили и активности' },
        { id: 'small_aud', label: '👥 Маленькая аудитория', desc: 'Лояльное микро-сообщество' },
        { id: 'blog', label: '✍️ Блог / Канал', desc: 'Контентная площадка' },
        { id: 'traffic', label: '🎯 Трафик', desc: 'Умение привлекать пользователей' }
      ]
    }
  ];

  function renderQuizStep(stepIndex, selectedAnswers) {
    if (stepIndex === -1) {
      return `
        <div class="dashboard-card p-6 text-center space-y-6 fade-in">
          <div>
            <span class="dashboard-badge mb-3">● AI-СИСТЕМА АНАЛИЗА ДОХОДА v3.0</span>
            <h1 class="text-2xl font-extrabold text-white uppercase tracking-wide mt-2">
              ПАРТНЁРСКИЙ СИМУЛЯТОР 3.0
            </h1>
            <div class="w-12 h-0.5 bg-[#4F8CFF] mx-auto mt-3 opacity-60"></div>
          </div>

          <p class="text-[#A7B0C0] text-sm leading-relaxed max-w-md mx-auto">
            Интерактивный дашборд сборки персональной модели партнёрского дохода. Анализирует вашу текущую точку, выявляет утечки бюджета и генерирует план действий.
          </p>

          <div class="code-block text-left max-w-sm mx-auto text-xs space-y-1">
            <div class="text-[#4F8CFF]">┌── СИСТЕМНЫЙ СТАТУС ────────┐</div>
            <div>│ 🎯 Экспресс-анализ: 2–3 мин │</div>
            <div>│ 📊 Алгоритм: SaaS Model v3   │</div>
            <div class="text-[#4F8CFF]">└─────────────────────────────┘</div>
          </div>

          <div class="pt-2">
            <button id="start-quiz-btn" class="btn-saas-primary btn-press">
              ЗАПУСТИТЬ СИМУЛЯЦИЮ 🚀
            </button>
          </div>
        </div>
      `;
    }

    const step = QUIZ_STEPS[stepIndex];
    const progress = Math.round(((stepIndex + 1) / QUIZ_STEPS.length) * 100);

    const optionsHtml = step.options.map(opt => {
      const isSelected = selectedAnswers[step.id] === opt.id;
      const selectedClass = isSelected ? 'selected' : '';
      return `
        <button data-opt-id="${opt.id}" class="quiz-opt-btn opt-btn ${selectedClass} btn-press flex flex-col gap-1">
          <div class="font-bold text-white text-base flex items-center justify-between">
            <span>${opt.label}</span>
            ${isSelected ? '<span class="text-[#4F8CFF] text-xs font-mono">✓ ВЫБРАНО</span>' : ''}
          </div>
          <div class="text-xs text-[#A7B0C0] font-normal">${opt.desc}</div>
        </button>
      `;
    }).join('');

    return `
      <div class="dashboard-card p-6 space-y-6 fade-in">
        <div class="space-y-3">
          <div class="flex justify-between items-center text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">
            <span class="dashboard-badge">${step.title}</span>
            <span class="font-mono text-[#4F8CFF]">${stepIndex + 1} / 3</span>
          </div>
          
          <div class="w-full bg-[#111827] h-2 rounded-full overflow-hidden border border-white/5">
            <div class="bg-[#4F8CFF] h-full transition-all duration-300 shadow-[0_0_12px_#4F8CFF]" style="width: ${progress}%"></div>
          </div>
        </div>

        <p class="text-sm text-white font-medium">${step.subtitle}</p>

        <div class="space-y-3">
          ${optionsHtml}
        </div>
      </div>
    `;
  }

  // --- RESULT COMPONENT ---
  const RESULT_MODELS = {
    novice: {
      badge: 'ПАРТНЁР 0 (НОВИЧОК)',
      title: 'МОДЕЛЬ: СТАРТ ЧЕРЕЗ МИКРО-ПАРТНЁРСТВА',
      potential: '+ 5 000 – 30 000 ₽ / мес',
      analytics: [
        { label: 'Структура', value: 'слабая', type: 'warn' },
        { label: 'Связки', value: 'отсутствуют', type: 'bad' },
        { label: 'Потенциал роста', value: 'высокий', type: 'good' }
      ],
      progressBars: { traffic: '███░░ 60%', partner: '██░░░ 40%', offer: '███░░ 60%' },
      actions: ['Выбрать 1 целевую нишу', 'Найти 3 подходящих партнёров', 'Запустить простую связку'],
      leaks: ['Нет системного процесса', 'Хаотичный выбор партнёров', 'Отсутствие готовой связки']
    },
    product: {
      badge: 'ПАРТНЁР 1 (ЕСТЬ ПРОДУКТ)',
      title: 'МОДЕЛЬ: ОФФЕР ➔ ПАРТНЁРСКИЕ ИСТОЧНИКИ',
      potential: '+ x2 – x5 РОСТ ВЫРУЧКИ',
      analytics: [
        { label: 'Продукт', value: 'упакован', type: 'good' },
        { label: 'Трафик-система', value: 'не настроена', type: 'bad' },
        { label: 'Потенциал масштаба', value: 'максимальный', type: 'good' }
      ],
      progressBars: { traffic: '██░░░ 40%', partner: '████░ 80%', offer: '█████ 100%' },
      actions: ['Упаковать оффер для партнеров', 'Подключить первые трафик-каналы', 'Запустить партнёрскую сеть'],
      leaks: ['Есть продукт, но нет трафик-системы', 'Отсутствие партнерских выплат', 'Ручные продажи']
    },
    audience: {
      badge: 'ПАРТНЁР 2 (ЕСТЬ АУДИТОРИЯ)',
      title: 'МОДЕЛЬ: ИНТЕГРАЦИИ ЧЕРЕЗ ПАРТНЁРОВ',
      potential: '+ ОТ 100 000+ ₽ СТАБИЛЬНО',
      analytics: [
        { label: 'Ресурс', value: 'есть аудитория', type: 'good' },
        { label: 'Монетизация', value: 'нерегулярная', type: 'warn' },
        { label: 'Конверсия в клик', value: 'требует роста', type: 'warn' }
      ],
      progressBars: { traffic: '█████ 100%', partner: '███░░ 60%', offer: '██░░░ 40%' },
      actions: ['Подобрать офферы под аудиторию', 'Внедрить нативную интеграцию', 'Автоматизировать монетизацию'],
      leaks: ['Есть ресурс, но нет монетизации связок', 'Низкая конверсия в клик', 'Нерегулярные офферы']
    },
    experienced: {
      badge: 'ПАРТНЁР (СЛОМАННАЯ СИСТЕМА)',
      title: 'МОДЕЛЬ: ПЕРЕСБОРКА И МАСШТАБИРОВАНИЕ',
      potential: '+ АВТОДОХОД И Х3 СИСТЕМА',
      analytics: [
        { label: 'Опыт', value: 'подтвержден', type: 'good' },
        { label: 'Воронка', value: 'хаотична', type: 'bad' },
        { label: 'Потеря трафика', value: 'критическая', type: 'bad' }
      ],
      progressBars: { traffic: '████░ 80%', partner: '███░░ 60%', offer: '███░░ 60%' },
      actions: ['Аудит текущих связок', 'Устранение хаоса в воронке', 'Систематизация партнерской карты'],
      leaks: ['Хаос и отсутствие структуры', 'Потеря сливного трафика', 'Сломанные цепочки продаж']
    }
  };

  function renderResult(selectedAnswers) {
    const role = selectedAnswers.step1 || 'novice';
    const model = RESULT_MODELS[role] || RESULT_MODELS.novice;

    const leaksList = model.leaks.map(l => `
      <div class="flex items-center gap-2 text-[#FF4D4D] text-xs font-semibold">
        <span class="text-sm">❌</span> ${l}
      </div>
    `).join('');

    const actionsList = model.actions.map((a, i) => `
      <div class="p-3.5 rounded-xl bg-[#111827] border border-white/5 text-xs text-white font-semibold flex items-center gap-3">
        <span class="w-6 h-6 rounded-lg bg-[#4F8CFF]/15 text-[#4F8CFF] flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold">${i+1}</span>
        <span>${a}</span>
      </div>
    `).join('');

    const analyticsHtml = model.analytics.map(item => {
      let colorClass = 'text-[#A7B0C0]';
      let dot = '●';
      if (item.type === 'good') { colorClass = 'text-[#2EE59D]'; dot = '🟢'; }
      if (item.type === 'warn') { colorClass = 'text-[#4F8CFF]'; dot = '🟡'; }
      if (item.type === 'bad')  { colorClass = 'text-[#FF4D4D]'; dot = '🔴'; }
      return `<div class="flex justify-between items-center text-xs border-b border-white/5 pb-1.5"><span class="text-[#A7B0C0]">${item.label}:</span><span class="${colorClass} font-bold font-mono">${dot} ${item.value}</span></div>`;
    }).join('');

    return `
      <div class="dashboard-card p-6 space-y-6 fade-in">
        <div class="text-center space-y-2">
          <span class="dashboard-badge-green">
            💰 УРОВЕНЬ: ${model.badge}
          </span>
          <h2 class="text-lg font-extrabold text-white uppercase tracking-wide mt-2">${model.title}</h2>
        </div>

        <div class="p-5 rounded-2xl bg-[#111827] border border-[#2EE59D]/30 text-center space-y-1.5">
          <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">ФИНАНСОВЫЙ ПОТЕНЦИАЛ СИСТЕМЫ:</div>
          <div class="text-2xl font-black text-[#2EE59D] tracking-tight font-mono">${model.potential}</div>
        </div>

        <div class="code-block space-y-2">
          <div class="text-[#4F8CFF] font-bold text-xs uppercase tracking-wider mb-2">📊 АНАЛИТИКА ТЕКУЩЕЙ ТОЧКИ:</div>
          ${analyticsHtml}
        </div>

        <div class="p-4 rounded-xl bg-[#111827] border border-white/5 space-y-2 font-mono text-xs">
          <div class="text-[#4F8CFF] font-bold uppercase tracking-wider text-[11px] mb-1">⚙️ АРХИТЕКТУРА СВЯЗКИ:</div>
          <div class="flex justify-between text-[#A7B0C0]"><span>Трафик</span> <span class="text-white">${model.progressBars.traffic}</span></div>
          <div class="flex justify-between text-[#A7B0C0]"><span>Партнёр</span> <span class="text-white">${model.progressBars.partner}</span></div>
          <div class="flex justify-between text-[#A7B0C0]"><span>Оффер</span> <span class="text-white">${model.progressBars.offer}</span></div>
        </div>

        <div class="p-4 rounded-xl bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 space-y-2.5">
          <div class="text-xs font-bold text-[#FF4D4D] uppercase tracking-wider flex items-center gap-1.5">
            ⚠️ УТЕЧКА ДЕНЕГ В ТЕКУЩЕЙ СИСТЕМЕ:
          </div>
          <div class="space-y-1.5">
            ${leaksList}
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">ПАРТНЁРСКАЯ КАРТА:</div>
          <div class="p-3 rounded-xl bg-[#111827] border border-white/5 flex items-center justify-between text-[11px] font-bold text-white text-center gap-1">
            <div class="bg-[#4F8CFF]/15 px-2 py-1.5 rounded-lg border border-[#4F8CFF]/30 flex-1 text-[#4F8CFF]">🌐 Трафик</div>
            <span class="text-[#A7B0C0]">➔</span>
            <div class="bg-[#4F8CFF]/15 px-2 py-1.5 rounded-lg border border-[#4F8CFF]/30 flex-1 text-[#4F8CFF]">🤝 Партнёр</div>
            <span class="text-[#A7B0C0]">➔</span>
            <div class="bg-[#4F8CFF]/15 px-2 py-1.5 rounded-lg border border-[#4F8CFF]/30 flex-1 text-[#4F8CFF]">🎁 Оффер</div>
            <span class="text-[#A7B0C0]">➔</span>
            <div class="bg-[#2EE59D]/15 px-2 py-1.5 rounded-lg border border-[#2EE59D]/30 flex-1 text-[#2EE59D]">💰 Деньги</div>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">ПЛАН ДЕЙСТВИЙ:</div>
          <div class="space-y-2">
            ${actionsList}
          </div>
        </div>

        <div class="pt-2">
          <a href="https://t.me/" target="_blank" class="btn-saas-primary btn-saas-green btn-press text-center block text-decoration-none">
            ЗАБРАТЬ ГОТОВУЮ СИСТЕМУ В ТЕЛЕГРАМ 🚀
          </a>
        </div>
      </div>
    `;
  }

  // --- APP CONTROLLER ---
  let currentState = {
    stepIndex: -1,
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
      setTimeout(function () {
        currentState.stepIndex++;
        render();
      }, 1200);
    } else {
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
      startBtn.addEventListener('click', function () {
        currentState.stepIndex = 0;
        render();
      });
    }

    document.querySelectorAll('.quiz-opt-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
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
      restartBtn.addEventListener('click', function () {
        currentState.stepIndex = -1;
        currentState.answers = {};
        render();
      });
    }
  }

  // DOM Content Loaded listener or direct execution
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();
