function sortQuestion (questionOrder, answerFlag) {
    var firstQuestionObject = questionOrder.shift();
    
    if (answerFlag === 'correct') {
        firstQuestionObject.weight *= 2;
    } else if (answerFlag === 'incorrect') {
        firstQuestionObject.weight = 1;
    }
    
    questionOrder.splice(firstQuestionObject.weight, 0, firstQuestionObject);
    
    return questionOrder;
}

module.exports = sortQuestion;