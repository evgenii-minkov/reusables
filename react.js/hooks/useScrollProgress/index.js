import { useEffect, useState, useRef } from "react";


// TODO try w/ specific nodes, not just window
export default function useScrollProgress() {
	const [scrollProgress, setScrollProgress] = useState(1);
	const scrollRef = useRef(null);

	useEffect(() => {
		const scrollElement = scrollRef.current;

		function onScroll() {
			if(scrollElement.scrollHeight > scrollElement.offsetHeight) {
				setScrollProgress(
					scrollElement.scrollTop / (scrollElement.scrollHeight - scrollElement.offsetHeight)
				);
			} else {
				setScrollProgress(1);
			}
		}

		onScroll();

		// observer is required for infinite containers - w/out it scrollProgress won't update
		const observer = new MutationObserver(onScroll);
		observer.observe(scrollElement, { attributes: true, childList: true, subtree: true });

		window.addEventListener("load", onScroll);
		window.addEventListener("resize", onScroll);
		scrollElement.addEventListener("scroll", onScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener("load", onScroll);
			window.removeEventListener("resize", onScroll);
			scrollElement.removeEventListener("scroll", onScroll);
		};
	}, []);

	return { scrollProgress, scrollRef };
}
