function sortQuestion (questionOrder, answerFlag) {
    var firstQuestionObject = questionOrder.shift();
    
    if (answerFlag === 'correct' && firstQuestionObject.weight >= 10) {
        firstQuestionObject.weight *= 2;
    } else if (answerFlag === 'incorrect') {
        firstQuestionObject.weight = 1;
    }
    for(var i = 0; i < questionOrder.length; i++) {
        if (questionOrder[i].weight !== 10) {
            break;
            
        } else {
            if(i === questionOrder.length-1) {
                //reroute to the game over page
            }
        }
    }
    questionOrder.splice(firstQuestionObject.weight, 0, firstQuestionObject);
    return questionOrder;
    
}

module.exports = sortQuestion;