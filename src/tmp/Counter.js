import React from "react";
import PropTypes from "prop-types";

class Counter extends React.Component {

  static defaultProps = {
    title: "anonymous"
  };

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  state = {
    counter: 0
  };

  componentDidMount(){
    console.debug("Hi! I am mounted 👍")
  }

  increment = () => {
    this.setState(state => {
      return { counter: state.counter + 1 };
    });
  };

  render() {
    const title = this.props.title;
    const { counter } = this.state;

    return (
      <div>
        <h1>
          Title <span className="title">{`: ${title}`}</span>
        </h1>
        <div style={{fontSize:"2rem"}}>Counter ➡️ {counter}</div>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

export default Counter;
