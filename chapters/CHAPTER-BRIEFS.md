# AccountingHub — Chapter Briefs

Wild, _Financial and Managerial Accounting_, 2025 release. Chapters 1–13.

Read with `SPEC-v3.md`. That spec owns the container (modules, Learn/Lab/Practice/Recall/
Notes/Reference), the wording rules, and the visual rules. These briefs own the
**content** of each chapter. This file is the master; `chapters/chNN/BRIEF.md` are split
from it. Edit here, then run `node scripts/split-briefs.mjs`.

## How to read a brief

Every brief has the same sections, in this order:

1. **Home** — the one-line description for the chapter home card, and the headline
   number or idea set large (SPEC-v3 §2.1).
2. **Hero instrument** — its name, the imperative instruction printed above it, what it
   does, the result line printed below it, and what the student should have noticed
   (revealed only after interaction, SPEC-v3 §2.3).
3. **Secondary instruments** — one or two, same shape.
4. **Entry drill** — the journal entries Practice and the Recall deck are built from.
5. **Classification drill** — categories, then items with the answer and the reason.
6. **Key terms** — term names only. The definition shown after capture is the book's
   glossary wording, taken from Richard's copy. Do not paraphrase it.
7. **Recall** — rules and formulas, each formula with a worked number.
8. **Common mistakes** — the traps, named explicitly.
9. **Anchors** — numbers the ledger model must reproduce. Validation asserts them in CI.

## Where every number comes from

Every figure carries one of four tags. Nothing untagged is a number.

| Tag        | Meaning                                                                                                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[ledger]` | Derived from the FastForward entries in `src/lib/content/chapters/fastforward.ts`. Chapter 3's are already asserted in CI.                                                                                                                    |
| `[book]`   | Wild's own figures, confirmed against the book's exhibit as reproduced outside the book — a lecture deck or a quoted problem. Build on these; one glance at Richard's copy is still worth it.                                                 |
| `[book?]`  | Wild's example reconstructed without the book open and not yet confirmed anywhere. **Check it against Richard's copy before building the chapter.** If the book differs, the book wins: change the data, re-run validation, update this file. |
| `[built]`  | Built for the site. Internally consistent, recomputed, but not Wild's. Never present it as the book's example. Invented company names are fine; Wild's company names are not used for built numbers.                                          |

## Rules that apply to every chapter

- **The debit/credit rule, verbatim, everywhere:** Debits increase expenses, assets, and
  dividends. Credits increase liabilities, equity, and revenue.
- **The mnemonic is DEBT / CLOR.** DEBT is a sound-alike hook for "debit," not an
  acronym — the B and T do not expand. Print its three accounts beside it every single
  time: **DEBT — Expenses, Assets, Dividends.** CLOR decodes fully: **C**redits,
  **L**iabilities, **O**wner's equity, **R**evenue. Beneath either, the logic: anything
  that pushes equity up is a credit; anything that pulls it down is a debit; assets are
  the mirror image. Recall cards test the rule, never the letters.
- **Instruments:** every one has an imperative instruction above it and a result line
  below it. The "what you should have noticed" line stays hidden until the student has
  touched the instrument.
- **Entry drills** use the generalized journalizer already built for Chapter 3 (account
  dropdowns, amount, check). Every wrong answer gets a reason.
- **Interest** uses a 360-day year unless the book says otherwise for that example
  `[book?]`.

---

# Chapter 01 · Accounting in Business

## Home

**One line:** What accounting is for, who relies on it, and the one equation every
transaction has to keep in balance.

**Headline:** After ten transactions, FastForward's **$40,400 of assets = $6,200 of
liabilities + $34,200 of equity.** `[ledger]`

## Hero instrument — Equation balance

**Instruction:** "Apply FastForward's first ten transactions one at a time and keep both
sides of the equation equal."

- Three bars: Assets, Liabilities, Equity. Equity is split into its expanded parts —
  common stock, revenues, expenses, dividends — so the student sees expenses and
  dividends pull equity down.
- Each transaction shows its source line ("Paid $1,000 rent and $700 salary") and moves
  exactly the bars it touches. No debits or credits yet; that is Chapter 2.
- After transaction 10, the four statements fill in underneath, in order.
- Same events as Chapter 2's entries 1–11. Chapter 1 shows rent and salary as one
  transaction; Chapter 2 splits them. Reuse the ledger model, do not build a second one.

**Result line:** Assets 40,400 = Liabilities 6,200 + Equity 34,200

**Noticed:** "Buying supplies with cash changed nothing on the right side. Paying rent
did — expenses come out of equity."

## Secondary instruments

### Statement chain

**Instruction:** "Change December's rent and follow it from the income statement to the
balance sheet."

- Income statement → statement of retained earnings → balance sheet → statement of cash
  flows, linked by highlighted lines: net income, ending retained earnings, cash.
- Rent at $1,500 instead of $1,000: net income 3,900, ending retained earnings 3,700,
  cash 4,300, total assets 39,900 = 6,200 + 33,700. `[built]` on the `[ledger]` data.

**Result line:** Net income 4,400 → Retained earnings 4,200 → Equity 34,200

**Noticed:** "One number changed, and it moved through all four statements. That is why
they are prepared in this order."

### Business form switcher

**Instruction:** "Switch the business form and watch owner liability and taxation change."

- Sole proprietorship, partnership, LLC, S corporation, corporation.
- Three rows per form: owner liability (limited or unlimited), business taxed separately
  (yes or no), ownership easily transferred (yes or no). Values from the book's exhibit
  `[book?]`.

**Result line:** Corporation — limited liability · taxed as a business · shares transfer freely

**Noticed:** "Only the corporation pays tax as a business, which is why its owners can be
taxed twice."

## Entry drill

Equation form. The student produces the accounts affected and the direction and amount of
each. `[ledger]`

| #   | Transaction                                                   | Effect                                       |
| --- | ------------------------------------------------------------- | -------------------------------------------- |
| 1   | Chas Taylor invests $30,000 cash in exchange for common stock | Cash +30,000 · Common stock +30,000          |
| 2   | Buys supplies for $2,500 cash                                 | Supplies +2,500 · Cash −2,500                |
| 3   | Buys equipment for $26,000 cash                               | Equipment +26,000 · Cash −26,000             |
| 4   | Buys $7,100 of supplies on credit                             | Supplies +7,100 · Accounts payable +7,100    |
| 5   | Provides consulting services for $4,200 cash                  | Cash +4,200 · Revenues +4,200                |
| 6   | Pays $1,000 rent and $700 salary                              | Cash −1,700 · Expenses +1,700 (equity down)  |
| 7   | Provides $1,600 of consulting and $300 of rental on credit    | Accounts receivable +1,900 · Revenues +1,900 |
| 8   | Collects $1,900 from the client in transaction 7              | Cash +1,900 · Accounts receivable −1,900     |
| 9   | Pays $900 of the account payable                              | Cash −900 · Accounts payable −900            |
| 10  | Pays a $200 cash dividend                                     | Cash −200 · Dividends +200 (equity down)     |

## Classification drill

**Categories:** Asset · Liability · Common stock · Revenue · Expense · Dividends

| Item                                                  | Answer       | Why                                                                      |
| ----------------------------------------------------- | ------------ | ------------------------------------------------------------------------ |
| Supplies bought for future use                        | Asset        | A resource the business owns and will use later.                         |
| Amount owed to a supplier for those supplies          | Liability    | An obligation to pay in the future.                                      |
| Cash the owner put in for shares                      | Common stock | Owner investment is equity, not revenue.                                 |
| Fees earned for consulting, not yet collected         | Revenue      | Earned when the work is done, whether or not cash has arrived.           |
| December rent paid                                    | Expense      | Used up this period to earn revenue.                                     |
| Cash paid to the owner as a return on investment      | Dividends    | Reduces equity, but it is not an expense of running the business.        |
| Equipment                                             | Asset        | A resource that will provide benefits for years.                         |
| Salary earned by an employee and paid today           | Expense      | A cost of earning this period's revenue.                                 |
| Consulting fees paid in cash the day the work is done | Revenue      | Earned and collected at once. The cash is the asset; the fee is revenue. |

## Key terms

Accounting · Recordkeeping (bookkeeping) · Financial accounting · Managerial accounting ·
External users · Internal users · Ethics · Fraud triangle · Generally accepted
accounting principles (GAAP) · Financial Accounting Standards Board (FASB) · Securities
and Exchange Commission (SEC) · International Accounting Standards Board (IASB) ·
International Financial Reporting Standards (IFRS) · Conceptual framework · Measurement
(cost) principle · Revenue recognition principle · Expense recognition principle · Full
disclosure principle · Going-concern assumption · Monetary unit assumption · Time period
assumption · Business entity assumption · Materiality constraint · Benefit exceeds cost
constraint · Sole proprietorship · Partnership · Corporation · Assets · Liabilities ·
Equity · Common stock · Dividends · Revenues · Expenses · Accounting equation · Expanded
accounting equation · Net income · Net loss · Income statement · Statement of retained
earnings · Balance sheet · Statement of cash flows · Return on assets

## Recall

**Rules**

- The four statements, in the order they are prepared: income statement → statement of
  retained earnings → balance sheet → statement of cash flows.
- Fraud triangle: opportunity, pressure, rationalization.
- Principles: measurement, revenue recognition, expense recognition, full disclosure.
  Assumptions: going concern, monetary unit, time period, business entity. Constraints:
  materiality, benefit exceeds cost. `[book?]` — confirm the book's grouping.
- A transaction always keeps the equation in balance. It can move two assets and touch
  nothing on the right side.

**Formulas**

| Formula                                                                         | Worked                                               |
| ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Assets = Liabilities + Equity                                                   | 40,400 = 6,200 + 34,200 `[ledger]`                   |
| Assets = Liabilities + Common stock − Dividends + Revenues − Expenses           | 40,400 = 6,200 + 30,000 − 200 + 6,100 − 1,700        |
| Net income = Revenues − Expenses                                                | 6,100 − 1,700 = 4,400 `[ledger]`                     |
| Ending retained earnings = Beginning retained earnings + Net income − Dividends | 0 + 4,400 − 200 = 4,200 `[ledger]`                   |
| Return on assets = Net income ÷ Average total assets                            | 20,000 ÷ ((180,000 + 220,000) ÷ 2) = 10.0% `[built]` |

## Common mistakes

- **Dividends are not an expense.** They reduce equity, but they never appear on the
  income statement.
- **Revenue does not wait for cash.** Transaction 7 is revenue on the day the work is
  done, with no cash moving.
- **Collecting a receivable is not revenue.** Transaction 8 only swaps one asset for
  another. Counting it again doubles revenue.
- **Buying supplies on credit is not an expense.** It is an asset and a liability.
- **Return on assets uses average assets,** not the year-end figure.
- **The owner's personal spending is not the business's.** Business entity assumption.

## Anchors

| Figure                                   | Value    | Source                                    |
| ---------------------------------------- | -------- | ----------------------------------------- |
| Cash                                     | 4,800    | `[ledger]`                                |
| Supplies                                 | 9,600    | `[ledger]`                                |
| Equipment                                | 26,000   | `[ledger]`                                |
| Total assets                             | 40,400   | `[ledger]`                                |
| Accounts payable (total liabilities)     | 6,200    | `[ledger]`                                |
| Total equity                             | 34,200   | `[ledger]`                                |
| Revenues (consulting 5,800 + rental 300) | 6,100    | `[ledger]`                                |
| Expenses (rent 1,000 + salaries 700)     | 1,700    | `[ledger]`                                |
| Net income                               | 4,400    | `[ledger]`                                |
| Ending retained earnings                 | 4,200    | `[ledger]`                                |
| Net cash from operating activities       | 1,000    | `[ledger]`, line classification `[book?]` |
| Net cash used by investing activities    | (26,000) | `[ledger]`                                |
| Net cash from financing activities       | 29,800   | `[ledger]`                                |
| Net increase in cash                     | 4,800    | `[ledger]`                                |

All Chapter 1 anchors are Chapter 2's entries 1–11 run through the ledger. Confirm they
match the book's Chapter 1 statements `[book?]`.

---

# Chapter 02 · Business Transactions

## Home

**One line:** Every transaction is recorded twice — a debit and a credit — and sixteen
FastForward entries show why the books stay in balance.

**Headline:** Sixteen entries. **Debits $45,300 = Credits $45,300.** `[ledger]`

> **Settled: the totals are 42,470 and 33,270.** A Wild lecture deck reproduces
> FastForward's December 31 trial balance account by account — Cash 4,350, Supplies 9,720,
> Prepaid insurance 2,400, Equipment 26,000, Accounts payable 6,200, Unearned consulting
> revenue 3,000, owner capital 30,000, dividends (owner withdrawals in that edition) 200,
> Consulting revenue 5,800, Rental revenue 300, Salaries expense 1,400, Rent expense 1,000,
> Utilities expense 230, totals 45,300 = 45,300 — and it matches `fastforward.ts` line for
> line. Those balances give **assets 42,470 = liabilities 9,200 + equity 33,270**, net
> income 3,470. The figure of 41,800 = 9,200 + 32,600 does not come out of the sixteen
> entries, and Chapter 3's CI-verified anchors (47,685, net income 3,785, assets 42,745)
> only tie to 42,470 and 33,270. The deck is an older edition built on a sole
> proprietorship, so the equity accounts carry different names; every amount is identical.

## Hero instrument — Double-entry machine

**Instruction:** "Push each transaction through the four steps and watch debits and
credits stay equal."

- Sixteen FastForward transactions from `decemberTransactions`, in order.
- Four steps per entry: **identify** (the source document and the event), **analyze**
  (which accounts, which elements, up or down), **journalize** (debit and credit lines),
  **post** (the amounts land in the ledger).
- Live equation bars: Assets, Liabilities, Equity, updating as each entry posts.
- The ledger builds account by account. An account appears the first time an entry uses
  it — Cash on entry 1, Rental revenue on entry 8.
- A running trial balance under the ledger, debit and credit totals always visible.
- On the journalize step, the rule sits beside the columns: **DEBT — Expenses, Assets,
  Dividends** over the debit column; **CLOR — Credits: Liabilities, Owner's equity,
  Revenue** over the credit column.
- Entry 8 is the compound entry (one debit, two credits). Entry 12 is the trap: the
  credit goes to a liability named "revenue."

**Result line:** Trial balance — Debits 45,300 = Credits 45,300

**Noticed:** "The totals never drifted apart, because every entry added the same amount
to both sides. Entry 9 changed two accounts and left total assets exactly where they
were."

## Secondary instruments

### T-account trainer

**Instruction:** "Post the amount to either side of the account and say whether its
balance went up or down."

- One T-account at a time, with its normal balance side marked after the answer, not
  before.
- Posting a debit to a credit-normal account must say, in words, that the balance went
  down: "Accounts payable 7,100 − 900 = 6,200 credit."
- Accounts cycle through every element, including the contra-equity Dividends.

**Result line:** Accounts payable — 6,200 credit balance

**Noticed:** "Debit means left, not decrease. Whether left raises the balance depends on
the account."

### Trial balance error finder

**Instruction:** "Plant an error in December's books and see whether the trial balance
catches it."

| Planted error                                            | Trial balance    | Caught?                             |
| -------------------------------------------------------- | ---------------- | ----------------------------------- |
| Entry 12 never recorded                                  | 42,300 = 42,300  | No                                  |
| Entry 5 recorded twice                                   | 49,500 = 49,500  | No                                  |
| Rent in entry 6 debited to Salaries expense              | 45,300 = 45,300  | No                                  |
| Utilities posted as 320 instead of 230 (debit side only) | 45,390 vs 45,300 | Yes — difference 90, divisible by 9 |
| Entry 10: debit posted, credit to Cash never posted      | 46,200 vs 45,300 | Yes — difference 900                |

All figures `[ledger]` with the planted change.

**Result line:** Difference 90 — divisible by 9, look for a transposition

**Noticed:** "Three of five errors left the trial balance perfectly even. Equal totals
prove the debits match the credits, not that the books are right."

## Entry drill

All sixteen, from `decemberTransactions`. `[ledger]`

| #   | Date   | Transaction                                        | Debit                     | Credit                                        |
| --- | ------ | -------------------------------------------------- | ------------------------- | --------------------------------------------- |
| 1   | Dec 1  | Owner invests cash for common stock                | Cash 30,000               | Common stock 30,000                           |
| 2   | Dec 2  | Buys supplies for cash                             | Supplies 2,500            | Cash 2,500                                    |
| 3   | Dec 3  | Buys equipment for cash                            | Equipment 26,000          | Cash 26,000                                   |
| 4   | Dec 4  | Buys supplies on credit                            | Supplies 7,100            | Accounts payable 7,100                        |
| 5   | Dec 5  | Consulting services for cash                       | Cash 4,200                | Consulting revenue 4,200                      |
| 6   | Dec 6  | Pays December rent                                 | Rent expense 1,000        | Cash 1,000                                    |
| 7   | Dec 12 | Pays employee salary                               | Salaries expense 700      | Cash 700                                      |
| 8   | Dec 15 | Consulting and facility rental on credit           | Accounts receivable 1,900 | Consulting revenue 1,600 · Rental revenue 300 |
| 9   | Dec 22 | Collects on account                                | Cash 1,900                | Accounts receivable 1,900                     |
| 10  | Dec 24 | Pays part of the account payable                   | Accounts payable 900      | Cash 900                                      |
| 11  | Dec 24 | Pays cash dividend                                 | Dividends 200             | Cash 200                                      |
| 12  | Dec 26 | Receives cash in advance for 60 days of consulting | Cash 3,000                | Unearned consulting revenue 3,000             |
| 13  | Dec 26 | Pays for a 24-month insurance policy               | Prepaid insurance 2,400   | Cash 2,400                                    |
| 14  | Dec 26 | Buys supplies for cash                             | Supplies 120              | Cash 120                                      |
| 15  | Dec 26 | Pays employee salary                               | Salaries expense 700      | Cash 700                                      |
| 16  | Dec 26 | Pays utilities                                     | Utilities expense 230     | Cash 230                                      |

## Classification drill

**Categories:** Debit-normal · Credit-normal

| Account                     | Answer        | Why                                                              |
| --------------------------- | ------------- | ---------------------------------------------------------------- |
| Cash                        | Debit-normal  | Asset. DEBT — Expenses, Assets, Dividends.                       |
| Accounts receivable         | Debit-normal  | Asset.                                                           |
| Prepaid insurance           | Debit-normal  | Asset — insurance paid for and not yet used.                     |
| Equipment                   | Debit-normal  | Asset.                                                           |
| Accounts payable            | Credit-normal | Liability. CLOR — Credits: Liabilities, Owner's equity, Revenue. |
| Unearned consulting revenue | Credit-normal | Liability, despite the name. FastForward owes the work.          |
| Common stock                | Credit-normal | Owner's equity. It pushes equity up.                             |
| Dividends                   | Debit-normal  | Pulls equity down, so it grows on the debit side.                |
| Consulting revenue          | Credit-normal | Revenue pushes equity up.                                        |
| Rental revenue              | Credit-normal | Revenue.                                                         |
| Salaries expense            | Debit-normal  | Expense pulls equity down.                                       |
| Utilities expense           | Debit-normal  | Expense.                                                         |

## Key terms

Account · Account balance · Source documents · Chart of accounts · Ledger (general
ledger) · T-account · Debit · Credit · Double-entry accounting · Normal balance ·
Journal (general journal) · Journalizing · Posting · Posting reference (PR) column ·
Balance column account · Compound journal entry · Trial balance · Accounts receivable ·
Note receivable · Prepaid accounts · Supplies · Equipment · Land · Accounts payable ·
Note payable · Unearned revenue · Accrued liabilities · Common stock · Dividends ·
Retained earnings · Revenues · Expenses · Debt ratio

## Recall

**Rules**

- Debits increase expenses, assets, and dividends. Credits increase liabilities, equity,
  and revenue.
- **DEBT — Expenses, Assets, Dividends.** **CLOR — Credits: Liabilities, Owner's equity,
  Revenue.** Anything that pushes equity up is a credit; anything that pulls it down is
  a debit; assets are the mirror image.
- The four steps: identify, analyze, journalize, post.
- Chart of accounts numbering: 101–199 assets, 201–299 liabilities, 301–399 equity,
  401–499 revenues, 501–699 expenses. `[book?]` — FastForward's accounts fit it.
- A balanced trial balance does **not** catch: an entry never recorded, an entry recorded
  twice, the right amount in the wrong account on the same side, or two errors that
  cancel.
- A trial balance difference divisible by 9 points to a transposition (230 → 320) or a
  slide (230 → 2,300).

**Formulas**

| Formula                                             | Worked                                           |
| --------------------------------------------------- | ------------------------------------------------ |
| Account balance = Total increases − Total decreases | Accounts payable: 7,100 − 900 = 6,200 `[ledger]` |
| Total debits = Total credits                        | 45,300 = 45,300 `[ledger]`                       |
| Debt ratio = Total liabilities ÷ Total assets       | 9,200 ÷ 42,470 = 21.7% `[ledger]`                |
| Net income = Revenues − Expenses                    | 6,100 − 2,630 = 3,470 `[ledger]`                 |

## Common mistakes

- **Unearned consulting revenue is not revenue.** In entry 12 the credit goes to a
  liability. Revenue comes later, in Chapter 3, as the work is done.
- **The bank's "credit" is not your credit.** A deposit is a debit to Cash in the books.
- **Dividends never go on the income statement.** Debit-normal does not make them an
  expense.
- **Entry 9 is not revenue.** The revenue was recorded in entry 8. Crediting revenue again
  counts it twice.
- **Entry 8 has two credits.** Forgetting Rental revenue leaves the entry out of balance by 300.
- **A balanced trial balance is not proof.** Three of the five planted errors balance.
- **Debit does not mean decrease** and credit does not mean bad. They mean left and right.

## Anchors

| Figure                                               | Value  | Source                         |
| ---------------------------------------------------- | ------ | ------------------------------ |
| Trial balance, debits = credits                      | 45,300 | `[ledger]`                     |
| Cash                                                 | 4,350  | `[ledger]`                     |
| Supplies                                             | 9,720  | `[ledger]`                     |
| Prepaid insurance                                    | 2,400  | `[ledger]`                     |
| Equipment                                            | 26,000 | `[ledger]`                     |
| Total assets                                         | 42,470 | `[ledger]`, confirmed `[book]` |
| Accounts payable                                     | 6,200  | `[ledger]`                     |
| Unearned consulting revenue                          | 3,000  | `[ledger]`                     |
| Total liabilities                                    | 9,200  | `[ledger]`                     |
| Revenues (consulting 5,800 + rental 300)             | 6,100  | `[ledger]`                     |
| Expenses (rent 1,000, salaries 1,400, utilities 230) | 2,630  | `[ledger]`                     |
| Net income                                           | 3,470  | `[ledger]`                     |
| Ending retained earnings                             | 3,270  | `[ledger]`                     |
| Total equity                                         | 33,270 | `[ledger]`, confirmed `[book]` |
| Debt ratio                                           | 21.7%  | `[ledger]`                     |

---

# Chapter 03 · Adjusting Accounts

## Home

**One line:** December's books are not finished until six entries on December 31 put
each revenue and expense in the month it belongs to.

**Headline:** Six entries at Dec 31 turn a **$45,300** trial balance into a **$47,685**
one. `[ledger]`

> **Content is built and correct.** Rebuild the container per SPEC-v3 and rewrite the
> prose against SPEC-v3 §3. The facts, entries, and anchors below do not change.
>
> **Before building Chapter 4:** check the objective lists for Chapters 3 and 4 in
> Richard's copy and report where closing entries, the post-closing trial balance, the
> classified balance sheet, and the current ratio live. The repo's Chapter 3 objectives
> (C1, C2, A1, A2, P1–P3, Appendix 3A) do not include them.

## Hero instrument — Adjustment timeline

Already built: `AdjustmentTimeline.svelte`.

**Instruction:** "Drag the period end across December and watch each adjustment grow."

- Six lanes, (a) through (f), one per adjustment, each on its own time window.
- The four-step panel shows the adjustment for the chosen day; on Dec 31 it matches the
  entry in the drill below.
- Lanes are grouped by type: prepaid expense, unearned revenue, accrued expense, accrued
  revenue.

**Result line:** Dec 31 — six adjustments, total income effect +2,050 revenue, −1,735 expense

**Noticed:** "None of the six entries touched Cash. Each one moved one balance sheet
account and one income statement account."

## Secondary instruments

### Adjusted trial balance worksheet

Already built: `Worksheet.svelte`.

**Instruction:** "Switch each adjustment on and trace it from the unadjusted column to the
statements."

- Columns: unadjusted, adjustments, adjusted, income statement, balance sheet.
- The traced adjustment is highlighted in place on both lines it touches — not by colour
  alone (SPEC-v3 §4).
- Rows grouped by element with a hairline between groups.

**Result line:** Adjusted trial balance — Debits 47,685 = Credits 47,685

**Noticed:** "The unadjusted total was 45,300. Adjustments added 2,385 to each side, and
net income rose from 3,470 to 3,785."

### Cash versus accrual

Already built: `AccrualVsCash.svelte`.

**Instruction:** "Slide across 2025, 2026, and 2027 and compare the $2,400 policy under
each basis."

- Cash basis: 2,400 · 0 · 0. Accrual basis: 100 · 1,200 · 1,100. `[ledger]`

**Result line:** 2025 insurance expense — cash 2,400, accrual 100

**Noticed:** "Both bases expense $2,400 in total. Accrual spreads it across the 24 months
the coverage actually runs."

Also already built, keep in Lab: Statement links, Prepaid alternatives (Appendix 3A),
Profit margin. Each needs an imperative instruction and a result line added.

## Entry drill

The six adjustments and the two January follow-ups. `[ledger]`

| #   | Date   | Situation                                                      | Debit                                       | Credit                                             |
| --- | ------ | -------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| a   | Dec 31 | One month of the $2,400, 24-month policy has expired           | Insurance expense 100                       | Prepaid insurance 100                              |
| b   | Dec 31 | $9,720 of supplies available, $8,670 counted on hand           | Supplies expense 1,050                      | Supplies 1,050                                     |
| c   | Dec 31 | Equipment: ($26,000 − $8,000) ÷ 48 months                      | Depreciation expense—Equipment 375          | Accumulated depreciation—Equipment 375             |
| d   | Dec 31 | 5 of the 60 prepaid consulting days done, at $50 a day         | Unearned consulting revenue 250             | Consulting revenue 250                             |
| e   | Dec 31 | Employee worked Dec 29–31 at $70 a day, payday Jan 9           | Salaries expense 210                        | Salaries payable 210                               |
| f   | Dec 31 | 20 days of a 30-day contract done at $90 a day, not yet billed | Accounts receivable 1,800                   | Consulting revenue 1,800                           |
| e2  | Jan 9  | Payday: 3 accrued days plus 7 January days                     | Salaries payable 210 · Salaries expense 490 | Cash 700                                           |
| f2  | Jan 10 | Collects the contract: 20 accrued days plus 10 January days    | Cash 2,700                                  | Accounts receivable 1,800 · Consulting revenue 900 |

## Classification drill

**Categories:** Prepaid expense · Unearned revenue · Accrued expense · Accrued revenue

| Situation                                                                 | Answer           | Why                                                           |
| ------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------- |
| A year of office rent was paid in October and three months have passed    | Prepaid expense  | Cash went out first; the benefit is used month by month.      |
| Employees worked Dec 29–31. Payday is January 9                           | Accrued expense  | The cost is incurred now; the cash leaves later.              |
| A client paid $3,000 for 60 days of consulting starting tomorrow          | Unearned revenue | Cash came in before the work: a liability until earned.       |
| Twenty days of a 30-day contract are done; the bill goes out when it ends | Accrued revenue  | Earned already, cash later. Record revenue and a receivable.  |
| Equipment bought on December 3 has now been used for a month              | Prepaid expense  | Depreciation is a prepaid expense in slow motion.             |
| Interest on a bank loan has built up but is not due until March           | Accrued expense  | Interest is incurred with time even though no cash has moved. |
| A magazine collected subscriptions in advance for next year's issues      | Unearned revenue | Cash first, delivery later.                                   |
| Interest earned on a note receivable will be collected at maturity        | Accrued revenue  | Earned with time, not yet received.                           |

## Key terms

Time period assumption · Accounting period · Fiscal year · Natural business year ·
Interim financial statements · Accrual basis accounting · Cash basis accounting ·
Revenue recognition principle · Expense recognition principle · Adjusting entry ·
Prepaid expenses · Unearned revenues · Accrued expenses · Accrued revenues ·
Depreciation · Straight-line depreciation · Plant assets · Contra account · Accumulated
depreciation · Book value · Unadjusted trial balance · Adjusted trial balance · Profit
margin

(The 23 terms already in `ch03.ts`, with the book's definitions.)

## Recall

**Rules**

- Deferral = cash **first**, recognition later. Accrual = recognition first, cash
  **later**.
- Every adjusting entry has at least one income statement account and at least one
  balance sheet account. Cash is never in it.
- Statements come from the adjusted trial balance, in order: income statement, statement
  of retained earnings, balance sheet.
- Debits increase expenses, assets, and dividends (**DEBT — Expenses, Assets,
  Dividends**). Credits increase liabilities, equity, and revenue (**CLOR — Credits:
  Liabilities, Owner's equity, Revenue**). A contra asset carries a credit balance.

**Formulas**

| Formula                                                           | Worked                                         |
| ----------------------------------------------------------------- | ---------------------------------------------- |
| Straight-line depreciation = (Cost − Salvage value) ÷ Useful life | (26,000 − 8,000) ÷ 48 = 375 a month `[ledger]` |
| Book value = Cost − Accumulated depreciation                      | 26,000 − 375 = 25,625 `[ledger]`               |
| Supplies expense = Supplies available − Supplies on hand          | 9,720 − 8,670 = 1,050 `[ledger]`               |
| Expired prepaid = Cost ÷ Months covered × Months elapsed          | 2,400 ÷ 24 × 1 = 100 `[ledger]`                |
| Unearned revenue earned = Daily rate × Days performed             | 3,000 ÷ 60 × 5 = 250 `[ledger]`                |
| Accrued salaries = Daily pay × Unpaid days worked                 | 70 × 3 = 210 `[ledger]`                        |
| Profit margin = Net income ÷ Net sales                            | 3,785 ÷ 8,150 = 46.4% `[ledger]`               |

## Common mistakes

- **The credit does not go to Equipment.** Depreciation is credited to Accumulated
  depreciation—Equipment, so the original cost stays visible.
- **No adjustment credits or debits Cash.** If Cash is in it, it is not an adjustment.
- **Supplies expense is what was used, not what is left.** 1,050, not 8,670.
- **Accrued salaries count workdays since the last payday.** Dec 29, 30, 31 — three days,
  not five.
- **On payday, only the January days are expense.** Jan 9: 210 clears the payable, 490 is
  January expense.
- **Skipping (d) misstates all three statements.** Revenue and net income are 250 too
  low, so retained earnings and equity are 250 too low, and liabilities stay 250 too high.

## Anchors

Already asserted in CI by `ch03.ts`.

| Figure                             | Value  | Source     |
| ---------------------------------- | ------ | ---------- |
| Unadjusted trial balance           | 45,300 | `[ledger]` |
| Adjusted trial balance             | 47,685 | `[ledger]` |
| Total revenues                     | 8,150  | `[ledger]` |
| Total expenses                     | 4,365  | `[ledger]` |
| Net income                         | 3,785  | `[ledger]` |
| Ending retained earnings           | 3,585  | `[ledger]` |
| Total assets                       | 42,745 | `[ledger]` |
| Total liabilities                  | 9,160  | `[ledger]` |
| Total equity                       | 33,585 | `[ledger]` |
| Prepaid insurance after adjustment | 2,300  | `[ledger]` |
| Supplies after adjustment          | 8,670  | `[ledger]` |
| Equipment book value               | 25,625 | `[ledger]` |
| Unearned consulting revenue after  | 2,750  | `[ledger]` |
| Consulting revenue after           | 7,850  | `[ledger]` |
| Salaries expense after             | 1,610  | `[ledger]` |
| Profit margin                      | 46.4%  | `[ledger]` |

---

# Chapter 04 · Merchandising Operations

## Home

**One line:** A store buys goods, sells them for more, and records every sale twice — once
at the price, once at what the goods cost.

**Headline:** **Two entries per sale.** Revenue at the selling price, cost of goods sold
at cost.

> **Before building:** report where closing entries, the post-closing trial balance, the
> classified balance sheet, and the current ratio live (see Chapter 3). Check the Z-Mart
> figures marked `[book?]` and whether Richard's copy records expected sales returns at
> period end with a refund liability.

## Hero instrument — Merchandise flow

**Instruction:** "Sell units from the shelf and watch two entries fire for every sale."

- A shelf of inventory units with a cost tag; a customer side with a price tag.
- Sequence `[built]`, perpetual system, gross method:
  1. Buy 10 units at $50 on credit, terms 2/10, n/30 — inventory 500.
  2. Pay within 10 days — discount 10, cash 490, unit cost now $49.
  3. Sell 6 units at $100 on credit, same terms — **two entries**: revenue 600 at price,
     cost of goods sold 294 at cost.
  4. Customer returns 1 unit in resalable condition — **two entries** again: sales returns
     100, and 49 of cost back into inventory.
  5. Customer pays within 10 days — sales discount 10, cash 490.
- The two entries of each sale sit side by side, price entry above, cost entry below, tied
  by a bracket. That pairing is the visual point.

**Result line:** Net sales 490 − Cost of goods sold 245 = Gross profit 245 · Gross margin 50.0%

**Noticed:** "The price entry never touched inventory, and the cost entry never touched
Sales. Each sale needs both, or either revenue or inventory is wrong."

## Secondary instruments

### Discount decision

**Instruction:** "Move the payment day and see what skipping the discount really costs."

- Invoice $500, terms 2/10, n/30. Pay by day 10: $490. Pay on day 30: $500.
- Skipping the discount means paying $10 to keep $490 for 20 more days: an implied annual
  rate of 37.2%. `[built]`

**Result line:** Skip the discount → 37.2% a year to borrow $490 for 20 days

**Noticed:** "Two percent sounds small. Over 20 days it is dearer than almost any bank
loan, so borrowing to pay early is usually worth it."

### Income statement formats

**Instruction:** "Toggle between multiple-step and single-step on the same numbers."

Built company, one year `[built]`:

| Multiple-step                                |           |
| -------------------------------------------- | --------- |
| Sales                                        | 200,000   |
| Less sales discounts                         | (2,000)   |
| Less sales returns and allowances            | (8,000)   |
| Net sales                                    | 190,000   |
| Cost of goods sold                           | (114,000) |
| Gross profit                                 | 76,000    |
| Selling expenses                             | (30,000)  |
| General and administrative expenses          | (25,000)  |
| Income from operations                       | 21,000    |
| Other revenues and gains — interest revenue  | 1,000     |
| Other expenses and losses — interest expense | (2,000)   |
| Net income                                   | 20,000    |

Single-step: revenues 191,000 (net sales 190,000 + interest revenue 1,000); expenses
171,000 (114,000 + 30,000 + 25,000 + 2,000); net income 20,000.

**Result line:** Net income 20,000 in both formats

**Noticed:** "Same bottom line. The multiple-step format shows gross profit and operating
income on the way down; single-step hides both."

## Entry drill

Perpetual system, gross method.

| #   | Situation                                                          | Debit                                                        | Credit                                                         | Source    |
| --- | ------------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------------- | --------- |
| 1   | Z-Mart buys $500 of merchandise for cash                           | Merchandise inventory 500                                    | Cash 500                                                       | `[book?]` |
| 2   | Z-Mart buys $500 of merchandise on credit, terms 2/10, n/30        | Merchandise inventory 500                                    | Accounts payable 500                                           | `[book?]` |
| 3   | Pays the invoice in 2 within the discount period                   | Accounts payable 500                                         | Merchandise inventory 10 · Cash 490                            | `[book?]` |
| 4   | Returns $50 of defective goods bought on credit                    | Accounts payable 50                                          | Merchandise inventory 50                                       | `[book?]` |
| 5   | Keeps damaged goods and receives a $30 allowance                   | Accounts payable 30                                          | Merchandise inventory 30                                       | `[book?]` |
| 6   | Pays $75 freight on goods bought FOB shipping point                | Merchandise inventory 75                                     | Cash 75                                                        | `[book?]` |
| 7   | Sells goods on credit for $2,400 that cost $1,600                  | Accounts receivable 2,400 · Cost of goods sold 1,600         | Sales 2,400 · Merchandise inventory 1,600 (two entries)        | `[built]` |
| 8   | Customer returns $800 of those goods, cost $600, back to inventory | Sales returns and allowances 800 · Merchandise inventory 600 | Accounts receivable 800 · Cost of goods sold 600 (two entries) | `[built]` |
| 9   | Customer pays a $1,000 invoice within terms 2/10, n/30             | Cash 980 · Sales discounts 20                                | Accounts receivable 1,000                                      | `[built]` |
| 10  | Pays $60 to deliver goods sold FOB destination                     | Delivery expense 60                                          | Cash 60                                                        | `[built]` |
| 11  | Year-end count: inventory is $250 less than the records show       | Cost of goods sold 250                                       | Merchandise inventory 250                                      | `[built]` |

## Classification drill

**Categories:** Net sales · Cost of goods sold · Selling expense · General and
administrative expense · Other revenues and gains · Other expenses and losses · Not on the
income statement

| Item                             | Answer                             | Why                                                      |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| Sales discounts                  | Net sales                          | A contra revenue, subtracted from Sales.                 |
| Sales returns and allowances     | Net sales                          | A contra revenue.                                        |
| Freight paid on goods bought     | Cost of goods sold                 | Part of what the inventory cost; it flows out when sold. |
| Inventory shrinkage              | Cost of goods sold                 | Goods gone without a sale are still a cost of the goods. |
| Delivery expense on goods sold   | Selling expense                    | Freight-out is a cost of selling, not of buying.         |
| Salespeople's salaries           | Selling expense                    | Paid to make sales.                                      |
| Advertising                      | Selling expense                    | Spent to generate sales.                                 |
| Office salaries                  | General and administrative expense | Running the business, not selling.                       |
| Depreciation on office equipment | General and administrative expense | Office, not store.                                       |
| Interest revenue                 | Other revenues and gains           | Not from the main business of selling goods.             |
| Gain on sale of equipment        | Other revenues and gains           | Not from operations.                                     |
| Interest expense                 | Other expenses and losses          | A financing cost, below operating income.                |
| Dividends                        | Not on the income statement        | A distribution of equity, never an expense.              |

## Key terms

Merchandise · Merchandiser · Wholesaler · Retailer · Merchandise inventory · Cost of
goods sold · Gross profit (gross margin) · Operating cycle · Perpetual inventory system ·
Periodic inventory system · Invoice · List price · Trade discount · Credit terms · Credit
period · Discount period · EOM · Purchases discount · Sales discount · Purchases returns ·
Purchases allowances · Sales returns · Sales allowances · FOB shipping point · FOB
destination · Shrinkage · Multiple-step income statement · Single-step income statement ·
Selling expenses · General and administrative expenses · Gross margin ratio · Acid-test
(quick) ratio · Sales refund payable `[book?]`

## Recall

**Rules**

- **Two entries per sale:** revenue at price, cost of goods sold at cost. Two entries per
  resalable return, in reverse.
- **2/10, n/30** read aloud: "2 percent off inside 10 days, all of it due in 30."
- **FOB shipping point:** the buyer owns goods in transit and pays the freight, which goes
  into inventory. **FOB destination:** the seller owns them in transit and pays, as
  delivery expense.
- A purchase discount reduces Merchandise inventory. A sales discount is a contra revenue.
- Shrinkage is debited to Cost of goods sold.

**Formulas**

| Formula                                                                                       | Worked                                             |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Net sales = Sales − Sales discounts − Sales returns and allowances                            | 600 − 10 − 100 = 490 `[built]`                     |
| Gross profit = Net sales − Cost of goods sold                                                 | 490 − 245 = 245 `[built]`                          |
| Gross margin ratio = (Net sales − Cost of goods sold) ÷ Net sales                             | 245 ÷ 490 = 50.0% `[built]`                        |
| Acid-test ratio = (Cash + Short-term investments + Current receivables) ÷ Current liabilities | (8,000 + 2,000 + 10,000) ÷ 16,000 = 1.25 `[built]` |
| Implied annual rate of skipping a discount = Discount ÷ Discounted price × 365 ÷ Days gained  | 10 ÷ 490 × 365 ÷ 20 = 37.2% `[built]`              |

## Common mistakes

- **One entry for a sale.** Recording only the revenue leaves inventory and cost of goods
  sold wrong.
- **A purchase discount is not revenue.** It comes out of Merchandise inventory.
- **Freight-in is not delivery expense.** Freight on goods bought is inventory cost;
  freight on goods sold is a selling expense.
- **The discount applies to what is still owed.** After a $50 return on a $500 invoice,
  2% is taken on $450.
- **A resalable return needs its cost entry.** Without it the goods are back on the shelf
  but not in the books.
- **Inventory is not a quick asset.** Leave it and prepaids out of the acid-test ratio.

## Anchors

| Figure                                 | Value  | Source    |
| -------------------------------------- | ------ | --------- |
| Hero: net sales                        | 490    | `[built]` |
| Hero: cost of goods sold               | 245    | `[built]` |
| Hero: gross profit                     | 245    | `[built]` |
| Hero: gross margin ratio               | 50.0%  | `[built]` |
| Hero: ending inventory (5 units × $49) | 245    | `[built]` |
| Implied annual rate, 2/10, n/30        | 37.2%  | `[built]` |
| Format toggle: net income both formats | 20,000 | `[built]` |
| Acid-test ratio                        | 1.25   | `[built]` |

Book anchors to pull from Richard's copy before building: the Z-Mart purchase, return,
allowance, and freight entries; the Z-Mart income statement totals, if the book prints
them.

---

# Chapter 05 · Inventories and Cost of Sales

## Home

**One line:** When identical units were bought at different prices, the cost method
decides which price leaves with each sale — and so how big profit looks.

**Headline:** **$5,990** of goods available. FIFO, LIFO, and weighted average split it
three different ways. `[book]`

> **Data confirmed `[book]`.** Trekking Company, month ended August 31, perpetual system:
>
> | Date   | Activity            | Units and cost  |
> | ------ | ------------------- | --------------- |
> | Aug 1  | Beginning inventory | 10 units @ $91  |
> | Aug 3  | Purchase            | 15 units @ $106 |
> | Aug 14 | Sale                | 20 units @ $130 |
> | Aug 17 | Purchase            | 20 units @ $115 |
> | Aug 28 | Purchase            | 10 units @ $119 |
> | Aug 31 | Sale                | 23 units @ $150 |
>
> Goods available 55 units, $5,990; sales $6,050. The book's own comparison prints
> specific identification cost of goods sold 4,582 and gross profit 1,468 against FIFO
> 4,570 and 1,480, with operating expenses 450 and income tax at 30%. **The Aug 28
> purchase lands before the Aug 31 sale** — that is what sets the LIFO and weighted-average
> figures below, and it is the one fact to re-check in Richard's copy. Still to pull from
> his copy: which units the specific identification example sells, and whether periodic
> costing sits in an appendix.

## Hero instrument — Cost layers

**Instruction:** "Sell units and watch which layer drains."

- Purchase layers as stacked blocks, oldest at the bottom, each labelled units × cost.
- A method toggle: FIFO drains from the bottom, LIFO from the top, weighted average melts
  the layers into one pool at a single average cost.
- Perpetual: a sale can only drain layers that exist on its date. The Aug 14 sale cannot
  reach the Aug 17 purchase; the Aug 31 sale can reach every layer.
- Three income statements side by side, live: sales, cost of goods sold, gross profit.

**Result line:** FIFO COGS 4,570 · LIFO 4,730 · Weighted average 4,622 — goods available 5,990 in all three

**Noticed:** "Total cost never changed. The methods only decided how $5,990 splits between
cost of goods sold and ending inventory — and with rising costs, FIFO kept the expensive
units on the balance sheet."

## Secondary instruments

### Inventory error see-saw

**Instruction:** "Overstate this year's ending inventory and watch next year's profit
swing back."

Built company `[built]`: beginning inventory 20,000, purchases 60,000 each year, sales
100,000 each year, correct ending inventory 18,000 (year 1) and 22,000 (year 2).

| With a 2,000 overstatement of year-1 ending inventory | Year 1 | Year 2 |
| ----------------------------------------------------- | ------ | ------ |
| Cost of goods sold, reported                          | 60,000 | 58,000 |
| Cost of goods sold, correct                           | 62,000 | 56,000 |
| Gross profit, reported                                | 40,000 | 42,000 |
| Gross profit, correct                                 | 38,000 | 44,000 |

**Result line:** Year 1 profit +2,000 · Year 2 profit −2,000 · Two-year total correct

**Noticed:** "The error corrected itself over two years, because this year's ending
inventory is next year's beginning inventory."

### Lower of cost or market

**Instruction:** "Drop the market price below cost and watch the write-down reach cost of
goods sold."

- 100 units costing $20 each. Market falls to $17. Write-down 300. `[built]`
- Confirm whether Richard's copy says "market" or "net realizable value" and use its
  wording `[book?]`.

**Result line:** Inventory 2,000 → 1,700 · Cost of goods sold +300

**Noticed:** "Inventory is never carried above what it could be replaced or sold for. The
loss is recognized now, not when the units sell."

## Entry drill

Trekking, perpetual. `[book]` for the data; amounts recomputed from it.

| #   | Situation                                                              | Debit                                                | Credit                                    |
| --- | ---------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------- |
| 1   | Aug 3: buys 15 units at $106 on credit                                 | Merchandise inventory 1,590                          | Accounts payable 1,590                    |
| 2   | Aug 14: sells 20 units at $130 on credit — FIFO                        | Accounts receivable 2,600 · Cost of goods sold 1,970 | Sales 2,600 · Merchandise inventory 1,970 |
| 3   | Aug 17: buys 20 units at $115 on credit                                | Merchandise inventory 2,300                          | Accounts payable 2,300                    |
| 4   | Aug 31: sells 23 units at $150 on credit — FIFO (5 @ $106 + 18 @ $115) | Accounts receivable 3,450 · Cost of goods sold 2,600 | Sales 3,450 · Merchandise inventory 2,600 |
| 5   | The Aug 14 sale under LIFO — cost entry only                           | Cost of goods sold 2,045                             | Merchandise inventory 2,045               |
| 6   | The Aug 31 sale under LIFO — cost entry only (10 @ $119 + 13 @ $115)   | Cost of goods sold 2,685                             | Merchandise inventory 2,685               |
| 7   | The Aug 14 sale under weighted average — cost entry only               | Cost of goods sold 2,000                             | Merchandise inventory 2,000               |
| 8   | The Aug 31 sale under weighted average — cost entry only (23 @ $114)   | Cost of goods sold 2,622                             | Merchandise inventory 2,622               |
| 9   | Market value of 100 units falls from $20 cost to $17 `[built]`         | Cost of goods sold 300                               | Merchandise inventory 300                 |

## Classification drill

**Categories:** Count it in our inventory · Leave it out

| Item at year end                                           | Answer       | Why                                               |
| ---------------------------------------------------------- | ------------ | ------------------------------------------------- |
| Goods we bought, in transit, shipped FOB shipping point    | Count it     | Ownership passed to us when they left the seller. |
| Goods we bought, in transit, shipped FOB destination       | Leave it out | The seller owns them until they arrive.           |
| Goods we sold, in transit, shipped FOB shipping point      | Leave it out | The customer owns them once shipped.              |
| Goods we sold, in transit, shipped FOB destination         | Count it     | Still ours until delivered.                       |
| Our goods held by another store on consignment             | Count it     | We are the consignor; we still own them.          |
| Another company's goods we hold on consignment             | Leave it out | We are the consignee; they are not ours.          |
| Damaged goods we still own and can sell at a reduced price | Count it     | At their net realizable value, not full cost.     |

## Key terms

Specific identification · First-in, first-out (FIFO) · Last-in, first-out (LIFO) ·
Weighted average · Consistency concept · Goods in transit · Consigned goods · Consignor ·
Consignee · Goods damaged or obsolete · Net realizable value · Lower of cost or market
(LCM) · Cost of goods available for sale · Conservatism constraint · Inventory turnover ·
Days' sales in inventory · Periodic inventory system · Perpetual inventory system · Retail
inventory method `[book?]` · Gross profit method `[book?]`

## Recall

**Rules**

- **Rising costs: FIFO → higher income, LIFO → lower tax.** Weighted average lands in
  between.
- Every method uses the same goods available for sale. Only the split changes.
- An overstated ending inventory understates cost of goods sold and overstates income
  this year, then reverses next year.
- LIFO is not permitted under IFRS.
- The consistency concept: pick a method and keep using it, or disclose the change.

**Formulas**

| Formula                                                                | Worked                                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Goods available for sale = Beginning inventory + Purchases             | 910 + 1,590 + 2,300 + 1,190 = 5,990 `[book]`                             |
| Cost of goods sold = Goods available − Ending inventory                | FIFO: 5,990 − 1,420 = 4,570 `[book]`                                     |
| Weighted average unit cost (perpetual) = Cost on hand ÷ Units on hand  | After Aug 3: 2,500 ÷ 25 = $100. After Aug 28: 3,990 ÷ 35 = $114 `[book]` |
| Inventory turnover = Cost of goods sold ÷ Average inventory            | 4,570 ÷ ((910 + 1,420) ÷ 2) = 3.9 times `[book]`                         |
| Days' sales in inventory = Ending inventory ÷ Cost of goods sold × 365 | 1,420 ÷ 4,570 × 365 = 113.4 days `[book]`                                |

## Common mistakes

- **Draining a layer that has not arrived.** Under perpetual LIFO the Aug 14 sale takes
  15 at $106 and 5 at $91, not units from Aug 17.
- **Thinking the method changes total cost.** It only moves cost between the income
  statement and the balance sheet.
- **Costing a sale at the selling price.** Cost of goods sold is always at cost.
- **Believing an inventory error stays wrong.** It flips sign the next year.
- **Counting consigned goods by who holds them.** Ownership decides, not location.

## Anchors

| Figure                                                                 | Value                         | Source    |
| ---------------------------------------------------------------------- | ----------------------------- | --------- |
| Units available / cost available                                       | 55 units / 5,990              | `[book]`  |
| Units sold / units in ending inventory                                 | 43 / 12                       | `[book]`  |
| Sales                                                                  | 6,050                         | `[book]`  |
| FIFO cost of goods sold / ending inventory                             | 4,570 / 1,420                 | `[book]`  |
| LIFO cost of goods sold / ending inventory                             | 4,730 / 1,260                 | `[book]`  |
| Weighted average cost of goods sold / ending inventory                 | 4,622 / 1,368                 | `[book]`  |
| Specific identification cost of goods sold / ending inventory          | 4,582 / 1,408                 | `[book]`  |
| Gross profit: FIFO / LIFO / weighted average / specific identification | 1,480 / 1,320 / 1,428 / 1,468 | `[book]`  |
| Operating expenses and tax rate in the book's comparison               | 450 · 30%                     | `[book]`  |
| Invariant: COGS + ending inventory, every method                       | 5,990                         | derived   |
| Error see-saw: year 1 and year 2 profit swing                          | +2,000 / −2,000               | `[built]` |
| LCM write-down                                                         | 300                           | `[built]` |

---

# Chapter 06 · Cash, Fraud, and Internal Control

## Home

**One line:** How a business keeps its cash from walking out the door, and how it proves
its cash balance matches the bank's.

**Headline:** **Only the book side makes entries.** The bank already knows its half.

> **Before building:** SPEC-v3 §6 — verify this chapter's title, objectives, and contents
> against Richard's copy. Every number below is `[built]`; pull the book's bank
> reconciliation example and decide whether to use it instead.

## Hero instrument — Bank reconciliation

**Instruction:** "Drag each item to the bank side or the book side until the two adjusted
balances match."

Built data `[built]`: bank statement balance 2,050; Cash account balance 1,383.

| Item                                                      | Side | Effect |
| --------------------------------------------------------- | ---- | ------ |
| Deposit made Oct 31, not yet on the statement             | Bank | +145   |
| Outstanding checks #102 (350) and #120 (150)              | Bank | −500   |
| Bank collected a $500 note plus $30 interest              | Book | +530   |
| Interest earned on the account                            | Book | +8     |
| Bank service fee                                          | Book | −15    |
| Customer's check returned NSF                             | Book | −220   |
| Check #118 for $56 to a supplier recorded in books as $65 | Book | +9     |

- Items start in an unsorted tray. Book-side items grow a journal entry when dropped;
  bank-side items do not.

**Result line:** Adjusted bank balance 1,695 = Adjusted book balance 1,695

**Noticed:** "Five items made journal entries and two did not. Deposits in transit and
outstanding checks are already in the books — the bank just has not caught up."

## Secondary instruments

### Control failure diagnostic

**Instruction:** "Read the scenario and name the control principle that failed."

- Principles `[book?]`: establish responsibilities; maintain adequate records; insure
  assets and bond key employees; separate recordkeeping from custody of assets; divide
  responsibility for related transactions; apply technological controls; perform regular
  and independent reviews.
- Scenarios `[built]`, one per principle, e.g. "The clerk who opens the mail and deposits
  checks also posts customer payments" → separate recordkeeping from custody.

**Result line:** 5 of 7 principles identified

**Noticed:** "Most frauds in the scenarios needed one person to do two jobs. Separation of
duties is what makes theft require collusion."

### Petty cash cycle

**Instruction:** "Spend from the $100 fund, then replenish it and watch which accounts
move."

- Establish 100. Receipts: postage 22, delivery 30, office supplies 18. Cash counted: 28.
  Shortage 2. Replenish 72. `[built]`

**Result line:** Receipts 70 + Cash short 2 + Cash on hand 28 = Fund 100

**Noticed:** "Petty cash moved only when the fund was created. Replenishing it debits the
expenses, not Petty cash."

## Entry drill

`[built]`

| #   | Situation                                                       | Debit                                                                                         | Credit                                     |
| --- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------ |
| 1   | Establish a $100 petty cash fund                                | Petty cash 100                                                                                | Cash 100                                   |
| 2   | Replenish: postage 22, delivery 30, office supplies 18, 2 short | Postage expense 22 · Delivery expense 30 · Office supplies expense 18 · Cash over and short 2 | Cash 72                                    |
| 3   | Increase the fund to $150                                       | Petty cash 50                                                                                 | Cash 50                                    |
| 4   | Register shows $550 of cash sales; drawer holds $555            | Cash 555                                                                                      | Sales 550 · Cash over and short 5          |
| 5   | Reconciliation: bank collected a $500 note plus $30 interest    | Cash 530                                                                                      | Notes receivable 500 · Interest revenue 30 |
| 6   | Reconciliation: interest earned                                 | Cash 8                                                                                        | Interest revenue 8                         |
| 7   | Reconciliation: bank service fee                                | Miscellaneous expenses 15                                                                     | Cash 15                                    |
| 8   | Reconciliation: customer's $220 check returned NSF              | Accounts receivable 220                                                                       | Cash 220                                   |
| 9   | Reconciliation: $56 check recorded as $65                       | Cash 9                                                                                        | Accounts payable 9                         |

## Classification drill

**Categories:** Add to bank balance · Subtract from bank balance · Add to book balance
(entry) · Subtract from book balance (entry)

| Item                                                   | Answer                     | Why                                            |
| ------------------------------------------------------ | -------------------------- | ---------------------------------------------- |
| Deposit in transit                                     | Add to bank                | Recorded in books, not yet by the bank.        |
| Outstanding check                                      | Subtract from bank         | Recorded in books, not yet cleared.            |
| Bank error: another customer's $40 check charged to us | Add to bank                | The bank's mistake; the bank corrects it.      |
| Note collected by the bank                             | Add to book (entry)        | Cash we have that the books do not show.       |
| Interest earned                                        | Add to book (entry)        | Same.                                          |
| Bank service charge                                    | Subtract from book (entry) | A cost the books have not recorded.            |
| NSF check                                              | Subtract from book (entry) | The deposit bounced; reinstate the receivable. |
| Check written for $56 recorded as $65                  | Add to book (entry)        | Books took out 9 too much.                     |
| Deposit of $520 recorded in books as $250              | Add to book (entry)        | Books show 270 too little.                     |

## Key terms

Internal control system · Sarbanes-Oxley Act (SOX) · Committee of Sponsoring Organizations
(COSO) `[book?]` · Fraud triangle · Principles of internal control · Separation of duties
· Bond · Collusion · Cash · Cash equivalents · Liquidity · Liquid assets · Cash over and
short · Voucher system · Voucher · Petty cash · Petty cashier · Bank statement · Canceled
checks · Deposit in transit · Outstanding checks · Nonsufficient funds (NSF) check ·
Electronic funds transfer (EFT) · Signature card · Bank reconciliation · Days' sales
uncollected

## Recall

**Rules**

- Fraud triangle: opportunity, pressure, rationalization.
- Only book-side reconciling items get journal entries.
- Cash equivalents are short-term, highly liquid, and within three months of maturity when
  bought `[book?]`.
- Cash over and short: debit when cash is short (an expense), credit when over.
- Petty cash is debited only to establish or increase the fund.

**Formulas**

| Formula                                                                                           | Worked                                           |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Adjusted bank balance = Bank balance + Deposits in transit − Outstanding checks ± Bank errors     | 2,050 + 145 − 500 = 1,695 `[built]`              |
| Adjusted book balance = Book balance + Collections and interest − Fees − NSF checks ± Book errors | 1,383 + 530 + 8 − 15 − 220 + 9 = 1,695 `[built]` |
| Days' sales uncollected = Accounts receivable ÷ Net sales × 365                                   | 12,000 ÷ 146,000 × 365 = 30.0 days `[built]`     |

## Common mistakes

- **Journalizing a deposit in transit or an outstanding check.** Both are already in the
  books.
- **Debiting Petty cash to replenish.** The expenses get the debits.
- **Writing off an NSF check to expense.** The customer still owes it: debit Accounts
  receivable.
- **Correcting a book error in the wrong direction.** A $56 check recorded as $65
  understated cash by 9 — add it back.
- **Assuming strong controls stop all fraud.** Collusion defeats separation of duties.

## Anchors

| Figure                   | Value | Source    |
| ------------------------ | ----- | --------- |
| Adjusted bank balance    | 1,695 | `[built]` |
| Adjusted book balance    | 1,695 | `[built]` |
| Book-side entries        | 5     | `[built]` |
| Petty cash replenishment | 72    | `[built]` |
| Days' sales uncollected  | 30.0  | `[built]` |

---

# Chapter 07 · Receivables

## Home

**One line:** Some customers will never pay. Accounting estimates that loss up front,
before anyone knows which customers they are.

**Headline:** **Write-offs never touch expense.** The expense was recorded when the loss
was estimated.

> **Before building:** SPEC-v3 §6 — verify objectives and contents against Richard's copy.
> Numbers are `[built]`. Confirm the book uses a 360-day year for note interest.

## Hero instrument — Aging schedule

**Instruction:** "Move receivables into older buckets and watch the allowance and bad
debts expense recompute."

Built data `[built]`, accounts receivable 100,000:

| Age                   | Balance | Estimated uncollectible | Required allowance |
| --------------------- | ------- | ----------------------- | ------------------ |
| Not yet due           | 60,000  | 1%                      | 600                |
| 1–30 days past due    | 20,000  | 3%                      | 600                |
| 31–60 days past due   | 12,000  | 10%                     | 1,200              |
| 61–90 days past due   | 5,000   | 25%                     | 1,250              |
| Over 90 days past due | 3,000   | 50%                     | 1,500              |
| **Total**             | 100,000 |                         | **5,150**          |

- A second control sets the unadjusted allowance: 650 credit or 350 debit.

**Result line:** Required allowance 5,150 − existing 650 credit = Bad debts expense 4,500

**Noticed:** "Aging sets the balance the allowance must reach. The expense is only what it
takes to get there, so a leftover credit balance shrinks the entry."

## Secondary instruments

### Sales method versus receivables method

**Instruction:** "Switch methods on the same data and watch one add to the balance while
the other adjusts to it."

- Percent of sales: 1% × credit sales 400,000 = expense 4,000; allowance becomes 650 +
  4,000 = 4,650.
- Percent of receivables (aging): allowance must be 5,150; expense 4,500. `[built]`

**Result line:** Sales method — expense 4,000, allowance 4,650 · Receivables method — expense 4,500, allowance 5,150

**Noticed:** "The sales method starts from the income statement and ignores the old
balance. The receivables method starts from the balance sheet and works back to the
expense."

### Note calculator

**Instruction:** "Change the principal, rate, and days, and watch interest and maturity
value."

- $10,000, 12%, 90 days, dated Dec 1, 2026, due Mar 1, 2027. `[built]`

**Result line:** Interest 300 · Maturity value 10,300 · Accrued at Dec 31: 100

**Noticed:** "A third of the interest belongs to December, even though all of it is
collected in March."

## Entry drill

`[built]`

| #   | Situation                                                                | Debit                               | Credit                                                                   |
| --- | ------------------------------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------ |
| 1   | $1,000 credit card sale; card company charges 3%, cash received today    | Cash 970 · Credit card expense 30   | Sales 1,000                                                              |
| 2   | Year end: aging requires 5,150; allowance has a 650 credit balance       | Bad debts expense 4,500             | Allowance for doubtful accounts 4,500                                    |
| 3   | Write off a customer's $800 account                                      | Allowance for doubtful accounts 800 | Accounts receivable 800                                                  |
| 4   | The written-off customer pays the $800 after all — reinstate             | Accounts receivable 800             | Allowance for doubtful accounts 800                                      |
| 5   | … and collect                                                            | Cash 800                            | Accounts receivable 800                                                  |
| 6   | A small company using direct write-off writes off $400                   | Bad debts expense 400               | Accounts receivable 400                                                  |
| 7   | Accept a $10,000, 90-day, 12% note for a past-due account on Dec 1       | Notes receivable 10,000             | Accounts receivable 10,000                                               |
| 8   | Dec 31: accrue 30 days of interest on the note                           | Interest receivable 100             | Interest revenue 100                                                     |
| 9   | Mar 1: note paid in full at maturity                                     | Cash 10,300                         | Interest revenue 200 · Interest receivable 100 · Notes receivable 10,000 |
| 10  | A different $10,000, 12%, 90-day note is dishonored; no interest accrued | Accounts receivable 10,300          | Interest revenue 300 · Notes receivable 10,000                           |

## Classification drill

**Categories:** Total assets go up · Total assets go down · No change in total assets

| Event                                                         | Answer    | Why                                                           |
| ------------------------------------------------------------- | --------- | ------------------------------------------------------------- |
| Record bad debts expense, allowance method                    | Down      | The allowance grows, so net receivables fall.                 |
| Write off an account, allowance method                        | No change | Receivables and allowance fall together; net is unchanged.    |
| Write off an account, direct write-off method                 | Down      | Receivables fall with nothing offsetting.                     |
| Reinstate and collect a written-off account, allowance method | No change | Reinstating moves both; collecting swaps receivable for cash. |
| Collect an ordinary receivable                                | No change | One asset for another.                                        |
| Accept a note for an account receivable                       | No change | One receivable for another.                                   |
| Accrue interest on a note receivable                          | Up        | A new receivable, earned with time.                           |
| Collect a note at maturity with interest not accrued before   | Up        | Cash of 10,300 replaces a 10,000 note.                        |

## Key terms

Accounts receivable · Subsidiary ledger · Credit card · Direct write-off method ·
Allowance method · Bad debts · Allowance for doubtful accounts · Realizable (net
realizable) value · Percent of sales method · Percent of receivables method · Aging of
accounts receivable · Materiality constraint · Promissory note · Principal · Maker ·
Payee · Maturity date · Period of a note · Maturity value · Dishonored note · Pledging
receivables · Factoring · Factor · Accounts receivable turnover

## Recall

**Rules**

- The allowance is a contra asset with a credit balance.
- **Write-offs never touch expense** under the allowance method.
- Percent of sales **adds** to the existing allowance. Percent of receivables **adjusts
  to** a target balance.
- Direct write-off is allowed only when bad debts are immaterial.

**Formulas**

| Formula                                                                               | Worked                                                   |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Net realizable value = Accounts receivable − Allowance                                | 100,000 − 5,150 = 94,850 `[built]`                       |
| Bad debts expense (sales method) = Credit sales × Rate                                | 400,000 × 1% = 4,000 `[built]`                           |
| Bad debts expense (receivables method) = Required allowance − Existing credit balance | 5,150 − 650 = 4,500 `[built]`                            |
| Interest = Principal × Rate × Time                                                    | 10,000 × 12% × 90/360 = 300 `[built]`                    |
| Maturity value = Principal + Interest                                                 | 10,000 + 300 = 10,300 `[built]`                          |
| Accounts receivable turnover = Net sales ÷ Average accounts receivable                | 500,000 ÷ ((90,000 + 110,000) ÷ 2) = 5.0 times `[built]` |

## Common mistakes

- **Debiting Bad debts expense on a write-off.** Under the allowance method the debit is
  the allowance.
- **Booking the target as the expense.** The aging schedule says 5,150; the entry is 4,500.
- **Subtracting the old balance under the sales method.** That method ignores it.
- **An allowance with a debit balance.** Add it: 5,150 + 350 = 5,500.
- **Skipping the reinstatement.** A recovery is two entries, so the customer's record
  shows they paid.
- **Using 365 days** when the book computes note interest on 360.

## Anchors

| Figure                                | Value         | Source    |
| ------------------------------------- | ------------- | --------- |
| Required allowance                    | 5,150         | `[built]` |
| Bad debts expense, 650 credit balance | 4,500         | `[built]` |
| Bad debts expense, 350 debit balance  | 5,500         | `[built]` |
| Net realizable value                  | 94,850        | `[built]` |
| Sales method: expense / allowance     | 4,000 / 4,650 | `[built]` |
| Note interest / maturity value        | 300 / 10,300  | `[built]` |
| Interest accrued at Dec 31            | 100           | `[built]` |
| Accounts receivable turnover          | 5.0           | `[built]` |

---

# Chapter 08 · Long-Term Assets

## Home

**One line:** A machine that works for five years should cost the business a piece of its
price in each of those years. How big each piece is depends on the method.

**Headline:** **Same total, different timing.** Every method depreciates $9,000. `[book?]`

> **Before building:** SPEC-v3 §6 — verify against Richard's copy. The
> double-declining-balance schedule below (4,000 · 2,400 · 1,440 · 864 · 296) is the
> standard published table for a $10,000 asset with a $1,000 salvage value and a five-year
> life, so the machine is very likely right. Confirm the book's
> machine: cost $10,000, salvage $1,000, five-year life, 36,000 units, and its units by
> year.

## Hero instrument — Depreciation curves

**Instruction:** "Switch between straight-line, units-of-production, and double-declining-
balance and watch the yearly expense change while the total stays at $9,000."

- Machine `[book?]`: cost 10,000, salvage 1,000, life 5 years, 36,000 units. Units by
  year 7,000 · 8,000 · 9,000 · 7,000 · 5,000 `[book?]`.
- Two plots on one axis, toggled: annual expense, and book value.
- Double-declining-balance stops at salvage in year 5.

| Year      | Straight-line | Units-of-production | Double-declining-balance |
| --------- | ------------- | ------------------- | ------------------------ |
| 1         | 1,800         | 1,750               | 4,000                    |
| 2         | 1,800         | 2,000               | 2,400                    |
| 3         | 1,800         | 2,250               | 1,440                    |
| 4         | 1,800         | 1,750               | 864                      |
| 5         | 1,800         | 1,250               | 296                      |
| **Total** | **9,000**     | **9,000**           | **9,000**                |

**Result line:** Total depreciation 9,000 · Book value at end of year 5: 1,000

**Noticed:** "The $1,000 salvage value was never depreciated. The methods only moved the
$9,000 between years — double-declining puts almost half of it in year 1."

## Secondary instruments

### Disposal

**Instruction:** "Set the sale price and watch the gain or loss against book value."

- The machine, straight-line, sold at the end of year 3: accumulated depreciation 5,400,
  book value 4,600. `[built]`

**Result line:** Sold for 5,000 → gain 400 · Sold for 4,000 → loss 600

**Noticed:** "The gain or loss is measured against book value, not the $10,000 it cost."

### Change in estimate

**Instruction:** "Change the remaining life after year 2 and watch only the future years
move."

- After two years straight-line, book value 6,400. Revised: 4 more years, salvage 400. New
  depreciation (6,400 − 400) ÷ 4 = 1,500 a year. `[built]`

**Result line:** Years 1–2: 1,800 each (unchanged) · Years 3–6: 1,500 each

**Noticed:** "The first two years were not restated. A better estimate only changes what
comes next."

## Entry drill

| #   | Situation                                                               | Debit                                                 | Credit                                   | Source    |
| --- | ----------------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------- | --------- |
| 1   | Buy the machine: price 9,500, freight 300, installation 200, all cash   | Machinery 10,000                                      | Cash 10,000                              | `[built]` |
| 2   | Year-1 straight-line depreciation                                       | Depreciation expense—Machinery 1,800                  | Accumulated depreciation—Machinery 1,800 | `[book?]` |
| 3   | Year-1 double-declining-balance depreciation                            | Depreciation expense—Machinery 4,000                  | Accumulated depreciation—Machinery 4,000 | `[book?]` |
| 4   | Pay 900,000 for land and a building appraised at 300,000 and 700,000    | Land 270,000 · Building 630,000                       | Cash 900,000                             | `[built]` |
| 5   | Ordinary repair to the machine                                          | Repairs expense 150                                   | Cash 150                                 | `[built]` |
| 6   | Betterment: new part that extends the machine's life                    | Machinery 1,200                                       | Cash 1,200                               | `[built]` |
| 7   | Sell the machine after 3 years of straight-line for 5,000               | Cash 5,000 · Accumulated depreciation—Machinery 5,400 | Machinery 10,000 · Gain on disposal 400  | `[built]` |
| 8   | Discard fully depreciated equipment that cost 8,000                     | Accumulated depreciation—Equipment 8,000              | Equipment 8,000                          | `[built]` |
| 9   | Mine cost 500,000, 250,000 tons, no salvage; 20,000 tons mined and sold | Depletion expense 40,000                              | Accumulated depletion—Mine 40,000        | `[built]` |
| 10  | Amortize a 30,000 patent over 10 years                                  | Amortization expense—Patents 3,000                    | Accumulated amortization—Patents 3,000   | `[built]` |

## Classification drill

**Categories:** Add to the asset's cost · Expense it now

| Cost                                                    | Answer     | Why                                                         |
| ------------------------------------------------------- | ---------- | ----------------------------------------------------------- |
| Freight to deliver a new machine                        | Asset cost | Needed to get the asset ready for use.                      |
| Installation and testing                                | Asset cost | Same.                                                       |
| Insurance while the machine is in transit               | Asset cost | Before it is ready for use.                                 |
| Insurance after the machine is running                  | Expense    | A cost of using it, period by period.                       |
| Repairing damage caused by careless unloading           | Expense    | Not a normal, necessary cost of getting it ready.           |
| Oil change and routine maintenance                      | Expense    | An ordinary repair; keeps the asset as it was.              |
| Replacing a motor so the machine lasts three more years | Asset cost | A betterment or extraordinary repair that extends its life. |
| Clearing and grading land for a building                | Asset cost | Part of the land's cost.                                    |
| Paving a parking lot                                    | Asset cost | Land improvements, depreciated separately.                  |
| Back property taxes the buyer agrees to pay at purchase | Asset cost | Part of the price of the land.                              |
| Property taxes for the years after purchase             | Expense    | A cost of owning it each year.                              |

## Key terms

Plant assets · Cost principle · Land · Land improvements · Buildings · Machinery and
equipment · Lump-sum purchase · Depreciation · Cost · Salvage value · Useful life ·
Obsolescence · Inadequacy · Straight-line method · Units-of-production method ·
Declining-balance method · Double-declining-balance method · Accelerated depreciation ·
Modified Accelerated Cost Recovery System (MACRS) · Book value · Change in an accounting
estimate · Partial-year depreciation · Revenue expenditures · Capital expenditures ·
Betterments (improvements) · Extraordinary repairs · Ordinary repairs · Impairment ·
Natural resources · Depletion · Intangible assets · Patent · Copyright · Trademark ·
Franchises and licenses · Goodwill · Amortization · Total asset turnover

## Recall

**Rules**

- **Same total, different timing.**
- Land is never depreciated. Land improvements are.
- Double-declining-balance ignores salvage when applying the rate, and depreciation stops
  once book value reaches salvage.
- A change in estimate changes current and future years only.
- Goodwill is not amortized; it is tested for impairment `[book?]`.

**Formulas**

| Formula                                                                 | Worked                                  |
| ----------------------------------------------------------------------- | --------------------------------------- |
| Straight-line = (Cost − Salvage) ÷ Useful life                          | (10,000 − 1,000) ÷ 5 = 1,800 `[book?]`  |
| Units-of-production rate = (Cost − Salvage) ÷ Total units               | 9,000 ÷ 36,000 = $0.25 a unit `[book?]` |
| Units-of-production expense = Rate × Units produced                     | 0.25 × 7,000 = 1,750 `[book?]`          |
| Double-declining-balance = 2 × (1 ÷ Useful life) × Beginning book value | 40% × 10,000 = 4,000 `[book?]`          |
| Book value = Cost − Accumulated depreciation                            | 10,000 − 5,400 = 4,600 `[built]`        |
| Gain or loss on disposal = Proceeds − Book value                        | 5,000 − 4,600 = 400 gain `[built]`      |
| Revised depreciation = (Book value − Revised salvage) ÷ Remaining life  | (6,400 − 400) ÷ 4 = 1,500 `[built]`     |
| Depletion rate = (Cost − Salvage) ÷ Total units                         | 500,000 ÷ 250,000 = $2 a ton `[built]`  |
| Total asset turnover = Net sales ÷ Average total assets                 | 800,000 ÷ 400,000 = 2.0 times `[built]` |

## Common mistakes

- **Subtracting salvage before applying the double-declining rate.** The rate applies to
  book value; salvage only stops depreciation once book value reaches it.
- **Depreciating land.**
- **Measuring a disposal gain against cost.** Use book value, after recording depreciation
  up to the sale date.
- **Restating past years for a change in estimate.** Only future years change.
- **Crediting the asset for depreciation.** The credit goes to accumulated depreciation.
- **Capitalizing ordinary repairs.** They keep the asset as it was; expense them.

## Anchors

| Figure                              | Value                                 | Source    |
| ----------------------------------- | ------------------------------------- | --------- |
| Straight-line, each year            | 1,800                                 | `[book?]` |
| Units-of-production rate            | 0.25                                  | `[book?]` |
| Units-of-production, years 1–5      | 1,750 · 2,000 · 2,250 · 1,750 · 1,250 | `[book?]` |
| Double-declining-balance, years 1–5 | 4,000 · 2,400 · 1,440 · 864 · 296     | `[book?]` |
| Total depreciation, every method    | 9,000                                 | derived   |
| Disposal after 3 years at 5,000     | gain 400                              | `[built]` |
| Revised annual depreciation         | 1,500                                 | `[built]` |
| Lump-sum allocation                 | Land 270,000 · Building 630,000       | `[built]` |

---

# Chapter 09 · Current Liabilities

## Home

**One line:** What a business owes within the year — including the payroll costs most
employees never see on their pay stub.

**Headline:** A **$10,000** payroll puts **$7,535** in employees' pockets and costs the
company **$11,365**. `[built]`

> **Before building:** SPEC-v3 §6 — verify against Richard's copy. Use the book's payroll
> rates and wage bases, not current-year law: Social Security rate and wage base, Medicare
> rate, FUTA rate and base, and the SUTA rate it assumes `[book?]`. The figures below
> assume 6.2%, 1.45%, FUTA 0.6% and SUTA 5.4% on the first $7,000, with no employee over
> any wage base.

## Hero instrument — Payroll waterfall

**Instruction:** "Change the gross pay and watch each withholding step it down to net pay,
with the employer's cost growing beside it."

- Left column: gross pay stepping down through Social Security, Medicare, federal income
  tax, and medical insurance to net pay.
- Right column, as a separate parallel bar: gross pay plus the employer's own Social
  Security, Medicare, FUTA, and SUTA.
- Built payroll `[built]`:

| Employee side               |           | Employer side             |            |
| --------------------------- | --------- | ------------------------- | ---------- |
| Gross pay                   | 10,000    | Gross pay                 | 10,000     |
| Social Security (6.2%)      | (620)     | Social Security (6.2%)    | 620        |
| Medicare (1.45%)            | (145)     | Medicare (1.45%)          | 145        |
| Federal income tax withheld | (1,500)   | FUTA (0.6%)               | 60         |
| Medical insurance withheld  | (200)     | SUTA (5.4%)               | 540        |
| **Net pay**                 | **7,535** | **Total cost of payroll** | **11,365** |

**Result line:** Net pay 7,535 · Employer payroll taxes 1,365 · Total cost 11,365

**Noticed:** "The employee's withholdings came out of the $10,000. The employer's taxes
came on top of it — a second, separate number."

## Secondary instruments

### Warranty accrual

**Instruction:** "Change sales and the warranty rate and watch the liability build before
any repair happens."

- Sales 200,000, estimated warranty cost 4% of sales: expense and liability 8,000 in the
  year of sale. A repair later using 1,500 of parts reduces the liability, not expense.
  `[built]`

**Result line:** Warranty expense 8,000 (year of sale) · Liability after repairs 6,500

**Noticed:** "The expense landed in the year the products were sold, even though the
repairs came later."

### Note payable across year end

**Instruction:** "Drag year end across the note's term and watch the interest split
between two years."

- $12,000, 90-day, 10% note dated Dec 16. Interest 300 total: 50 accrued at Dec 31, 250 in
  the new year. `[built]`

**Result line:** Dec 31 accrued interest 50 · Paid at maturity Mar 16: 12,300

**Noticed:** "Fifteen days of interest belong to December, so they are recorded in
December as a liability."

## Entry drill

`[built]`

| #   | Situation                                                | Debit                                                             | Credit                                                                                                                                                                                   |
| --- | -------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Cash sale of $1,000 with 5% sales tax (price entry only) | Cash 1,050                                                        | Sales 1,000 · Sales taxes payable 50                                                                                                                                                     |
| 2   | Sell 24 games of season tickets for $120,000 in advance  | Cash 120,000                                                      | Unearned ticket revenue 120,000                                                                                                                                                          |
| 3   | Three of the 24 games have been played                   | Unearned ticket revenue 15,000                                    | Ticket revenue 15,000                                                                                                                                                                    |
| 4   | Dec 16: borrow $12,000 on a 90-day, 10% note             | Cash 12,000                                                       | Notes payable 12,000                                                                                                                                                                     |
| 5   | Dec 31: accrue 15 days of interest                       | Interest expense 50                                               | Interest payable 50                                                                                                                                                                      |
| 6   | Mar 16: pay the note and interest                        | Notes payable 12,000 · Interest payable 50 · Interest expense 250 | Cash 12,300                                                                                                                                                                              |
| 7   | Record the $10,000 payroll, employee side                | Salaries expense 10,000                                           | FICA—Social Security taxes payable 620 · FICA—Medicare taxes payable 145 · Employee federal income taxes payable 1,500 · Employee medical insurance payable 200 · Salaries payable 7,535 |
| 8   | Record the employer's payroll taxes                      | Payroll taxes expense 1,365                                       | FICA—Social Security taxes payable 620 · FICA—Medicare taxes payable 145 · FUTA payable 60 · SUTA payable 540                                                                            |
| 9   | Accrue warranty cost at 4% of $200,000 sales             | Warranty expense 8,000                                            | Estimated warranty liability 8,000                                                                                                                                                       |
| 10  | Repair a product under warranty with $1,500 of parts     | Estimated warranty liability 1,500                                | Repair parts inventory 1,500                                                                                                                                                             |

## Classification drill

**Categories:** Known liability · Estimated liability · Contingent — record it ·
Contingent — disclose in notes · No entry, no disclosure

| Item                                                              | Answer                  | Why                                                       |
| ----------------------------------------------------------------- | ----------------------- | --------------------------------------------------------- |
| Amounts owed to suppliers                                         | Known                   | The amount and the creditor are certain.                  |
| Sales taxes collected from customers                              | Known                   | Owed to the government, amount certain.                   |
| Season tickets sold in advance                                    | Known                   | Unearned revenue: the obligation is to deliver the games. |
| Taxes withheld from employees' pay                                | Known                   | Collected and owed to the government.                     |
| The part of a long-term note due next year                        | Known                   | Current portion of long-term debt.                        |
| Warranty repairs on products already sold                         | Estimated               | Certain to arise; amount must be estimated.               |
| Vacation pay employees have earned                                | Estimated               | Owed, but the amount depends on who takes it.             |
| A lawsuit the company will probably lose, amount can be estimated | Contingent — record     | Probable and estimable.                                   |
| A lawsuit the company could reasonably possibly lose              | Contingent — disclose   | Not probable, but not remote.                             |
| A claim with only a remote chance of loss                         | No entry, no disclosure | Remote.                                                   |

## Key terms

Liabilities · Current liabilities · Long-term liabilities · Known liabilities ·
Estimated liabilities · Contingent liability · Accounts payable · Sales taxes payable ·
Unearned revenues · Short-term note payable · Current portion of long-term debt · Payroll
· Gross pay · Net pay · Payroll deductions (withholdings) · Federal Insurance
Contributions Act (FICA) taxes · Social Security taxes · Medicare taxes · Federal income
taxes withheld · Federal Unemployment Tax Act (FUTA) · State Unemployment Tax Act (SUTA)
· Form W-4 · Form W-2 · Form 941 `[book?]` · Payroll register `[book?]` · Employee
earnings report `[book?]` · Employee benefits · Vacation benefits · Bonus plans ·
Warranty · Times interest earned

## Recall

**Rules**

- **FICA is matched by the employer. FUTA and SUTA are not withheld** — the employer
  alone pays them.
- Warranty expense is recorded in the year of the sale, not the year of the repair.
- Contingent liabilities: probable and estimable → record; reasonably possible → disclose;
  remote → nothing.
- Sales tax collected is a liability, never revenue.
- The current portion of long-term debt is a current liability.

**Formulas**

| Formula                                                                                    | Worked                                             |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| Net pay = Gross pay − Withholdings                                                         | 10,000 − 620 − 145 − 1,500 − 200 = 7,535 `[built]` |
| Employer payroll taxes = Employer FICA + FUTA + SUTA                                       | 620 + 145 + 60 + 540 = 1,365 `[built]`             |
| Total cost of payroll = Gross pay + Employer payroll taxes                                 | 10,000 + 1,365 = 11,365 `[built]`                  |
| Interest = Principal × Rate × Time                                                         | 12,000 × 10% × 90/360 = 300 `[built]`              |
| Times interest earned = Income before interest expense and income taxes ÷ Interest expense | 150,000 ÷ 30,000 = 5.0 times `[built]`             |

## Common mistakes

- **Withholding FUTA or SUTA from the employee.** They are employer-only taxes.
- **Treating gross pay as the employer's cost.** The employer's match and unemployment
  taxes come on top.
- **Recording sales tax as revenue.** It belongs to the government.
- **Expensing warranty repairs when they happen.** The expense was estimated at the sale.
- **Recording a reasonably possible loss as a liability.** Disclose it instead.
- **Taxing wages above the Social Security wage base.**

## Anchors

| Figure                                           | Value          | Source    |
| ------------------------------------------------ | -------------- | --------- |
| Net pay                                          | 7,535          | `[built]` |
| Employer payroll taxes                           | 1,365          | `[built]` |
| Total cost of payroll                            | 11,365         | `[built]` |
| Warranty expense / liability after repair        | 8,000 / 6,500  | `[built]` |
| Note interest: total / accrued Dec 31 / new year | 300 / 50 / 250 | `[built]` |
| Times interest earned                            | 5.0            | `[built]` |

---

# Chapter 10 · Long-Term Liabilities

## Home

**One line:** When a company borrows for years, the price investors pay for its bonds
depends on how the bond's interest rate compares with the market's.

**Headline:** An 8% bond sells for **$93,537** when the market wants 10%, and **$107,020**
when it wants 6%. `[built]`

> **Before building:** SPEC-v3 §6 — verify against Richard's copy. Pull the book's discount
> and premium bond examples and decide whether to use them. Confirm whether the chapter
> body uses straight-line or effective interest amortization, and which sits in the
> appendix.

## Hero instrument — Bond price and carrying value

**Instruction:** "Move the market rate above and below the 8% contract rate and watch the
issue price cross par."

- Bond `[built]`: par 100,000, contract rate 8%, interest paid semiannually, 4 years
  (8 periods).
- Top: issue price as the market rate slides from 4% to 12%, with par marked.
- Bottom: carrying value over the 8 periods, walking to 100,000 at maturity.
  Straight-line and effective interest drawn side by side.
- Price = present value of par + present value of the 4,000 semiannual payments, at half
  the market rate. Round to whole dollars.

| Market rate | Issue price | Discount / premium |
| ----------- | ----------- | ------------------ |
| 10%         | 93,537      | Discount 6,463     |
| 8%          | 100,000     | Par                |
| 6%          | 107,020     | Premium 7,020      |

**Result line:** Market 10% → price 93,537 · discount 6,463 · carrying value reaches 100,000 at period 8

**Noticed:** "The cash interest never moved from 4,000. The price adjusted instead, so an
investor still earns the market rate."

## Secondary instruments

### Installment note schedule

**Instruction:** "Step through the payments and watch the interest shrink as the principal
share grows."

- $60,000 note, 8% a year, three equal annual payments of 23,282. `[built]`

| Payment | Interest | Principal | Balance |
| ------- | -------- | --------- | ------- |
| 1       | 4,800    | 18,482    | 41,518  |
| 2       | 3,321    | 19,961    | 21,557  |
| 3       | 1,725    | 21,557    | 0       |

**Result line:** Total paid 69,846 · Total interest 9,846

**Noticed:** "Every payment was the same, but less of each one was interest, because
interest is charged only on what is still owed."

### Early retirement

**Instruction:** "Set the call price and watch the gain or loss against carrying value."

- Bonds with par 100,000 and 4,000 of unamortized discount (carrying value 96,000) called
  at 103. `[built]`

**Result line:** Paid 103,000 − Carrying value 96,000 = Loss on retirement 7,000

**Noticed:** "The loss is measured against carrying value, not par."

## Entry drill

`[built]`. Amounts rounded to whole dollars.

| #   | Situation                                                 | Debit                                                      | Credit                                                 |
| --- | --------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| 1   | Issue 100,000 of 8% bonds at par                          | Cash 100,000                                               | Bonds payable 100,000                                  |
| 2   | Pay six months' interest on bonds issued at par           | Bond interest expense 4,000                                | Cash 4,000                                             |
| 3   | Issue the bonds when the market rate is 10%               | Cash 93,537 · Discount on bonds payable 6,463              | Bonds payable 100,000                                  |
| 4   | First interest payment, straight-line (6,463 ÷ 8)         | Bond interest expense 4,808                                | Discount on bonds payable 808 · Cash 4,000             |
| 5   | First interest payment, effective interest (93,537 × 5%)  | Bond interest expense 4,677                                | Discount on bonds payable 677 · Cash 4,000             |
| 6   | Issue the bonds when the market rate is 6%                | Cash 107,020                                               | Premium on bonds payable 7,020 · Bonds payable 100,000 |
| 7   | First interest payment, effective interest (107,020 × 3%) | Bond interest expense 3,211 · Premium on bonds payable 789 | Cash 4,000                                             |
| 8   | Call bonds at 103 with carrying value 96,000              | Bonds payable 100,000 · Loss on bond retirement 7,000      | Discount on bonds payable 4,000 · Cash 103,000         |
| 9   | Borrow 60,000 on an installment note                      | Cash 60,000                                                | Notes payable 60,000                                   |
| 10  | First annual installment payment                          | Interest expense 4,800 · Notes payable 18,482              | Cash 23,282                                            |

## Classification drill

**Categories:** Sells at a discount · Sells at par · Sells at a premium

| Situation                                                        | Answer   | Why                                                        |
| ---------------------------------------------------------------- | -------- | ---------------------------------------------------------- |
| Contract rate 8%, market rate 10%                                | Discount | The bond pays less than investors want, so they pay less.  |
| Contract rate 8%, market rate 6%                                 | Premium  | The bond pays more than the market, so investors pay more. |
| Contract rate 8%, market rate 8%                                 | Par      | Rates match.                                               |
| Bond quoted at 97                                                | Discount | 97% of par.                                                |
| Bond quoted at 103½                                              | Premium  | Above 100% of par.                                         |
| Market rates rose between printing the bonds and selling them    | Discount | The fixed contract rate now falls short.                   |
| Interest expense each period is more than the cash interest paid | Discount | Discount amortization adds to interest expense.            |
| Interest expense each period is less than the cash interest paid | Premium  | Premium amortization reduces interest expense.             |

## Key terms

Bond · Par value (face amount) · Contract rate (coupon rate) · Market rate · Bond
indenture · Bond certificate · Discount on bonds payable · Premium on bonds payable ·
Carrying (book) value of bonds · Straight-line bond amortization · Effective interest
method · Callable bonds · Convertible bonds · Secured bonds · Unsecured bonds
(debentures) · Term bonds · Serial bonds · Registered bonds · Bearer bonds · Sinking fund
bonds · Installment note · Mortgage · Present value · Annuity · Lease `[book?]` ·
Pension plan `[book?]` · Debt-to-equity ratio

## Recall

**Rules**

- **Market above contract → discount. Market below contract → premium.**
- **Discount amortization increases interest expense;** premium amortization decreases
  it.
- Cash interest is always par × contract rate × time, whatever the price.
- Semiannual bonds: halve the rate, double the periods.
- Discount on bonds payable is a contra liability. Premium is an adjunct liability.

**Formulas**

| Formula                                                                        | Worked                                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Cash interest = Par × Contract rate × Time                                     | 100,000 × 8% × 6/12 = 4,000 `[built]`                         |
| Bond price = PV of par + PV of interest payments (at the market rate)          | 100,000 × 0.67684 + 4,000 × 6.46321 = 93,537 at 10% `[built]` |
| Carrying value = Par − Unamortized discount (or + Unamortized premium)         | 100,000 − 6,463 = 93,537 `[built]`                            |
| Straight-line amortization = Discount ÷ Number of periods                      | 6,463 ÷ 8 = 808 `[built]`                                     |
| Effective interest expense = Beginning carrying value × Market rate per period | 93,537 × 5% = 4,677 `[built]`                                 |
| Gain or loss on retirement = Carrying value − Retirement price                 | 96,000 − 103,000 = 7,000 loss `[built]`                       |
| Installment interest = Beginning balance × Rate                                | 60,000 × 8% = 4,800 `[built]`                                 |
| Debt-to-equity = Total liabilities ÷ Total equity                              | 300,000 ÷ 200,000 = 1.5 `[built]`                             |

## Common mistakes

- **Discounting with the contract rate.** The market rate prices the bond.
- **Using the annual rate and years for semiannual bonds.** 5% for 8 periods, not 10% for 4.
- **Treating Discount on bonds payable as an asset.** It is subtracted from the liability.
- **Computing cash interest on carrying value.** Cash interest is on par.
- **Measuring a retirement gain or loss against par.** Use carrying value.
- **Sending the whole installment payment to interest,** or all of it to principal.

## Anchors

| Figure                                                                                            | Value                      | Source    |
| ------------------------------------------------------------------------------------------------- | -------------------------- | --------- |
| Issue price at 10% / 8% / 6%                                                                      | 93,537 / 100,000 / 107,020 | `[built]` |
| Semiannual cash interest                                                                          | 4,000                      | `[built]` |
| First-period interest expense: effective, discount / straight-line, discount / effective, premium | 4,677 / 4,808 / 3,211      | `[built]` |
| Installment payment                                                                               | 23,282                     | `[built]` |
| Total interest on installment note                                                                | 9,846                      | `[built]` |
| Loss on retirement                                                                                | 7,000                      | `[built]` |
| Invariant: carrying value at maturity                                                             | 100,000                    | derived   |

---

# Chapter 11 · Equity

## Home

**One line:** What shareholders own, and how issuing shares, paying dividends, buying
shares back, and splitting stock each change it — or only rearrange it.

**Headline:** **Cash dividends and buybacks shrink equity. Stock dividends and splits only
rearrange it.**

> **Before building:** SPEC-v3 §6 — verify against Richard's copy. Confirm whether the book
> debits Retained earnings or a Dividends account when a corporation declares a dividend,
> and its cutoff between small and large stock dividends `[book?]`. Include the statement
> of stockholders' equity — commonly skipped, commonly tested.

## Hero instrument — Equity composition

**Instruction:** "Issue stock, declare a dividend, buy back shares, split the stock — and
watch which parts of equity move and whether the total does."

Built company `[built]`, starting equity: common stock, $10 par, 10,000 shares 100,000;
paid-in capital in excess of par 50,000; retained earnings 200,000; total 350,000.

| Action, in order                                 | Common stock | Paid-in capital in excess of par | Paid-in capital, treasury | Retained earnings | Treasury stock | Total equity |
| ------------------------------------------------ | ------------ | -------------------------------- | ------------------------- | ----------------- | -------------- | ------------ |
| Start                                            | 100,000      | 50,000                           | 0                         | 200,000           | 0              | 350,000      |
| Issue 1,000 shares at $25                        | 110,000      | 65,000                           | 0                         | 200,000           | 0              | 375,000      |
| Declare $1 a share cash dividend (11,000 shares) | 110,000      | 65,000                           | 0                         | 189,000           | 0              | 364,000      |
| 10% stock dividend, 1,100 shares at $30 market   | 121,000      | 87,000                           | 0                         | 156,000           | 0              | 364,000      |
| Buy 500 treasury shares at $28                   | 121,000      | 87,000                           | 0                         | 156,000           | (14,000)       | 350,000      |
| Reissue 200 treasury shares at $32               | 121,000      | 87,000                           | 800                       | 156,000           | (8,400)        | 356,400      |
| 2-for-1 split: 24,200 shares at $5 par           | 121,000      | 87,000                           | 800                       | 156,000           | (8,400)        | 356,400      |

- The stock dividend row shows the distributable balance passing through common stock
  once the shares are issued.

**Result line:** Total equity 356,400 · Shares issued 24,200 at $5 par

**Noticed:** "The stock dividend and the split never changed the total. The cash dividend
and the buyback did — declaring the dividend created a liability, and the buyback sent cash
to former shareholders."

## Secondary instruments

### Preferred dividend allocator

**Instruction:** "Set the dividend declared and watch cumulative preferred take its share
first."

- 1,000 shares of 8%, $100 par preferred (8,000 a year); 50,000 common shares. `[built]`
- Year 1 declares 5,000: preferred 5,000, common 0, arrears 3,000.
- Year 2 declares 20,000: cumulative → preferred 11,000, common 9,000. Noncumulative →
  preferred 8,000, common 12,000.

**Result line:** Year 2, cumulative — preferred 11,000 · common 9,000

**Noticed:** "The missed 3,000 came back to preferred before common saw anything. Arrears
are not a liability until the board declares them."

### Statement of stockholders' equity

**Instruction:** "Post each equity event into its column and watch the ending balances
reconcile to the balance sheet."

- Uses the hero's events plus net income of 60,000 for the year. `[built]`

**Result line:** Ending retained earnings 216,000 · Ending total equity 416,400

**Noticed:** "Every column starts with last year's balance sheet and ends with this year's.
Net income is only one row."

## Entry drill

`[built]`

| #   | Situation                                                       | Debit                                            | Credit                                                                                                   |
| --- | --------------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| 1   | Issue 1,000 shares of $10 par common for $25 cash               | Cash 25,000                                      | Common stock 10,000 · Paid-in capital in excess of par value, common stock 15,000                        |
| 2   | Issue 1,000 no-par, no-stated-value shares for $25 cash         | Cash 25,000                                      | Common stock 25,000                                                                                      |
| 3   | Issue 1,000 shares of $10 par common for land worth $30,000     | Land 30,000                                      | Common stock 10,000 · Paid-in capital in excess of par value, common stock 20,000                        |
| 4   | Declare an $11,000 cash dividend                                | Retained earnings 11,000                         | Common dividend payable 11,000                                                                           |
| 5   | Pay the dividend                                                | Common dividend payable 11,000                   | Cash 11,000                                                                                              |
| 6   | Declare a 10% stock dividend: 1,100 shares, $10 par, $30 market | Retained earnings 33,000                         | Common stock dividend distributable 11,000 · Paid-in capital in excess of par value, common stock 22,000 |
| 7   | Distribute the stock dividend                                   | Common stock dividend distributable 11,000       | Common stock 11,000                                                                                      |
| 8   | Buy 500 treasury shares at $28                                  | Treasury stock, common 14,000                    | Cash 14,000                                                                                              |
| 9   | Reissue 200 treasury shares at $32                              | Cash 6,400                                       | Treasury stock, common 5,600 · Paid-in capital, treasury stock 800                                       |
| 10  | Reissue 100 more treasury shares at $20                         | Cash 2,000 · Paid-in capital, treasury stock 800 | Treasury stock, common 2,800                                                                             |
| 11  | 2-for-1 stock split                                             | No entry                                         | Memo: par halves, shares double                                                                          |

## Classification drill

**Categories:** Total equity goes up · Total equity goes down · No change

| Event                                  | Answer    | Why                                                              |
| -------------------------------------- | --------- | ---------------------------------------------------------------- |
| Issue common stock for cash            | Up        | Owners put in assets.                                            |
| Declare a cash dividend                | Down      | Retained earnings falls and a liability appears.                 |
| Pay a cash dividend already declared   | No change | A liability and cash fall together.                              |
| Declare a small stock dividend         | No change | Retained earnings moves into paid-in capital.                    |
| Stock split                            | No change | More shares, lower par, same dollars.                            |
| Buy treasury stock                     | Down      | Cash goes out to former owners; treasury stock is contra equity. |
| Reissue treasury stock above cost      | Up        | Cash comes back in.                                              |
| Date of record for a declared dividend | No change | No entry; it only fixes who gets paid.                           |
| Net income for the year                | Up        | It is closed into retained earnings.                             |

## Key terms

Corporation · Stockholders (shareholders) · Stock certificate · Proxy · Preemptive right
· Authorized stock · Issued stock · Outstanding stock · Par value · No-par value stock ·
Stated value stock · Minimum legal capital · Paid-in capital · Paid-in capital in excess
of par value · Common stock · Preferred stock · Cumulative preferred stock ·
Noncumulative preferred stock · Participating preferred stock · Dividend in arrears ·
Convertible preferred stock · Callable preferred stock · Call price · Date of
declaration · Date of record · Date of payment · Stock dividend · Small stock dividend ·
Large stock dividend · Stock split · Treasury stock · Retained earnings · Retained
earnings deficit · Restricted retained earnings · Appropriated retained earnings · Prior
period adjustments · Statement of stockholders' equity · Earnings per share ·
Price-earnings ratio · Dividend yield · Book value per share

## Recall

**Rules**

- Treasury stock is contra equity. Treasury transactions never create gains or losses on
  the income statement.
- Common stock is credited at par (or stated value). The rest goes to paid-in capital.
- Dividend dates: declaration (entry, liability), record (no entry), payment (entry).
- A small stock dividend is recorded at market value; a large one at par `[book?]` for the
  cutoff.
- Dividends in arrears are disclosed, not recorded, until declared.

**Formulas**

| Formula                                                                                              | Worked                                         |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Earnings per share = (Net income − Preferred dividends) ÷ Weighted-average common shares outstanding | (108,000 − 8,000) ÷ 50,000 = 2.00 `[built]`    |
| Price-earnings ratio = Market price per share ÷ Earnings per share                                   | 30 ÷ 2.00 = 15.0 `[built]`                     |
| Dividend yield = Annual cash dividends per share ÷ Market price per share                            | 0.60 ÷ 30 = 2.0% `[built]`                     |
| Book value per common share = (Total equity − Preferred equity) ÷ Common shares outstanding          | (700,000 − 100,000) ÷ 50,000 = 12.00 `[built]` |
| Stock dividend amount (small) = Shares distributed × Market price                                    | 1,100 × 30 = 33,000 `[built]`                  |

## Common mistakes

- **A gain on reissuing treasury stock.** The excess goes to paid-in capital, never to the
  income statement.
- **Crediting Common stock for the full price.** Only par goes there.
- **A journal entry for a stock split.** There is none.
- **Recording preferred arrears as a liability.** Not until declared.
- **Valuing a small stock dividend at par.** It is at market value.
- **Counting treasury shares as outstanding** in earnings per share or book value per
  share.

## Anchors

| Figure                                                      | Value                                                     | Source    |
| ----------------------------------------------------------- | --------------------------------------------------------- | --------- |
| Total equity after each hero action                         | 375,000 · 364,000 · 364,000 · 350,000 · 356,400 · 356,400 | `[built]` |
| Ending retained earnings, hero                              | 156,000                                                   | `[built]` |
| Preferred / common, year 2, cumulative                      | 11,000 / 9,000                                            | `[built]` |
| Preferred / common, year 2, noncumulative                   | 8,000 / 12,000                                            | `[built]` |
| Statement of stockholders' equity: ending RE / total equity | 216,000 / 416,400                                         | `[built]` |
| EPS / P/E / dividend yield / book value per share           | 2.00 / 15.0 / 2.0% / 12.00                                | `[built]` |

---

# Chapter 12 · Reporting Cash Flows

## Home

**One line:** Profit and cash are not the same number. This statement walks from one to
the other and sorts every cash movement into operating, investing, or financing.

**Headline:** Net income **$38,000**. Cash from operations **$20,000**. `[book?]`

> **Operating section confirmed `[book]`.** A reproduction of the book's own Genesis
> statement lists net income 38,000, gain on retirement of notes (16,000), loss on sale of
> plant assets 6,000, depreciation 24,000, accounts receivable (20,000), inventory (14,000)
> and the rest exactly as below, with net cash provided by operating activities of 20,000
> and net cash used by financing activities of 17,000.
>
> **Still to confirm:** the investing section. This brief shows investing as a net inflow
> of 2,000 (12,000 in from the sale, 10,000 out for the purchase), which is what makes the
> net change in cash 5,000 and carries cash from 12,000 to 17,000; one secondary source
> calls investing a 2,000 outflow instead. Check the investing lines and the cash balances
> in Richard's copy, and confirm the book's free cash flow definition `[book?]`.

## Hero instrument — Indirect-method waterfall

**Instruction:** "Switch on each adjustment and walk net income down to cash from operating
activities."

Genesis `[book?]`:

| Step                                       | Amount   | Running |
| ------------------------------------------ | -------- | ------- |
| Net income                                 | 38,000   | 38,000  |
| Add depreciation expense                   | 24,000   | 62,000  |
| Add loss on sale of plant assets           | 6,000    | 68,000  |
| Subtract gain on retirement of notes       | (16,000) | 52,000  |
| Subtract increase in accounts receivable   | (20,000) | 32,000  |
| Subtract increase in merchandise inventory | (14,000) | 18,000  |
| Subtract increase in prepaid expenses      | (2,000)  | 16,000  |
| Subtract decrease in accounts payable      | (5,000)  | 11,000  |
| Subtract decrease in interest payable      | (1,000)  | 10,000  |
| Add increase in income taxes payable       | 10,000   | 20,000  |

- Each step is a toggle. Off, the running total skips it and the result line shows how far
  from 20,000 it is.
- Each step names its reason in one line: "Receivables rose — sales were recorded that
  have not come in as cash."

**Result line:** Net cash provided by operating activities 20,000

**Noticed:** "Every current asset that went up pulled cash down, and every current
liability that went up held cash back from leaving."

## Secondary instruments

### Direct versus indirect

**Instruction:** "Flip between the direct and indirect methods and watch both land on
$20,000."

Direct method, Genesis `[book?]`:

| Line                                             | Built from                                                         | Amount     |
| ------------------------------------------------ | ------------------------------------------------------------------ | ---------- |
| Cash received from customers                     | Sales 590,000 − increase in receivables 20,000                     | 570,000    |
| Cash paid for merchandise                        | COGS 300,000 + inventory increase 14,000 + payables decrease 5,000 | (319,000)  |
| Cash paid for wages and other operating expenses | 216,000 + prepaid increase 2,000                                   | (218,000)  |
| Cash paid for interest                           | 7,000 + interest payable decrease 1,000                            | (8,000)    |
| Cash paid for taxes                              | 15,000 − taxes payable increase 10,000                             | (5,000)    |
| **Net cash from operating activities**           |                                                                    | **20,000** |

**Result line:** Direct 20,000 = Indirect 20,000

**Noticed:** "Depreciation, the loss, and the gain never appear in the direct method. They
were not cash, so there is nothing to undo."

### Balance sheet change reader

**Instruction:** "Nudge a current asset or liability up or down and watch the sign of its
adjustment flip."

- Four accounts: accounts receivable, inventory, accounts payable, income taxes payable.
- A 1,000 increase in each, then a 1,000 decrease, with the cash effect shown. `[built]`

**Result line:** Asset up → subtract · Liability up → add

**Noticed:** "Asset up used cash; liability up saved cash. The rule is the same for every
account on the list."

## Entry drill

Statement-line form: the student produces the section, the direction, and the amount.
Genesis `[book?]`.

| #   | Fact                                                              | Section             | Line                                     |
| --- | ----------------------------------------------------------------- | ------------------- | ---------------------------------------- |
| 1   | Depreciation expense 24,000                                       | Operating           | +24,000                                  |
| 2   | Loss on sale of plant assets 6,000                                | Operating           | +6,000                                   |
| 3   | Gain on retirement of notes 16,000                                | Operating           | −16,000                                  |
| 4   | Accounts receivable rose 20,000                                   | Operating           | −20,000                                  |
| 5   | Merchandise inventory rose 14,000                                 | Operating           | −14,000                                  |
| 6   | Prepaid expenses rose 2,000                                       | Operating           | −2,000                                   |
| 7   | Accounts payable fell 5,000                                       | Operating           | −5,000                                   |
| 8   | Interest payable fell 1,000                                       | Operating           | −1,000                                   |
| 9   | Income taxes payable rose 10,000                                  | Operating           | +10,000                                  |
| 10  | Sold plant assets for 12,000 cash                                 | Investing           | +12,000                                  |
| 11  | Bought plant assets costing 70,000: 10,000 cash and a 60,000 note | Investing · Noncash | −10,000 · 60,000 in the noncash schedule |
| 12  | Issued common stock for 15,000 cash                               | Financing           | +15,000                                  |
| 13  | Paid 18,000 cash to retire notes                                  | Financing           | −18,000                                  |
| 14  | Paid 14,000 cash dividends                                        | Financing           | −14,000                                  |

## Classification drill

**Categories:** Operating · Investing · Financing · Noncash investing and financing

| Item                                           | Answer    | Why                                                             |
| ---------------------------------------------- | --------- | --------------------------------------------------------------- |
| Cash collected from customers                  | Operating | The main business.                                              |
| Interest received on a loan to another company | Operating | Under U.S. GAAP, interest and dividends received are operating. |
| Interest paid on a bank loan                   | Operating | Interest paid is operating; the principal is financing.         |
| Income taxes paid                              | Operating | A cost of running the business.                                 |
| Purchase of equipment for cash                 | Investing | Buying a long-term asset.                                       |
| Sale of a long-term investment                 | Investing | Selling a long-term asset.                                      |
| Lending money to another company               | Investing | A loan made is an investment.                                   |
| Collecting the principal of that loan          | Investing | Getting the investment back.                                    |
| Issuing bonds for cash                         | Financing | Raising money from lenders.                                     |
| Buying treasury stock                          | Financing | Paying owners.                                                  |
| Paying dividends                               | Financing | Paying owners.                                                  |
| Buying land by signing a note                  | Noncash   | No cash moved; disclose it.                                     |
| Converting bonds into common stock             | Noncash   | No cash moved; disclose it.                                     |

## Key terms

Statement of cash flows · Cash · Cash equivalents · Operating activities · Investing
activities · Financing activities · Noncash investing and financing activities · Direct
method · Indirect method · Reconciliation (of net income to operating cash flow) ·
Operating items not providing or using cash · Nonoperating gains and losses · Changes in
current operating assets and liabilities · Free cash flow · Cash flow on total assets ·
Spreadsheet (work sheet) method `[book?]`

## Recall

**Rules**

- **Add back non-cash expenses; subtract investing and financing gains, add back their
  losses.**
- **Asset up used cash; liability up saved cash.**
- Interest paid, interest received, and dividends received are operating under U.S.
  GAAP. Dividends paid are financing.
- Proceeds from a sale go in investing at the cash amount, not at the gain or loss.
- Noncash investing and financing activities are disclosed, not included in the totals.

**Formulas**

| Formula                                                                                                                                           | Worked                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Operating cash flow (indirect) = Net income + Non-cash expenses + Losses − Gains − Increases in current assets + Increases in current liabilities | 38,000 + 24,000 + 6,000 − 16,000 − 36,000 + 4,000 = 20,000 `[book?]` |
| Cash received from customers = Sales − Increase in accounts receivable                                                                            | 590,000 − 20,000 = 570,000 `[book?]`                                 |
| Net change in cash = Operating + Investing + Financing                                                                                            | 20,000 + 2,000 − 17,000 = 5,000 `[book?]`                            |
| Ending cash = Beginning cash + Net change                                                                                                         | 12,000 + 5,000 = 17,000 `[book?]`                                    |
| Free cash flow = Operating cash flow − Capital expenditures                                                                                       | 20,000 − 10,000 = 10,000 `[book?]`                                   |
| Cash flow on total assets = Operating cash flow ÷ Average total assets                                                                            | 20,000 ÷ 200,000 = 10.0% `[built]`                                   |

The −36,000 is receivables, inventory, and prepaids (20,000 + 14,000 + 2,000). The +4,000
is taxes payable up 10,000 less payables down 5,000 and interest payable down 1,000.

## Common mistakes

- **Adding an increase in accounts receivable.** Sales were recorded that are not cash yet —
  subtract it.
- **Listing the gain as the investing inflow.** Investing shows the 12,000 received;
  operating removes the gain or adds back the loss.
- **Putting dividends paid in operating.** They are financing.
- **Putting the 60,000 note in investing.** No cash moved; it goes in the noncash
  schedule.
- **Adding depreciation in the direct method.** It never appears there.
- **Counting a cash-equivalent purchase as investing.** Cash equivalents are cash.

## Anchors

| Figure                                | Value                                                                           | Source    |
| ------------------------------------- | ------------------------------------------------------------------------------- | --------- |
| Net income                            | 38,000                                                                          | `[book?]` |
| Net cash from operating activities    | 20,000                                                                          | `[book?]` |
| Net cash from investing activities    | 2,000                                                                           | `[book?]` |
| Net cash used by financing activities | (17,000)                                                                        | `[book?]` |
| Net increase in cash                  | 5,000                                                                           | `[book?]` |
| Cash, beginning → ending              | 12,000 → 17,000                                                                 | `[book?]` |
| Direct-method lines                   | 570,000 · (319,000) · (218,000) · (8,000) · (5,000)                             | `[book?]` |
| Noncash investing and financing       | 60,000 note for plant assets                                                    | `[book?]` |
| Invariant: income statement ties      | 590,000 − 300,000 − 216,000 − 7,000 − 15,000 − 24,000 − 6,000 + 16,000 = 38,000 | derived   |
| Invariant: direct = indirect          | 20,000                                                                          | derived   |

---

# Chapter 13 · Analysis of Financial Statements

## Home

**One line:** The same statements read three ways — change over time, share of a total,
and ratios — to judge liquidity, solvency, profitability, and market prospects.

**Headline:** Sales grew **20%**. Net income grew **33%**. The statements show why.
`[built]`

> **Before building:** Richard's copy uses real companies for its examples `[book?]`. Keep
> the built company below for the instruments so every number ties, and cite the book's
> companies in Learn prose only with the book's own figures. Confirm the book's four
> building blocks and which block each ratio sits in.

Built company, two years `[built]`:

| Income statement       | 2026    | 2025    |
| ---------------------- | ------- | ------- |
| Net sales              | 600,000 | 500,000 |
| Cost of goods sold     | 360,000 | 290,000 |
| Gross profit           | 240,000 | 210,000 |
| Operating expenses     | 150,000 | 140,000 |
| Income from operations | 90,000  | 70,000  |
| Interest expense       | 10,000  | 10,000  |
| Income before taxes    | 80,000  | 60,000  |
| Income tax expense     | 20,000  | 15,000  |
| Net income             | 60,000  | 45,000  |

| Balance sheet, Dec 31                | 2026    | 2025    |
| ------------------------------------ | ------- | ------- |
| Cash                                 | 40,000  | 30,000  |
| Short-term investments               | 10,000  | 10,000  |
| Accounts receivable                  | 70,000  | 50,000  |
| Merchandise inventory                | 90,000  | 70,000  |
| Prepaid expenses                     | 10,000  | 10,000  |
| Total current assets                 | 220,000 | 170,000 |
| Plant assets, net                    | 380,000 | 330,000 |
| Total assets                         | 600,000 | 500,000 |
| Current liabilities                  | 110,000 | 80,000  |
| Long-term debt                       | 140,000 | 120,000 |
| Total liabilities                    | 250,000 | 200,000 |
| Common stock, $10 par, 20,000 shares | 200,000 | 200,000 |
| Retained earnings                    | 150,000 | 100,000 |
| Total equity                         | 350,000 | 300,000 |
| Total liabilities and equity         | 600,000 | 500,000 |

Dividends 2026: 10,000 (0.50 a share). Market price at Dec 31, 2026: $45.

## Hero instrument — Three lenses

**Instruction:** "Switch the lens from dollars to year-over-year change to common-size and
watch the same statements tell a different story."

- Lens 1, dollars: the statements above.
- Lens 2, horizontal: dollar and percent change, 2025 as base. Net sales +20.0%, cost of
  goods sold +24.1%, gross profit +14.3%, operating expenses +7.1%, net income +33.3%.
- Lens 3, vertical (common-size): income statement as a percent of net sales, balance sheet
  as a percent of total assets. Cost of goods sold 58.0% → 60.0%; operating expenses 28.0%
  → 25.0%; net income 9.0% → 10.0%.
- The row that tells the story is highlighted in each lens.

**Result line:** Gross margin fell from 42.0% to 40.0% · operating expenses fell from 28.0% to 25.0% of sales · net margin rose to 10.0%

**Noticed:** "Cost of goods sold grew faster than sales, so each sale earned less gross
profit. Net income still rose because operating expenses barely grew."

## Secondary instruments

### Ratio builder

**Instruction:** "Pick a ratio and click the two statement lines it is built from."

- Every ratio in Recall. Correct lines lock in and the ratio computes; averages ask for
  both years.

**Result line:** Current ratio = 220,000 ÷ 110,000 = 2.0

**Noticed:** "Turnover ratios and returns needed two balance sheets — they divide a whole
year's flow by an average."

### Return on assets, taken apart

**Instruction:** "Drag profit margin or total asset turnover and watch return on assets
move."

- Return on assets = profit margin × total asset turnover: 10.0% × 1.09 = 10.9%.
  `[built]`

**Result line:** 10.0% × 1.09 = 10.9%

**Noticed:** "A company can earn the same return with thin margins and fast turnover or
fat margins and slow turnover."

## Entry drill

Computation form: this chapter has no journal entries. The student produces the number.
All `[built]`, 2026.

| #   | Prompt                                | Answer     |
| --- | ------------------------------------- | ---------- |
| 1   | Percent change in net sales           | +20.0%     |
| 2   | Common-size cost of goods sold        | 60.0%      |
| 3   | Working capital                       | 110,000    |
| 4   | Current ratio                         | 2.0        |
| 5   | Acid-test ratio                       | 1.09       |
| 6   | Accounts receivable turnover          | 10.0 times |
| 7   | Days' sales uncollected               | 42.6 days  |
| 8   | Inventory turnover                    | 4.5 times  |
| 9   | Days' sales in inventory              | 91.3 days  |
| 10  | Total asset turnover                  | 1.09 times |
| 11  | Debt ratio                            | 41.7%      |
| 12  | Equity ratio                          | 58.3%      |
| 13  | Debt-to-equity ratio                  | 0.71       |
| 14  | Times interest earned                 | 9.0 times  |
| 15  | Profit margin                         | 10.0%      |
| 16  | Gross margin ratio                    | 40.0%      |
| 17  | Return on total assets                | 10.9%      |
| 18  | Return on common stockholders' equity | 18.5%      |
| 19  | Earnings per share                    | 3.00       |
| 20  | Book value per common share           | 17.50      |
| 21  | Price-earnings ratio                  | 15.0       |
| 22  | Dividend yield                        | 1.1%       |

## Classification drill

**Categories:** Liquidity and efficiency · Solvency · Profitability · Market prospects
`[book?]` — confirm the book's names and placements.

| Ratio                                 | Answer                   | Why                                            |
| ------------------------------------- | ------------------------ | ---------------------------------------------- |
| Current ratio                         | Liquidity and efficiency | Can current assets cover current liabilities?  |
| Acid-test ratio                       | Liquidity and efficiency | The same, using only quick assets.             |
| Accounts receivable turnover          | Liquidity and efficiency | How fast receivables become cash.              |
| Inventory turnover                    | Liquidity and efficiency | How fast inventory sells.                      |
| Days' sales uncollected               | Liquidity and efficiency | Receivables measured in days.                  |
| Total asset turnover                  | Liquidity and efficiency | How hard the assets work to produce sales.     |
| Debt ratio                            | Solvency                 | How much of the assets creditors financed.     |
| Equity ratio                          | Solvency                 | How much owners financed.                      |
| Debt-to-equity ratio                  | Solvency                 | Creditor financing against owner financing.    |
| Times interest earned                 | Solvency                 | Can earnings cover interest?                   |
| Profit margin                         | Profitability            | Profit per sales dollar.                       |
| Gross margin ratio                    | Profitability            | Gross profit per sales dollar.                 |
| Return on total assets                | Profitability            | Profit per dollar of assets.                   |
| Return on common stockholders' equity | Profitability            | Profit per dollar of common equity.            |
| Price-earnings ratio                  | Market prospects         | What the market pays for a dollar of earnings. |
| Dividend yield                        | Market prospects         | Cash return on the share price.                |

## Key terms

Financial statement analysis · General-purpose financial statements · Building blocks of
analysis · Liquidity and efficiency · Solvency · Profitability · Market prospects ·
Standards for comparison (intracompany, competitor, industry, guidelines) · Horizontal
analysis · Comparative financial statements · Trend analysis · Vertical analysis ·
Common-size financial statements · Ratio analysis · Working capital · Equity ratio ·
Financial leverage · Analysis report · Discontinued segments `[book?]` · Other
comprehensive income `[book?]`

## Recall

**Rules**

- Horizontal analysis compares across years; vertical analysis compares within one year.
- Common-size base: net sales for the income statement, total assets for the balance
  sheet.
- Turnovers and returns use averages; point-in-time ratios use year-end balances.
- A percent change cannot be computed when the base year is zero or negative.
- A higher current ratio is not always better: idle cash and slow inventory raise it too.

**Formulas**

| Formula                                                                                            | Worked (2026)                 |
| -------------------------------------------------------------------------------------------------- | ----------------------------- |
| Dollar change = Analysis period − Base period                                                      | 600,000 − 500,000 = 100,000   |
| Percent change = Dollar change ÷ Base period × 100                                                 | 100,000 ÷ 500,000 = 20.0%     |
| Common-size percent = Analysis amount ÷ Base amount × 100                                          | 360,000 ÷ 600,000 = 60.0%     |
| Trend percent = Analysis period amount ÷ Base period amount × 100                                  | 600,000 ÷ 500,000 = 120       |
| Working capital = Current assets − Current liabilities                                             | 220,000 − 110,000 = 110,000   |
| Current ratio = Current assets ÷ Current liabilities                                               | 220,000 ÷ 110,000 = 2.0       |
| Acid-test ratio = (Cash + Short-term investments + Current receivables) ÷ Current liabilities      | 120,000 ÷ 110,000 = 1.09      |
| Accounts receivable turnover = Net sales ÷ Average accounts receivable                             | 600,000 ÷ 60,000 = 10.0       |
| Days' sales uncollected = Accounts receivable ÷ Net sales × 365                                    | 70,000 ÷ 600,000 × 365 = 42.6 |
| Inventory turnover = Cost of goods sold ÷ Average inventory                                        | 360,000 ÷ 80,000 = 4.5        |
| Days' sales in inventory = Ending inventory ÷ Cost of goods sold × 365                             | 90,000 ÷ 360,000 × 365 = 91.3 |
| Total asset turnover = Net sales ÷ Average total assets                                            | 600,000 ÷ 550,000 = 1.09      |
| Debt ratio = Total liabilities ÷ Total assets                                                      | 250,000 ÷ 600,000 = 41.7%     |
| Equity ratio = Total equity ÷ Total assets                                                         | 350,000 ÷ 600,000 = 58.3%     |
| Debt-to-equity = Total liabilities ÷ Total equity                                                  | 250,000 ÷ 350,000 = 0.71      |
| Times interest earned = Income before interest expense and income taxes ÷ Interest expense         | 90,000 ÷ 10,000 = 9.0         |
| Profit margin = Net income ÷ Net sales                                                             | 60,000 ÷ 600,000 = 10.0%      |
| Gross margin ratio = (Net sales − Cost of goods sold) ÷ Net sales                                  | 240,000 ÷ 600,000 = 40.0%     |
| Return on total assets = Net income ÷ Average total assets                                         | 60,000 ÷ 550,000 = 10.9%      |
| Return on common stockholders' equity = (Net income − Preferred dividends) ÷ Average common equity | 60,000 ÷ 325,000 = 18.5%      |
| Earnings per share = (Net income − Preferred dividends) ÷ Weighted-average common shares           | 60,000 ÷ 20,000 = 3.00        |
| Book value per common share = Common equity ÷ Common shares outstanding                            | 350,000 ÷ 20,000 = 17.50      |
| Price-earnings ratio = Market price per share ÷ Earnings per share                                 | 45 ÷ 3.00 = 15.0              |
| Dividend yield = Annual cash dividends per share ÷ Market price per share                          | 0.50 ÷ 45 = 1.1%              |

## Common mistakes

- **Dividing the change by the analysis year.** Percent change divides by the base year.
- **A percent change off a zero or negative base.** It is not meaningful; say so.
- **Year-end balances in a turnover.** Turnovers and returns use averages.
- **Net income on top of times interest earned.** Add back interest and taxes first.
- **Common-sizing the balance sheet on net sales.** The base is total assets.
- **Inventory in the acid-test ratio.** Quick assets only.

## Anchors

| Figure                                                             | Value                               | Source    |
| ------------------------------------------------------------------ | ----------------------------------- | --------- |
| Every drill answer above                                           | as listed                           | `[built]` |
| Invariant: assets = liabilities + equity, both years               | 600,000 · 500,000                   | derived   |
| Invariant: retained earnings roll forward                          | 100,000 + 60,000 − 10,000 = 150,000 | derived   |
| Invariant: return on assets = profit margin × total asset turnover | 10.9%                               | derived   |
