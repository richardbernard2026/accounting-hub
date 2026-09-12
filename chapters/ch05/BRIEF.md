<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 05 · Inventories and Cost of Sales

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
