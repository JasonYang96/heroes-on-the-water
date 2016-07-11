var mongoose = require('mongoose');

var Donor = mongoose.model('donor', {
    fName: String,
    lName: String,
    phone: String,
    email: String,
    donation: Number,
    description: Number
});

var getDonors = function(res) {
    Donor.find(function(err, donors) {
        if (err)
            res.send(err)

        res.json(donors);
    });
};

// -------------------------DONOR API -------------------------------------//

// get all donors
app.get('/api/donors', function(req, res) {
    getDonors(res);
});

// create a new donor
app.post('/api/donors/', function(req, res) {
    console.log("donor Server -- ")
    console.log(req);
    Donor.create({
        fName: req.body.fName,
        lName: req.body.lName,
        phone: req.body.phone,
        email: req.body.email,
        donation: req.body.donation,
        description: req.body.description
    
    }, function(err, regions) {
        if (err)
            res.send(err);

        getDonors(res);
    })
});