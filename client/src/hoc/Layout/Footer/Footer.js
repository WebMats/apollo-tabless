import React, { Component } from 'react'
import GetUpdate from './GetUpdate/GetUpdate'
import FooterLinks from './FooterLinks/FooterLinks';

import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
          <GetUpdate />
          <hr />
          <FooterLinks />
          <p className="Copyright">&copy;Tabless Thursday 2019. All rights reserved.</p>
      </footer>
    )
  }
}

export default Footer;
