var fetch = require('isomorphic-fetch');

const CREATE_NEW_USER = 'CREATE_NEW_USER';
let createNewUser = () => {
    return (dispatch) => {
        return fetch(
                    '/createUser', 
                    { method: 'POST' }
        ).then((response) => {    
            if (response.ok === false) {
              return Promise.reject(response.json());
            }
            return response.json();
            }).then(function (data) {
                dispatch(createNewUserSuccess({json: data}));
            }).catch(function (data) {
                dispatch(createNewUserError(data.error));
            });
    };
};

const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
let createNewUserSuccess = (accessToken, userId, userName) => {
    return {
        type: CREATE_NEW_USER_SUCCESS,
        accessToken: accessToken,
        currentUserId: userId,
        currentUserName:userName
    };
};

const CREATE_NEW_USER_ERROR = 'CREATE_NEW_USER_ERROR';
let createNewUserError = error => {
    return {
        type: CREATE_NEW_USER_ERROR,
        payload: error
    };
};

const USER_LOGOUT = "USER_LOGOUT";
let userLogout = () => {
    return {
        type: USER_LOGOUT
    };
};

const FETCH_QUESTION = 'FETCH_QUESTION';
let fetchQuestion = (currentUserId, accessToken) => {
    return dispatch => {
        return fetch('/question/' + currentUserId + '?access_token=' + accessToken)
                .then(res => {
                return res.json();
                }).then(response => {
                    return dispatch(fetchQuestionSuccess(response));
                }).catch(err => {
                    return dispatch(fetchQuestionError(err));
                });
    };
};

const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
let fetchQuestionSuccess = questionObject => {
    return {
        type: FETCH_QUESTION_SUCCESS,
        payload: questionObject
    };
};

const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
let fetchQuestionError = error => {
    return {
        type: FETCH_QUESTION_ERROR,
        payload: error
    };
};

const POST_QUESTION_ANSWERED_STATUS = "POST_QUESTION_ANSWERED_STATUS";
let postQuestionAnsweredStatus = (userId, answerFlag, accessToken) => {
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
        }).then(response => response.json())
        .then(
            data => { dispatch(fetchQuestionSuccess(data)); },
            ({response, data}) => {
                if(response.status == 401) {
                    dispatch(postQuestionAnsweredError(data.error));
                }
            }
        );
    };
};

const POST_QUESTION_ANSWERED_ERROR = "POST_QUESTION_ANSWERED_ERROR";
let postQuestionAnsweredError = error => {
        return {
            type: FETCH_QUESTION_ERROR,
            payload: error
    };
};

const SET_PREV_ANSWER = "SET_PREV_ANSWER";
let setPrevAnswer = currentAnswer => {
    return {
        type: SET_PREV_ANSWER,
        payload: currentAnswer
    };
};

const SET_CURRENT_USER_INPUT = 'SET_CURRENT_USER_INPUT';
let setCurrentUserInput = currentUserInput => {
    return {
        type: SET_CURRENT_USER_INPUT,
        payload: currentUserInput
    };
};

const SET_ANSWER_FLAG = "SET_ANSWER_FLAG";
let setAnswerFlag = answerFlag => {
    return {
        type: SET_ANSWER_FLAG,
        payload: answerFlag
    };
};

const SET_LAST_ANSWER_FLAG = "SET_LAST_ANSWER_FLAG";
let setLastAnswerFlag = lastAnswerFlag => {
    return {
        type: SET_LAST_ANSWER_FLAG,
        payload: lastAnswerFlag
    };
};

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