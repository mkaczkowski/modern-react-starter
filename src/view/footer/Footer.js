// @flow
import React from 'react';
import { Icon } from 'react-icons-kit';
import { linkedin as linkedinIcon } from 'react-icons-kit/feather/linkedin';
import Button from '../../components/common/button';
import {} from './Footer.css';

function Footer() {
  return (
    <footer>
      <div styleName="inner-wrapper">
        <Button primary>
          <Icon icon={linkedinIcon} />
        </Button>
        <Button secondary>
          <Icon icon={linkedinIcon} />
        </Button>
        <Button icon={linkedinIcon} />
      </div>
    </footer>
  );
}

export default Footer;
