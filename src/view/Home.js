import React from "react";
import PropTypes from "prop-types";

import "./Home.sass";

class Home extends React.Component {
  static defaultProps = {
    username: "anonymous"
  };

  static propTypes = {
    username: PropTypes.string.isRequired
  };

  state = {
    counter: 0
  };

  componentDidMount(){
    console.log("Hi! I am mounted 👍")
  }

  incrementCounter = () => {
    this.setState(state => {
      return { counter: state.counter + 1 };
    });
  };

  render() {
    const username = this.props.username;
    const { counter } = this.state;

    return (
      <div>
        <h1 className="welcome">
          Hello<span className="username">{`: ${username}`}</span>
        </h1>
        <div>Your counter = {counter}</div>
        <button onClick={this.incrementCounter}>+</button>
      </div>
    );
  }
}

export default Home;
