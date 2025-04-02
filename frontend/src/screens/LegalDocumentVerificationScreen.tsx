import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  LegalDocumentVerification: undefined;
  Profile: undefined;
};

type LegalDocumentVerificationScreenProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'LegalDocumentVerification'
  >;
};

const LegalDocumentVerificationScreen = ({
  navigation,
}: LegalDocumentVerificationScreenProps) => {
  const [residenceDocUploaded, setResidenceDocUploaded] = useState(false);
  const [workplaceDocUploaded, setWorkplaceDocUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleUploadResidenceDoc = () => {
    setUploading(true);
    // Simulate document upload process
    setTimeout(() => {
      setResidenceDocUploaded(true);
      setUploading(false);
    }, 2000);
  };

  const handleUploadWorkplaceDoc = () => {
    setUploading(true);
    // Simulate document upload process
    setTimeout(() => {
      setWorkplaceDocUploaded(true);
      setUploading(false);
    }, 2000);
  };

  const handleContinue = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Legal Document Verification</Text>

        <Text style={styles.description}>
          Upload legal documents to verify your residence and workplace in
          Cambridge. All documents will be encrypted and stored securely.
        </Text>

        <View style={styles.documentsContainer}>
          <View style={styles.documentSection}>
            <Text style={styles.sectionTitle}>Residence Verification</Text>
            <Text style={styles.sectionDescription}>
              Upload one of the following documents:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletItem}>
                • Utility bill (dated within 3 months)
              </Text>
              <Text style={styles.bulletItem}>
                • Lease or mortgage statement
              </Text>
              <Text style={styles.bulletItem}>• Property tax bill</Text>
              <Text style={styles.bulletItem}>
                • Bank statement with address (dated within 3 months)
              </Text>
            </View>

            {residenceDocUploaded ? (
              <View style={styles.uploadedContainer}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.uploadedText}>
                  Document uploaded successfully
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUploadResidenceDoc}
                disabled={uploading}>
                {uploading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.uploadButtonText}>
                    Upload Residence Document
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.separator} />

          <View style={styles.documentSection}>
            <Text style={styles.sectionTitle}>Workplace Verification</Text>
            <Text style={styles.sectionDescription}>
              Upload one of the following documents:
            </Text>
            <View style={styles.bulletPoints}>
              <Text style={styles.bulletItem}>• Employment offer letter</Text>
              <Text style={styles.bulletItem}>• Recent pay stub</Text>
              <Text style={styles.bulletItem}>• Tax document (W-2, 1099)</Text>
              <Text style={styles.bulletItem}>
                • Business license (if self-employed)
              </Text>
            </View>

            {workplaceDocUploaded ? (
              <View style={styles.uploadedContainer}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.uploadedText}>
                  Document uploaded successfully
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUploadWorkplaceDoc}
                disabled={uploading}>
                {uploading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.uploadButtonText}>
                    Upload Workplace Document
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.privacyNote}>
          All documents are encrypted and stored securely. Our verification team
          will review them within 48 hours.
        </Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!residenceDocUploaded || !workplaceDocUploaded) &&
              styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!residenceDocUploaded || !workplaceDocUploaded}>
          <Text style={styles.continueButtonText}>Continue to Profile</Text>
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
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  documentsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  documentSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  bulletPoints: {
    marginBottom: 15,
  },
  bulletItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    lineHeight: 20,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
  },
  checkIcon: {
    fontSize: 20,
    color: '#2e7d32',
    marginRight: 10,
  },
  uploadedText: {
    color: '#2e7d32',
    fontSize: 14,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  privacyNote: {
    fontSize: 13,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 25,
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LegalDocumentVerificationScreen;
