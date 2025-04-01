import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, VoteButton } from '../components/index';
import globalStyles from '../assets/styles/global';
import { fetchData, postData } from '../services/api';
import { getAccounts } from '../services/web3';
import { Proposal } from '../types';

type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Voting: { proposalId: string };
  Profile: undefined;
};

type VotingScreenProps = NativeStackScreenProps<RootStackParamList, 'Voting'>;

const VotingScreen = ({ route, navigation }: VotingScreenProps) => {
  const { proposalId } = route.params;
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Get connected account
        const accounts = await getAccounts();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
        
        // Fetch proposal data
        const proposalData = await fetchData(`proposals/${proposalId}`);
        setProposal(Array.isArray(proposalData) ? proposalData[0] : proposalData);
        
        // Check if user has already voted
        if (accounts && accounts.length > 0) {
          const userData = await fetchData(`users/${accounts[0]}`);
          const user = Array.isArray(userData) ? userData[0] : userData;
          setHasVoted(user?.votedProposals?.includes(proposalId) || false);
        }
      } catch (error) {
        console.error('Error initializing voting screen:', error);
      } finally {
        setLoading(false);
      }
    };
    
    init();
  }, [proposalId]);

  const handleVote = async () => {
    if (!selectedOption || !account) return;
    
    setSubmitting(true);
    try {
      await postData('votes', {
        proposalId,
        option: selectedOption,
        address: account
      });
      
      Alert.alert('Success', 'Your vote has been recorded!');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting vote:', error);
      Alert.alert('Error', 'Failed to submit your vote. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!proposal) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Proposal not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const isProposalActive = proposal.status === 'active';
  const isDeadlinePassed = new Date(proposal.deadline) < new Date();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{proposal.title}</Text>
        
        <View style={styles.statusContainer}>
          <Text 
            style={[
              styles.statusBadge, 
              proposal.status === 'active' ? styles.activeBadge : styles.closedBadge
            ]}
          >
            {proposal.status.toUpperCase()}
          </Text>
          {isDeadlinePassed && (
            <Text style={styles.deadlineText}>Voting period has ended</Text>
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{proposal.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voting Options</Text>
          
          {hasVoted ? (
            <View style={styles.alreadyVotedContainer}>
              <Text style={styles.alreadyVotedText}>You have already voted on this proposal</Text>
            </View>
          ) : !isProposalActive || isDeadlinePassed ? (
            <View style={styles.votingClosedContainer}>
              <Text style={styles.votingClosedText}>Voting is no longer available for this proposal</Text>
            </View>
          ) : (
            <>
              {proposal.options.map((option) => (
                <VoteButton
                  key={option}
                  option={option}
                  selected={selectedOption === option}
                  onPress={() => setSelectedOption(option)}
                />
              ))}
              
              <Button
                title="Submit Vote"
                onPress={handleVote}
                disabled={!selectedOption || submitting}
                style={styles.submitButton}
              />
            </>
          )}
        </View>
        
        {proposal.results && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Results</Text>
            
            {Object.entries(proposal.results).map(([option, count]) => (
              <View key={option} style={styles.resultRow}>
                <Text style={styles.resultOption}>{option}</Text>
                <Text style={styles.resultCount}>{count} votes</Text>
              </View>
            ))}
          </View>
        )}
        
        <View style={styles.deadlineContainer}>
          <Text style={styles.deadlineLabel}>Voting Deadline:</Text>
          <Text style={styles.deadlineValue}>
            {new Date(proposal.deadline).toLocaleString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    marginBottom: 20,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  activeBadge: {
    backgroundColor: '#c3e6cb',
    color: '#155724',
  },
  closedBadge: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  deadlineText: {
    fontSize: 12,
    color: '#dc3545',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  alreadyVotedContainer: {
    backgroundColor: '#e2e3e5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  alreadyVotedText: {
    fontSize: 16,
    color: '#383d41',
    fontWeight: '500',
  },
  votingClosedContainer: {
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  votingClosedText: {
    fontSize: 16,
    color: '#721c24',
    fontWeight: '500',
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#28a745',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  resultOption: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deadlineContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  deadlineLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deadlineValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default VotingScreen;