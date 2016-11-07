var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    record: {
        type: Array,
        required: true
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;