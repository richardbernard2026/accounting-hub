import { error } from '@sveltejs/kit';
import { chapters } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => Object.keys(chapters).map((n) => ({ n }));

export const load: PageLoad = ({ params }) => {
	const n = Number(params.n);
	if (!chapters[n]) error(404, `Chapter ${params.n} is not built yet`);
	return { n };
};
