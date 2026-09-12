<!-- Generated from chapters/CHAPTER-BRIEFS.md by scripts/split-briefs.mjs. Edit the master, then re-split. -->

# Chapter 02 · Business Transactions

Read with `SPEC-v3.md`. Number tags (`[ledger]`, `[book]`, `[book?]`, `[built]`) and the rules for every chapter are at the foot of this file.

## Home

**One line:** Every transaction is recorded twice — a debit and a credit — and sixteen
FastForward entries show why the books stay in balance.

**Headline:** Sixteen entries. **Debits $45,300 = Credits $45,300.** `[ledger]`

> **Settled: the totals are 42,470 and 33,270.** A Wild lecture deck reproduces
> FastForward's December 31 trial balance account by account — Cash 4,350, Supplies 9,720,
> Prepaid insurance 2,400, Equipment 26,000, Accounts payable 6,200, Unearned consulting
> revenue 3,000, owner capital 30,000, dividends (owner withdrawals in that edition) 200,
> Consulting revenue 5,800, Rental revenue 300, Salaries expense 1,400, Rent expense 1,000,
> Utilities expense 230, totals 45,300 = 45,300 — and it matches `fastforward.ts` line for
> line. Those balances give **assets 42,470 = liabilities 9,200 + equity 33,270**, net
> income 3,470. The figure of 41,800 = 9,200 + 32,600 does not come out of the sixteen
> entries, and Chapter 3's CI-verified anchors (47,685, net income 3,785, assets 42,745)
> only tie to 42,470 and 33,270. The deck is an older edition built on a sole
> proprietorship, so the equity accounts carry different names; every amount is identical.

## Hero instrument — Double-entry machine

**Instruction:** "Push each transaction through the four steps and watch debits and
credits stay equal."

- Sixteen FastForward transactions from `decemberTransactions`, in order.
- Four steps per entry: **identify** (the source document and the event), **analyze**
  (which accounts, which elements, up or down), **journalize** (debit and credit lines),
  **post** (the amounts land in the ledger).
- Live equation bars: Assets, Liabilities, Equity, updating as each entry posts.
- The ledger builds account by account. An account appears the first time an entry uses
  it — Cash on entry 1, Rental revenue on entry 8.
- A running trial balance under the ledger, debit and credit totals always visible.
- On the journalize step, the rule sits beside the columns: **DEBT — Expenses, Assets,
  Dividends** over the debit column; **CLOR — Credits: Liabilities, Owner's equity,
  Revenue** over the credit column.
- Entry 8 is the compound entry (one debit, two credits). Entry 12 is the trap: the
  credit goes to a liability named "revenue."

**Result line:** Trial balance — Debits 45,300 = Credits 45,300

**Noticed:** "The totals never drifted apart, because every entry added the same amount
to both sides. Entry 9 changed two accounts and left total assets exactly where they
were."

## Secondary instruments

### T-account trainer

**Instruction:** "Post the amount to either side of the account and say whether its
balance went up or down."

- One T-account at a time, with its normal balance side marked after the answer, not
  before.
- Posting a debit to a credit-normal account must say, in words, that the balance went
  down: "Accounts payable 7,100 − 900 = 6,200 credit."
- Accounts cycle through every element, including the contra-equity Dividends.

**Result line:** Accounts payable — 6,200 credit balance

**Noticed:** "Debit means left, not decrease. Whether left raises the balance depends on
the account."

### Trial balance error finder

**Instruction:** "Plant an error in December's books and see whether the trial balance
catches it."

| Planted error                                            | Trial balance    | Caught?                             |
| -------------------------------------------------------- | ---------------- | ----------------------------------- |
| Entry 12 never recorded                                  | 42,300 = 42,300  | No                                  |
| Entry 5 recorded twice                                   | 49,500 = 49,500  | No                                  |
| Rent in entry 6 debited to Salaries expense              | 45,300 = 45,300  | No                                  |
| Utilities posted as 320 instead of 230 (debit side only) | 45,390 vs 45,300 | Yes — difference 90, divisible by 9 |
| Entry 10: debit posted, credit to Cash never posted      | 46,200 vs 45,300 | Yes — difference 900                |

All figures `[ledger]` with the planted change.

**Result line:** Difference 90 — divisible by 9, look for a transposition

**Noticed:** "Three of five errors left the trial balance perfectly even. Equal totals
prove the debits match the credits, not that the books are right."

## Entry drill

All sixteen, from `decemberTransactions`. `[ledger]`

| #   | Date   | Transaction                                        | Debit                     | Credit                                        |
| --- | ------ | -------------------------------------------------- | ------------------------- | --------------------------------------------- |
| 1   | Dec 1  | Owner invests cash for common stock                | Cash 30,000               | Common stock 30,000                           |
| 2   | Dec 2  | Buys supplies for cash                             | Supplies 2,500            | Cash 2,500                                    |
| 3   | Dec 3  | Buys equipment for cash                            | Equipment 26,000          | Cash 26,000                                   |
| 4   | Dec 4  | Buys supplies on credit                            | Supplies 7,100            | Accounts payable 7,100                        |
| 5   | Dec 5  | Consulting services for cash                       | Cash 4,200                | Consulting revenue 4,200                      |
| 6   | Dec 6  | Pays December rent                                 | Rent expense 1,000        | Cash 1,000                                    |
| 7   | Dec 12 | Pays employee salary                               | Salaries expense 700      | Cash 700                                      |
| 8   | Dec 15 | Consulting and facility rental on credit           | Accounts receivable 1,900 | Consulting revenue 1,600 · Rental revenue 300 |
| 9   | Dec 22 | Collects on account                                | Cash 1,900                | Accounts receivable 1,900                     |
| 10  | Dec 24 | Pays part of the account payable                   | Accounts payable 900      | Cash 900                                      |
| 11  | Dec 24 | Pays cash dividend                                 | Dividends 200             | Cash 200                                      |
| 12  | Dec 26 | Receives cash in advance for 60 days of consulting | Cash 3,000                | Unearned consulting revenue 3,000             |
| 13  | Dec 26 | Pays for a 24-month insurance policy               | Prepaid insurance 2,400   | Cash 2,400                                    |
| 14  | Dec 26 | Buys supplies for cash                             | Supplies 120              | Cash 120                                      |
| 15  | Dec 26 | Pays employee salary                               | Salaries expense 700      | Cash 700                                      |
| 16  | Dec 26 | Pays utilities                                     | Utilities expense 230     | Cash 230                                      |

## Classification drill

**Categories:** Debit-normal · Credit-normal

| Account                     | Answer        | Why                                                              |
| --------------------------- | ------------- | ---------------------------------------------------------------- |
| Cash                        | Debit-normal  | Asset. DEBT — Expenses, Assets, Dividends.                       |
| Accounts receivable         | Debit-normal  | Asset.                                                           |
| Prepaid insurance           | Debit-normal  | Asset — insurance paid for and not yet used.                     |
| Equipment                   | Debit-normal  | Asset.                                                           |
| Accounts payable            | Credit-normal | Liability. CLOR — Credits: Liabilities, Owner's equity, Revenue. |
| Unearned consulting revenue | Credit-normal | Liability, despite the name. FastForward owes the work.          |
| Common stock                | Credit-normal | Owner's equity. It pushes equity up.                             |
| Dividends                   | Debit-normal  | Pulls equity down, so it grows on the debit side.                |
| Consulting revenue          | Credit-normal | Revenue pushes equity up.                                        |
| Rental revenue              | Credit-normal | Revenue.                                                         |
| Salaries expense            | Debit-normal  | Expense pulls equity down.                                       |
| Utilities expense           | Debit-normal  | Expense.                                                         |

## Key terms

Account · Account balance · Source documents · Chart of accounts · Ledger (general
ledger) · T-account · Debit · Credit · Double-entry accounting · Normal balance ·
Journal (general journal) · Journalizing · Posting · Posting reference (PR) column ·
Balance column account · Compound journal entry · Trial balance · Accounts receivable ·
Note receivable · Prepaid accounts · Supplies · Equipment · Land · Accounts payable ·
Note payable · Unearned revenue · Accrued liabilities · Common stock · Dividends ·
Retained earnings · Revenues · Expenses · Debt ratio

## Recall

**Rules**

- Debits increase expenses, assets, and dividends. Credits increase liabilities, equity,
  and revenue.
- **DEBT — Expenses, Assets, Dividends.** **CLOR — Credits: Liabilities, Owner's equity,
  Revenue.** Anything that pushes equity up is a credit; anything that pulls it down is
  a debit; assets are the mirror image.
- The four steps: identify, analyze, journalize, post.
- Chart of accounts numbering: 101–199 assets, 201–299 liabilities, 301–399 equity,
  401–499 revenues, 501–699 expenses. `[book?]` — FastForward's accounts fit it.
- A balanced trial balance does **not** catch: an entry never recorded, an entry recorded
  twice, the right amount in the wrong account on the same side, or two errors that
  cancel.
- A trial balance difference divisible by 9 points to a transposition (230 → 320) or a
  slide (230 → 2,300).

**Formulas**

| Formula                                             | Worked                                           |
| --------------------------------------------------- | ------------------------------------------------ |
| Account balance = Total increases − Total decreases | Accounts payable: 7,100 − 900 = 6,200 `[ledger]` |
| Total debits = Total credits                        | 45,300 = 45,300 `[ledger]`                       |
| Debt ratio = Total liabilities ÷ Total assets       | 9,200 ÷ 42,470 = 21.7% `[ledger]`                |
| Net income = Revenues − Expenses                    | 6,100 − 2,630 = 3,470 `[ledger]`                 |

## Common mistakes

- **Unearned consulting revenue is not revenue.** In entry 12 the credit goes to a
  liability. Revenue comes later, in Chapter 3, as the work is done.
- **The bank's "credit" is not your credit.** A deposit is a debit to Cash in the books.
- **Dividends never go on the income statement.** Debit-normal does not make them an
  expense.
- **Entry 9 is not revenue.** The revenue was recorded in entry 8. Crediting revenue again
  counts it twice.
- **Entry 8 has two credits.** Forgetting Rental revenue leaves the entry out of balance by 300.
- **A balanced trial balance is not proof.** Three of the five planted errors balance.
- **Debit does not mean decrease** and credit does not mean bad. They mean left and right.

## Anchors

| Figure                                               | Value  | Source                         |
| ---------------------------------------------------- | ------ | ------------------------------ |
| Trial balance, debits = credits                      | 45,300 | `[ledger]`                     |
| Cash                                                 | 4,350  | `[ledger]`                     |
| Supplies                                             | 9,720  | `[ledger]`                     |
| Prepaid insurance                                    | 2,400  | `[ledger]`                     |
| Equipment                                            | 26,000 | `[ledger]`                     |
| Total assets                                         | 42,470 | `[ledger]`, confirmed `[book]` |
| Accounts payable                                     | 6,200  | `[ledger]`                     |
| Unearned consulting revenue                          | 3,000  | `[ledger]`                     |
| Total liabilities                                    | 9,200  | `[ledger]`                     |
| Revenues (consulting 5,800 + rental 300)             | 6,100  | `[ledger]`                     |
| Expenses (rent 1,000, salaries 1,400, utilities 230) | 2,630  | `[ledger]`                     |
| Net income                                           | 3,470  | `[ledger]`                     |
| Ending retained earnings                             | 3,270  | `[ledger]`                     |
| Total equity                                         | 33,270 | `[ledger]`, confirmed `[book]` |
| Debt ratio                                           | 21.7%  | `[ledger]`                     |

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
