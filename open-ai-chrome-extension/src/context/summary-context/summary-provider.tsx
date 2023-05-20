import React, { useEffect, useState } from 'react';

type SummaryExtensionProviderProps = {
  children: React.ReactNode;
};

export type SummaryExtensionContextType = {
  summaryEnabled: boolean;
  toggleSummaryEnabled: () => void;
};

const initialState: SummaryExtensionContextType = {
  summaryEnabled: false,
  toggleSummaryEnabled: () => {},
};

export const SummaryContext =
  React.createContext<SummaryExtensionContextType>(initialState);

const SummaryExtensionProvider = ({
  children,
}: SummaryExtensionProviderProps): JSX.Element => {
  const [summaryEnabled, setSummaryEnabled] = useState(false);

  useEffect(() => {
    // Load the state from storage when the component mounts
    chrome.storage.local.get('summaryEnabled', (data) => {
      setSummaryEnabled(data.summaryEnabled);
    });
  }, []);

  useEffect(() => {
    // Save the state to storage whenever it changes
    chrome.storage.local.set({ summaryEnabled });
  }, [summaryEnabled]);

  const toggleSummaryEnabled = () => {
    setSummaryEnabled((prevSummaryEnabled) => !prevSummaryEnabled);
  };

  return (
    <SummaryContext.Provider value={{ summaryEnabled, toggleSummaryEnabled }}>
      {children}
    </SummaryContext.Provider>
  );
};

export default SummaryExtensionProvider;
