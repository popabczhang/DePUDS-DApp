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
import HomeScreen from './src/screens/HomeScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import VotingScreen from './src/screens/VotingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import WalletScreen from './src/screens/WalletScreen';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: {projectId: string};
  Voting: {proposalId: string};
  Profile: undefined;
  Login: undefined;
  Wallet: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator
          initialRouteName="Profile"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Prosocial Urban DApp'}}
          />
          <Stack.Screen
            name="Projects"
            component={ProjectsScreen}
            options={{title: 'Development Projects'}}
          />
          <Stack.Screen
            name="ProjectDetail"
            component={ProjectDetailScreen}
            options={{title: 'Project Details'}}
          />
          <Stack.Screen
            name="Voting"
            component={VotingScreen}
            options={{title: 'Vote on Proposal'}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: 'My Profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
