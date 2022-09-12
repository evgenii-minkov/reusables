import { useEffect, useState } from "react";

// https://github.com/atlassian/react-beautiful-dnd/issues/1196#issuecomment-1008076283
export default function useBeautifulDndSSR () {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
		setIsBrowser(process.browser);
	}, []);

	return isBrowser;
};