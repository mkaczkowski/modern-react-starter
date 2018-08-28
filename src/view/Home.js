import React from 'react';

import './Home.scss';

type HomeProps = {
  /**
   * Your username
   */
  username?: string,
};

class Home extends React.Component<HomeProps> {
  static defaultProps = {
    username: '-',
  };

  state = {
    welcomeText: 'Hello',
  };

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
