
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');
var Questions = require('./models/question'); 
var jsonParser = bodyParser.json();
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

// app.get('/question', function(req, res){
//     var questionId = '5820fb638ba76026b9bf8b8d';
//     Questions.findOne({_id:questionId}, function(err, question){
//         if (err) return errorHandler(res);
//         return res.json(question);
//     });
// });

app.get('/question', function(req, res){
    var questionId = '5820fb638ba76026b9bf8b8d';
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

app.post('/createUser', function(req, res) {
    var newUser = new User({
        userGoogleToken:'564564545623',
        questionOrder:[{questionId:'driogj',weight:1},{questionId:'drweiogj',weight:2},{questionId:'drieeogj',weight:1}]
    });
    newUser.save(function(err, user) {
        if (err) return errorHandler(res);
            return res.status(201).json({});
    })
})

app.post('/app/v1/question', function(req, res){
    

      var user_ID = '58211f787b94a534119bb350';    //_id
       
    var questionId = '5821184c6c359132fe18f6ba';
    Questions.findOne({_id:questionId}, function(err, questionJSON){
        if (err) return errorHandler(res);
        // return res.json(questionJSON);
      return updateQuestionOrder(questionJSON);
    });
    
    function updateQuestionOrder(questionJSON){
        User.findByIdAndUpdate(user_ID,{
            questionOrder: [{questionId:'5820fb638ba76026b9bf8b8d',weight:1},{questionId:'5820fdc8b1fa4826e6d8b8b8',weight:1},{questionId:'5820fe1395cf5026fe3dbfca',weight:1}]
        },function(err, userJSON){
            if (err) return errorHandler(res);
            return res.json(questionJSON);
        });
    }
   
   
});


function  errorHandler(res){
   return res.status(500).json({
        message: 'Internal Server Error'
    });
}
