import { questions, categories, scoreAnswers } from './questions.mjs';
import { renderDiagram, renderVisualOption } from './diagrams.mjs';
const KEY = 'iq-lab-session-complete-v3';
const DURATION = 20 * 60 * 1000;
const root = document.querySelector('#test-content');
let storageAvailable = true;
let state = freshState();
let showAnswers = false;
let advanceTimer = null;
function cancelAdvance() {
  if (advanceTimer !== null) clearTimeout(advanceTimer);
  advanceTimer = null;
}
function nextQuestion() {
  if (state.index === questions.length - 1) state.phase = 'review';
  else state.index++;
}
function freshState() { return { version: 1, phase: 'intro', index: 0, answers: Array(20).fill(null), startedAt: null, finishedAt: null, timedOut: false }; }
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && saved.version === 1 && ['quiz', 'review', 'result'].includes(saved.phase) && Number.isInteger(saved.index) && saved.index >= 0 && saved.index < 20 && Array.isArray(saved.answers) && saved.answers.length === 20 && saved.answers.every(a => a === null || (Number.isInteger(a) && a >= 0 && a <= 3)) && Number.isFinite(saved.startedAt) && saved.startedAt <= Date.now() && (saved.phase !== 'result' || (Number.isFinite(saved.finishedAt) && saved.finishedAt >= saved.startedAt))) state = saved;
  } catch { storageAvailable = false; }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { storageAvailable = false; } }
const remaining = () => Math.max(0, Math.ceil((DURATION - (Date.now() - state.startedAt)) / 1000));
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const formatTime = seconds => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
function active() { return state.phase === 'quiz' || state.phase === 'review'; }
function updateStatus() {
  const answered = state.answers.filter(a => a !== null).length;
  const progress = state.phase === 'intro' ? 0 : state.phase === 'quiz' ? state.index + 1 : 20;
  document.querySelector('#progress-label').innerHTML = `${progress} <span>/ 20</span>`;
  const bar = document.querySelector('.progress-track');
  bar.setAttribute('aria-valuenow', answered);
  bar.setAttribute('aria-valuetext', `${answered} of 20 questions answered`);
  document.querySelector('#progress-fill').style.width = `${answered * 5}%`;
  const seconds = state.phase === 'intro' ? 1200 : state.phase === 'result' ? Math.max(0, Math.ceil((DURATION - (state.finishedAt - state.startedAt)) / 1000)) : remaining();
  const timer = document.querySelector('#timer');
  timer.textContent = `◷ ${formatTime(seconds)}`;
  timer.classList.toggle('urgent', active() && seconds < 60);
  timer.setAttribute('aria-label', `Time remaining: ${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`);
}
function focusHeading() { requestAnimationFrame(() => root.querySelector('[tabindex="-1"]')?.focus({ preventScroll: true })); }
function render() {
  updateStatus();
  if (state.phase === 'intro') renderIntro();
  else if (state.phase === 'quiz') renderQuestion();
  else if (state.phase === 'review') renderReview();
  else renderResult();
  if (!storageAvailable) root.insertAdjacentHTML('beforeend', '<p class="storage-warning">Your browser cannot save your progress. Keep this page open until you finish.</p>');
}
function renderIntro() {
  root.innerHTML = `<div class="test-card intro-card"><p class="intro-kicker">A LITTLE CHALLENGE. A NEW DISCOVERY.</p><h2 tabindex="-1">Ready to put your mind to the test?</h2><ul class="intro-list"><li><span>Answer <strong>20 questions in 20 minutes</strong>. Settle in and give yourself a little time to focus.</span></li><li><span>Choose from <strong>4 options</strong>. Selecting an answer takes you to the next question. You can return to change it.</span></li><li><span>Explore <strong>5 thinking skills</strong>, then see your score, skill breakdown, and every answer explained.</span></li></ul><button class="button" data-action="start">Start your free test <span aria-hidden="true">→</span></button><p class="intro-footnote">No paywall. No sign-up. Just you and your curiosity.</p></div>`;
}
function puzzle(q) {
  if (q.visual) return `<div class="visual-puzzle">${renderDiagram(q.visual)}</div>`;
  if (q.cells) return `<div class="question-puzzle ${q.kind === 'matrix' ? 'matrix' : ''}" aria-label="${escape(q.cells.join(', '))}">${q.cells.map(c => `<span class="puzzle-cell ${c === '?' ? 'missing' : ''}" aria-hidden="true">${escape(c)}</span>`).join('')}</div>`;
  if (q.text) return `<p class="question-text">${escape(q.text)}</p>`;
  return '';
}
function renderQuestion() {
  const q = questions[state.index];
  root.innerHTML = `<div class="test-card question-card ${q.visual ? 'reference-question' : ''}"><div class="question-meta"><span class="category-tag">${categories[q.category]}</span><span class="question-index">QUESTION ${String(state.index + 1).padStart(2, '0')}</span></div><h2 class="question-title" tabindex="-1">${escape(q.title)}</h2><div class="question-layout ${q.visual ? 'reference-layout' : ''}">${puzzle(q)}<div class="options" role="group" aria-label="Choose one answer">${q.options.map((option, i) => `<button class="option ${state.answers[state.index] === i ? 'selected' : ''}" data-answer="${i}" aria-label="${'ABCD'[i]}. ${escape(option)}" aria-pressed="${state.answers[state.index] === i}"><span class="option-letter">${'ABCD'[i]}</span><span>${renderVisualOption(q, i) || escape(option)}</span></button>`).join('')}</div></div></div><div class="question-nav"><button class="text-button" data-action="previous" ${state.index === 0 ? 'disabled' : ''}>← Previous</button><button class="button" data-action="next">${state.index === 19 ? 'Review answers' : state.answers[state.index] === null ? 'Skip for now' : 'Next question'} <span aria-hidden="true">→</span></button></div><div class="question-dots" aria-label="Jump to a question">${questions.map((_, i) => `<button data-question="${i}" class="${state.answers[i] !== null ? 'answered' : ''} ${state.index === i ? 'current' : ''}" aria-label="Question ${i + 1}, ${state.answers[i] === null ? 'Unanswered' : 'Answered'}" ${state.index === i ? 'aria-current="step"' : ''}>${i + 1}</button>`).join('')}</div><p class="test-help">Select an answer to continue automatically · Use keys 1–4 · Click a question number to revisit it</p>`;
}
function renderReview() {
  const answered = state.answers.filter(a => a !== null).length;
  root.innerHTML = `<div class="test-card"><div class="review-header"><span class="eyebrow">ONE LAST LOOK</span><h2 tabindex="-1">Ready to see your results?</h2><p>You have answered ${answered} of 20 questions. ${answered < 20 ? `${20 - answered} remain unanswered and will earn no points.` : 'You have answered every question.'}</p></div><div class="review-list">${questions.map((_, i) => `<button data-question="${i}" class="${state.answers[i] === null ? 'unanswered' : ''}" aria-label="Return to question ${i + 1}">${i + 1} · ${state.answers[i] === null ? 'Skip' : 'Done'}</button>`).join('')}</div><div class="review-actions"><button class="button button-outline" data-action="back">Back to test</button><button class="button" data-action="finish">See my results →</button></div></div>`;
}
function renderResult() {
  const result = scoreAnswers(state.answers);
  const elapsed = Math.min(1200, Math.max(0, Math.floor((state.finishedAt - state.startedAt) / 1000)));
  root.innerHTML = `<div class="test-card result-card"><span class="eyebrow">A LITTLE THINKING. A NEW PERSPECTIVE.</span><h2 tabindex="-1">Your thinking skills, explored</h2><div class="score-circle"><strong>${result.score}</strong><span>Practice score / 100</span></div><p class="result-summary"><strong>${result.correct}</strong> / 20 correct · Time taken: ${formatTime(elapsed)}${state.timedOut ? ' · Time is up. Answers submitted automatically.' : ''}</p><p class="result-note">This is a practice score based on correct answers, not a standardized IQ score.</p><div class="dimensions">${result.dimensions.map(d => `<div class="dimension"><span>${d.name}</span><div class="dimension-track"><i style="width:${d.correct / d.total * 100}%"></i></div><span>${d.correct} / ${d.total}</span></div>`).join('')}</div><div class="result-actions"><button class="button" data-action="answers" aria-expanded="${showAnswers}" aria-controls="answers-panel">${showAnswers ? 'Hide explanations' : 'See all explanations'} ↓</button><button class="button button-outline" data-action="download">Download report</button><button class="button button-outline" data-action="restart">Try again ↻</button></div><div id="result-toast" role="status"></div></div><div id="answers-panel" class="answers-panel" ${showAnswers ? '' : 'hidden'}><h3>Every question, explained</h3>${questions.map((q, i) => { const correct = state.answers[i] === q.answer; return `<article class="answer-review"><h4><span class="answer-badge ${correct ? '' : 'wrong'}">${correct ? 'Correct' : state.answers[i] === null ? 'Unanswered' : 'Review'}</span>${i + 1}. ${escape(q.title)}</h4>${q.visual ? puzzle(q) : ''}${q.text ? `<p>${escape(q.text).replaceAll('\n','<br>')}</p>` : ''}${q.cells ? `<p>Question: ${escape(q.cells.join(q.kind === 'matrix' ? ' / ' : ' → '))}${q.kind === 'matrix' ? ' (read three cells per row)' : ''}</p>` : ''}<p>Your answer: ${state.answers[i] === null ? 'Unanswered' : escape(q.options[state.answers[i]])} · Correct answer: <strong>${'ABCD'[q.answer]}. ${escape(q.options[q.answer])}</strong></p><p class="explanation">${escape(q.explanation)}</p></article>`; }).join('')}</div>`;
}
function finish(timedOut = false) {
  cancelAdvance();
  state.phase = 'result'; state.timedOut = timedOut;
  state.finishedAt = timedOut ? state.startedAt + DURATION : Date.now();
  save(); render(); focusHeading();
}
function tick() { if (active() && remaining() <= 0) finish(true); else updateStatus(); }
function start() { cancelAdvance(); state = freshState(); state.phase = 'quiz'; state.startedAt = Date.now(); showAnswers = false; save(); render(); focusHeading(); }
function download() {
  const result = scoreAnswers(state.answers);
  const lines = ['IQ Lab · Thinking Skills Report', `Practice score: ${result.score} / 100`, `Correct answers: ${result.correct} / 20`, 'This is not a standardized IQ score. For learning and entertainment only.', '', ...result.dimensions.map(d => `${d.name}: ${d.correct} / ${d.total}`), '', 'Answer explanations', ...questions.map((q, i) => `${i + 1}. ${q.title}\n${q.diagramDescription || q.text || q.cells?.join(' / ') || ''}\nYour answer: ${state.answers[i] === null ? 'Unanswered' : q.options[state.answers[i]]}\nCorrect answer: ${q.options[q.answer]}\nExplanation: ${q.explanation}\n`)];
  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'IQ-Lab-Results.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#result-toast').innerHTML = '<p class="toast">Your report is ready, including your score and every explanation.</p>';
}
root.addEventListener('click', event => {
  const button = event.target.closest('button'); if (!button || button.disabled) return;
  if (active() && remaining() <= 0) { finish(true); return; }
  if (button.dataset.answer !== undefined && state.phase === 'quiz') {
    if (advanceTimer !== null) return;
    const answeredIndex = state.index;
    state.answers[answeredIndex] = Number(button.dataset.answer);
    save(); render();
    // Keep a brief selected state and ignore duplicate clicks during the transition.
    root.querySelectorAll('[data-answer]').forEach(option => { option.disabled = true; });
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      if (state.phase !== 'quiz' || state.index !== answeredIndex) return;
      if (remaining() <= 0) { finish(true); return; }
      nextQuestion(); save(); render(); focusHeading();
    }, 250);
    return;
  }
  cancelAdvance();
  if (button.dataset.question !== undefined && active()) { state.index = Number(button.dataset.question); state.phase = 'quiz'; save(); render(); focusHeading(); return; }
  const action = button.dataset.action;
  if (action === 'start' || action === 'restart') { start(); return; }
  if (action === 'previous') state.index = Math.max(0, state.index - 1);
  if (action === 'next') nextQuestion();
  if (action === 'back') state.phase = 'quiz';
  if (action === 'finish') { finish(); return; }
  if (action === 'answers') { showAnswers = !showAnswers; render(); root.querySelector('[data-action="answers"]')?.focus({preventScroll:true}); return; }
  if (action === 'download') { download(); return; }
  save(); render(); focusHeading();
});
document.addEventListener('keydown', event => {
  if (event.repeat || state.phase !== 'quiz' || !/^[1-4]$/.test(event.key) || event.ctrlKey || event.metaKey || event.altKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  event.preventDefault(); root.querySelector(`[data-answer="${Number(event.key) - 1}"]`)?.click();
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
load(); if (active() && remaining() <= 0) finish(true); else render();
setInterval(tick, 1000);
