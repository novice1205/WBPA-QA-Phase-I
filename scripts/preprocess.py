import os
import pandas as pd

RAW_PROCESSED_DIR = "../data/processed/"  # Directory containing the monthly CSVs
PICKLE_DIR = "../data/pickle/"  # Directory to save pickle files

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

            # Save as a pickle file
            df.to_pickle(output_path)
            print(f"Converted {file} to {output_path}")

if __name__ == "__main__":
    convert_csv_to_pickle()
