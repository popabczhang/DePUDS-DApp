# DePUDS DApp Frontend

This is the React Native frontend for the DePUDS (Decentralized Prosocial Urban Development System) application.

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the `frontend` directory:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the `frontend` directory, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

From the `frontend/ios` directory, run the Ruby bundler to install CocoaPods itself (if needed):

```sh
# Navigate to ios directory
cd ios

# Install bundler gems
bundle install

# Install Pods
bundle exec pod install

# Navigate back to frontend directory
cd ..
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

Now, run the app from the `frontend` directory:
```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see the app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Project Structure Overview

- **`App.tsx`**: The main entry point defining the navigation stack using `@react-navigation/native-stack`.
- **`src/`**: Contains the core application code.
    - **`screens/`**: Contains all the main screens of the application (Login, Wallet, Verification, Profile, Voting, Map, etc.). Each screen represents a distinct view in the app.
    - **`components/`**: Reusable UI components used across different screens (e.g., `Button`, `Input`, specific login forms).
    - **`services/`**: Modules for interacting with external services.
        - `api.ts`: Handles HTTP requests to the backend API using `axios`. Includes mock data for development.
        - `web3.ts`: Provides mocked functions for interacting with a blockchain wallet (e.g., Polygon).
    - **`utils/`**: Utility functions and constants.
        - `helpers.ts`: General helper functions (e.g., date formatting).
        - `constants.ts`: Application-wide constants (e.g., API URLs - currently placeholder).
        - `encryption.ts`: Placeholder functions for data encryption/decryption (uses simple Base64 for demonstration).
    - **`types/`**: TypeScript type definitions and interfaces (e.g., `Project`, `User`, `Vote`).
    - **`assets/`**: Static assets like images, icons, and potentially global styles.
        - `icons/`: App icons.
        - `styles/`: Global style definitions (if any).
        - `map_placeholder.png`: Placeholder image for the map screen.
- **`app.json`**: Configuration for the React Native app (name, display name).

## Key Dependencies

- **`react-native`**: Core framework.
- **`@react-navigation/native` & `@react-navigation/native-stack`**: For handling navigation between screens.
- **`axios`**: For making HTTP requests to the backend API.
- **`@react-native-async-storage/async-storage`**: For persistent local storage.
- **`@react-native-picker/picker`**: Dropdown picker component used in the Profile screen.
- **`@react-native-community/slider`**: Slider component used in the Voting screen.
- **`react-native-safe-area-context`**: Handling safe areas on devices with notches/islands.

## Modifying the App

Open the project in your text editor of choice and make changes to the files (primarily within the `src` directory). When you save, your app running in the simulator/device will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page on the official React Native documentation.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
