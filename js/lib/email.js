import { REGEX_EMAIL_JSON_STRING } from "@constants"; // TODO usually, this is in process.env during runtime

const EMAIL_REGEXP = buildRegexpFromStringifiedJSON(REGEX_EMAIL_JSON_STRING);

export const validateEmail = (email) => {
	if(!email || typeof email !== "string")
		return false;

	return Boolean(
		email
			.toLowerCase()
			.match(EMAIL_REGEXP)
	);
};