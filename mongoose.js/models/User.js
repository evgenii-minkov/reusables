import DB from "../index";
// const DB = require("../index");


const USER_ROLES = process.env.USER_ROLES;				// TODO define this
const PHONE_COUNTRIES = process.env.PHONE_COUNTRIES; 	// TODO and this


const UserSchema = new DB.mongoose.Schema({
	emailIsVerified: {
		type: Boolean,
		default: false,
	},

	dCreated: {
		type: Date,
		default: Date.now,
	},
	telegram: {
		type: Object,
		default: null,
	},
	role: {
		type: String,
		default: USER_ROLES.USER,
	},

	// required fields
	password: {
		required: true,
		type: String,
	},
	name: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		type: String,
	},
	phone: {
		required: true,
		type: String,
	},
	phoneCountry: {
		required: true,
		type: String,
		enum: Object.values(PHONE_COUNTRIES),
	},
	hash: {
		required: true,
		index: true,
		type: String,
	},
});

export default DB.mongoose.models.User || DB.mongoose.model("User", UserSchema);
// module.exports = DB.mongoose.model("User", UserSchema);