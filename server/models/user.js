import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
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

export default mongoose.model('User', UserSchema);