export type ProjectStatus = 'Planned' | 'Approved' | 'In Progress' | 'Delayed' | 'Completed';

export type DepartmentType = 
  | 'Roads & Transport' 
  | 'Water Supply' 
  | 'Drainage & Sewerage' 
  | 'Sanitation & SWM' 
  | 'Street Lighting & Energy' 
  | 'Urban Amenities & Parks';

export type RiskSeverity = 'Critical' | 'High' | 'Moderate' | 'Low';

export type TenantLevel = 'municipality' | 'district' | 'state';

export type HeatmapMode = 'none' | 'flood' | 'roads' | 'deficiency' | 'priority';

export interface WardData {
  id: number;
  number: number;
  name: string;
  marathiName: string;
  counselor: string;
  contact: string;
  population: number;
  areaSqKm: number;
  lat: number;
  lng: number;
  compositeScore: number;
  rank: number;
  scores: {
    roadQuality: number;
    waterSupply: number;
    drainage: number;
    streetLighting: number;
    sanitation: number;
    citizenComplaints: number;
  };
  highRisk: boolean;
  riskFactors: string[];
  budgetAllocatedLakhs: number;
  activeProjectsCount: number;
  unresolvedGrievances: number;
}

export interface Project {
  id: string;
  title: string;
  marathiTitle?: string;
  description: string;
  department: DepartmentType;
  wardId: number;
  wardName: string;
  budgetLakhs: number;
  spentLakhs: number;
  status: ProjectStatus;
  startDate: string;
  targetDate: string;
  contractor: string;
  completionPercentage: number;
  lat: number;
  lng: number;
  populationBenefited: number;
  costPerCitizen: number;
  riskReductionPercentage: number;
  priorityScore: number;
  riskScore: number;
  strategicScore: number;
  impactScore: number;
  conditionRating: 'Very Poor' | 'Poor' | 'Moderate' | 'Fair' | 'Good';
  complaintCount: number;
  aiJustification: string;
  recommendedBudgetLakhs: number;
  imageUrl?: string;
  inspectionNotes?: string;
  lastInspected?: string;
}

export interface InfrastructureRisk {
  id: string;
  type: 'road_deterioration' | 'drain_blockage' | 'water_leakage' | 'flood_risk' | 'light_failure';
  title: string;
  wardId: number;
  wardName: string;
  locationDetails: string;
  severity: RiskSeverity;
  probabilityPercentage: number;
  predictedFailureDays: number;
  affectedPopulation: number;
  estimatedRemedyCostLakhs: number;
  recommendedAction: string;
  aiDiagnostic: string;
  lat: number;
  lng: number;
  status: 'Active' | 'Under Inspection' | 'Work Sanctioned' | 'Mitigated';
  createdAt: string;
}

export interface DepartmentBudget {
  department: DepartmentType;
  allocatedLakhs: number;
  spentLakhs: number;
  committedLakhs: number;
  projectCount: number;
  icon: string;
  color: string;
}

export interface AiAgentMessage {
  id: string;
  sender: 'user' | 'agent';
  agentType: 'budget' | 'infra' | 'risk' | 'priority' | 'report';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AiRecommendation {
  id: string;
  title: string;
  wardId: number;
  wardName: string;
  recommendedBudgetLakhs: number;
  populationBenefited: number;
  floodOrRiskReduction: number;
  qualityOfLifeLift: number;
  impactScore: number;
  category: DepartmentType;
  priorityRank: number;
  urgency: 'Immediate' | 'Upcoming Quarter' | 'Phase 2';
  justification: string;
  roiCitizenImpact: string;
  status: 'Pending Council Review' | 'Approved for DPR' | 'Tender Drafted';
}

export interface CityProfile {
  id: string;
  cityName: string;
  marathiName: string;
  state: string;
  district: string;
  ulbType: 'Nagar Parishad' | 'Nagar Panchayat' | 'Municipal Council' | 'Municipal Corporation';
  ulbClass: string;
  totalPopulation: number;
  totalWards: number;
  areaSqKm: number;
  totalBudgetCr: number;
  lat: number;
  lng: number;
  
  // 5 Core Scores (0-100)
  cityHealthScore: number;
  developmentScore: number;
  budgetEfficiencyScore: number;
  infrastructureRiskScore: number;
  citizenSatisfactionScore: number;

  // Location Analysis
  currentProblems: string[];
  highRiskAreas: string[];
  infrastructureGaps: string[];
  budgetRecommendations: {
    department: DepartmentType;
    percentage: number;
    amountCr: number;
  }[];
  topDevelopmentPriorities: string[];
}

export interface MunicipalCityStats {
  cityName: string;
  state: string;
  district: string;
  ulbType: string;
  totalPopulation: number;
  totalWards: number;
  totalBudgetCr: number;
  allocatedBudgetCr: number;
  spentBudgetCr: number;
  unspentBudgetCr: number;
  averageWdiScore: number;
  activeProjectsCount: number;
  highRiskZonesCount: number;
  pendingIssuesCount: number;
  resolvedGrievancesLastMonth: number;
}
