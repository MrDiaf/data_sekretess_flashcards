# Data Privacy Trainer

A small static study site for the data privacy course questions in `answer.md` (source questions: `questionsDP.pdf`).

It has two modes over the same 57 questions:

- **Flashcards** — read the question, reveal the answer, mark it *Again* (comes back a few cards later) or *Got it*.
- **Multiple choice** — the same question with four options. The wrong options are deliberate near-misses (swapped identity/attribute, database/query, Boolean/quantitative, off-by-one bounds, reversed ratios…), so you need to actually know the answer. After answering you can open the full answer.

Both modes can be filtered by topic and shuffled.

## Prerequisites

- PHP (preferred, mirrors the web server) **or** python3, for the local server.
- Node.js, only for `make test`.

## Usage

```bash
make up      # start local server
```

Open http://127.0.0.1:8080/

```bash
make down    # stop it
make help    # list all commands
make test    # validate card data and syntax
```

Keyboard shortcuts:

| Mode | Keys |
|---|---|
| Flashcards | `Space` reveal · `←` again · `→` got it |
| Multiple choice | `1`–`4` choose · `Enter` next |

## Editing cards

All content lives in `assets/cards.js`. Each card has a Markdown question `q` and answer `a` (with `$…$` / `$$…$$` LaTeX), plus one `correct` option and three `wrong` options for multiple choice. Run `make test` after editing.

`answer.md` is the original notes; the site does not read it at runtime.

## Deployment

The site is plain static files (no build step), meant for `people.cs.umu.se`:

```bash
rsync -av --delete --exclude .git --exclude .runtime ./ <cs-username>@itchy.cs.umu.se:public_html/<project>/
```

Then open `https://people.cs.umu.se/<cs-username>/<project>/`. `.htaccess` blocks the README, Makefile, router and `tests/`. Markdown and math rendering load `marked` and `KaTeX` from jsDelivr.
