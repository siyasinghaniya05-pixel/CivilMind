'use client';

import React, { useState } from 'react';
import { useCivic } from '@/context/CivicContext';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { DashboardOverview } from '@/components/modules/DashboardOverview';
import { PriorityEngine } from '@/components/modules/PriorityEngine';
import { BudgetOptimizer } from '@/components/modules/BudgetOptimizer';
import { WardDevelopmentIndex } from '@/components/modules/WardDevelopmentIndex';
import { RiskPrediction } from '@/components/modules/RiskPrediction';
import { SmartCityMap } from '@/components/modules/SmartCityMap';
import { ProjectMonitoring } from '@/components/modules/ProjectMonitoring';
import { AiRecommendations } from '@/components/modules/AiRecommendations';
import { ImpactAnalytics } from '@/components/modules/ImpactAnalytics';
import { ReportGenerator } from '@/components/modules/ReportGenerator';
import { AdminPanel } from '@/components/modules/AdminPanel';
import { AiAgentsHub } from '@/components/modules/AiAgentsHub';
import { WhatShouldWeBuildNext } from '@/components/wow/WhatShouldWeBuildNext';
import { BudgetSimulator } from '@/components/wow/BudgetSimulator';
import { DigitalTwinView } from '@/components/wow/DigitalTwinView';
import { CitizenImpactCalculator } from '@/components/wow/CitizenImpactCalculator';
import { AnnualDevelopmentPlan } from '@/components/wow/AnnualDevelopmentPlan';
import { NewProjectModal } from '@/components/modals/NewProjectModal';

export default function HomePage() {
  const { activeTab } = useCivic();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'priority-engine':
        return <PriorityEngine />;
      case 'budget-optimizer':
        return <BudgetOptimizer />;
      case 'ward-index':
        return <WardDevelopmentIndex />;
      case 'risk-prediction':
        return <RiskPrediction />;
      case 'smart-map':
        return <SmartCityMap />;
      case 'project-monitoring':
        return <ProjectMonitoring />;
      case 'ai-recommendations':
        return <AiRecommendations />;
      case 'impact-analytics':
        return <ImpactAnalytics />;
      case 'report-generator':
        return <ReportGenerator />;
      case 'admin-panel':
        return <AdminPanel />;
      case 'ai-agents-hub':
        return <AiAgentsHub />;
      case 'wow-build-next':
        return <WhatShouldWeBuildNext />;
      case 'wow-simulator':
        return <BudgetSimulator />;
      case 'wow-digital-twin':
        return <DigitalTwinView />;
      case 'wow-calculator':
        return <CitizenImpactCalculator />;
      case 'wow-adp':
        return <AnnualDevelopmentPlan />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Workspace */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {renderActiveModule()}
        </main>
      </div>

      {/* New Project Tender Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
      />
    </div>
  );
}
