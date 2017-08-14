'use strict';
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LocationSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	photos: {
		data: Buffer,
		contentType: String
		
	},
	zipCode: {
		type: String,
		required: true
	},
	province: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	favorite: {
		type: Boolean,
		default: false
	},
	coordinates: {
		
	}


});


module.exports = mongoose.model("location", LocationSchema);