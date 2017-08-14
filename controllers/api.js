'use strict';
var mongoose = require("mongoose");
var Location = mongoose.model('location');
var errors = require("./errors");
var request = require('request');
exports.index = function(req, res) {
	return res.render("index.html");
}

exports.list = function(req, res) {
	var count = parseInt(req.query.count);
	var page = parseInt(req.query.page);
	if (typeof req.query.page === 'undefined'){
    	req.query.page = 1;
  }

 
	if(!req.query.sorting) req.query.sorting = { name: "desc" };
	Location.find({}).sort(req.query.sorting)
        .skip(count * (page - 1))
        .limit(count).exec(function(err, data) {
		return res.status(200).jsonp({list: data});
	});

}

exports.favorites = function(req, res) {

}


function getCoords(country, city, cb) {

	var coordinates = "https://maps.googleapis.com/maps/api/geocode/json?address="+country+"+" +city+ "&key=AIzaSyAByx66VVeWYSrp_n5ULUw9QQI57pQMqKI";

	request.get(coordinates, function(err, resp, body) {
		body = JSON.parse(body);
		return cb(body.results[0].geometry.location);
	})	
}


exports.findLocation = function(req, res) {
	
	Location.findOne({ $or: [{ city: req.params.location }, { coordinates: req.params.location }]}, function(err, resp) {
		if(!resp) return res.status(200).jsonp({data: false});
		return res.status(200).jsonp({data: resp});
	})
}

exports.addLocation = function(req, res) {

	console.log("problem??");
	var country = req.body.country;
	var city = req.body.city;
	var distance = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC&destinations=San+Francisco&mode=car&language=en&key=AIzaSyAByx66VVeWYSrp_n5ULUw9QQI57pQMqKI";

		getCoords(country, city, function(coords) {
			console.log("coordinates??");
			req.body.coordinates =  coords;
		
	
	if(req.files) {
		req.body.photos = {
			data: req.files.file.data,
			contentType: req.files.file.mimetype
		}
	}
	
	var addNew = new Location(req.body).save(function(err) {
		if(err && err.errors) return errors(err.errors, res);
		return res.status(200).end("");
	})
	

	})

}

exports.updateLocation = function(req, res) {


	Location.findOne({_id: req.body._id}, function(err, data) {
		if(req.body.country != data.country || req.body.city != data.city) {
			getCoords(req.body.country, req.body.city, function(coords) {
				req.body.coordinates = coords;
				Location.update({_id: req.body._id}, { $set: req.body }, function() {
					return res.status(200).end();
				});
			});

		} else {
			Location.update({_id: req.body._id}, { $set: req.body }, function() {
				return res.status(200).end("");
			});
				

		}
	})
	
}

exports.addFavorite = function(req, res) {

	Location.update({_id: req.body._id}, { $set: {
		favorite: req.body.status
	}}, function(err, data) {
		
		return res.status(200).end();

	})


}
