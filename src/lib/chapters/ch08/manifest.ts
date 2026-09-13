import type { Component } from 'svelte';

import PlantAssetsAndCost from './learn/PlantAssetsAndCost.svelte';
import Expenditures from './learn/Expenditures.svelte';
import DepreciationMethods from './learn/DepreciationMethods.svelte';
import Disposals from './learn/Disposals.svelte';
import ChangeInEstimateLesson from './learn/ChangeInEstimateLesson.svelte';
import NaturalResourcesAndIntangibles from './learn/NaturalResourcesAndIntangibles.svelte';
import Turnover from './learn/Turnover.svelte';

export const lessonComponents: Record<string, Component> = {
	'plant-assets-and-cost': PlantAssetsAndCost,
	expenditures: Expenditures,
	'depreciation-methods': DepreciationMethods,
	disposals: Disposals,
	'change-in-estimate': ChangeInEstimateLesson,
	'natural-resources-and-intangibles': NaturalResourcesAndIntangibles,
	turnover: Turnover
};

import DepreciationCurvesInstrument from './lab/DepreciationCurvesInstrument.svelte';
import DisposalInstrument from './lab/DisposalInstrument.svelte';
import ChangeInEstimateInstrument from './lab/ChangeInEstimateInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'depreciation-curves': DepreciationCurvesInstrument,
	disposal: DisposalInstrument,
	'change-in-estimate': ChangeInEstimateInstrument
};
