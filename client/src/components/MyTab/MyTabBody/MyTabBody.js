import React from 'react'

import './MyTabBody.scss';



const myTabBody = (props) => (
    <div className="MyTab__Body" >
        <p><span onClick={props.tagEdit}>Reason: </span>{props.importance}</p>
        <p><span onClick={props.tagEdit}>Category: </span>{props.category}</p>
    </div>
)

export default myTabBody
