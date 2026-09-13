import type { Component } from 'svelte';

import ThreeActivities from './learn/ThreeActivities.svelte';
import IndirectMethod from './learn/IndirectMethod.svelte';
import DirectVsIndirectLesson from './learn/DirectVsIndirectLesson.svelte';
import BalanceSheetChangeReaderLesson from './learn/BalanceSheetChangeReaderLesson.svelte';
import InvestingAndFinancing from './learn/InvestingAndFinancing.svelte';
import FreeCashFlow from './learn/FreeCashFlow.svelte';

export const lessonComponents: Record<string, Component> = {
	'three-activities': ThreeActivities,
	'indirect-method': IndirectMethod,
	'direct-vs-indirect': DirectVsIndirectLesson,
	'balance-sheet-change-reader': BalanceSheetChangeReaderLesson,
	'investing-and-financing': InvestingAndFinancing,
	'free-cash-flow': FreeCashFlow
};

import IndirectMethodWaterfallInstrument from './lab/IndirectMethodWaterfallInstrument.svelte';
import DirectVsIndirectInstrument from './lab/DirectVsIndirectInstrument.svelte';
import BalanceSheetChangeReaderInstrument from './lab/BalanceSheetChangeReaderInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'indirect-method-waterfall': IndirectMethodWaterfallInstrument,
	'direct-vs-indirect': DirectVsIndirectInstrument,
	'balance-sheet-change-reader': BalanceSheetChangeReaderInstrument
};
