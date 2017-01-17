import mongoose from 'mongoose';

let QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

export default mongoose.model('Questions', QuestionSchema);