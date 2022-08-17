const mongo = require("mongoose");

const sellerSchema = new mongo.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone_number: {
		type: Number,
		required: false,
	},
	website: {
		type: String,
		required: false,
	},
	seller_country: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
})

module.exports = mongo.model('seller', sellerSchema);
