import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '../components/index';
import globalStyles from '../assets/styles/global';
import {getAccounts} from '../services/web3';
import {fetchData, saveProfileData} from '../services/api';
import {User, Vote} from '../types';
import {Picker} from '@react-native-picker/picker';
import {encryptData} from '../utils/encryption';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: {projectId: string};
  Voting: {proposalId: string};
  VotingScreen: undefined;
  Profile: undefined;
};

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    age: '',
    gender: '',
    race: '',
    occupation: '',
    income: '',
    schoolEnrollment: '',
    marriageStatus: '',
    numberOfChildren: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get connected account
        const accounts = await getAccounts();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);

          // Fetch user data
          const userData = await fetchData(`users/${accounts[0]}`);
          setUser(
            Array.isArray(userData) && userData.length > 0 ? userData[0] : null,
          );

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
          setUser(
            Array.isArray(userData) && userData.length > 0 ? userData[0] : null,
          );

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

  const updateProfile = (key: keyof typeof profile, value: string) => {
    if (!key || typeof value !== 'string') {
      console.warn(`Invalid key or value provided: key=${key}, value=${value}`);
      return;
    }
    setProfile(prevProfile => ({
      ...prevProfile,
      [key]: value.trim(), // Trim whitespace from the value
    }));
  };

  const validateForm = () => {
    // Simple validation
    for (const [key, value] of Object.entries(profile)) {
      if (!value) {
        Alert.alert('Missing Information', `Please provide your ${key}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Encrypt sensitive data before sending
      const encryptedData = encryptData(profile);

      // Mock API call
      await saveProfileData(encryptedData);

      // Show success message and navigate to the next page
      console.log('Profile saved successfully (mocked).');
      navigation.navigate('VotingScreen');
    } catch (error) {
      // Log the error but still proceed
      console.warn(
        'API Error saving profile (mocked):',
        error instanceof Error ? error.message : error,
      );

      // Proceed to the next page even if the API call fails
      console.log('Proceeding to VotingScreen despite API error.');
      navigation.navigate('VotingScreen');
    } finally {
      setLoading(false);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.title}>Your Profile</Text>

          <View style={styles.securityNote}>
            <Text style={styles.securityNoteText}>
              Your data is encrypted and securely stored. We value your privacy.
            </Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              keyboardType="number-pad"
              value={profile.age}
              onChangeText={value => updateProfile('age', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.gender}
                onValueChange={value => updateProfile('gender', value)}>
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Non-binary" value="nonbinary" />
                <Picker.Item label="Prefer not to say" value="undefined" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Race/Ethnicity</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.race}
                onValueChange={value => updateProfile('race', value)}>
                <Picker.Item label="Select Race/Ethnicity" value="" />
                <Picker.Item label="Asian" value="asian" />
                <Picker.Item label="Black/African American" value="black" />
                <Picker.Item label="Hispanic/Latino" value="hispanic" />
                <Picker.Item label="Native American" value="native" />
                <Picker.Item label="White" value="white" />
                <Picker.Item label="Multiple Races" value="multiple" />
                <Picker.Item label="Prefer not to say" value="undefined" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Occupation</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your occupation"
              value={profile.occupation}
              onChangeText={value => updateProfile('occupation', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Annual Income</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.income}
                onValueChange={value => updateProfile('income', value)}>
                <Picker.Item label="Select Income Range" value="" />
                <Picker.Item label="Less than $25,000" value="<25k" />
                <Picker.Item label="$25,000 - $49,999" value="25k-50k" />
                <Picker.Item label="$50,000 - $74,999" value="50k-75k" />
                <Picker.Item label="$75,000 - $99,999" value="75k-100k" />
                <Picker.Item label="$100,000 - $149,999" value="100k-150k" />
                <Picker.Item label="$150,000 or more" value=">150k" />
                <Picker.Item label="Prefer not to say" value="undefined" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>School Enrollment</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.schoolEnrollment}
                onValueChange={value =>
                  updateProfile('schoolEnrollment', value)
                }>
                <Picker.Item label="Select Enrollment Status" value="" />
                <Picker.Item label="Not in school" value="none" />
                <Picker.Item label="K-12" value="k12" />
                <Picker.Item label="Undergraduate" value="undergrad" />
                <Picker.Item label="Graduate" value="grad" />
                <Picker.Item label="Professional" value="professional" />
                <Picker.Item label="Vocational" value="vocational" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Marriage Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={profile.marriageStatus}
                onValueChange={value => updateProfile('marriageStatus', value)}>
                <Picker.Item label="Select Marriage Status" value="" />
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Married" value="married" />
                <Picker.Item label="Divorced" value="divorced" />
                <Picker.Item label="Widowed" value="widowed" />
                <Picker.Item label="Separated" value="separated" />
                <Picker.Item label="Prefer not to say" value="undefined" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Number of Children</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter number of children"
              keyboardType="number-pad"
              value={profile.numberOfChildren}
              onChangeText={value => updateProfile('numberOfChildren', value)}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Saving...' : 'Submit and Continue'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  securityNote: {
    backgroundColor: '#e7f3ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  securityNoteText: {
    color: '#0c5460',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
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
