import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Button from '../../ui/button';
import Status from '../../ui/status';
import Text from '../../ui/text';
import SummariesList from '../../components/summaries-list';
import { SummaryContext } from '../../context/summary-context/summary-provider';

interface SummaryContainerProps {}

const SummaryContainer = ({}: SummaryContainerProps) => {
  const { summaryEnabled, toggleSummaryEnabled } =
    React.useContext(SummaryContext);

  const toggleSummaryEnabledInDom = () => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id || 0, {
            type: 'TOGGLE_SUMMARY_ENABLED',
            summaryEnabled: !summaryEnabled,
          });
        }
      );
  };

  const handleSummariseToggle = () => {
    toggleSummaryEnabledInDom();
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
      <div className={styles['middle-container']}>
        <div className={styles['divider']}></div>
        <Text size="xl">Created Summaries:</Text>
      </div>
      <div className={styles['bottom-container']}>
        <SummariesList></SummariesList>
      </div>
    </div>
  );
};

export default SummaryContainer;
