<script lang="ts">
	/**
	 * Reference: one dense screen. Every term with the book's definition, every
	 * formula, every journal-entry pattern. The pre-exam page — density is
	 * correct here. A term you have not captured still shows the book's
	 * definition, with a place to write your own right beside it.
	 */
	import { accountNameOf } from '$lib/ledger';
	import { notes } from '$lib/notes/store.svelte';
	import JournalEntry from '$lib/components/ledger/JournalEntry.svelte';
	import type { ChapterContent } from '$lib/content/types';

	let { chapter }: { chapter: ChapterContent } = $props();
	const n = chapter.meta.number;
	const href = `/ch/${n}/reference`;
	const patterns = $derived(chapter.journalPatterns ?? []);
	const formulas = $derived(chapter.formulas ?? []);
	const accountName = $derived(accountNameOf(chapter.accounts ?? []));

	let open = $state<string | null>(null);
	let own = $state('');

	function mine(term: string) {
		return notes.notes.find(
			(note) =>
				note.chapter === n && note.kind === 'term' && note.text.toLowerCase() === term.toLowerCase()
		);
	}
	function start(term: string) {
		open = term;
		own = '';
	}
	function save(term: string, definition: string) {
		if (!own.trim()) return;
		notes.add({
			chapter: n,
			kind: 'term',
			text: term,
			body: own.trim(),
			book: definition,
			origin: 'own',
			source: { lo: chapter.terms.find((t) => t.term === term)?.lo, label: 'Reference', href }
		});
		open = null;
	}
	const captured = $derived(chapter.terms.filter((t) => mine(t.term)).length);
</script>

<div class="mx-auto max-w-[1000px] px-4 py-10 sm:px-6">
	<div class="flex flex-wrap items-baseline justify-between gap-2">
		<div>
			<div class="eyebrow">Reference · Chapter {n}</div>
			<h1 class="display mt-1">Every term, formula, and entry</h1>
		</div>
		<span class="num text-ink-2 text-sm"
			>{captured} of {chapter.terms.length} terms in your words</span
		>
	</div>

	<section class="mt-10">
		<h2 class="kicker">Terms</h2>
		<dl class="divide-rule-2 mt-3 divide-y">
			{#each chapter.terms as t (t.term)}
				{@const note = mine(t.term)}
				<div class="grid gap-x-6 gap-y-1 py-2.5 sm:grid-cols-[1fr_1.3fr_1.3fr] sm:items-baseline">
					<dt class="flex items-center gap-2">
						<span class="lo-tag">{t.lo}</span>
						<span class="font-medium">{t.term}</span>
					</dt>
					{#if note}
						<dd class="text-sm">{note.body}</dd>
					{:else if open === t.term}
						<dd class="sm:col-span-1">
							<!-- svelte-ignore a11y_autofocus -->
							<textarea
								class="field min-h-12 text-sm"
								bind:value={own}
								autofocus
								aria-label="{t.term}, in your words"
								placeholder="In your words…"
								onkeydown={(e) => {
									if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save(t.term, t.definition);
								}}></textarea>
							<div class="mt-1 flex gap-2">
								<button
									class="btn text-xs"
									onclick={() => save(t.term, t.definition)}
									disabled={!own.trim()}>Save</button
								>
								<button class="btn btn-quiet text-xs" onclick={() => (open = null)}>Cancel</button>
							</div>
						</dd>
					{:else}
						<dd class="text-sm">
							<button
								class="text-ink-2 hover:text-ink underline underline-offset-2"
								onclick={() => start(t.term)}>Write it in your words</button
							>
						</dd>
					{/if}
					<dd class="text-ink-2 text-sm">{t.definition}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<section class="border-rule-2 mt-10 border-t pt-8">
		<h2 class="kicker">Formulas</h2>
		<table class="ledger mt-3 text-sm">
			<tbody>
				{#each formulas as f (f.formula)}
					<tr class="border-rule-2 border-t align-top">
						<td class="w-14"><span class="lo-tag">{f.lo}</span></td>
						<td>{f.formula}</td>
						<td class="num text-ink-2 text-right">{f.worked}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	{#if patterns.length}
		<section class="border-rule-2 mt-10 border-t pt-8">
			<h2 class="kicker">Every entry the chapter teaches</h2>
			<div class="mt-3 grid gap-4 sm:grid-cols-2">
				{#each patterns as e (e.id)}
					<div class="border-rule-2 bg-paper-2/40 border px-3 py-2">
						<div class="text-ink-2 text-xs">({e.id}) {e.explanation}</div>
						<div class="mt-1">
							<JournalEntry entry={e} {accountName} compact date={false} />
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</div>
