var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect;

var Quiz = React.createClass({
    
    detectTextInput: function () {
        
    },
    
    submitAnswer: function (event) {
        event.preventDefault();
        this.props.dispatch(postQuesthis.refs.userInput.value);
    },
    
    render: function () {
        return (
            <div className="quiz-card">
                <div className="question">
                    <Question />
                </div>
                <div className="answer">
                    <input type="text" name="answer" ref="userInput" onChange={this.detectTextInput}></input>
                </div>
                    <input type="submit" name="submit" onSubmit={this.submitAnswer}></input>
            </div>
        );
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Quiz);