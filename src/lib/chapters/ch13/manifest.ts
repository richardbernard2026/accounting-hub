import type { Component } from 'svelte';

import BuildingBlocks from './learn/BuildingBlocks.svelte';
import ThreeLensesLesson from './learn/ThreeLensesLesson.svelte';
import RatioBuilderLesson from './learn/RatioBuilderLesson.svelte';
import Solvency from './learn/Solvency.svelte';
import Profitability from './learn/Profitability.svelte';
import MarketProspects from './learn/MarketProspects.svelte';

export const lessonComponents: Record<string, Component> = {
	'building-blocks': BuildingBlocks,
	'three-lenses': ThreeLensesLesson,
	'ratio-builder': RatioBuilderLesson,
	solvency: Solvency,
	profitability: Profitability,
	'market-prospects': MarketProspects
};

import ThreeLensesInstrument from './lab/ThreeLensesInstrument.svelte';
import RatioBuilderInstrument from './lab/RatioBuilderInstrument.svelte';
import ReturnOnAssetsTakenApartInstrument from './lab/ReturnOnAssetsTakenApartInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'three-lenses': ThreeLensesInstrument,
	'ratio-builder': RatioBuilderInstrument,
	'return-on-assets-taken-apart': ReturnOnAssetsTakenApartInstrument
};
