import { error } from '@sveltejs/kit';
import { chapters } from '$lib/content';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const n = Number(params.n);
	const chapter = chapters[n];
	if (!chapter) error(404, `Chapter ${params.n} is not built yet`);
	return { n, chapter };
};
