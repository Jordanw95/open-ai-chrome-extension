import React, { useState } from 'react';
import styles from './style.module.css';
import Button from '../../ui/button';
import { SummaryContext } from '../../context/summary-context/summary-provider';

interface SummaryContainerProps {}

const SummaryContainer = ({}: SummaryContainerProps) => {
  const { summaryEnabled, toggleSummaryEnabled } =
    React.useContext(SummaryContext);

  const handleSummariseToggle = () => {
    toggleSummaryEnabled();
  };

  return (
    <div className={styles['main-page']}>
      <div className={styles['top-container']}>
        <Button
          onClick={handleSummariseToggle}
          state={summaryEnabled ? 'active' : 'none'}
        >
          Enable Summarise
        </Button>
      </div>
      <div className={styles['bottom-container']}></div>
    </div>
  );
};

export default SummaryContainer;
