import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp} from '@react-navigation/native';

type RootStackParamList = {
  Voting: undefined;
  Map: undefined;
  // Add other screens as needed
};

type VotingScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const VotingScreen = ({navigation}: VotingScreenProps) => {
  const [remainingVotes, setRemainingVotes] = useState(100);
  const [votes, setVotes] = useState({
    'Affordable Housing': 0,
    'Mid-Career Housing': 0,
    'Executive Housing': 0,
    'Senior Housing': 0,
    'Coworking Office': 0,
    'Headquarter Office': 0,
    Pharmacy: 0,
    'Healthcare Center': 0,
    'Grocery/Market': 0,
    'Retail Store': 0,
    Restaurant: 0,
    'Daycare Center': 0,
    'Career Training': 0,
    'Recreation & Fitness': 0,
    'Library/Cultural/Arts': 0,
    'Green Space': 0,
  });

  useEffect(() => {
    const total = Object.values(votes).reduce(
      (sum, current) => sum + current,
      0,
    );
    setRemainingVotes(100 - total);
  }, [votes]);

  const handleVoteChange = (
    category: keyof typeof votes,
    value: string | number,
  ) => {
    // Convert string to number
    const newValue = typeof value === 'string' ? parseInt(value) || 0 : value;

    // Calculate the difference
    const currentValue = votes[category] || 0;
    const difference = newValue - currentValue;

    // Check if we have enough remaining votes
    if (remainingVotes - difference < 0) {
      Alert.alert('Vote Limit Reached', 'You have used all your 100 votes.');
      return;
    }

    // Update votes
    setVotes({
      ...votes,
      [category]: newValue,
    });
  };

  const handleResetVotes = () => {
    setVotes(
      Object.keys(votes).reduce(
        (acc, key) => {
          acc[key as keyof typeof votes] = 0;
          return acc;
        },
        {...votes},
      ),
    );
    setRemainingVotes(100);
  };

  const handleSubmit = () => {
    const total = Object.values(votes).reduce(
      (sum, current) => sum + current,
      0,
    );

    if (total !== 100) {
      Alert.alert(
        'Incomplete Distribution',
        `You have used ${total}/100 votes. Please distribute all 100 votes.`,
      );
      return;
    }

    // Save vote data (mock for now)
    console.log('Submitting votes:', votes);

    // Navigate to map
    navigation.navigate('Map');
  };

  const sortedCategories = Object.keys(votes).sort() as Array<
    keyof typeof votes
  >;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Demand Voting</Text>
          <Text style={styles.subtitle}>
            Distribute 100 votes among urban programs based on what you think is
            most important for your community.
          </Text>
        </View>

        <View style={styles.votesRemainingContainer}>
          <Text style={styles.votesRemainingText}>
            Remaining Votes:{' '}
            <Text
              style={[
                styles.votesCount,
                {color: remainingVotes === 0 ? '#4CAF50' : '#2196F3'},
              ]}>
              {remainingVotes}
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetVotes}>
            <Text style={styles.resetButtonText}>Reset Votes</Text>
          </TouchableOpacity>
        </View>

        {sortedCategories.map(category => (
          <View key={category} style={styles.voteItem}>
            <View style={styles.categoryRow}>
              <Text style={styles.categoryText}>{category}</Text>
              <TextInput
                style={styles.voteInput}
                keyboardType="number-pad"
                value={votes[category].toString()}
                onChangeText={value => handleVoteChange(category, value)}
                maxLength={3}
              />
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={votes[category]}
              onValueChange={value => handleVoteChange(category, value)}
              minimumTrackTintColor="#2196F3"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#2196F3"
            />
          </View>
        ))}

        <TouchableOpacity
          style={[
            styles.submitButton,
            remainingVotes !== 0 && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={remainingVotes !== 0}>
          <Text style={styles.submitButtonText}>
            {remainingVotes === 0
              ? 'Submit Votes'
              : `Distribute ${remainingVotes} more votes`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  votesRemainingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  votesRemainingText: {
    fontSize: 16,
    color: '#333',
  },
  votesCount: {
    fontWeight: 'bold',
    // Removed dynamic color here - it's now applied inline in the JSX
  },
  resetButton: {
    padding: 8,
  },
  resetButtonText: {
    color: '#F44336',
    fontWeight: '500',
  },
  voteItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  voteInput: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 4,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VotingScreen;
