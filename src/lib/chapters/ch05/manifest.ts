import type { Component } from 'svelte';

import CostingMethods from './learn/CostingMethods.svelte';
import CostLayersLesson from './learn/CostLayersLesson.svelte';
import WhatCounts from './learn/WhatCounts.svelte';
import InventoryErrors from './learn/InventoryErrors.svelte';
import LowerOfCostOrMarketLesson from './learn/LowerOfCostOrMarketLesson.svelte';
import Turnover from './learn/Turnover.svelte';

export const lessonComponents: Record<string, Component> = {
	'costing-methods': CostingMethods,
	'cost-layers': CostLayersLesson,
	'what-counts': WhatCounts,
	'inventory-errors': InventoryErrors,
	'lower-of-cost-or-market': LowerOfCostOrMarketLesson,
	turnover: Turnover
};

import CostLayersInstrument from './lab/CostLayersInstrument.svelte';
import InventoryErrorSeesawInstrument from './lab/InventoryErrorSeesawInstrument.svelte';
import LowerOfCostOrMarketInstrument from './lab/LowerOfCostOrMarketInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'cost-layers': CostLayersInstrument,
	'inventory-error-seesaw': InventoryErrorSeesawInstrument,
	'lower-of-cost-or-market': LowerOfCostOrMarketInstrument
};
