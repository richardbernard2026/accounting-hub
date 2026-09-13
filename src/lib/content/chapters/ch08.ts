import { accountNameOf, fmt, post, round } from '$lib/ledger';
import type { Account, Entry } from '$lib/ledger';
import type {
	Anchor,
	ChapterContent,
	Classification,
	Company,
	EntryCardSpec,
	Formula,
	InstrumentMeta,
	LessonMeta,
	Objective,
	QuickCheck,
	Rule,
	Term
} from '../types';

/**
 * The depreciation schedule (every [book?] figure below) is the standard
 * published table for a $10,000 asset, $1,000 salvage, five-year life, and
 * 36,000 units — the brief's own note says it is "very likely right" but
 * asks to confirm the machine's exact units-by-year against the book, which
 * needs the physical text (not available from here). Hand-verified
 * internally consistent before building; see the final report.
 */
export const objectives: Objective[] = [
	{
		code: 'C1',
		kind: 'conceptual',
		short: 'Plant assets & cost',
		text: 'Determine the cost of a plant asset, including a lump-sum purchase of land and a building.'
	},
	{
		code: 'C2',
		kind: 'conceptual',
		short: 'Expenditures',
		text: 'Distinguish revenue expenditures from capital expenditures, and ordinary repairs from betterments.'
	},
	{
		code: 'P1',
		kind: 'procedural',
		short: 'Depreciation methods',
		text: 'Compute depreciation using the straight-line, units-of-production, and double-declining-balance methods.'
	},
	{
		code: 'A1',
		kind: 'analytical',
		short: 'Disposals',
		text: 'Record the disposal of a plant asset and compute the resulting gain or loss.'
	},
	{
		code: 'A2',
		kind: 'analytical',
		short: 'Change in estimate',
		text: 'Revise a depreciation estimate and compute the new periodic expense, without restating prior years.'
	},
	{
		code: 'P2',
		kind: 'procedural',
		short: 'Natural resources & intangibles',
		text: 'Record depletion of a natural resource and amortization of an intangible asset.'
	},
	{
		code: 'A3',
		kind: 'analytical',
		short: 'Turnover',
		text: 'Compute total asset turnover and explain what it measures.'
	}
];

export const terms: Term[] = [
	{ term: 'Plant assets', lo: 'C1', definition: 'Tangible long-lived assets used to produce or sell products and services.' },
	{ term: 'Cost principle', lo: 'C1', definition: 'A plant asset is recorded at its actual cost, including all normal and necessary costs to get it ready for its intended use.' },
	{ term: 'Land', lo: 'C1', definition: 'Land held for use in operations; never depreciated because it does not wear out.' },
	{ term: 'Land improvements', lo: 'C1', definition: 'Additions to land with a limited useful life, such as parking lots and fences, depreciated separately from the land itself.' },
	{ term: 'Buildings', lo: 'C1', definition: 'Structures used in operations, depreciated over their useful lives.' },
	{ term: 'Machinery and equipment', lo: 'C1', definition: 'Machines and equipment used to produce or sell products and services.' },
	{ term: 'Lump-sum purchase', lo: 'C1', definition: 'Buying more than one asset in a single transaction for one price, allocated among the assets by their relative market values.' },
	{ term: 'Depreciation', lo: 'P1', definition: 'The process of allocating a plant asset’s cost to expense over its useful life.' },
	{ term: 'Cost', lo: 'P1', definition: "A plant asset's total cost of acquisition, including all costs to get it ready for its intended use." },
	{ term: 'Salvage value', lo: 'P1', definition: 'The estimated value of a plant asset at the end of its useful life.' },
	{ term: 'Useful life', lo: 'P1', definition: 'The length of time a plant asset is productively used in a company’s operations.' },
	{ term: 'Obsolescence', lo: 'P1', definition: 'An asset becoming out of date and no longer useful in generating revenue, before it physically wears out.' },
	{ term: 'Inadequacy', lo: 'P1', definition: 'An asset no longer being large or productive enough for a company’s current needs.' },
	{ term: 'Straight-line method', lo: 'P1', definition: 'Allocates an equal amount of depreciation to each period of a plant asset’s useful life.' },
	{ term: 'Units-of-production method', lo: 'P1', definition: 'Allocates depreciation based on the actual units the asset produces each period.' },
	{ term: 'Declining-balance method', lo: 'P1', definition: 'An accelerated method that applies a constant rate to the asset’s declining book value each period.' },
	{ term: 'Double-declining-balance method', lo: 'P1', definition: 'A declining-balance method using twice the straight-line rate, ignoring salvage value except as a floor on book value.' },
	{ term: 'Accelerated depreciation', lo: 'P1', definition: 'Any method that yields larger depreciation charges in the earlier years of an asset’s life.' },
	{
		term: 'Modified Accelerated Cost Recovery System (MACRS)',
		lo: 'P1',
		definition: 'The depreciation system required for most U.S. income tax reporting, distinct from the methods used for financial reporting.'
	},
	{ term: 'Book value', lo: 'P1', definition: 'A plant asset’s cost minus its accumulated depreciation.' },
	{ term: 'Change in an accounting estimate', lo: 'A2', definition: 'A revision to an estimate, such as useful life or salvage value, applied to current and future periods only, never restating the past.' },
	{ term: 'Partial-year depreciation', lo: 'A2', definition: 'Depreciation recorded for only the portion of a year an asset was actually owned and used.' },
	{ term: 'Revenue expenditures', lo: 'C2', definition: 'Expenditures that keep an asset in normal, good operating condition; expensed immediately.' },
	{ term: 'Capital expenditures', lo: 'C2', definition: 'Expenditures that provide benefits extending beyond the current period; added to an asset’s cost.' },
	{ term: 'Betterments (improvements)', lo: 'C2', definition: 'Expenditures that make a plant asset more efficient or productive, without necessarily extending its life; capitalized.' },
	{ term: 'Extraordinary repairs', lo: 'C2', definition: 'Major repairs that extend a plant asset’s useful life beyond its original estimate; capitalized.' },
	{ term: 'Ordinary repairs', lo: 'C2', definition: 'Expenditures to keep a plant asset in normal operating condition; expensed as incurred.' },
	{ term: 'Impairment', lo: 'A1', definition: "A permanent decline in a plant or intangible asset's value below its book value, recorded as a loss when it occurs." },
	{ term: 'Natural resources', lo: 'P2', definition: 'Assets physically consumed when used, such as timber, minerals, and oil, that are removed from their natural setting.' },
	{ term: 'Depletion', lo: 'P2', definition: 'The process of allocating the cost of a natural resource to expense as it is extracted.' },
	{ term: 'Intangible assets', lo: 'P2', definition: 'Nonphysical assets, such as patents and trademarks, that give a company a long-term legal or competitive advantage.' },
	{ term: 'Patent', lo: 'P2', definition: 'An exclusive right granted to its owner to produce and sell an invention for a set period.' },
	{ term: 'Copyright', lo: 'P2', definition: 'An exclusive right granted to its owner to publish and sell a musical, literary, or artistic work during the creator’s life plus a set number of years.' },
	{ term: 'Trademark', lo: 'P2', definition: 'A symbol, name, or phrase identifying a company or its product, legally protected from use by others.' },
	{ term: 'Franchises and licenses', lo: 'P2', definition: 'Rights granted to sell a product or service, or use a trademark or technology, under specified conditions.' },
	{ term: 'Goodwill', lo: 'P2', definition: 'The amount by which a company’s value exceeds the fair value of its net identifiable assets; recorded only when purchased, never amortized.' },
	{ term: 'Amortization', lo: 'P2', definition: 'The process of allocating the cost of an intangible asset to expense over its useful life.' },
	{ term: 'Total asset turnover', lo: 'A3', definition: 'Net sales divided by average total assets; how efficiently a company uses its assets to generate sales.' }
];

export const quickChecks: QuickCheck[] = [
	{
		lo: 'C1',
		q: 'A company pays $900,000 for land and a building appraised at $300,000 and $700,000. Land is recorded at:',
		options: ['$300,000', '$270,000', '$450,000', '$900,000'],
		answer: 1,
		why: 'Allocate by relative appraised value: 900,000 × (300,000 ÷ 1,000,000) = 270,000.'
	},
	{
		lo: 'C2',
		q: 'Replacing a machine’s motor so it lasts three more years is:',
		options: ['A revenue expenditure', 'A capital expenditure', 'Neither, it is ignored', 'A period cost only'],
		answer: 1,
		why: 'It extends useful life — a betterment, capitalized to the asset.'
	},
	{
		lo: 'P1',
		q: 'A $10,000 asset with $1,000 salvage and a 5-year life depreciates, under straight-line, by:',
		options: ['$2,000 a year', '$1,800 a year', '$1,000 a year', '$9,000 a year'],
		answer: 1,
		why: '(10,000 − 1,000) ÷ 5 = 1,800.'
	},
	{
		lo: 'P1',
		q: 'Double-declining-balance applies its rate to:',
		options: ['Cost minus salvage', 'Beginning book value', 'Cost only', 'Salvage value'],
		answer: 1,
		why: 'The rate applies to book value each period; salvage only acts as a floor, stopping depreciation once book value reaches it.'
	},
	{
		lo: 'A1',
		q: 'A machine with a $4,600 book value sells for $4,000. This is:',
		options: ['A $600 gain', 'A $600 loss', 'A $4,000 loss', 'No gain or loss'],
		answer: 1,
		why: 'Gain or loss is proceeds minus book value: 4,000 − 4,600 = a 600 loss.'
	},
	{
		lo: 'A2',
		q: 'A revised useful-life estimate in year 3 of an asset’s life:',
		options: [
			'Restates years 1 and 2',
			'Changes only year 3 and later',
			'Is not allowed under GAAP',
			'Requires reversing all prior depreciation'
		],
		answer: 1,
		why: 'A change in estimate is never applied retroactively — only the current and future periods change.'
	}
];

/* ---------- Chart of accounts ---------- */

const ALL_ACCOUNTS: Account[] = [
	{ num: '101', name: 'Cash', type: 'asset' },
	{ num: '141', name: 'Machinery', type: 'asset' },
	{ num: '142', name: 'Accumulated depreciation—Machinery', type: 'contra-asset' },
	{ num: '151', name: 'Equipment', type: 'asset' },
	{ num: '152', name: 'Accumulated depreciation—Equipment', type: 'contra-asset' },
	{ num: '161', name: 'Land', type: 'asset' },
	{ num: '171', name: 'Building', type: 'asset' },
	{ num: '181', name: 'Mineral deposit—Mine', type: 'asset' },
	{ num: '182', name: 'Accumulated depletion—Mine', type: 'contra-asset' },
	{ num: '191', name: 'Patents', type: 'asset' },
	{ num: '192', name: 'Accumulated amortization—Patents', type: 'contra-asset' },
	{ num: '307', name: 'Common stock', type: 'equity' },
	{ num: '318', name: 'Retained earnings', type: 'equity' },
	{ num: '319', name: 'Dividends', type: 'contra-equity' },
	{ num: '505', name: 'Gain on disposal', type: 'revenue' },
	{ num: '601', name: 'Repairs expense', type: 'expense' },
	{ num: '602', name: 'Depreciation expense—Machinery', type: 'expense' },
	{ num: '603', name: 'Depreciation expense—Equipment', type: 'expense' },
	{ num: '604', name: 'Depletion expense', type: 'expense' },
	{ num: '605', name: 'Amortization expense—Patents', type: 'expense' }
];
function acctsFor(nums: string[]): Account[] {
	return ALL_ACCOUNTS.filter((a) => nums.includes(a.num));
}
export const accounts = ALL_ACCOUNTS;
export const accountName = accountNameOf(ALL_ACCOUNTS);

/* ---------- The depreciation schedule: straight-line, units-of-production, double-declining-balance ---------- */

export const machineCost = 10000;
export const machineSalvage = 1000;
export const machineLife = 5;
export const machineUnits = 36000;
export const unitsByYear = [7000, 8000, 9000, 7000, 5000];

export type Method = 'sl' | 'uop' | 'ddb';
export const METHODS: { id: Method; label: string }[] = [
	{ id: 'sl', label: 'Straight-line' },
	{ id: 'uop', label: 'Units-of-production' },
	{ id: 'ddb', label: 'Double-declining-balance' }
];

export function straightLineSchedule(): number[] {
	const annual = round((machineCost - machineSalvage) / machineLife);
	return Array(machineLife).fill(annual);
}
export const unitsOfProductionRate = round(((machineCost - machineSalvage) / machineUnits) * 10000) / 10000;
export function unitsOfProductionSchedule(): number[] {
	return unitsByYear.map((u) => round(unitsOfProductionRate * u));
}
export function doubleDecliningBalanceSchedule(): number[] {
	const rate = 2 / machineLife;
	let bookValue = machineCost;
	const out: number[] = [];
	for (let i = 0; i < machineLife; i++) {
		let dep = round(bookValue * rate);
		if (bookValue - dep < machineSalvage) dep = round(bookValue - machineSalvage);
		out.push(dep);
		bookValue = round(bookValue - dep);
	}
	return out;
}
export function scheduleFor(method: Method): number[] {
	if (method === 'sl') return straightLineSchedule();
	if (method === 'uop') return unitsOfProductionSchedule();
	return doubleDecliningBalanceSchedule();
}
export function bookValueSchedule(method: Method): number[] {
	const dep = scheduleFor(method);
	let bv = machineCost;
	return dep.map((d) => {
		bv = round(bv - d);
		return bv;
	});
}
export const slSchedule = straightLineSchedule();
export const uopSchedule = unitsOfProductionSchedule();
export const ddbSchedule = doubleDecliningBalanceSchedule();
export const slTotal = round(slSchedule.reduce((s, d) => s + d, 0));
export const uopTotal = round(uopSchedule.reduce((s, d) => s + d, 0));
export const ddbTotal = round(ddbSchedule.reduce((s, d) => s + d, 0));

/* ---------- Disposal, after 3 years straight-line ---------- */

export const disposalAccumulatedDepreciation = round(slSchedule[0] + slSchedule[1] + slSchedule[2]);
export const disposalBookValue = round(machineCost - disposalAccumulatedDepreciation);
export function disposalGainOrLoss(proceeds: number): number {
	return round(proceeds - disposalBookValue);
}

/* ---------- Change in estimate, after year 2 ---------- */

export const preRevisionYears = 2;
export const bookValueAfterYear2 = round(machineCost - slSchedule[0] - slSchedule[1]);
export function revisedAnnualDepreciation(remainingLife: number, revisedSalvage: number): number {
	return round((bookValueAfterYear2 - revisedSalvage) / remainingLife);
}
export const defaultRemainingLife = 4;
export const defaultRevisedSalvage = 400;
export const revisedAnnual = revisedAnnualDepreciation(defaultRemainingLife, defaultRevisedSalvage);

/* ---------- Fletcher Manufacturing: the machine, straight-line, sold after year 3 ---------- */

const fletcherSlAccounts = acctsFor(['101', '141', '142', '307', '318', '319', '505', '602']);
const fletcherSlCompany: Company = {
	name: 'Fletcher Manufacturing (straight-line)',
	accounts: fletcherSlAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: { '142': '141' }
};
const fletcherSlEntries: Entry[] = [
	{
		id: 'fletcher-open',
		date: '2024-01-01',
		lines: [{ acct: '101', dr: 20000 }, { acct: '307', cr: 20000 }],
		explanation: 'Owner invests $20,000 cash for common stock'
	},
	{
		id: '1',
		date: '2024-01-02',
		lines: [{ acct: '141', dr: 10000 }, { acct: '101', cr: 10000 }],
		explanation: 'Buy the machine: price $9,500, freight $300, installation $200, all cash'
	},
	{
		id: '2',
		date: '2024-12-31',
		lines: [{ acct: '602', dr: 1800 }, { acct: '142', cr: 1800 }],
		explanation: 'Year-1 straight-line depreciation'
	},
	{
		id: 'fletcher-year2-dep',
		date: '2025-12-31',
		lines: [{ acct: '602', dr: 1800 }, { acct: '142', cr: 1800 }],
		explanation: 'Year-2 straight-line depreciation'
	},
	{
		id: 'fletcher-year3-dep',
		date: '2026-12-31',
		lines: [{ acct: '602', dr: 1800 }, { acct: '142', cr: 1800 }],
		explanation: 'Year-3 straight-line depreciation'
	},
	{
		id: '7',
		date: '2027-01-01',
		lines: [
			{ acct: '101', dr: 5000 },
			{ acct: '142', dr: 5400 },
			{ acct: '141', cr: 10000 },
			{ acct: '505', cr: 400 }
		],
		explanation: 'Sell the machine after 3 years of straight-line for $5,000'
	}
];
const fletcherSlBalances = post(fletcherSlAccounts, fletcherSlEntries);
export const fletcherSl = { company: fletcherSlCompany, entries: fletcherSlEntries, balances: fletcherSlBalances };

/* ---------- Fletcher Manufacturing, double-declining-balance: a parallel universe for entry 3 alone ---------- */

const fletcherDdbAccounts = acctsFor(['101', '141', '142', '307', '318', '319', '602']);
const fletcherDdbCompany: Company = {
	name: 'Fletcher Manufacturing (double-declining-balance)',
	accounts: fletcherDdbAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: { '142': '141' }
};
const fletcherDdbEntries: Entry[] = [
	{
		id: 'fletcher-ddb-open',
		date: '2024-01-01',
		lines: [{ acct: '101', dr: 20000 }, { acct: '307', cr: 20000 }],
		explanation: 'Owner invests $20,000 cash for common stock'
	},
	{
		id: 'fletcher-ddb-buy',
		date: '2024-01-02',
		lines: [{ acct: '141', dr: 10000 }, { acct: '101', cr: 10000 }],
		explanation: 'Buy the machine: price $9,500, freight $300, installation $200, all cash'
	},
	{
		id: '3',
		date: '2024-12-31',
		lines: [{ acct: '602', dr: 4000 }, { acct: '142', cr: 4000 }],
		explanation: 'Year-1 double-declining-balance depreciation'
	}
];
const fletcherDdbBalances = post(fletcherDdbAccounts, fletcherDdbEntries);
export const fletcherDdb = { company: fletcherDdbCompany, entries: fletcherDdbEntries, balances: fletcherDdbBalances };

/* ---------- Bay Ridge Woodworks: lump-sum land/building, repairs, betterment, discard, depletion, amortization ---------- */

const bayRidgeAccounts = acctsFor([
	'101', '141', '151', '152', '161', '171', '181', '182', '191', '192', '307', '318', '319', '601', '603', '604', '605'
]);
const bayRidgeCompany: Company = {
	name: 'Bay Ridge Woodworks',
	accounts: bayRidgeAccounts,
	retainedEarningsAcct: '318',
	dividendsAcct: '319',
	contraOf: { '152': '151', '182': '181', '192': '191' }
};
const bayRidgeEntries: Entry[] = [
	{
		id: 'bayridge-open',
		date: '2024-01-01',
		lines: [
			{ acct: '101', dr: 2000000 },
			{ acct: '151', dr: 8000 },
			{ acct: '181', dr: 500000 },
			{ acct: '191', dr: 30000 },
			{ acct: '307', cr: 2538000 }
		],
		explanation: 'Owner invests cash, and the company already holds fully-depreciated equipment, a mine, and a patent'
	},
	{
		id: 'bayridge-equip-full-dep',
		date: '2024-01-01',
		lines: [{ acct: '603', dr: 8000 }, { acct: '152', cr: 8000 }],
		explanation: 'The equipment’s cost has already been fully depreciated in prior years'
	},
	{
		id: '4',
		date: '2024-03-01',
		lines: [{ acct: '161', dr: 270000 }, { acct: '171', dr: 630000 }, { acct: '101', cr: 900000 }],
		explanation: 'Pay $900,000 for land and a building appraised at $300,000 and $700,000'
	},
	{
		id: '5',
		date: '2024-04-15',
		lines: [{ acct: '601', dr: 150 }, { acct: '101', cr: 150 }],
		explanation: 'Ordinary repair to the machine'
	},
	{
		id: '6',
		date: '2024-05-01',
		lines: [{ acct: '141', dr: 1200 }, { acct: '101', cr: 1200 }],
		explanation: "Betterment: new part that extends the machine's life"
	},
	{
		id: '8',
		date: '2024-06-01',
		lines: [{ acct: '152', dr: 8000 }, { acct: '151', cr: 8000 }],
		explanation: 'Discard fully depreciated equipment that cost $8,000'
	},
	{
		id: '9',
		date: '2024-12-31',
		lines: [{ acct: '604', dr: 40000 }, { acct: '182', cr: 40000 }],
		explanation: 'Mine cost $500,000, 250,000 tons, no salvage; 20,000 tons mined and sold'
	},
	{
		id: '10',
		date: '2024-12-31',
		lines: [{ acct: '605', dr: 3000 }, { acct: '192', cr: 3000 }],
		explanation: 'Amortize a $30,000 patent over 10 years'
	}
];
const bayRidgeBalances = post(bayRidgeAccounts, bayRidgeEntries);
export const bayRidge = { company: bayRidgeCompany, entries: bayRidgeEntries, balances: bayRidgeBalances };

/* ---------- Lump-sum purchase ---------- */

export const lumpSumPrice = 900000;
export const landAppraisal = 300000;
export const buildingAppraisal = 700000;
export const totalAppraisal = round(landAppraisal + buildingAppraisal);
export const landAllocated = round(lumpSumPrice * (landAppraisal / totalAppraisal));
export const buildingAllocated = round(lumpSumPrice * (buildingAppraisal / totalAppraisal));

/* ---------- Depletion and total asset turnover ---------- */

export const mineCost = 500000;
export const mineTons = 250000;
export const mineSalvage = 0;
export const depletionRate = round((mineCost - mineSalvage) / mineTons);
export const tonsMined = 20000;
export const depletionExpense = round(depletionRate * tonsMined);

export const netSalesForTurnover = 800000;
export const averageTotalAssets = 400000;
export const totalAssetTurnover = round((netSalesForTurnover / averageTotalAssets) * 10) / 10;

/* ---------- Classification drill ---------- */

const CAPITALIZE_CATEGORIES = [
	{ id: 'asset', label: "Add to the asset's cost" },
	{ id: 'expense', label: 'Expense it now' }
];
export const classifications: Classification[] = [
	{ lo: 'C1', text: 'Freight to deliver a new machine', options: CAPITALIZE_CATEGORIES, answer: 'asset', why: 'Needed to get the asset ready for use.' },
	{ lo: 'C1', text: 'Installation and testing', options: CAPITALIZE_CATEGORIES, answer: 'asset', why: 'Same.' },
	{ lo: 'C1', text: 'Insurance while the machine is in transit', options: CAPITALIZE_CATEGORIES, answer: 'asset', why: 'Before it is ready for use.' },
	{ lo: 'C2', text: 'Insurance after the machine is running', options: CAPITALIZE_CATEGORIES, answer: 'expense', why: 'A cost of using it, period by period.' },
	{ lo: 'C2', text: 'Repairing damage caused by careless unloading', options: CAPITALIZE_CATEGORIES, answer: 'expense', why: 'Not a normal, necessary cost of getting it ready.' },
	{ lo: 'C2', text: 'Oil change and routine maintenance', options: CAPITALIZE_CATEGORIES, answer: 'expense', why: 'An ordinary repair; keeps the asset as it was.' },
	{
		lo: 'C2',
		text: 'Replacing a motor so the machine lasts three more years',
		options: CAPITALIZE_CATEGORIES,
		answer: 'asset',
		why: 'A betterment or extraordinary repair that extends its life.'
	},
	{ lo: 'C1', text: 'Clearing and grading land for a building', options: CAPITALIZE_CATEGORIES, answer: 'asset', why: "Part of the land's cost." },
	{ lo: 'C1', text: 'Paving a parking lot', options: CAPITALIZE_CATEGORIES, answer: 'asset', why: 'Land improvements, depreciated separately.' },
	{
		lo: 'C1',
		text: 'Back property taxes the buyer agrees to pay at purchase',
		options: CAPITALIZE_CATEGORIES,
		answer: 'asset',
		why: "Part of the price of the land."
	},
	{ lo: 'C2', text: 'Property taxes for the years after purchase', options: CAPITALIZE_CATEGORIES, answer: 'expense', why: 'A cost of owning it each year.' }
];

/* ---------- Entry drill: 10 situations, 10 cards ---------- */

export const entryDrillAccounts = acctsFor([
	'101', '141', '142', '151', '152', '161', '171', '181', '182', '191', '192', '505', '601', '602', '603', '604', '605'
]);
const allDrillEntries = [...fletcherSlEntries, ...fletcherDdbEntries, ...bayRidgeEntries];
function findEntry(id: string): Entry {
	const e = allDrillEntries.find((x) => x.id === id);
	if (!e) throw new Error(`Entry drill card references unknown entry ${id}`);
	return e;
}
export const entryCards: EntryCardSpec[] = [
	{ lo: 'C1', prompt: 'Buy the machine: price $9,500, freight $300, installation $200, all cash.', entry: findEntry('1') },
	{ lo: 'P1', prompt: 'Year-1 straight-line depreciation.', entry: findEntry('2') },
	{
		lo: 'P1',
		prompt: 'Year-1 double-declining-balance depreciation.',
		entry: findEntry('3'),
		hint: 'The rate applies to beginning book value, not cost minus salvage.'
	},
	{
		lo: 'C1',
		prompt: 'Pay $900,000 for land and a building appraised at $300,000 and $700,000.',
		entry: findEntry('4'),
		hint: 'Allocate by relative appraised value, not evenly.'
	},
	{ lo: 'C2', prompt: 'Ordinary repair to the machine.', entry: findEntry('5') },
	{ lo: 'C2', prompt: "Betterment: new part that extends the machine's life.", entry: findEntry('6') },
	{
		lo: 'A1',
		prompt: 'Sell the machine after 3 years of straight-line for $5,000.',
		entry: findEntry('7'),
		hint: 'Remove both the asset and its accumulated depreciation; the difference against cash is the gain or loss.'
	},
	{ lo: 'A1', prompt: 'Discard fully depreciated equipment that cost $8,000.', entry: findEntry('8') },
	{ lo: 'P2', prompt: 'Mine cost $500,000, 250,000 tons, no salvage; 20,000 tons mined and sold.', entry: findEntry('9') },
	{ lo: 'P2', prompt: 'Amortize a $30,000 patent over 10 years.', entry: findEntry('10') }
];

/* ---------- Recall rules ---------- */

export const rules: Rule[] = [
	{
		lo: 'P1',
		prompt: 'Every depreciation method for the same asset totals to:',
		options: [{ id: 'a', label: 'The same amount over its life' }, { id: 'b', label: 'A different amount, depending on the method' }],
		answer: 'a',
		why: 'Same total, different timing. Every method depreciates cost minus salvage; they only disagree on when.'
	},
	{
		lo: 'C1',
		prompt: 'Which of these is never depreciated?',
		options: [{ id: 'a', label: 'Land' }, { id: 'b', label: 'Land improvements' }],
		answer: 'a',
		why: 'Land does not wear out or become obsolete. Land improvements — parking lots, fences — are depreciated separately.'
	},
	{
		lo: 'P1',
		prompt: 'Double-declining-balance applies its rate to book value and stops when book value reaches:',
		options: [{ id: 'a', label: 'Zero' }, { id: 'b', label: 'Salvage value' }],
		answer: 'b',
		why: 'The rate ignores salvage when computing each year’s depreciation, but book value is never allowed to fall below it.'
	},
	{
		lo: 'A2',
		prompt: 'A change in a depreciation estimate applies to:',
		options: [{ id: 'a', label: 'Current and future years only' }, { id: 'b', label: 'All years, restated' }],
		answer: 'a',
		why: 'Prior years are never restated for a change in estimate — only what comes next changes.'
	},
	{
		lo: 'P2',
		prompt: 'Goodwill is:',
		options: [{ id: 'a', label: 'Amortized over its useful life' }, { id: 'b', label: 'Never amortized, only tested for impairment' }],
		answer: 'b',
		why: 'Unlike patents or copyrights, purchased goodwill is not amortized on a schedule — it is tested for impairment instead.'
	}
];

/* ---------- Formulas ---------- */

export const formulas: Formula[] = [
	{
		lo: 'P1',
		formula: 'Straight-line = (Cost − Salvage) ÷ Useful life',
		worked: `(${fmt(machineCost, { dollar: true })} − ${fmt(machineSalvage, { dollar: true })}) ÷ ${machineLife} = ${fmt(slSchedule[0], { dollar: true })}`
	},
	{
		lo: 'P1',
		formula: 'Units-of-production rate = (Cost − Salvage) ÷ Total units',
		worked: `${fmt(machineCost - machineSalvage, { dollar: true })} ÷ ${machineUnits.toLocaleString()} = ${fmt(unitsOfProductionRate, { dollar: true, decimals: 2 })} a unit`
	},
	{
		lo: 'P1',
		formula: 'Double-declining-balance = 2 × (1 ÷ Useful life) × Beginning book value',
		worked: `${((2 / machineLife) * 100).toFixed(0)}% × ${fmt(machineCost, { dollar: true })} = ${fmt(ddbSchedule[0], { dollar: true })}`
	},
	{
		lo: 'A1',
		formula: 'Book value = Cost − Accumulated depreciation',
		worked: `${fmt(machineCost, { dollar: true })} − ${fmt(disposalAccumulatedDepreciation, { dollar: true })} = ${fmt(disposalBookValue, { dollar: true })}`
	},
	{
		lo: 'A1',
		formula: 'Gain or loss on disposal = Proceeds − Book value',
		worked: `${fmt(5000, { dollar: true })} − ${fmt(disposalBookValue, { dollar: true })} = ${fmt(disposalGainOrLoss(5000), { dollar: true })} gain`
	},
	{
		lo: 'A2',
		formula: 'Revised depreciation = (Book value − Revised salvage) ÷ Remaining life',
		worked: `(${fmt(bookValueAfterYear2, { dollar: true })} − ${fmt(defaultRevisedSalvage, { dollar: true })}) ÷ ${defaultRemainingLife} = ${fmt(revisedAnnual, { dollar: true })}`
	},
	{
		lo: 'P2',
		formula: 'Depletion rate = (Cost − Salvage) ÷ Total units',
		worked: `${fmt(mineCost, { dollar: true })} ÷ ${mineTons.toLocaleString()} = ${fmt(depletionRate, { dollar: true })} a ton`
	},
	{
		lo: 'A3',
		formula: 'Total asset turnover = Net sales ÷ Average total assets',
		worked: `${fmt(netSalesForTurnover, { dollar: true })} ÷ ${fmt(averageTotalAssets, { dollar: true })} = ${totalAssetTurnover.toFixed(1)} times`
	}
];

/* ---------- Lessons (Learn) and instruments (Lab) ---------- */

export const lessons: LessonMeta[] = [
	{ id: 'plant-assets-and-cost', title: 'What it costs to get ready', lo: 'C1' },
	{ id: 'expenditures', title: 'Keep it running, or make it better', lo: 'C2' },
	{ id: 'depreciation-methods', title: 'Same total, different timing', lo: 'P1' },
	{ id: 'disposals', title: 'Measured against book value', lo: 'A1' },
	{ id: 'change-in-estimate', title: 'Only what comes next changes', lo: 'A2' },
	{ id: 'natural-resources-and-intangibles', title: 'Used up, or used over time', lo: 'P2' },
	{ id: 'turnover', title: 'How hard the assets work', lo: 'A3' }
];

export const instruments: InstrumentMeta[] = [
	{
		id: 'depreciation-curves',
		title: 'Depreciation curves',
		lo: 'P1',
		instruction: 'Switch between straight-line, units-of-production, and double-declining-balance and watch the yearly expense change while the total stays at $9,000.',
		resultLine: `Total depreciation ${fmt(slTotal, { dollar: true })} · Book value at end of year 5: ${fmt(machineSalvage, { dollar: true })}`,
		noticed:
			'The $1,000 salvage value was never depreciated. The methods only moved the $9,000 between years — double-declining puts almost half of it in year 1.'
	},
	{
		id: 'disposal',
		title: 'Disposal',
		lo: 'A1',
		instruction: 'Set the sale price and watch the gain or loss against book value.',
		resultLine: `Sold for ${fmt(5000, { dollar: true })} → gain ${fmt(disposalGainOrLoss(5000), { dollar: true })} · Sold for ${fmt(4000, { dollar: true })} → loss ${fmt(Math.abs(disposalGainOrLoss(4000)), { dollar: true })}`,
		noticed: 'The gain or loss is measured against book value, not the $10,000 it cost.'
	},
	{
		id: 'change-in-estimate',
		title: 'Change in estimate',
		lo: 'A2',
		instruction: 'Change the remaining life after year 2 and watch only the future years move.',
		resultLine: `Years 1–2: ${fmt(slSchedule[0], { dollar: true })} each (unchanged) · Years 3–6: ${fmt(revisedAnnual, { dollar: true })} each`,
		noticed: 'The first two years were not restated. A better estimate only changes what comes next.'
	}
];

/* ---------- Chapter export, anchors, invariants ---------- */

export const meta = {
	number: 8,
	slug: 'long-term-assets',
	title: 'Accounting for Long-Term Assets',
	part: 'financial' as const,
	status: 'live' as const,
	summary: "Spreading an asset's cost across the years it works.",
	instrument: 'Depreciation curves',
	oneLine:
		'A machine that works for five years should cost the business a piece of its price in each of those years. How big each piece is depends on the method.',
	headline: '**Same total, different timing.** Every method depreciates $9,000.'
};

export const chapter: ChapterContent = {
	meta,
	objectives,
	terms,
	quickChecks,
	accounts,
	classifications,
	entryCards,
	rules,
	formulas,
	lessons,
	instruments,
	journalPatterns: entryCards.map((c) => c.entry),
	ledgers: [
		{ label: 'Fletcher Manufacturing, straight-line — buy, depreciate, sell', company: fletcherSlCompany, entries: fletcherSlEntries },
		{ label: 'Fletcher Manufacturing, double-declining-balance', company: fletcherDdbCompany, entries: fletcherDdbEntries },
		{ label: 'Bay Ridge Woodworks, acquisitions, expenditures, and disposals', company: bayRidgeCompany, entries: bayRidgeEntries }
	],
	anchors: (): Anchor[] => [
		{ label: 'Straight-line, each year', expected: 1800, actual: slSchedule[0] },
		{ label: 'Units-of-production rate', expected: 0.25, actual: unitsOfProductionRate },
		{ label: 'Units-of-production, year 1', expected: 1750, actual: uopSchedule[0] },
		{ label: 'Units-of-production, year 2', expected: 2000, actual: uopSchedule[1] },
		{ label: 'Units-of-production, year 3', expected: 2250, actual: uopSchedule[2] },
		{ label: 'Units-of-production, year 4', expected: 1750, actual: uopSchedule[3] },
		{ label: 'Units-of-production, year 5', expected: 1250, actual: uopSchedule[4] },
		{ label: 'Double-declining-balance, year 1', expected: 4000, actual: ddbSchedule[0] },
		{ label: 'Double-declining-balance, year 2', expected: 2400, actual: ddbSchedule[1] },
		{ label: 'Double-declining-balance, year 3', expected: 1440, actual: ddbSchedule[2] },
		{ label: 'Double-declining-balance, year 4', expected: 864, actual: ddbSchedule[3] },
		{ label: 'Double-declining-balance, year 5', expected: 296, actual: ddbSchedule[4] },
		{ label: 'Total depreciation, straight-line', expected: 9000, actual: slTotal },
		{ label: 'Total depreciation, units-of-production', expected: 9000, actual: uopTotal },
		{ label: 'Total depreciation, double-declining-balance', expected: 9000, actual: ddbTotal },
		{ label: 'Disposal after 3 years at 5,000', expected: 400, actual: disposalGainOrLoss(5000) },
		{ label: 'Revised annual depreciation', expected: 1500, actual: revisedAnnual },
		{ label: 'Lump-sum allocation: land', expected: 270000, actual: landAllocated },
		{ label: 'Lump-sum allocation: building', expected: 630000, actual: buildingAllocated },
		{ label: 'Depletion expense', expected: 40000, actual: depletionExpense },
		{ label: 'Total asset turnover', expected: 2, actual: totalAssetTurnover }
	],
	invariants: () => {
		if (classifications.length !== 11)
			throw new Error(`Chapter 8 should have 11 classification items, has ${classifications.length}`);
		if (entryCards.length !== 10)
			throw new Error(`Chapter 8 should have 10 entry-drill cards, has ${entryCards.length}`);
		for (const c of classifications) {
			if (!c.options.some((o) => o.id === c.answer))
				throw new Error(`Classification answer not in options: ${c.text}`);
		}
		for (const r of rules) {
			if (!r.options.some((o) => o.id === r.answer))
				throw new Error(`Rule answer not in options: ${r.prompt}`);
		}
		if (Math.abs(bookValueSchedule('ddb')[machineLife - 1] - machineSalvage) > 0.01)
			throw new Error('Double-declining-balance should end exactly at salvage value');
	}
};
