/**
 * Conjugates a word in russian, depending on the quantity of the subject
 * - example: conjugateQuantityRus(5, [котенок, котенка, котят]) === 5 котят
 *
 * @param {!Number} quantity
 * @param {!String[]} titles - ordered array of word's numeric conjugations [titleForOne, titleForTwo, titleForFive]
 * @returns {*}
 */
export function conjugateQuantityRus(quantity, titles) {
	const cases = [2, 0, 1, 1, 1, 2];
	if (!Array.isArray(titles))
		return "";

	return titles[
		quantity % 100 > 4 && quantity % 100 < 20
			? 2
			: cases[quantity % 10 < 5 ? quantity % 10 : 5]
	];
}