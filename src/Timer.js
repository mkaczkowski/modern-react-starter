import React from 'react';
import PropTypes from 'prop-types';


class Timer extends React.Component {
  static propTypes = {
    from: PropTypes.number,
    to: PropTypes.number,
  }
  state = {
    from: this.props.from,
    to: this.props.to,
  };

  componentDidMount() {
    setInterval(() => this.setState({ from: this.state.from - 1}), 1000);
  }
  //
  // end = (e) => {
  //   console.log('test end');
  //   if (this.state.from === this.state.to) {
  //     console.log('hej hej');
  //     clearInterval(this.setState);
  //   }
  // }


  render() {
    const from = this.state.from;

    return (
      <div>
        <h1>
          {from}
        </h1>
      </div>
    );
  }
}


export default Timer;
