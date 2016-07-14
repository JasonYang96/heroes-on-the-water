var Model = require('../models/event');

module.exports = function(app) {
	app.get('/:region_name', function(req, res) {

		Model.region.findOne({"name": req.params.region_name}, function(err, region) {
		    if (err)
		        res.send(err);

		    res.render('region.ejs', {region: region}, function(err, html) {
		    	if (err) {
		    		res.send(err);
		    	}
		    	res.send(html);
		    });
		});
	});

	app.get('/:region_name/:chapter_name', function(req, res) {
	    Model.region.aggregate([
	        { $match: {"name": req.params.region_name}},
	        { $unwind: "$chapters"},
	        { $match: {"chapters.name": req.params.chapter_name}},
	    ]).exec(function(err, chapter) {
	        if (err)
	            res.send(err);

	        res.json(chapter);
	    });
	});
}