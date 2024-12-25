import os
import pandas as pd
import pdfplumber

# Define directories
RAW_DATA_DIR = "./data/raw/"
PROCESSED_DATA_FILE = "./data/processed/water_quality_combined.csv"

def extract_month_from_filename(filename):
    """
    Extracts the month from the file name.
    Assumes the file name starts with the month name (e.g., "January.pdf").
    """
    return filename.split('.')[0]  # Take the part before the file extension

def extract_table_from_pdf(pdf_path):
    """
    Extracts tabular data from a PDF file using pdfplumber.
    """
    extracted_data = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            table = page.extract_table()
            if table:
                extracted_data.extend(table)
    # Convert to a DataFrame and set the first row as the header
    if extracted_data:
        df = pd.DataFrame(extracted_data[1:], columns=extracted_data[0])
        return df
    else:
        print(f"No table found in {pdf_path}")
        return pd.DataFrame()  # Return an empty DataFrame if no table is found

def extract_and_combine():
    """
    Combines data from multiple monthly PDF and CSV files into a single dataset.
    """
    combined_data = pd.DataFrame()

    for file in os.listdir(RAW_DATA_DIR):
        if file.endswith(".pdf"):
            # Extract the month from the file name
            month = extract_month_from_filename(file)
            
            # Extract table data from the PDF
            pdf_path = os.path.join(RAW_DATA_DIR, file)
            df = extract_table_from_pdf(pdf_path)
            
            if not df.empty:
                # Add a "Month" column to the DataFrame
                df["Month"] = month
                
                # Append to the combined dataset
                combined_data = pd.concat([combined_data, df], ignore_index=True)

        elif file.endswith(".csv"):
            # Load the CSV file
            csv_path = os.path.join(RAW_DATA_DIR, file)
            df = pd.read_csv(csv_path)
            
            # Extract the month from the file name
            month = extract_month_from_filename(file)
            
            # Add a "Month" column to the DataFrame
            df["Month"] = month
            
            # Append to the combined dataset
            combined_data = pd.concat([combined_data, df], ignore_index=True)

    # Save the combined dataset
    os.makedirs(os.path.dirname(PROCESSED_DATA_FILE), exist_ok=True)
    combined_data.to_csv(PROCESSED_DATA_FILE, index=False)
    print(f"Data combined and saved to {PROCESSED_DATA_FILE}")

# Run the script
if __name__ == "__main__":
    extract_and_combine()