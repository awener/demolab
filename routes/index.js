'use strict';
const api = require("../controllers/api");

module.exports = function(app, db) {

	app.get("/api/places", api.list);
	app.get("/api/places/favorite", api.favorites);
	app.get("/api/places/:location", api.findLocation);
	app.post("/api/places/favorite", api.addFavorite);
	app.post("/api/places/:location", api.addLocation);
	app.put("/api/places/:location", api.updateLocation);


	app.get("/", api.index);
}