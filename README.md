# DePUDS DApp (Decentralized Prosocial Urban Development System)

## Overview
The DePUDS DApp is a decentralized application designed to facilitate prosocial urban development initiatives, initially focused on Cambridge. It allows verified community members (residents and workers) to participate in decision-making processes related to urban planning and development through demographic data collection and a demand-based voting system, potentially integrated with blockchain technology.

## Project Structure
The project is divided into two main components: the frontend and the backend.

### Frontend (React Native Mobile App)
The frontend is built using **React Native** and **TypeScript**, providing a mobile application for users to interact with the DApp.

**Key Features & Structure:**

- **Screens (`src/screens/`)**:
    - `LoginScreen`: Handles user authentication (Email, Social, Wallet connect - currently mocked).
    - `WalletScreen`: Manages Polygon wallet connection/creation (mocked).
    - `CitizenshipVerificationScreen`: Offers options for verifying Cambridge residency/work status.
    - `GeoPatternVerificationScreen`: Implements (mocked) location-based verification over 15 days.
    - `LegalDocumentVerificationScreen`: Allows (mocked) document uploads for verification.
    - `TroubleshootingScreen`: Provides help for verification issues.
    - `ProfileScreen`: Collects encrypted demographic data from users.
    - `VotingScreen`: Allows users to distribute 100 votes across various urban program categories.
    - `MapScreen`: Displays a map (placeholder) and list view of potential projects/areas.
    - `ProjectsScreen` & `ProjectDetailScreen`: (Currently unused in main navigation) Intended for browsing and viewing specific development projects.
    - `HomeScreen`: (Currently unused in main navigation) Intended as the main landing page after login.
- **Components (`src/components/`)**: Reusable UI elements like Buttons, Inputs, Login forms, etc.
- **Services (`src/services/`)**:
    - `api.ts`: Handles communication with the backend API (uses Axios, includes mock data).
    - `web3.ts`: Provides mocked Web3 functions for wallet interactions.
- **Utilities (`src/utils/`)**: Helper functions (`helpers.ts`), constants (`constants.ts`), and basic encryption (`encryption.ts` - placeholder).
- **Types (`src/types/`)**: TypeScript interfaces for data structures (Project, Proposal, User, Vote).
- **Navigation (`App.tsx`)**: Uses `@react-navigation/native-stack` for screen transitions.
- **Configuration**: `app.json`, `babel.config.js`, `metro.config.js`.

### Backend
*(Assumed Structure - Based on initial README)*
The backend is likely developed using Python Flask, providing the necessary API endpoints and business logic. The structure includes:

- **app/**: Contains the main application code.
  - **routes/**: API endpoints for user authentication, profile management, voting, etc.
  - **models/**: Database models representing application data.
  - **services/**: Functions for potential blockchain interactions or complex logic.
  - **utils/**: Utility functions for backend operations.
- **config.py**: Configuration settings for the Flask application.
- **requirements.txt**: Lists Python dependencies required for the backend.
- **run.py**: Entry point for running the Flask application.

### Blockchain
*(Assumed - Based on initial README)*
The blockchain component might include smart contracts (e.g., Solidity) and migration scripts for managing voting, tokens (like the mentioned "Cambridge Token"), or other decentralized aspects.

## Setup Instructions

### Frontend Setup
1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```
3.  Install iOS Pods (if developing for iOS):
    ```sh
    cd ios && bundle install && bundle exec pod install && cd ..
    ```
4.  Start the Metro bundler:
    ```sh
    npm start
    # or
    yarn start
    ```
5.  Run the app on a simulator or device (in a separate terminal):
    ```sh
    # For Android
    npm run android
    # or
    yarn android

    # For iOS
    npm run ios
    # or
    yarn ios
    ```

### Backend Setup
1.  Navigate to the `backend` directory: `cd backend`
2.  Create a virtual environment and activate it:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4.  Run the Flask application:
    ```sh
    python run.py
    ```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.