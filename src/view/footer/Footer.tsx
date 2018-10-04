import React from 'react';
// @ts-ignore
import { linkedin as linkedinIcon } from 'react-icons-kit/feather/linkedin';
import Button from '../../components/common/button/index';
import styles from './Footer.css';

function Footer() {
  return (
    <footer>
      <div className={styles.innerWrapper}>
        © 2018 Mariusz Kaczkowski
        <Button icon={linkedinIcon} />
      </div>
    </footer>
  );
}

export default Footer;
