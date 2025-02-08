import React, { useState, useEffect } from "react";
import axios from "axios";

const Calculator = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [sourceCoordinates, setSourceCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [distance, setDistance] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [vehicleType, setVehicleType] = useState("bus");
  const [passengerCount, setPassengerCount] = useState(1);
  const [isElectric, setIsElectric] = useState("no");
  const [currentDate, setCurrentDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const OLAMAPS_API = "upIsbo0X7RjH2SfHjy2eYpm8TWdynT6vFDCpA85y"; // Replace with your actual API key

  useEffect(() => {
    setCurrentDate(new Date().toISOString());
  }, []);

  const fetchSuggestions = async (input, setSuggestions) => {
    if (input.trim().length > 2) {
      try {
        const response = await axios.get(`https://api.olamaps.io/places/v1/autocomplete`, {
          params: {
            input: input,
            api_key: OLAMAPS_API,
          },
        });
        const predictions = response.data.predictions || [];
        const formattedSuggestions = predictions.map((place) => ({
          description: place.description,
          coordinates: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
          },
        }));
        setSuggestions(formattedSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchRouteDetails = async () => {
    if (!sourceCoordinates || !destinationCoordinates) {
      setErrorMessage("Please select valid source and destination locations.");
      return;
    }

    try {
      const response = await axios.post(`https://api.olamaps.io/routing/v1/directions`, null, {
        params: {
          origin: `${sourceCoordinates.lat},${sourceCoordinates.lng}`,
          destination: `${destinationCoordinates.lat},${destinationCoordinates.lng}`,
          api_key: OLAMAPS_API,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const legs = data.routes[0]?.legs || [];
        const totalDistance = legs.reduce((sum, leg) => sum + leg.distance, 0) / 1000;
        const totalDuration = legs.reduce((sum, leg) => sum + leg.duration, 0) / 60;

        setDistance(totalDistance.toFixed(2));
        setTimeTaken(totalDuration.toFixed(2));

        const predictionData = {
          source,
          destination,
          vehicleType,
          passengerCount,
          isElectric,
          date: currentDate,
          distance: totalDistance.toFixed(2),
          timeTaken: totalDuration.toFixed(2),
        };

        await axios.post("http://localhost:5000/api/predict_co2", predictionData);

        setSuccessMessage("Trip logged successfully! The page will refresh in 5 seconds.");
        
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 5000);
      } else {
        setErrorMessage(`Failed to fetch route details: ${response.statusText}`);
      }
    } catch (error) {
      setErrorMessage(`Error fetching route details: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-green-50">
      {successMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
          {errorMessage}
        </div>
      )}
      <form
        className="bg-green-700 p-8 rounded-lg shadow-md text-white w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          fetchRouteDetails();
        }}
      >
        <label className="block mb-4 relative">
  Source:
  <input
    type="text"
    className="block w-full mt-2 p-2 rounded-md text-green-800"
    value={source}
    onChange={(e) => {
      setSource(e.target.value);
      fetchSuggestions(e.target.value, setSourceSuggestions);
    }}
  />
  <ul className="absolute w-full bg-white text-green-800 mt-1 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
    {sourceSuggestions.map((suggestion, index) => (
      <li
        key={index}
        className="p-2 hover:bg-green-100 cursor-pointer"
        onClick={() => {
          setSource(suggestion.description);
          setSourceCoordinates(suggestion.coordinates);
          setSourceSuggestions([]);
        }}
      >
        {suggestion.description}
      </li>
    ))}
  </ul>
</label>

<label className="block mb-4 relative">
  Destination:
  <input
    type="text"
    className="block w-full mt-2 p-2 rounded-md text-green-800"
    value={destination}
    onChange={(e) => {
      setDestination(e.target.value);
      fetchSuggestions(e.target.value, setDestinationSuggestions);
    }}
  />
  <ul className="absolute w-full bg-white text-green-800 mt-1 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
    {destinationSuggestions.map((suggestion, index) => (
      <li
        key={index}
        className="p-2 hover:bg-green-100 cursor-pointer"
        onClick={() => {
          setDestination(suggestion.description);
          setDestinationCoordinates(suggestion.coordinates);
          setDestinationSuggestions([]);
        }}
      >
        {suggestion.description}
      </li>
    ))}
  </ul>
</label>

       

        <div className="flex justify-between mb-4">
          <label className="w-1/2 mr-2">
            Vehicle Type:
            <select
              className="block w-full mt-2 p-2 rounded-md text-green-800"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="bus">Bus</option>
              <option value="train">Local Train</option>
              <option value="metro">Metro</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="walk">Walk</option>
              <option value="bicycle">Bicycle</option>
              <option value="rickshaw">Rickshaw</option>
              <option value="scooter">Scooter</option>
            </select>
          </label>

          <label className="w-1/2">
            Passenger Count:
            <input
              type="number"
              min="1"
              className="block w-full mt-2 p-2 rounded-md text-green-800"
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
            />
          </label>
        </div>

        <label className="block mb-4">
          Is Electric:
          <div className="flex items-center mt-2">
            <label className="mr-4">
              <input
                type="radio"
                name="isElectric"
                value="yes"
                checked={isElectric === "yes"}
                onChange={() => setIsElectric("yes")}
                className="mr-1"
              />
              Electric
            </label>
            <label>
              <input
                type="radio"
                name="isElectric"
                value="no"
                checked={isElectric === "no"}
                onChange={() => setIsElectric("no")}
                className="mr-1"
              />
              Non-Electric
            </label>
          </div>
        </label>

        <button
          type="submit"
          className="w-full bg-green-100 text-green-700 py-2 mt-4 rounded-md hover:bg-green-200 transition"
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Calculator;
