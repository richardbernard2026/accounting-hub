import type { Component } from 'svelte';

import Merchandisers from './learn/Merchandisers.svelte';
import Purchases from './learn/Purchases.svelte';
import DiscountDecisionLesson from './learn/DiscountDecisionLesson.svelte';
import Sales from './learn/Sales.svelte';
import IncomeStatement from './learn/IncomeStatement.svelte';
import AcidTest from './learn/AcidTest.svelte';

export const lessonComponents: Record<string, Component> = {
	merchandisers: Merchandisers,
	purchases: Purchases,
	'discount-decision': DiscountDecisionLesson,
	sales: Sales,
	'income-statement': IncomeStatement,
	'acid-test': AcidTest
};

import MerchandiseFlowInstrument from './lab/MerchandiseFlowInstrument.svelte';
import DiscountDecisionInstrument from './lab/DiscountDecisionInstrument.svelte';
import IncomeStatementFormatsInstrument from './lab/IncomeStatementFormatsInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'merchandise-flow': MerchandiseFlowInstrument,
	'discount-decision': DiscountDecisionInstrument,
	'income-statement-formats': IncomeStatementFormatsInstrument
};
