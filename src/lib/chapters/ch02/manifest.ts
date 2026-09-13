import type { Component } from 'svelte';

import Accounts from './learn/Accounts.svelte';
import Rule from './learn/Rule.svelte';
import FourSteps from './learn/FourSteps.svelte';
import TrialBalance from './learn/TrialBalance.svelte';
import DebtRatio from './learn/DebtRatio.svelte';

export const lessonComponents: Record<string, Component> = {
	accounts: Accounts,
	rule: Rule,
	'four-steps': FourSteps,
	'trial-balance': TrialBalance,
	'debt-ratio': DebtRatio
};

import DoubleEntryMachineInstrument from './lab/DoubleEntryMachineInstrument.svelte';
import TAccountTrainerInstrument from './lab/TAccountTrainerInstrument.svelte';
import TrialBalanceErrorFinderInstrument from './lab/TrialBalanceErrorFinderInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'double-entry-machine': DoubleEntryMachineInstrument,
	't-account-trainer': TAccountTrainerInstrument,
	'trial-balance-error-finder': TrialBalanceErrorFinderInstrument
};
