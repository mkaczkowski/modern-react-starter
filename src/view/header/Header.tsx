import React from 'react';
import _throttle from 'lodash/throttle';
import classnames  from 'classnames' ;

import styles from './Header.css';

type HeaderState = {
  isScrolled: boolean,
};

class Header extends React.PureComponent<null, HeaderState> {
  //$FlowIssue
  scrollY: number = 0;
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

  render() {
    const { isScrolled } = this.state;

    const className = classnames({ [styles.scrolled]: isScrolled });

    return (
      <header styleName="menu" className={className}>
        <div styleName="inner-wrapper">
          <h1>Title</h1>
        </div>
      </header>
    );
  }
}

export default Header;
