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
        var answerFlag = (this.refs.userInput.value.toLowerCase() === this.props.currentAnswer) ? 'correct' : 'incorrect';
        this.props.dispatch(actions.setAnswerFlag(answerFlag));
        this.refs.userInput.value ='';
    },
    
    nextButton: function(event){
        this.submitAnswer(this.props.currentAnswerFlag);
        this.props.dispatch(actions.setAnswerFlag('null'));
    },
    
   submitAnswer: function (answerFlag) {
        this.props.dispatch(actions.postQuestionAnsweredStatus(this.props.currentUserId, answerFlag, this.props.accessToken));
    },
      
    render: function () {
        if(this.props.currentAnswerFlag == 'incorrect') {
            return (
            <div className="quiz-card">
                    <Question question={this.props.currentQuestion}/>
                    <Answer answer={this.props.currentAnswer} />
                    <input className ='button' type = "submit" className="next" value="Next Question" name = "next" onClick = {this.nextButton} />
                    <Result result={this.props.result} />
                    <Count result={this.props.result} />
            </div>
            );
        } 
        else if(this.props.currentAnswerFlag == 'correct'){
            return (
                <div className="quiz-card">
                        <Question question={this.props.currentQuestion}/>
                        <p>Good Job!!!</p>
                        
                        <input className ='button' type = "submit" className="next" value="Next Question" name = "next" onClick = {this.nextButton} />
                        <p>Score: {this.props.result+10}</p>
                        <p>Count: {(this.props.result/10)+1}</p>
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
        currentAnswer: state.currentAnswer,
       currentUserInput: state.currentUserInput,
       currentQuestion: state.currentQuestion,
       result: state.result,
       currentAnswerFlag: state.currentAnswerFlag
    };
}

module.exports = connect(mapStateToProps)(Quiz);