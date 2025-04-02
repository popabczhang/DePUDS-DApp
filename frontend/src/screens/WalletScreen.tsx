import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';

const WalletScreen = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(false);
  const [walletOption, setWalletOption] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    setLoading(true);
    // Here you would integrate with wallet creation functionality
    // For demo purposes, we'll just simulate it
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Profile');
    }, 2000);
  };

  const handleConnectWallet = async () => {
    setLoading(true);
    // Here you would integrate with wallet connection functionality
    // For demo purposes, we'll just simulate it
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Profile');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/icons/logo_w.png')} 
          style={styles.logo}
          // Add a fallback for when the image doesn't exist yet
          onError={({nativeEvent: {error}}) => console.log(error)}
        />
        <Text style={styles.title}>Polygon Wallet</Text>
      </View>

      {!walletOption ? (
        <View style={styles.optionsContainer}>
          <Text style={styles.subtitle}>
            You'll need a Polygon wallet to continue
          </Text>
          
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => setWalletOption('create')}>
            <Text style={styles.buttonText}>Create New Wallet</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => setWalletOption('connect')}>
            <Text style={styles.buttonText}>Connect Existing Wallet</Text>
          </TouchableOpacity>
        </View>
      ) : walletOption === 'create' ? (
        <View style={styles.actionContainer}>
          <Text style={styles.subtitle}>
            Create a new Polygon wallet to store your Cambridge Tokens and interact with the platform
          </Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleCreateWallet}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Create Wallet</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setWalletOption(null)}>
            <Text style={styles.backButtonText}>Back to Options</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.actionContainer}>
          <Text style={styles.subtitle}>
            Connect your existing Polygon wallet to access the platform
          </Text>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleConnectWallet}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Connect Wallet</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setWalletOption(null)}>
            <Text style={styles.backButtonText}>Back to Options</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    // Add any additional styling like tint if it's a white logo on dark background
    // tintColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  optionsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  actionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#8e44ad',
    width: '90%',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#8e44ad',
    width: '90%',
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
});

export default WalletScreen;