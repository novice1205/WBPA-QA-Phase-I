import os
import pandas as pd
import joblib
from sklearn.metrics import accuracy_score, classification_report

MODEL_DIR = "./models/"
PROCESSED_DATA_DIR = "./data/processed/"
TARGET_COLUMN = "WaterQualityClass"  # Replace with your target column

def evaluate_model():
    # Load model and scaler
    model = joblib.load(os.path.join(MODEL_DIR, "water_quality_model.pkl"))
    scaler = joblib.load(os.path.join(MODEL_DIR, "scaler.pkl"))

    # Load and preprocess test data
    test_file = "test_dataset.csv"  # Replace with your test dataset
    test_data = pd.read_csv(os.path.join(PROCESSED_DATA_DIR, test_file))
    X_test = test_data.drop(columns=[TARGET_COLUMN])
    X_test = scaler.transform(X_test)
    y_test = test_data[TARGET_COLUMN]

    # Evaluate
    y_pred = model.predict(X_test)
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
    print("Classification Report:\n", classification_report(y_test, y_pred))

if __name__ == "__main__":
    evaluate_model()
