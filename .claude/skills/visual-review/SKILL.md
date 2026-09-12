---
name: visual-review
description: Capture every screen, build the contact sheet, and write a verdict for each one before calling a chapter or any UI change done in accounting-hub. Use after building or modifying any route, module, instrument, or component with a visual surface — never rely on "looks fine" from having written the code.
---

# Visual review

Claude Code grades its own work from screenshots it took itself and often does not
look hard at them. This skill is the fix: it is not optional, and it is not satisfied
by having generated screenshots — it is satisfied by having looked at them and written
down what is there.

Run this after **any** change that touches a route, a module, an instrument, or a
component with visual output — not just at the end of a chapter.

## The three steps, in order

### 1. Capture

Run the visual test suite:

```
pnpm test:visual
```

This renders every route at 390px, 768px, and 1440px and drives every instrument and
drill through its interactive states, writing PNGs to `docs/screenshots/` named
`<route-slug>__<viewport>__<state>.png` (e.g. `ch3-lab-timeline__desktop__dragged.png`).

If you changed only one module, you may run a narrower Playwright `--grep` to save
time, but a chapter is not done until the full suite has run clean at least once.

### 2. Contact sheet

```
pnpm contact-sheet
```

This regenerates two files from whatever PNGs are currently in `docs/screenshots/`:

- **`docs/screenshots/index.html`** — every screenshot in one page, grouped by route,
  labelled with its viewport and interaction state. Open it in a real browser tab (not
  the file viewer, not by reading the PNG bytes) and scroll the whole thing before
  writing a single verdict.
- **`docs/screenshots/REVIEW.md`** — one row per screenshot with an empty verdict
  column. Re-running this script preserves any verdict already written for a filename
  that still exists, so a partial re-capture never wipes finished work.

### 3. Write a verdict for every row

Open `docs/screenshots/index.html` and look. Then fill in every verdict cell in
`docs/screenshots/REVIEW.md`. A verdict is two things in one or two sentences:

1. What is actually on the screen (not what you intended to put there).
2. What is wrong with it, or "Correct as shown" if nothing is.

Bad verdict: "Looks fine."
Good verdict: "Lab thumbnail strip wraps to two lines at 390px, pushing the
instruction below the fold. Fix: shrink thumbnail labels on mobile."

Do not write a verdict without having opened the image. A row filled in from memory
or from reading the component's source defeats the entire point of this skill.

Then run the gate:

```
pnpm review:check
```

This exits non-zero if any row is empty. **A chapter, module, or component change is
not done while this fails.** Fix what the verdicts turned up, recapture, and repeat.

## When to reach for this without being asked

- After building or restructuring any route.
- After changing a shared component used across multiple screens (a table, a card, the
  header, a shell/layout).
- After a wording or visual-token pass (type scale, spacing, color).
- Before telling Richard a chapter is ready for sign-off — always, no exceptions.

## For Richard's own review

The contact sheet is for your first pass. For a faster second pass, or to point at
something wrong without writing a paragraph, use the Claude in Chrome extension on the
live URL — it can see the rendered page directly.
