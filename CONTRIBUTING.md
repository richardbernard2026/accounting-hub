# Contributing

## Adding a chapter

1. **Data first.** Create `src/lib/content/chapters/chNN.ts`. Put the example company's chart of accounts and every journal entry in there and derive trial balances and statements with `post`, `trialBalance`, and `statements` from `$lib/ledger`. Never type a total by hand.
2. **Anchor it to the book.** In `anchors()`, list the numbers the textbook states (trial balance totals, net income, key balances) so `pnpm validate` proves the model reproduces them. Add chapter-specific `invariants()` (for example: adjusting entries never touch Cash).
3. **Register it** in `src/lib/content/index.ts` (`chapters` map and the index entry's `status: 'live'`), and map the page component in `src/routes/ch/[n]/+page.svelte`.
4. **Build the instrument.** Every chapter needs at least one instrument at the caliber of the adjustment timeline: something that moves on load, that the reader can change, and whose state can be pinned with `PinState` once it has been moved off its default.
5. **Write the page** in `src/lib/chapters/ChNN.svelte` following the learning-objective spine (`Section` per objective, `Reading` around prose so selection capture works, drills that offer a `Takeaway` only after completion, `TermAudit` at the end).
6. **Look at it.** Add the chapter to `tests/visual.spec.ts`, run `pnpm build && pnpm test:visual`, and open the screenshots in `docs/screenshots`. Check 375, 768, and 1440 px and dark mode. Interactive states, not just the initial load.

## Rules that do not bend

- Numbers reconcile or the build fails. `pnpm validate` runs in CI and before every deploy.
- Nothing is pre-marked as note-worthy. No permanent "+ Note" buttons.
- Paper, ink, debit blue, credit brick. Single rule above a subtotal, double rule under a final total. No gradient heroes, no grids of identical rounded cards.
- Static only. No database, auth, or environment variables. If you think a backend is needed, open an issue and argue for it.

## Checks before a pull request

```
pnpm validate
pnpm check
pnpm lint
pnpm build && pnpm test:visual
```
