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

var CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
function createNewUserSuccess(userId) {
    return {
        type: FETCH_QUESTION_SUCCESS,
        payload: userId
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
function fetchQuestion(currentUserId) {
    return function(dispatch) {
        return fetch('/question/' + currentUserId).then(function(res) {
            return res.json();
        }).then(function(response) {
          console.log('questionObject: ', response);
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
 function postQuestionAnsweredStatus(userId, answerFlag) {
   return (dispatch) => {
     return fetch('/app/v1/question', {
       method: 'POST',
       headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
      },
       body: JSON.stringify({
           currentUserId: userId,
           answerFlag: answerFlag
       })
     }).then(response => response.json().then(json => ({ json, response })))
       .then(({json, response}) => {
       if (response.ok === false) {
         return Promise.reject(json);
       }
       return json;
     })
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

var SET_CURRENT_USER_INPUT = 'SET_CURRENT_USER_INPUT';
function setCurrentUserInput (currentUserInput) {
  return {
      type: SET_CURRENT_USER_INPUT,
      payload: currentUserInput
  }
}

var REDIRECT_LOGIN= 'REDIRECT_LOGIN';
function redirectLogin() {
    return function(dispatch) {
        return fetch('/auth/google').then(function(res) {
            return res.json();
        }).then(function(response) {
          console.log(response)
            // return dispatch(fetchQuestionSuccess(response));
        }).catch(function (err) {
          console.log(err);
          // return dispatch(fetchQuestionError(err));
        });
    };
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

exports.CREATE_NEW_USER_SUCCESS = CREATE_NEW_USER_SUCCESS;
exports.createNewUserSuccess = createNewUserSuccess;

exports.CREATE_NEW_USER_ERROR = CREATE_NEW_USER_ERROR;
exports.createNewUserError = createNewUserError;

exports.SET_CURRENT_USER_INPUT = SET_CURRENT_USER_INPUT;
exports.setCurrentUserInput = setCurrentUserInput;

exports.REDIRECT_LOGIN = REDIRECT_LOGIN;
exports.redirectLogin = redirectLogin;