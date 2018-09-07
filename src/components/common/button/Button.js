import * as React from 'react';
import classnames from 'classnames';
import { Icon } from 'react-icons-kit';
import styles from './Button.css';

export type ButtonProps = {
  children: any,
  type?: string,
  primary?: boolean,
  secondary?: boolean,
  icon?: any,
};

const handleKeyPress = evt => {
  if (evt.charCode === 32 || evt.charCode === 13) {
    evt.preventDefault();
    evt.target.click();
  }
};

const Button = ({ children, primary, secondary, icon, ...buttonProps }: ButtonProps) => {
  const className = classnames({
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.icon]: !!icon,
  });
  return (
    <button className={className} type="button" onKeyPress={handleKeyPress} {...buttonProps}>
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
};

export default Button;
