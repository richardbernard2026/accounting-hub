<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 08 · Long-Term Assets

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
