var React = require('react');
var ReactDOM = require('react-dom');

var Question = function(props){
    return(
    <div className='question'>{props.question} </div>
    );
}

module.exports = Question;