var mongoose = require('mongoose');

// event model
var Event = mongoose.model('event', {
    name : {
        type: String,
        required: true,
        unique: true
    },
    date : {
        type: String,
        required: true
    },
    start : {
        type: String,
        required: true
    },
    end : {
        type: String,
    },
    venue : {
        type: String,
        required: true
    },
    description : String,
    inventory : [],
    participants: [],
    volunteers: []
});

// chapter model
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

// region model
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
