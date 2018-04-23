import * as React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {
  static propTypes = {
    to: PropTypes.number.isRequired,
    from: PropTypes.number.isRequired,
    onSuccess: PropTypes.func,
  }

  static defaultProps = {
    onSuccess: undefined,
  }

  state = {
    isPaused: false,
    countFrom: this.props.from,
    countTo: this.props.to,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.countdown = setInterval(
      () => this.tick(),
      1000,
    );
  }

  tick = () => {
    this.setState({
      countFrom: this.state.countFrom - 1,
    });
  }

  continueTimer = () => {
    this.startTimer();
    this.setState({
      isPaused: false,
    });
  }

  stopTimer = () => {
    clearInterval(this.countdown);
  }

  resetTimer = () => {
    this.setState({
      countFrom: this.props.from,
    });
    this.continueTimer();
  }

  pauseTimer = () => {
    this.stopTimer();
    this.setState({
      isPaused: !this.state.isPaused,
    });
  }

  finishTimer = () => {
    this.stopTimer();
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  }

  formatCounterTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    if (minutes < 10) { minutes = `0${minutes}`; }
    if (seconds < 10) { seconds = `0${seconds}`; }

    return `${minutes}:${seconds}`;
  }

  render() {
    const { from, to } = this.props;
    const { countFrom } = this.state;

    const timeLeft = this.state.countFrom - this.state.countTo;

    return (
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', flexDirection: 'column',
        }}
      >
        <h1>Counter</h1>

        {
          this.props.to > this.props.from ? (
            <h2>Hey, make sure that From is greater than To!</h2>
          ) : (
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Counting from: {this.formatCounterTime(from)}</p>
                <p style={{ marginLeft: '15px' }}>Counting to: {this.formatCounterTime(to)}</p>
              </div>
              <button
                onClick={timeLeft === 0 ? this.resetTimer : (this.state.isPaused ? this.continueTimer : this.pauseTimer)}
                style={{
                  fontSize: '16px', marginBottom: '15px', padding: '10px', cursor: 'pointer', backgroundColor: '#db2736', width: '100%',
                }}
              >
                <p style={{ textAlign: 'center' }}>Time left: {this.formatCounterTime(countFrom)}</p>
              </button>
              {
                timeLeft === 0 && (
                  this.finishTimer()
                )
              }
            </div>
          )
        }

      </div>
    );
  }
}

export default Counter;
