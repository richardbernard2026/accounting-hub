/**
 * The "identify" step needs a source document and a plain-language event for
 * each of the sixteen transactions. The brief gives the transaction itself;
 * the source document is mine — a reasonable one for the kind of paperwork
 * that transaction would actually generate, not a number, so it carries no
 * [book]/[ledger] tag.
 */
export const sourceDocs: Record<string, string> = {
	'1': 'Bank deposit slip and stock certificate',
	'2': 'Cash register receipt',
	'3': 'Invoice and cash receipt',
	'4': 'Purchase invoice',
	'5': 'Cash receipt / sales ticket',
	'6': 'Check and landlord’s receipt',
	'7': 'Time card and check',
	'8': 'Invoice sent to the client',
	'9': 'Remittance advice and deposit slip',
	'10': 'Check and the vendor’s invoice marked paid',
	'11': 'Board authorization and check',
	'12': 'Cash receipt and signed contract',
	'13': 'Insurance policy and check',
	'14': 'Cash register receipt',
	'15': 'Time card and check',
	'16': 'Utility bill and check'
};
