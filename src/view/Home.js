// @flow

import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';

type HomeProps = {
  username: string,
};

const UsernameLabel = styled.div`
  font-weight: normal;
  color: red;

  @media (min-width: 420px) {
    color: yellowgreen;
  }
`;

const welcomeClassName = css`
  min-height: 1000px;
  color: gray;
  font-size: 3rem;
  text-align: center;
  transform: rotate(-5deg);
`;

class Home extends React.Component<HomeProps> {
  state = {
    welcomeText: 'Hello',
  };

  render() {
    const { welcomeText } = this.state;
    const { username } = this.props;

    return (
      <div>
        <div className={welcomeClassName}>
          {welcomeText}
          <UsernameLabel>{`: ${username}`}</UsernameLabel>
        </div>
      </div>
    );
  }
}

export default Home;
