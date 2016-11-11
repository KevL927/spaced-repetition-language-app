var React = require('react');
var ReactDOM = require('react-dom');

var Count = function(props){
    return(
    <div>Correctly Answered Questions: {(props.result/10)} </div>
    );
}

module.exports = Count;