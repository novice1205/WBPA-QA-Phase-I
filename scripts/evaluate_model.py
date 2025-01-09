import os
import pandas as pd
import joblib
from sklearn.metrics import mean_squared_error

PICKLE_DIR = "../data/pickle/"  # Directory containing the pickle files
MODEL_FILE = "../models/water_quality_model.pkl"  # Trained model file

# Update TARGET_COLUMNS to match your dataset
TARGET_COLUMNS = ["Total Dissolved Solids (mg/L)", "pH", "Use Based Class"]  # Adjust these to match actual column names

def sanitize_columns(df):
    """
    Clean column names by removing unwanted characters and spaces.
    """
    df.columns = df.columns.str.replace(r'\s+', ' ', regex=True)  # Replace extra spaces with a single space
    df.columns = df.columns.str.replace(r'\r\n|\r|\n', '', regex=True)  # Remove line breaks
    df.columns = df.columns.str.replace(r'[^\w\s]', '', regex=True)  # Remove special characters
    return df

def preprocess_data(df):
    """
    Preprocess the data by encoding categorical columns and ensuring numeric types.
    """
    # Encode categorical columns
    if "Month" in df.columns:
        df["Month"] = df["Month"].astype("category").cat.codes  # Encode months as integers
    if "Use Based Class" in df.columns:
        df["Use Based Class"] = df["Use Based Class"].astype("category").cat.codes  # Encode classes as integers

    # Ensure all remaining columns are numeric
    df = df.apply(pd.to_numeric, errors="coerce").fillna(0)
    return df

def evaluate_all_files():
    """
    Loop through all .pkl files and evaluate the trained model on each file.
    """
    # Load the trained model
    model = joblib.load(MODEL_FILE)

    for file in os.listdir(PICKLE_DIR):
        if file.endswith(".pkl"):
            file_path = os.path.join(PICKLE_DIR, file)

            # Load and preprocess the data
            df = pd.read_pickle(file_path)
            df = sanitize_columns(df)  # Sanitize column names
            df = preprocess_data(df)  # Preprocess the data

            # Debugging: Print column names and a sample of the data
            print(f"Columns in {file}: {df.columns.tolist()}")
            print(f"Sample data for {file} after preprocessing:")
            print(df.head())

            # Check if target columns exist
            missing_columns = [col for col in TARGET_COLUMNS if col not in df.columns]
            if missing_columns:
                print(f"Skipping {file} due to missing columns: {missing_columns}")
                continue

            # Define features (X) and targets (y)
            X = df.drop(columns=TARGET_COLUMNS, errors="ignore")
            y = df[TARGET_COLUMNS]

            # Predict and evaluate
            y_pred = model.predict(X)
            mse = mean_squared_error(y, y_pred, multioutput="raw_values")
            print(f"Evaluation Mean Squared Errors for {file}: {mse}")

if __name__ == "__main__":
    evaluate_all_files()
