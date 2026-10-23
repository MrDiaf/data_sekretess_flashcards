// Flashcards + multiple choice over CARDS (assets/cards.js). Pure browser JS, no build step.

const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------- helpers

function shuffled(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Markdown would mangle LaTeX (underscores, backslashes), so math is cut out
// before parsing and rendered with KaTeX afterwards.
function renderMd(src) {
  const math = [];
  const stash = (tex, display) => `%%M${math.push({ tex, display }) - 1}%%`;
  let text = src
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => '\n\n' + stash(tex, true) + '\n\n')
    .replace(/\$([^$\n]+?)\$/g, (_, tex) => stash(tex, false));
  let html = window.marked ? marked.parse(text) : text.replace(/[&<>]/g, (c) => `&#${c.charCodeAt(0)};`);
  return html.replace(/%%M(\d+)%%/g, (_, i) => {
    const { tex, display } = math[i];
    if (!window.katex) return tex;
    return katex.renderToString(tex.trim(), { displayMode: display, throwOnError: false });
  });
}

function currentCards() {
  const topic = $('topic').value;
  const list = topic === 'all' ? CARDS : CARDS.filter((c) => c.topic === topic);
  return $('shuffle').checked ? shuffled(list) : list.slice();
}

function setBar(el, done, total) {
  el.style.width = total ? `${(done / total) * 100}%` : '0';
}

// ---------------------------------------------------------------- flashcards

const flash = { queue: [], total: 0, known: 0, revealed: false };

function flashStart(cards = currentCards()) {
  flash.queue = cards;
  flash.total = cards.length;
  flash.known = 0;
  flashShow();
}

function flashShow() {
  const card = flash.queue[0];
  $('flash-count').textContent = `${flash.known} / ${flash.total} known`;
  setBar($('flash-bar'), flash.known, flash.total);
  $('flash-done').hidden = !!card;
  $('flash-card').hidden = $('flash-controls').hidden = !card;
  if (!card) return;

  flash.revealed = false;
  $('flash-id').textContent = `Question ${card.id}`;
  $('flash-topic').textContent = TOPICS[card.topic];
  $('flash-q').innerHTML = renderMd(card.q);
  $('flash-a').innerHTML = renderMd(card.a);
  $('flash-a').hidden = true;
  $('flash-reveal').hidden = false;
  $('flash-again').hidden = $('flash-good').hidden = true;
}

function flashReveal() {
  if (flash.revealed || !flash.queue.length) return;
  flash.revealed = true;
  $('flash-a').hidden = false;
  $('flash-reveal').hidden = true;
  $('flash-again').hidden = $('flash-good').hidden = false;
}

function flashGrade(knewIt) {
  if (!flash.revealed) return;
  const card = flash.queue.shift();
  if (knewIt) {
    flash.known++;
  } else {
    // bring it back after a few other cards so it isn't immediately repeated
    flash.queue.splice(Math.min(3, flash.queue.length), 0, card);
  }
  flashShow();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------------- multiple choice

const quiz = { queue: [], index: 0, correct: 0, missed: [], answered: false };

function quizStart(cards = currentCards()) {
  quiz.queue = cards;
  quiz.index = 0;
  quiz.correct = 0;
  quiz.missed = [];
  quizShow();
}

function quizShow() {
  const card = quiz.queue[quiz.index];
  const total = quiz.queue.length;
  $('quiz-count').textContent = `${Math.min(quiz.index + 1, total)} / ${total}`;
  setBar($('quiz-bar'), quiz.index, total);
  $('quiz-done').hidden = !!card;
  $('quiz-card').hidden = $('quiz-next').parentElement.hidden = !card;
  if (!card) return quizFinish();

  quiz.answered = false;
  $('quiz-id').textContent = `Question ${card.id} · ${TOPICS[card.topic]}`;
  $('quiz-score').textContent = `Score ${quiz.correct}/${quiz.index}`;
  $('quiz-q').innerHTML = renderMd(card.q);
  $('quiz-a').innerHTML = renderMd(card.a);
  $('quiz-explain').hidden = true;
  $('quiz-explain').open = false;
  $('quiz-next').disabled = true;

  const list = $('quiz-options');
  list.replaceChildren();
  for (const text of shuffled([card.correct, ...card.wrong])) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.dataset.correct = text === card.correct;
    btn.addEventListener('click', () => quizAnswer(btn));
    li.append(btn);
    list.append(li);
  }
}

function quizAnswer(chosen) {
  if (quiz.answered) return;
  quiz.answered = true;
  const right = chosen.dataset.correct === 'true';
  if (right) quiz.correct++;
  else quiz.missed.push(quiz.queue[quiz.index]);

  for (const btn of $('quiz-options').querySelectorAll('button')) {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') btn.classList.add('correct');
    else if (btn === chosen) btn.classList.add('wrong');
    else btn.classList.add('dim');
  }
  $('quiz-score').textContent = `Score ${quiz.correct}/${quiz.index + 1}`;
  $('quiz-explain').hidden = false;
  if (!right) $('quiz-explain').open = true;
  $('quiz-next').disabled = false;
  $('quiz-next').focus();
}

function quizNext() {
  if (!quiz.answered) return;
  quiz.index++;
  quizShow();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function quizFinish() {
  const total = quiz.queue.length;
  const pct = total ? Math.round((quiz.correct / total) * 100) : 0;
  $('quiz-result').textContent = `${quiz.correct} / ${total} correct (${pct}%)`;
  $('quiz-result-text').textContent = quiz.missed.length
    ? `You missed ${quiz.missed.length}: ${quiz.missed.map((c) => c.id).join(', ')}`
    : 'Perfect run.';
  $('quiz-retry').hidden = !quiz.missed.length;
  $('quiz-retry').textContent = `Retry missed (${quiz.missed.length})`;
  $('quiz-count').textContent = `${total} / ${total}`;
  setBar($('quiz-bar'), total, total);
}

// ---------------------------------------------------------------- wiring

let mode = 'flash';

function setMode(next) {
  mode = next;
  for (const tab of document.querySelectorAll('.tabs button')) {
    tab.setAttribute('aria-selected', tab.dataset.mode === next);
  }
  $('flash').hidden = next !== 'flash';
  $('quiz').hidden = next !== 'quiz';
  try { localStorage.setItem('mode', next); } catch {}
}

function restartBoth() {
  flashStart();
  quizStart();
}

const topicSelect = $('topic');
topicSelect.append(new Option(`All topics (${CARDS.length})`, 'all'));
for (const [key, label] of Object.entries(TOPICS)) {
  const n = CARDS.filter((c) => c.topic === key).length;
  topicSelect.append(new Option(`${label} (${n})`, key));
}
topicSelect.addEventListener('change', restartBoth);
$('shuffle').addEventListener('change', restartBoth);

for (const tab of document.querySelectorAll('.tabs button')) {
  tab.addEventListener('click', () => setMode(tab.dataset.mode));
}

$('flash-reveal').addEventListener('click', flashReveal);
$('flash-q').addEventListener('click', flashReveal);
$('flash-again').addEventListener('click', () => flashGrade(false));
$('flash-good').addEventListener('click', () => flashGrade(true));
$('flash-restart').addEventListener('click', () => flashStart());

$('quiz-next').addEventListener('click', quizNext);
$('quiz-retry').addEventListener('click', () => quizStart(shuffled(quiz.missed)));
$('quiz-restart').addEventListener('click', () => quizStart());

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.target.matches('select, input')) return;
  if (mode === 'flash') {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flashReveal(); }
    else if (e.key === 'ArrowLeft') flashGrade(false);
    else if (e.key === 'ArrowRight') flashGrade(true);
  } else {
    const n = Number(e.key);
    const buttons = $('quiz-options').querySelectorAll('button');
    if (n >= 1 && n <= buttons.length) quizAnswer(buttons[n - 1]);
    else if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') { e.preventDefault(); quizNext(); }
  }
});

try { setMode(localStorage.getItem('mode') === 'quiz' ? 'quiz' : 'flash'); } catch { setMode('flash'); }
restartBoth();
