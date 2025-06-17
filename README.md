# SmartFood

## 1. Application Purpose
SmartFood is a mobile application that allows users to scan barcodes of food products, automatically store them in a product database, and generate culinary recipes based on the available ingredients. The main goal is to reduce food waste and simplify meal planning. With the built-in recommendation system, users can quickly generate recipe suggestions using ingredients they already have at home—saving both time and money.

## 2. System Architecture

The application follows a client-server architecture, with a clear division into frontend, backend, and integration layers.

### Frontend
- **Language:** TypeScript
- **Framework:** React Native
- **Environment:** Expo
- **Responsibilities:** 
  - User interface
  - Barcode scanning via device camera
  - Product list display
  - Recipe display based on recommendations
  - Authentication and navigation between views
- **Platforms supported:** Android and iOS

### Backend
- **Language:** Python
- **Framework:** FastAPI
- **Responsibilities:**
  - Logic for handling scanned products
  - Interfacing with OpenFoodFacts API to fetch product data
  - Communicating with a language model (LLM) to generate recipes
  - Serving data via RESTful API in JSON format

### Integration
- **Data exchange:** JSON over HTTP
- **Containerization:** Docker
- The frontend communicates with the backend via REST API endpoints.

## 3. Key Modules and Data Flow

### Modules
- **Login View:** User enters credentials and gains access to the app.
- **Barcode Scanner Module:** Activates the camera and reads the barcode of the product.
- **Product Module:** Displays the list of scanned products.
- **Recommendation Module:** Uses a language model to generate recipes based on available ingredients.

### Data Flow (Main Processing Pipeline)
1. The user launches the app.
2. The app prompts the user to scan a product.
3. The camera scans the barcode.
4. The system checks if the product data is available.
5. If data is valid, the user chooses whether to generate a recipe.
6. If not, the process ends.
7. If yes, a recipe is generated based on the scanned products.
8. The recipe is displayed to the user.

## 4. Functional Requirements
- **Barcode Scanning:** The user can scan barcodes of food products.
- **Product Information:** The application retrieves nutritional information from OpenFoodFacts.
- **Recipe Recommendations:** Recipes are suggested based on available products.

## 5. Non-functional Requirements
- Simple and intuitive user interface.
- Fast response time when generating a recipe.
- High system reliability and stability.
- The application interface is in Polish.

## 6. Technologies Used

### Frontend
- **Programming Language:** TypeScript
- **Framework:** React Native
- **Environment:** Expo

### Backend
- **Programming Language:** Python
- **Framework:** FastAPI
- **APIs:** OpenAI (for LLM-based recipe generation)

### Integration
- **Data Format:** JSON
- **Communication:** REST API
- **Containerization:** Docker

### Platforms
- Android
- iOS


## Installation

1.  Clone repository

    ```
    git clone https://github.com/Micz26/SmartFood.git
    ```

### Backend installation steps

2.  Go to backend/

    ```
    cd backend/
    ```

3.  Create new virtual environment:

    If you use _conda_

    ```
    conda create --name smart_food python=3.10
    ```

    Alternatively use any other virtual enviroment manager of your choice.

4.  Activate environment

    ```
    conda activate smart_food
    ```

5.  Make sure you use recent _pip_ version

    ```
    python -m pip install --upgrade pip
    ```

6.  Install packages

    ```
    python -m pip install -e .
    ```

## Development

### Backend development

Add needed dependencies (libraries) to dependencies in backend/pyproject.toml dependencies and run `python -m pip install -e .` again

1.  ```
    git checkout -b dev
    ```

2.  ```
    git fetch
    ```

3.  ```
    git pull origin dev
    ```

4.      ```
        git checkout -b your_feature_branch
        ```
    Now you can work on yor feeature branch, if you finish push changes to github and create pull request to base; `dev`

## App Running

### Run Backend

1.  ```
    cd backend
    ```

2.  ```
    python src/smart_food/serve.py
    ```

docker build -t smart-food-backend .
docker run -p 8000:8000 smart-food-backend
