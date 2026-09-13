import type { Component } from 'svelte';

import CorporateOrganization from './learn/CorporateOrganization.svelte';
import EquityCompositionLesson from './learn/EquityCompositionLesson.svelte';
import CashDividends from './learn/CashDividends.svelte';
import StockDividendsAndSplits from './learn/StockDividendsAndSplits.svelte';
import PreferredDividends from './learn/PreferredDividends.svelte';
import StatementOfStockholdersEquityLesson from './learn/StatementOfStockholdersEquityLesson.svelte';
import PerShareRatios from './learn/PerShareRatios.svelte';

export const lessonComponents: Record<string, Component> = {
	'corporate-organization': CorporateOrganization,
	'equity-composition': EquityCompositionLesson,
	'cash-dividends': CashDividends,
	'stock-dividends-and-splits': StockDividendsAndSplits,
	'preferred-dividends': PreferredDividends,
	'statement-of-stockholders-equity': StatementOfStockholdersEquityLesson,
	'per-share-ratios': PerShareRatios
};

import EquityCompositionInstrument from './lab/EquityCompositionInstrument.svelte';
import PreferredDividendAllocatorInstrument from './lab/PreferredDividendAllocatorInstrument.svelte';
import StatementOfStockholdersEquityInstrument from './lab/StatementOfStockholdersEquityInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'equity-composition': EquityCompositionInstrument,
	'preferred-dividend-allocator': PreferredDividendAllocatorInstrument,
	'statement-of-stockholders-equity': StatementOfStockholdersEquityInstrument
};
