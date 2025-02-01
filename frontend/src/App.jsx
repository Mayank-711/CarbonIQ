import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';  // Corrected typo
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Render LandingPage component at the root route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
