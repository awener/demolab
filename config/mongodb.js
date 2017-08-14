'use strict';
const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

const config = {
	db: "mongodb://localhost/testlab",
	options: {
		useMongoClient: true
	}
}


module.exports = mongoose.connect(config.db, config.options);