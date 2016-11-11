var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userGoogleToken: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    questionOrder: [{
       questionId: {
           type:String,
            required: true
       },
       weight: { 
           type: Number,
           required: true
       }
    }],
    results: {
           type: Number,
           required: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;