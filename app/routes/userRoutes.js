// app/routes.js

var User = require('../models/user');
var Model = require('../models/event');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('./ejs/main/index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./ejs/main/login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./ejs/main/signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        Model.region.find(function(err, regions) {
            if (err) {
                res.send(err);
            }

            User.findOne( {"_id": req.user.id }, function(err, user) {
                if (err) {
                    res.send(err);
                }

                res.render('./ejs/main/profileRak.ejs', {regions: regions, user: user}, function(err, html) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(html);
                });
            })
        });
    });

    // =====================================
    // SETTINGS SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/settings', isLoggedIn, function(req, res) {
        res.render('./ejs/main/settings.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get ('/profileOld', isLoggedIn, function (req, res) {
        res.render('./ejs/main/profile.ejs', {
            user: req.user
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // UPDATE ==============================
    // =====================================
    // update profile
    app.post('/api/user/:userid', function(req, res) {
        User.findOne({ "_id" : req.params.userid }, function(err, user) {
            if (err) {
                res.send(err);
            }

            // only update if it is not null
            user.local.name = req.body.name ? req.body.name : user.local.name;
            user.local.email = req.body.email ? req.body.email: user.local.email;
            user.local.description = req.body.description ? req.body.description : user.local.description;
            user.local.phone = req.body.phone ? req.body.phone : user.local.phone;
            user.local.city = req.body.city ? req.body.city : user.local.city;
            user.local.state = req.body.state ? req.body.state : user.local.state;
            user.local.zip = req.body.zip ? req.body.zip : user.local.zip;
            user.save();
        });
    });

    // add region manger permissions
    app.post('/api/manager/:region_id', function(req, res) {
        User.findOneAndUpdate({ "local.email" : req.body.email }, { "manager.region": req.params.region_id }, function(err, user) {
            if (err) {
                res.send(err);
            }

            console.log(user);
        });
    });

    // add chapter manger permissions
    app.post('/api/manager/:region_id/:chapter_id', function(req, res) {
        User.findOneAndUpdate({ "local.email" : req.body.email }, { "manager.region": req.params.region_id, "manager.chapter": req.params.chapter_id }, function(err, user) {
            if (err) {
                res.send(err);
            }

            console.log(user);
        });
    });

    // add event manger permissions
    app.post('/api/manager/:region_id/:chapter_id/:event_id', function(req, res) {
        User.findOneAndUpdate({ "local.email" : req.body.email }, { "manager.region": req.params.region_id, "manager.chapter": req.params.chapter_id, "manager.event": req.params.event_id }, function(err, user) {
            if (err) {
                res.send(err);
            }

            console.log(user);
        });
    });

    // delete manger permissions
    app.post('/api/manager/', function(req, res) {
        User.findOneAndUpdate({ "local.email" : req.body.email }, { $pull: {"manager": req.params.id}}, function(err, user) {
            if (err) {
                res.send(err);
            }

            console.log(user);
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
