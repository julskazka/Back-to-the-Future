// js/bundle.js
// ПАРТНЁРСКИЙ СИМУЛЯТОР 4.0 — COMPLETE ENGINE (NODES GRAPH, MODULES & INTERACTIVE EVENTS)

(function () {
  'use strict';

  // --- 1. NODES GRAPH DEFINITION ---
  const NODES_GRAPH = {
    start: "node_intro",
    nodes: {
      "node_intro": { type: "ui_intro", next: "node_profile_select" },
      "node_profile_select": { type: "choice", key: "profile", next: "node_goal_select" },
      "node_goal_select": { type: "choice", key: "goal", next: "node_resource_select" },
      "node_resource_select": { type: "choice", key: "resource", next: "node_interactive_reveal" },
      "node_interactive_reveal": { type: "interactive_cards", next: "node_income_simulation" },
      "node_income_simulation": { type: "interactive_simulation", next: "node_analysis_engine" },
      "node_analysis_engine": { type: "logic_spinner", next: "node_result" },
      "node_result": { type: "final_ui", next: "node_cta" }
    }
  };

  // --- 2. MODULES.JSON LOGIC ENGINE ---
  const SYSTEM_MODULES = {
    profile_engine: function(profile) {
      const map = {
        beginner: { level: 'L0', title: 'BEGINNER', typeName: 'Новичок' },
        product_owner: { level: 'L1', title: 'BUILDER', typeName: 'Владелец Продукта' },
        audience_owner: { level: 'L2', title: 'ARCHITECT', typeName: 'Владелец Аудитории' },
        failed_attempt: { level: 'L1', title: 'REBUILDER', typeName: 'Сломанная Система' }
      };
      return map[profile] || map.beginner;
    },
    goal_engine: function(goal) {
      const map = {
        fast_money: 'Быстрый старт (Микро-партнёрства)',
        stable_income: 'Стабильный поток (Подписка / Доля)',
        system_build: 'Автоматическая воронка (SaaS модель)',
        explore: 'Гибридный формат (Интеграции)'
      };
      return map[goal] || map.fast_money;
    },
    resource_engine: function(resource) {
      const map = {
        no_audience: { capacity: 'Микро-связка', gap: 'Отсутствие первичной аудитории и структуры' },
        small_audience: { capacity: 'Средний масштаб', gap: 'Низкая конверсия в касание' },
        expert_content: { capacity: 'Высокий доход', gap: 'Несистемная монетизация связок' },
        traffic_access: { capacity: 'Максимальный автодоход', gap: 'Потеря трафика из-за сломанной цепочки' }
      };
      return map[resource] || map.no_audience;
    },
    analysis_engine: function(answers) {
      const prof = SYSTEM_MODULES.profile_engine(answers.profile || 'beginner');
      const goal = SYSTEM_MODULES.goal_engine(answers.goal || 'fast_money');
      const res  = SYSTEM_MODULES.resource_engine(answers.resource || 'no_audience');

      let potential = '5 000 – 30 000 ₽ / мес';
      if (prof.level === 'L1') potential = '+ x2 – x5 Рост системы';
      if (prof.level === 'L2') potential = '+ от 100 000+ ₽ стабильно';

      return {
        identity: { type: prof.title, level: prof.level, state: prof.typeName },
        modelMap: 'Трафик ➔ Партнёр ➔ Оффер ➔ Деньги',
        gap: res.gap,
        potential: potential,
        incomeModel: goal,
        nextActions: [
          'Построить первую партнерскую связку',
          'Упаковать спец-оффер под целевую нишу',
          'Подключить измеримый авто-трафик'
        ]
      };
    }
  };

  // --- GLOBAL STATE ---
  let appState = {
    currentNode: NODES_GRAPH.start,
    answers: {
      profile: null,
      goal: null,
      resource: null
    },
    cardsFlipped: 0,
    trafficSimLevel: 50
  };

  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (e) {}
    }
  }

  // --- RENDER ROUTER ---
  function render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    const node = NODES_GRAPH.nodes[appState.currentNode];
    if (!node) return;

    let html = '';

    if (node.type === 'ui_intro') {
      html = renderIntro();
    } else if (node.type === 'choice') {
      html = renderChoiceNode(appState.currentNode);
    } else if (node.type === 'interactive_cards') {
      html = renderCardsEvent();
    } else if (node.type === 'interactive_simulation') {
      html = renderSimulationEvent();
    } else if (node.type === 'logic_spinner') {
      html = renderLogicSpinner();
    } else if (node.type === 'final_ui') {
      html = renderFinalResult();
    }

    appEl.innerHTML = `
      <main class="max-w-xl mx-auto px-4 pt-6 pb-8 safe-top safe-bottom">
        ${html}
      </main>
    `;

    bindEvents();
    initIcons();
  }

  // --- NODE RENDERERS ---
  function renderIntro() {
    return `
      <div class="dashboard-card p-6 text-center space-y-6 fade-in">
        <div>
          <span class="dashboard-badge mb-3">● AI PARTNERSHIP ENGINE v4.0</span>
          <h1 class="text-2xl font-extrabold text-white uppercase tracking-wide mt-2">
            ПАРТНЁРСКИЙ СИМУЛЯТОР
          </h1>
          <div class="w-12 h-0.5 bg-[#4F8CFF] mx-auto mt-3 opacity-60"></div>
        </div>

        <p class="text-[#A7B0C0] text-sm leading-relaxed max-w-md mx-auto">
          Интерактивная AI-система экспресс-анализа дохода. Соберите архитектуру своей партнёрской воронки за 2 минуты.
        </p>

        <div class="code-block text-left max-w-sm mx-auto text-xs space-y-1">
          <div class="text-[#4F8CFF]">┌── SYSTEM ARCHITECTURE ──────┐</div>
          <div>│ 🧠 Engine: SaaS Core v4      │</div>
          <div>│ 🎮 Modules: Interactive Reveal│</div>
          <div>│ 📊 Status: Ready to execute  │</div>
          <div class="text-[#4F8CFF]">└─────────────────────────────┘</div>
        </div>

        <div class="pt-2">
          <button id="btn-next-node" class="btn-saas-primary btn-press">
            АКТИВИРОВАТЬ ДАШБОРД 🚀
          </button>
        </div>
      </div>
    `;
  }

  function renderChoiceNode(nodeKey) {
    const configs = {
      node_profile_select: {
        title: 'ШАГ 1: ВЫБОР ПРОФИЛЯ',
        subtitle: 'Выберите ваш текущий статус в системе:',
        stepNum: '1 / 3',
        progress: 33,
        options: [
          { id: 'beginner', label: '🌱 Новичок (Beginner)', desc: 'Нет опыта и ресурсов' },
          { id: 'product_owner', label: '📦 Есть продукт (Builder)', desc: 'Собственный продукт, нет трафика' },
          { id: 'audience_owner', label: '📢 Есть аудитория (Architect)', desc: 'Блог, канал или база' },
          { id: 'failed_attempt', label: '⚡ Сломанная система (Rebuilder)', desc: 'Хаотичные попытки монетизации' }
        ]
      },
      node_goal_select: {
        title: 'ШАГ 2: ВЫБОР ЦЕЛИ',
        subtitle: 'Какую финансовую задачу решаем?',
        stepNum: '2 / 3',
        progress: 66,
        options: [
          { id: 'fast_money', label: '💸 Быстрые деньги', desc: 'Первые результаты в короткий срок' },
          { id: 'stable_income', label: '📈 Стабильный доход', desc: 'Предсказуемый ежемесячный поток' },
          { id: 'system_build', label: '🤖 Автоматическая система', desc: 'Пассивный доход без рутины' },
          { id: 'explore', label: '🔍 Разобраться в механиках', desc: 'Построить правильные связки' }
        ]
      },
      node_resource_select: {
        title: 'ШАГ 3: ВЫБОР РЕСУРСА',
        subtitle: 'Главный актив в наличии прямо сейчас:',
        stepNum: '3 / 3',
        progress: 100,
        options: [
          { id: 'no_audience', label: '📱 Соцсети / Личные профили', desc: 'Активность без базы' },
          { id: 'small_audience', label: '👥 Маленькая аудитория', desc: 'Лояльное микро-сообщество' },
          { id: 'expert_content', label: '✍️ Экспертный блог', desc: 'Контентная площадка' },
          { id: 'traffic_access', label: '🎯 Доступ к трафику', desc: 'Умение привлекать пользователей' }
        ]
      }
    };

    const config = configs[nodeKey];
    const currentNodeObj = NODES_GRAPH.nodes[nodeKey];
    const choiceKey = currentNodeObj.key;
    const currentSelected = appState.answers[choiceKey];

    const optionsHtml = config.options.map(opt => {
      const isSel = currentSelected === opt.id;
      return `
        <button data-choice-id="${opt.id}" class="choice-opt-btn opt-btn ${isSel ? 'selected' : ''} btn-press flex flex-col gap-1">
          <div class="font-bold text-white text-base flex items-center justify-between">
            <span>${opt.label}</span>
            ${isSel ? '<span class="text-[#4F8CFF] text-xs font-mono">✓ ВЫБРАНО</span>' : ''}
          </div>
          <div class="text-xs text-[#A7B0C0] font-normal">${opt.desc}</div>
        </button>
      `;
    }).join('');

    return `
      <div class="dashboard-card p-6 space-y-6 fade-in">
        <div class="space-y-3">
          <div class="flex justify-between items-center text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">
            <span class="dashboard-badge">${config.title}</span>
            <span class="font-mono text-[#4F8CFF]">${config.stepNum}</span>
          </div>
          <div class="w-full bg-[#0B0F1A] h-2 rounded-full overflow-hidden border border-white/5">
            <div class="bg-[#4F8CFF] h-full transition-all duration-300" style="width: ${config.progress}%"></div>
          </div>
        </div>

        <p class="text-sm text-white font-medium">${config.subtitle}</p>

        <div class="space-y-3">
          ${optionsHtml}
        </div>
      </div>
    `;
  }

  // EVENT 2 — PARTNER CARDS REVEAL
  function renderCardsEvent() {
    return `
      <div class="dashboard-card p-6 space-y-6 fade-in text-center">
        <div>
          <span class="dashboard-badge">🃏 EVENT: PARTNER CARDS</span>
          <h2 class="text-lg font-extrabold text-white uppercase tracking-wide mt-2">ОТКРОЙТЕ 3 КАРТЫ СВЯЗКИ</h2>
          <p class="text-xs text-[#A7B0C0] mt-1">Нажмите на каждую карту, чтобы разблокировать System Link</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="flip-card ${appState.cardsFlipped >= 1 ? 'flipped' : ''}" data-card-idx="1">
            <div class="flip-card-inner">
              <div class="flip-card-front">🌐 TRAFFIC</div>
              <div class="flip-card-back">✅ Трафик<br><span class="text-[10px] text-[#A7B0C0]">Подключен</span></div>
            </div>
          </div>

          <div class="flip-card ${appState.cardsFlipped >= 2 ? 'flipped' : ''}" data-card-idx="2">
            <div class="flip-card-inner">
              <div class="flip-card-front">🤝 PARTNER</div>
              <div class="flip-card-back">✅ Партнёр<br><span class="text-[10px] text-[#A7B0C0]">Найден</span></div>
            </div>
          </div>

          <div class="flip-card ${appState.cardsFlipped >= 3 ? 'flipped' : ''}" data-card-idx="3">
            <div class="flip-card-inner">
              <div class="flip-card-front">🎁 OFFER</div>
              <div class="flip-card-back">✅ Оффер<br><span class="text-[10px] text-[#A7B0C0]">Сформирован</span></div>
            </div>
          </div>

          <div class="flip-card ${appState.cardsFlipped >= 4 ? 'flipped' : ''}" data-card-idx="4">
            <div class="flip-card-inner">
              <div class="flip-card-front text-[#2EE59D]">🔒 LINK</div>
              <div class="flip-card-back gold">🔑 SYSTEM LINK<br><span class="text-[10px]">Ключ к деньгам!</span></div>
            </div>
          </div>
        </div>

        <div class="pt-2">
          <button id="btn-next-node" class="btn-saas-primary btn-press ${appState.cardsFlipped < 3 ? 'opacity-50 pointer-events-none' : ''}">
            ПЕРЕЙТИ К СИМУЛЯЦИИ ➔
          </button>
        </div>
      </div>
    `;
  }

  // EVENT 4 — INCOME SIMULATION SLIDER
  function renderSimulationEvent() {
    const estimatedIncome = Math.round(appState.trafficSimLevel * 1800);
    return `
      <div class="dashboard-card p-6 space-y-6 fade-in text-center">
        <div>
          <span class="dashboard-badge">📊 EVENT: INCOME SIMULATION</span>
          <h2 class="text-lg font-extrabold text-white uppercase tracking-wide mt-2">СИМУЛЯЦИЯ РОСТА ДОХОДА</h2>
          <p class="text-xs text-[#A7B0C0] mt-1">Регулируйте уровень трафика и полноту системы</p>
        </div>

        <div class="p-5 rounded-2xl bg-[#0B0F1A] border border-[#2EE59D]/30 space-y-2">
          <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">ПРОГНОЗИРУЕМЫЙ ДОХОДВ МЕСЯЦ:</div>
          <div class="text-3xl font-black text-[#2EE59D] font-mono tracking-tight">+ ${estimatedIncome.toLocaleString('ru-RU')} ₽</div>
        </div>

        <div class="space-y-4 text-left font-mono text-xs">
          <div>
            <div class="flex justify-between mb-1 text-[#A7B0C0]">
              <span>Уровень объёма трафика:</span>
              <span class="text-[#4F8CFF] font-bold">${appState.trafficSimLevel}%</span>
            </div>
            <input type="range" id="traffic-slider" min="10" max="100" value="${appState.trafficSimLevel}">
          </div>

          <div class="code-block space-y-1">
            <div class="flex justify-between"><span>Полнота связки:</span> <span class="text-[#2EE59D]">HIGH (94%)</span></div>
            <div class="flex justify-between"><span>Конверсия воронки:</span> <span class="text-white">3.8%</span></div>
          </div>
        </div>

        <div class="pt-2">
          <button id="btn-next-node" class="btn-saas-primary btn-press">
            ЗАПУСТИТЬ AI-АНАЛИЗ 🧠
          </button>
        </div>
      </div>
    `;
  }

  function renderLogicSpinner() {
    setTimeout(function() {
      appState.currentNode = NODES_GRAPH.nodes[appState.currentNode].next;
      render();
    }, 1200);

    return `
      <div class="dashboard-card p-8 text-center space-y-6 fade-in">
        <div class="w-12 h-12 border-3 border-[#4F8CFF] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div class="space-y-3">
          <span class="dashboard-badge">ANALYSIS ENGINE V4</span>
          <h3 class="text-base font-extrabold text-white uppercase tracking-wider">Генерация результатов...</h3>
          <div class="font-mono text-xs text-[#4F8CFF] tracking-widest">Scanning system gaps...</div>
        </div>
      </div>
    `;
  }

  // 7. RESULT SCREEN (ВАУ-СТРУКТУРА)
  function renderFinalResult() {
    const res = SYSTEM_MODULES.analysis_engine(appState.answers);

    return `
      <div class="dashboard-card p-6 space-y-6 fade-in">
        <!-- SECTION 1 — IDENTITY -->
        <div class="text-center space-y-2">
          <span class="dashboard-badge-green">
            👑 IDENTITY: ${res.identity.type} (${res.identity.level})
          </span>
          <h2 class="text-lg font-extrabold text-white uppercase tracking-wide mt-2">
            СТАТУС: ${res.identity.state}
          </h2>
        </div>

        <!-- SECTION 2 — MODEL MAP -->
        <div class="p-4 rounded-xl bg-[#0B0F1A] border border-white/5 space-y-2 text-center">
          <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">SECTION 2 — MODEL MAP</div>
          <div class="p-2.5 rounded-lg bg-[#151C2C] border border-[#4F8CFF]/30 text-xs font-mono text-[#4F8CFF] font-bold">
            ${res.modelMap}
          </div>
        </div>

        <!-- SECTION 4 — POTENTIAL -->
        <div class="p-5 rounded-2xl bg-[#0B0F1A] border border-[#2EE59D]/30 text-center space-y-1.5">
          <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">SECTION 4 — POTENTIAL</div>
          <div class="text-2xl font-black text-[#2EE59D] font-mono">${res.potential}</div>
          <div class="text-[11px] text-[#A7B0C0]">Модель монетизации: ${res.incomeModel}</div>
        </div>

        <!-- SECTION 3 — GAP -->
        <div class="p-4 rounded-xl bg-[#FF4D4D]/10 border border-[#FF4D4D]/30 space-y-2">
          <div class="text-xs font-bold text-[#FF4D4D] uppercase tracking-wider flex items-center gap-1.5">
            ⚠️ SECTION 3 — SYSTEM GAP (УТЕЧКА):
          </div>
          <div class="text-xs text-white font-medium leading-relaxed">
            ❌ ${res.gap}
          </div>
        </div>

        <!-- SECTION 5 — NEXT ACTION -->
        <div class="space-y-2">
          <div class="text-xs font-bold text-[#A7B0C0] uppercase tracking-wider">SECTION 5 — NEXT ACTIONS</div>
          <div class="space-y-2">
            ${res.nextActions.map((act, i) => `
              <div class="p-3 rounded-xl bg-[#0B0F1A] border border-white/5 text-xs text-white font-semibold flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-[#4F8CFF]/15 text-[#4F8CFF] flex items-center justify-center flex-shrink-0 font-mono font-bold">${i+1}</span>
                <span>${act}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 8. CTA SYSTEM -->
        <div class="pt-2">
          <a href="https://t.me/" target="_blank" class="btn-saas-primary btn-saas-green btn-press text-center block text-decoration-none uppercase tracking-wider font-extrabold">
            ACTIVATE REAL PARTNERSHIP ENGINE 🚀
          </a>
        </div>
      </div>
    `;
  }

  // --- EVENT BINDINGS ---
  function bindEvents() {
    const nextBtn = document.getElementById('btn-next-node');
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        const currentNodeObj = NODES_GRAPH.nodes[appState.currentNode];
        if (currentNodeObj && currentNodeObj.next) {
          appState.currentNode = currentNodeObj.next;
          render();
        }
      });
    }

    document.querySelectorAll('.choice-opt-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const choiceId = btn.getAttribute('data-choice-id');
        const currentNodeObj = NODES_GRAPH.nodes[appState.currentNode];
        if (currentNodeObj && currentNodeObj.key) {
          appState.answers[currentNodeObj.key] = choiceId;
          appState.currentNode = currentNodeObj.next;
          render();
        }
      });
    });

    document.querySelectorAll('.flip-card').forEach(function(card) {
      card.addEventListener('click', function() {
        if (!card.classList.contains('flipped')) {
          card.classList.add('flipped');
          appState.cardsFlipped++;
          if (appState.cardsFlipped >= 3) {
            const fourthCard = document.querySelector('.flip-card[data-card-idx="4"]');
            if (fourthCard && !fourthCard.classList.contains('flipped')) {
              setTimeout(function() {
                fourthCard.classList.add('flipped');
                appState.cardsFlipped = 4;
                const btn = document.getElementById('btn-next-node');
                if (btn) {
                  btn.classList.remove('opacity-50', 'pointer-events-none');
                }
              }, 400);
            }
          }
        }
      });
    });

    const slider = document.getElementById('traffic-slider');
    if (slider) {
      slider.addEventListener('input', function(e) {
        appState.trafficSimLevel = parseInt(e.target.value, 10);
        const incEl = document.querySelector('.text-3xl.text-\\[\\#2EE59D\\]');
        if (incEl) {
          const estimatedIncome = Math.round(appState.trafficSimLevel * 1800);
          incEl.textContent = '+ ' + estimatedIncome.toLocaleString('ru-RU') + ' ₽';
        }
        const percEl = document.querySelector('.text-\\[\\#4F8CFF\\].font-bold');
        if (percEl) {
          percEl.textContent = appState.trafficSimLevel + '%';
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();
