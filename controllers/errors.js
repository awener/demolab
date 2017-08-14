'use strict';


module.exports = function(err, res) {
	var error = [];
	for(var i in err) {
		error.push(err[i].message);
	}
	console.log(error)
	return res.status(200).jsonp({error: error })
}