import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';  // Corrected typo
import Login from './Login';
import Register from './Register';
import Home from './Home.Jsx';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Render LandingPage component at the root route */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
        <Route path = "/home" element= {<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
