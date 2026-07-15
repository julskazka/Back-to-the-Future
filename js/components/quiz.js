// js/components/quiz.js
import { tests } from '../config.js';
import { renderTop } from '../utils.js';

/**
 * Рендерить шаг проверки (вопрос квиза).
 * @param {number} i — индекс вопроса (0..3)
 * @param {number|null} activeAnswerIndex — выбранный ответ
 * @returns {string} HTML-разметка
 */
export function renderQuizStep(i, activeAnswerIndex = null) {
  const t = tests[i];
  if (!t) return '';

  const progressPercent = (i + 1) * 25;
  const isLast = (i === tests.length - 1);
  
  const answersHtml = t.a.map((x, j) => {
    const isSelected = activeAnswerIndex === j;
    const activeClass = isSelected ? 'on' : '';
    return `
      <button class="answer quiz-opt-btn ${activeClass}" data-opt-idx="${j}" data-score="${x[1]}">
        <b>${String.fromCharCode(65 + j)}</b>${x[0]}
      </button>
    `;
  }).join('');

  const nextBtnDisabled = activeAnswerIndex === null ? 'disabled' : '';
  const verdictHidden = activeAnswerIndex === null ? 'hide' : '';

  return `
    <main class="screen">
      ${renderTop(`ПРОВЕРКА ${t.n} / 04`, t.label)}
      <div class="progress">
        <i style="width: ${progressPercent}%"></i>
      </div>
      <div class="case">
        <div class="caseimg">
          <img src="${t.img}" alt="${t.title}">
        </div>
        <section class="casecopy">
          <div class="stamp">ПРОВЕРКА НА ПОДМЕНУ</div>
          <h1>${t.title}</h1>
          <p class="question">${t.q}</p>
          <div class="answers">
            ${answersHtml}
          </div>
          <div id="verdict" class="verdict ${verdictHidden}">
            <strong>ЗАКЛЮЧЕНИЕ: </strong>${t.v}
          </div>
          <button id="next-btn" class="btn" ${nextBtnDisabled}>
            ${isLast ? 'СНЯТЬ ОТПЕЧАТКИ БРЕНДА' : 'СЛЕДУЮЩАЯ УЛИКА'} →
          </button>
        </section>
      </div>
    </main>
  `;
}
