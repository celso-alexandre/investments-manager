import { Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { NoMatch } from './not-found';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
