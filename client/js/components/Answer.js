import React from 'react';

export default props => {
    return (
        <div id="feedback">
            <p>The correct answer is:</p>
            <p>{props.answer.toUpperCase()}</p>
        </div>
    );
};
