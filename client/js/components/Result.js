var React = require('react');
var ReactDOM = require('react-dom');

var Result = function(props){
    return(
    <div className='result'>Score : {props.result} </div>
    );
}

module.exports = Result;