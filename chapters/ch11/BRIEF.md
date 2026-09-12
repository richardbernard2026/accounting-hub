<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 11 · Equity

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
