import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Button from '../../ui/button';
import { SummaryContext } from '../../context/summary-context/summary-provider';

interface SummaryContainerProps {}

const SummaryContainer = ({}: SummaryContainerProps) => {
  const { summaryEnabled, toggleSummaryEnabled } =
    React.useContext(SummaryContext);

  useEffect(() => {
    const messageListener = (request: { type: string; text: string }) => {
      if (request.type === 'TEXT_SELECTED') {
        console.log(request.text); // Do something with the selected text
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Cleanup the listener when the component is unmounted
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

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
      <div className={styles['bottom-container']}></div>
    </div>
  );
};

export default SummaryContainer;
