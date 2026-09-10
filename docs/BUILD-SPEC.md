# AccountingHub — Build Spec v2

Wild, _Financial and Managerial Accounting_, 2025 release. Chapters 1–13.

This document supersedes the original brief for everything it covers. Chapter 3 is
already live and its **content is correct** — the numbers tie out and the writing is
good. What changes is how a chapter is paced, how recall is built, and how it looks.

---

## 1. What is wrong right now

Open `/ch/3` and scroll. You get, in one unbroken column:

- a hero instrument
- eight learning-objective sections of body prose
- four more instruments
- two drills
- a seven-question quiz
- a 23-term vocabulary audit

Nothing is wrong with any single piece. The failure is that they arrive all at once,
in a single scroll, with no pacing and no signal of progress. A student opening this
before class sees a wall and closes the tab.

Three specific failures:

1. **No sense of position.** You cannot tell how far in you are or how much is left.
2. **No pacing.** Prose, instrument, drill, prose, instrument all run together at the
   same visual weight, so nothing feels more or less important.
3. **Too much per screen.** At 1440px there are often three competing things in view.

---

## 2. The interaction redesign

### 2.1 A chapter is a paced sequence, not a page

Break each chapter into **stops** — roughly 8–14 per chapter, one learning objective
often being 1–3 stops. A stop occupies the viewport and holds _one_ idea: one
instrument, or one explanation, or one drill. Never two.

Navigation:

- Vertical scroll still works — do not build a slideshow that traps the keyboard.
  Scroll-snap between stops, so the page settles rather than landing mid-content.
- A **persistent progress rail** on the left edge: one tick per stop, grouped and
  labelled by learning objective, current stop filled. Click any tick to jump. This is
  the single biggest fix — it converts an unknown wall into a known distance.
- Keyboard: `↓`/`↑` or `J`/`K` move between stops. `Esc` closes any drawer.
- The rail collapses to a thin progress bar under 900px.

### 2.2 Sequence within a chapter

Every chapter opens on a **moving instrument**, before any prose. Chapter 3 already
does this correctly with the timeline — keep that pattern everywhere. The student
should see something happening within one second of the page loading, and should be
able to touch it before being asked to read anything.

Then alternate deliberately:

```
Instrument (hero)  →  the idea it just showed, in prose
Instrument         →  the idea it just showed, in prose
Drill              →  takeaway offered on completion
...
Retrieval          →  the recall pass (section 3)
Notes audit        →  what you never captured
```

Prose stops are short: 120–200 words, one idea, no subheadings inside a stop. If a
prose stop needs a subheading, it is two stops.

### 2.3 Progressive disclosure

Not everything belongs on the surface. Each stop may carry:

- **Go deeper** — an inline expander holding the textbook-depth treatment, exhibit
  citations, and edge cases. Collapsed by default.
- **Common mistake** — a single short callout, only where there is a genuinely
  high-frequency error. Do not put one on every stop; it stops meaning anything.

The 23-term vocabulary audit currently sits at the bottom as one long list. Split it:
terms surface _within_ the stop where they are taught (section 3.1), and the audit at
the end shows only what was missed.

---

## 3. Recall system

The site currently teaches well and tests once. There is nothing between reading and
the quiz. That gap is where retention is lost.

### 3.1 Term capture, in place

When a key term first appears in a stop, it is marked (a subtle underline, not a
button). Clicking it opens a small panel:

1. It asks **you** to write what it means, in your own words. Nothing is revealed yet.
2. After you submit, it shows the book's definition beside yours.
3. Both are saved to notes as a paired card.

If you skip a term, it stays uncaptured and shows up in the end-of-chapter audit. This
is already the right instinct in the current build — move it from a bottom-of-page list
to the moment the term is actually taught.

### 3.2 Retrieval cards

Not flashcards in the flip-a-card sense. Cards that make you _produce_ an answer.

Three card types, generated from chapter content, not authored separately:

| Type               | Prompt                                              | You produce                           |
| ------------------ | --------------------------------------------------- | ------------------------------------- |
| **Term**           | "Contra account"                                    | Your definition, then compare         |
| **Classification** | "Employees worked Dec 29–31, payday Jan 9"          | Which of the four adjustment types    |
| **Entry**          | "One month of a $2,400 24-month policy has expired" | Debit account, credit account, amount |

The **entry card is the most valuable one in the product** and should be treated as
the flagship. The journal-entry drill already built for Chapter 3 is exactly right —
account dropdowns, amount field, check. Generalize that component and reuse it in
every chapter. It is the thing that most directly rehearses what an exam asks for.

Scheduling: a lightweight spaced repetition. Each card carries a box level 1–5; a
correct answer promotes it, a wrong answer resets it to 1. Due dates are
1/2/4/8/16 days. All of it in localStorage. Do not build accounts or a server for
this.

A `/review` route pulls due cards across all chapters the student has visited. The
chapter index shows a small "N cards due" badge.

### 3.3 Mnemonics

Give mnemonics a real home — a small dedicated stop in the chapter where they apply,
and a card in the retrieval deck.

**The rule, stated exactly.** Debits increase **expenses, assets, and dividends**.
Credits increase **liabilities, equity, and revenue**. This is the version the site
teaches, verbatim, everywhere it appears.

**The memory devices.**

- **CLOR** — _Credits: Liabilities, Owner's equity, Revenue._ A clean acronym. Every
  letter decodes and the coverage is complete.
- **DEBT** — a sound-alike cue for _debit_, carrying **E**xpenses, **A**ssets,
  **D**ividends. Note that DEBT is not itself an acronym for those three accounts; the
  B and T do not expand. It works as a hook for the word "debit," not as a decodable
  list, so the three accounts must be printed beside it every single time it appears.
  Never show DEBT alone and expect the student to unpack it.
- **DEAD** — the strict acronym alternative, if a decodable pair is preferred:
  **E**xpenses, **A**ssets, **D**ividends, with the leading D for debits. Pairs
  structurally with CLOR, where the leading C is for credits.

Ship DEBT / CLOR as the default, since that is the pairing Richard already says aloud,
and a mnemonic you actually reach for beats a tidier one you do not. Offer DEAD as a
toggle in the mnemonic stop for anyone who wants the letters to decode.

Whichever is shown, the underlying logic sits directly beneath it, because the logic is
what survives when the acronym is forgotten:

> Anything that pushes equity **up** is a credit — revenue, common stock. Anything that
> pulls it **down** is a debit — expenses, dividends. Assets are the mirror image.

The retrieval deck tests the rule, never the acronym. A card asks "which side increases
dividends," not "what does the D stand for." The mnemonic is scaffolding for recall, not
a thing to be recalled.

Other mnemonics worth a stop:

| Chapter | Device                                                                                   | For                            |
| ------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| 3       | Deferral = cash **first**, accrual = cash **later**                                      | The 2×2 framework              |
| 4       | "Two entries per sale"                                                                   | Revenue at price, COGS at cost |
| 4       | 2/10, n/30 read aloud as "2 percent off inside 10 days, all of it due in 30"             | Discount terms                 |
| 5       | Rising costs: FIFO → higher income, LIFO → lower tax                                     | Method effects                 |
| 8       | Same total, different timing                                                             | All depreciation methods       |
| 13      | Add back non-cash, subtract investing gains; asset up used cash, liability up saved cash | Indirect method                |

---

## 4. Visual direction

Richard's reference is Apple. What that actually means in practice, translated into
rules this project can be held to:

### 4.1 What to take from it

- **One thing per view, with room around it.** Apple pages breathe. Vertical rhythm
  between stops should be generous — think 120–180px of separation, not 40px.
- **Type carries the hierarchy, not boxes.** A stop's headline should be large and
  quiet. Stop wrapping every block in a bordered card; most stops need no container at
  all, just space.
- **Restrained colour.** Colour means something here: blue is debit-natured, brick is
  credit-natured. Everything else is ink on paper. No decorative accents.
- **Motion answers an action.** When the student drags the timeline, things move.
  Nothing animates on scroll for its own sake.
- **Large, calm numbers.** Financial figures are the content. Set them large, tabular,
  with space, the way Apple sets a spec number.

### 4.2 What not to do

- Do not adopt Apple's dark hero sections, product-photo layouts, or centred marketing
  copy. This is a study tool that will be read for an hour at a time.
- Keep the ledger typography already established: tabular figures, single rule above a
  subtotal, double rule under a final total, debit left and credit right. This is the
  visual language of the subject and it is what stops the site looking generic.
- No gradient washes, no identical rounded cards for every block, no arrows appended to
  button labels.

### 4.3 Concretely

- Reduce the number of bordered containers by roughly half. Reserve borders for things
  that genuinely are documents — journals, ledgers, trial balances, statements.
- Raise the base body size to 16–17px and line-height to ~1.65.
- Maximum line length 68 characters for prose.
- One accent colour for interactive affordances. Everything else is ink, rule, paper.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.

---

## 5. Notes — refinements

The existing model is right. Three changes:

1. **Note anchors persist.** A note remembers which stop it came from and links back.
   The notes view groups by chapter, then by learning objective.
2. **Instrument state notes carry the number.** "FIFO at 300 units sold: COGS 3,500,
   ending inventory 2,900" — not "FIFO note."
3. **Export gains a study-sheet format** alongside raw Markdown: terms as a two-column
   table, entries as journal blocks, one page per chapter. This is what gets printed
   the night before an exam.

---

## 6. Chapter specs

> **Verify the table of contents first.** The chapter list below comes from Richard's
> own earlier hub file. It runs 3 Adjusting → 4 Merchandising, with **no separate
> chapter for completing the accounting cycle** — closing entries, the post-closing
> trial balance, the classified balance sheet, and the current ratio. Those are heavily
> tested and must live somewhere. Before building Chapter 4, check the actual table of
> contents and tell Richard what it says. If the edition has a distinct cycle chapter,
> the numbering below shifts by one from Chapter 4 onward.

Each chapter needs: a hero instrument, 1–3 secondary instruments, one classification
drill, one entry drill, a retrieval deck, and a quiz. Data must reconcile.

### Ch 1 · Accounting in Business

- **Hero** — Equation ripple: apply a transaction, watch A/L/E segments resize and the
  four statements populate underneath.
- **Secondary** — Statement linkage explorer (net income → retained earnings →
  balance sheet); business-form comparison that changes liability exposure and taxation
  as you switch.
- **Entry drill** — six starter transactions.
- **Recall** — return on assets; the four statements and their order; the fraud triangle.

### Ch 2 · Accounting for Business Transactions

- **Hero** — The double-entry machine. Sixteen FastForward transactions, four steps per
  entry (identify / analyze / journalize / post), live equation bars, ledger building
  account by account, running trial balance. This component already exists in prototype
  form and Richard has called it out as the best thing in the project. Build it first
  and build it well.
- **Secondary** — Live T-account trainer (post a debit to a credit-normal account and be
  told the balance went down); chart-of-accounts filter and drill.
- **Recall** — the debit/credit mnemonic (section 3.3); chart-of-accounts number ranges;
  what a balanced trial balance still fails to prove.
- **Anchors** — trial balance 45,300 = 45,300; assets 41,800 = liabilities 9,200 +
  equity 32,600.

### Ch 3 · Adjusting Accounts — **built**

Apply the redesign, do not rebuild the content. Anchors: unadjusted 45,300, adjusted
47,685, net income 3,785, balance sheet 42,745.

### Ch 4 · Merchandising Operations

- **Hero** — Merchandise flow: goods move purchase → inventory → sale, and each sale
  fires **two** entries (revenue at price, COGS at cost). Make the two-entry pairing the
  visual point.
- **Secondary** — Discount decision calculator: 2/10 n/30 shown as an implied annual
  rate, so paying early is visibly worth it; multi-step vs single-step income statement
  toggle on the same data.
- **Recall** — two entries per sale; FOB shipping point vs destination (who owns goods
  in transit); gross margin ratio; acid-test ratio.

### Ch 5 · Inventories and Cost of Sales

- **Hero** — Cost-flow layers. Purchase layers as stacked blocks; a sales slider drains
  FIFO from the bottom, LIFO from the top, and weighted average dissolves the layers
  into one pool. Three income statements side by side, live. Prototype exists.
- **Secondary** — Inventory-error propagation: an error in ending inventory this year
  reverses next year — show both years and both income statements at once.
- **Recall** — rising costs → FIFO higher income, LIFO lower tax; lower of cost or
  market; inventory turnover and days' sales in inventory.

### Ch 6 · Cash, Fraud, and Internal Control

- **Hero** — Bank reconciliation as a two-column instrument: bank side and book side,
  items dragged to the correct side, the two balances converging. Only the book side
  generates entries — make that the teaching point.
- **Secondary** — Control-principle diagnostic: describe a scenario, identify which
  principle was violated; petty cash cycle.
- **Recall** — the fraud triangle; which reconciling items require journal entries;
  days' sales uncollected.

### Ch 7 · Receivables

- **Hero** — Aging schedule: shift receivables between age buckets and watch the
  required allowance and bad debt expense recompute.
- **Secondary** — Percent-of-sales vs percent-of-receivables side by side on the same
  data, showing why one adjusts to a balance and the other adds to it; note maturity
  and interest calculator.
- **Recall** — allowance is a contra asset; write-offs never touch expense; accounts
  receivable turnover.

### Ch 8 · Long-Term Assets

- **Hero** — Depreciation curves: straight-line, double-declining, units of production
  plotted together, with a toggle between book value and annual expense. The crossover
  is the lesson. Prototype exists.
- **Secondary** — Capital vs revenue expenditure sorter; disposal calculator producing
  gain or loss from book value versus proceeds.
- **Recall** — same total, different timing; total asset turnover; natural resources
  and intangibles.

### Ch 9 · Current Liabilities

- **Hero** — Payroll waterfall: gross pay stepping down through each withholding to net
  pay, with the employer's matching cost shown as a separate parallel bar. Most students
  never see that the employer cost is a second, separate number.
- **Secondary** — Known / estimated / contingent classifier; warranty liability accrual.
- **Recall** — FICA is matched by the employer, FUTA and SUTA are not withheld;
  probable and estimable versus disclose only; times interest earned.

### Ch 10 · Long-Term Liabilities

- **Hero** — Bond pricing and amortization: move the market rate against the contract
  rate and watch issue price cross par, then the carrying value curve walk to par over
  the term. Straight-line and effective-interest side by side.
- **Secondary** — Instalment note amortization table with interest and principal split
  per payment.
- **Recall** — market above contract → discount, below → premium; discount amortization
  increases interest expense; debt-to-equity.

### Ch 11 · Equity

- **Hero** — Equity composition: issue stock, declare a dividend, buy treasury shares,
  split — each action visibly moving the equity section components and total.
- **Secondary** — Dividend allocator for cumulative preferred with arrears; stock split
  vs stock dividend shown to leave total equity unchanged.
- **Recall** — treasury stock is contra equity; par vs no-par; dividend dates; book
  value per share; EPS.
- **Include the statement of stockholders' equity** — commonly skipped, commonly tested.

### Ch 12 · Investments

- **Hero** — Classification decision tree: ownership percentage and intent routing an
  investment to trading, available-for-sale, held-to-maturity, equity method, or
  consolidation, with the fair-value treatment shown at the leaf.
- **Secondary** — Fair value through net income vs through OCI on the same security;
  equity method walkthrough.
- **Recall** — trading → net income, AFS → OCI; 20–50% → equity method; components of
  comprehensive income.

### Ch 13 · Statement of Cash Flows

- **Hero** — Indirect-method waterfall: net income walking to operating cash flow, each
  reconciling item a toggleable step. Prototype exists.
- **Secondary** — Operating / investing / financing classifier; direct vs indirect on
  the same data showing identical operating totals.
- **Recall** — add back non-cash, subtract investing gains; asset up used cash,
  liability up saved cash; free cash flow.

---

## 7. Build order

1. **Redesign pass on Chapter 3.** Apply sections 2–5 to the chapter that already
   exists. Ship it and get sign-off before touching anything else — this is the
   template every other chapter inherits.
2. **Chapter 2.** The double-entry machine. Named as the best thing in the project.
3. **Chapter 1.** Completes the foundation.
4. **Chapters 4, 5.** Merchandising and inventory, where the cost-flow prototype lands.
5. **Chapters 6–13**, in order.

Ship each chapter live before starting the next. No batching.

---

## 8. Acceptance criteria, per chapter

- Every figure derives from journal entries through the ledger model. No hardcoded
  totals. Validation script asserts the anchors and runs in CI.
- Playwright renders every stop at 390, 768, and 1440px, drives every instrument and
  drill, and the screenshots are reviewed by eye before the chapter is called done.
- Keyboard reaches every control. Focus is visible. `prefers-reduced-motion` respected.
- No stop holds two competing ideas.
- Lighthouse accessibility ≥ 95.
- The chapter can be completed start to finish in 25–40 minutes.
