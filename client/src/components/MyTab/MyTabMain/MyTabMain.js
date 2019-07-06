import React from 'react'

import './MyTabMain.scss';

const myTabMain = (props) => (
    <div className="MyTab__Main">
        <img src={props.src} alt="icon" width="16" height="16" />
        <p>
            <a href={props.href} className="RealLink" target="_blank" rel="noopener noreferrer">{props.href.toString()}</a>
            <span className="FakeLink">{props.placeLink}</span>
        </p>
    </div>
)

export default myTabMain
