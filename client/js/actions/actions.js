var fetch = require('isomorphic-fetch');

var CHECK_AUTHENTICATION = 'CHECK_AUTHENTICATION';
function checkAuthentication() {
    return {
        type: CHECK_AUTHENTICATION,
        payload: authenticatedStatus
    }
}

var FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
function fetchQuestionSuccess(question) {
    return {
        type: FETCH_QUESTION_SUCCESS,
        payload: question
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

var POST_QUESTION_ANSWERED_STATUS_ERROR = "POST_QUESTION_ANSWERED_STATUS_ERROR";
function postQuestionAnsweredStatusError(error) {
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
                return dispatch(postQuestionAnsweredStatusError(err));
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

exports.POST_QUESTION_ANSWERED_STATUS_ERROR = POST_QUESTION_ANSWERED_STATUS_ERROR;
exports.postQuestionAnsweredStatusError = postQuestionAnsweredStatusError;