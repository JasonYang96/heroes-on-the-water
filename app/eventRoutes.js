var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

// define models =================
var Event = mongoose.model('event', {
    description : String,
    name : String,
    venue : String
});

var Chapter = mongoose.model('chapter', {
    name: String,
    location: String,
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
});

var Region = mongoose.model('region', {
    name : String,
    chapters : []
    //chapters : [{type: Schema.Types.ObjectId, ref:'Chapter'}]
});

module.exports = function(app) {
	function getEvents(res) {
	    Region.find(function(err, events) {
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
	    Region.create({
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
	    Region.findOne({"name": req.params.region_name}, function(err, region) {
	        if (err)
	            res.send(err)

	        res.json(region);
	    });
	});

	// delete a region
	app.delete('/api/events/:region_name', function(req, res) {
	    Region.find({"name": req.params.region_name}).remove().exec();

	    getEvents(res);
	});

	// chapter api ---------------------------------------------------------------------

	// get a specific region's chapter
	app.get('/api/events/:region_name/:chapter_name', function(req, res) {
	    Region.aggregate([
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
		// Chapter.create({
		// 	name: req.body.name,
	 //        location: req.body.location,
	 //        events: []
		// }, function(err, chapter) {
		// 	if (err) {
		// 		res.send(err);
		// 	}

		// 	console.log(chapter);
		// 	Region.findOneAndUpdate({"name": req.params.region_name}, {$addToSet: {chapters: chapter}}, {}, function(err, regions) {
		// 	    if (err)
		// 	        res.send(err);

		// 	    getEvents(res);
		// 	});
		// });

	    var chapter = new Chapter({
	        name: req.body.name,
	        location: req.body.location,
	        events: []
	    });

	    console.log(req.params);
	    Region.findOneAndUpdate({"name": req.params.region_name}, {$addToSet: {chapters: chapter}}, {}, function(err, regions) {
	        if (err)
	            res.send(err);

	        getEvents(res);
	    })
	});

	// delete a chapter
	app.delete('/api/events/:region_name/:chapter_id', function(req, res) {
		// Chapter.remove({
		// 	"name": req.params.chapter_name
		// }, function(err, chapter) {
		// 	if (err) {
		// 		res.send(err);
		// 	}

		// 	console.log(chapter);

		// 	getEvents(res);
		// })
		// console.log(req.params);
	    // Region.findOneAndUpdate({"name": req.params.region_name}, {$pull: {"$chapters": {"chapters.name": req.params.chapter_name}}}, {new: true}, function(err, regions) {
	    //     if (err) {
	    //         res.send(err);
	    //     }

	    //     console.log(regions);
	    //     getEvents(res);
	    // });

	    Region.findOne({"name": req.params.region_name}).exec(function(err, region) {
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
	    Region.aggregate([
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
	app.post('/api/events/:region_name/:chapter_name/', function(req, res) {

	    var event = new Event({
	        description : req.body.description,
	        name : req.body.name,
	        venue: req.body.venue,
	        done : false
	    });

	    Region.findOneAndUpdate(
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
		console.log(req.body);
		Event.findByIdAndRemove(req.body.event_id, function(err, event) {
			if (err)
				res.send(err);

			getEvents(res);
		})

		// Region.findOneAndUpdate(
		//     {"name": req.params.region_name,
		//      "chapters.name": req.params.chapter_name}, 
		//     {$pull: {"chapters.event.name": req.params.event_name}}, 
		//     function(err, regions) {
		//         if (err)
		//             res.send(err);

		//         console.log(regions);

		//         getEvents(res)
		// });

	    // Event.findOneAndRemove(
	    //     {"name": req.params.region_name,
	    //      "chapters.name": req.params.chapter_name, 
	    //      "chapters.events.name" : req.params.event_name},
	    //     function(err, regions) {
	    //         if (err)
	    //             res.send(err);

	    //         console.log(regions);

	    //         getEvents(res)
	    // });
	});

	// landing page redirect
	// app.get('*', function(req, res) {
	//     res.sendfile('./public/index.html');
	// });
}