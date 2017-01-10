'use strict';

function sortQuestion(questionOrder, answerFlag) {
    var firstQuestionObject = questionOrder.shift();

    if (answerFlag === 'correct') {
        firstQuestionObject.weight *= 2;

        if (firstQuestionObject.weight >= 8) {
            questionOrder.push(firstQuestionObject);
            return questionOrder;
        }
    } else if (answerFlag === 'incorrect') {
        firstQuestionObject.weight = 1;
    }

    questionOrder.splice(firstQuestionObject.weight, 0, firstQuestionObject);
    return questionOrder;
}

module.exports = sortQuestion;