import type { Component } from 'svelte';

import Periods from './learn/Periods.svelte';
import Types from './learn/Types.svelte';
import SixEntries from './learn/SixEntries.svelte';
import WhatGoesWrong from './learn/WhatGoesWrong.svelte';
import FromUnadjustedToStatements from './learn/FromUnadjustedToStatements.svelte';
import Margin from './learn/Margin.svelte';
import Appendix from './learn/Appendix.svelte';

/** Lesson id (from ch03.ts `lessons`) → the component that renders it. */
export const lessonComponents: Record<string, Component> = {
	periods: Periods,
	types: Types,
	entries: SixEntries,
	skipped: WhatGoesWrong,
	statements: FromUnadjustedToStatements,
	margin: Margin,
	appendix: Appendix
};

import TimelineInstrument from './lab/TimelineInstrument.svelte';
import WorksheetInstrument from './lab/WorksheetInstrument.svelte';
import StatementLinksInstrument from './lab/StatementLinksInstrument.svelte';
import AccrualVsCashInstrument from './lab/AccrualVsCashInstrument.svelte';
import ProfitMarginInstrument from './lab/ProfitMarginInstrument.svelte';
import PrepaidAlternativesInstrument from './lab/PrepaidAlternativesInstrument.svelte';

/** Instrument id (from ch03.ts `instruments`) → the standalone component Lab mounts. */
export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	timeline: TimelineInstrument,
	worksheet: WorksheetInstrument,
	'statement-links': StatementLinksInstrument,
	'accrual-vs-cash': AccrualVsCashInstrument,
	'profit-margin': ProfitMarginInstrument,
	'prepaid-alternatives': PrepaidAlternativesInstrument
};
