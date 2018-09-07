// @flow
import React from 'react';
import { linkedin as linkedinIcon } from 'react-icons-kit/feather/linkedin';
import Button from '../../components/common/button';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div styleName="inner-wrapper">
        © 2018 Mariusz Kaczkowski
        <Button icon={linkedinIcon} />
      </div>
    </footer>
  );
}

export default Footer;
