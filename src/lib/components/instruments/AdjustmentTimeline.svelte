<script lang="ts">
	/**
	 * The chapter's opening instrument. One shared time axis (Dec 1 → Feb 28), six
	 * lanes for Wild's adjustments (a)–(f), and a period-end scrubber you drag
	 * across December. Each lane shows when cash moved versus when the expense or
	 * revenue is recognized; the side panel walks the selected lane through
	 * Identify → Analyze → Journalize → Post at the scrubbed date.
	 */
	import { onMount } from 'svelte';
	import type { Lane, LaneKind } from '$lib/content/chapters/ch03';
	import type { Balance, Entry } from '$lib/ledger';
	import { fmt, normalSide } from '$lib/ledger';
	import JournalEntry from '../ledger/JournalEntry.svelte';
	import TAccount from '../ledger/TAccount.svelte';
	import PinState from '../notes/PinState.svelte';

	let {
		chapter,
		lanes,
		entries,
		balances,
		accountName
	}: {
		chapter: number;
		lanes: Lane[];
		entries: Entry[];
		balances: Map<string, Balance>;
		accountName: (num: string) => string;
	} = $props();

	const SPAN = 90; // day offsets 0..89 = Dec 1 … Feb 28
	let day = $state(31); // period-end candidate, 1..31 (December)
	let selectedId = $state<Lane['id']>('a');
	let touched = $state(false);

	const selected = $derived(lanes.find((l) => l.id === selectedId)!);
	const laneState = $derived(selected.stateAt(day));
	const pct = (offset: number) => (Math.max(0, Math.min(SPAN, offset)) / SPAN) * 100;

	function dateOf(offset: number): Date {
		return new Date(2025, 11, 1 + offset);
	}
	function label(offset: number): string {
		return dateOf(offset).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
	function iso(d: number): string {
		return `2025-12-${String(d).padStart(2, '0')}`;
	}

	const KIND: Record<
		LaneKind,
		{ group: string; name: string; analyze: string; color: 'dr' | 'cr' }
	> = {
		prepaid: {
			group: 'Deferral · cash first',
			name: 'Prepaid expense',
			analyze:
				'Before adjusting, the asset is overstated and the expense is understated. The entry moves cost out of the asset (or into a contra asset) and into expense: assets ↓, equity ↓ through expense.',
			color: 'dr'
		},
		unearned: {
			group: 'Deferral · cash first',
			name: 'Unearned revenue',
			analyze:
				'Before adjusting, the liability is overstated and revenue is understated. The entry moves earned amounts out of the liability and into revenue: liabilities ↓, equity ↑ through revenue.',
			color: 'cr'
		},
		'accrued-expense': {
			group: 'Accrual · cash later',
			name: 'Accrued expense',
			analyze:
				'Before adjusting, both the expense and the liability are understated. The entry records the expense and the payable: liabilities ↑, equity ↓ through expense. Cash comes later.',
			color: 'dr'
		},
		'accrued-revenue': {
			group: 'Accrual · cash later',
			name: 'Accrued revenue',
			analyze:
				'Before adjusting, both the receivable and revenue are understated. The entry records the revenue and the receivable: assets ↑, equity ↑ through revenue. Cash comes later.',
			color: 'cr'
		}
	};

	/** The adjusting entry as it would be if the period ended on the scrubbed day. */
	const entry = $derived.by((): Entry | null => {
		const base = entries.find((e) => e.id === selected.id)!;
		const amt = laneState.recognized - laneState.recorded;
		if (
			amt <= 0 ||
			(laneState.adjustment === null &&
				day < 31 &&
				(selected.rule === 'monthly' || selected.rule === 'count'))
		)
			return null;
		return {
			...base,
			date: iso(day),
			explanation: day === 31 ? base.explanation : `If the period ended ${label(day - 1)}`,
			lines: base.lines.map((l) => ({
				acct: l.acct,
				dr: l.dr ? amt : undefined,
				cr: l.cr ? amt : undefined
			}))
		};
	});

	function posts(num: string) {
		const b = balances.get(num)!;
		const normal = normalSide(b.acct.type);
		const before = b.balance;
		const debits: { amount: number; label?: string; new?: boolean }[] = [];
		const credits: { amount: number; label?: string; new?: boolean }[] = [];
		if (before > 0)
			(normal === 'dr' ? debits : credits).push({ amount: before, label: 'Unadj. bal.' });
		if (entry) {
			const line = entry.lines.find((l) => l.acct === num)!;
			if (line.dr) debits.push({ amount: line.dr, label: `(${selected.id})`, new: true });
			if (line.cr) credits.push({ amount: line.cr, label: `(${selected.id})`, new: true });
		}
		return { normal, debits, credits, title: b.acct.name, num };
	}
	const bsT = $derived(posts(selected.bsAcct));
	const isT = $derived(posts(selected.isAcct));

	const sentence = $derived.by(() => {
		const d = label(day - 1);
		const amt = laneState.recognized;
		const e = entry;
		const ent = e
			? `${accountName(e.lines.find((l) => l.dr)!.acct)} ${fmt(amt)} / ${accountName(e.lines.find((l) => l.cr)!.acct)} ${fmt(amt)}`
			: 'no entry yet';
		return `${selected.title} at ${d}: ${laneState.explain} Entry: ${ent}.`;
	});

	function setDay(d: number) {
		day = Math.max(1, Math.min(31, Math.round(d)));
		touched = true;
	}
	/** Screen-reader text, updated only when a scrub settles (not 30× during the sweep). */
	let announce = $state('');
	function settle() {
		announce = `${label(day - 1)}: ${selected.title}. ${laneState.explain}`;
	}
	let sweepDone = $state(false);
	function select(id: Lane['id']) {
		selectedId = id;
		touched = true;
	}

	// Sweep December on first paint so the chapter opens on something moving.
	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			sweepDone = true;
			return;
		}
		day = 1;
		const t0 = performance.now();
		const dur = 2600;
		let raf = 0;
		const tick = (t: number) => {
			if (touched) return;
			const p = Math.min(1, (t - t0) / dur);
			const eased = 1 - Math.pow(1 - p, 3);
			day = Math.max(1, Math.min(31, Math.round(1 + eased * 30)));
			if (p < 1) raf = requestAnimationFrame(tick);
			else {
				day = 31;
				sweepDone = true;
			}
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	// Pointer scrubbing across the December portion of any track.
	let axis: HTMLElement | undefined = $state();
	let dragging = $state(false);
	function dayFromPointer(e: PointerEvent) {
		if (!axis) return;
		const r = axis.getBoundingClientRect();
		const off = ((e.clientX - r.left) / r.width) * SPAN;
		setDay(Math.ceil(off));
	}
	function down(e: PointerEvent) {
		dragging = true;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		dayFromPointer(e);
	}
	function move(e: PointerEvent) {
		if (dragging) dayFromPointer(e);
	}
	function up() {
		dragging = false;
		settle();
	}
	const months = [
		{ off: 0, name: 'December 2025' },
		{ off: 31, name: 'January 2026' },
		{ off: 62, name: 'February' }
	];
</script>

<div class="instrument border-rule bg-paper-2/40 border" data-sweep-done={sweepDone}>
	<div class="grid lg:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)]">
		<!-- ===== Timeline ===== -->
		<div class="min-w-0 p-4 sm:p-5">
			<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
				<div>
					<div class="eyebrow">Instrument · Wild C2, P1</div>
					<h2 class="mt-0.5 text-lg">The adjustment timeline</h2>
				</div>
				<p class="text-ink-2 max-w-md text-sm">
					Drag the period end across December. Each lane shows when cash moved and how much expense
					or revenue has been earned by that day.
				</p>
			</div>

			<div class="mt-4 select-none">
				<!-- month header -->
				<div
					class="grid grid-cols-[96px_minmax(0,1fr)_60px] items-end sm:grid-cols-[168px_minmax(0,1fr)_84px]"
				>
					<div class="text-ink-3 text-xs">
						Period end: <span class="num text-ink font-medium">{label(day - 1)}</span>
					</div>
					<div class="text-ink-3 relative h-5 text-xs">
						{#each months as m (m.off)}
							<span
								class="border-rule absolute bottom-0 border-l pl-1 leading-none whitespace-nowrap"
								style="left:{pct(m.off)}%"
								><span class="sm:hidden">{m.name.slice(0, 3)}</span><span class="hidden sm:inline"
									>{m.name}</span
								></span
							>
						{/each}
					</div>
					<div class="text-ink-3 text-right text-xs">Earned</div>
				</div>

				<!-- lanes -->
				<div class="relative">
					{#each lanes as lane, i (lane.id)}
						{@const s = lane.stateAt(day)}
						{@const k = KIND[lane.kind]}
						{@const start = lane.window.start}
						{@const endEx = lane.window.end + 1}
						{@const fillEnd = Math.min(day, endEx)}
						{@const groupStart = i === 0 || KIND[lanes[i - 1].kind].group !== k.group}
						{#if groupStart}
							<div class="mt-2 grid grid-cols-[96px_1fr] sm:grid-cols-[168px_1fr]">
								<div class="eyebrow py-1 text-[0.65rem]">{k.group}</div>
								<div class="border-rule-2 border-b"></div>
							</div>
						{/if}
						<button
							class="grid w-full grid-cols-[96px_minmax(0,1fr)_60px] items-center text-left sm:grid-cols-[168px_minmax(0,1fr)_84px] {selectedId ===
							lane.id
								? 'bg-paper-3/70'
								: 'hover:bg-paper-3/40'} transition-colors duration-150"
							onclick={() => select(lane.id)}
							aria-pressed={selectedId === lane.id}
						>
							<span class="block py-2 pr-2 pl-1 leading-tight">
								<span class="block text-xs sm:text-sm">
									<span class="num text-ink-3 mr-1">({lane.id})</span>{lane.title}
								</span>
								<span class="text-ink-3 hidden text-[0.68rem] sm:block">{k.name}</span>
							</span>
							<span class="border-rule-2 relative block h-9 border-l">
								<!-- window -->
								<span
									class="bg-paper-3 absolute top-3 h-3 {lane.window.openEnded ? 'open-ended' : ''}"
									style="left:{pct(start)}%; width:{pct(Math.min(SPAN, endEx)) - pct(start)}%"
								></span>
								<!-- elapsed fill -->
								{#if fillEnd > start}
									<span
										class="absolute top-3 h-3 {k.color === 'dr'
											? 'bg-debit'
											: 'bg-credit'} transition-[width] duration-75"
										style="left:{pct(start)}%; width:{pct(fillEnd) - pct(start)}%"
									></span>
								{/if}
								<!-- cash events -->
								{#each lane.cash as c (c.day + c.label)}
									<span
										class="absolute top-0 flex flex-col items-center"
										style="left:{pct(c.day + 0.5)}%; transform:translateX(-50%)"
										title="{label(c.day)}: {c.label}"
									>
										<span class="border-ink bg-paper block h-2 w-2 rounded-full border"></span>
										<span class="bg-ink block h-1.5 w-px"></span>
									</span>
								{/each}
								{#if lane.rule === 'count'}
									<span
										class="absolute top-0 flex flex-col items-center"
										style="left:{pct(31)}%; transform:translateX(-50%)"
										title="Dec 31: count supplies on hand"
									>
										<span class="border-ink bg-paper block h-2 w-2 border"></span>
										<span class="bg-ink block h-1.5 w-px"></span>
									</span>
								{/if}
								{#if lane.window.openEnded}
									<span class="text-ink-3 absolute top-3.5 right-0 text-[0.6rem] leading-none"
										>{Math.round((lane.window.end - lane.window.start) / 30.4)} mo.</span
									>
								{/if}
							</span>
							<span
								class="num block py-2 pr-1 text-right text-sm {s.recognized > 0
									? k.color === 'dr'
										? 'dr'
										: 'cr'
									: 'text-ink-3'}"
							>
								{s.recognized > 0
									? fmt(s.recognized)
									: lane.stateAt(31).adjustment &&
										  day < 31 &&
										  (lane.rule === 'monthly' || lane.rule === 'count')
										? '—'
										: '0'}
							</span>
						</button>
					{/each}

					<!-- overlay: period-end line + scrubber, spans the track column only -->
					<div
						class="pointer-events-none absolute inset-y-0 right-[60px] left-[96px] sm:right-[84px] sm:left-[168px]"
					>
						<div
							class="border-ink-3 absolute inset-y-0 border-l border-dashed"
							style="left:{pct(31)}%"
						></div>
						<div class="border-ink absolute inset-y-0 border-l-2" style="left:{pct(day)}%"></div>
					</div>
				</div>

				<!-- axis / scrubber -->
				<div
					class="grid grid-cols-[96px_minmax(0,1fr)_60px] sm:grid-cols-[168px_minmax(0,1fr)_84px]"
				>
					<div class="text-ink-3 pt-2 text-[0.68rem] leading-tight sm:text-xs">
						● cash moves<br class="sm:hidden" /><span class="hidden sm:inline">&nbsp;·&nbsp;</span>─
						recognized
					</div>
					<div
						bind:this={axis}
						class="relative h-11 touch-none {dragging ? 'cursor-grabbing' : 'cursor-grab'}"
						onpointerdown={down}
						onpointermove={move}
						onpointerup={up}
						onpointercancel={up}
						role="presentation"
					>
						<div class="bg-rule absolute inset-x-0 top-3 h-px"></div>
						<div class="bg-ink/5 absolute top-0 h-8" style="left:0; width:{pct(31)}%"></div>
						<label class="sr-only" for="period-end">Period end day in December</label>
						<input
							id="period-end"
							type="range"
							min="1"
							max="31"
							value={day}
							aria-valuetext={label(day - 1)}
							oninput={(e) => setDay(Number((e.target as HTMLInputElement).value))}
							onchange={settle}
							class="peer pointer-events-none absolute top-0 h-8 opacity-0"
							style="left:0; width:{pct(31)}%"
						/>
						<div
							class="border-ink bg-paper shadow-lift peer-focus-visible:ring-debit absolute top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-transform peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2"
							style="left:{pct(day)}%"
						></div>
						<span
							class="text-ink-3 absolute top-7 text-[0.65rem] whitespace-nowrap"
							style="left:{pct(31)}%; transform:translateX(-100%)"
							>Dec 31, the book’s period end</span
						>
					</div>
					<div></div>
				</div>
			</div>
		</div>

		<!-- ===== Four-step panel ===== -->
		<aside class="border-rule bg-paper-2/70 border-t p-4 sm:p-5 lg:border-t-0 lg:border-l">
			<div class="flex items-start justify-between gap-2">
				<div>
					<div class="eyebrow">({selected.id}) {KIND[selected.kind].group}</div>
					<h3 class="mt-0.5 text-lg leading-tight">{selected.title}</h3>
				</div>
				<PinState
					{chapter}
					lo="P1"
					label="Adjustment timeline"
					{sentence}
					dirty={touched}
					data={{
						'period end': label(day - 1),
						lane: `(${selected.id})`,
						earned: fmt(laneState.recognized)
					}}
				/>
			</div>

			<ol class="mt-4 space-y-4 text-sm">
				<li>
					<div class="eyebrow"><span class="num">1</span> Identify</div>
					<p class="text-ink-2 mt-1">{selected.facts}</p>
				</li>
				<li>
					<div class="eyebrow"><span class="num">2</span> Analyze · {label(day - 1)}</div>
					<p class="mt-1">{laneState.explain}</p>
					<p class="sr-only" aria-live="polite">{announce}</p>
					<p class="text-ink-3 mt-1">{KIND[selected.kind].analyze}</p>
				</li>
				<li>
					<div class="eyebrow"><span class="num">3</span> Journalize</div>
					{#if entry}
						<div class="bg-paper mt-1 px-2 py-1">
							<JournalEntry {entry} {accountName} compact />
						</div>
						{#if day < 31}<p class="text-ink-3 mt-1 text-xs">
								Hypothetical: an entry is made only at the real period end, Dec 31.
							</p>{/if}
					{:else}
						<p class="text-ink-3 mt-1">
							No entry yet. Nothing has been earned or used up that the rule would record.
						</p>
					{/if}
				</li>
				<li>
					<div class="eyebrow"><span class="num">4</span> Post</div>
					<div class="mt-2 grid gap-3 sm:grid-cols-2">
						<TAccount
							title={bsT.title}
							num={bsT.num}
							normal={bsT.normal}
							debits={bsT.debits}
							credits={bsT.credits}
						/>
						<TAccount
							title={isT.title}
							num={isT.num}
							normal={isT.normal}
							debits={isT.debits}
							credits={isT.credits}
						/>
					</div>
				</li>
			</ol>
		</aside>
	</div>
</div>

<style>
	.open-ended {
		mask-image: linear-gradient(to right, black 70%, transparent);
	}
</style>
