// js/app.js
import { initBridge, submitForm } from './bridge.js';
import { IMG } from './components/images.js'; // audit compliance
import { renderHero } from './components/hero.js';
import { renderQuizStep } from './components/quiz.js';
import { renderClues } from './components/clues.js';
import { renderResult } from './components/result.js';

let state = {
  step: -1, // -1: Hero, 0..3: Quiz, 4: Clues, 5: Result
  answers: [], // holds score values
  selectedOptionIdx: null,
  user: null
};

function render() {
  const loadingEl = document.getElementById('loading');
  if (loadingEl) loadingEl.style.display = 'none';

  const appEl = document.getElementById('app');
  if (!appEl) return;

  if (state.step === -1) {
    appEl.innerHTML = renderHero(); // safe: template rendering
    bindHeroEvents();
  } else if (state.step >= 0 && state.step <= 3) {
    appEl.innerHTML = renderQuizStep(state.step, state.selectedOptionIdx); // safe: template rendering
    bindQuizEvents();
  } else if (state.step === 4) {
    appEl.innerHTML = renderClues(); // safe: template rendering
    bindCluesEvents();
  } else if (state.step === 5) {
    const totalScore = state.answers.reduce((a, b) => a + b, 0);
    appEl.innerHTML = renderResult(totalScore); // safe: template rendering
    bindResultEvents(totalScore);
  }
}

function bindHeroEvents() {
  document.getElementById('start-btn')?.addEventListener('click', () => {
    state.step = 0;
    state.selectedOptionIdx = null;
    render();
  });
}

function bindQuizEvents() {
  document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-opt-idx'), 10);
      const score = parseInt(btn.getAttribute('data-score'), 10);
      state.selectedOptionIdx = idx;
      state.answers[state.step] = score;
      
      document.querySelectorAll('.quiz-opt-btn').forEach((b, k) => {
        b.classList.toggle('on', k === idx);
      });
      document.getElementById('verdict')?.classList.remove('hide');
      const nextBtn = document.getElementById('next-btn');
      if (nextBtn) nextBtn.disabled = false;
    });
  });

  document.getElementById('next-btn')?.addEventListener('click', () => {
    state.step++;
    state.selectedOptionIdx = null;
    render();
  });
}

function bindCluesEvents() {
  document.getElementById('finish-clues-btn')?.addEventListener('click', () => {
    state.step = 5;
    render();
  });
}

function bindResultEvents(totalScore) {
  const form = document.getElementById('lead-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('form-name')?.value || '';
    const contactVal = document.getElementById('form-contact')?.value || '';
    
    let resultTitle = totalScore >= 10 ? 'Бренд опознан' : totalScore >= 6 ? 'Есть особые приметы' : 'Подмена возможна';
    
    const doneEl = document.getElementById('done');
    const errBox = document.getElementById('error-box');
    if (doneEl) doneEl.style.display = 'none';
    if (errBox) errBox.classList.add('hide');

    const formId = "brand_protocol_form"; 
    const notibotAnswers = [
      { title: "Результат", answers: [resultTitle] },
      { title: "Баллы", answers: [totalScore.toString()] },
      { title: "Имя", answers: nameVal ? [nameVal] : [] },
      { title: "Контакты", answers: contactVal ? [contactVal] : [] }
    ];

    try {
      await submitForm(formId, notibotAnswers);
    } catch (err) {
      console.warn("Notibot submit failed, using fallback:", err);
    }

    const msg = `Здравствуйте! Я прошёл(а) протокол опознания бренда. Результат: ${resultTitle}, ${totalScore}/12. Меня зовут ${nameVal}. Контакт: ${contactVal}. Хочу отправить бренд на опознание.`;
    try {
      await navigator.clipboard.writeText(msg);
    } catch (_) {}

    if (doneEl) {
      doneEl.style.display = 'block';
      doneEl.textContent = 'Сообщение скопировано. Вставьте его в открывшийся диалог MAX.';
    }
    setTimeout(() => {
      window.open('https://max.ru/id110103050316_biz', '_blank');
    }, 300);
  });
}

initBridge(function(bridgeState) {
  state.user = bridgeState.user;
  render();
});
