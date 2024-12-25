import os
import pandas as pd

PROCESSED_DATA_DIR = "./data/processed/"

def preprocess_file(input_csv, output_csv):
    df = pd.read_csv(input_csv)

    # Replace "BDL" or missing values with 0
    df.replace("BDL", 0, inplace=True)
    df.fillna(0, inplace=True)

    # Drop unnecessary columns
    # Uncomment and adjust below if specific columns need to be dropped
    # df.drop(columns=['UnnecessaryColumn'], inplace=True)

    # Save cleaned data
    df.to_csv(output_csv, index=False)
    print(f"Preprocessed data saved to {output_csv}")

def preprocess_all_files():
    for file in os.listdir(PROCESSED_DATA_DIR):
        if file.endswith(".csv"):
            input_path = os.path.join(PROCESSED_DATA_DIR, file)
            preprocess_file(input_path, input_path)

if __name__ == "__main__":
    preprocess_all_files()
