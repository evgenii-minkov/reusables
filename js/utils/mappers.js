import { conjugateQuantityRus } from "./formatters";

export const mapKopecksToRubles = (_kopecks, { raw = false, withKopecks=true } = {}) => {
	if(typeof _kopecks !== "number" || _kopecks === 0)
		return raw ? 0 : withKopecks ? "0,00" : "0";

	const rubles = Math.trunc(_kopecks / 100);
	const kopecks = _kopecks % 100;

	if(raw)
		return rubles + (withKopecks ? kopecks / 100 : 0);

	return rubles
		+ (withKopecks
				? "," + kopecks + (kopecks <= 9 ? "0" : "")
				: ""
		);
};

export const mapKopecksToRublesVerbose = priceKopecks => {
	const rubles = mapKopecksToRubles(priceKopecks, { raw: true, withKopecks: true });
	const title = conjugateQuantityRus(rubles, ["рубль", "рубля", "рублей"]);

	return rubles + " " + title;
};

/** 
 * Returns a function that applies a sequence of mappings to an item
 * 
 * @param {Function[]} mappers
 * 
 * @returns {Function}
 */
export const mapPipeline = (...mappers) => {
	return function(item) {
		for(const mapper of mappers)
			if(typeof mapper === "function")
				item = mapper(item);

		return item;
	}
};