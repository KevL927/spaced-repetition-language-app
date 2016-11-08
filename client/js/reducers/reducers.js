var actions = require('../actions/actions');
var FETCH_QUESTION_SUCCESS = actions.FETCH_QUESTION_SUCCESS;
var FETCH_QUESTION_ERROR = actions.FETCH_QUESTION_ERROR;
var POST_QUESTION_ANSWERED_STATUS_ERROR = actions.POST_QUESTION_ANSWERED_STATUS_ERROR;

var initialState = {
    currentQuestion: null,
    fetchGetQuestionError: null,
    postQuestionStatusError: null,
    isAuthenticated: false
}

