import React from 'react';
import styles from './style.module.css';
import classNames from 'classnames';

type ButtonVariant = 'primary';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: string;
  listenEnter?: boolean;
  onClick: () => void;
  active?: boolean;
  style?: React.CSSProperties;
  variant?: ButtonVariant;
  state?: 'active' | 'disabled' | 'none';
}

const Button = ({
  onClick,
  children,
  variant = 'primary',
  state,
}: ButtonProps) => {
  const buttonClassName = classNames(styles[variant], {
    [styles.active]: state === 'active',
  });

  return (
    <button onClick={onClick} className={buttonClassName}>
      {children}
    </button>
  );
};

export default Button;
