export function capitalizeFirstLetter(string) {
	if(typeof string !== "string" || string.length === 0)
		return string;

	if(string.length === 1)
		return string[0].toLocaleUpperCase();

	return string[0].toLocaleUpperCase() + string.slice(1).toLocaleLowerCase();
}