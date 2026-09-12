import { error } from '@sveltejs/kit';
import { chapters } from '$lib/content';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	Object.entries(chapters).flatMap(([n, ch]) =>
		(ch.lessons ?? []).map((l) => ({ n, lesson: l.id }))
	);

export const load: PageLoad = ({ params }) => {
	const n = Number(params.n);
	const chapter = chapters[n];
	const lesson = chapter?.lessons?.find((l) => l.id === params.lesson);
	if (!chapter || !lesson) error(404, `No such lesson: ${params.lesson}`);
	return { lessonId: lesson.id };
};
