var actions = require('../actions/actions'),
    FETCH_QUESTION_SUCCESS = actions.FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR,
    POST_QUESTION_ANSWERED_ERROR = actions.POST_QUESTION_ANSWERED_ERROR,
    CREATE_NEW_USER_SUCCESS = actions.CREATE_NEW_USER_SUCCESS,
    CREATE_NEW_USER_ERROR = actions.CREATE_NEW_USER_ERROR,
    SET_CURRENT_USER_INPUT = actions.SET_CURRENT_USER_INPUT;

var initialState = {
    currentQuestion: null,
    currentAnswer: null,
    fetchGetQuestionError: null,
    postQuestionStatusError: null,
    isAuthenticated: false,
    userId: null,
    createNewUserError: null,
    currentAnswerFlag: null,
    currentUserInput: null,
    result: []
}


module.exports = function (state, action) {
   
   function updateState (newState) {
       return Object.assign({}, state, newState);
   }
   
    switch(action.type) {
        case FETCH_QUESTION_SUCCESS:
            return updateState({
                currentQuestion: action.payload.questionObject.question,
                currentAnswer: action.payload.questionObject.answer,
                result: action.payload.result
            });
        
        case FETCH_QUESTION_ERROR:
            return updateState({
                fetchGetQuestionError: action.payload
            });
        
        case POST_QUESTION_ANSWERED_ERROR:
            return updateState({
                postQuestionAnsweredError: action.payload
            });
        
        case CREATE_NEW_USER_SUCCESS:
            return updateState({
                userId: action.payload
            });
        
        case CREATE_NEW_USER_ERROR:
            return updateState({
                createNewUserError: action.payload
            });
            
        case SET_CURRENT_USER_INPUT:
            return updateState({
                currentUserInput: action.payload
            });
        
        default:
            return initialState;
    }
}