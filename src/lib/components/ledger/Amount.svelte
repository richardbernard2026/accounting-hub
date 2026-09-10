<script lang="ts">
	import { fmt } from '$lib/ledger';
	let {
		value,
		dollar = false,
		side,
		muted = false
	}: { value: number; dollar?: boolean; side?: 'dr' | 'cr'; muted?: boolean } = $props();
</script>

<span class="num {side === 'dr' ? 'dr' : side === 'cr' ? 'cr' : ''} {muted ? 'text-ink-3' : ''}"
	>{fmt(value, { dollar })}</span
>
