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

const SocialLoginButtons = ({onBack, onLoginSuccess}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    // Here you would integrate with Google or Apple authentication
    // For demo purposes, we'll just simulate it
    console.log(`Logging in with ${provider}`);
    
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Login</Text>
      
      <TouchableOpacity 
        style={[styles.button, styles.googleButton]}
        onPress={() => handleSocialLogin('google')}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Continue with Google</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.appleButton]}
        onPress={() => handleSocialLogin('apple')}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Continue with Apple</Text>
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
    marginBottom: 30,
    color: '#2c3e50',
  },
  button: {
    width: '90%',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  backButton: {
    padding: 10,
    marginTop: 20,
  },
  backButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
});

export default SocialLoginButtons;