import { Carousel, Typography, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import carousel1 from "../assets/carousel1.webp";
import carousel2 from "../assets/carousel2.jpg";
import carousel3 from "../assets/carousel3.jpg";

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselData = [
    {
      image: carousel1,
      text: "Reduce your carbon footprint and protect the environment!",
    },
    {
      image: carousel2,
      text: "Save energy and reduce waste for a greener future.",
    },
    {
      image: carousel3,
      text: "Support sustainable practices and help preserve nature.",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    // Cleanup interval when component is unmounted or when interval changes
    return () => clearInterval(interval);
  }, [carouselData.length]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Material Tailwind Carousel */}
      <div className="relative h-full w-full">
        {/* Current Slide */}
        <img
          src={carouselData[currentIndex].image}
          alt={`carousel image ${currentIndex + 1}`}
          className="h-full w-full object-cover rounded-none"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              {carouselData[currentIndex].text}
            </Typography>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <div
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-[#B2E0B2] text-white rounded-full cursor-pointer opacity-35"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </div>

      {/* Right Arrow */}
      <div
        onClick={handleNext}
        className="absolute top-1/2 right-7 transform -translate-y-1/2 p-2 bg-[#B2E0B2] text-white rounded-full cursor-pointer opacity-35"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Dots for navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
