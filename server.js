// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cookieParser = require('cookie-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	// app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
	// app.use(bodyParser.json());                                     // parse application/json
	// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	// app.use(cookieParser());
	app.set('view engine', 'ejs'); // set up ejs for templating
	app.use(express.static(__dirname + '/views'));                 // set the static files location /public/img will be /img for users
	app.use(morgan('dev'));                                         // log every request to the console
	app.use(methodOverride());

	// required for passport
	app.use(express.session({ secret: 'swagramon' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
});

// routes ======================================================================
require('./app/routes/userRoutes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/routes/creationRoutes.js')(app);
require('./app/routes/donorRoutes.js')(app);
require('./app/routes/managerRoutes.js')(app);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
