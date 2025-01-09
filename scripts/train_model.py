import os
import pandas as pd
import joblib
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

PICKLE_DIR = "../data/pickle/"  # Directory containing the pickle files
MODEL_FILE = "../models/water_quality_model.pkl"  # Trained model file

# Update TARGET_COLUMNS to match your dataset
TARGET_COLUMNS = ["Total Dissolved Solids (mg/L)", "pH", "Use Based Class"]  # Adjust these to match actual column names

def sanitize_columns(df):
    """
    Clean column names by removing unwanted characters and spaces.
    """
    df.columns = df.columns.str.replace(r'\s+', ' ', regex=True)  # Replace multiple spaces with a single space
    df.columns = df.columns.str.replace(r'\r\n|\r|\n', '', regex=True)  # Remove line breaks
    df.columns = df.columns.str.replace(r'[^\w\s]', '', regex=True)  # Remove special characters
    return df

def combine_pickle_data():
    """
    Combine all pickle files into a single DataFrame.
    """
    combined_data = pd.DataFrame()

    for file in os.listdir(PICKLE_DIR):
        if file.endswith(".pkl"):
            file_path = os.path.join(PICKLE_DIR, file)
            df = pd.read_pickle(file_path)

            # Sanitize column names
            df = sanitize_columns(df)
            
            combined_data = pd.concat([combined_data, df], ignore_index=True)

    return combined_data

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

def train_model():
    # Combine all data from pickle files
    df = combine_pickle_data()

    # Preprocess data
    df = preprocess_data(df)

    # Debugging: Print the columns and sample data
    print("Columns in the data after sanitization:")
    print(df.columns.tolist())
    print("Sample data after preprocessing:")
    print(df.head())

    # Ensure target columns are present
    missing_columns = [col for col in TARGET_COLUMNS if col not in df.columns]
    if missing_columns:
        print(f"Error: Missing columns: {missing_columns}")
        return

    # Define features (X) and targets (y)
    X = df.drop(columns=TARGET_COLUMNS, errors="ignore")
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
