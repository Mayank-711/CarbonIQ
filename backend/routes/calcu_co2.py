from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
import joblib
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler



co2_prediction = Blueprint('co2_prediction', __name__)
CORS(co2_prediction)

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


def predict_co2_emission(mode_of_transport: str, passengers: int, distance: float, time: float) -> float:
    # Map metro to actrain if required
    

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

    # Return the prediction as a float
    return float(predicted_co2[0])


@co2_prediction.route('/api/predict_co2', methods=['POST'])
@cross_origin()
def predict_co2():
    try:
        # Parse JSON request data
        data = request.get_json()
        mode_of_transport = data.get("vehicleType")
        passengers = int(data.get("passengerCount", 1))
        distance = float(data.get("distance"))
        time = float(data.get("timeTaken"))
        is_electric = data.get("isElectric", "no")

        # Set passenger count to 0 for public transport
        public_transports = ["bus", "train", "metro", "actrain", "acbus"]
        if mode_of_transport in public_transports:
            passengers = 0

        # Handle "metro" mapping
        if mode_of_transport in ["metro", "train"]:
            mode_of_transport = "etrain"

        # Apply electric prefix, but exclude metro, actrain, and acbus
        if is_electric.lower() == "yes" and mode_of_transport not in ["actrain", "acbus","etrain"]:
            mode_of_transport = "e" + mode_of_transport


        # Call prediction function
        print(f"Mode of Transport: {mode_of_transport}, Passengers: {passengers}, Distance: {distance}, Time: {time}")
        
        predicted_co2 = predict_co2_emission(mode_of_transport, passengers, distance, time)
        
        # Apply reduction for non-electric vehicles
        if not mode_of_transport.startswith("e"):
            predicted_co2 *= 0.75

        # Print the predicted CO2 value
        print("Predicted CO2 Emission:", predicted_co2)

        # Return the predicted CO2 value in the response
        return jsonify({"message": "Prediction request processed successfully", "predicted_co2": predicted_co2}), 200

    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({"error": str(e)}), 400