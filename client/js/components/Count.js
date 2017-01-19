import React from 'react';

export default props => {
    return (
        <div id="result">Correctly Answered Questions: {(props.result/10)} </div>
    );
};