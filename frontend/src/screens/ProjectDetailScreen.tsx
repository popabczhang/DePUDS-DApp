import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/index';
import globalStyles from '../assets/styles/global';
import { fetchData } from '../services/api';
import { Project, Proposal } from '../types';

type RootStackParamList = {
  Home: undefined;
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Voting: { proposalId: string };
  Profile: undefined;
};

type ProjectDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

const ProjectDetailScreen = ({ route, navigation }: ProjectDetailScreenProps) => {
  const { projectId } = route.params;
  const [project, setProject] = useState<Project | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectData = await fetchData(`projects/${projectId}`);
        setProject(Array.isArray(projectData) ? projectData[0] : projectData);
        
        const proposalsData = await fetchData(`proposals/project/${projectId}`);
        setProposals(proposalsData);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Project not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: project.image || 'https://via.placeholder.com/400x200' }} 
        style={styles.image} 
      />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{project.title}</Text>
        
        <View style={styles.statusContainer}>
          <Text 
            style={[
              styles.statusBadge, 
              project.status === 'planning' && styles.planningBadge,
              project.status === 'in_progress' && styles.progressBadge,
              project.status === 'completed' && styles.completedBadge
            ]}
          >
            {project.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location:</Text>
          <Text style={styles.infoValue}>{project.location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Budget:</Text>
          <Text style={styles.infoValue}>${project.budget.toLocaleString()}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Timeline:</Text>
          <Text style={styles.infoValue}>
            {new Date(project.startDate).toLocaleDateString()} - 
            {new Date(project.endDate).toLocaleDateString()}
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{project.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proposals</Text>
          {proposals.length === 0 ? (
            <Text style={styles.noProposals}>No active proposals for this project</Text>
          ) : (
            proposals.map(proposal => (
              <View key={proposal.id} style={styles.proposalCard}>
                <Text style={styles.proposalTitle}>{proposal.title}</Text>
                <Text style={styles.proposalDescription} numberOfLines={2}>
                  {proposal.description}
                </Text>
                <Text style={styles.proposalDeadline}>
                  Deadline: {new Date(proposal.deadline).toLocaleDateString()}
                </Text>
                <Button 
                  title="Vote on Proposal" 
                  onPress={() => navigation.navigate('Voting', { proposalId: proposal.id })}
                  style={styles.voteButton}
                />
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#dc3545',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  planningBadge: {
    backgroundColor: '#ffeeba',
    color: '#856404',
  },
  progressBadge: {
    backgroundColor: '#b8daff',
    color: '#004085',
  },
  completedBadge: {
    backgroundColor: '#c3e6cb',
    color: '#155724',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  noProposals: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  proposalCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  proposalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  proposalDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  proposalDeadline: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  voteButton: {
    backgroundColor: '#28a745',
  },
});

export default ProjectDetailScreen;