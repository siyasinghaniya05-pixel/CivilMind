'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WardData, 
  Project, 
  InfrastructureRisk, 
  DepartmentBudget, 
  AiRecommendation, 
  MunicipalCityStats,
  AiAgentMessage 
} from '@/types';
import { 
  CITY_STATS, 
  WARDS_DATA, 
  DEPARTMENT_BUDGETS, 
  PROJECTS_DATA, 
  INFRASTRUCTURE_RISKS, 
  AI_RECOMMENDATIONS,
  AGENT_PROMPTS_SAMPLE 
} from '@/data/municipalData';

export type ActiveTab = 
  | 'overview' 
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
      content: 'Namaskar Chief Officer! I have reviewed Kalamb Nagar Parishad’s ₹12.50 Cr annual development outlay. We currently have ₹2.65 Cr unspent balance under 15th FC tied grants for water & sanitation. How can I assist with your budget allocation today?',
      timestamp: 'Today, 09:15 AM'
    },
    {
      id: 'msg-2',
      sender: 'agent',
      agentType: 'risk',
      content: 'Early monsoon warning: Ward 4 (Indira Nagar) has a 94% predicted inundation probability due to the low elevation basin. Priority desilting of the Ralegaon outlet culvert is recommended before the next heavy precipitation spell.',
      timestamp: 'Today, 09:30 AM'
    },
    {
      id: 'msg-3',
      sender: 'agent',
      agentType: 'priority',
      content: 'MCDA Priority Engine has evaluated all 12 proposed municipal works. Ward 4 Stormwater Box Drain and Ward 3 Underground Sewage rank at the top with combined impact score > 94/100.',
      timestamp: 'Today, 10:00 AM'
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

  const addProject = (newProj: Omit<Project, 'id'>) => {
    const id = `PRJ-2026-${String(projects.length + 1).padStart(3, '0')}`;
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

    // Generate intelligent AI response tailored for Kalamb Nagar Parishad
    setTimeout(() => {
      let reply = '';
      if (agentType === 'budget') {
        if (text.toLowerCase().includes('10 crore') || text.toLowerCase().includes('distributed')) {
          reply = `Based on our multi-attribute optimization model for Kalamb Nagar Parishad:
1. **Drainage & Flood Mitigation**: Allocate **₹3.20 Cr (32%)** - Solves critical flooding in Ward 4 & Ward 3.
2. **Roads & Mobility Infrastructure**: Allocate **₹2.80 Cr (28%)** - Upgrades Main Bazar corridor & MIDC road.
3. **Water Supply & ESR Automation**: Allocate **₹2.20 Cr (22%)** - Resolves tail-end shortage in Ward 11.
4. **Solid Waste Management**: Allocate **₹1.00 Cr (10%)** - MRF center expansion to ensure Swachh Survekshan compliance.
5. **Smart LED Streetlighting & Amenities**: Allocate **₹0.80 Cr (8%)** - Energy savings of ₹18L/yr.
*Projected Outcome:* Raises average Ward Development Index from **68.4 to 81.2** and directly benefits **52,000+ citizens**.`;
        } else if (text.toLowerCase().includes('unspent') || text.toLowerCase().includes('15th')) {
          reply = `Kalamb has ₹2.65 Cr in unspent 15th FC grants (₹1.45 Cr Tied for Water & Sanitation, ₹1.20 Cr Untied). Statutory deadline for utilization certificate submission to District Collectorate is 31-Dec-2026. Prioritize Ward 4 Box Drain (₹1.25 Cr) to utilize tied funds immediately.`;
        } else {
          reply = `Fiscal Analysis: Kalamb Nagar Parishad’s budget utilization rate stands at 65.2%. Property tax collection efficiency is 71.4%. Reallocating unspent capital grants to high-impact drainage works maximizes grant retention and public welfare.`;
        }
      } else if (agentType === 'infra') {
        reply = `Infrastructure Asset Audit Summary:
• **Roads:** 18.4 km total network. PDI < 40 detected on 3.8 km (primarily MIDC heavy truck corridor and Ward 4 bypass).
• **Water Supply:** 5 Elevated Storage Reservoirs operational. SCADA automation in Shivaji Nagar achieved 28% NRW leak reduction. Ward 9 cast iron main has a 79% burst hazard.
• **Drainage:** 68% of roadside stormwater drains require pre-monsoon mechanized desilting.`;
      } else if (agentType === 'risk') {
        reply = `Risk Matrix Forecast:
⚠️ **Critical Alert:** Ward 4 (Indira Nagar) is at extreme flood risk (94% probability). The confluence point of the local nullah with Ralegaon stream has 1.8m sediment buildup.
⚠️ **Water Main Hazard:** Shastri Nagar 300mm pipeline pressure fluctuation threatens 8,500 residents with potential 48-hour supply outage if not reinforced this week.`;
      } else if (agentType === 'priority') {
        reply = `Prioritization Engine Output:
1. **Ward 4 Stormwater Box Drain** (Score: 96/100 | High Urgency)
2. **Ward 3 Underground Sewage Line** (Score: 93/100 | Sanitation/Health)
3. **Main Bazar CC Road Widening** (Score: 89/100 | High Traffic Flow)
4. **Ward 17 MIDC Bypass Resurfacing** (Score: 87/100 | Economic Trade Corridor)
5. **Ward 11 Water Feeder Pipeline** (Score: 85/100 | Equity/Water Access)`;
      } else {
        reply = `Drafting Council Resolution (ठराव क्र. 44/2026):
"Resolved that administrative and technical sanction of ₹1,25,00,000 (Rupees One Crore Twenty-Five Lakhs only) under 15th Finance Commission Tied Grants is hereby accorded for the construction of RCC Box Drain in Ward No. 4, Indira Nagar. Tendering shall be initiated immediately on Government e-Marketplace / Mahatenders."`;
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
    setStats(CITY_STATS);
    setWards(WARDS_DATA);
    setProjects(PROJECTS_DATA);
    setRisks(INFRASTRUCTURE_RISKS);
    setDepartmentBudgets(DEPARTMENT_BUDGETS);
    setAiRecommendations(AI_RECOMMENDATIONS);
  };

  return (
    <CivicContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isDarkMode,
        toggleDarkMode,
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
