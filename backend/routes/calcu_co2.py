from flask import Blueprint, jsonify, request
from flask_cors import CORS, cross_origin
import joblib
import jwt
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required
from models import Prediction,db
from datetime import datetime


co2_prediction = Blueprint('co2_prediction', __name__)
CORS(co2_prediction)


SECRET_KEY = "3b5ab708578bda03026bbaa00bfc67aa5d1b48b8a2ded39c302bd85796bedb96"

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
        data = request.get_json()

        # Validate required fields
        required_fields = ["vehicleType", "distance", "timeTaken", "date", "username", "source", "destination"]
        missing_fields = [field for field in required_fields if data.get(field) in [None, ""]]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 422

        # Extract and validate data
        source = data["source"]
        destination = data["destination"]
        mode_of_transport = data["vehicleType"]
        distance = float(data["distance"])
        time = float(data["timeTaken"])
        is_electric = data.get("isElectric", "no")
        passengers = int(data.get("passengerCount", 1))
        trip_date = data["date"]  # This is a string
        username = data["username"]

        # Convert the date string to a datetime object
        trip_date = datetime.fromisoformat(trip_date.replace("Z", "+00:00"))  # Adjust for UTC if necessary

        # Set passenger count to 0 for public transport
        public_transports = ["bus", "train", "metro", "actrain", "acbus"]
        if mode_of_transport in public_transports:
            passengers = 0

        # Handle "metro" mapping (for both "metro" and "train")
        if mode_of_transport in ["metro", "train"]:
            mode_of_transport = "etrain"

        # Apply electric prefix if needed, excluding metro, actrain, and acbus
        if is_electric.lower() == "yes" and mode_of_transport not in ["actrain", "acbus", "etrain"]:
            mode_of_transport = "e" + mode_of_transport

        # For electric vehicles, adjust passenger count multiplier
        if mode_of_transport.startswith("e"):
            passengers = passengers * 1.25

        # Log received input details
        print(f"Mode of Transport: {mode_of_transport}, Passengers: {passengers}, Distance: {distance}, Time: {time}")

        # Call prediction function (you need to define this function)
        predicted_co2 = predict_co2_emission(mode_of_transport, passengers, distance, time)

        # Apply reduction for non-electric vehicles and for car
        if not mode_of_transport.startswith("e"):
            predicted_co2 *= 0.75
        if mode_of_transport == "car":
            predicted_co2 *= 0.75

        # Log all details to the server console
        print("===== Prediction Details =====")
        print(f"Source: {source}")
        print(f"Destination: {destination}")
        print(f"Username: {username}")
        print(f"Date: {trip_date}")
        print(f"Mode of Transport: {mode_of_transport}")
        print(f"Distance: {distance} km, Time Taken: {time} mins")
        print(f"Passenger Count: {passengers}")
        print(f"Predicted CO2 Emission: {predicted_co2:.2f}g")

        # Create a new Prediction object
        new_prediction = Prediction(
            username=username,
            source=source,
            destination=destination,
            vehicle_type=mode_of_transport,
            passenger_count=passengers,
            is_electric=is_electric,
            date=trip_date,  # This is now a datetime object
            distance=distance,
            time_taken=time,
            predicted_co2=predicted_co2
        )

        # Add the new prediction to the session and commit
        db.session.add(new_prediction)
        db.session.commit()

        # Return success response
        return jsonify({"message": "Trip Logged Successfully"}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401
    except ValueError:
        return jsonify({"error": "Invalid numeric values for distance or time"}), 400
    except Exception as e:
        db.session.rollback()  # Rollback the session in case of error
        print("Error during prediction:", str(e))
        return jsonify({"error": str(e)}), 400
    


@co2_prediction.route('/api/daily_data', methods=['GET'])
@cross_origin()
def get_daily_data():
    username = request.args.get('username')

    if not username:
        return jsonify({"error": "Username is required"}), 400

    # Fetch predictions for the given username
    predictions = Prediction.query.filter_by(username=username).order_by(Prediction.date.desc()).all()

    # Return an empty array if no predictions are found
    if not predictions:
        return jsonify([]), 200

    predictions_data = [
        {
            "id": p.id,
            "username": p.username,
            "source": p.source,
            "destination": p.destination,
            "vehicle_type": p.vehicle_type,
            "passenger_count": p.passenger_count,
            "is_electric": p.is_electric,
            "date": p.date.isoformat(),
            "distance": p.distance,
            "time_taken": p.time_taken,
            "predicted_co2": p.predicted_co2
        }
        for p in predictions
    ]
    return jsonify(predictions_data), 200