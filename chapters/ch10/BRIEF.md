<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 10 · Long-Term Liabilities

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
