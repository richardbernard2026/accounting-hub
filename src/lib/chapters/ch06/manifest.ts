import type { Component } from 'svelte';

import InternalControl from './learn/InternalControl.svelte';
import ControlPrinciples from './learn/ControlPrinciples.svelte';
import CashAndEquivalents from './learn/CashAndEquivalents.svelte';
import PettyCashLesson from './learn/PettyCashLesson.svelte';
import BankReconciliationLesson from './learn/BankReconciliationLesson.svelte';
import DaysSalesUncollected from './learn/DaysSalesUncollected.svelte';

export const lessonComponents: Record<string, Component> = {
	'internal-control': InternalControl,
	'control-principles': ControlPrinciples,
	'cash-and-equivalents': CashAndEquivalents,
	'petty-cash': PettyCashLesson,
	'bank-reconciliation': BankReconciliationLesson,
	'days-sales-uncollected': DaysSalesUncollected
};

import BankReconciliationInstrument from './lab/BankReconciliationInstrument.svelte';
import ControlFailureDiagnosticInstrument from './lab/ControlFailureDiagnosticInstrument.svelte';
import PettyCashCycleInstrument from './lab/PettyCashCycleInstrument.svelte';

export const instrumentComponents: Record<string, Component<{ href?: string }>> = {
	'bank-reconciliation': BankReconciliationInstrument,
	'control-failure-diagnostic': ControlFailureDiagnosticInstrument,
	'petty-cash-cycle': PettyCashCycleInstrument
};
