var actions = require('../actions/actions');
var FETCH_QUESTION_SUCCESS = actions.FETCH_QUESTION_SUCCESS;
var FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR;
var POST_QUESTION_ANSWERED_ERROR = actions.POST_QUESTION_ANSWERED_ERROR;

var initialState = {
    currentQuestion: null,
    currentAnswer: null,
    fetchGetQuestionError: null,
    postQuestionStatusError: null,
    isAuthenticated: false
}


var frenchXReducer = function (state, action) {
    var newState;
    
    state = state || initialState;
    
    switch(action.type) {
        case FETCH_QUESTION_SUCCESS:
            newState = Object.assign({}, state, {
                currentQuestion: action.payload.question,
                currentAnswer: action.payload.answer
            });
            return newState;
        
    
        case FETCH_QUESTION_ERROR:
            newState = Object.assign({}, state, {
                fetchGetQuestionError: action.payload
            });
            return newState;
        
    
        case POST_QUESTION_ANSWERED_ERROR:
            newState = Object.assign({}, state, {
                postQuestionAnsweredError: action.payload
            });
            return newState;
        
        
        default:
            return state;
    }
}

exports.frenchXReducer = frenchXReducer;