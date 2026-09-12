import { error } from '@sveltejs/kit';
import { chapters } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const n = Number(params.n);
	const first = chapters[n]?.lessons?.[0];
	if (!first) error(404, 'This chapter has no lessons yet');
	return { lessonId: first.id };
};
