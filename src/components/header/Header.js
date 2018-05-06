// @flow
import React from 'react';
// import { css } from 'emotion';
// import styled, { keyframes } from 'react-emotion';
import LanguageChooser from '../languageChooser';

type HeaderProps = {
  children: any,
  stage: any,
};

type HeaderState = {
  stage: any,
};

class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  static defaultProps = {
    stage: 1,
  };

  static LanguageChooser = LanguageChooser;
  static Menu = () => <div>2</div>;
  static Logo = () => <div>2</div>;

  state = {
    stage: this.props.stage,
  };
  handleClick = () => {
    this.setState({ stage: this.state.stage + 1 });
  };
  render() {
    const { children } = this.props;
    const { stage } = this.state;
    return <div>{children}</div>;

    // const children = React.Children.map(this.props.children, child => {
    //   return React.cloneElement(child, {stage, handleClick: this.handleClick})
    // })
  }
}

export default HeaderComponent;
