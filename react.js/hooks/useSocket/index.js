import { useEffect } from "react";
import PropTypes from "prop-types";
import SocketIO from "socket.io-client";


const API_URL_SOCKETS = "/" + process.env.API_URL_SOCKETS;	// TODO define this
const HOST = process.env.HOST;								// TODO and this


export default function useSocket(props) {
	// connect to socket.io-server when props.handlers change
	useEffect(() => {
		if(!props.handlers || typeof props.handlers !== "object" || Object.keys(props.handlers).length === 0)
			return;

		// connecting
		const socketReceiver = SocketIO.connect(HOST, { path: API_URL_SOCKETS });

		// defining handlers for each message passed as a key in props.handlers
		for(const message of Object.keys(props.handlers)) {
			if(typeof props.handlers[message] !== "function")
				continue;

			socketReceiver.on(message, props.handlers[message]);
		}

		// if needed, disconnecting from socket.io-server on unmount
		return () => props.toDisconnectOnUnmount && socketReceiver ? socketReceiver.disconnect() : true;
	}, [props.handlers]);
}

useSocket.defaultProps = {
	toDisconnectOnUnmount: true,
};
useSocket.propTypes = {
	toDisconnectOnUnmount: PropTypes.bool,
	handlers: PropTypes.object,
};