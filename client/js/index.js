var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;
var Provider = require('react-redux').Provider;
var thunk = require('redux-thunk').default;

var actions = require('./actions/actions');
var reducers = require('./reducers/reducers');
var routes = require('./components/routes');

var App = require('./components/App');

var store = createStore(reducers, applyMiddleware(thunk));

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app')
    )
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);

exports.store = store;