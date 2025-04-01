import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Mock data for testing
const MOCK_DATA: Record<string, any[]> = {
  'projects': [
    {
      id: '1',
      title: 'Downtown Revitalization',
      description: 'A project to renovate the downtown area with new green spaces and pedestrian-friendly zones.',
      location: 'Downtown',
      budget: 1500000,
      startDate: '2025-01-15',
      endDate: '2026-06-30',
      status: 'in_progress',
      image: 'https://picsum.photos/id/1018/300/200'
    },
    {
      id: '2',
      title: 'Community Garden Initiative',
      description: 'Creating sustainable community gardens in underutilized spaces throughout the city.',
      location: 'Various',
      budget: 250000,
      startDate: '2025-03-01',
      endDate: '2025-11-30',
      status: 'planning',
      image: 'https://picsum.photos/id/1019/300/200'
    }
  ],
  'projects/featured': [
    {
      id: '1',
      title: 'Downtown Revitalization',
      description: 'A project to renovate the downtown area with new green spaces and pedestrian-friendly zones.',
      location: 'Downtown',
      budget: 1500000,
      startDate: '2025-01-15',
      endDate: '2026-06-30',
      status: 'in_progress',
      image: 'https://picsum.photos/id/1018/300/200'
    }
  ],
  'proposals/project/1': [
    {
      id: 'p1',
      projectId: '1',
      title: 'Pedestrian Zone Design',
      description: 'Vote on the design options for the new pedestrian zones in downtown.',
      options: ['Design A: Modern', 'Design B: Classical', 'Design C: Eco-focused'],
      deadline: '2025-05-30',
      status: 'active'
    }
  ],
  'proposals/p1': [
    {
      id: 'p1',
      projectId: '1',
      title: 'Pedestrian Zone Design',
      description: 'Vote on the design options for the new pedestrian zones in downtown.',
      options: ['Design A: Modern', 'Design B: Classical', 'Design C: Eco-focused'],
      deadline: '2025-05-30',
      status: 'active',
      results: {
        'Design A: Modern': 24,
        'Design B: Classical': 18,
        'Design C: Eco-focused': 36
      }
    }
  ]
};

export const fetchData = async (endpoint: string) => {
  // origial code
  // try {
  //     const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
  //     return response.data;
  // } catch (error) {
  //     console.error('Error fetching data:', error);
  //     throw error;
  // }
  // For testing, return mock data instead of making actual API calls
  return MOCK_DATA[endpoint] || [];
};

export const postData = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};