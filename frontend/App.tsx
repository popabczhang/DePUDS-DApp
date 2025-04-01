/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';
import VotingScreen from './src/screens/VotingScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Define the navigation types
type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Voting: { proposalId: string };
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Urban Development DApp' }}
        />
        <Stack.Screen 
          name="Projects" 
          component={ProjectsScreen} 
          options={{ title: 'Development Projects' }}
        />
        <Stack.Screen 
          name="ProjectDetail" 
          component={ProjectDetailScreen} 
          options={{ title: 'Project Details' }}
        />
        <Stack.Screen 
          name="Voting" 
          component={VotingScreen} 
          options={{ title: 'Vote on Proposal' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'My Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
