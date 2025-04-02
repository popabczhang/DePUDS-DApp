import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type Props = {
  onBack: () => void;
  onLoginSuccess: () => void;
};

const EmailLoginForm = ({onBack, onLoginSuccess}: Props) => {
  const [isEmail, setIsEmail] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!emailOrPhone) return;
    
    setLoading(true);
    // Here you would integrate with your backend to send verification code
    // For demo purposes, we'll just simulate it with a timeout
    setTimeout(() => {
      setCodeSent(true);
      setLoading(false);
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) return;
    
    setLoading(true);
    // Here you would verify the code with your backend
    // For demo purposes, we'll just simulate it
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEmail ? 'Email Login' : 'Phone Login'}
      </Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, isEmail && styles.activeToggle]}
          onPress={() => setIsEmail(true)}>
          <Text style={styles.toggleText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, !isEmail && styles.activeToggle]}
          onPress={() => setIsEmail(false)}>
          <Text style={styles.toggleText}>Phone</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder={isEmail ? 'Enter your email' : 'Enter your phone number'}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType={isEmail ? 'email-address' : 'phone-pad'}
        autoCapitalize="none"
      />
      
      {codeSent && (
        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
        />
      )}
      
      {!codeSent ? (
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSendCode}
          disabled={loading || !emailOrPhone}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Send Verification Code</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.button}
          onPress={handleVerifyCode}
          disabled={loading || !verificationCode}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Verify & Login</Text>
          )}
        </TouchableOpacity>
      )}
      
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
    marginBottom: 20,
    color: '#2c3e50',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: '#f8f9fa',
  },
  activeToggle: {
    backgroundColor: '#3498db',
  },
  toggleText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  input: {
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#3498db',
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

export default EmailLoginForm;