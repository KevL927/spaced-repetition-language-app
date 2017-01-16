var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;
// var actions = require('../actions/actions');
import * as actions from '../actions/actions';
var Question = require('./Question');
// var Answer = require('./Answer');
import Answer from './Answer';
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
        var answerFlag = (this.refs.userInput.value.toLowerCase() === this.props.currentAnswer) ? 'correct' : 'incorrect';
        this.props.dispatch(actions.setAnswerFlag(answerFlag));
        this.props.dispatch(actions.setPrevAnswer(this.props.currentAnswer));
        this.props.dispatch(actions.postQuestionAnsweredStatus(this.props.currentUserId, answerFlag, this.props.accessToken));
        this.refs.userInput.value ='';
    },
    
    nextButton: function(event){
        this.props.dispatch(actions.setCurrentUserInput(null));
        this.props.dispatch(actions.setAnswerFlag(null));
    },
      
    render: function () {
        if(this.props.currentAnswerFlag == 'incorrect') {
            return (
                <div className="quiz-card">
                    <Answer answer={this.props.prevAnswer} />
                    <button className ='button' type = "submit" className="next" name = "next" onClick = {this.nextButton}>Next Question</button>
                    <Result result={this.props.result} />
                    <Count result={this.props.result} />
                </div>
            );
        } 
        else if(this.props.currentAnswerFlag == 'correct'){
            return (
                <div className="quiz-card">
                    <p>Good Job!!!</p>
                    <button className ='button' type = "submit" className="next" name = "next" onClick = {this.nextButton}>Next Question</button>
                    <Result result={this.props.result} />
                    <Count result={this.props.result} />
                </div>
            );
        }
        
        else{
            return (
                <div className="quiz-card">
                        <Question question={this.props.currentQuestion}/>
                        <input type = "text" name="answer" ref="userInput" onChange = {this.detectTextInput}></input>
                        <input className ='button' type = "submit" name="submit" onClick = {this.checkAnswer} disabled = {!this.props.currentUserInput}></input>
                        <Result result = {this.props.result} />
                        <Count result = {this.props.result} />
                </div>
            );
        }
        
    }
});

function mapStateToProps (state, props){
    return {
       accessToken: state.accessToken,
       currentUserId:  state.currentUserId,
       currentUserInput: state.currentUserInput,
       currentQuestion: state.currentQuestion,
       currentAnswer: state.currentAnswer,
       currentAnswerFlag: state.currentAnswerFlag,
       prevAnswer: state.prevAnswer,
       result: state.result
    };
}

module.exports = connect(mapStateToProps)(Quiz);