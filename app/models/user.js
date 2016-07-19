// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
      email:  {
         type: String,
         required: true,
         unique: true
       },
       name: {
         type: String
       },
       phone: {
         type: Number,
         required: false
       },
       city: {
         type: String,
         required: false
       },
       state: {
         type: String,
         required: false
       },
       zip: {
         type: Number,
         required: false
       },
       password: {
         type: String,
         required: true,
       },
       description: {
         type: String,
         required: true
       },
       howdidyouhear: {
         type: String,
         required: true
       },
       type: {
         type: String,
         required: true
       },
       specialQ: {
         type: String,
         required: false
       },
       active: {
         type: Boolean,
         default: true
       },
       createdAt: {
         type: Date,
         default: Date.now
       }
    },
    manager: []
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);