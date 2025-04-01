import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define mock data for projects until API is connected
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Downtown Revitalization',
    description: 'A project to renovate the downtown area with new green spaces and pedestrian-friendly zones.',
    status: 'in_progress',
    image: 'https://picsum.photos/id/1018/300/200'
  },
  {
    id: '2',
    title: 'Community Garden Initiative',
    description: 'Creating sustainable community gardens in underutilized spaces throughout the city.',
    status: 'planning',
    image: 'https://picsum.photos/id/1019/300/200'
  },
  {
    id: '3',
    title: 'Smart Transit System',
    description: 'Implementing smart technology to improve public transportation efficiency and accessibility.',
    status: 'completed',
    image: 'https://picsum.photos/id/1020/300/200'
  }
];

type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Voting: { proposalId: string };
  Profile: undefined;
};

type ProjectsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Projects'>;
};

const ProjectsScreen = ({ navigation }: ProjectsScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Development Projects</Text>
      
      <FlatList
        data={MOCK_PROJECTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.projectCard}
            onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
          >
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text style={styles.projectDescription}>{item.description}</Text>
            <View style={styles.tagContainer}>
              <Text style={[
                styles.statusTag,
                item.status === 'planning' && styles.planningTag,
                item.status === 'in_progress' && styles.inProgressTag,
                item.status === 'completed' && styles.completedTag,
              ]}>
                {item.status.replace('_', ' ')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  planningTag: {
    backgroundColor: '#ffeeba',
    color: '#856404',
  },
  inProgressTag: {
    backgroundColor: '#b8daff',
    color: '#004085',
  },
  completedTag: {
    backgroundColor: '#c3e6cb',
    color: '#155724',
  },
});

export default ProjectsScreen;