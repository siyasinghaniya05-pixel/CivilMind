import { CityProfile, WardData, Project, InfrastructureRisk, DepartmentBudget, AiRecommendation } from '@/types';
import { WARDS_DATA, PROJECTS_DATA, INFRASTRUCTURE_RISKS, AI_RECOMMENDATIONS, DEPARTMENT_BUDGETS } from '@/data/municipalData';

export const PRE_INDEXED_CITIES: CityProfile[] = [
  {
    id: 'yavatmal-hq',
    cityName: 'Yavatmal',
    marathiName: 'यवतमाळ',
    state: 'Maharashtra',
    district: 'Yavatmal District',
    ulbType: 'Municipal Council',
    ulbClass: 'Class A',
    totalPopulation: 148900,
    totalWards: 24,
    areaSqKm: 28.5,
    totalBudgetCr: 38.40,
    lat: 20.3888,
    lng: 78.1204,
    cityHealthScore: 82, // Requested by user: 82/100
    developmentScore: 78,
    budgetEfficiencyScore: 91,
    infrastructureRiskScore: 24, // 24% Low Risk
    citizenSatisfactionScore: 84,
    currentProblems: [
      'Drainage infrastructure requires immediate attention in low-lying sectors',
      'Ward 5 has the highest infrastructure risk due to nullah backflow',
      'Road maintenance should be prioritized this quarter along commercial corridors',
      'Water pressure variance between elevated and valley neighborhoods'
    ],
    highRiskAreas: [
      'Ward 5 (Godhani Nullah flood basin)',
      'Ward 4 (Indira Nagar primary drainage blockage)',
      'Ward 2 (Arni Naka traffic bottleneck & pavement wear)'
    ],
    infrastructureGaps: [
      'RCC Box Stormwater Drainage Channeling (1.8 km)',
      'Arterial CC Road rehabilitation for heavy freight',
      'Water Treatment Plant filtration capacity upgrade'
    ],
    budgetRecommendations: [
      { department: 'Drainage & Sewerage', percentage: 35, amountCr: 13.44 },
      { department: 'Roads & Transport', percentage: 30, amountCr: 11.52 },
      { department: 'Water Supply', percentage: 20, amountCr: 7.68 },
      { department: 'Sanitation & SWM', percentage: 10, amountCr: 3.84 },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: 1.92 }
    ],
    topDevelopmentPriorities: [
      '#1 Drainage Upgrade – Ward 4 (Impact Score: 95)',
      '#2 Road Rehabilitation – Ward 2 (Impact Score: 89)',
      '#3 Water Supply Upgrade – Ward 6 (Impact Score: 84)',
      '#4 Solid Waste MRF Modernization – Ward 17 (Impact Score: 80)',
      '#5 Smart LED Lighting Network – Ward 5 (Impact Score: 78)'
    ]
  },
  {
    id: 'kalamb-yavatmal',
    cityName: 'Kalamb',
    marathiName: 'कळंब',
    state: 'Maharashtra',
    district: 'Yavatmal District',
    ulbType: 'Nagar Parishad',
    ulbClass: 'Class B',
    totalPopulation: 58420,
    totalWards: 17,
    areaSqKm: 14.8,
    totalBudgetCr: 12.50,
    lat: 20.4735,
    lng: 78.3375,
    cityHealthScore: 74,
    developmentScore: 68,
    budgetEfficiencyScore: 82,
    infrastructureRiskScore: 38,
    citizenSatisfactionScore: 76,
    currentProblems: [
      'Drainage infrastructure requires immediate attention in Ward 4',
      'Ward 4 has the highest infrastructure risk of monsoon waterlogging',
      'Road maintenance should be prioritized on the MIDC heavy vehicle route'
    ],
    highRiskAreas: [
      'Ward 4 (Indira Nagar flood basin)',
      'Ward 3 (Ambedkar Nagar silt choke)',
      'Ward 17 (MIDC industrial route rutting)'
    ],
    infrastructureGaps: [
      'RCC box drain along Ralegaon stream',
      'Underground sewage pipeline network in Ward 3'
    ],
    budgetRecommendations: [
      { department: 'Drainage & Sewerage', percentage: 35, amountCr: 4.38 },
      { department: 'Roads & Transport', percentage: 28, amountCr: 3.50 },
      { department: 'Water Supply', percentage: 22, amountCr: 2.75 },
      { department: 'Sanitation & SWM', percentage: 10, amountCr: 1.25 },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: 0.62 }
    ],
    topDevelopmentPriorities: [
      '#1 Drainage Upgrade – Ward 4 (Impact Score: 96)',
      '#2 Road Rehabilitation – Ward 2 (Impact Score: 89)',
      '#3 Water Supply Upgrade – Ward 11 (Impact Score: 85)'
    ]
  }
];

export function generateCityIntelligence(
  inputName: string,
  customCoords?: { lat: number; lng: number }
): {
  profile: CityProfile;
  wards: WardData[];
  projects: Project[];
  risks: InfrastructureRisk[];
  recommendations: AiRecommendation[];
} {
  const cleanName = inputName.trim();

  // Check if matching pre-indexed city
  const preIndexed = PRE_INDEXED_CITIES.find(
    c => c.cityName.toLowerCase() === cleanName.toLowerCase() ||
         c.id.toLowerCase().includes(cleanName.toLowerCase())
  );

  if (preIndexed && !customCoords) {
    return {
      profile: preIndexed,
      wards: WARDS_DATA,
      projects: PROJECTS_DATA,
      risks: INFRASTRUCTURE_RISKS,
      recommendations: AI_RECOMMENDATIONS,
    };
  }

  // Algorithmic synthesis for ANY custom city in India
  const nameHash = cleanName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const lat = customCoords ? customCoords.lat : 20.2 + ((nameHash % 200) / 100);
  const lng = customCoords ? customCoords.lng : 77.8 + ((nameHash % 300) / 100);

  const wardCount = 14 + (nameHash % 10);
  const population = 45000 + (nameHash * 180) % 95000;
  const totalBudgetCr = Number((12.0 + (nameHash % 18) * 1.2).toFixed(2));

  const devScore = 70 + (nameHash % 18);
  const healthScore = Math.min(94, devScore + 4);
  const riskScore = Math.max(18, 38 - (nameHash % 15));
  const budgetEfficiency = 80 + (nameHash % 15);
  const citizenSatisfaction = Math.min(96, Math.round((devScore + budgetEfficiency) / 2));

  const profile: CityProfile = {
    id: `city-${cleanName.toLowerCase().replace(/\s+/g, '-')}`,
    cityName: cleanName,
    marathiName: cleanName,
    state: 'Maharashtra',
    district: `${cleanName} District`,
    ulbType: 'Municipal Council',
    ulbClass: 'Class A',
    totalPopulation: population,
    totalWards: wardCount,
    areaSqKm: Number((16.5 + (nameHash % 12)).toFixed(1)),
    totalBudgetCr,
    lat,
    lng,
    cityHealthScore: healthScore,
    developmentScore: devScore,
    budgetEfficiencyScore: budgetEfficiency,
    infrastructureRiskScore: riskScore,
    citizenSatisfactionScore: citizenSatisfaction,
    currentProblems: [
      'Drainage infrastructure requires immediate attention before heavy rainfall',
      `Ward ${3 + (nameHash % 4)} has the highest infrastructure risk`,
      'Road maintenance should be prioritized this quarter along major corridors'
    ],
    highRiskAreas: [
      `Ward ${2 + (nameHash % 3)} (Primary drainage choke point)`,
      `Ward ${4 + (nameHash % 4)} (Asphalt wear & transit rutting)`
    ],
    infrastructureGaps: [
      'Stormwater box drainage modernization',
      'Water transmission line reinforcement'
    ],
    budgetRecommendations: [
      { department: 'Drainage & Sewerage', percentage: 35, amountCr: Number((totalBudgetCr * 0.35).toFixed(2)) },
      { department: 'Roads & Transport', percentage: 30, amountCr: Number((totalBudgetCr * 0.30).toFixed(2)) },
      { department: 'Water Supply', percentage: 20, amountCr: Number((totalBudgetCr * 0.20).toFixed(2)) },
      { department: 'Sanitation & SWM', percentage: 10, amountCr: Number((totalBudgetCr * 0.10).toFixed(2)) },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: Number((totalBudgetCr * 0.05).toFixed(2)) }
    ],
    topDevelopmentPriorities: [
      `#1 Drainage Upgrade – Ward 4 (Impact Score: 95)`,
      `#2 Road Rehabilitation – Ward 2 (Impact Score: 89)`,
      `#3 Water Supply Upgrade – Ward 6 (Impact Score: 84)`
    ]
  };

  return {
    profile,
    wards: WARDS_DATA,
    projects: PROJECTS_DATA,
    risks: INFRASTRUCTURE_RISKS,
    recommendations: AI_RECOMMENDATIONS,
  };
}
