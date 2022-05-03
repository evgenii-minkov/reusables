import mongoose from "mongoose";


class DB {
	mongoURI = process.env.MONGODB_URI;										// TODO define this
	reconnectionRetryTimeout = process.env.MONGODB_RECONNECTION_TIMEOUT;	// TODO and this
	isDebug = process.env.NODE_ENV === "development"

	constructor() {
		this.mongoose = mongoose;

		this.connect();
	}

	connect(error) {
		if(error)
			console.error(error);

		if(this.mongoose.connection.readyState >= 1)
			return;

		if(typeof this.mongoURI !== "string")
			throw new Error("No valid mongoDB connection string provided");

		const reconnect = this.connect.bind(this);

		this.mongoose.set("debug", this.isDebug);

		return this.mongoose.connect(this.mongoURI).catch(error => {
			setTimeout(reconnect, this.reconnectionRetryTimeout, error);
		});
	}
}

export default new DB();
