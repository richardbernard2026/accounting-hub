import type { Component } from 'svelte';

import Accounting from './learn/Accounting.svelte';
import Principles from './learn/Principles.svelte';
import Forms from './learn/Forms.svelte';
import Equation from './learn/Equation.svelte';
import Statements from './learn/Statements.svelte';
import ReturnOnAssets from './learn/ReturnOnAssets.svelte';

export const lessonComponents: Record<string, Component> = {
	accounting: Accounting,
	principles: Principles,
	forms: Forms,
	equation: Equation,
	statements: Statements,
	'return-on-assets': ReturnOnAssets
};

import EquationBalanceInstrument from './lab/EquationBalanceInstrument.svelte';
import StatementChainInstrument from './lab/StatementChainInstrument.svelte';
import BusinessFormSwitcherInstrument from './lab/BusinessFormSwitcherInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'equation-balance': EquationBalanceInstrument,
	'statement-chain': StatementChainInstrument,
	'business-form-switcher': BusinessFormSwitcherInstrument
};
