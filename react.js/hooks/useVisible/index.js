import { useEffect, useRef, useState } from "react";


/** Detects whether the DOM element is visible */
export default function useVisible({ ref }) {
	const [isVisible, setVisible] = useState(false);

	const observerRef = useRef(null);

	useEffect(() => {
		observerRef.current = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
	}, []);

	useEffect(() => {
		if(!ref || !ref.current)
			return;

		observerRef.current.observe(ref.current);

		return () => {
			observerRef.current.disconnect();
		};
	}, [ref]);

	return isVisible;
}