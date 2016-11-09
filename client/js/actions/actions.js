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
    return (dispatch) => {
    return fetch('/...', {
      method: 'POST'
    }).then(response => response.json().then(json => ({ json, response })))
      .then(({json, response}) => {
      if (response.ok === false) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      data => {
        dispatch(createNewUserSuccess(data));
      },
      ({response, data}) => {
          
        if(response.status == 401) {
          dispatch(createNewUserSuccess(data.error));
        }
      }
    );
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
function fetchQuestion() {
    return function(dispatch) {
        return fetch('/...').then(function(res, err) {
            if (err) {
                return dispatch(fetchQuestionError(err));
            }
            return res.json();
        }).then(function(response) {
            return dispatch(fetchQuestionSuccess(response.question));
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
    return fetch('/...', {
      method: 'POST',
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

exports.FETCH_QUESTION_SUCCESS = FETCH_QUESTION_SUCCESS;
exports.fetchQuestionSuccess = fetchQuestionSuccess;

exports.FETCH_QUESTION_ERROR = FETCH_QUESTION_ERROR;
exports.fetchQuestionError = fetchQuestionError;

exports.POST_QUESTION_ANSWERED_ERROR = POST_QUESTION_ANSWERED_ERROR;
exports.postQuestionAnsweredError = postQuestionAnsweredError;

exports.CREATE_NEW_USER_SUCCESS = CREATE_NEW_USER_SUCCESS;
exports.createNewUserSuccess = createNewUserSuccess;

exports.CREATE_NEW_USER_ERROR = CREATE_NEW_USER_ERROR;
exports.createNewUserError = createNewUserError;

exports.SET_CURRENT_USER_INPUT = SET_CURRENT_USER_INPUT;
exports.setCurrentUserInput = setCurrentUserInput;