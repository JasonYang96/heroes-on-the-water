var mongoose = require('mongoose');

var Donor = mongoose.model('donor', {
    fName: String,
    lName: String,
    phone: String,
    email: String,
    donation: Number,
    description: Number,

    //sub-forms fields are all optional
    //Specific chapter
    chapter: {
        type: String,
        required: false
    },
    //Memory of loved one
    loved_one: {
        type: String,
        required: false
    },
    //Shared letter fields
    letter_fName: {
        type: String,
        required: false
    },
    letter_lName: {
        type: String,
        required: false
    },
    letter_street: {
        type: String,
        required: false
    },
    letter_city: {          //<--also shared for product donation
        type: String,
        required: false
    },
    letter_state: {         //<--also shared for product donation
        type: String,
        required: false
    },
    letter_zip: {           //<--also shared for product donation
        type: String,
        required: false
    },
    letter_country: {
        type: String,
        required: false
    },
    //Product donation fields
    product_what: {
        type: String,
        required: false
    },
    product_you: {
        type: String,
        required: false
    },
    product_hear: {
        type: String,
        required: false
    }
});

// -------------------------DONOR API -------------------------------------//
module.exports = function (app) {
    var getDonors = function (res) {
        Donor.find(function (err, donors) {
            if (err)
                res.send(err)

            res.json(donors);
        });
    };

    // get all donors
    app.get('/api/donors', function (req, res) {
        getDonors(res);
    });

    // create a new donor
    app.post('/api/donors/', function (req, res) {
        Donor.create({
            fName: req.body.fName,
            lName: req.body.lName,
            phone: req.body.phone,
            email: req.body.email,
            donation: req.body.donation,
            description: req.body.description,

            chapter: req.body.chapter,
            loved_one: req.body.loved_one,
            letter_fName: req.body.letter_fName,
            letter_lName: req.body.letter_lName,
            letter_street: req.body.letter_street,
            letter_city: req.body.letter_city,
            letter_state: req.body.letter_state,
            letter_zip: req.body.letter_zip,
            letter_country: req.body.letter_country,
            
            product_what: req.body.product_what,
            product_you: req.body.product_you,
            product_hear: req.body.product_hear

            }, function(err, regions) {
                if (err)
                    res.send(err);

                getDonors(res);
            })
    });

    app.get('/donate', function (req, res) {
        res.render('./ejs/donate/donate.ejs', function (err, html) {
            if (err) {
                res.send(err);
            }
            res.send(html);
        });
    });

    app.get('/donors', function (req, res) {
        res.render('./ejs/donate/donors.ejs', function (err, html) {
            if (err) {
                res.send(err);
            }
            res.send(html);
        });
    });


}

module.exports.donor = Donor;