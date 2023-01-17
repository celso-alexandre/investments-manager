import { Route, Routes } from 'react-router-dom';
import { InvestmentGoals } from './investment-goals';
import { NoMatch } from './not-found';

export function App() {
  return (
    <Routes>
      <Route index element={<InvestmentGoals />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
