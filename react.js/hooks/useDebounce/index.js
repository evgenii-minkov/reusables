import { useRef, useCallback } from "react";


/** Debounces some __callback for __timeout ms */
export default function useDebounce(callback, timeout = 0) {
	const debounce = useRef();

	return useCallback((...args) => {
		clearTimeout(debounce.current);
		debounce.current = setTimeout(callback, timeout, ...args);
	}, [callback]);
}