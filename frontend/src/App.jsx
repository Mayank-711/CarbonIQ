import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";  // Import LandingPage component
import Login from "./Pages/Login"; 
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* Route to LandingPage */}
        <Route path="/login" element={<Login />} />  {/* Route to Login page */}
        <Route path="/signup" element={<Signup />} />  {/* Route to Signup page */}
      </Routes>
    </Router>
  );
};

export default App;