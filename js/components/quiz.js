// js/components/quiz.js
// ПАРТНЁРСКИЙ СИМУЛЯТОР 3.0 — COMPONENT: QUIZ

export const QUIZ_STEPS = [
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

/**
 * Рендер стартового экрана или шага квиза
 */
export function renderQuizStep(stepIndex, selectedAnswers) {
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
