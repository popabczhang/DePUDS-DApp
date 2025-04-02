import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosRetry from 'axios-retry';

if (!AsyncStorage) {
  console.error('AsyncStorage is not available. Ensure it is installed and linked properly.');
}

// Base API URL - should be configured per environment
const API_BASE_URL = 'https://api.depuds.org/v1'; // Replace with actual API URL

// Configure axios defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(api, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

// Intercept requests to add auth token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

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

export const saveProfileData = async (encryptedData: string): Promise<void> => {
  try {
    const walletAddress = await AsyncStorage.getItem('walletAddress');

    const response = await api.post('/user/profile', {
      encryptedData,
      walletAddress,
    });

    if (response.data?.userId) {
      await AsyncStorage.setItem('userId', response.data.userId);
    }

    return response.data;
  } catch (error: any) {
    console.error('API Error saving profile:', error.message || error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw new Error('Failed to save profile data');
  }
};

// Other API methods would go here
export const getUserProfile = async (): Promise<any> => {
  const response = await api.get('/user/profile');
  return response.data;
};