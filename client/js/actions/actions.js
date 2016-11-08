var fetch = require('isomorphic-fetch');

var CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
function checkAuthentication(authenticatedStatus) {
    return {
        type: CHECK_AUTHENTICATION,
        payload: authenticatedStatus
    }
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

var POST_QUESTION_ANSWERED_ERROR = "POST_QUESTION_ANSWERED_ERROR";
function postQuestionAnsweredError(error) {
        return {
            type: FETCH_QUESTION_ERROR,
            payload: error
    };
}

var POST_QUESTION_ANSWERED_STATUS = "POST_QUESTION_ANSWERED_STATUS";
function postQuestionAnsweredStatus () {
    return function(dispatch) {
        return fetch('/...').then(function(res, err) {
            if (err) {
                return dispatch(postQuestionAnsweredError(err));
            }
            return res.json();
        }).then(function(response) {
            // As a response, the next question will be sent and passed over the fetchQuestionSuccess function.
            return dispatch(fetchQuestionSuccess(response.question));
        });
    };
}

exports.FETCH_QUESTION_SUCCESS = FETCH_QUESTION_SUCCESS;
exports.fetchQuestionSuccess = fetchQuestionSuccess;

exports.FETCH_QUESTION_ERROR = FETCH_QUESTION_ERROR;
exports.fetchQuestionError = fetchQuestionError;

exports.POST_QUESTION_ANSWERED_ERROR = POST_QUESTION_ANSWERED_ERROR;
exports.postQuestionAnsweredError = postQuestionAnsweredError;