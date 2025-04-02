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
// import HomeScreen from './src/screens/HomeScreen';
// import ProjectsScreen from './src/screens/ProjectsScreen';
// import ProjectDetailScreen from './src/screens/ProjectDetailScreen';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: {projectId: string};
  Voting: {proposalId: string};
  Profile: undefined;
  Login: undefined;
  Wallet: undefined;
  Map: undefined;
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
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Voting"
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
