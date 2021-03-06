// list of manager views for admin, regions, chapters, and events
var Model = require('../models/event');
var donorModel = require('./donorRoutes.js');
var User = require('../models/user');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = function(app) {
    // admin view for everything
    app.get('/admin', isLoggedIn, function(req, res) {
        Model.region.find(function(err, region) {
            if (err) {
                res.send(err);
            }

            User.find(function(err, users) {
                if (err) {
                    res.send(err);
                }

                User.findOne( {"_id": req.user.id }, function(err, user) {
                    if (err) {
                        res.send(err);
                    }

                    res.render('./ejs/manager/admin.ejs', {region: region, user: user, users: users}, function(err, html) {
                        if (err) {
                            res.send(err);
                        }
                        res.send(html);
                    });
                })
            })
        });
    });

    // admin view of donors
    app.get('/admin/donors', isLoggedIn, function(req, res) {
        Model.region.find(function(err, regions) {
            if (err) {
                res.send(err);
            }

            User.findOne( {"_id": req.user.id }, function(err, user) {
                if (err) {
                    res.send(err);
                }

                donorModel.donor.find(function(err, donors) {
                    if (err) {
                        res.send(err);
                    }

                    res.render('./ejs/manager/admin_donors.ejs', {donors: donors, user: user, regions: regions}, function(err, html) {
                        if (err) {
                            res.send(err);
                        }
                        res.send(html);
                    })
                });
            });
        });
    });

    // read only view of events --participant
    app.get('/events', isLoggedIn, function(req, res) {
        Model.region.find(function(err, regions) {
            if (err) {
                res.send(err);
            }

            User.findOne( {"_id": req.user._id }, function(err, user) {
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

    // read only view of events --public
    app.get('/eventspublic', function(req, res) {
        Model.region.find(function(err, regions) {
            if (err) {
                res.send(err);
            }

                res.render('./ejs/main/events_public.ejs', {regions: regions}, function(err, html) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(html);
                })
        });
    });

    // manager view for a specific region
    app.get('/manager/:region_name', isLoggedIn, function(req, res) {
        Model.region.findOne({"name": req.params.region_name}, function(err, region) {
            if (err)
                res.send(err);

            User.findOne( {"_id": req.user.id }, function(err, user) {
                if (err) {
                    res.send(err);
                }

                res.render('./ejs/manager/region.ejs', {region: region, user: user}, function(err, html) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(html);
                });
            })
        });
    });

    // manager view for specific chapter
    app.get('/manager/:region_name/:chapter_name', isLoggedIn, function(req, res) {
        Model.region.aggregate([
            { $match: {"name": req.params.region_name}},
            { $unwind: "$chapters"},
            { $match: {"chapters.name": req.params.chapter_name}},
        ]).exec(function(err, region) {
            if (err)
                res.send(err);

            User.findOne( {"_id": req.user.id }, function(err, user) {
                if (err) {
                    res.send(err);
                }

                res.render('./ejs/manager/chapter.ejs', {region: region[0], user:user}, function(err, html) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(html);
                });
            });
        });
    });

    // manager view for specific event
    app.get('/manager/:region_name/:chapter_name/:event_name', isLoggedIn, function(req, res) {
        Model.region.aggregate([
            { $match: {"name": req.params.region_name}},
            { $unwind: "$chapters"},
            { $match: {"chapters.name": req.params.chapter_name}},
            { $unwind: "$chapters.events"},
            { $match: {"chapters.events.name" : req.params.event_name}}
        ]).exec(function(err, region) {
            if (err)
                res.send(err);

            User.findOne( {"_id": req.user.id }, function(err, user) {
                if (err) {
                    res.send(err);
                }
                
                res.render('./ejs/manager/event.ejs', {region: region[0], user:user}, function(err, html) {
                    if (err) {
                        res.send(err);
                    }
                    
                    res.send(html);
                });
            });
        });
    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });
}
