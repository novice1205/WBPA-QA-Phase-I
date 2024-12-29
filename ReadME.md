# WBPA-QA: Water Body Properties Analyzer for Quality Assessment

WBPA-QA is a comprehensive tool designed to assess water quality in Bengaluru's lakes. It leverages historical data, machine learning, and user-friendly web and mobile interfaces to predict water quality and provide actionable recommendations for health and environmental improvements.

## Features

- **Data Extraction**: Extracts structured data from `.docx` files for each month.
- **Preprocessing**: Cleans and normalizes data for analysis.
- **Model Training**: Trains a machine learning model to predict key water quality parameters.
- **Deployment**: Deploys the trained model using Flask for API integration.
- **User Applications**:
  - **Authorities**: Insights into water quality trends for policy-making.
  - **General Public**: Access predictions and health recommendations via web and mobile apps.


## Folder Structure

```plaintext
.
├── data/
│   ├── raw/                   # Raw data files (.docx)
│   ├── processed/             # Processed CSV files
│   ├── preprocessed/          # Preprocessed CSV files
│   ├── pickle/                # Pickle files for each month
├── models/                    # Trained models and scalers
├── scripts/                   # Scripts for each pipeline stage
│   ├── extract_data.py        # Extracts data from .docx files
│   ├── preprocess.py          # Preprocesses data
│   ├── train_model.py         # Trains the machine learning model
│   ├── eval_model.py          # Evaluates the model
│   ├── deploy_model.py        # Deploys the model with Flask
├── frontend/                  # Vite + React.js for web application
├── backend/                   # Express.js for backend API
└── README.md                  # Project documentation
```

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js (for frontend/backend setup)
- Flask, Express.js
- Libraries listed in `requirements.txt` (Python) and `package.json` (Node.js)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/WBPA-QA.git
   cd WBPA-QA
   ```

2. **Set up Python environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up Node.js environment** (frontend/backend):
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

## Usage

### 1. Data Pipeline

- **Extract data**:
  ```bash
  python scripts/extract_data.py
  ```
- **Preprocess data**:
  ```bash
  python scripts/preprocess.py
  ```
- **Train the model**:
  ```bash
  python scripts/train_model.py
  ```
- **Evaluate the model**:
  ```bash
  python scripts/eval_model.py
  ```

### 2. Deploy the Model

- **Run Flask API**:
  ```bash
  python scripts/deploy_model.py
  ```

- **Access API**:
  - Endpoint: `http://localhost:5000/predict`
  - Method: `POST`
  - Example payload:
    ```json
    {
      "STN Code": "123",
      "Month": "April",
      "pH": 7.5,
      "TDS": 450
    }
    ```

### 3. Run Web Application

- **Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```
- **Backend**:
  ```bash
  cd backend
  npm start
  ```

## Example Data

The dataset includes:
- Parameters: `pH`, `TDS`, `Use Based Class`, and more.
- Data for each month in `.docx` files.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.


## Acknowledgments

- [Scikit-learn](https://scikit-learn.org/)
- [React.js](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [Express.js](https://expressjs.com/)


### How to Use
1. Save this code as `README.md` in the root directory of your project.
2. Push it to GitHub:
   ```bash
   git add README.md
   git commit -m "Add README file"
   git push origin main
   ```