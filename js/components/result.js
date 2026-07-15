// js/components/result.js
import { IMG } from './images.js';
import { renderTop } from '../utils.js';

/**
 * Рендерить финальный результат.
 * @param {number} score — общий балл
 * @returns {string} HTML-разметка
 */
export function renderResult(score) {
  let resultTitle = '';
  let resultDesc = '';
  
  if (score >= 10) {
    resultTitle = 'Бренд опознан';
    resultDesc = 'У вас уже есть узнаваемый след. Теперь важно собрать его в систему, чтобы аудитория считывала его стабильно.';
  } else if (score >= 6) {
    resultTitle = 'Есть особые приметы';
    resultDesc = 'В вашем бренде уже видны отдельные сигналы, но пока они не складываются в уверенное опознание.';
  } else {
    resultTitle = 'Подмена возможна';
    resultDesc = 'Сейчас вас скорее подтверждают имя, лицо и регалии. Без них профиль можно перепутать с десятками других сильных экспертов.';
  }

  return `
    <main class="screen">
      ${renderTop('ДЕЛО № 04-ЛБ', 'ЭКСПЕРТИЗА ЗАВЕРШЕНА')}
      <section class="final">
        <div class="result">
          <div class="paper">
            <div class="stamp">ЗАКЛЮЧЕНИЕ ЭКСПЕРТА</div>
            <div class="score">${score}<small>/12</small></div>
            <h1>${resultTitle}</h1>
            <p>${resultDesc}</p>
          </div>
          <aside class="bio">
            <img src="${IMG.author}" alt="Expert Author">
            <div class="stamp">ДЕЛО ВЕДЁТ</div>
            <h2>Людмила<br>Погорелова</h2>
            <p class="role">Архитектура влияния</p>
            <p>Помогаю сильным экспертам собрать узнаваемую систему смыслов, позиционирования и контента — чтобы их понимали, запоминали и выбирали.</p>
            <form class="form" id="lead-form">
              <label>
                <span>ВАШЕ ИМЯ</span>
                <input id="form-name" required placeholder="Как к вам обращаться">
              </label>
              <label>
                <span>КОНТАКТ ДЛЯ СВЯЗИ</span>
                <input id="form-contact" required placeholder="Телефон или @username">
              </label>
              <label class="consent">
                <input type="checkbox" required> Согласен(на) на обработку данных для связи по заявке
              </label>
              <button class="btn" type="submit">ОТПРАВИТЬ БРЕНД НА ОПОЗНАНИЕ →</button>
              <div id="done" class="done"></div>
              <div id="error-box" class="verdict hide" style="background:#781622;color:#fff;"></div>
            </form>
          </aside>
        </div>
      </section>
    </main>
  `;
}
