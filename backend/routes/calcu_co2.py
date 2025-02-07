from flask import Blueprint, request, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import StandardScaler

# Create a Blueprint for the route
co2_prediction = Blueprint('co2_prediction', __name__)

# Load the trained model and scaler
model = joblib.load('./model/CarbonIQ_rf_model.pkl')
scaler = joblib.load('./model/CarbonIQ_scaler.pkl')

# Available transport modes for encoding
transport_modes = ["acbus", "actrain", "bicycle", "bike", "bus", "car",
                   "eacbus", "ebike", "ebus", "ecar", "erickshaw", "escooter",
                   "etrain", "rickshaw", "scooter", "walk"]

# Initialize OneHotEncoder with known transport modes and fit it
encoder = OneHotEncoder(categories=[transport_modes], sparse_output=False)
encoder.fit(pd.DataFrame(transport_modes, columns=["mode_of_transport"]))

@co2_prediction.route("/api/calculate_co2", methods=["POST"])
def index():
    if request.method == "POST":
        # Get JSON data from the request
        data = request.get_json()

        mode_of_transport = data.get("mode_of_transport")
        passengers = data.get("passengers")
        distance = data.get("distance")
        time = data.get("time")
        # If any required field is missing, return an error
        if not all([mode_of_transport, passengers, distance, time]):
            return jsonify({"error": "Missing required fields"}), 400

        # Map metro to actrain
        if mode_of_transport == "metro":
            mode_of_transport = "actrain"

        # Prepare input data
        input_data = pd.DataFrame({
            "mode_of_transport": [mode_of_transport],
            "passengers": [passengers],
            "distance": [distance],
            "time": [time]
        })

        # One-hot encode the transport mode
        encoded_input = encoder.transform(input_data[['mode_of_transport']])
        encoded_df = pd.DataFrame(encoded_input, columns=encoder.get_feature_names_out())

        # Scale numeric inputs
        scaled_input = scaler.transform(input_data[['passengers', 'distance', 'time']])
        scaled_df = pd.DataFrame(scaled_input, columns=['passengers', 'distance', 'time'])

        # Combine scaled and encoded features, ensuring correct order
        final_input = pd.concat([scaled_df, encoded_df], axis=1)
        final_input = final_input.reindex(columns=model.feature_names_in_, fill_value=0)

        # Predict CO2 emissions
        predicted_co2 = model.predict(final_input)

        # Return the result as JSON
        return jsonify({"predicted_co2": f"{predicted_co2[0]:.2f} g CO2"})

    return jsonify({"message": "Please provide input data for prediction."})
