import { error } from '@sveltejs/kit';
import { chapters } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const n = Number(params.n);
	const first = chapters[n]?.instruments?.[0];
	if (!first) error(404, 'This chapter has no instruments yet');
	return { instrumentId: first.id };
};
