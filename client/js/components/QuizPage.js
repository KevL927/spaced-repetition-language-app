import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Question from './Question';
import Answer from './Answer';
import Result from './Result';
import Count from './Count';

class Quiz extends Component {
    componentWillMount() {
        this.props.dispatch(actions.fetchQuestion(this.props.currentUserId, this.props.accessToken));    
    }
    
    detectTextInput() {
        this.props.dispatch(actions.setCurrentUserInput(this.refs.userInput.value));
    }
    
    checkAnswer(event) {
        event.preventDefault();
        let answerFlag = (this.refs.userInput.value.toLowerCase() === this.props.currentAnswer) ? 'correct' : 'incorrect';
        this.props.dispatch(actions.setAnswerFlag(answerFlag));
        this.props.dispatch(actions.setPrevAnswer(this.props.currentAnswer));
        this.props.dispatch(actions.postQuestionAnsweredStatus(this.props.currentUserId, answerFlag, this.props.accessToken));
        this.refs.userInput.value ='';
    }
    
    nextButton(event) {
        this.props.dispatch(actions.setCurrentUserInput(null));
        this.props.dispatch(actions.setAnswerFlag(null));
    }
      
    render() {
        if(this.props.currentAnswerFlag == 'incorrect') {
            return (
                <div className="quiz-card">
                    <Answer answer={this.props.prevAnswer} />
                    <button className ='button' type = "submit" className="next" name = "next" onClick = {this.nextButton.bind(this)}>Next Question</button>
                    <Result result={this.props.result} />
                    <Count result={this.props.result} />
                </div>
            );
        } 
        else if(this.props.currentAnswerFlag == 'correct') {
            return (
                <div className="quiz-card">
                    <p>Good Job!!!</p>
                    <button className ='button' type = "submit" className="next" name = "next" onClick = {this.nextButton.bind(this)}>Next Question</button>
                    <Result result={this.props.result} />
                    <Count result={this.props.result} />
                </div>
            );
        }
        else {
            return (
                <div className="quiz-card">
                        <Question question={this.props.currentQuestion}/>
                        <input type = "text" name="answer" ref="userInput" onChange = {this.detectTextInput.bind(this)}></input>
                        <input className ='button' type = "submit" name="submit" onClick = {this.checkAnswer.bind(this)} disabled = {!this.props.currentUserInput}></input>
                        <Result result = {this.props.result} />
                        <Count result = {this.props.result} />
                </div>
            );
        }
    }
}

let mapStateToProps = (state, props) => {
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

export default connect(mapStateToProps)(Quiz);