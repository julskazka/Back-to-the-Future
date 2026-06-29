// js/components/result.js
// ПАРТНЁРСКИЙ СИМУЛЯТОР 3.0 — COMPONENT: RESULT DASHBOARD

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

/**
 * Рендер финального результата симулятора в стиле Visual System 3.0
 */
export function renderResult(selectedAnswers) {
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
      <!-- Заголовок / Бейдж -->
      <div class="text-center space-y-2">
        <span class="dashboard-badge-green">
          💰 УРОВЕНЬ: ${model.badge}
        </span>
        <h2 class="text-lg font-extrabold text-white uppercase tracking-wide mt-2">${model.title}</h2>
      </div>

      <!-- Денежный блок (Финансовый Потенциал) -->
      <div class="p-5 rounded-2xl bg-gradient-to-br from-[#151C2C] to-[#111827] border border-[#2EE59D]/30 text-center space-y-1.5 shadow-[0_0_20px_rgba(46,229,157,0.1)]">
        <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">ФИНАНСОВЫЙ ПОТЕНЦИАЛ СИСТЕМЫ:</div>
        <div class="text-2xl font-black text-[#2EE59D] tracking-tight font-mono">${model.potential}</div>
      </div>

      <!-- Аналитический Блок (AI Дашборд) -->
      <div class="code-block space-y-2">
        <div class="text-[#4F8CFF] font-bold text-xs uppercase tracking-wider mb-2">📊 АНАЛИТИКА ТЕКУЩЕЙ ТОЧКИ:</div>
        ${analyticsHtml}
      </div>

      <!-- Индикатор сборки системы (ASCII Progress Bars) -->
      <div class="p-4 rounded-xl bg-[#111827] border border-white/5 space-y-2 font-mono text-xs">
        <div class="text-[#4F8CFF] font-bold uppercase tracking-wider text-[11px] mb-1">⚙️ АРХИТЕКТУРА СВЯЗКИ:</div>
        <div class="flex justify-between text-[#A7B0C0]"><span>Трафик</span> <span class="text-white">${model.progressBars.traffic}</span></div>
        <div class="flex justify-between text-[#A7B0C0]"><span>Партнёр</span> <span class="text-white">${model.progressBars.partner}</span></div>
        <div class="flex justify-between text-[#A7B0C0]"><span>Оффер</span> <span class="text-white">${model.progressBars.offer}</span></div>
      </div>

      <!-- Утечка денег (Ошибки) -->
      <div class="p-4 rounded-xl bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 space-y-2.5">
        <div class="text-xs font-bold text-[#FF4D4D] uppercase tracking-wider flex items-center gap-1.5">
          ⚠️ УТЕЧКА ДЕНЕГ В ТЕКУЩЕЙ СИСТЕМЕ:
        </div>
        <div class="space-y-1.5">
          ${leaksList}
        </div>
      </div>

      <!-- Партнерская карта -->
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

      <!-- Готовый план действий -->
      <div class="space-y-2">
        <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">ПЛАН ДЕЙСТВИЙ:</div>
        <div class="space-y-2">
          ${actionsList}
        </div>
      </div>

      <!-- CTA -->
      <div class="pt-2">
        <a href="https://t.me/" target="_blank" class="btn-saas-primary btn-saas-green btn-press text-center block text-decoration-none">
          ЗАБРАТЬ ГОТОВУЮ СИСТЕМУ В ТЕЛЕГРАМ 🚀
        </a>
      </div>
    </div>
  `;
}
