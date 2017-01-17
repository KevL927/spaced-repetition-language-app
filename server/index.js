import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as BearerStrategy } from 'passport-http-bearer';

import User from './models/user';
import Questions from './models/question';
import sortQuestion from './set-question-order/sort_by_space_repetition';
import questionFactory from './set-question-order/question_factory';

let secrets;
    if (!process.env.CLIENT_ID) secrets = require('./config/client_secret');

const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
mongoose.Promise = global.Promise;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

app.use(express.static(process.env.CLIENT_PATH));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const runServer = (callback) => {
    let databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/frenchX';
    mongoose
        .connect(databaseUri)
        .then(() => {
            console.log('db connected...');
            let port = process.env.PORT || 8080;
            let server = app.listen(port, () => {
                    console.log('Listening on localhost:' + port);
                    if (callback) {
                        callback(server);
                        console.log('server running');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
};

if (require.main === module) {
    runServer();
}

// used to serialize the user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID || secrets.google.client_id,
        clientSecret: process.env.CLIENT_SECRET || secrets.google.client_secret,
        callbackURL: process.env.CALL_BACK_URL || secrets.google.callbackURL,
        passReqToCallback: true
    },

    (request, accessToken, refreshToken, profile, done) => {
        User.findOne({
            userGoogleToken: profile.id
        }, (err, user) => {
            if (err) {
                errorHandler(user);
            }
            if (user) {
                user.access_token = accessToken;
                user.save(err => {
                    return done(err, user);
                });
            }
            else {
                let newUser = new User({
                    userGoogleToken: profile.id,
                    access_token: accessToken,
                    userName: profile.email.slice(0, profile.email.indexOf('@')),
                    questionOrder: questionFactory(),
                    results: 0
                });
                newUser.save((err, res) => {
                    if (err) return errorHandler(err, res);
                    return done(null, newUser);
                });
            }
        });
    }
));


app.get('/auth/google',
    passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
    }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure'
    }),
    (req, res) => {
        return res.redirect('/?access_token=' + req.user.access_token + "&userId=" + req.user._id + "&userName=" + req.user.userName);
    }
);

//token auth setup
passport.use(
    new BearerStrategy(
        (token, done) => {
            User.findOne({
                    access_token: token
                },
                (err, user) => {
                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }

                    return done(null, user, {
                        scope: 'all'
                    })
                }
            );
        }
    )
);

//get first question displayed, everytime user logs in
app.get('/question/:currentUserId', passport.authenticate('bearer', {
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
app.post('/app/v1/question',passport.authenticate('bearer', {
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

const errorHandler = res => {
    return res.status(401).json({
        message: 'Internal Server Error'
    });
};

app.get('/questions', (req, res) => {
    Questions.find({}, (err, question) => {
        if (err) return errorHandler(res);
        return res.json(question);
    });
});

app.get('/getUsers', (req, res) => {
    User.find({}, (err, users) => {
        if (err) return errorHandler(res);
        return res.json(users);
    });
});

app.post('/createQuestion', (req, res) => {
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

export default app;