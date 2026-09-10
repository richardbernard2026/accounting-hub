import type { Card } from './types';
import type { ChapterContent } from '$lib/content/types';

function slug(s: string): string {
	return s
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Every chapter's deck is generated from its content: one term card per key term,
 * one classification card per sorting item, one entry card per journal entry the
 * chapter teaches, and one rule card per debit/credit rule question.
 */
export function cardsFor(ch: ChapterContent): Card[] {
	const n = ch.meta.number;
	const out: Card[] = [];
	for (const t of ch.terms) {
		out.push({
			id: `ch${n}:term:${slug(t.term)}`,
			chapter: n,
			lo: t.lo,
			type: 'term',
			prompt: t.term,
			answer: t.definition
		});
	}
	for (const c of ch.classifications ?? []) {
		out.push({
			id: `ch${n}:class:${slug(c.text).slice(0, 40)}`,
			chapter: n,
			lo: c.lo,
			type: 'classification',
			prompt: c.text,
			options: c.options,
			answer: c.answer,
			why: c.why
		});
	}
	for (const e of ch.entryCards ?? []) {
		out.push({
			id: `ch${n}:entry:${e.entry.id}`,
			chapter: n,
			lo: e.lo,
			type: 'entry',
			prompt: e.prompt,
			entry: e.entry,
			hint: e.hint
		});
	}
	for (const r of ch.rules ?? []) {
		out.push({
			id: `ch${n}:rule:${slug(r.prompt).slice(0, 40)}`,
			chapter: n,
			lo: r.lo,
			type: 'rule',
			prompt: r.prompt,
			options: r.options,
			answer: r.answer,
			why: r.why
		});
	}
	return out;
}
