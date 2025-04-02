import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../components/index';
import globalStyles from '../assets/styles/global';
import { getAccounts } from '../services/web3';
import { fetchData } from '../services/api';
import { User, Vote } from '../types';

type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Voting: { proposalId: string };
  Profile: undefined;
};

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get connected account
        const accounts = await getAccounts();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          
          // Fetch user data
          const userData = await fetchData(`users/${accounts[0]}`);
          setUser(Array.isArray(userData) && userData.length > 0 ? userData[0] : null);
          
          // Fetch user votes
          const votesData = await fetchData(`votes/user/${accounts[0]}`);
          setVotes(votesData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await getAccounts();
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setLoading(true);
        
        try {
          // Fetch user data
          const userData = await fetchData(`users/${accounts[0]}`);
          setUser(Array.isArray(userData) && userData.length > 0 ? userData[0] : null);
          
          // Fetch user votes
          const votesData = await fetchData(`votes/user/${accounts[0]}`);
          setVotes(votesData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      Alert.alert('Error', 'Failed to connect wallet. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!account) {
    return (
      <View style={styles.notConnectedContainer}>
        <Text style={styles.notConnectedText}>
          Connect your wallet to view your profile
        </Text>
        <Button title="Connect Wallet" onPress={connectWallet} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.accountCard}>
            <Text style={styles.accountLabel}>Connected Account</Text>
            <Text style={styles.accountAddress}>{account}</Text>
          </View>
          
          {user && (
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Voting Power:</Text>
                <Text style={styles.infoValue}>{user.votingPower}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Proposals Voted:</Text>
                <Text style={styles.infoValue}>{user.votedProposals.length}</Text>
              </View>
            </View>
          )}
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Voting History</Text>
            
            {votes.length === 0 ? (
              <Text style={styles.noVotesText}>You haven't voted on any proposals yet</Text>
            ) : (
              votes.map((vote) => (
                <TouchableOpacity
                  key={vote.proposalId}
                  style={styles.voteCard}
                  onPress={() => navigation.navigate('Voting', { proposalId: vote.proposalId })}
                >
                  <Text style={styles.voteOption}>Voted: {vote.option}</Text>
                  <Text style={styles.voteTimestamp}>
                    {new Date(vote.timestamp).toLocaleString()}
                  </Text>
                  <Text style={styles.voteTxHash}>Tx: {vote.txHash.substring(0, 10)}...</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
          
          <Button
            title="Browse Projects"
            onPress={() => navigation.navigate('Projects')}
            style={styles.browseButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notConnectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notConnectedText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    padding: 16,
  },
  accountCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  accountAddress: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 130,
  },
  infoValue: {
    fontSize: 16,
  },
  section: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  noVotesText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    textAlign: 'center',
  },
  voteCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  voteOption: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  voteTimestamp: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  voteTxHash: {
    fontSize: 12,
    color: '#888',
  },
  browseButton: {
    backgroundColor: '#28a745',
  },
});

export default ProfileScreen;