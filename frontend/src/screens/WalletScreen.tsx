import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Profile: undefined;
  Wallet: undefined;
  // Add other screens as needed
};

type WalletScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const WalletScreen = ({navigation}: WalletScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const createWallet = async () => {
    setLoading(true);
    try {
      // In a real app, we would create a wallet here
      setTimeout(() => {
        // Mock wallet creation
        const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
        setWalletAddress(mockAddress);
        setWalletConnected(true);

        // Save wallet address to storage in a real app
        console.log('Created new wallet:', mockAddress);

        Alert.alert(
          'Wallet Created',
          'Your new wallet has been created. Keep your seed phrase safe!',
        );
      }, 2000);
    } catch (error) {
      console.error('Error creating wallet:', error);
      Alert.alert('Error', 'Failed to create wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    try {
      // In a real app, we would connect to an existing wallet
      setTimeout(() => {
        // Mock wallet connection
        const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
        setWalletAddress(mockAddress);
        setWalletConnected(true);

        // Save wallet address to storage in a real app
        console.log('Connected to wallet:', mockAddress);

        Alert.alert(
          'Wallet Connected',
          'Your wallet has been connected successfully.',
        );
      }, 2000);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      Alert.alert('Error', 'Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const continueToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Polygon Wallet</Text>
          <Text style={styles.subtitle}>
            Connect or create a wallet to proceed
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        ) : walletConnected ? (
          <View style={styles.walletInfoContainer}>
            <Text style={styles.walletTitle}>Wallet Connected</Text>
            <Text style={styles.walletAddress}>{walletAddress}</Text>
            <Text style={styles.walletInfoText}>
              Your wallet is now connected to DePUDS. You can now proceed to
              your profile to provide demographic information.
            </Text>
            <TouchableOpacity style={styles.button} onPress={continueToProfile}>
              <Text style={styles.buttonText}>Continue to Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.optionsContainer}>
            <View style={styles.optionCard}>
              <Text style={styles.optionTitle}>Create New Wallet</Text>
              <Text style={styles.optionDescription}>
                Create a new Polygon wallet that will be used to interact with
                the DePUDS DApp and store your Cambridge Tokens.
              </Text>
              <TouchableOpacity style={styles.button} onPress={createWallet}>
                <Text style={styles.buttonText}>Create Wallet</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.seperator}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.optionCard}>
              <Text style={styles.optionTitle}>Connect Existing Wallet</Text>
              <Text style={styles.optionDescription}>
                Connect an existing Polygon wallet to access your account and
                Cambridge Tokens.
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.outlineButton]}
                onPress={connectWallet}>
                <Text style={styles.outlineButtonText}>Connect Wallet</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  optionsContainer: {
    flex: 1,
  },
  optionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  seperator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  outlineButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  walletInfoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  walletAddress: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  walletInfoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default WalletScreen;
