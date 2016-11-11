var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var browserHistory = router.browserHistory;

var Quiz = require('./QuizPage');
var App = require('./App');
var Profile = require('./Profile');


var routes = (
    <Router history={browserHistory} >
        <Route path="/" component={App} />
        <Route path="/profile" component= {Profile} />
        <Route path="/quiz" component= {Quiz} />
    </Router>
);
    
module.exports = routes;