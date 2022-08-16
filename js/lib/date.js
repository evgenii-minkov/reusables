/** 
 * date-fns
 **/

import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";
import parse from "date-fns/parse";
import enUS from "date-fns/locale/en-US";


const DEFAULT_LOCALE = enUS;
const DEFAULT_DURATION_FORMAT = ["years", "months", "days"];

export const validateDate = date => Boolean(Date.parse(date));

export const mapDateToDuration = (date) => {
	if (!validateDate(date))
		return null;

	return intervalToDuration({
		start: new Date(date),
		end: new Date(),
	});
};

export const mapDateToDurationVerbose = (date, { formatter, format = DEFAULT_DURATION_FORMAT, locale = DEFAULT_LOCALE } = {}) => {
	const duration = mapDateToDuration(date);
	if (!duration)
		return "";

	formatter = typeof formatter === "function" ? formatter : formatDuration;

	return formatter(duration, { format, locale });
};

export const mapTimestampToDate = (timestamp, { isSeconds = true } = {}) => {
	const format = isSeconds ? "t" : "T";

	const parsed = parse(timestamp, format, new Date())

	return validateDate(parsed) ? parsed : null;
};