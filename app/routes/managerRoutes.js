// list of manager views for admin, regions, chapters, and events
var Model = require('../models/event');
var User = require('../models/user');

module.exports = function(app) {
    // admin view for everything
    app.get('/admin', function(req, res) {
        Model.region.find(function(err, region) {
            if (err) {
                res.send(err);
            }

            res.render('./ejs/manager/adminRak.ejs', {region: region}, function(err, html) {
                if (err) {
                    res.send(err);
                }
                res.send(html);
            })
        });
    });

    // read only view of events
    app.get('/events', function(req, res) {
        Model.region.find(function(err, regions) {
            if (err) {
                res.send(err);
            }

            User.findOne( {"_id": req.user.id }, function(err, user) {
                if (err) {
                    res.send(err);
                }

                res.render('./ejs/main/events.ejs', {regions: regions, user: user}, function(err, html) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(html);
                });
            })
        });
    });

    // manager view for a specific region
    app.get('/:region_name', function(req, res) {
        Model.region.findOne({"name": req.params.region_name}, function(err, region) {
            if (err)
                res.send(err);

            res.render('./ejs/manager/region.ejs', {region: region}, function(err, html) {
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

            res.render('./ejs/manager/chapter.ejs', {region: region[0]}, function(err, html) {
                if (err) {
                    res.send(err);
                }
                res.send(html);
            });
        });
    });

    // manager view for specific event
    app.get('/:region_name/:chapter_name/:event_name', function(req, res) {
        Model.region.aggregate([
            { $match: {"name": req.params.region_name}},
            { $unwind: "$chapters"},
            { $match: {"chapters.name": req.params.chapter_name}},
            { $unwind: "$chapters.events"},
            { $match: {"chapters.events.name" : req.params.event_name}}
        ]).exec(function(err, region) {
            if (err)
                res.send(err);

            res.render('./ejs/manager/event.ejs', {region: region[0]}, function(err, html) {
                if (err) {
                    res.send(err);
                }
                res.send(html);
            });
        });
    });
}
