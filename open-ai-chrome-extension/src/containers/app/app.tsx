import SummaryContainer from '../summary-container';
import SummaryProvider from '../../context/summary-context/summary-provider';

const App = () => {
  // Empty for now but to be used for routing and other global things
  return (
    <SummaryProvider>
      <SummaryContainer></SummaryContainer>
    </SummaryProvider>
  );
};

export default App;
