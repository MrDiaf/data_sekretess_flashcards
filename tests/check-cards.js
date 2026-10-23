// Sanity checks for assets/cards.js: run with `make test` (or `node tests/check-cards.js`).
const path = require('path');
const { TOPICS, CARDS } = require(path.join(__dirname, '..', 'assets', 'cards.js'));

const errors = [];
const ids = new Set();

for (const c of CARDS) {
  const where = `card ${c.id}`;
  if (ids.has(c.id)) errors.push(`${where}: duplicate id`);
  ids.add(c.id);
  if (!TOPICS[c.topic]) errors.push(`${where}: unknown topic "${c.topic}"`);
  for (const field of ['q', 'a', 'correct']) {
    if (typeof c[field] !== 'string' || !c[field].trim()) errors.push(`${where}: missing ${field}`);
  }
  if (!Array.isArray(c.wrong) || c.wrong.length !== 3) errors.push(`${where}: needs exactly 3 wrong options`);
  const options = [c.correct, ...(c.wrong || [])];
  if (new Set(options).size !== options.length) errors.push(`${where}: options are not unique`);
  // unbalanced $ would leave raw LaTeX on the page
  for (const field of ['q', 'a']) {
    const dollars = (c[field].replace(/\$\$/g, '').match(/\$/g) || []).length;
    if (dollars % 2) errors.push(`${where}: unbalanced $ in ${field}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`cards ok: ${CARDS.length} cards`);
