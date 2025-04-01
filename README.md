# Urban Development DApp

## Overview
The Urban Development DApp is a decentralized application designed to facilitate prosocial urban development initiatives. It allows users to participate in decision-making processes related to urban planning and development through a blockchain-based voting system.

## Project Structure
The project is divided into two main components: the frontend and the backend.

### Frontend
The frontend is built using React Native, providing a mobile application for users to interact with the DApp. The structure includes:

- **src/**: Contains the main source code for the application.
  - **components/**: Reusable UI components.
  - **screens/**: Different screens of the application.
  - **navigation/**: Navigation setup for the app.
  - **services/**: API and blockchain interaction services.
  - **utils/**: Utility functions.
  - **assets/**: Global styles and assets.
- **package.json**: Lists dependencies and scripts for the frontend.
- **metro.config.js**: Configuration for the Metro bundler.
- **babel.config.js**: Babel configuration for JavaScript transpilation.
- **app.json**: Configuration settings for the React Native application.

### Backend
The backend is developed using Python Flask, providing the necessary API endpoints and business logic. The structure includes:

- **app/**: Contains the main application code.
  - **routes/**: API endpoints for user authentication and interactions.
  - **models/**: Database models representing application data.
  - **services/**: Functions for blockchain interactions.
  - **utils/**: Utility functions for backend operations.
- **config.py**: Configuration settings for the Flask application.
- **requirements.txt**: Lists Python dependencies required for the backend.
- **run.py**: Entry point for running the Flask application.

### Blockchain
The blockchain component includes smart contracts and migration scripts for managing urban development voting and incentives.

## Setup Instructions

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies using:
   ```
   npm install
   ```
3. Start the application with:
   ```
   npm start
   ```

### Backend Setup
1. Navigate to the `backend` directory.
2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies using:
   ```
   pip install -r requirements.txt
   ```
4. Run the Flask application with:
   ```
   python run.py
   ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.