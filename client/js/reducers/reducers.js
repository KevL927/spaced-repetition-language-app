var actions = require('../actions/actions'),
    FETCH_QUESTION_SUCCESS = actions.FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR,
    POST_QUESTION_ANSWERED_ERROR = actions.POST_QUESTION_ANSWERED_ERROR,
    SET_PREV_ANSWER = actions.SET_PREV_ANSWER,
    CREATE_NEW_USER_SUCCESS = actions.CREATE_NEW_USER_SUCCESS,
    CREATE_NEW_USER_ERROR = actions.CREATE_NEW_USER_ERROR,
    SET_CURRENT_USER_INPUT = actions.SET_CURRENT_USER_INPUT,
    USER_LOGOUT = actions.USER_LOGOUT,
    SET_ANSWER_FLAG = actions.SET_ANSWER_FLAG,
    SET_LAST_ANSWER_FLAG = actions.SET_LAST_ANSWER_FLAG;

var initialState = {
    currentQuestion: null,
    currentAnswer: null,
    prevAnswer: null,
    fetchGetQuestionError: null,
    postQuestionStatusError: null,
    isAuthenticated: false,
    createNewUserError: null,
    currentAnswerFlag: null,
     lastAnswerFlag:null,
    currentUserId: null,
    currentUserName: null,
    currentUserInput: null,
    accessToken: null,
    result: 0,
}


function frenchXReducer (state, action) {
   state = state || initialState;  
   
    switch(action.type) {
        case FETCH_QUESTION_SUCCESS:
             var newState = Object.assign({}, state, {
                currentQuestion: action.payload.questionObject.question,
                currentAnswer: action.payload.questionObject.answer,
                result: action.payload.result
            });
            return newState;
        
        case FETCH_QUESTION_ERROR:
            var newState = Object.assign({}, state, {
                fetchGetQuestionError: action.payload
            });
            return newState;
        
        case POST_QUESTION_ANSWERED_ERROR:
            var newState = Object.assign({}, state, {
                postQuestionAnsweredError: action.payload
            });
            return newState;
            
        case SET_PREV_ANSWER:
            return Object.assign({}, state, {
                prevAnswer: action.payload
            });
        
        case CREATE_NEW_USER_SUCCESS:
            var newState = Object.assign({}, state, {
                accessToken: action.accessToken,
                currentUserId: action.currentUserId,
                currentUserName: action.currentUserName,
                isAuthenticated: true
            });
            return newState;
        
        case CREATE_NEW_USER_ERROR:
            var newState = Object.assign({}, state, {
                createNewUserError: action.payload
            });
            return newState;
            
        case SET_CURRENT_USER_INPUT:
           var newState = Object.assign({}, state, {
                currentUserInput: action.payload
            });
            return newState;
        
        case USER_LOGOUT:
            var newState =  Object.assign({}, state, initialState)
            return newState;
            
        case SET_ANSWER_FLAG:
            var newState =  Object.assign({}, state, {currentAnswerFlag : action.payload})
            return newState;
            
        case SET_LAST_ANSWER_FLAG:
            var newState =  Object.assign({}, state, {lastAnswerFlag : action.payload})
            return newState;
        
        default:
            return state;
    }
}

exports.frenchXReducer = frenchXReducer;