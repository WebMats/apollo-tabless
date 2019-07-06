import React from 'react';

import './Textarea.scss';

const textarea = (props) => (
    <div className="TextareaWrapper">
        <textarea className="Textarea" onChange={props.changed} {...props.elementFrame} ></textarea>
        <p className={props.numChar.length === props.elementFrame.maxLength ? "Limit True" : "Limit"}>{props.numChar.length}/{props.elementFrame.maxLength}</p>
    </div>
)

export default textarea;