import * as React from 'react';
import classnames from 'classnames';
import { Icon } from 'react-icons-kit';
import styles from './Button.css';

export interface ButtonProps {
  /** Content to be displayed within*/
  children?: any;
  /** Button type */
  type?: 'button' | 'submit';
  /** Primary style */
  primary?: boolean;
  /** Secondary style */
  secondary?: boolean;
  /** SVG icon */
  icon?: any;
}

const handleKeyPress = (evt: React.KeyboardEvent<HTMLButtonElement>) => {
  if (evt.charCode === 32 || evt.charCode === 13) {
    evt.preventDefault();
    // (evt.target as HTMLElement).click();
    evt.target.click();
  }
};

const Button = ({ children, primary, secondary, icon, ...buttonProps }: ButtonProps) => {
  const className = classnames({
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.icon]: !!icon,
    // [styles.loading]: !!loading,
  });
  return (
    <button className={className} type="button" onKeyPress={handleKeyPress} {...buttonProps}>
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
};

export default Button;
