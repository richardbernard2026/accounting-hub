<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 07 · Receivables

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
