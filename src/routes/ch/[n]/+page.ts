import { chapters } from '$lib/content';
import type { EntryGenerator } from './$types';

// `entries` must live in +page.ts (not +layout.ts); the load itself is in
// +layout.ts and its data flows down to this page and every module beneath it.
export const entries: EntryGenerator = () => Object.keys(chapters).map((n) => ({ n }));
