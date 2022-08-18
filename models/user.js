const mongo = require("mongoose");

const userSchema = new mongo.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
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
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
	updated_at: {
		type: Date,
		required: false,
	},
	favorites: {
		type: Array,
		required: false,
	},
})

module.exports = mongo.model('user', userSchema);