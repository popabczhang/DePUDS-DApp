/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import VotingScreen from './src/screens/VotingScreen';
import MapScreen from './src/screens/MapScreen';
import CitizenshipVerificationScreen from './src/screens/CitizenshipVerificationScreen';
import GeoPatternVerificationScreen from './src/screens/GeoPatternVerificationScreen';
import LegalDocumentVerificationScreen from './src/screens/LegalDocumentVerificationScreen';
import TroubleshootingScreen from './src/screens/TroubleshootingScreen';
// import HomeScreen from './src/screens/HomeScreen';
// import ProjectsScreen from './src/screens/ProjectsScreen';
// import ProjectDetailScreen from './src/screens/ProjectDetailScreen';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: {projectId: string};
  Voting: {proposalId: string};
  VotingScreen: undefined;
  Profile: undefined;
  Login: undefined;
  Wallet: undefined;
  Map: undefined;
  CitizenshipVerification: undefined;
  GeoPatternVerification: undefined;
  LegalDocumentVerification: undefined;
  Troubleshooting: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Wallet"
            component={WalletScreen}
            options={{title: 'Connect Wallet'}}
          />
          <Stack.Screen
            name="CitizenshipVerification"
            component={CitizenshipVerificationScreen}
            options={{title: 'Verify Citizenship'}}
          />
          <Stack.Screen
            name="GeoPatternVerification"
            component={GeoPatternVerificationScreen}
            options={{title: 'Geo Verification'}}
          />
          <Stack.Screen
            name="LegalDocumentVerification"
            component={LegalDocumentVerificationScreen}
            options={{title: 'Document Verification'}}
          />
          <Stack.Screen
            name="Troubleshooting"
            component={TroubleshootingScreen}
            options={{title: 'Help & Support'}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: 'Your Profile'}}
          />
          <Stack.Screen
            name="VotingScreen"
            component={VotingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
