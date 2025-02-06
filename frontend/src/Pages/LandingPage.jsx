import React from 'react';
import Nav1 from '../Components/Nav1';
import Footer from '../Components/Footer';
import videoSrc from '../assets/videos/LandingPage.mp4'; // Import the video

const LandingPage = () => {
  return (
    <div>
      {/* Video Section with Navbar inside the video container */}
      <div className="relative">
        {/* Video */}
        <video className="w-full h-auto" autoPlay loop muted>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Navbar positioned absolutely at the top of the video */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Nav1 />
        </div>

        {/* Left Overlay Content - Sustainable Choices with ML */}
        <div className="absolute top-1/4 left-10 w-[40%] bg-[#8FBC8F] bg-opacity-80 p-12 rounded-md z-10 transition-transform duration-500 hover:scale-105 hover:bg-[#6B8E23]">
          <h2 className="text-[#F0FFF0] text-3xl font-bold mb-4">Sustainable Choices Powered by AI</h2>
          <p className="text-[#F0FFF0] text-xl">
            Our machine learning models help you make informed, eco-friendly decisions by analyzing your behavior and suggesting better, more sustainable alternatives. 
            <br />
            With AI, small actions like changing your travel habits can have a huge positive impact on the environment.
          </p>
        </div>

        {/* Right Overlay Content - Carbon Footprint with ML */}
        <div className="absolute top-1/4 right-10 w-[40%] bg-[#3CB371] bg-opacity-80 p-12 rounded-md z-10 transition-transform duration-500 hover:scale-105 hover:bg-[#2E8B57]">
          <h2 className="text-[#F0FFF0] text-3xl font-bold mb-4">Track and Reduce Your Carbon Footprint</h2>
          <p className="text-[#F0FFF0] text-xl">
            Using advanced machine learning techniques, CarbonIQ calculates your carbon footprint based on your travel patterns, helping you track and reduce emissions.
            <br />
            The AI continually learns and provides more accurate suggestions for reducing your environmental impact.
          </p>
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
