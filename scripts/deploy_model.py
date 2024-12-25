from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load model and scaler
model = joblib.load("./models/water_quality_model.pkl")
scaler = joblib.load("./models/scaler.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Expect JSON input
    df = pd.DataFrame(data)
    X = scaler.transform(df)  # Scale input data
    predictions = model.predict(X)
    return jsonify({"predictions": predictions.tolist()})

if __name__ == "__main__":
    app.run(debug=True)
