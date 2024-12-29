import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

PICKLE_DIR = "../data/pickle/"  # Directory containing the pickle files
MODEL_FILE = "../models/water_quality_model.pkl"  # File to save the trained model

TARGET_COLUMNS = ["Total Dissolved Solids", "pH", "Use Based Class"]  # Adjust based on your dataset

def combine_pickle_data():
    """
    Combine all pickle files into a single DataFrame.
    """
    combined_data = pd.DataFrame()

    for file in os.listdir(PICKLE_DIR):
        if file.endswith(".pkl"):
            file_path = os.path.join(PICKLE_DIR, file)
            df = pd.read_pickle(file_path)
            combined_data = pd.concat([combined_data, df], ignore_index=True)

    return combined_data

def preprocess_data(df):
    """
    Preprocess the data by encoding categorical columns and ensuring numeric types.
    """
    # Encode categorical columns (e.g., 'Month', 'Use Based Class')
    if "Month" in df.columns:
        df["Month"] = df["Month"].astype("category").cat.codes
    if "Use Based Class" in df.columns:
        df["Use Based Class"] = df["Use Based Class"].astype("category").cat.codes

    # Ensure all other columns are numeric
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0)
    return df

def train_model():
    # Combine all data from pickle files
    df = combine_pickle_data()

    # Preprocess data
    df = preprocess_data(df)

    # Define features (X) and targets (y)
    X = df.drop(columns=TARGET_COLUMNS)
    y = df[TARGET_COLUMNS]

    # Split into train and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred, multioutput="raw_values")
    print(f"Model Mean Squared Errors: {mse}")

    # Save the model
    joblib.dump(model, MODEL_FILE)
    print(f"Model saved to {MODEL_FILE}")

if __name__ == "__main__":
    train_model()
