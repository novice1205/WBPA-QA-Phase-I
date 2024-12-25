import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import accuracy_score, classification_report
import joblib

PROCESSED_DATA_DIR = "./data/processed/"
MODEL_DIR = "./models/"
TARGET_COLUMN = "WaterQualityClass"  # Replace with your target column

def combine_datasets():
    combined_data = pd.DataFrame()
    for file in os.listdir(PROCESSED_DATA_DIR):
        if file.endswith(".csv"):
            df = pd.read_csv(os.path.join(PROCESSED_DATA_DIR, file))
            combined_data = pd.concat([combined_data, df], ignore_index=True)
    return combined_data

def train_model():
    os.makedirs(MODEL_DIR, exist_ok=True)

    # Combine datasets
    data = combine_datasets()

    # Preprocess
    scaler = MinMaxScaler()
    X = data.drop(columns=[TARGET_COLUMN])
    X = scaler.fit_transform(X)
    y = data[TARGET_COLUMN]

    # Save scaler
    joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate model
    y_pred = model.predict(X_test)
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
    print("Classification Report:\n", classification_report(y_test, y_pred))

    # Save model
    joblib.dump(model, os.path.join(MODEL_DIR, "water_quality_model.pkl"))
    print("Model saved to models/water_quality_model.pkl")

if __name__ == "__main__":
    train_model()
