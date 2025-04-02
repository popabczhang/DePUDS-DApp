import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  GeoPatternVerification: undefined;
  Profile: undefined;
  Troubleshooting: undefined;
};

type GeoPatternVerificationScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'GeoPatternVerification'
  >;
};

const GeoPatternVerificationScreen = ({
  navigation,
}: GeoPatternVerificationScreenProps) => {
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const startVerification = () => {
    Alert.alert(
      'Location Permission',
      'DePUDS needs to collect your location data over the next 15 days to verify your residence and workplace. This data will be encrypted and stored securely.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Allow',
          onPress: () => {
            setVerificationStarted(true);
            setLoading(true);

            // Simulate initiating the location tracking process
            setTimeout(() => {
              setLoading(false);
              // In a real app, you would start background location tracking here
            }, 2000);
          },
        },
      ],
    );
  };

  const handleTroubleshooting = () => {
    // Navigate to troubleshooting screen
    navigation.navigate('Troubleshooting');
  };

  const handleContinue = () => {
    // In a real app, you would check if verification is complete
    // For demo, just proceed to profile
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Geo Pattern Verification</Text>

        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>📍</Text>
        </View>

        <Text style={styles.description}>
          Our geo pattern verification uses encrypted location data collected
          over 15 days to establish your living and working patterns within
          Cambridge.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>How It Works:</Text>
          <Text style={styles.infoText}>
            • The app will collect your location data in the background
          </Text>
          <Text style={styles.infoText}>
            • Data is encrypted on your device before being stored
          </Text>
          <Text style={styles.infoText}>
            • After 15 days, patterns will be analyzed to verify your community
            ties
          </Text>
          <Text style={styles.infoText}>
            • You can continue using the app during this period
          </Text>
        </View>

        {!verificationStarted ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={startVerification}>
            <Text style={styles.primaryButtonText}>Start Verification</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.verificationStatusContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#2196F3" />
            ) : (
              <>
                <Text style={styles.verificationStatusText}>
                  Verification in progress. Location tracking has been enabled.
                </Text>
                <Text style={styles.verificationNote}>
                  Please ensure location services remain enabled for the next 15
                  days.
                </Text>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleContinue}>
                  <Text style={styles.primaryButtonText}>
                    Continue To Profile
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.troubleshootButton}
          onPress={handleTroubleshooting}>
          <Text style={styles.troubleshootButtonText}>Troubleshooting</Text>
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
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
  },
  imagePlaceholder: {
    width: '80%',
    height: 180,
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholderText: {
    fontSize: 60,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0d47a1',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  troubleshootButton: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  troubleshootButtonText: {
    color: '#2196F3',
    fontSize: 16,
  },
  verificationStatusContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  verificationStatusText: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  verificationNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default GeoPatternVerificationScreen;
