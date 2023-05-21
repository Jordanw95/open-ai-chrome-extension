import { render, fireEvent, act } from '@testing-library/react';
import { SummaryContext } from '../../context/summary-context/summary-provider';
import SummaryContainer from './summary';

describe('SummaryContainer', () => {
  let toggleSummaryEnabled = jest.fn();

  beforeEach(() => {
    // Mock chrome.tabs.query
    global.chrome = {
      tabs: {
        query: (_, callback) => callback([{ id: 123 }]),
        sendMessage: jest.fn(),
      },
    };
    toggleSummaryEnabled = jest.fn();
  });

  it('renders the Enable Summarise button', () => {
    const { getByText } = render(
      <SummaryContext.Provider value={{ summaryEnabled: false, toggleSummaryEnabled }}>
        <SummaryContainer />
      </SummaryContext.Provider>
    );
    expect(getByText('Enable Summarise')).toBeInTheDocument();
  });

  it('calls toggleSummaryEnabled and sends a message when the button is clicked', async () => {
    const { getByText } = render(
      <SummaryContext.Provider value={{ summaryEnabled: false, toggleSummaryEnabled }}>
        <SummaryContainer />
      </SummaryContext.Provider>
    );

    await act(async () => {
      fireEvent.click(getByText('Enable Summarise'));
    });

    expect(toggleSummaryEnabled).toHaveBeenCalled();
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(123, {
      type: 'TOGGLE_SUMMARY_ENABLED',
      summaryEnabled: true,
    });
  });

  it('renders the Enable Summarise button with "none" state when summaryEnabled is false', () => {
    const { getByText } = render(
      <SummaryContext.Provider value={{ summaryEnabled: false, toggleSummaryEnabled }}>
        <SummaryContainer />
      </SummaryContext.Provider>
    );
    const button = getByText('Enable Summarise');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('active');
  });

  it('renders the Enable Summarise button with "active" state when summaryEnabled is true', () => {
    const { getByText } = render(
      <SummaryContext.Provider value={{ summaryEnabled: true, toggleSummaryEnabled }}>
        <SummaryContainer />
      </SummaryContext.Provider>
    );
    const button = getByText('Enable Summarise');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('active');
  });
});
