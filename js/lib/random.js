const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~";
const DEFAULT_RANDOM_STRING_LENGTH = 13;
export function generateRandomString({ alphabet = DEFAULT_ALPHABET, length = DEFAULT_RANDOM_STRING_LENGTH } = {}) {
	let randomString = "";

	if(!length || !alphabet?.length)
		return randomString;

	for(let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * alphabet.length);
		randomString += alphabet[randomIndex];
	}

	return randomString;
}

const HEX_ALPHABET = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const HEX_PREFIX = "#";
const HEX_LENGTH = 6;
const HEX_RADIX = 16;
export function generateRandomHex() {
	return HEX_PREFIX + generateRandomString({ alphabet: HEX_ALPHABET, length: HEX_LENGTH });
}

export function generateRandomHex2() {
	return HEX_PREFIX + Math.floor(Math.random() * 0xffffff).toString(HEX_RADIX).padStart(HEX_LENGTH, "0");
}