import React from 'react';
import styles from './style.module.css';

type TextVariant = 'standard';
type TextSize = 'xs' | 'sm' | 'ms' | 'md' | 'ml' | 'lg' | 'xl' | 'xxl';

interface TextProps extends React.ComponentPropsWithoutRef<'p'> {
  size?: TextSize;
  style?: React.CSSProperties;
  variant?: TextVariant;
}

const textSizeMap: Record<TextSize, string> = {
  xs: '11px',
  sm: '13px',
  ms: '14px',
  md: '15px',
  ml: '16px',
  lg: '18px',
  xl: '24px',
  xxl: '36px',
};

const Text: React.FC<TextProps> = ({
  size = 'md',
  children,
  variant = 'standard',
  style = {},
  color = 'white',
  ...props
}) => {
  const combinedStyle = {
    '--font-size': textSizeMap[size],
    '--color': color,
    ...style,
  } as React.CSSProperties;

  return (
    <p className={styles[variant]} style={combinedStyle} {...props}>
      {children}
    </p>
  );
};

export default Text;
