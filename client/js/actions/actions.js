var fetch = require('isomorphic-fetch');

var CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
function checkAuthentication(authenticatedStatus) {
    return {
        type: CHECK_AUTHENTICATION,
        payload: authenticatedStatus
    };
}


var CREATE_NEW_USER = 'CREATE_NEW_USER';
function createNewUser() {
    return function (dispatch) {
    return fetch('/createUser', {
      method: 'POST'
    }).then(function (response) { 
        if (response.ok === false) {
          return Promise.reject(response.json());
        }
        return response.json() 
      }).then(function (data) {
        dispatch(createNewUserSuccess({json: data}));
      }).catch(function (data) {
          dispatch(createNewUserError(data.error));
      });
  };
}

var USER_LOGOUT = "USER_LOGOUT";
function userLogout(){
    return{
        type: USER_LOGOUT
    } 
}

var CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
function createNewUserSuccess(accessToken, userId, userName) {
    return {
        type: CREATE_NEW_USER_SUCCESS,
        accessToken: accessToken,
        currentUserId: userId,
        currentUserName:userName
    };
}

var CREATE_NEW_USER_ERROR = 'CREATE_NEW_USER_ERROR';
function createNewUserError(error) {
    return {
        type: CREATE_NEW_USER_ERROR,
        payload: error
    };
}

var FETCH_QUESTION = 'FETCH_QUESTION';
function fetchQuestion(currentUserId, accessToken) {
    return function(dispatch) {
        return fetch('/question/' + currentUserId + '?access_token=' + accessToken).then(function(res) {
            return res.json();
        }).then(function(response) {
            return dispatch(fetchQuestionSuccess(response));
        }).catch(function (err) {
          return dispatch(fetchQuestionError(err));
        });
    };
}

var FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
function fetchQuestionSuccess(questionObject) {
    return {
        type: FETCH_QUESTION_SUCCESS,
        payload: questionObject
    };
}

var FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
function fetchQuestionError(error) {
    return {
        type: FETCH_QUESTION_ERROR,
        payload: error
    };
}

var POST_QUESTION_ANSWERED_STATUS = "POST_QUESTION_ANSWERED_STATUS";
 function postQuestionAnsweredStatus(userId, answerFlag, accessToken) {
   return (dispatch) => {
     return fetch('/app/v1/question?access_token=' + accessToken, {
       method: 'POST',
       headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
      },
       body: JSON.stringify({
           currentUserId: userId,
           answerFlag: answerFlag
       })
     })
     .then(response => response.json())
     .then(
       data => {
         dispatch(fetchQuestionSuccess(data))
       },
       ({response, data}) => {
           
         if(response.status == 401) {
           dispatch(postQuestionAnsweredError(data.error));
         }
       }
     );
   };
 }

var POST_QUESTION_ANSWERED_ERROR = "POST_QUESTION_ANSWERED_ERROR";
function postQuestionAnsweredError(error) {
        return {
            type: FETCH_QUESTION_ERROR,
            payload: error
    };
}

var SET_PREV_ANSWER = "SET_PREV_ANSWER";
function setPrevAnswer(currentAnswer) {
    return {
        type: SET_PREV_ANSWER,
        payload: currentAnswer
    };
}

var SET_CURRENT_USER_INPUT = 'SET_CURRENT_USER_INPUT';
function setCurrentUserInput (currentUserInput) {
  return {
      type: SET_CURRENT_USER_INPUT,
      payload: currentUserInput
  }
}

var SET_ANSWER_FLAG = "SET_ANSWER_FLAG";
var setAnswerFlag = function(answerFlag){
    return {
        type: SET_ANSWER_FLAG,
        payload: answerFlag
    }
}

var SET_LAST_ANSWER_FLAG = "SET_LAST_ANSWER_FLAG";
var setLastAnswerFlag = function(lastAnswerFlag){
    return {
        type: SET_LAST_ANSWER_FLAG,
        payload: lastAnswerFlag
    }
}

exports.FETCH_QUESTION = FETCH_QUESTION;
exports.fetchQuestion = fetchQuestion;

exports.FETCH_QUESTION_SUCCESS = FETCH_QUESTION_SUCCESS;
exports.fetchQuestionSuccess = fetchQuestionSuccess;

exports.FETCH_QUESTION_ERROR = FETCH_QUESTION_ERROR;
exports.fetchQuestionError = fetchQuestionError;

exports.POST_QUESTION_ANSWERED_STATUS = POST_QUESTION_ANSWERED_STATUS;
exports.postQuestionAnsweredStatus = postQuestionAnsweredStatus;

exports.POST_QUESTION_ANSWERED_ERROR = POST_QUESTION_ANSWERED_ERROR;
exports.postQuestionAnsweredError = postQuestionAnsweredError;

exports.SET_PREV_ANSWER = SET_PREV_ANSWER;
exports.setPrevAnswer = setPrevAnswer;

exports.CREATE_NEW_USER_SUCCESS = CREATE_NEW_USER_SUCCESS;
exports.createNewUserSuccess = createNewUserSuccess;

exports.CREATE_NEW_USER_ERROR = CREATE_NEW_USER_ERROR;
exports.createNewUserError = createNewUserError;

exports.SET_CURRENT_USER_INPUT = SET_CURRENT_USER_INPUT;
exports.setCurrentUserInput = setCurrentUserInput;

exports.userLogout = userLogout;
exports.USER_LOGOUT = USER_LOGOUT;

exports.SET_ANSWER_FLAG = SET_ANSWER_FLAG;
exports.setAnswerFlag = setAnswerFlag;

exports.SET_LAST_ANSWER_FLAG = SET_LAST_ANSWER_FLAG;
exports.setLastAnswerFlag = setLastAnswerFlag;