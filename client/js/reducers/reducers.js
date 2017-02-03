const initialState = {
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
      result: 0
};


export default (state, action) => {
   state = state || initialState;  
   
    switch(action.type) {
        case 'FETCH_QUESTION_SUCCESS':
            return Object.assign({}, state, {
                currentQuestion: action.payload.questionObject.question,
                currentAnswer: action.payload.questionObject.answer,
                result: action.payload.result
            });
        
        case 'FETCH_QUESTION_ERROR':
            return Object.assign({}, state, {
                fetchGetQuestionError: action.payload
            });
        
        case 'POST_QUESTION_ANSWERED_ERROR':
            return Object.assign({}, state, {
                postQuestionAnsweredError: action.payload
            });
            
        case 'SET_PREV_ANSWER':
            return Object.assign({}, state, {
                prevAnswer: action.payload
            });
        
        case 'CREATE_NEW_USER_SUCCESS':
            return Object.assign({}, state, {
                accessToken: action.accessToken,
                currentUserId: action.currentUserId,
                currentUserName: action.currentUserName,
                isAuthenticated: true
            });
        
        case 'CREATE_NEW_USER_ERROR':
            return Object.assign({}, state, {
                createNewUserError: action.payload
            });
            
        case 'SET_CURRENT_USER_INPUT':
            return Object.assign({}, state, {
                currentUserInput: action.payload
            });
        
        case 'USER_LOGOUT':
            return Object.assign({}, state, initialState);
            
        case 'SET_ANSWER_FLAG':
            return Object.assign({}, state, {
                currentAnswerFlag : action.payload
            });
            
        case 'SET_LAST_ANSWER_FLAG':
            return Object.assign({}, state, {
                lastAnswerFlag : action.payload
            });
        
        default:
            return state;
    }
};