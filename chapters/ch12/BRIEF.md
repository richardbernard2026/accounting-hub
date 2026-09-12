<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 12 · Reporting Cash Flows

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
