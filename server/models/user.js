var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userGoogleToken: {
        type: String,
        required: true
    },
    questionOrder: {
        type: Array,
        required: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;