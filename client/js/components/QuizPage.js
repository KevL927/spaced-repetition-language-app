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
        event.preventDefault();
        this.props.dispatch(actions.setCurrentUserInput(null));
        this.props.dispatch(actions.setAnswerFlag(null));
    }
      
    render() {
        if(this.props.currentAnswerFlag) {
            return (
                <div className="quiz-card">
                    {this.props.currentAnswerFlag === 'correct' ? <p>Good Job!!!</p> : <Answer answer={this.props.prevAnswer} />}
                    <button className='button' type="submit" name="submit" onClick={this.nextButton.bind(this)} autoFocus={true}>Next Question</button>
                    <Result result={this.props.result} />
                    <Count result={this.props.result} />
                </div>
            );
        } else {
            return (
                <div className="quiz-card">
                    <Question question={this.props.currentQuestion}/>
                    <form onSubmit={this.checkAnswer.bind(this)}>
                        <input type="text" name="answer" ref="userInput" onChange={this.detectTextInput.bind(this)} autoFocus={true}></input>
                        <input className='button' type="submit" name="submit" disabled={!this.props.currentUserInput}></input>
                    </form>
                    <Result result={this.props.result} />
                    <Count result={this.props.result} />
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
};

export default connect(mapStateToProps)(Quiz);