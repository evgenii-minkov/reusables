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