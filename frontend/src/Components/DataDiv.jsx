import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUsernameFromToken } from '../Common/authHelper'; // Utility to extract username from JWT

const DailyDataPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      const token = localStorage.getItem('token'); // Get JWT from localStorage
      const username = getUsernameFromToken(token); // Extract username from the token

      if (!username) {
        setError('Username not found in token.');
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching predictions for username: ${username}`);

        const response = await axios.get(`/api/daily_data?username=${username}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication if required
          },
        });

        const data = response.data;
        if (Array.isArray(data)) {
          setPredictions(data); // Set predictions if the response is an array
        } else {
          setPredictions([]); // Default to an empty array if response is not valid
          setError('Invalid response from API. Expected an array of predictions.');
        }
      } catch (err) {
        setError(`Error fetching predictions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Error state
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Predictions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {predictions.length > 0 ? (
          predictions.map((prediction) => (
            <div key={prediction.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold">Prediction ID: {prediction.id}</h2>
              <p className="text-gray-700"><strong>Username:</strong> {prediction.username}</p>
              <p className="text-gray-700"><strong>Source:</strong> {prediction.source}</p>
              <p className="text-gray-700"><strong>Destination:</strong> {prediction.destination}</p>
              <p className="text-gray-700"><strong>Vehicle Type:</strong> {prediction.vehicle_type}</p>
              <p className="text-gray-700"><strong>Passenger Count:</strong> {prediction.passenger_count}</p>
              <p className="text-gray-700"><strong>Is Electric:</strong> {prediction.is_electric}</p>
              <p className="text-gray-700"><strong>Date:</strong> {new Date(prediction.date).toLocaleString()}</p>
              <p className="text-gray-700"><strong>Distance:</strong> {prediction.distance} km</p>
              <p className="text-gray-700"><strong>Time Taken:</strong> {prediction.time_taken} mins</p>
              <p className="text-gray-700"><strong>Predicted CO2 Emission:</strong> {prediction.predicted_co2.toFixed(2)} g</p>
            </div>
          ))
        ) : (
          <div className="text-center">No predictions found.</div>
        )}
      </div>
    </div>
  );
};

export default DailyDataPage;
