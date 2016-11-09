var actions = require('../actions/actions');
var FETCH_QUESTION_SUCCESS = actions.FETCH_QUESTION_SUCCESS;
var FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR;
var POST_QUESTION_ANSWERED_ERROR = actions.POST_QUESTION_ANSWERED_ERROR;
var CREATE_NEW_USER_SUCCESS = actions.CREATE_NEW_USER_SUCCESS;
var CREATE_NEW_USER_ERROR = actions.CREATE_NEW_USER_ERROR;

var initialState = {
    currentQuestion: null,
    currentAnswer: null,
    fetchGetQuestionError: null,
    postQuestionStatusError: null,
    isAuthenticated: false,
    userId: null,
    createNewUserError: null,
    result: []
}


var frenchXReducer = function (state, action) {
    var newState;
    
    state = state || initialState;
    
    switch(action.type) {
        case FETCH_QUESTION_SUCCESS:
            newState = Object.assign({}, state, {
                currentQuestion: action.payload.question,
                currentAnswer: action.payload.answer,
                result: action.payload.results
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
        
        case CREATE_NEW_USER_SUCCESS:
            newState = Object.assign({}, state, {
                userId: action.payload
            });
            return newState;
        
        case CREATE_NEW_USER_ERROR:
            newState = Object.assign({}, state, {
                createNewUserError: action.payload
            });
            return newState;
        
        default:
            return state;
    }
}

exports.frenchXReducer = frenchXReducer;