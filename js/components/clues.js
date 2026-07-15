// js/components/clues.js
import { renderTop } from '../utils.js';

/**
 * Рендерить экран сбора фоторобота (улики).
 * @returns {string} HTML-разметка
 */
export function renderClues() {
  const cluesData = [
    ['01', 'Точка зрения', 'Что вы объясняете иначе, чем принято в вашей нише? Закончите: «Большинство считает…, а я вижу…».'],
    ['02', 'Смысловая территория', 'С каким конкретным изменением должны связывать именно вас?'],
    ['03', 'Личный материал', 'Какой прожитый опыт и результаты дают вам право говорить именно об этом?'],
    ['04', 'Язык и сигналы', 'Какие фразы, образы, вопросы и форматы работают как ваша подпись?']
  ];

  const gridHtml = cluesData.map(x => `
    <article class="clue">
      <b>${x[0]}</b>
      <h2>${x[1]}</h2>
      <p>${x[2]}</p>
    </article>
  `).join('');

  return `
    <main class="screen">
      ${renderTop('ЭТАП 05', 'СБОР ФОТОРОБОТА')}
      <section class="clues">
        <div class="stamp">ЧЕТЫРЕ ОСОБЫЕ ПРИМЕТЫ</div>
        <h1>ПО ЧЕМУ ДОЛЖНЫ<br><em>ОПОЗНАВАТЬ ВАС?</em></h1>
        <p class="lead">Не ищите одно магическое отличие. Узнаваемость появляется на пересечении четырёх улик.</p>
        <div class="cluegrid">
          ${gridHtml}
        </div>
        <button class="btn" id="finish-clues-btn">СОБРАТЬ ФОТОРОБОТ →</button>
      </section>
    </main>
  `;
}
