'use strict'
module.exports = app => {
	const mongoose = app.mongoose
	const Schema = mongoose.Schema
	const StaffSchema = new Schema(
		{
			_id: Number,
			name: String,
			cname: String,
			email: String,
			qq: String,
			dept: String
		},
		{
			versionKey: false
		}
	)
	return mongoose.model('Staff', StaffSchema)
}
