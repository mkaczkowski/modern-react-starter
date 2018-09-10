import React from 'react';
import Button from '../button/Button';

import './ButtonBar.css';

type ButtonBarButton = {
  label: string,
  action: () => void,
};

export type ButtonBarProps = {
  className?: string,
  buttons: ButtonBarButton[],
};

export type ButtonBarState = {
  active: boolean,
};

class ButtonBar extends React.PureComponent<ButtonBarProps, ButtonBarState> {
  state = {
    active: 0,
  };

  onClickHandler = e => {
    const active = parseInt(e.currentTarget.name, 0);
    this.setState(() => ({ active }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.active !== this.state.active) {
      const activeButton = this.props.buttons[this.state.active];
      activeButton.action();
    }
  }

  render() {
    const { className, buttons } = this.props;
    const { active } = this.state;
    return (
      <nav styleName="wrapper" className={className}>
        {buttons.map(({ label }, index) => (
          <Button name={index} primary={index === active} onClick={this.onClickHandler} key={label}>
            {label}
          </Button>
        ))}
      </nav>
    );
  }
}

export default ButtonBar;
