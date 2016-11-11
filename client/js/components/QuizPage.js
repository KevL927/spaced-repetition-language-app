var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
var actions = require('../actions/actions');
var Question = require('./Question');
var Answer = require('./Answer');
var Result = require('./Result');
var Count = require('./Count');

var Quiz = React.createClass({
    componentWillMount: function() {
        this.props.dispatch(actions.fetchQuestion(this.props.currentUserId, this.props.accessToken));    
    },
    
    detectTextInput: function () {
        this.props.dispatch(actions.setCurrentUserInput(this.refs.userInput.value))
    },
    
    checkAnswer: function(event) {
        event.preventDefault();
        var answerFlag = (this.refs.userInput.value === this.props.currentAnswer) ? 'correct' : 'incorrect';
        console.log(answerFlag);
        this.submitAnswer(answerFlag);
    },
    
   submitAnswer: function (answerFlag) {
       console.log(this.props.currentUserId, answerFlag, this.props.accessToken);
        this.props.dispatch(actions.postQuestionAnsweredStatus(this.props.currentUserId, answerFlag, this.props.accessToken));
    },
    
    render: function () {
        return (
            <div className="quiz-card">
                    <Question question={this.props.currentQuestion}/>
                    <Answer answer={this.props.currentAnswer} />
             
                    <input type = "text" name="answer" ref="userInput" onChange = {this.detectTextInput}></input>
               
                    <input type = "submit" name = "submit" onClick = {this.checkAnswer} disabled = {!this.props.currentUserInput}></input>
                    <Result result={this.props.result}/>
                    <p><Count result={this.props.result} /></p> 
            </div>
        );
    }
});

function mapStateToProps (state, props){
    return {
        accessToken: state.accessToken,
        currentUserId:  state.currentUserId,
        currentAnswer: state.currentAnswer,
       currentUserInput: state.currentUserInput,
       currentQuestion: state.currentQuestion,
       result: state.result
    };
}

module.exports = connect(mapStateToProps)(Quiz);