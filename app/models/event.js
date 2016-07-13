var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

// define models =================
var Event = mongoose.model('event', {
    description : String,
    name : {
        type: String,
        required: true,
        unique: true
    },
    venue : {
        type: String,
        required: true
    }
});

var Chapter = mongoose.model('chapter', {
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    events: []
});

var Region = mongoose.model('region', {
    name : {
       type: String,
       required: true,
       unique: true
     },
    chapters : []
});

module.exports.event = Event;
module.exports.chapter = Chapter;
module.exports.region = Region;