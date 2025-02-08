import React from "react";
import Nav2 from "../Components/Nav2.jsx";
import Footer from "../Components/Footer.jsx";
import Calculator from "../Components/Calculator.jsx";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav2 />
      <main className="flex-grow">
        <h1 className="text-center text-4xl font-bold mt-10">Welcome to CarbonIQ</h1>
        <Calculator />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
