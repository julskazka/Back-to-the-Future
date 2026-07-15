// js/bridge.js
// Все вызовы Notibot Bridge — только отсюда.

let _state = { user: null, app: null, colors: null };
const _listeners = [];

/**
 * Инициализация Bridge. Вызывается один раз из app.js.
 * @param {Function} onReady — коллбэк { user, app, colors }
 */
export function initBridge(onReady) {
  let initialized = false;

  const handleReady = (userData, appData) => {
    if (initialized) return;
    initialized = true;
    _state = { user: userData, app: appData, colors: appData?.colors || null };
    _applyTheme(_state.colors);
    if (onReady) {
      onReady(_state);
    }
  };

  if (!window.notibot) {
    console.warn("Notibot Bridge SDK не найден на странице, запуск в режиме браузера.");
    handleReady({ displayName: 'Гость', balance: 0 }, {});
    return;
  }

  // Если SDK уже успел получить данные
  if (window.notibot.user && window.notibot.user.id) {
    handleReady(window.notibot.user, window.notibot.app);
    return;
  }

  window.notibot.onUpdate(function(user, app) {
    handleReady(user, app);
    _listeners.forEach(fn => fn(_state));
  });

  // Таймаут для запуска в обычном браузере
  setTimeout(() => {
    if (!initialized) {
      console.warn("Таймаут инициализации Notibot. Запуск в режиме браузера.");
      handleReady({ displayName: 'Гость', balance: 0 }, {});
    }
  }, 500);
}

/** Подписаться на обновления (баланс, тема) */
export function onStateUpdate(fn) { _listeners.push(fn); }

/** Текущее состояние */
export function getState() { return _state; }

// Навигация
// safe: openProduct и openArticle вызываются с ID
export function goToProduct(id)   { id ? window.notibot.openProduct(id)  : window.notibot.openStorefront(); }
export function goToArticle(id)   { id ? window.notibot.openArticle(id)  : window.notibot.openStorefront(); }
export function goToStorefront()  { window.notibot.openStorefront(); }
export function goToUserCard()    { window.notibot.openUserCard(); }

/**
 * Отправить форму с поддержкой таймаута
 * @param {string} formId — ID формы из схемы
 * @param {Array} answers — массив ответов
 */
export async function submitForm(formId, answers) {
  if (window.notibot && typeof window.notibot.submitForm === 'function') {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new window.NotibotBridgeError({
          origin: 'client',
          code: 'ERR_RATE_LIMIT',
          message: 'Превышено время ожидания ответа от Notibot (10 сек)'
        }));
      }, 10000);

      window.notibot.submitForm(formId, answers)
        .then((res) => {
          clearTimeout(timeout);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(timeout);
          reject(err);
        });
    });
  }
  console.log("Mock submitForm call (вне Notibot):", formId, answers);
  return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 800));
}

// Тема
function _applyTheme(colors) {
  if (!colors) return;
  const r = document.documentElement;
  r.style.setProperty('--color-bg',     colors.background);
  r.style.setProperty('--color-text',   colors.textPrimary);
  r.style.setProperty('--color-muted',  colors.textSecondary);
  r.style.setProperty('--color-accent', colors.primaryMain);
  document.body.style.backgroundColor = colors.background;
  document.body.style.color           = colors.textPrimary;
}
