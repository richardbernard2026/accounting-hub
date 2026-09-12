import { error } from '@sveltejs/kit';
import { chapters } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	Object.entries(chapters).flatMap(([n, ch]) =>
		(ch.instruments ?? []).map((i) => ({ n, instrument: i.id }))
	);

export const load: PageLoad = ({ params }) => {
	const n = Number(params.n);
	const chapter = chapters[n];
	const inst = chapter?.instruments?.find((i) => i.id === params.instrument);
	if (!chapter || !inst) error(404, `No such instrument: ${params.instrument}`);
	return { instrumentId: inst.id };
};
