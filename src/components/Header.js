// @flow
import React from 'react';
import _throttle from 'lodash/throttle';
import classnames from 'classnames';
import styles from './Header.css';
// import Hamburger from '../hamburger/Hamburger';

type HeaderState = {
  isScrolled: boolean,
};

class Header extends React.Component<null, HeaderState> {
  //$FlowIssue
  scrollY: number;
  scrollListener: any;

  state = {
    isScrolled: false,
  };

  componentDidMount() {
    this.initializeScroll();
  }

  componentWillUnmount() {
    this.endScroll();
  }

  initializeScroll = () => {
    if (!this.scrollListener) {
      this.scrollListener = _throttle(this.handleScroll, 50);
      window.addEventListener('scroll', this.scrollListener);
      this.scrollY = window.scrollY;
    }
  };

  endScroll() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  handleScroll = () => {
    this.scrollY = window.scrollY;
    const isScrolled = this.scrollY !== undefined && this.scrollY > 0;
    this.setState({ isScrolled });
  };

  renderDesktopNavigation = () => (
    <nav styleName="desktop">
      <ul>
        <li>
          <button type="button">Sign In</button>
        </li>
        <li>
          <button type="button">Register</button>
        </li>
      </ul>
    </nav>
  );

  renderMobileNavigation = () => (
    <nav styleName="mobile">
      <span>Menu</span>
    </nav>
  );

  render() {
    const { isScrolled } = this.state;

    const className = classnames({ [styles.scrolled]: isScrolled });

    return (
      <header styleName="menu" className={className}>
        <div styleName="inner-wrapper">
          {this.renderDesktopNavigation()}
          {this.renderMobileNavigation()}
        </div>
      </header>
    );
  }
}

export default Header;
