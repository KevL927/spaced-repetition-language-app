var React = require('react');
var ReactDOM = require('react-dom');

var Quiz = function () {
    return (
        <div className="quiz-cards">
            <div className="french-card"></div>
            <div className="english-card">
                <input type="text" name="answer">
                    <input type="submit" name="submit">
            </div>
        </div>
    );
};

module.exports = Quiz;