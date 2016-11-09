var React = require('react');
var ReactDOM = require('react-dom');

var Feedback = function (props) {
        return (
            <div className="feedback">
                The currect answer is {props.answer} 
            </div>
        );
    };

module.exports = Feedback;