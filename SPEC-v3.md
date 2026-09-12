# AccountingHub — Build Spec v3

Supersedes v2 for sections 2, 4, and 5. Chapter specs move to `chapters/chNN/BRIEF.md`.

Chapter 3's **content and numbers are correct** — verified against the live site. What
is wrong is the container.

---

## 1. Kill the scroll-stop model

The 17-stop scroll-snap page is the source of the "gaps" and most of the "hard to
understand." Two structural reasons:

1. **Forced viewport height, variable content.** A stop holding a two-line callout gets
   the same 100vh as one holding a 19-row trial balance. Short stops leave dead space;
   long ones overflow their snap point. That is where the gaps come from.
2. **Everything is still one page.** Scroll-snap changed how you move through the wall.
   It did not stop it being a wall. Seventeen of anything in a row is a wall.

Remove scroll-snap entirely. Remove the progress rail. They are being replaced, not
adjusted.

---

## 2. Modules

Clicking a chapter opens a **chapter home**, not content. Chapter home is a short
overview and a grid of six modules. Each module is its own route and its own screen.

```
/ch/3                 chapter home — overview + module grid
/ch/3/learn           guided walkthrough
/ch/3/lab             the instruments, standalone
/ch/3/practice        drills
/ch/3/recall          retrieval deck
/ch/3/notes           note taker for this chapter
/ch/3/reference       terms, formulas, entry patterns
```

### 2.1 Chapter home

- One paragraph, maximum 60 words, on what this chapter is actually about. Plain
  language. Not a textbook abstract.
- The chapter's headline number or idea, set large. For Chapter 3: _six entries at Dec
  31 turn a $45,300 trial balance into a $47,685 one._
- Six module cards. Each shows its name, a one-line description, and its own progress
  ("4 of 8 terms captured", "6 cards due", "not started").
- A "start here" affordance pointing at Learn for a first visit, at Recall on a return
  visit when cards are due.

### 2.2 Learn

The guided path. Normal vertical scroll, no snap, sections sized to their content.

- Broken into **lessons** — 4 to 7 per chapter, each one learning objective or a
  closely related pair. A lesson is a page, not a scroll section. Previous / next at
  the foot, and a lesson list in a slim sidebar.
- A lesson opens with the instrument or diagram that carries its idea, then the
  explanation beneath it. Never explanation first.
- Prose blocks: **maximum 150 words**, one idea, no subheadings inside a block. Longer
  treatments go behind "Go deeper."
- Term capture stays exactly as built — dotted underline, write your own meaning, book's
  definition revealed after. It works; leave it.

### 2.3 Lab

Every instrument in the chapter, on its own, with nothing else on screen. This is what
Richard means by "click a chapter and already see visuals."

- One instrument per screen with a thumbnail strip to switch between them.
- Above every instrument: **a one-line instruction in the imperative.** "Drag the period
  end across December." "Sell units and watch which layer drains." Never a legend
  without an instruction.
- Below it: what you should have noticed, in one or two sentences, revealed after you
  have interacted — not before.
- Every instrument has a "pin this state" control that writes the current numbers into
  notes.

### 2.4 Practice, Recall, Notes, Reference

- **Practice** — classification drills and the entry journalizer, with immediate
  feedback and a reason for every wrong answer.
- **Recall** — the retrieval deck as built. It is good. Box 1–5, localStorage,
  cross-chapter `/review` stays.
- **Notes** — this chapter's notes, grouped by lesson, editable, with the study-sheet
  and Markdown exports.
- **Reference** — a single dense screen: every term with the book definition, every
  formula, every journal entry pattern from the chapter. This is the pre-exam page and
  it is the one place density is correct.

---

## 3. Wording

The current prose is a competent textbook paraphrase. It should read like a good tutor
instead.

- **Lead with the concrete.** "FastForward paid $2,400 for two years of insurance on
  December 26. By December 31, one month is gone." Then the principle. Not the reverse.
- **One idea per paragraph. Three sentences is usually enough.**
- **Cut hedging and throat-clearing.** "It is worth noting that" and "as we have seen"
  never appear.
- **Name the trap explicitly** where one exists: "The credit does not go to Equipment."
- **Second person for instructions, third for accounting.** "Drag the marker" / "The
  entry moves cost out of the asset."
- **No sentence longer than 30 words in a Learn block.** Reference may run longer.

Rewrite every Chapter 3 prose block against these rules. The facts do not change.

---

## 4. Visual

Keep: ledger typography, tabular figures, single rule above a subtotal, double rule
under a final total, blue for debit-natured and brick for credit-natured, paper
background, serif headlines.

Fix:

- **Sections size to content.** No `100vh`, no `min-height` on content sections
  anywhere. Vertical rhythm between sections is a fixed 72–96px, not a viewport
  fraction.
- **Tables are the weakest thing on the page right now.** The adjusted trial balance is
  19 rows of undifferentiated grey. Give tables: zebra-free but grouped by element with
  a hairline between groups, right-aligned tabular figures with real column width, and
  the traced adjustment highlighted in place rather than by colour alone.
- **Instruments need frames, prose does not.** An instrument is a device: give it a
  quiet border, a caption above, a result line below. Prose gets space and nothing else.
- **One heading level per screen.** Currently a lesson can carry an LO label, an h2, an
  instrument label, and an h3. Cut to a label and one heading.
- **Contrast on the small text.** The LO labels and captions currently sit near the
  minimum. Take them up.
- Base 17px, line-height 1.65, 68ch prose measure, `prefers-reduced-motion` and
  `prefers-color-scheme` respected.

---

## 5. Seeing the site instead of the code

Claude Code has been grading its own work from screenshots it took itself and rarely
looking hard at them. Three changes:

1. **Contact sheet.** A `docs/screenshots/index.html` that lays every captured
   screenshot out in a grid with its route and viewport labelled, so Richard can scan
   the whole chapter in one page rather than opening files one at a time. Regenerate it
   as part of the capture script.
2. **Written verdict per screen.** The capture script writes
   `docs/screenshots/REVIEW.md` with one row per screenshot and an empty verdict
   column. Claude Code must fill in every row — what is on the screen, what is wrong —
   before calling a chapter done. An unfilled row fails the check. Forcing a written
   description is what stops "looks fine" from being the whole review.
3. **Claude in Chrome.** For Richard's own review, use the Claude Chrome extension on
   the live URL — it can see the rendered page directly and point at what is wrong,
   which is faster than describing it in text.

Also add a repo skill at `.claude/skills/visual-review/SKILL.md` that encodes 1 and 2,
so the workflow triggers automatically on any UI change rather than needing to be asked
for.

---

## 6. Chapter briefs

Each chapter gets a folder:

```
chapters/
  ch01/BRIEF.md
  ch02/BRIEF.md
  ...
  ch13/BRIEF.md
```

Build one chapter at a time, reading only that chapter's brief plus this spec. Ship it
live before starting the next.

Table of contents as confirmed against McGraw Hill: 1 Accounting in Business,
2 Business Transactions, 3 Adjusting Accounts, 4 Merchandising Operations,
5 Inventories and Cost of Sales, 6 Cash, Fraud and Internal Control, 7 Receivables,
8 Long-Term Assets, 9 Current Liabilities, 10 Long-Term Liabilities, 11 Equity,
12 Reporting Cash Flows, 13 Analysis of Financial Statements. There is no Investments
chapter. **Verify chapters 6 through 11 against Richard's actual copy before building
them** — only 12 and 13 were checked directly.

Still open: where closing entries, the post-closing trial balance, the classified
balance sheet, and the current ratio live. Check Chapter 3's and Chapter 4's objective
lists in Richard's book and report before building Chapter 4.

---

## 7. Order

1. **Chapter 3 rebuilt on the module model**, with the wording and visual passes. Ship
   and get sign-off. This is the template.
2. Chapter 2 — the double-entry machine.
3. Chapter 1.
4. Chapters 4 and 5.
5. Chapters 6–13 in order.

---

## 8. Done means

- Every figure derives from journal entries through the ledger model. Validation asserts
  the anchors and runs in CI.
- Every module route captured at 390, 768, 1440. Contact sheet regenerated. `REVIEW.md`
  filled in with a written verdict for every row.
- No section has a viewport-relative height.
- No Learn prose block exceeds 150 words.
- Every instrument has an imperative instruction above it.
- Keyboard reaches every control, focus visible, Lighthouse accessibility ≥ 95.
