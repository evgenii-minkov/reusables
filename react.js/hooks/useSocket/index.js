import { useEffect } from "react";
import PropTypes from "prop-types";
import SocketIO from "socket.io-client";


const API_URL_SOCKETS = "/" + process.env.API_URL_SOCKETS;	// TODO define this
const HOST = process.env.HOST;								// TODO and this

// next.js version
const socket = SocketIO.connect(HOST, { path: API_URL_SOCKETS });
// express.js version
// const socket = SocketIO.io("/");


export default function useSocket(props) {
	// connect to socket.io-server when props.handlers change
	useEffect(() => {
		// sanity check
		if (!socket)
			return;

		if (!props.handlers || typeof props.handlers !== "object" || Object.keys(props.handlers).length === 0)
			return;

		// defining handlers for each message passed as a key in props.handlers
		for (const message of Object.keys(props.handlers)) {
			if (typeof props.handlers[message] !== "function")
				continue;

			socket.on(message, props.handlers[message]);
		}

		return () => {
			// sanity check
			if (!socket)
				return;

			// removing previously added listeners
			for (const message of Object.keys(props.handlers)) {
				if (typeof props.handlers[message] !== "function")
					continue;

				socket.off(message, props.handlers[message]);
			}

			// if needed, disconnecting from socket.io-server on unmount
			if(props.toDisconnectOnUnmount)
				socketReceiver.disconnect();
		};
	}, [props.handlers]);

	return socket;
}

useSocket.defaultProps = {
	toDisconnectOnUnmount: false,
};
useSocket.propTypes = {
	toDisconnectOnUnmount: PropTypes.bool,
	handlers: PropTypes.object,
};