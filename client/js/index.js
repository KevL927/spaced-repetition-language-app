var React = require('react');
var ReactDOM = require('react-dom');
var createStore = require('redux').createStore;
var Provider = require('react-redux').Provider;

var reducers = require('./reducers/index');

var store = createStore(reducers.languageQuestionReducer);

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
    )
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);

module.exports.store = store;