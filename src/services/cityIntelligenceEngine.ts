import { CityProfile, WardData, Project, InfrastructureRisk, DepartmentBudget, AiRecommendation } from '@/types';

/**
 * Dynamically synthesizes an authentic municipal intelligence dataset for ANY selected location in India.
 * Generates wards, coordinates, projects, risk zones, budget recommendations, and AI insights on-the-fly.
 */
export function generateCityIntelligence(
  inputName: string,
  customCoords?: { lat?: number; lng?: number; district?: string; state?: string }
): {
  profile: CityProfile;
  wards: WardData[];
  projects: Project[];
  risks: InfrastructureRisk[];
  recommendations: AiRecommendation[];
} {
  const cleanName = inputName.trim() || 'Selected Municipality';

  // Compute a deterministic hash from the location name for seed calculations
  const nameHash = cleanName.split('').reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0);

  // Coordinate and regional metadata resolution (100% dynamic procedural generation)
  let lat = Number((18.5 + ((nameHash % 400) / 100)).toFixed(4));
  let lng = Number((74.0 + ((nameHash % 500) / 100)).toFixed(4));
  let state = customCoords?.state || 'Maharashtra';
  let district = customCoords?.district || `${cleanName} District`;
  let ulbType: CityProfile['ulbType'] = (nameHash % 3 === 0) 
    ? 'Municipal Council' 
    : (nameHash % 3 === 1) 
    ? 'Nagar Parishad' 
    : 'Nagar Panchayat';

  if (customCoords && customCoords.lat && customCoords.lng) {
    lat = customCoords.lat;
    lng = customCoords.lng;
  }

  // Dynamic population and size metrics
  const totalWards = 15 + (nameHash % 10);
  const totalPopulation = 42000 + ((nameHash * 173) % 115000);
  const areaSqKm = Number((12.5 + ((nameHash % 180) / 10)).toFixed(1));
  const totalBudgetCr = Number((11.5 + ((nameHash % 280) / 10)).toFixed(2));

  // Dynamic scores (0-100)
  const devScore = 70 + (nameHash % 16);
  const healthScore = Math.min(94, devScore + 4);
  const riskScore = Math.max(18, 38 - (nameHash % 15));
  const budgetEfficiency = 82 + (nameHash % 14);
  const citizenSatisfaction = Math.min(96, Math.round((devScore + budgetEfficiency) / 2));

  // Dynamic City Profile
  const profile: CityProfile = {
    id: `loc-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    cityName: cleanName,
    marathiName: cleanName,
    state,
    district,
    ulbType,
    ulbClass: totalPopulation > 100000 ? 'Class A' : totalPopulation > 50000 ? 'Class B' : 'Class C',
    totalPopulation,
    totalWards,
    areaSqKm,
    totalBudgetCr,
    lat,
    lng,
    cityHealthScore: healthScore,
    developmentScore: devScore,
    budgetEfficiencyScore: budgetEfficiency,
    infrastructureRiskScore: riskScore,
    citizenSatisfactionScore: citizenSatisfaction,
    currentProblems: [
      `Drainage Issues: Low-lying Ward 4 & Ward 5 encounter storm runoff stagnation during monsoon surges`,
      `Road Deterioration: Main arterial commercial spine connecting to highway exhibits high pavement wear`,
      `Water Supply Gaps: Distribution pressure variance between elevated and valley neighborhoods`
    ],
    highRiskAreas: [
      `Ward 4 (${cleanName} Primary Drainage Outfall)`,
      `Ward 5 (Low-Lying Basin Contour)`,
      `Ward 2 (Heavy Freight Transit Corridor)`
    ],
    infrastructureGaps: [
      'RCC Box Stormwater Drainage Channeling (1.8 km)',
      'Arterial CC Road rehabilitation for heavy freight vehicles',
      'Feeder pipeline extension to balance distribution pressure'
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
      `#3 Water Supply Expansion – Ward 6 (Impact Score: 84)`
    ]
  };

  // Dynamically generate Ward Data distributed around the selected coordinates
  const wards: WardData[] = Array.from({ length: totalWards }, (_, i) => {
    const wardNum = i + 1;
    const angle = (i / totalWards) * 2 * Math.PI;
    const radius = 0.008 + ((i % 3) * 0.005);
    const wardLat = Number((lat + radius * Math.cos(angle)).toFixed(6));
    const wardLng = Number((lng + radius * Math.sin(angle)).toFixed(6));
    const wardPop = Math.round(totalPopulation / totalWards + ((nameHash + i * 31) % 1200) - 600);

    const isHighRisk = wardNum === 4 || wardNum === 5;

    return {
      id: wardNum,
      number: wardNum,
      name: `${cleanName} Ward ${wardNum}`,
      marathiName: `प्रभाग क्र. ${wardNum}`,
      counselor: `Ward Counselor ${wardNum}`,
      contact: `+91 98220 ${String(10000 + wardNum * 37).slice(-5)}`,
      population: wardPop,
      areaSqKm: Number((areaSqKm / totalWards).toFixed(2)),
      lat: wardLat,
      lng: wardLng,
      compositeScore: isHighRisk ? 54 + (i % 6) : 74 + (i % 16),
      rank: wardNum,
      scores: {
        roadQuality: isHighRisk ? 52 : 75 + (i % 12),
        waterSupply: 70 + (i % 15),
        drainage: isHighRisk ? 42 : 72 + (i % 14),
        streetLighting: 80 + (i % 12),
        sanitation: 68 + (i % 16),
        citizenComplaints: isHighRisk ? 38 : 12 + (i % 8)
      },
      highRisk: isHighRisk,
      riskFactors: isHighRisk ? ['Monsoon backwater accumulation', 'Culvert silt constriction'] : ['Routine road resurfacing'],
      budgetAllocatedLakhs: Math.round((totalBudgetCr * 100) / totalWards),
      activeProjectsCount: 1 + (i % 3),
      unresolvedGrievances: isHighRisk ? 28 : 5 + (i % 8)
    };
  });

  // Dynamically generate Projects for this specific location
  const projects: Project[] = [
    {
      id: `PRJ-${cleanName.slice(0, 3).toUpperCase()}-001`,
      title: `${cleanName} Ward 4 Stormwater Box Drainage Channeling`,
      description: `Construction of 1.8km RCC box drain to prevent monsoon backflow in low-lying residential clusters.`,
      department: 'Drainage & Sewerage',
      wardId: 4,
      wardName: `${cleanName} Ward 4`,
      budgetLakhs: 120,
      spentLakhs: 45,
      status: 'In Progress',
      startDate: '2026-04-10',
      targetDate: '2026-11-30',
      contractor: 'Mahalaxmi Infrastructure Ltd.',
      completionPercentage: 38,
      lat: wards[3]?.lat || lat + 0.005,
      lng: wards[3]?.lng || lng - 0.004,
      populationBenefited: 12000,
      costPerCitizen: 1000,
      riskReductionPercentage: 84,
      priorityScore: 95,
      riskScore: 88,
      strategicScore: 92,
      impactScore: 95,
      conditionRating: 'Poor',
      complaintCount: 42,
      aiJustification: 'Halts chronic waterlogging before monsoon precipitation window.',
      recommendedBudgetLakhs: 120
    },
    {
      id: `PRJ-${cleanName.slice(0, 3).toUpperCase()}-002`,
      title: `${cleanName} Main Commercial Road CC Resurfacing`,
      description: `Rehabilitation of 2.4km arterial commercial market road with heavy freight bearing pavement.`,
      department: 'Roads & Transport',
      wardId: 2,
      wardName: `${cleanName} Ward 2`,
      budgetLakhs: 95,
      spentLakhs: 62,
      status: 'In Progress',
      startDate: '2026-03-01',
      targetDate: '2026-09-30',
      contractor: 'Vidarbha Roadways & Builders',
      completionPercentage: 65,
      lat: wards[1]?.lat || lat - 0.003,
      lng: wards[1]?.lng || lng + 0.005,
      populationBenefited: 34000,
      costPerCitizen: 279,
      riskReductionPercentage: 68,
      priorityScore: 89,
      riskScore: 72,
      strategicScore: 86,
      impactScore: 89,
      conditionRating: 'Poor',
      complaintCount: 31,
      aiJustification: 'High-density commercial route with severe pavement distress index.',
      recommendedBudgetLakhs: 95
    },
    {
      id: `PRJ-${cleanName.slice(0, 3).toUpperCase()}-003`,
      title: `${cleanName} Ward 6 Elevated Reservoir Feeder Pipeline`,
      description: `Extending ductile iron water transmission feeder to stabilize distribution pressure.`,
      department: 'Water Supply',
      wardId: 6,
      wardName: `${cleanName} Ward 6`,
      budgetLakhs: 65,
      spentLakhs: 10,
      status: 'Planned',
      startDate: '2026-08-01',
      targetDate: '2027-01-15',
      contractor: 'Shree Jaltech Engineering',
      completionPercentage: 15,
      lat: wards[5]?.lat || lat + 0.006,
      lng: wards[5]?.lng || lng + 0.003,
      populationBenefited: 12500,
      costPerCitizen: 520,
      riskReductionPercentage: 55,
      priorityScore: 84,
      riskScore: 60,
      strategicScore: 80,
      impactScore: 84,
      conditionRating: 'Moderate',
      complaintCount: 19,
      aiJustification: 'Balances distribution pressure variance in elevated neighborhood.',
      recommendedBudgetLakhs: 65
    },
    {
      id: `PRJ-${cleanName.slice(0, 3).toUpperCase()}-004`,
      title: `${cleanName} Mechanized SWM Segregation Facility`,
      description: `Modern rotary trommel waste segregation and material recovery center.`,
      department: 'Sanitation & SWM',
      wardId: 8,
      wardName: `${cleanName} Ward 8`,
      budgetLakhs: 50,
      spentLakhs: 50,
      status: 'Completed',
      startDate: '2025-11-01',
      targetDate: '2026-05-30',
      contractor: 'Green Earth Civic Solutions',
      completionPercentage: 100,
      lat: wards[7]?.lat || lat - 0.007,
      lng: wards[7]?.lng || lng - 0.006,
      populationBenefited: 28000,
      costPerCitizen: 178,
      riskReductionPercentage: 45,
      priorityScore: 78,
      riskScore: 40,
      strategicScore: 75,
      impactScore: 78,
      conditionRating: 'Good',
      complaintCount: 8,
      aiJustification: 'Achieves 100% source segregation compliance under Swachh Bharat.',
      recommendedBudgetLakhs: 50
    }
  ];

  // Dynamically generate Infrastructure Risks
  const risks: InfrastructureRisk[] = [
    {
      id: `RSK-${cleanName.slice(0, 3).toUpperCase()}-01`,
      type: 'drain_blockage',
      title: `Outfall Nullah Silt Constriction – Ward 4`,
      wardId: 4,
      wardName: `${cleanName} Ward 4`,
      locationDetails: `Low-lying basin outfall adjacent to culvert`,
      severity: 'Critical',
      probabilityPercentage: 84,
      predictedFailureDays: 14,
      affectedPopulation: 12000,
      estimatedRemedyCostLakhs: 25,
      recommendedAction: 'Immediate desilting and temporary diesel dewatering pumps.',
      aiDiagnostic: '84% inundation hazard detected during precipitation window.',
      lat: wards[3]?.lat || lat + 0.005,
      lng: wards[3]?.lng || lng - 0.004,
      status: 'Active',
      createdAt: '2026-09-10'
    },
    {
      id: `RSK-${cleanName.slice(0, 3).toUpperCase()}-02`,
      type: 'road_deterioration',
      title: `Sub-Base Rutting on Commercial Market Route`,
      wardId: 2,
      wardName: `${cleanName} Ward 2`,
      locationDetails: `Main freight transit corridor junction`,
      severity: 'High',
      probabilityPercentage: 72,
      predictedFailureDays: 28,
      affectedPopulation: 34000,
      estimatedRemedyCostLakhs: 40,
      recommendedAction: 'Bitumen patch sealing prior to monsoon.',
      aiDiagnostic: 'PDI index dropped to 38/100 under heavy axle freight load.',
      lat: wards[1]?.lat || lat - 0.003,
      lng: wards[1]?.lng || lng + 0.005,
      status: 'Active',
      createdAt: '2026-09-08'
    },
    {
      id: `RSK-${cleanName.slice(0, 3).toUpperCase()}-03`,
      type: 'water_leakage',
      title: `Feeder Pipeline Pressure Variance – Ward 6`,
      wardId: 6,
      wardName: `${cleanName} Ward 6`,
      locationDetails: `Elevated cluster distribution spine`,
      severity: 'Moderate',
      probabilityPercentage: 55,
      predictedFailureDays: 45,
      affectedPopulation: 12500,
      estimatedRemedyCostLakhs: 18,
      recommendedAction: 'Pressure reducing valve calibration.',
      aiDiagnostic: 'Tail-end supply variance causing localized shortages.',
      lat: wards[5]?.lat || lat + 0.006,
      lng: wards[5]?.lng || lng + 0.003,
      status: 'Under Inspection',
      createdAt: '2026-09-05'
    }
  ];

  // Dynamically generate AI Recommendations
  const recommendations: AiRecommendation[] = [
    {
      id: `REC-${cleanName.slice(0, 3).toUpperCase()}-1`,
      title: `Drainage Upgrade – Ward 4`,
      wardId: 4,
      wardName: `${cleanName} Ward 4`,
      recommendedBudgetLakhs: 120,
      populationBenefited: 12000,
      floodOrRiskReduction: 84,
      qualityOfLifeLift: 18,
      impactScore: 95,
      category: 'Drainage & Sewerage',
      priorityRank: 1,
      urgency: 'Immediate',
      justification: `Halts chronic waterlogging before the monsoon precipitation window.`,
      roiCitizenImpact: `₹1,000 per citizen protected from flood damages.`,
      status: 'Approved for DPR'
    },
    {
      id: `REC-${cleanName.slice(0, 3).toUpperCase()}-2`,
      title: `Road Rehabilitation – Ward 2`,
      wardId: 2,
      wardName: `${cleanName} Ward 2`,
      recommendedBudgetLakhs: 95,
      populationBenefited: 34000,
      floodOrRiskReduction: 68,
      qualityOfLifeLift: 14,
      impactScore: 89,
      category: 'Roads & Transport',
      priorityRank: 2,
      urgency: 'Immediate',
      justification: `High transit commercial route with heavy commuter traffic delay.`,
      roiCitizenImpact: `₹279 per commuter with 35% travel time recovery.`,
      status: 'Pending Council Review'
    },
    {
      id: `REC-${cleanName.slice(0, 3).toUpperCase()}-3`,
      title: `Water Supply Expansion – Ward 6`,
      wardId: 6,
      wardName: `${cleanName} Ward 6`,
      recommendedBudgetLakhs: 65,
      populationBenefited: 12500,
      floodOrRiskReduction: 55,
      qualityOfLifeLift: 12,
      impactScore: 84,
      category: 'Water Supply',
      priorityRank: 3,
      urgency: 'Upcoming Quarter',
      justification: `Balances distribution pressure variance in elevated neighborhood.`,
      roiCitizenImpact: `Stabilizes daily water supply duration to 135 LPCD.`,
      status: 'Pending Council Review'
    }
  ];

  return {
    profile,
    wards,
    projects,
    risks,
    recommendations
  };
}

// Export procedural sample administrative tiers for generic demonstration if needed
export const PRE_INDEXED_CITIES: CityProfile[] = [
  generateCityIntelligence('District Headquarters Council').profile,
  generateCityIntelligence('Sub-Divisional Nagar Parishad').profile,
  generateCityIntelligence('Industrial Area Nagar Parishad').profile,
  generateCityIntelligence('Emerging Nagar Panchayat').profile
];
