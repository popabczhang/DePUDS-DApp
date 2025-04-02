import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  CitizenshipVerification: undefined;
  GeoPatternVerification: undefined;
  LegalDocumentVerification: undefined;
  Profile: undefined;
};

type CitizenshipVerificationScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'CitizenshipVerification'
  >;
};

const CitizenshipVerificationScreen = ({
  navigation,
}: CitizenshipVerificationScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Citizenship Verification</Text>
        <Text style={styles.subtitle}>
          To continue, we need to verify your residence and work location in
          Cambridge. Please choose one of the verification methods below.
        </Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('GeoPatternVerification')}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>📍</Text>
            </View>
            <Text style={styles.optionTitle}>Geo Pattern</Text>
            <Text style={styles.optionDescription}>
              Uses your device location data over 15 days to verify your
              residence and workplace patterns.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('LegalDocumentVerification')}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>📄</Text>
            </View>
            <Text style={styles.optionTitle}>Legal Document</Text>
            <Text style={styles.optionDescription}>
              Upload documents such as utility bills, lease agreements, pay
              stubs, or tax documents.
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.securityNote}>
          Your verification data is encrypted and stored securely. We prioritize
          your privacy.
        </Text>
      </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconText: {
    fontSize: 30,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  securityNote: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default CitizenshipVerificationScreen;
