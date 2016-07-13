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
});

module.exports.event = Event;
module.exports.chapter = Chapter;
module.exports.region = Region;