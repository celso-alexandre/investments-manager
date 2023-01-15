import { Route, Routes } from 'react-router-dom';
import { InvestmentGoals } from './investment-goals';
import { NoMatch } from './not-found';

function App() {
  return (
    <Routes>
      <Route index element={<InvestmentGoals />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
