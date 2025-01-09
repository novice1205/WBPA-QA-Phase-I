from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load model
MODEL_FILE = "../models/water_quality_model.pkl"
model = joblib.load(MODEL_FILE)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        data = request.json
        if not isinstance(data, list):  # Ensure data is in list format
            data = [data]
        df = pd.DataFrame(data)

        # Predict using the loaded model
        predictions = model.predict(df)

        # Return predictions as JSON
        return jsonify({"predictions": predictions.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
