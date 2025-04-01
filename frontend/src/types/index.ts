export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in_progress' | 'completed';
  image?: string;
}

export interface Proposal {
  id: string;
  projectId: string;
  title: string;
  description: string;
  options: string[];
  deadline: string;
  status: 'active' | 'closed';
  results?: Record<string, number>;
}

export interface User {
  id: string;
  address: string;
  votingPower: number;
  votedProposals: string[];
}

export interface Vote {
  proposalId: string;
  option: string;
  timestamp: string;
  txHash: string;
}