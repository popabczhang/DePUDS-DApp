import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import EmailLoginForm from '../components/Login/EmailLoginForm';
import SocialLoginButtons from '../components/Login/SocialLoginButtons';
import WalletLoginButton from '../components/Login/WalletLoginButton';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [loginMethod, setLoginMethod] = useState<string | null>(null);

  const handleLoginSuccess = (hasWallet: boolean) => {
    if (hasWallet) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Wallet');
    }
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
        <Text style={styles.title}>Cambridge Urban DApp</Text>
      </View>
      
      {!loginMethod ? (
        <View style={styles.methodSelector}>
          <Text style={styles.subtitle}>Choose a login method</Text>
          <TouchableOpacity 
            style={styles.methodButton}
            onPress={() => setLoginMethod('email')}>
            <Text style={styles.buttonText}>Email / Phone</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.methodButton}
            onPress={() => setLoginMethod('social')}>
            <Text style={styles.buttonText}>Google / Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.methodButton}
            onPress={() => setLoginMethod('wallet')}>
            <Text style={styles.buttonText}>Polygon Wallet</Text>
          </TouchableOpacity>
        </View>
      ) : loginMethod === 'email' ? (
        <EmailLoginForm 
          onBack={() => setLoginMethod(null)}
          onLoginSuccess={() => handleLoginSuccess(false)}
        />
      ) : loginMethod === 'social' ? (
        <SocialLoginButtons 
          onBack={() => setLoginMethod(null)}
          onLoginSuccess={() => handleLoginSuccess(false)}
        />
      ) : (
        <WalletLoginButton 
          onBack={() => setLoginMethod(null)}
          onLoginSuccess={() => handleLoginSuccess(true)}
        />
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
    width: 250,
    height: 250,
    marginBottom: 28,
    // Add any additional styling like tint if it's a white logo on dark background
    // tintColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 24,
    textAlign: 'center',
  },
  methodSelector: {
    padding: 20,
    alignItems: 'center',
  },
  methodButton: {
    backgroundColor: '#3498db',
    width: '80%',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;