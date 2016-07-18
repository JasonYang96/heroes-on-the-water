var Model = require('../models/event');

module.exports = function(app) {
	function getEvents(res) {
	    Model.region.find(function(err, events) {
	        if (err) {
	            res.send(err);
	        }
	        res.json(events);
	    });
	}

	// get all events
	app.get('/api/events', function(req, res) {
	    getEvents(res);
	});

	// region api ---------------------------------------------------------------------

	// create a new region
	app.post('/api/events/', function(req, res) {
	    Model.region.create({
	        name: req.body.name,
	        chapters: []
	    }, function(err, regions) {
	        if (err)
	            res.send(err);

	        getEvents(res);
	    })
	});

	// get a specific region
	app.get('/api/events/:region_name', function(req, res) {
	    Model.region.findOne({"name": req.params.region_name}, function(err, region) {
	        if (err)
	            res.send(err)

	        res.json(region);
	    });
	});

	// delete a region
	app.delete('/api/events/:region_name', function(req, res) {
	    Model.region.find({"name": req.params.region_name}).remove().exec();

	    getEvents(res);
	});

	// chapter api ---------------------------------------------------------------------

	// get a specific region's chapter
	app.get('/api/events/:region_name/:chapter_name', function(req, res) {
	    Model.region.aggregate([
	        { $match: {"name": req.params.region_name}},
	        { $unwind: "$chapters"},
	        { $match: {"chapters.name": req.params.chapter_name}},
	    ]).exec(function(err, chapter) {
	        if (err)
	            res.send(err);

	        res.json(chapter);
	    });
	})

	// create a new chapter
	app.post('/api/events/:region_name', function(req, res) {
	    var chapter = new Model.chapter({
	        name: req.body.name,
	        location: req.body.location,
	        events: []
	    });

	    console.log(req.params);
	    Model.region.findOneAndUpdate({"name": req.params.region_name}, {$addToSet: {chapters: chapter}}, {}, function(err, regions) {
	        if (err)
	            res.send(err);

	        getEvents(res);
	    })
	});

	// delete a chapter
	app.delete('/api/events/:region_name/:chapter_id', function(req, res) {
	    Model.region.findOne({"name": req.params.region_name}).exec(function(err, region) {
	    	if (err) {
	    		res.send(err);
	    	}

	    	console.log(region);

	    	region.chapters.id(req.params.chapter_id).remove();
	    	region.save();

	    	getEvents(res);
	    })
	});

	// event api ---------------------------------------------------------------------

	// get a specific region's chapter's event
	app.get('/api/events/:region_name/:chapter_name/:event_name', function(req, res) {
	    Model.region.aggregate([
	        { $match: {"name": req.params.region_name}},
	        { $unwind: "$chapters"},
	        { $match: {"chapters.name": req.params.chapter_name}},
	        { $unwind: "$chapters.events"},
	        { $match: {"chapters.events.name" : req.params.event_name}}
	    ]).exec(function(err, event) {
	        if (err)
	            res.send(err);

	        res.json(event);
	    });
	})

	// create event and send back all events after creation
	app.post('/api/events/:region_name/:chapter_name', function(req, res) {
	    var event = new Model.event({
	        name : req.body.name,
	        date : req.body.date,
	        start: req.body.start,
	        end  : req.body.end,
	        venue: req.body.venue,
	        description : req.body.description,
	        done : false
	    });

	    Model.region.findOneAndUpdate(
	        {"name": req.params.region_name, "chapters.name": req.params.chapter_name}, 
	        {$addToSet: {"chapters.$.events": event}}, 
	        {upsert: true}, 
	        function(err, event) {
	            if (err)
	                res.send(err);

	            getEvents(res);
	        }
	    );
	});

	// delete an event and send back all events after deletion
	app.delete('/api/events/:region_name/:chapter_name/:event_name', function(req, res) {
		Model.region.findOneAndUpdate(
		    {"name": req.params.region_name,
		     "chapters.name": req.params.chapter_name}, 
		    {$pull: {"chapters.event.name": req.params.event_name}}, 
		    function(err, regions) {
		        if (err)
		            res.send(err);

		        console.log(regions);

		        getEvents(res)
			}
		);
	});

	// inventory api ----------------------------------------------------------------------

	// create an inventory listing
	app.post('/api/events/:region_name/:chapter_name/:event_name', function(req, res) {
		var item = {
			"item": req.body.item,
			"number": req.body.number
		}

		Model.region.findOneAndUpdate(
			{"name": req.params.region_name,
			 "chapters.name": req.params.chapter_name,
			 "chapters.events.name": req.params.event_name},
			{$addToSet: {"chapters.$.events.0.inventory": item}},
			{upsert: true},
			function(err, event) {
				if (err) {
					res.send(err);
				}
				getEvents(res);
			}
		);
	});
}