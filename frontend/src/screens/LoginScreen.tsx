import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Wallet: undefined;
  Profile: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [loginMethod, setLoginMethod] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // In a real app, we would send a verification code to the email
    console.log('Sending verification code to:', email);
    setCodeSent(true);
    Alert.alert('Code Sent', `Verification code sent to ${email}`);
  };

  const handleEmailLogin = () => {
    if (!verificationCode) {
      Alert.alert('Missing Code', 'Please enter your verification code');
      return;
    }

    // In a real app, we would verify the code
    console.log('Verifying code:', verificationCode);
    navigation.navigate('Wallet');
  };

  type SocialLoginProvider = 'Google' | 'Apple';

  const handleSocialLogin = (provider: SocialLoginProvider): void => {
    console.log(`Logging in with ${provider}`);
    // In a real app, we would authenticate with the provider
    navigation.navigate('Wallet');
  };

  const handleWalletLogin = () => {
    console.log('Logging in with wallet');
    // Navigate directly to profile since wallet is already connected
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../assets/icons/logo_g_crop.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome to DePUDS</Text>
          <Text style={styles.subtitle}>Pro-social Urban Development</Text>

          {!loginMethod ? (
            <View style={styles.methodContainer}>
              <TouchableOpacity
                style={styles.methodButton}
                onPress={() => setLoginMethod('email')}>
                <Text style={styles.methodText}>Login with Email</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.methodButton}
                onPress={() => handleSocialLogin('Google')}>
                <Text style={styles.methodText}>Login with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.methodButton}
                onPress={() => handleSocialLogin('Apple')}>
                <Text style={styles.methodText}>Login with Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.methodButton}
                onPress={handleWalletLogin}>
                <Text style={styles.methodText}>Connect Polygon Wallet</Text>
              </TouchableOpacity>
            </View>
          ) : loginMethod === 'email' ? (
            <View style={styles.emailContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {codeSent ? (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChangeText={setVerificationCode}
                    keyboardType="number-pad"
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleEmailLogin}>
                    <Text style={styles.buttonText}>Verify & Login</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSendCode}>
                  <Text style={styles.buttonText}>Send Verification Code</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  setLoginMethod('');
                  setCodeSent(false);
                }}>
                <Text style={styles.backButtonText}>Back to Login Options</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#666',
  },
  methodContainer: {
    width: '100%',
  },
  methodButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  methodText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emailContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
});

export default LoginScreen;
