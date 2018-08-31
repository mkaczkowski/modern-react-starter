// @flow
import * as React from 'react';

import './Home.css';

type HomeProps = {
  /**
   * Your username
   */
  username: number,
};

type HomeState = {
  welcomeText: string
}

class Home extends React.Component<HomeProps, HomeState> {
  state = { welcomeText: 'Hello' };

  render() {
    const { welcomeText } = this.state;
    const { username } = this.props;

    return (
      <>
        <h1 className="welcome">
          {welcomeText}
          <span className="username">{`: ${username}`}</span>
        </h1>
      </>
    );
  }
}

export default Home;
