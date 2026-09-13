import type { Component } from 'svelte';

import CurrentLiabilities from './learn/CurrentLiabilities.svelte';
import SalesTaxAndUnearnedRevenue from './learn/SalesTaxAndUnearnedRevenue.svelte';
import Payroll from './learn/Payroll.svelte';
import NotesPayable from './learn/NotesPayable.svelte';
import Warranty from './learn/Warranty.svelte';
import TimesInterestEarned from './learn/TimesInterestEarned.svelte';

export const lessonComponents: Record<string, Component> = {
	'current-liabilities': CurrentLiabilities,
	'sales-tax-and-unearned-revenue': SalesTaxAndUnearnedRevenue,
	payroll: Payroll,
	'notes-payable': NotesPayable,
	warranty: Warranty,
	'times-interest-earned': TimesInterestEarned
};

import PayrollWaterfallInstrument from './lab/PayrollWaterfallInstrument.svelte';
import WarrantyAccrualInstrument from './lab/WarrantyAccrualInstrument.svelte';
import NoteAcrossYearEndInstrument from './lab/NoteAcrossYearEndInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'payroll-waterfall': PayrollWaterfallInstrument,
	'warranty-accrual': WarrantyAccrualInstrument,
	'note-across-year-end': NoteAcrossYearEndInstrument
};
