import express from 'express';
const questionRoute = express.Router();
import mongoose from 'mongoose';
import passport from 'passport';

import User from '../models/user';
import Questions from '../models/question';
import sortQuestion from '../set-question-order/sort_by_space_repetition';
import errorHandler from '../utils/error_handler';

//get first question displayed, everytime user logs in
questionRoute.get('/question/:currentUserId', passport.authenticate('bearer', {
        session: false
    }),
    (req, res) => {
        let currentUserId = req.params.currentUserId;
        User.findOne({
            _id: currentUserId
        }, (err, user) => {
            if (err) return errorHandler(res);
            return getQuestion(user);
            }
        );

        const getQuestion = (userInfo) => {
            let result = userInfo.results,
                questionId = userInfo.questionOrder[0].questionId;
            Questions.findOne({
                _id: questionId
            }, (err, questionObject) => {
                if (err) return errorHandler(res);
                return res.json({
                    questionObject,
                    result: result
                });
            });
        }
    });

//sorting the question's array and responding with the next question
questionRoute.post('/app/v1/question',passport.authenticate('bearer', {
        session: false
    }), 
    (req, res) => {
    let answerFlag = req.body.answerFlag;
    let user_ID = req.body.currentUserId;
    
    User.findOne({
        _id: user_ID
    }, (err, userObject) => {
        if (err) return errorHandler(res);
        return getCurrentUser(userObject);
    });

    const getCurrentUser = currentUser => {
        let currentResult = currentUser.results,
            newQuestionOrder = sortQuestion(currentUser.questionOrder, answerFlag),
            questionId = newQuestionOrder[0].questionId,
            resultUpdate = ((answerFlag === 'correct') ? (currentResult + 10) : currentResult);

         Questions.findOne({
            _id: questionId
        }, (err, questionJSON) => {
            if (err) return errorHandler(res);
            return updateQuestionOrder(questionJSON, newQuestionOrder, resultUpdate);
        });
    }

    const updateQuestionOrder = (questionObject, newQuestionOrder, resultUpdate) => {
        User.findOne({_id:user_ID}, (err, userJSON) => {
            userJSON.results = resultUpdate;
            userJSON.questionOrder = newQuestionOrder;
            userJSON.save();
            if (err) return errorHandler(res);
            return res.json({
                questionObject,
                result: resultUpdate
            });
        });
    };
    }
);

questionRoute.get('/questions', (req, res) => {
    Questions.find({}, (err, question) => {
        if (err) return errorHandler(res);
        return res.json(question);
    });
});

questionRoute.post('/createQuestion', (req, res) => {
    let ques = req.body.question,
        answer = req.body.answer;
        
    let questions = new Questions({
            question : ques,
            answer : answer
    });
    
    questions.save(err => {
        if (err) return errorHandler(err);
        return res.json({});
    });
});

export default questionRoute;