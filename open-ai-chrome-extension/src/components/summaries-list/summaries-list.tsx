import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Status from '../../ui/status';
import Text from '../../ui/text';
import { Summary } from '../../types';

interface SummariesListProps {}

const SummariesList = ({}: SummariesListProps) => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const getSummaries = async () => {
    setError(false);
    setErrorMessage(undefined);
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3002/summaries');
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      const summaries = (await response.json()) as Summary[];
      if (!summaries.length) {
        setLoading(false);
        setError(true);
        setErrorMessage('No summaries available.');
      }
      setSummaries(summaries);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage('An error has occurred while fetching summaries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSummaries();
  }, []);

  if (loading || error) {
    return (
      <Status loading={loading} error={error} errorMessage={errorMessage} />
    );
  }
  return (
    <div className={styles['summaries-list-container']}>
      {summaries.map((summary) => (
        <div className={styles['summary-container']}>
          <Text color="white" size="md">
            {summary.summary}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default SummariesList;
