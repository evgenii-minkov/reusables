/** 
 * date-fns
 **/

import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";
import enUS from "date-fns/locale/en-US";

import { validateDate } from "@utils/validators"; // TODO implement this


const DEFAULT_LOCALE = enUS;
const DEFAULT_DURATION_FORMAT = ["years", "months", "days"];

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

	return parse(timestamp, format, new Date());
};