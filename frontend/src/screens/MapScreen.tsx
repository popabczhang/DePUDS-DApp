import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Sample map placeholder - in a real app, use a mapping library
const MapPlaceholder = () => (
  <View style={styles.mapContainer}>
    <Image
      source={require('../assets/map_placeholder.png')}
      style={styles.mapImage}
      resizeMode="cover"
    />

    {/* Sample project markers */}
    <View style={[styles.marker, {top: '30%', left: '40%'}]}>
      <View style={styles.markerDot} />
      <Text style={styles.markerLabel}>Housing</Text>
    </View>

    <View style={[styles.marker, {top: '50%', left: '60%'}]}>
      <View style={styles.markerDot} />
      <Text style={styles.markerLabel}>Healthcare</Text>
    </View>

    <View style={[styles.marker, {top: '65%', left: '25%'}]}>
      <View style={styles.markerDot} />
      <Text style={styles.markerLabel}>Office</Text>
    </View>
  </View>
);

const MapScreen = () => {
  const [tokenBalance, setTokenBalance] = useState(250);
  const [activeTab, setActiveTab] = useState('map');

  const renderProjectList = () => (
    <ScrollView style={styles.projectList}>
      <Text style={styles.sectionTitle}>Projects Near You</Text>

      {[1, 2, 3, 4, 5].map(i => (
        <View key={i} style={styles.projectCard}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>{`Project ${i}`}</Text>
            <Text style={styles.projectStatus}>
              {i % 2 === 0 ? 'Planning' : 'In Progress'}
            </Text>
          </View>

          <Text style={styles.projectDescription}>
            {`This is a sample project description for Project ${i}. It contains information about the project type and its impact on the community.`}
          </Text>

          <View style={styles.projectFooter}>
            <Text style={styles.projectCategory}>
              {i % 3 === 0
                ? 'Housing'
                : i % 3 === 1
                ? 'Healthcare'
                : 'Community'}
            </Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tokenBar}>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenLabel}>Cambridge Token:</Text>
          <Text style={styles.tokenValue}>{tokenBalance}</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'map' && styles.activeTab]}
          onPress={() => setActiveTab('map')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'map' && styles.activeTabText,
            ]}>
            Map View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'list' && styles.activeTab]}
          onPress={() => setActiveTab('list')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'list' && styles.activeTabText,
            ]}>
            List View
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'map' ? <MapPlaceholder /> : renderProjectList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tokenBar: {
    backgroundColor: '#2196F3',
    padding: 10,
  },
  tokenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tokenLabel: {
    color: '#fff',
    fontSize: 16,
    marginRight: 5,
  },
  tokenValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F44336',
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerLabel: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectList: {
    flex: 1,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  projectStatus: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectCategory: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  viewButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default MapScreen;
