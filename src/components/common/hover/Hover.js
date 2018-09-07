import React from 'react';

class Hover extends React.Component {
  state = {
    isMouseInside: false,
  };

  mouseEnter = () => {
    this.setState({ isMouseInside: true });
  };

  mouseLeave = () => {
    this.setState({ isMouseInside: false });
  };

  render() {
    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        {this.props.children(this.state.isMouseInside)}
      </div>
    );
  }
}

export default Hover;
