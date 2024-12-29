import os
import pandas as pd
from docx import Document

RAW_DATA_DIR = "../data/raw/"
PROCESSED_DATA_DIR = "../data/processed/"

def ensure_unique_columns(columns):
    """
    Ensures column names are unique by appending a counter to duplicates.
    """
    seen = {}
    unique_columns = []
    for col in columns:
        if col in seen:
            seen[col] += 1
            unique_columns.append(f"{col}_{seen[col]}")
        else:
            seen[col] = 0
            unique_columns.append(col)
    return unique_columns

def extract_table_from_docx(docx_path, month):
    """
    Extracts tabular data from a Word document and adds the 'Month' column.
    """
    document = Document(docx_path)
    data = []

    for table in document.tables:
        for row in table.rows:
            data.append([cell.text.strip() for cell in row.cells])

    if len(data) > 1:  # Ensure there's at least one header row and some data
        df = pd.DataFrame(data[1:], columns=data[0])  # First row as header

        # Ensure unique column names
        df.columns = ensure_unique_columns(df.columns)

        # Add the "Month" column
        df["Month"] = month
        return df
    else:
        print(f"No valid data found in file: {docx_path}")
        return pd.DataFrame()  # Return an empty DataFrame if no valid table

def process_and_save_individual_csv():
    """
    Processes each Word document and saves its data to a separate CSV file.
    """
    os.makedirs(PROCESSED_DATA_DIR, exist_ok=True)

    for file in os.listdir(RAW_DATA_DIR):
        if file.endswith(".docx"):
            month = file.split(".")[0]  # Extract month from filename
            docx_path = os.path.join(RAW_DATA_DIR, file)
            print(f"Processing file: {file}")

            # Extract data
            df = extract_table_from_docx(docx_path, month)

            if not df.empty:
                # Save to a separate CSV file
                output_csv_path = os.path.join(PROCESSED_DATA_DIR, f"{month}.csv")
                df.to_csv(output_csv_path, index=False)
                print(f"Data for {file} saved to {output_csv_path}")
            else:
                print(f"Skipping empty file: {file}")

if __name__ == "__main__":
    process_and_save_individual_csv()
