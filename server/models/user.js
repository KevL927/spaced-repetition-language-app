var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userGoogleToken: {
        type: String,
        required: true
    },
    questionOrder: [{
       questionId: {
           type:String,
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Questions',
            required: true
       },
       weight:{ 
           type: Number,
           required: true
       }
    }]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;