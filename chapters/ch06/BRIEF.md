<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 06 · Cash, Fraud, and Internal Control

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
