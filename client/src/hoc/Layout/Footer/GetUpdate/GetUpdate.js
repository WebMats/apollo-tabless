import React, { Component } from 'react'

import './GetUpdate.scss';

class GetUpdate extends Component {
  render() {
    return (
      <div className="GetUpdateContainer">
        <h2>Get Updates about Tabless Thursday</h2>
        <div className="GetUpdate__InputField">
            <input placeholder="Enter your email" />
            <button type="button">SUBSCRIBE</button>
        </div>
      </div>
    )
  }
}

export default GetUpdate;
