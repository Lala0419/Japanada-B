const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	[
		{
			userId: {
				type: String,
				required: true,
			},
			title: {
				type: String,
				max: 100,
				required: true,
			},
			desc: {
				type: String,
				max: 500,
				required: true,
			},
			img: {
				type: Array,
				required: true,
			},
			location: {
				type: String,
				required: true,
			},
			calender: {
				type: String,
				required: true,
			},
			bedroom: {
				type: String,
				required: true,
			},
			bathroom: {
				type: String,
				required: true,
			},
		},
	],
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
