export const buildRegexpFromStringifiedJSON = stringifiedJSON => {
	try {
		const parsed = JSON.parse(stringifiedJSON);
		return new RegExp(parsed.source, parsed.flags);
	} catch (e) {
		return null;
	}
};