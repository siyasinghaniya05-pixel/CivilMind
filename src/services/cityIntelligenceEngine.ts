import { CityProfile, WardData, Project, InfrastructureRisk, DepartmentBudget, AiRecommendation } from '@/types';
import { WARDS_DATA, PROJECTS_DATA, INFRASTRUCTURE_RISKS, AI_RECOMMENDATIONS, DEPARTMENT_BUDGETS } from '@/data/municipalData';

export const PRE_INDEXED_CITIES: CityProfile[] = [
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
    cityHealthScore: 78,
    developmentScore: 74,
    budgetEfficiencyScore: 89,
    infrastructureRiskScore: 32,
    citizenSatisfactionScore: 81,
    currentProblems: [
      'Drainage Issues: Low-lying Ward 4 & 5 encounter severe monsoon storm stagnation',
      'Road Deterioration: Main commercial road and market corridor exhibit high pothole index',
      'Water Supply Gaps: Distribution pressure drops across elevated residential clusters'
    ],
    highRiskAreas: [
      'Ward 4 (Indira Nagar primary drainage choke point)',
      'Ward 5 (Godhani Nullah flood basin)',
      'Ward 2 (Market Road asphalt rutting)'
    ],
    infrastructureGaps: [
      'RCC Box Stormwater Drainage Channeling (1.8 km)',
      'Arterial CC Road rehabilitation for commercial vehicles',
      'Feeder pipeline extension to tail-end wards'
    ],
    budgetRecommendations: [
      { department: 'Drainage & Sewerage', percentage: 35, amountCr: 4.38 },
      { department: 'Roads & Transport', percentage: 30, amountCr: 3.75 },
      { department: 'Water Supply', percentage: 20, amountCr: 2.50 },
      { department: 'Sanitation & SWM', percentage: 10, amountCr: 1.25 },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: 0.62 }
    ],
    topDevelopmentPriorities: [
      '#1 Drainage Upgrade – Ward 4 (Impact Score: 95)',
      '#2 Road Rehabilitation – Ward 2 (Impact Score: 89)',
      '#3 Water Supply Expansion – Ward 6 (Impact Score: 84)'
    ]
  },
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
    cityHealthScore: 82,
    developmentScore: 78,
    budgetEfficiencyScore: 91,
    infrastructureRiskScore: 24,
    citizenSatisfactionScore: 84,
    currentProblems: [
      'Drainage infrastructure requires immediate attention in low-lying sectors',
      'Ward 5 has the highest infrastructure risk due to nullah backflow',
      'Road maintenance should be prioritized this quarter along commercial corridors'
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
      '#3 Water Supply Upgrade – Ward 6 (Impact Score: 84)'
    ]
  },
  {
    id: 'wardha-city',
    cityName: 'Wardha',
    marathiName: 'वर्धा',
    state: 'Maharashtra',
    district: 'Wardha District',
    ulbType: 'Municipal Council',
    ulbClass: 'Class A',
    totalPopulation: 112500,
    totalWards: 22,
    areaSqKm: 24.2,
    totalBudgetCr: 29.80,
    lat: 20.7453,
    lng: 78.6022,
    cityHealthScore: 80,
    developmentScore: 76,
    budgetEfficiencyScore: 88,
    infrastructureRiskScore: 28,
    citizenSatisfactionScore: 82,
    currentProblems: [
      'Railway crossing drainage overflow during flash cloudbursts',
      'Sevagram heritage road needs surface sealing & pedestrian walkways',
      'Solid waste segregation facility capacity constraints'
    ],
    highRiskAreas: [
      'Ward 6 (Railway colony culvert)',
      'Ward 9 (Civil Hospital drainage junction)'
    ],
    infrastructureGaps: [
      'Underground storm drain trunk line',
      'Decentralized sewage treatment plant'
    ],
    budgetRecommendations: [
      { department: 'Drainage & Sewerage', percentage: 32, amountCr: 9.54 },
      { department: 'Roads & Transport', percentage: 32, amountCr: 9.54 },
      { department: 'Water Supply', percentage: 22, amountCr: 6.56 },
      { department: 'Sanitation & SWM', percentage: 9, amountCr: 2.68 },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: 1.49 }
    ],
    topDevelopmentPriorities: [
      '#1 Drainage Upgrade – Ward 6 (Impact Score: 93)',
      '#2 Road Rehabilitation – Ward 3 (Impact Score: 88)',
      '#3 Water Supply Upgrade – Ward 8 (Impact Score: 82)'
    ]
  },
  {
    id: 'jejuri-pune',
    cityName: 'Jejuri',
    marathiName: 'जेजुरी',
    state: 'Maharashtra',
    district: 'Pune District',
    ulbType: 'Nagar Parishad',
    ulbClass: 'Class C',
    totalPopulation: 34200,
    totalWards: 15,
    areaSqKm: 11.2,
    totalBudgetCr: 8.60,
    lat: 18.2778,
    lng: 74.1594,
    cityHealthScore: 76,
    developmentScore: 71,
    budgetEfficiencyScore: 85,
    infrastructureRiskScore: 35,
    citizenSatisfactionScore: 79,
    currentProblems: [
      'Pilgrimage peak crowd sanitation and temporary drainage stress',
      'Old hill-foot water distribution pipe corrosion',
      'Temple approach road bottlenecks during annual Yatras'
    ],
    highRiskAreas: [
      'Ward 3 (Khandoba Mandir foothill basin)',
      'Ward 7 (Bus stand storm runoff)'
    ],
    infrastructureGaps: [
      'High-capacity storm drain for temple steps runoff',
      'Automated water pumping and reservoir monitoring'
    ],
    budgetRecommendations: [
      { department: 'Drainage & Sewerage', percentage: 35, amountCr: 3.01 },
      { department: 'Roads & Transport', percentage: 30, amountCr: 2.58 },
      { department: 'Water Supply', percentage: 20, amountCr: 1.72 },
      { department: 'Sanitation & SWM', percentage: 10, amountCr: 0.86 },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: 0.43 }
    ],
    topDevelopmentPriorities: [
      '#1 Drainage Upgrade – Ward 3 (Impact Score: 94)',
      '#2 Road Rehabilitation – Ward 1 (Impact Score: 87)',
      '#3 Water Supply Expansion – Ward 5 (Impact Score: 83)'
    ]
  },
  {
    id: 'pune-metro',
    cityName: 'Pune',
    marathiName: 'पुणे',
    state: 'Maharashtra',
    district: 'Pune District',
    ulbType: 'Municipal Corporation',
    ulbClass: 'Class A+',
    totalPopulation: 3850000,
    totalWards: 41,
    areaSqKm: 331.2,
    totalBudgetCr: 845.00,
    lat: 18.5204,
    lng: 73.8567,
    cityHealthScore: 86,
    developmentScore: 84,
    budgetEfficiencyScore: 92,
    infrastructureRiskScore: 22,
    citizenSatisfactionScore: 88,
    currentProblems: [
      'Mutha riverbank flood management and siltation',
      'Arterial bus rapid transit junction bottleneck points',
      'Underground utility mapping reconciliation'
    ],
    highRiskAreas: [
      'Ward 12 (Shivajinagar low water table)',
      'Ward 24 (Hadapsar transit intersection)'
    ],
    infrastructureGaps: [
      'Sensor-based stormwater flood gate automation',
      'Smart grid LED street lighting retrofits'
    ],
    budgetRecommendations: [
      { department: 'Roads & Transport', percentage: 35, amountCr: 295.75 },
      { department: 'Drainage & Sewerage', percentage: 30, amountCr: 253.50 },
      { department: 'Water Supply', percentage: 20, amountCr: 169.00 },
      { department: 'Sanitation & SWM', percentage: 10, amountCr: 84.50 },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: 42.25 }
    ],
    topDevelopmentPriorities: [
      '#1 Drainage Upgrade – Ward 12 (Impact Score: 97)',
      '#2 Road Rehabilitation – Ward 7 (Impact Score: 91)',
      '#3 Water Supply Modernization – Ward 18 (Impact Score: 86)'
    ]
  },
  {
    id: 'pandharkawda-yavatmal',
    cityName: 'Pandharkawda',
    marathiName: 'पांढरकवडा',
    state: 'Maharashtra',
    district: 'Yavatmal District',
    ulbType: 'Nagar Parishad',
    ulbClass: 'Class C',
    totalPopulation: 38200,
    totalWards: 16,
    areaSqKm: 12.4,
    totalBudgetCr: 9.80,
    lat: 20.0248,
    lng: 78.5322,
    cityHealthScore: 75,
    developmentScore: 71,
    budgetEfficiencyScore: 86,
    infrastructureRiskScore: 34,
    citizenSatisfactionScore: 78,
    currentProblems: [
      'National Highway 44 junction drainage overflow during heavy cloudbursts',
      'Old iron pipeline leakage leading to localized water shortages',
      'Solid waste dumping ground bio-mining requirements'
    ],
    highRiskAreas: [
      'Ward 3 (NH-44 bypass drainage bottleneck)',
      'Ward 8 (Subhash Nagar low line water logging)'
    ],
    infrastructureGaps: [
      'Concrete roadside box drains along bypass feeder',
      'Automated chlorine dosing and overhead reservoir telemetry'
    ],
    budgetRecommendations: [
      { department: 'Drainage & Sewerage', percentage: 35, amountCr: 3.43 },
      { department: 'Roads & Transport', percentage: 30, amountCr: 2.94 },
      { department: 'Water Supply', percentage: 20, amountCr: 1.96 },
      { department: 'Sanitation & SWM', percentage: 10, amountCr: 0.98 },
      { department: 'Street Lighting & Energy', percentage: 5, amountCr: 0.49 }
    ],
    topDevelopmentPriorities: [
      '#1 Drainage Channeling – Ward 3 (Impact Score: 94)',
      '#2 Highway Feeder Road Overlay – Ward 5 (Impact Score: 88)',
      '#3 WTP Pumping Automation – Ward 8 (Impact Score: 83)'
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
