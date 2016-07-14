// list of manager views for admin, regions, chapters, and events
var Model = require('../models/event');

module.exports = function(app) {
	// manager view for a specific region
	app.get('/:region_name', function(req, res) {

		Model.region.findOne({"name": req.params.region_name}, function(err, region) {
		    if (err)
		        res.send(err);

		    console.log(region);

		    res.render('region.ejs', {region: region}, function(err, html) {
		    	if (err) {
		    		res.send(err);
		    	}
		    	res.send(html);
		    });
		});
	});

	// manager view for specific chapter
	app.get('/:region_name/:chapter_name', function(req, res) {
	    Model.region.aggregate([
	        { $match: {"name": req.params.region_name}},
	        { $unwind: "$chapters"},
	        { $match: {"chapters.name": req.params.chapter_name}},
	    ]).exec(function(err, region) {
	        if (err)
	            res.send(err);

	        console.log(region[0]);

	        res.render('chapter.ejs', {region: region[0]}, function(err, html) {
	        	if (err) {
	        		res.send(err);
	        	}
	        	res.send(html);
	        });
	    });
	});
}