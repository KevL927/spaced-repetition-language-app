var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
var Question = require('./Question');
var Feedback = require('./Feedback');

var Quiz = React.createClass({
    detectTextInput: function () {
        this.props.dispatch(actions.setCurrentUserInput(this.refs.userInput.value))
    },
    
    checkAnswer: function(event){
        event.preventDefault();
        var answerFlag = (this.refs.userInput.value === this.props.currentAnswer) ? 'correct' : 'incorrect';
        this.submitAnswer(answerFlag);
    },
    
   submitAnswer: function (answerFlag) {
        this.props.dispatch(actions.postQuestionAnsweredError(answerFlag));
    },
    
    render: function () {
        return (
            <div className="quiz-card">
                <div className="question">
                    <Question />
                    <Feedback answer={this.props.currentAnswer} />
                </div>
                <div className = "answer">
                    <input type = "text" name="answer" ref="userInput" onChange = {this.detectTextInput}></input>
                </div>
                    <input type = "submit" name = "submit" onSubmit = {this.checkAnswer} disabled = {!this.props.currentUserInput}></input>
            </div>
        );
    }
});

function mapStateToProps (state, props){
    return {
        currentAnswer: state.currentAnswer,
       currentUserInput: state.currentUserInput
    };
}

module.exports = connect(mapStateToProps)(Quiz);