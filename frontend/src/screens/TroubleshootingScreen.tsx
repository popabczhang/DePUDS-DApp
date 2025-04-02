import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  GeoPatternVerification: undefined;
  Troubleshooting: undefined;
  LegalDocumentVerification: undefined;
};

type TroubleshootingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Troubleshooting'>;
};

const TroubleshootingScreen = ({navigation}: TroubleshootingScreenProps) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Troubleshooting</Text>

        <View style={styles.issueContainer}>
          <Text style={styles.issueTitle}>Location Not Being Tracked</Text>
          <Text style={styles.issueDescription}>
            Please ensure you have granted location permissions to the app and
            that location services are enabled on your device.
          </Text>
          <TouchableOpacity style={styles.actionButton} onPress={openSettings}>
            <Text style={styles.actionButtonText}>Open Device Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.issueContainer}>
          <Text style={styles.issueTitle}>App Not Running in Background</Text>
          <Text style={styles.issueDescription}>
            For proper location tracking, ensure that background app refresh is
            enabled for DePUDS and that battery optimization is disabled.
          </Text>
          <TouchableOpacity style={styles.actionButton} onPress={openSettings}>
            <Text style={styles.actionButtonText}>Check App Permissions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.issueContainer}>
          <Text style={styles.issueTitle}>Verification Taking Too Long</Text>
          <Text style={styles.issueDescription}>
            The verification requires 15 days of consistent data. Make sure
            location tracking is enabled and you are spending sufficient time at
            your residence and workplace.
          </Text>
        </View>

        <View style={styles.issueContainer}>
          <Text style={styles.issueTitle}>Other Issues</Text>
          <Text style={styles.issueDescription}>
            If you're experiencing other issues with geo verification, you can
            switch to document-based verification or contact our support team.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.altButton]}
              onPress={() => navigation.navigate('LegalDocumentVerification')}>
              <Text style={styles.actionButtonText}>
                Switch to Document Verification
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.supportButton]}
              onPress={() => Linking.openURL('mailto:support@depuds.org')}>
              <Text style={styles.actionButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back to Verification</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
  },
  issueContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  issueDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  altButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#673AB7',
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#009688',
  },
  backButton: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    padding: 15,
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TroubleshootingScreen;
