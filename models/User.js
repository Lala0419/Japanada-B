// data schema, users personal info like name, passward and email

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			min: 3,
			max: 25,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 50,
			unique: true,
		},
		profilePicture: {
			type: String,
			default: "",
		},
		coverPicture: {
			type: String,
			default: "",
		},
		isAdmin: {
			//allowed or not
			type: Boolean,
			defult: false,
		},
		desc: {
			//description
			type: String,
			max: 200,
		},
		city: {
			type: String,
			max: 50,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
