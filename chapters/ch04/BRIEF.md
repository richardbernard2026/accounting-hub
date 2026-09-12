<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 04 · Merchandising Operations

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

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
