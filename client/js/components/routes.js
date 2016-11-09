var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var Quiz = require('./QuizPage');
var App = require('./App');


var routes = (
    <Router history={hashHistory} >
        <Route path="/" component={App} />
        <Route path="/quiz" component= {Quiz} />
    </Router>
);
    
module.exports = routes;