import React, { useCallback, useState } from "react";
import classNames from "classnames";

import ToggleIcon from "./toggle.svg"; // TODO this is possible w/ some webpack magic

import styles from "./togglecontent.module.scss"; // TODO declare module.scss type


type STATUSES = "on" | "off";


export default function ToggleContent(props: ToggleContentProps) {
	const [status, setStatus] = useState<STATUSES>("off");

	const toggle = useCallback(() => {
		switch(status) {
			case "off":
				return setStatus("on");
			case "on":
				return setStatus("off");
		}
	}, [status]);

	return (
		<div className={ styles.wrapper }>
			<div className={ classNames(styles.control) }>
				<div 
					className={ classNames(styles.button, styles[status]) } 
					
					onClick={ toggle }
				>
					<ToggleIcon height="100%" width="100%"/>
				</div>
				{ props.title && (<div className={ styles.title }>{ props.title }</div>) }
			</div>
			{ status === "on" && props.children }
		</div>
	);
}

type ToggleContentProps = {
	children?: React.ReactNode,
	title?: string,
};