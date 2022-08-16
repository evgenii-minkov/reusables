export function formQuery(options = {}) {
	// insanity check
	if (!window)
		return "";

	if (
		typeof options !== "object" || !options
		|| Object.keys(options).length === 0
	)
		return "";

	return "?" + Object.entries(options)
		.filter(([, value]) => value !== void 0)
		.map(([key, value]) => `${ key }=${ window.encodeURIComponent(value) }`)
		.join("&");
}