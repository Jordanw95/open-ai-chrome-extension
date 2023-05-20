import React, { useContext } from 'react';
import SummaryExtensionProvider, { SummaryContext } from './summary-provider';
import { render, screen, fireEvent } from '@testing-library/react';

const TestComponent = () => {
  const { summaryEnabled, toggleSummaryEnabled } = useContext(SummaryContext);

  return (
    <div>
      <p>{summaryEnabled ? 'Enabled' : 'Disabled'}</p>
      <button onClick={toggleSummaryEnabled}>Toggle</button>
    </div>
  );
};

// SummaryExtensionProvider.test.js


// Mock the chrome.storage.local object
global.chrome = {
  storage: {
    local: {
      get: jest.fn((key, callback) => callback({ summaryEnabled: false })),
      set: jest.fn(),
    },
  },
};

describe('SummaryExtensionProvider', () => {
  test('provides the summaryEnabled state', () => {
    render(
      <SummaryExtensionProvider>
        <TestComponent />
      </SummaryExtensionProvider>
    );

    expect(screen.getByText(/disabled/i)).toBeInTheDocument();
  });

  test('provides the summaryEnabled state when true', () => {
    global.chrome = {
      storage: {
        local: {
          get: jest.fn((key, callback) => callback({ summaryEnabled: true })),
          set: jest.fn(),
        },
      },
    };
    render(
      <SummaryExtensionProvider>
        <TestComponent />
      </SummaryExtensionProvider>
    );

    expect(screen.getByText(/enabled/i)).toBeInTheDocument();
  });

  test('provides the toggleSummaryEnabled function', () => {
    render(
      <SummaryExtensionProvider>
        <TestComponent />
      </SummaryExtensionProvider>
    );

    fireEvent.click(screen.getByText(/toggle/i));

    expect(chrome.storage.local.set).toHaveBeenCalledWith({ summaryEnabled: true });
  });
});
