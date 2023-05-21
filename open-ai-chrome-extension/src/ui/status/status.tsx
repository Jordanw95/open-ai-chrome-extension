import React from 'react';
import Text from '../text';
import styles from './style.module.css';

interface StatusProps {
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  hideIcon?: boolean;
}

const Status = ({
  loading,
  error,
  errorMessage,
}: StatusProps): React.ReactElement | null => {
  if (error) {
    return (
      <div className={styles['container']}>
        <div className={styles['error-container']}>
          <Text style={{ textAlign: 'center' }}>
            {errorMessage || 'An unknown error has occurred.'}
          </Text>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles['container']}>
        <div className={styles['spinner']}></div>
      </div>
    );
  }
  return null;
};

export default Status;
