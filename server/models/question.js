var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

var Questions = mongoose.model('Questions', QuestionSchema);

module.exports = Questions;