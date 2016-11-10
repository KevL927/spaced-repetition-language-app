var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('./models/user');
var Questions = require('./models/question');
var sortQuestion = require('./set-question-order/sort_by_space_repetition');
var questionFactory = require('./set-question-order/question_factory');
var clientIDs = require("./config/client_secret");

var HOST = process.env.HOST;
var PORT = process.env.PORT || 8080;
mongoose.Promise = global.Promise;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

app.use(express.static(process.env.CLIENT_PATH));
app.use(jsonParser);
app.use(passport.initialize());
app.use(passport.session());

var runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/frenchX';
    mongoose
        .connect(databaseUri)
        .then(function() {
            console.log('db connected...');
            var port = process.env.PORT || 8080;
            var server = app.listen(port, function() {
                    console.log('Listening on localhost:' + port);
                    if (callback) {
                        callback(server);
                        console.log('server running');
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
};

if (require.main === module) {
    runServer();
}

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: clientIDs.google.client_id,
        clientSecret: clientIDs.google.client_secret,
        callbackURL: clientIDs.google.callbackURL,
        passReqToCallback: true
    },

    function(request, accessToken, refreshToken, profile, done) {
        User.findOne({
            userGoogleToken: profile.id
        }, function(err, user) {
            if (err) {
                errorHandler(user);
            }
            if (user) {
                user.access_token = accessToken;
                user.save(function(err, doc) {
                return done(err, doc);
                });
            }
            else {
                var newUser = new User({
                    userGoogleToken: profile.id,
                    access_token: accessToken,
                    userName: profile.email.slice(0, profile.email.indexOf('@')),
                    questionOrder: questionFactory(),
                    results: [0]
                });
                newUser.save(function(err, res) {
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
    function(req, res) {
        return res.redirect('/?access_token=' + req.user.access_token+"&userId="+req.user._id+"&userName="+req.user.userName);
    }   
);

//token auth setup
passport.use(
    new BearerStrategy(
        function(token, done) {
            User.findOne({
                    access_token: token
                },
                function(err, user) {
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
    function(req, res) {
        var currentUserId = req.params.currentUserId;
        User.findOne({
            _id: currentUserId
        }, function(err, user) {
            if (err) return errorHandler(res);
            return getQuestion(user);
        });

        function getQuestion(userInfo) {
            var result = userInfo.results.splice(-1);
            var questionId = userInfo.questionOrder[0].questionId;
            Questions.findOne({
                _id: questionId
            }, function(err, questionObject) {
                if (err) return errorHandler(res);
                return res.json({
                    questionObject,
                    result: result
                });
            });
        }
    });

//sorting the question's array and responding with the next question
app.post('/app/v1/question', function(req, res) {
    var answerFlag = req.body.answerFlag; //current_answer_state from asnc  functions
    var user_ID = req.body.currentUserId; //_id(current_user)
    User.findOne({
        _id: user_ID
    }, function(err, userObject) {
        if (err) return errorHandler(res);
        return getCurrentUser(userObject);
    });

    function getCurrentUser(currentUser) {
        var currentResult = currentUser.results.slice(-1),
            newQuestionOrder = sortQuestion(currentUser.questionOrder, answerFlag),
            questionId = newQuestionOrder[0].questionId,
            result = ((answerFlag === 'correct') ? (currentResult + 10) : currentResult);

        Questions.findOne({
            _id: questionId
        }, function(err, questionJSON) {
            if (err) return errorHandler(res);
            return updateQuestionOrder(questionJSON, newQuestionOrder, result);
        });
    }

    function updateQuestionOrder(questionObject, newQuestionOrder, result) {
        User.findByIdAndUpdate(user_ID, {
            questionOrder: newQuestionOrder,
            result: result
        }, function(err, userJSON) {
            if (err) return errorHandler(res);
            return res.json({
                questionObject,
                result: result
            });
        });
    }

});

function errorHandler(res) {
    return res.status(401).json({
        message: 'Internal Server Error'
    });
}

app.get('/questions', function(req, res) {
    Questions.find({}, function(err, question) {
        if (err) return errorHandler(res);
        return res.json(question);
    });
});

app.get('/getUsers', function(req, res) {
    User.find({}, function(err, users) {
        if (err) return errorHandler(res);
        return res.json(users);
    });
});

exports.app = app;
// app.get(
//     '/profile',
//     passport.authenticate('bearer', { session: false }),
//     function(req, res) {
//         res.send("LOGGED IN as " + req.user.facebookId + " - <a href=\"/logout\">Log out</a>");
//     }
// );

// when new user is created- post happens first
//to get the questions displayed for new user get(/)
//get all the questions