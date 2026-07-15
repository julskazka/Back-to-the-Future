// js/components/hero.js
import { IMG } from './images.js';
import { renderTop } from '../utils.js';

/**
 * Рендерить стартовый экран.
 * @returns {string} HTML-разметка
 */
export function renderHero() {
  return `
    <main class="screen">
      ${renderTop('ДЕЛО № 04-ЛБ', 'ПРОТОКОЛ ОПОЗНАНИЯ')}
      <div class="hero">
        <section class="copy">
          <div class="stamp">МАТЕРИАЛЫ ДЕЛА · ДОСТУП ОТКРЫТ</div>
          <h1>УБЕРИТЕ<br>СВОЁ ЛИЦО.<br><em>ВАС ВСЁ ЕЩЁ</em><br>УЗНАЮТ?</h1>
          <p class="lead">Протокол опознания личного бренда без имени, фотографии и регалий</p>
          <button class="btn" id="start-btn">НАЧАТЬ РАССЛЕДОВАНИЕ <b>→</b></button>
        </section>
        <div class="art">
          <img src="${IMG.finger}" alt="Fingerprint">
        </div>
      </div>
    </main>
  `;
}
