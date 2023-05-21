import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import Status from '../../ui/status';
import Text from '../../ui/text';
import { Summary } from '../../types';

interface SummariesListProps {}

const SummariesList = ({}: SummariesListProps) => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(false);

  const getSummaries = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:3002/summaries');
    const summaries = (await response.json()) as Summary[];
    // TODO error handling and create a status element to handle elements
    setSummaries(summaries);
    setLoading(false);
  };

  useEffect(() => {
    getSummaries();
  }, []);

  if (loading) {
    return <Status loading={loading} />;
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
