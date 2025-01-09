import os
import pandas as pd

RAW_PROCESSED_DIR = "../data/processed/"  # Directory containing the monthly CSVs
PICKLE_DIR = "../data/pickle/"  # Directory to save pickle files

def sanitize_columns(df):
    """
    Clean column names by removing unwanted characters and spaces.
    """
    df.columns = df.columns.str.replace(r'\s+', ' ', regex=True)  # Replace multiple spaces with a single space
    df.columns = df.columns.str.replace(r'\r\n|\r|\n', '', regex=True)  # Remove line breaks
    df.columns = df.columns.str.replace(r'[^\w\s]', '', regex=True)  # Remove special characters
    return df

def convert_csv_to_pickle():
    """
    Converts each CSV file in RAW_PROCESSED_DIR into a separate .pkl file.
    """
    os.makedirs(PICKLE_DIR, exist_ok=True)  # Create the directory if it doesn't exist

    for file in os.listdir(RAW_PROCESSED_DIR):
        if file.endswith(".csv"):
            input_path = os.path.join(RAW_PROCESSED_DIR, file)
            output_path = os.path.join(PICKLE_DIR, file.replace(".csv", ".pkl"))

            # Read the CSV file
            df = pd.read_csv(input_path)

            # Sanitize column names
            df = sanitize_columns(df)

            # Save as a pickle file
            df.to_pickle(output_path)
            print(f"Converted {file} to {output_path}")

if __name__ == "__main__":
    convert_csv_to_pickle()
