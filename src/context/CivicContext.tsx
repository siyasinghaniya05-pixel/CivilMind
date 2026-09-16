'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WardData, 
  Project, 
  InfrastructureRisk, 
  DepartmentBudget, 
  AiRecommendation, 
  MunicipalCityStats,
  AiAgentMessage,
  CityProfile,
  TenantLevel,
  HeatmapMode,
  AppView,
  UserProfile,
  UserRole
} from '@/types';
import { 
  CITY_STATS, 
  WARDS_DATA, 
  DEPARTMENT_BUDGETS, 
  PROJECTS_DATA, 
  INFRASTRUCTURE_RISKS, 
  AI_RECOMMENDATIONS,
} from '@/data/municipalData';
import { PRE_INDEXED_CITIES, generateCityIntelligence } from '@/services/cityIntelligenceEngine';

export type ActiveTab = 
  | 'overview' 
  | 'insights'
  | 'risks'
  | 'projects'
  | 'budget'
  | 'reports'
  | 'settings'
  | 'priority-engine' 
  | 'budget-optimizer' 
  | 'ward-index' 
  | 'risk-prediction' 
  | 'smart-map' 
  | 'project-monitoring' 
  | 'ai-recommendations' 
  | 'impact-analytics' 
  | 'report-generator' 
  | 'admin-panel'
  | 'ai-agents-hub'
  | 'multi-tenant'
  | 'wow-build-next'
  | 'wow-simulator'
  | 'wow-digital-twin'
  | 'wow-calculator'
  | 'wow-adp';

interface CivicContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentCity: CityProfile;
  tenantLevel: TenantLevel;
  setTenantLevel: (level: TenantLevel) => void;
  heatmapMode: HeatmapMode;
  setHeatmapMode: (mode: HeatmapMode) => void;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: UserProfile | null;
  loginUser: (profile: UserProfile) => void;
  logoutUser: () => void;
  completeLocationSetup: (profile: CityProfile) => void;
  switchCity: (profile: CityProfile) => void;
  searchAndSetCity: (cityName: string, coords?: { lat: number; lng: number }) => void;
  stats: MunicipalCityStats;
  wards: WardData[];
  projects: Project[];
  risks: InfrastructureRisk[];
  departmentBudgets: DepartmentBudget[];
  aiRecommendations: AiRecommendation[];
  agentMessages: AiAgentMessage[];
  selectedWard: WardData | null;
  setSelectedWard: (ward: WardData | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProjectStatus: (id: string, status: Project['status']) => void;
  updateProject: (project: Project) => void;
  approveRecommendation: (id: string) => void;
  sendAgentMessage: (agentType: 'budget' | 'infra' | 'risk' | 'priority' | 'report', text: string) => Promise<void>;
  updateDepartmentBudget: (deptName: string, newAllocatedLakhs: number) => void;
  resetToDefaults: () => void;
  totalBudgetOptimizationCr: number;
  setTotalBudgetOptimizationCr: (val: number) => void;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const CivicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [tenantLevel, setTenantLevel] = useState<TenantLevel>('municipality');
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>('none');
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);

  // App View & User Authentication State
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Rajesh Patil',
    email: 'chief.officer@kalamb.gov.in',
    organization: 'Kalamb Nagar Parishad',
    role: 'Chief Officer',
    selectedCityId: 'kalamb-yavatmal'
  });

  // Active City Profile (Default: Kalamb)
  const [currentCity, setCurrentCity] = useState<CityProfile>(PRE_INDEXED_CITIES[0]);

  const loginUser = (profile: UserProfile) => {
    setUser(profile);
    setCurrentView('location-setup');
  };

  const logoutUser = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const completeLocationSetup = (profile: CityProfile) => {
    switchCity(profile);
    setUser((prev: UserProfile | null) => prev ? { ...prev, selectedCityId: profile.id } : {
      name: 'Guest Officer',
      email: 'officer@ulb.gov.in',
      organization: `${profile.cityName} ${profile.ulbType}`,
      role: 'Chief Officer',
      selectedCityId: profile.id
    });
    setCurrentView('dashboard');
  };

  const [stats, setStats] = useState<MunicipalCityStats>(CITY_STATS);
  const [wards, setWards] = useState<WardData[]>(WARDS_DATA);
  const [projects, setProjects] = useState<Project[]>(PROJECTS_DATA);
  const [risks, setRisks] = useState<InfrastructureRisk[]>(INFRASTRUCTURE_RISKS);
  const [departmentBudgets, setDepartmentBudgets] = useState<DepartmentBudget[]>(DEPARTMENT_BUDGETS);
  const [aiRecommendations, setAiRecommendations] = useState<AiRecommendation[]>(AI_RECOMMENDATIONS);
  const [selectedWard, setSelectedWard] = useState<WardData | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [totalBudgetOptimizationCr, setTotalBudgetOptimizationCr] = useState<number>(10.0);

  const [agentMessages, setAgentMessages] = useState<AiAgentMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      agentType: 'budget',
      content: `Namaskar Chief Officer! I have loaded the municipal intelligence profile for ${currentCity.cityName} ${currentCity.ulbType} (${currentCity.district}). How can I assist with your development planning today?`,
      timestamp: 'Today, 09:15 AM'
    }
  ]);

  // Handle dark mode toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('civicmind_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('civicmind_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('civicmind_theme', 'light');
      }
      return next;
    });
  };

  // Switch City implementation
  const switchCity = (profile: CityProfile) => {
    setCurrentCity(profile);
    const synthesized = generateCityIntelligence(profile.cityName, { lat: profile.lat, lng: profile.lng });

    setWards(synthesized.wards);
    setProjects(synthesized.projects);
    setRisks(synthesized.risks);
    setAiRecommendations(synthesized.recommendations);
    setTotalBudgetOptimizationCr(profile.totalBudgetCr);

    setStats({
      cityName: profile.cityName,
      state: profile.state,
      district: profile.district,
      ulbType: `${profile.ulbType} (${profile.ulbClass})`,
      totalPopulation: profile.totalPopulation,
      totalWards: profile.totalWards,
      totalBudgetCr: profile.totalBudgetCr,
      allocatedBudgetCr: Number((profile.totalBudgetCr * 0.78).toFixed(2)),
      spentBudgetCr: Number((profile.totalBudgetCr * 0.52).toFixed(2)),
      unspentBudgetCr: Number((profile.totalBudgetCr * 0.26).toFixed(2)),
      averageWdiScore: profile.developmentScore,
      activeProjectsCount: synthesized.projects.length,
      highRiskZonesCount: synthesized.risks.length,
      pendingIssuesCount: Math.round(profile.totalPopulation / 400),
      resolvedGrievancesLastMonth: Math.round(profile.totalPopulation / 180),
    });

    setAgentMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'agent',
        agentType: 'budget',
        content: `Spatial profile updated for **${profile.cityName} ${profile.ulbType}** (${profile.district}, ${profile.state}). Population: ${profile.totalPopulation.toLocaleString('en-IN')}, Wards: ${profile.totalWards}, Total Annual Budget: ₹${profile.totalBudgetCr.toFixed(2)} Cr. Top problem detected: ${profile.currentProblems[0]}. Ready to assist!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const searchAndSetCity = (cityName: string, coords?: { lat: number; lng: number }) => {
    const synthesized = generateCityIntelligence(cityName, coords);
    switchCity(synthesized.profile);
  };

  const addProject = (newProj: Omit<Project, 'id'>) => {
    const id = `PRJ-${currentCity.cityName.slice(0, 3).toUpperCase()}-${String(projects.length + 1).padStart(3, '0')}`;
    const projectWithId: Project = { ...newProj, id };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const updateProjectStatus = (id: string, status: Project['status']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, completionPercentage: status === 'Completed' ? 100 : p.completionPercentage } : p))
    );
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const approveRecommendation = (id: string) => {
    setAiRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'Approved for DPR' } : rec))
    );
  };

  const updateDepartmentBudget = (deptName: string, newAllocatedLakhs: number) => {
    setDepartmentBudgets((prev) =>
      prev.map((d) => (d.department === deptName ? { ...d, allocatedLakhs: newAllocatedLakhs } : d))
    );
  };

  const sendAgentMessage = async (
    agentType: 'budget' | 'infra' | 'risk' | 'priority' | 'report',
    text: string
  ) => {
    const userMsg: AiAgentMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      agentType,
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAgentMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let reply = '';
      if (agentType === 'budget') {
        reply = `Budget Analysis for ${currentCity.cityName} ${currentCity.ulbType}:
Recommended Capital Split:
• Drainage & Flood Defense: ${currentCity.budgetRecommendations[0]?.percentage || 35}% (₹${currentCity.budgetRecommendations[0]?.amountCr || 3.5} Cr)
• Roads & Transit Mobility: ${currentCity.budgetRecommendations[1]?.percentage || 25}% (₹${currentCity.budgetRecommendations[1]?.amountCr || 2.5} Cr)
• Water Security & Telemetry: ${currentCity.budgetRecommendations[2]?.percentage || 20}% (₹${currentCity.budgetRecommendations[2]?.amountCr || 2.0} Cr)
• SWM & Energy Savings: 20%
Estimated unspent 15th FC tied grant compliance: 84.5%.`;
      } else if (agentType === 'risk') {
        reply = `Hazard & Vulnerability Audit for ${currentCity.cityName}:
Identified Vulnerable Hotspots:
${currentCity.highRiskAreas.map((a, i) => `${i + 1}. ${a}`).join('\n')}
Priority Action: ${currentCity.currentProblems[0]}.`;
      } else if (agentType === 'priority') {
        reply = `Development Priority Agent Ranking for ${currentCity.cityName}:
${currentCity.topDevelopmentPriorities.slice(0, 5).map((p, i) => `${i + 1}. ${p}`).join('\n')}`;
      } else if (agentType === 'infra') {
        reply = `Infrastructure Asset Diagnostics for ${currentCity.cityName}:
Identified Infrastructure Gaps:
${currentCity.infrastructureGaps.map((g, i) => `• ${g}`).join('\n')}
Average WDI: ${currentCity.developmentScore}/100 across ${currentCity.totalWards} wards.`;
      } else {
        reply = `Drafting Council Resolution for ${currentCity.cityName} Municipal Council:
"Resolved that administrative approval of ₹${(currentCity.totalBudgetCr * 0.25).toFixed(2)} Cr is hereby granted for priority capital infrastructure works in ${currentCity.cityName} to mitigate critical flood and road deterioration risks."`;
      }

      const agentMsg: AiAgentMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        agentType,
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setAgentMessages((prev) => [...prev, agentMsg]);
    }, 600);
  };

  const resetToDefaults = () => {
    switchCity(PRE_INDEXED_CITIES[0]);
  };

  return (
    <CivicContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        loginUser,
        logoutUser,
        completeLocationSetup,
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleDarkMode,
        currentCity,
        tenantLevel,
        setTenantLevel,
        heatmapMode,
        setHeatmapMode,
        isCityModalOpen,
        setIsCityModalOpen,
        switchCity,
        searchAndSetCity,
        stats,
        wards,
        projects,
        risks,
        departmentBudgets,
        aiRecommendations,
        agentMessages,
        selectedWard,
        setSelectedWard,
        selectedProject,
        setSelectedProject,
        addProject,
        updateProjectStatus,
        updateProject,
        approveRecommendation,
        sendAgentMessage,
        updateDepartmentBudget,
        resetToDefaults,
        totalBudgetOptimizationCr,
        setTotalBudgetOptimizationCr,
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => {
  const context = useContext(CivicContext);
  if (!context) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return context;
};
