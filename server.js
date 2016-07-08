// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

mongoose.connect('mongodb://localhost::27017/test');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// define model =================
var Event = mongoose.model('event', {
    description : String,
    name : String,
    venue : String
});

var Chapter = mongoose.model('chapter', {
    name: String,
    location: String,
    events: [Event.schema]
})

var Region = mongoose.model('region', {
    name : String,
    chapters : [Chapter.schema]
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// routes ======================================================================

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
app.delete('/api/events/:region_name/:chapter_name', function(req, res) {
    Region.findOneAndUpdate({"name": req.params.region_name}, {$pull: {"chapters.name": req.params.chapter_name}}, function(err, regions) {
        if (err)
            res.send(err);

        getEvents(res);
    });
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
    Region.findOneAndUpdate(
        {"name": req.params.region_name,
         "chapters.name": req.params.chapter_name}, 
        {$pull: {"chapters.?.events.name": req.params.chapter_name}}, 
        function(err, regions) {
            if (err)
                res.send(err);

            getEvents(res)
    });
});

// landing page redirect
app.get('*', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});