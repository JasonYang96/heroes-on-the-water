var mongoose = require('mongoose');

// define model =================
module.exports = mongoose.model('region', {
    name : String,
    chapters : [{
	    name: String,
	    location: String,
	    events: [{
		    description : String,
		    name : String,
		    venue : String
		}]
	}]
});