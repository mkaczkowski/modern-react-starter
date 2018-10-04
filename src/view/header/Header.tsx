import React from 'react';
import _throttle from 'lodash/throttle';
import classnames from 'classnames';

import styles from './Header.css';

interface HeaderState {
  isScrolled: boolean;
}

class Header extends React.Component<any, HeaderState> {
  scrollPosition: any;
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
      this.scrollPosition = window.scrollY;
    }
  };

  endScroll() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  handleScroll = () => {
    this.scrollPosition = window.scrollY;
    const isScrolled = this.scrollPosition !== undefined && this.scrollPosition > 0;
    this.setState({ isScrolled });
  };

  render() {
    const { isScrolled } = this.state;

    const className = classnames(styles.menu, {
      [styles.scrolled]: isScrolled,
    });

    return (
      <header className={className}>
        <div className={styles.innerWrapper}>
          <h1>Title</h1>
        </div>
      </header>
    );
  }
}

export default Header;
