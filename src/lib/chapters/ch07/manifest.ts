import type { Component } from 'svelte';

import ReceivablesBasics from './learn/ReceivablesBasics.svelte';
import TwoMethods from './learn/TwoMethods.svelte';
import Aging from './learn/Aging.svelte';
import SalesVsReceivables from './learn/SalesVsReceivables.svelte';
import NotesReceivable from './learn/NotesReceivable.svelte';
import Turnover from './learn/Turnover.svelte';

export const lessonComponents: Record<string, Component> = {
	'receivables-basics': ReceivablesBasics,
	'two-methods': TwoMethods,
	aging: Aging,
	'sales-vs-receivables': SalesVsReceivables,
	'notes-receivable': NotesReceivable,
	turnover: Turnover
};

import AgingScheduleInstrument from './lab/AgingScheduleInstrument.svelte';
import SalesVsReceivablesMethodInstrument from './lab/SalesVsReceivablesMethodInstrument.svelte';
import NoteCalculatorInstrument from './lab/NoteCalculatorInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'aging-schedule': AgingScheduleInstrument,
	'sales-vs-receivables-method': SalesVsReceivablesMethodInstrument,
	'note-calculator': NoteCalculatorInstrument
};
