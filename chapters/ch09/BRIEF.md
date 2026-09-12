<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 09 · Current Liabilities

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
