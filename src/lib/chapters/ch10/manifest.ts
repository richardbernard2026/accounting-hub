import type { Component } from 'svelte';

import DiscountParPremium from './learn/DiscountParPremium.svelte';
import PricingABond from './learn/PricingABond.svelte';
import StraightLineAmortization from './learn/StraightLineAmortization.svelte';
import EffectiveInterestAmortization from './learn/EffectiveInterestAmortization.svelte';
import InstallmentNotes from './learn/InstallmentNotes.svelte';
import EarlyRetirementLesson from './learn/EarlyRetirementLesson.svelte';
import DebtToEquity from './learn/DebtToEquity.svelte';

export const lessonComponents: Record<string, Component> = {
	'discount-par-premium': DiscountParPremium,
	'pricing-a-bond': PricingABond,
	'straight-line-amortization': StraightLineAmortization,
	'effective-interest-amortization': EffectiveInterestAmortization,
	'installment-notes': InstallmentNotes,
	'early-retirement': EarlyRetirementLesson,
	'debt-to-equity': DebtToEquity
};

import BondPriceAndCarryingValueInstrument from './lab/BondPriceAndCarryingValueInstrument.svelte';
import InstallmentNoteScheduleInstrument from './lab/InstallmentNoteScheduleInstrument.svelte';
import EarlyRetirementInstrument from './lab/EarlyRetirementInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'bond-price-and-carrying-value': BondPriceAndCarryingValueInstrument,
	'installment-note-schedule': InstallmentNoteScheduleInstrument,
	'early-retirement': EarlyRetirementInstrument
};
