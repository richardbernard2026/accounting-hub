<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 03 · Adjusting Accounts

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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

## Conventions

### Where every number comes from

Every figure carries one of four tags. Nothing untagged is a number.

| Tag        | Meaning                                                                                                                                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[ledger]` | Derived from the FastForward entries in `src/lib/content/chapters/fastforward.ts`. Chapter 3's are already asserted in CI.                                                                                                                    |
| `[book]`   | Wild's own figures, confirmed against the book's exhibit as reproduced outside the book — a lecture deck or a quoted problem. Build on these; one glance at Richard's copy is still worth it.                                                 |
| `[book?]`  | Wild's example reconstructed without the book open and not yet confirmed anywhere. **Check it against Richard's copy before building the chapter.** If the book differs, the book wins: change the data, re-run validation, update this file. |
| `[built]`  | Built for the site. Internally consistent, recomputed, but not Wild's. Never present it as the book's example. Invented company names are fine; Wild's company names are not used for built numbers.                                          |

### Rules that apply to every chapter

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
