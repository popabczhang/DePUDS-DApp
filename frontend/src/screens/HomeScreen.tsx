import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../components/index';
import globalStyles from '../assets/styles/global';
import { getAccounts } from '../services/web3';
import { fetchData } from '../services/api';
import { Project } from '../types';

type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Voting: { proposalId: string };
  Profile: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Try to get connected wallet
        const accounts = await getAccounts();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
        
        // Fetch featured project
        const projectsData = await fetchData('projects/featured');
        if (projectsData && projectsData.length > 0) {
          setFeaturedProject(projectsData[0]);
        }
      } catch (error) {
        console.error('Error initializing home screen:', error);
      } finally {
        setLoading(false);
      }
    };
    
    init();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Urban Development DApp</Text>
        <Text style={styles.subtitle}>Empowering communities through decentralized urban planning</Text>
        
        {account ? (
          <Text style={styles.connectedText}>Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</Text>
        ) : (
          <Button
            title="Connect Wallet"
            onPress={async () => {
              try {
                const accounts = await getAccounts();
                if (accounts && accounts.length > 0) {
                  setAccount(accounts[0]);
                }
              } catch (error) {
                console.error('Error connecting wallet:', error);
              }
            }}
          />
        )}
        
        <View style={styles.actionsContainer}>
          <Button
            title="Browse Projects"
            onPress={() => navigation.navigate('Projects')}
            style={styles.actionButton}
          />
          <Button
            title="My Profile"
            onPress={() => navigation.navigate('Profile')}
            style={styles.actionButton}
          />
        </View>
        
        {featuredProject && (
          <View style={styles.featuredContainer}>
            <Text style={styles.featuredTitle}>Featured Project</Text>
            <Image
              source={{ uri: featuredProject.image || 'https://via.placeholder.com/350x150' }}
              style={styles.featuredImage}
            />
            <Text style={styles.featuredProjectTitle}>{featuredProject.title}</Text>
            <Text style={styles.featuredProjectDescription}>{featuredProject.description}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('ProjectDetail', { projectId: featuredProject.id })}
              style={styles.viewButton}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  connectedText: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  actionButton: {
    width: '45%',
  },
  featuredContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 20,
    marginBottom: 30,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featuredImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,
    marginBottom: 15,
  },
  featuredProjectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featuredProjectDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
    marginBottom: 20,
  },
  viewButton: {
    backgroundColor: '#28a745',
  },
});

export default HomeScreen;