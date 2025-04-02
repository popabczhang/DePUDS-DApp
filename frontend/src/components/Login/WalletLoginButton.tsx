import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Props = {
  onBack: () => void;
  onLoginSuccess: () => void;
};

const WalletLoginButton = ({onBack, onLoginSuccess}: Props) => {
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    setLoading(true);
    // Here you would integrate with a wallet connection library
    // For polygon network (e.g., using WalletConnect or Web3Modal)
    console.log('Connecting to Polygon wallet...');
    
    // For demo purposes, we'll just simulate it
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Wallet</Text>
      <Text style={styles.subtitle}>
        Connect your Polygon wallet to sign in securely
      </Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={connectWallet}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Connect Polygon Wallet</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}>
        <Text style={styles.backButtonText}>Back to Login Options</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
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

export default WalletLoginButton;