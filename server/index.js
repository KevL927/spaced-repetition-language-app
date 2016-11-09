var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var User = require('./models/user');
var Questions = require('./models/question'); 
var sortQuestion = require('./set-question-order/sort_by_space_repetition');
var questionFactory = require('./set-question-order/question_factory');

var HOST = process.env.HOST;
var PORT = process.env.PORT || 8080;
mongoose.Promise= global.Promise;


console.log(`Server running in ${process.env.NODE_ENV} mode`);

var app = express();
exports.app = app;

app.use(express.static(process.env.CLIENT_PATH));
app.use(jsonParser);

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
        .catch(function(err){
            console.log(err); 
        });
    });
};

if (require.main === module) {
    runServer();
}
//create new user

app.post('/createUser', function(req, res) {
    var newUser = new User({
        userGoogleToken: 'surbhi112.poswalia@gmail.com',
        questionOrder: questionFactory(),
        results: [0]
    });
    newUser.save(function(err, user) {
        if (err) return errorHandler(res);
            return res.status(201).json({});
    });
});

//get first question displayed, everytime user logs in
app.get('/question/:currentUserId', function(req, res){
    var currentUserId = req.params.currentUserId; 
    
     User.findOne({_id:currentUserId}, function(err, user){
         if (err) return errorHandler(res);
         console.log(user);
        return getQuestion(user.questionOrder);
    });
    function getQuestion(questionOrder){
    var questionId = questionOrder[0].questionId;
    Questions.findOne({_id:questionId}, function(err, questionObject){
        if (err) return errorHandler(res);
        return res.json(questionObject);
    });
    }
});

//sorting the question's array and responding with the next question
app.post('/app/v1/question', function(req, res){
    var answerFlag = req.body.answerFlag;    //current_answer_state from asnc  functions
    var user_ID = req.body.currentUserId;   //_id(current_user)
    
    User.findOne({_id:user_ID}, function(err, userObject){
          if (err) return errorHandler(res);
          console.log(userObject);
          return getCurrentUser(userObject);
    });
    function getCurrentUser(currentUser){
        
        var currentResult =  currentUser.results.slice(-1),
            newQuestionOrder = sortQuestion(currentUser.questionOrder, answerFlag),
            questionId = newQuestionOrder[0].questionId,
            result = ((answerFlag === 'correct')?(currentResult+10):currentResult);
        
        Questions.findOne({_id:questionId}, function(err, questionJSON){
            if (err) return errorHandler(res);
            return updateQuestionOrder(questionJSON, newQuestionOrder, result);
        });
        function updateQuestionOrder(questionJSON, newQuestionOrder, result){
            User.findByIdAndUpdate(user_ID,{
                questionOrder: newQuestionOrder,
                result: result 
            },function(err, userJSON){
                if (err) return errorHandler(res);
                return res.json(questionJSON);
            });
        }
    }
        
});



function  errorHandler(res){
   return res.status(500).json({
        message: 'Internal Server Error'
    });
}


// when new user is created- post happens first
//to get the questions displayed for new user get(/)


//get all the questions
app.get('/questions', function(req, res){
    Questions.find({}, function(err, question){
        if (err) return errorHandler(res);
        return res.json(question);
    });
});

app.get('/getUsers', function(req, res){
    User.find({}, function(err, users){
        if (err) return errorHandler(res);
        return res.json(users);
    });
});