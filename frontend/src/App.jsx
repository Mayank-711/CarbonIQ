// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";  // Import LandingPage component


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* Route to LandingPage */}
        {/* Add other routes if needed */}
      </Routes>
    </Router>
  );
};

export default App;
